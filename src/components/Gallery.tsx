'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { MotionSection, MotionItem } from './MotionSection';

type MediaItem = { src: string; alt: string };

const items: MediaItem[] = [
  { src: '/product-1.avif', alt: 'Зарядна станція ChargeBase ALLPOWERS R2500 2500W LiFePO4 — вигляд спереду' },
  { src: '/product-2.avif', alt: 'Портативна електростанція 2500W для дому — загальний вигляд' },
  { src: '/product-3.avif', alt: 'Зарядна станція ChargeBase 2016 Вт·год — бічний вигляд' },
  { src: '/product-4.avif', alt: 'ALLPOWERS R2500 — роз\'єми, вихідні порти та дисплей' },
  { src: '/product-5.avif', alt: 'Зарядна станція ChargeBase — панель керування' },
  { src: '/product-6.avif', alt: 'Портативна станція 2500W у побутовому використанні' },
  { src: '/product-7.avif', alt: 'ALLPOWERS R2500 з розширювальними батареями B1000' },
];

export function Gallery() {
  const [active, setActive] = useState<MediaItem | null>(null);

  return (
    <>
      <MotionSection className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {items.map((item, idx) => (
              <MotionItem key={item.src} delay={idx * 0.05}>
                <button
                  type="button"
                  onClick={() => setActive(item)}
                  className="group relative block aspect-square w-full overflow-hidden rounded-2xl border border-white/10 bg-white/2 transition hover:border-emerald-500/40"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />
                </button>
              </MotionItem>
            ))}
          </div>
        </div>
      </MotionSection>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur"
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            >
              <X size={20} />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative h-[80vh] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={active.src}
                alt={active.alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
