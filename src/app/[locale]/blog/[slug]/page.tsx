import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { ArrowLeft } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ARTICLES, getArticleBySlug } from '@/lib/blog/registry';

const SITE_URL = 'https://chargebase-ua.vercel.app';

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  const path =
    locale === 'uk' ? `/blog/${slug}` : `/${locale}/blog/${slug}`;

  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `${SITE_URL}${path}` },
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      url: `${SITE_URL}${path}`,
      publishedTime: article.date,
      images: [{ url: article.thumbnail, alt: article.thumbnailAlt }],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const t = await getTranslations({ locale, namespace: 'Blog' });
  const dateLocale = locale === 'uk' ? 'uk-UA' : locale === 'ru' ? 'ru-RU' : 'en-US';
  const articleUrl = `${SITE_URL}${locale === 'uk' ? `/blog/${slug}` : `/${locale}/blog/${slug}`}`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: `${SITE_URL}${article.thumbnail}`,
    datePublished: article.date,
    dateModified: article.date,
    author: { '@type': 'Organization', name: 'ChargeBase UA', url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: 'ChargeBase UA',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/og-image.jpg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Header />
      <main className="section-padding">
        <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-emerald-400"
          >
            <ArrowLeft size={16} />
            {t('backToList')}
          </Link>

          <header className="mt-8">
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
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
            <h1 className="mt-4 text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl">
              {article.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              {article.description}
            </p>
          </header>

          <div className="relative mt-10 aspect-video w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-900">
            <Image
              src={article.thumbnail}
              alt={article.thumbnailAlt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>

          <div className="prose-article mt-10">
            <article.Content />
          </div>

          <div className="mt-16 rounded-3xl border border-emerald-500/20 bg-linear-to-br from-emerald-500/10 via-slate-900/50 to-amber-500/10 p-8 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">
              {t('ctaTitle')}
            </h2>
            <p className="mt-3 text-slate-300">{t('ctaSubtitle')}</p>
            <Link
              href="/#order"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-7 py-3.5 text-base font-semibold text-slate-950 transition hover:bg-emerald-400 hover:shadow-2xl hover:shadow-emerald-500/40"
            >
              {t('ctaButton')}
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
