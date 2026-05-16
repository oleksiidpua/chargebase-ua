import Link from 'next/link';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { ARTICLES } from '@/lib/blog/registry';

type Props = {
  currentSlug: string;
  locale: string;
  max?: number;
};

export async function RelatedArticles({ currentSlug, locale, max = 3 }: Props) {
  const t = await getTranslations({ locale, namespace: 'Blog' });
  const dateLocale = locale === 'uk' ? 'uk-UA' : locale === 'ru' ? 'ru-RU' : 'en-US';

  const related = ARTICLES.filter((a) => a.slug !== currentSlug).slice(0, max);
  if (related.length === 0) return null;

  return (
    <section className="mt-16 border-t border-white/5 pt-12">
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
        {t('relatedTitle')}
      </h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {related.map((article) => {
          const href =
            locale === 'uk' ? `/blog/${article.slug}` : `/${locale}/blog/${article.slug}`;
          return (
            <Link
              key={article.slug}
              href={href}
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
              <div className="flex flex-1 flex-col gap-2 p-5">
                <div className="flex items-center gap-2 text-xs text-slate-400">
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
                <h3 className="text-lg font-bold leading-tight transition group-hover:text-emerald-400">
                  {article.title}
                </h3>
                <p className="line-clamp-2 text-sm text-slate-400">
                  {article.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
