'use client';

import { useTranslations } from 'next-intl';
import { Zap, Menu, X, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { LangSwitcher } from './LangSwitcher';

export function Header() {
  const t = useTranslations('Header');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = [
    { href: '#tech', label: t('specs') },
    { href: '#powers', label: t('powers') },
    { href: '#how', label: t('delivery') },
    { href: '#trust', label: t('faq') },
  ];

  return (
    <>
      <div className="hidden border-b border-emerald-500/20 bg-emerald-500/5 px-4 py-2 text-center text-xs font-medium text-emerald-300 sm:block">
        ⚡ {t('status')}
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'border-b border-white/5 bg-slate-950/80 backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/30">
              <Zap size={20} className="text-slate-950" strokeWidth={2.5} />
            </span>
            <span className="text-lg font-bold tracking-tight">
              {t('brand')}
            </span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-300 transition hover:text-emerald-400"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <LangSwitcher />
            <a
              href="#order"
              className="hidden items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/30 sm:flex"
            >
              <MessageCircle size={16} />
              {t('consultation')}
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 lg:hidden"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-white/5 bg-slate-950/95 backdrop-blur-xl lg:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-slate-200 transition hover:bg-white/5 hover:text-emerald-400"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#order"
                onClick={() => setMobileOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950"
              >
                <MessageCircle size={16} />
                {t('consultation')}
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
