import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const origin = site?.toString() ?? 'https://excelstark.com';
  return new Response(
    [
      'User-agent: *',
      'Allow: /',
      '',
      `Sitemap: ${origin.replace(/\/$/, '')}/sitemap.xml`,
      ''
    ].join('\n'),
    {
      headers: {
        'Content-Type': 'text/plain'
      }
    }
  );
};
