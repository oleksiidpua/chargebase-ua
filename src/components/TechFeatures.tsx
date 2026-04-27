'use client';

import { useTranslations } from 'next-intl';
import { Battery, Activity, Zap } from 'lucide-react';
import { MotionSection, MotionItem } from './MotionSection';

export function TechFeatures() {
  const t = useTranslations('Tech');

  const features = [
    { id: 'feature1', icon: Battery, accent: 'from-emerald-400 to-emerald-600' },
    { id: 'feature2', icon: Activity, accent: 'from-blue-400 to-blue-600' },
    { id: 'feature3', icon: Zap, accent: 'from-amber-400 to-amber-600' },
  ] as const;

  return (
    <MotionSection id="tech" className="section-padding">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {t('sectionTitle')}
          </h2>
          <p className="mt-4 text-base text-slate-400 sm:text-lg">
            {t('sectionSubtitle')}
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <MotionItem key={feature.id} delay={idx * 0.1}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-linear-to-b from-white/4 to-transparent p-8 transition hover:border-white/20">
                  <div
                    className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br ${feature.accent} shadow-lg`}
                  >
                    <Icon size={28} className="text-slate-950" strokeWidth={2.2} />
                  </div>
                  <h3 className="text-xl font-bold">
                    {t(`${feature.id}.title`)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {t(`${feature.id}.description`)}
                  </p>
                  <div
                    className={`absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-linear-to-br ${feature.accent} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20`}
                  />
                </div>
              </MotionItem>
            );
          })}
        </div>
      </div>
    </MotionSection>
  );
}
