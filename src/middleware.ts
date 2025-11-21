// src/middleware.ts
import type { MiddlewareHandler } from "astro";

// Simple in-memory rate limiter (per server instance)
interface RateEntry {
  count: number;
  first: number;
}
const contactRate: Map<string, RateEntry> = new Map();
const CONTACT_WINDOW_MS = 5 * 60 * 1000; // 5 min
const CONTACT_MAX = 8; // max submissions per window per IP

export const onRequest: MiddlewareHandler = async (context, next) => {
  const url = new URL(context.request.url);
  const ip = context.clientAddress || "unknown";

  // A/B variant logic (unchanged)
  let variant = url.searchParams.get("ab") as "heroA" | "heroB" | null;
  const cookieVariant = context.cookies.get("ab")?.value as
    | "heroA"
    | "heroB"
    | undefined;
  if (!variant || (variant !== "heroA" && variant !== "heroB")) {
    variant = cookieVariant || (Math.random() < 0.5 ? "heroA" : "heroB");
  }
  context.locals.abVariant = variant;
  context.cookies.set("ab", variant, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
  });

  // Rate limit only contact API POSTs
  if (url.pathname === "/api/contact" && context.request.method === "POST") {
    const now = Date.now();
    const entry = contactRate.get(ip);
    if (!entry || now - entry.first > CONTACT_WINDOW_MS) {
      contactRate.set(ip, { count: 1, first: now });
    } else {
      entry.count += 1;
      if (entry.count > CONTACT_MAX) {
        return new Response(
          JSON.stringify({
            ok: false,
            message: "Rate limit exceeded. Try later.",
          }),
          { status: 429 }
        );
      }
    }
  }

  const res = await next();

  // Security headers & CSP
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set(
    "Permissions-Policy",
    "geolocation=(), microphone=(), camera=()"
  );
  const csp = [
    "default-src 'self'",
    // Allow inline scripts for JSON-LD + hydration, hCaptcha domains & Vercel analytics
    "script-src 'self' 'unsafe-inline' https://hcaptcha.com https://*.hcaptcha.com https://vercel.live",
    "style-src 'self' 'unsafe-inline'",
    // Images from self, data URIs, and any hcaptcha subdomains (newassets, etc.)
    "img-src 'self' data: https://hcaptcha.com https://*.hcaptcha.com",
    // Connections for API calls (captcha verify, analytics, vitals)
    "connect-src 'self' https://hcaptcha.com https://*.hcaptcha.com https://vitals.vercel-insights.com",
    // Frames needed for hCaptcha widget
    "frame-src https://hcaptcha.com https://*.hcaptcha.com",
    "font-src 'self' data:",
  ].join("; ");
  res.headers.set("Content-Security-Policy", csp);

  return res;
};
