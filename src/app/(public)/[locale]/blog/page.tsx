import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ARTICLES } from '@/lib/blog/registry';

const SITE_URL = 'https://chargebase-ua.vercel.app';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Blog' });

  const path = locale === 'uk' ? '/blog' : `/${locale}/blog`;
  return {
    title: t('listTitle'),
    description: t('listDescription'),
    alternates: {
      canonical: `${SITE_URL}${path}`,
    },
  };
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Blog' });

  const dateLocale = locale === 'uk' ? 'uk-UA' : locale === 'ru' ? 'ru-RU' : 'en-US';

  return (
    <>
      <Header />
      <main className="section-padding">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {t('listTitle')}
            </h1>
            <p className="mt-4 text-base text-slate-400 sm:text-lg">
              {t('listDescription')}
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {ARTICLES.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/2 transition hover:border-emerald-500/40 hover:bg-white/4"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                  <Image
                    src={article.thumbnail}
                    alt={article.thumbnailAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <time dateTime={article.date}>
                      {new Date(article.date).toLocaleDateString(dateLocale, {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </time>
                    <span>·</span>
                    <span>
                      {article.readMinutes} {t('minutesRead')}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold leading-tight transition group-hover:text-emerald-400">
                    {article.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-slate-400">
                    {article.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
