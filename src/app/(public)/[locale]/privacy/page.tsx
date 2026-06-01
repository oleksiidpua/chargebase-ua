import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const SITE_URL = 'https://chargebase-ua.vercel.app';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Privacy' });
  const path = locale === 'uk' ? '/privacy' : `/${locale}/privacy`;
  return {
    title: t('title'),
    description: t('intro'),
    alternates: { canonical: `${SITE_URL}${path}` },
    robots: { index: true, follow: false },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Privacy' });
  const tCrumbs = await getTranslations({ locale, namespace: 'Breadcrumbs' });
  const localePrefix = locale === 'uk' ? '' : `/${locale}`;

  const s1 = t.raw('s1') as string[];
  const s2 = t.raw('s2') as string[];
  const s3OptOut = t.raw('s3OptOut') as string[];
  const s4 = t.raw('s4') as string[];
  const s6 = t.raw('s6') as string[];

  return (
    <>
      <Header />
      <main className="section-padding">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: tCrumbs('home'), href: `${localePrefix}/` },
              { label: tCrumbs('privacy') },
            ]}
          />
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {t('title')}
          </h1>
          <p className="mt-3 text-sm text-slate-400">{t('lastUpdated')}</p>
          <p className="mt-6 text-base leading-relaxed text-slate-300">
            {t('intro')}
          </p>

          <section className="mt-10">
            <h2 className="text-2xl font-bold">{t('s1Title')}</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-300">
              {s1.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-bold">{t('s2Title')}</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-300">
              {s2.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-bold">{t('s3Title')}</h2>
            <p className="mt-4 leading-relaxed text-slate-300">{t('s3')}</p>
            <p className="mt-4 font-semibold text-slate-200">
              {t('s3OptOutTitle')}
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-6 text-slate-300">
              {s3OptOut.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-bold">{t('s4Title')}</h2>
            <p className="mt-4 text-slate-300">{t('s4Intro')}</p>
            <ul className="mt-2 list-disc space-y-2 pl-6 text-slate-300">
              {s4.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="mt-4 font-semibold text-slate-200">{t('s4Outro')}</p>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-bold">{t('s5Title')}</h2>
            <p className="mt-4 leading-relaxed text-slate-300">{t('s5')}</p>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-bold">{t('s6Title')}</h2>
            <p className="mt-4 text-slate-300">{t('s6Intro')}</p>
            <ul className="mt-2 list-disc space-y-2 pl-6 text-slate-300">
              {s6.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-bold">{t('s7Title')}</h2>
            <p className="mt-4 text-slate-300">{t('s7')}</p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
