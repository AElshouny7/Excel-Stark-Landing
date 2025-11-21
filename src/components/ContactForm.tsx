import React from "react";
import { site } from "@content/site";

export interface ContactFormProps {
  siteKey?: string;
}

type Status = "idle" | "submitting" | "error" | "success";

export default function ContactForm({ siteKey }: ContactFormProps) {
  const [status, setStatus] = React.useState<Status>("idle");
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const formRef = React.useRef<HTMLFormElement>(null);

  // Load hCaptcha script only when siteKey provided (and not already loaded)
  React.useEffect(() => {
    if (!siteKey) return;
    if (
      document.querySelector('script[src^="https://js.hcaptcha.com/1/api.js"]')
    )
      return;
    const s = document.createElement("script");
    s.src = "https://js.hcaptcha.com/1/api.js";
    s.async = true;
    s.defer = true;
    document.head.appendChild(s);
  }, [siteKey]);

  function sanitizeField(key: string, value: FormDataEntryValue): string {
    let v = String(value);
    v = v.trim();
    // basic length caps
    const maxLenMap: Record<string, number> = {
      name: 120,
      email: 150,
      company: 150,
      region: 100,
      urgency: 60,
      details: 8000,
    };
    const cap = maxLenMap[key] ?? 5000;
    if (v.length > cap) v = v.slice(0, cap);
    // remove control chars except line breaks
    v = v.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, "");
    // normalize line endings
    v = v.replace(/\r\n?/g, "\n");
    // basic HTML escape (server can still handle safely)
    v = v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return v;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});

    if (!formRef.current) return;

    const fd = new FormData(formRef.current);
    const rawData = Object.fromEntries(fd.entries()) as Record<
      string,
      FormDataEntryValue
    >;
    // sanitize fields
    const data: Record<string, string> = {};
    for (const [k, v] of Object.entries(rawData)) {
      data[k] = sanitizeField(k, v);
    }
    if (data.email) data.email = data.email.toLowerCase();

    // Client-side required checks (server re-validates)
    const requiredFields = ["name", "email", "details", "region", "urgency"];
    const missing = requiredFields.filter((f) => !data[f]);
    if (missing.length) {
      missing.forEach((f) => (errors[f] = "Required"));
      setErrors({ ...errors });
      setStatus("error");
      return;
    }

    const email = String(data.email || "");
    if (!email.includes("@")) {
      setErrors((p) => ({ ...p, email: "Enter a valid email." }));
      setStatus("error");
      return;
    }

    // hCaptcha token (widget sets form field h-captcha-response)
    const hcaptchaToken = String(fd.get("h-captcha-response") || "");
    if (siteKey && !hcaptchaToken) {
      setErrors((p) => ({
        ...p,
        hcaptcha: "Please complete the security check.",
      }));
      setStatus("error");
      return;
    }

    delete (data as any)["h-captcha-response"];
    const payload = { ...data, hcaptchaToken };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("success");
        formRef.current?.reset();
        return;
      }

      const json = await res.json().catch(() => ({}) as any);
      if (json?.fields) {
        const serverFieldErrors: Record<string, string> = {};
        (json.fields as string[]).forEach(
          (f: string) => (serverFieldErrors[f] = "Required")
        );
        setErrors(serverFieldErrors);
      }
      if (json?.errors) {
        setErrors((p) => ({ ...p, ...json.errors }));
      }
      setStatus("error");
    } catch (err) {
      setStatus("error");
      setErrors((p) => ({ ...p, form: "Submission failed. Please retry." }));
    }
  }

  return (
    <section id="contact" className="bg-slate-950 border-t border-slate-800">
      <div className="container py-16 grid gap-10 lg:grid-cols-[1.2fr_1.5fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-industrial-orange">
            Contact
          </p>
          <h2 className="mt-2 text-2xl font-semibold">
            {site.contact.headline}
          </h2>
          <p className="mt-3 text-sm text-slate-300">{site.contact.subcopy}</p>
          <ul className="mt-4 space-y-1 text-sm text-slate-400">
            {site.contact.regions.map((r) => (
              <li key={r}>• {r}</li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-slate-500">
            We aim to respond to urgent leaks on the same day. For true
            emergencies, please follow your site escalation protocol alongside
            this form.
          </p>
        </div>

        <form
          ref={formRef}
          onSubmit={onSubmit}
          className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-6"
          noValidate
        >
          {/* Honeypot field */}
          <div className="hidden" aria-hidden="true">
            <label>
              Website
              <input name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="text-xs font-semibold text-slate-200"
              >
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white"
              />
              {errors.name && (
                <p className="mt-1 text-[11px] text-industrial-danger">
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="text-xs font-semibold text-slate-200"
              >
                Work email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white"
              />
              {errors.email && (
                <p className="mt-1 text-[11px] text-industrial-danger">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="company"
                className="text-xs font-semibold text-slate-200"
              >
                Company
              </label>
              <input
                id="company"
                name="company"
                type="text"
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white"
              />
            </div>
            <div>
              <label
                htmlFor="region"
                className="text-xs font-semibold text-slate-200"
              >
                Region
              </label>
              <select
                id="region"
                name="region"
                required
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white"
              >
                <option value="">Select region</option>
                {site.contact.regions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              {errors.region && (
                <p className="mt-1 text-[11px] text-industrial-danger">
                  {errors.region}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="details"
              className="text-xs font-semibold text-slate-200"
            >
              Leak / defect details
            </label>
            <textarea
              id="details"
              name="details"
              rows={4}
              required
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white"
              placeholder="Line size, design/operating pressure & temperature, service, defect description, any UT/MFL data…"
            ></textarea>
            {errors.details && (
              <p className="mt-1 text-[11px] text-industrial-danger">
                {errors.details}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="urgency"
              className="text-xs font-semibold text-slate-200"
            >
              Urgency
            </label>
            <select
              id="urgency"
              name="urgency"
              required
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white"
            >
              <option value="">Select</option>
              <option value="emergency_24h">
                Active leak – 24h support required
              </option>
              <option value="high_3d">High – respond within 3 days</option>
              <option value="medium_7d">Medium – respond within 7 days</option>
            </select>
            {errors.urgency && (
              <p className="mt-1 text-[11px] text-industrial-danger">
                {errors.urgency}
              </p>
            )}
          </div>

          <div className="space-y-2">
            {siteKey && (
              <>
                <div
                  className="h-captcha"
                  data-sitekey={siteKey}
                  aria-describedby="captcha-help"
                ></div>
                {errors.hcaptcha && (
                  <p className="text-[11px] text-industrial-danger">
                    {errors.hcaptcha}
                  </p>
                )}
              </>
            )}
            <p id="captcha-help" className="text-[11px] text-slate-500">
              This site is protected by hCaptcha. The hCaptcha Privacy Policy
              and Terms of Service apply.
            </p>
          </div>

          {errors.form && (
            <p className="text-xs text-industrial-danger" role="alert">
              {errors.form}
            </p>
          )}

          <div aria-live="polite" className="min-h-[1.5rem]">
            {status === "success" && (
              <p className="text-sm text-emerald-400" role="status">
                Thanks. Your leak details were received and an engineer will
                revert shortly.
              </p>
            )}
            {status === "error" && errors.form && (
              <p className="text-sm text-industrial-danger" role="alert">
                {errors.form}
              </p>
            )}
          </div>
          {status !== "success" && (
            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex items-center rounded-full bg-industrial-orange px-5 py-2 text-xs font-semibold uppercase tracking-wide text-white disabled:opacity-60"
              data-analytics-event="form_submit"
            >
              {status === "submitting" ? "Submitting…" : "Submit leak details"}
            </button>
          )}
        </form>
      </div>
    </section>
  );
}
