import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

const SITE = process.env.SITE || 'https://excelstark.com';

export default defineConfig({
  site: SITE,
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    sitemap(),
  ],
  // Astro 4 only supports "static" or "server"
  output: 'server',
  adapter: vercel(),
  server: {
    host: true, // binds to 0.0.0.0
    // port: 4321,
  },
});
