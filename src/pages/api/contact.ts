import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

interface ContactPayload {
  name?: string;
  email?: string;
  company?: string;
  region?: string;
  details?: string;
  urgency?: string;
  hcaptchaToken?: string;
  website?: string; // honeypot
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    const env = import.meta.env;
    const hcaptchaSecret = env.HCAPTCHA_SECRET;
    const body = (await request.json().catch(() => ({}))) as ContactPayload;

    // Honeypot check (bot detection)
    if ((body as any).website) {
      return new Response(JSON.stringify({ ok: false, message: "Rejected" }), {
        status: 400,
      });
    }

    // Field validation (retain existing payload requirements)
    const errors: string[] = [];
    if (!body.name) errors.push("name");
    if (!body.email) errors.push("email");
    if (!body.region) errors.push("region");
    if (!body.details) errors.push("details");
    if (errors.length > 0) {
      return new Response(
        JSON.stringify({
          ok: false,
          message: "Missing required fields",
          fields: errors,
        }),
        { status: 400 }
      );
    }

    // hCaptcha verification (optional if secret set)
    if (hcaptchaSecret) {
      const token: string | undefined =
        body.hcaptchaToken ||
        (body as any)["h-captcha-response"] ||
        (body as any)["hcaptcha"] ||
        (body as any)["hCaptcha"];
      if (!token) {
        return new Response(
          JSON.stringify({
            ok: false,
            message: "Captcha required",
            errors: { captcha: "Please complete the captcha." },
          }),
          { status: 400 }
        );
      }
      const params = new URLSearchParams({
        secret: hcaptchaSecret,
        response: token,
        remoteip: clientAddress || "",
      });
      const verify = await fetch("https://hcaptcha.com/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });
      const result = await verify.json();
      if (!result?.success) {
        return new Response(
          JSON.stringify({
            ok: false,
            message: "Captcha verification failed",
            errors: { captcha: "Captcha invalid or expired." },
            codes: result?.["error-codes"],
          }),
          { status: 400 }
        );
      }
    }

    // Zoho SMTP integration
    const host = env.SMTP_HOST;
    const smtpPort = env.SMTP_PORT ? Number(env.SMTP_PORT) : undefined;
    const user = env.SMTP_USER;
    const pass = env.SMTP_PASS;
    const to = env.MAIL_TO;

    let emailSent: boolean = false;
    let emailError: string | undefined;

    if (host && user && pass && to) {
      const tryCreate = async (port: number) => {
        const secure = port === 465;
        const transporter = nodemailer.createTransport({
          host,
          port,
          secure,
          requireTLS: !secure,
          auth: { user, pass },
        });
        await transporter.verify();
        return transporter;
      };
      let transporter;
      try {
        if (smtpPort) {
          transporter = await tryCreate(smtpPort);
        } else {
          try {
            transporter = await tryCreate(465);
          } catch {
            transporter = await tryCreate(587);
          }
        }
        const mailOptions = {
          from: `"Excel Stark" <${user}>`,
          to,
          subject: `New Engineering Support Request: ${body.name}`,
          replyTo: body.email,
          html: `
            <h2>New Contact Submission From ${body.name}</h2>
            <p><strong>Email:</strong> ${body.email}</p>
            <p><strong>Company:</strong> ${body.company || "-"}</p>
            <p><strong>Region:</strong> ${body.region || "-"}</p>
            <p><strong>Urgency:</strong> ${body.urgency || "-"}</p>
            <p><strong>IP:</strong> ${clientAddress || "-"}</p>
            <hr/>
            <p style="white-space:pre-line">${(body.details || "").replace(/</g, "&lt;")}</p>
          `,
        };
        await transporter.sendMail(mailOptions);
        emailSent = true;
      } catch (e: any) {
        emailError = e?.message || "SMTP send failed";
      }
    }

    return new Response(
      JSON.stringify({ ok: true, emailSent, emailError: emailError || null }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        ok: false,
        message: "Unexpected server error",
        error: String(err?.message),
      }),
      { status: 500 }
    );
  }
};
