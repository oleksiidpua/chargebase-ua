import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { GoogleAnalytics } from '@next/third-parties/google';
import { routing } from '@/i18n/routing';
import '../globals.css';

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

  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: 'Портативна зарядна станція 2400W LiFePO4',
    image: `${SITE_URL}/og-image.jpg`,
    description:
      'Потужна зарядна станція для дому з акумулятором LiFePO4 та чистою синусоїдою.',
    brand: { '@type': 'Brand', name: 'ChargeBase' },
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/`,
      priceCurrency: 'UAH',
      price: '22950',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
  };

  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang={locale} className={`${display.variable} ${mono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
