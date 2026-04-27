'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';
import { MotionSection, MotionItem } from './MotionSection';

type MediaItem =
  | { type: 'image'; src: string }
  | { type: 'video'; src: string; poster: string };

const items: MediaItem[] = [
  { type: 'image', src: '/product-1.avif' },
  { type: 'image', src: '/product-2.avif' },
  { type: 'image', src: '/product-3.avif' },
  { type: 'image', src: '/product-4.avif' },
  { type: 'image', src: '/product-5.avif' },
  { type: 'image', src: '/product-6.avif' },
  { type: 'video', src: '/product-video.mp4', poster: '/product-1.avif' },
];

export function Gallery() {
  const [active, setActive] = useState<MediaItem | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (active?.type === 'video') {
      videoRef.current?.play().catch(() => {});
    }
  }, [active]);

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
                    src={item.type === 'video' ? item.poster : item.src}
                    alt={`ChargeBase 2400W ${idx + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />
                  {item.type === 'video' && (
                    <span className="absolute inset-0 flex items-center justify-center bg-black/40 transition group-hover:bg-black/30">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 shadow-2xl shadow-emerald-500/50 transition group-hover:scale-110">
                        <Play
                          size={22}
                          className="ml-0.5 text-slate-950"
                          fill="currentColor"
                        />
                      </span>
                    </span>
                  )}
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
              {active.type === 'image' ? (
                <Image
                  src={active.src}
                  alt="ChargeBase 2400W"
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              ) : (
                <video
                  ref={videoRef}
                  src={active.src}
                  poster={active.poster}
                  controls
                  playsInline
                  className="h-full w-full object-contain"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
