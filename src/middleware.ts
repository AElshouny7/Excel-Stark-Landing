// src/middleware.ts
import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = async (context, next) => {
  const url = new URL(context.request.url);

  let variant = url.searchParams.get('ab') as 'heroA' | 'heroB' | null;
  const cookieVariant = context.cookies.get('ab')?.value as
    | 'heroA'
    | 'heroB'
    | undefined;

  if (!variant || (variant !== 'heroA' && variant !== 'heroB')) {
    variant = cookieVariant || (Math.random() < 0.5 ? 'heroA' : 'heroB');
  }

  context.locals.abVariant = variant;

  context.cookies.set('ab', variant, {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30
  });

  return next();
};
