'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MotionSection } from './MotionSection';

const ITEM_IDS = ['boiler', 'fridge', 'delivery', 'customs', 'damaged', 'solar', 'warranty'] as const;

export function Faq() {
  const t = useTranslations('Faq');
  const [openId, setOpenId] = useState<string | null>(ITEM_IDS[0]);

  return (
    <MotionSection id="faq" className="section-padding">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {t('sectionTitle')}
          </h2>
          <p className="mt-4 text-base text-slate-400 sm:text-lg">
            {t('sectionSubtitle')}
          </p>
        </div>

        <div className="mt-12 space-y-3">
          {ITEM_IDS.map((id) => {
            const isOpen = openId === id;
            return (
              <div
                key={id}
                className={`overflow-hidden rounded-2xl border transition ${
                  isOpen
                    ? 'border-emerald-500/30 bg-emerald-500/5'
                    : 'border-white/10 bg-white/2 hover:border-white/20'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : id)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                  aria-expanded={isOpen}
                >
                  <h3 className="text-base font-semibold text-slate-100 sm:text-lg">
                    {t(`items.${id}.q`)}
                  </h3>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-emerald-400 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-slate-300 sm:px-6 sm:pb-6 sm:text-base">
                        {t(`items.${id}.a`)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </MotionSection>
  );
}
