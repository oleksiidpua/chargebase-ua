import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { ARTICLES } from '@/lib/blog/registry';

const SITE_URL = 'https://chargebase-ua.vercel.app';

function pathFor(locale: string, sub = ''): string {
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
  return `${prefix}${sub}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  function localized(sub: string) {
    return Object.fromEntries(
      routing.locales.map((l) => [l, `${SITE_URL}${pathFor(l, sub)}`]),
    );
  }

  const homePages = routing.locales.map((locale) => ({
    url: `${SITE_URL}${pathFor(locale)}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: locale === routing.defaultLocale ? 1.0 : 0.8,
    alternates: { languages: localized('') },
  }));

  const blogIndexPages = routing.locales.map((locale) => ({
    url: `${SITE_URL}${pathFor(locale, '/blog')}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
    alternates: { languages: localized('/blog') },
  }));

  const articlePages = ARTICLES.flatMap((article) =>
    routing.locales.map((locale) => ({
      url: `${SITE_URL}${pathFor(locale, `/blog/${article.slug}`)}`,
      lastModified: new Date(article.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
      alternates: { languages: localized(`/blog/${article.slug}`) },
    })),
  );

  return [...homePages, ...blogIndexPages, ...articlePages];
}
