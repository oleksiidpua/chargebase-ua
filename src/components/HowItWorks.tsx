'use client';

import { useTranslations } from 'next-intl';
import { ShoppingCart, Package, Home } from 'lucide-react';
import { MotionSection, MotionItem } from './MotionSection';

export function HowItWorks() {
  const t = useTranslations('How');

  const steps = [
    { id: 'step1', icon: ShoppingCart, num: '01' },
    { id: 'step2', icon: Package, num: '02' },
    { id: 'step3', icon: Home, num: '03' },
  ] as const;

  return (
    <MotionSection id="how" className="section-padding bg-white/2">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {t('sectionTitle')}
          </h2>
          <p className="mt-4 text-base text-slate-400 sm:text-lg">
            {t('sectionSubtitle')}
          </p>
        </div>

        <div className="relative mt-14 grid gap-6 lg:grid-cols-3">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-12 hidden h-px bg-linear-to-r from-transparent via-emerald-500/30 to-transparent lg:block"
          />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <MotionItem key={step.id} delay={idx * 0.15}>
                <div className="relative flex flex-col items-center text-center">
                  <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full border-2 border-emerald-500/40 bg-slate-950 shadow-lg shadow-emerald-500/10">
                    <Icon size={32} className="text-emerald-400" />
                    <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-slate-950">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl font-bold">
                    {t(`${step.id}.title`)}
                  </h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-400">
                    {t(`${step.id}.description`)}
                  </p>
                </div>
              </MotionItem>
            );
          })}
        </div>
      </div>
    </MotionSection>
  );
}
