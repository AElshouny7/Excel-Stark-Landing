/// <reference types="astro/client" />
declare namespace App {
  interface Locals {
    abVariant: "heroA" | "heroB";
  }
}

interface ImportMetaEnv {
  readonly PUBLIC_PLAUSIBLE_DOMAIN: string;
  readonly HCAPTCHA_SITEKEY: string;
  readonly FORMSPARK_FORM_ID: string;
  readonly HCAPTCHA_SECRET: string;
  readonly HCAPTCHA_SITEKEY?: string;
  readonly HCAPTCHA_SECRET?: string;
  readonly HCAPTCHA_ENABLED?: string;
  readonly PLAUSIBLE_DOMAIN?: string;
  readonly SMTP_HOST?: string;
  readonly SMTP_PORT?: string;
  readonly SMTP_USER?: string;
  readonly SMTP_PASS?: string;
  readonly MAIL_TO?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
