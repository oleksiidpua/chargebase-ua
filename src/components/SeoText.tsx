'use client';

import { useTranslations } from 'next-intl';

export function SeoText() {
  const t = useTranslations('SeoText');

  return (
    <section className="border-t border-white/5 py-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-xl font-bold text-slate-200">{t('title')}</h2>
        <p className="mb-6 text-sm leading-relaxed text-slate-400">{t('intro')}</p>
        <h3 className="mb-4 text-base font-semibold text-slate-300">{t('featuresTitle')}</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-1 text-sm font-semibold text-emerald-400">{t('feature1Title')}</p>
            <p className="text-sm leading-relaxed text-slate-400">{t('feature1')}</p>
          </div>
          <div>
            <p className="mb-1 text-sm font-semibold text-emerald-400">{t('feature2Title')}</p>
            <p className="text-sm leading-relaxed text-slate-400">{t('feature2')}</p>
          </div>
          <div>
            <p className="mb-1 text-sm font-semibold text-emerald-400">{t('feature3Title')}</p>
            <p className="text-sm leading-relaxed text-slate-400">{t('feature3')}</p>
          </div>
          <div>
            <p className="mb-1 text-sm font-semibold text-emerald-400">{t('feature4Title')}</p>
            <p className="text-sm leading-relaxed text-slate-400">{t('feature4')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
