'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useTransition, useState, useRef, useEffect } from 'react';
import { Globe, Check } from 'lucide-react';
import { routing } from '@/i18n/routing';

const flags: Record<string, string> = {
  uk: '🇺🇦',
  ru: '🇷🇺',
  en: '🇬🇧',
};

export function LangSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('LangSwitcher');
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function switchTo(next: string) {
    setOpen(false);
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next as typeof locale });
    });
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        disabled={isPending}
        aria-label={t('label')}
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:border-white/20 hover:bg-white/10 disabled:opacity-50"
      >
        <Globe size={16} className="text-emerald-400" />
        <span className="text-base leading-none">{flags[locale]}</span>
        <span className="hidden uppercase tracking-wider sm:inline">{locale}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-xl border border-white/10 bg-slate-900/95 shadow-2xl backdrop-blur">
          {routing.locales.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => switchTo(l)}
              className="flex w-full items-center justify-between px-4 py-3 text-sm text-slate-200 transition hover:bg-white/5"
            >
              <span className="flex items-center gap-3">
                <span className="text-base">{flags[l]}</span>
                <span>{t(l)}</span>
              </span>
              {l === locale && <Check size={16} className="text-emerald-400" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
