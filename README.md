# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## ✅ Pre-Launch Checklist (Excel Stark)

- Performance: Hero image optimized (AVIF/WebP), Lighthouse LCP <2.5s.
- SEO: Canonical tags, OG/Twitter meta, JSON-LD (Organization + FAQ), sitemap & robots validated.
- Accessibility: Landmarks (`<main>`), skip link, aria-live messaging, contrast pass.
- Form Hardening: hCaptcha, honeypot, rate limiting, server-side validation & sanitization.
- Security: CSP, security headers (X-Frame-Options, Referrer-Policy, Permissions-Policy), secrets in Vercel env.
- Analytics: Plausible + Vercel analytics script, custom events wired.
- Reliability: SMTP failures logged (emailSent flag), graceful fallback.
- Code Quality: Shared sanitize function, TypeScript strict, dependency audit run.
- Content Review: Case studies accurate, PDFs present, no placeholder assets.
- Env Separation: `SITE` points to production in deploy; preview builds optionally `noindex` (add if needed).
- Final Audit: `npm run build` succeeds, Lighthouse scores (Perf >90, A11y >95, SEO >95, Best Practices >95).

Run after any changes:

```bash
npm run build
npm run preview
```
