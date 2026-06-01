'use client';

import Link from 'next/link';
import { trackInitiateCheckout } from '@/lib/metaPixel';

interface Props {
  href: string;
  className: string;
  children: React.ReactNode;
  asLink?: boolean;
}

export function CheckoutButton({ href, className, children, asLink = false }: Props) {
  const handleClick = () =>
    trackInitiateCheckout({
      content_name: 'ALLPOWERS R2500',
      value: 39990,
      currency: 'UAH',
    });

  if (asLink) {
    return (
      <Link href={href} onClick={handleClick} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
