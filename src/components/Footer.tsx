'use client';

import { useTranslations } from 'next-intl';
import { Zap, Mail, Phone, Send, MessageCircle } from 'lucide-react';

export function Footer() {
  const t = useTranslations('Footer');
  const tHeader = useTranslations('Header');

  const navLinks = [
    { href: '#tech', label: tHeader('specs') },
    { href: '#powers', label: tHeader('powers') },
    { href: '#how', label: tHeader('delivery') },
    { href: '#trust', label: tHeader('faq') },
  ];

  return (
    <footer className="border-t border-white/5 bg-slate-950 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <a href="#top" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/30">
                <Zap size={20} className="text-slate-950" strokeWidth={2.5} />
              </span>
              <span className="text-lg font-bold tracking-tight">
                ChargeBase UA
              </span>
            </a>
            <p className="mt-4 max-w-sm text-sm text-slate-400">
              {t('tagline')}
            </p>
            <div className="mt-6 flex gap-3">
              <SocialBtn href="https://t.me/" label="Telegram">
                <Send size={16} />
              </SocialBtn>
              <SocialBtn href="viber://" label="Viber">
                <MessageCircle size={16} />
              </SocialBtn>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              {t('navigation')}
            </h4>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 transition hover:text-emerald-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              {t('contacts')}
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`tel:${t('phone').replace(/\s/g, '')}`}
                  className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-emerald-400"
                >
                  <Phone size={14} />
                  {t('phone')}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${t('email')}`}
                  className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-emerald-400"
                >
                  <Mail size={14} />
                  {t('email')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 sm:flex-row">
          <p className="text-xs text-slate-500">{t('copyright')}</p>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span>{t('payment')}:</span>
            <span className="rounded bg-white/5 px-2 py-1">Monobank</span>
            <span className="rounded bg-white/5 px-2 py-1">LiqPay</span>
            <span className="rounded bg-white/5 px-2 py-1">Privat24</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialBtn({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-400"
    >
      {children}
    </a>
  );
}
