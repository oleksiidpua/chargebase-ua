'use client';

import { useEffect } from 'react';
import { trackViewContent } from '@/lib/metaPixel';

export function ViewContentTracker() {
  useEffect(() => {
    trackViewContent({
      content_name: 'ALLPOWERS R2500',
      content_category: 'Portable Power Station',
      content_ids: ['allpowers-r2500'],
      content_type: 'product',
      value: 39990,
      currency: 'UAH',
    });
  }, []);

  return null;
}
