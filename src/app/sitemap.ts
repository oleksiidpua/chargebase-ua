import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const SITE_URL = 'https://chargebase-ua.vercel.app';

function pathFor(locale: string): string {
  return locale === routing.defaultLocale ? '' : `/${locale}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${SITE_URL}${pathFor(l)}`]),
  );

  return routing.locales.map((locale) => ({
    url: `${SITE_URL}${pathFor(locale)}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: locale === routing.defaultLocale ? 1.0 : 0.8,
    alternates: { languages },
  }));
}
