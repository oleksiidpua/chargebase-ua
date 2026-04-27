'use client';

import { useTranslations } from 'next-intl';
import { ShieldCheck, MessageSquare, Star, Award } from 'lucide-react';
import { MotionSection, MotionItem } from './MotionSection';

export function Trust() {
  const t = useTranslations('Trust');

  const cards = [
    { id: 'guarantee', icon: ShieldCheck },
    { id: 'support', icon: MessageSquare },
    { id: 'reviews', icon: Star },
  ] as const;

  return (
    <MotionSection id="trust" className="section-padding">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {t('sectionTitle')}
          </h2>
          <p className="mt-4 text-base text-slate-400 sm:text-lg">
            {t('sectionSubtitle')}
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <MotionItem key={card.id} delay={idx * 0.1}>
                <div className="h-full rounded-3xl border border-white/10 bg-white/3 p-7 transition hover:border-emerald-500/30 hover:bg-white/5">
                  <Icon size={28} className="text-emerald-400" />
                  <h3 className="mt-5 text-lg font-bold">
                    {t(`${card.id}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {t(`${card.id}.description`)}
                  </p>
                </div>
              </MotionItem>
            );
          })}
        </div>

        <MotionItem delay={0.3}>
          <div className="mt-10 grid gap-4 rounded-3xl border border-white/10 bg-linear-to-br from-slate-900 to-slate-950 p-6 sm:grid-cols-3 sm:gap-8 sm:p-8">
            <Stat
              value="8 800+"
              label={t('stats.sales')}
              icon={<Award size={20} className="text-amber-400" />}
            />
            <Stat
              value="4.8 / 5"
              label={t('stats.rating')}
              icon={<Star size={20} className="text-amber-400" />}
            />
            <Stat
              value={t('stats.warrantyValue')}
              label={t('stats.warranty')}
              icon={<ShieldCheck size={20} className="text-emerald-400" />}
            />
          </div>
        </MotionItem>
      </div>
    </MotionSection>
  );
}

function Stat({
  value,
  label,
  icon,
}: {
  value: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5">
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold tabular-nums">{value}</div>
        <div className="text-sm text-slate-400">{label}</div>
      </div>
    </div>
  );
}
