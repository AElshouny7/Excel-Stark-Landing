import type { APIRoute } from 'astro';

interface ContactPayload {
  name?: string;
  email?: string;
  company?: string;
  region?: string;
  details?: string;
  urgency?: string;
  hcaptchaToken?: string;
}

export const POST: APIRoute = async ({ request }) => {
  const env = import.meta.env;
  const formId = env.FORMSPARK_FORM_ID;
  const hcaptchaSecret = env.HCAPTCHA_SECRET;

  if (!formId) {
    return new Response(
      JSON.stringify({ error: 'Formspark form ID not configured.' }),
      { status: 500 }
    );
  }

  const body = (await request.json().catch(() => ({}))) as ContactPayload;

  const errors: string[] = [];
  if (!body.name) errors.push('name');
  if (!body.email) errors.push('email');
  if (!body.region) errors.push('region');
  if (!body.details) errors.push('details');

  if (errors.length > 0) {
    return new Response(
      JSON.stringify({ error: 'Missing required fields', fields: errors }),
      { status: 400 }
    );
  }

  if (!body.hcaptchaToken || !hcaptchaSecret) {
    return new Response(
      JSON.stringify({ error: 'Captcha validation failed.' }),
      { status: 400 }
    );
  }

  // Verify hCaptcha
  const captchaRes = await fetch('https://hcaptcha.com/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: hcaptchaSecret,
      response: body.hcaptchaToken
    })
  });

  const captchaJson = (await captchaRes.json().catch(() => ({}))) as {
    success?: boolean;
    'error-codes'?: string[];
  };

  if (!captchaJson.success) {
    return new Response(
      JSON.stringify({
        error: 'Captcha validation failed.',
        details: captchaJson['error-codes']
      }),
      { status: 400 }
    );
  }

  // Post to Formspark
  const formsparkUrl = `https://submit-form.com/${formId}`;
  const payloadForFormspark = {
    name: body.name,
    email: body.email,
    company: body.company,
    region: body.region,
    urgency: body.urgency,
    details: body.details,
    source: 'excel-stark-landing',
    ab_variant: 'n/a' // you can pass cookie value if needed
  };

  const fsRes = await fetch(formsparkUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payloadForFormspark)
  });

  if (!fsRes.ok) {
    const text = await fsRes.text();
    return new Response(
      JSON.stringify({
        error: 'Failed to submit to Formspark.',
        details: text
      }),
      { status: 502 }
    );
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
