import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Clarity } from '@/components/Clarity';
import { routing } from '@/i18n/routing';
import '../../globals.css';

const SITE_URL = 'https://chargebase-ua.vercel.app';

function pathFor(locale: string): string {
  return locale === routing.defaultLocale ? '' : `/${locale}`;
}

const display = Plus_Jakarta_Sans({
  variable: '--font-display',
  subsets: ['latin', 'cyrillic-ext'],
  display: 'swap',
});

const mono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: '#020617',
  colorScheme: 'dark',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const t = await getTranslations({ locale, namespace: 'Meta' });

  const canonical = `${SITE_URL}${pathFor(locale)}`;
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${SITE_URL}${pathFor(l)}`]),
  );

  return {
    metadataBase: new URL(SITE_URL),
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical,
      languages: { ...languages, 'x-default': `${SITE_URL}/` },
    },
    verification: process.env.GSC_VERIFICATION
      ? { google: process.env.GSC_VERIFICATION }
      : undefined,
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      type: 'website',
      url: canonical,
      locale: locale === 'uk' ? 'uk_UA' : locale === 'ru' ? 'ru_RU' : 'en_US',
      siteName: 'ChargeBase UA',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'ChargeBase UA — Портативна зарядна станція 2400W LiFePO4' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('ogTitle'),
      description: t('ogDescription'),
      images: ['/og-image.jpg'],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const tHow = await getTranslations({ locale, namespace: 'How' });
  const tFaq = await getTranslations({ locale, namespace: 'Faq' });
  const tHero = await getTranslations({ locale, namespace: 'Hero' });
  const tMeta = await getTranslations({ locale, namespace: 'Meta' });

  const canonical = `${SITE_URL}${pathFor(locale)}`;
  const inLanguage = locale === 'uk' ? 'uk-UA' : locale === 'ru' ? 'ru-RU' : 'en-US';

  const productSchema = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: tHero('imageAlt'),
    image: `${SITE_URL}/og-image.jpg`,
    description: tMeta('description'),
    brand: { '@type': 'Brand', name: 'ChargeBase' },
    offers: {
      '@type': 'Offer',
      url: canonical,
      priceCurrency: 'UAH',
      price: '22950',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ChargeBase UA',
    alternateName: 'ChargeBase',
    url: SITE_URL,
    logo: `${SITE_URL}/og-image.jpg`,
    description: tMeta('description'),
    areaServed: { '@type': 'Country', name: 'Ukraine' },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ChargeBase UA',
    url: SITE_URL,
    inLanguage,
  };

  const faqIds = ['boiler', 'fridge', 'delivery', 'customs', 'damaged', 'solar', 'warranty'] as const;
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqIds.map((id) => ({
      '@type': 'Question',
      name: tFaq(`items.${id}.q`),
      acceptedAnswer: {
        '@type': 'Answer',
        text: tFaq(`items.${id}.a`),
      },
    })),
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: tHow('sectionTitle'),
    description: tHow('sectionSubtitle'),
    step: ['step1', 'step2', 'step3'].map((id, idx) => ({
      '@type': 'HowToStep',
      position: idx + 1,
      name: tHow(`${id}.title`),
      text: tHow(`${id}.description`),
    })),
  };

  const videoSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: tHero('imageAlt'),
    description: tMeta('ogDescription'),
    thumbnailUrl: `${SITE_URL}/product-1.avif`,
    uploadDate: '2026-04-01',
    contentUrl: `${SITE_URL}/product-video.mp4`,
    inLanguage,
  };

  const allSchemas = [
    productSchema,
    organizationSchema,
    websiteSchema,
    faqSchema,
    howToSchema,
    videoSchema,
  ];

  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

  return (
    <html lang={locale} className={`${display.variable} ${mono.variable}`}>
      <head>
        {allSchemas.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        {clarityId && <Clarity projectId={clarityId} />}
      </body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
