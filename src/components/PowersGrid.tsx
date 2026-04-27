'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Refrigerator,
  Laptop,
  Coffee,
  Flame,
  Tv,
  Wifi,
  Lightbulb,
  Smartphone,
  Check,
} from 'lucide-react';
import { MotionSection } from './MotionSection';

const items = [
  { id: 'fridge', icon: Refrigerator, hours: 17 },
  { id: 'laptop', icon: Laptop, hours: 28 },
  { id: 'coffee', icon: Coffee, hours: 12 },
  { id: 'boiler', icon: Flame, hours: 11 },
  { id: 'tv', icon: Tv, hours: 22 },
  { id: 'router', icon: Wifi, hours: 60 },
  { id: 'lamp', icon: Lightbulb, hours: 100 },
  { id: 'phone', icon: Smartphone, hours: 80 },
] as const;

export function PowersGrid() {
  const t = useTranslations('Powers');
  const [selected, setSelected] = useState<Set<string>>(new Set(['fridge']));

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const totalHours =
    selected.size === 0
      ? 0
      : items
          .filter((it) => selected.has(it.id))
          .reduce((acc, it) => acc + 1 / it.hours, 0);

  const combined = totalHours === 0 ? 0 : 1 / totalHours;
  const wholeHours = Math.floor(combined);
  const minutes = Math.round((combined - wholeHours) * 60);

  return (
    <MotionSection id="powers" className="section-padding">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {t('sectionTitle')}
          </h2>
          <p className="mt-4 text-base text-slate-400 sm:text-lg">
            {t('sectionSubtitle')}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {items.map((item, idx) => {
            const Icon = item.icon;
            const active = selected.has(item.id);
            return (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => toggle(item.id)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                className={`group relative flex flex-col items-start gap-3 rounded-2xl border p-5 text-left transition ${
                  active
                    ? 'border-emerald-500/50 bg-emerald-500/10 shadow-lg shadow-emerald-500/10'
                    : 'border-white/10 bg-white/2 hover:border-white/20 hover:bg-white/4'
                }`}
              >
                {active && (
                  <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-slate-950">
                    <Check size={12} strokeWidth={3} />
                  </span>
                )}
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-xl transition ${
                    active
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-white/5 text-slate-300 group-hover:bg-white/10'
                  }`}
                >
                  <Icon size={24} />
                </span>
                <div>
                  <div className="font-semibold">
                    {t(`items.${item.id}.name`)}
                  </div>
                  <div className="mt-1 text-xs text-slate-400">
                    {t(`items.${item.id}.duration`)}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 overflow-hidden rounded-3xl border border-emerald-500/20 bg-linear-to-br from-emerald-500/10 via-slate-900/50 to-amber-500/10 p-6 sm:p-8"
        >
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <div className="text-sm uppercase tracking-wider text-slate-400">
                {t('totalLabel')}
              </div>
              <div className="mt-2 text-5xl font-bold tabular-nums text-white sm:text-6xl">
                {selected.size === 0 ? (
                  <span className="text-2xl text-slate-500">
                    {t('noDevices')}
                  </span>
                ) : (
                  <>
                    <span className="bg-linear-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">
                      {wholeHours}
                    </span>
                    <span className="ml-2 text-2xl font-medium text-slate-400">
                      {t('hours')}
                    </span>
                    {minutes > 0 && (
                      <>
                        <span className="ml-3 bg-linear-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">
                          {minutes}
                        </span>
                        <span className="ml-2 text-2xl font-medium text-slate-400">
                          {t('minutes')}
                        </span>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {[...selected].map((id) => {
                const item = items.find((it) => it.id === id)!;
                const Icon = item.icon;
                return (
                  <span
                    key={id}
                    className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1.5 text-xs font-medium text-emerald-300"
                  >
                    <Icon size={12} />
                    {t(`items.${id}.name`)}
                  </span>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </MotionSection>
  );
}
