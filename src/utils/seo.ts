import type { FAQItem } from '@content/site';

export function buildTitle(pageTitle?: string) {
  const base = 'Excel Stark – The Right Repair — Every Time';
  return pageTitle ? `${pageTitle} | ${base}` : base;
}

export function buildDescription() {
  return (
    'Excel Stark provides engineered online leak sealing, clamp and enclosure design, and ISO 24817 / ASME PCC-2 ' +
    'composite repairs for pipelines, tanks, valves and process piping — without unplanned shutdowns.'
  );
}

export function buildCanonicalUrl(origin: string, path: string) {
  const url = new URL(path, origin);
  return url.toString();
}

export function buildOrganizationJsonLd(origin: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Excel Stark',
    url: origin,
    slogan: 'The Right Repair — Every Time',
    description: buildDescription(),
    areaServed: ['Worldwide', 'Middle East'],
    sameAs: [] as string[]
  };
}

export function buildFaqJsonLd(origin: string, faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}
