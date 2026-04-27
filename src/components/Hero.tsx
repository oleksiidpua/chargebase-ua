'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Shield, Truck, BatteryCharging } from 'lucide-react';
import Image from 'next/image';

export function Hero() {
  const t = useTranslations('Hero');

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-12 pb-20 sm:pt-16 lg:pt-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 217, 126, 0.18), transparent), radial-gradient(ellipse 60% 40% at 80% 110%, rgba(251, 191, 36, 0.08), transparent)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8">
        <div className="flex flex-col justify-center">
          <h1 className="sr-only">{t('h1Seo')}</h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-300"
          >
            <Sparkles size={14} />
            {t('badge')}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
          >
            {t('title')}
            <span className="mt-2 block bg-linear-to-r from-emerald-400 via-emerald-300 to-amber-400 bg-clip-text text-transparent">
              {t('titleAccent')}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg"
          >
            {t('subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex items-end gap-4"
          >
            <div>
              <div className="text-xs uppercase tracking-wider text-slate-400">
                {t('priceLabel')}
              </div>
              <div className="mt-1 flex items-baseline gap-3">
                <span className="text-4xl font-bold text-emerald-400 sm:text-5xl">
                  {t('newPrice')}
                </span>
                <span className="text-lg text-slate-500 line-through">
                  {t('oldPrice')}
                </span>
              </div>
            </div>
            <span className="mb-2 rounded-md bg-amber-500/20 px-2 py-1 text-sm font-bold text-amber-400">
              {t('discount')}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href="#order"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-7 py-4 text-base font-semibold text-slate-950 transition hover:bg-emerald-400 hover:shadow-2xl hover:shadow-emerald-500/40"
            >
              {t('cta')}
              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-1"
              />
            </a>
            <a
              href="#powers"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-4 text-base font-semibold text-slate-200 transition hover:border-white/25 hover:bg-white/10"
            >
              {t('ctaSecondary')}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-10 flex flex-wrap gap-6 text-sm text-slate-400"
          >
            <div className="flex items-center gap-2">
              <BatteryCharging size={16} className="text-emerald-400" />
              {t('trust1')}
            </div>
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-emerald-400" />
              {t('trust2')}
            </div>
            <div className="flex items-center gap-2">
              <Truck size={16} className="text-emerald-400" />
              {t('trust3')}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative flex items-center justify-center"
        >
          <div className="relative aspect-square w-full max-w-lg">
            <div className="absolute inset-0 animate-pulse-glow rounded-full bg-emerald-500/20 blur-3xl" />
            <div className="relative flex h-full w-full items-center justify-center">
              <Image
                src="/hero.avif"
                alt={t('imageAlt')}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 500px"
                className="animate-float object-contain"
              />
            </div>

            <div className="absolute -left-4 top-1/4 hidden rounded-2xl border border-white/10 bg-slate-900/80 p-3 backdrop-blur sm:block">
              <div className="text-xs text-slate-400">Capacity</div>
              <div className="text-lg font-bold text-emerald-400">2048 Wh</div>
            </div>
            <div className="absolute -right-4 top-2/3 hidden rounded-2xl border border-white/10 bg-slate-900/80 p-3 backdrop-blur sm:block">
              <div className="text-xs text-slate-400">Output</div>
              <div className="text-lg font-bold text-amber-400">2400 W</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
