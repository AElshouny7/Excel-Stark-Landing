/// <reference types="astro/client" />
declare namespace App {
  interface Locals {
    abVariant: 'heroA' | 'heroB';
  }
}


interface ImportMetaEnv {
  readonly PUBLIC_PLAUSIBLE_DOMAIN: string;
  readonly PUBLIC_HCAPTCHA_SITE_KEY: string;
  readonly FORMSPARK_FORM_ID: string;
  readonly HCAPTCHA_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
