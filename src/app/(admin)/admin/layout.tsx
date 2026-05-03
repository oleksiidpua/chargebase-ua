import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import '../../globals.css';

const display = Plus_Jakarta_Sans({
  variable: '--font-display',
  subsets: ['latin', 'cyrillic-ext'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Admin — ChargeBase UA',
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: '#020617',
  colorScheme: 'dark',
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={display.variable}>
      <body>{children}</body>
    </html>
  );
}
