import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ChargeBase UA — Портативні зарядні станції LiFePO4',
    short_name: 'ChargeBase UA',
    description:
      'Портативні зарядні станції 2400W з акумулятором LiFePO4. Доставка в Україну без розмитнення.',
    start_url: '/',
    display: 'standalone',
    background_color: '#020617',
    theme_color: '#10b981',
    icons: [
      { src: '/icon', sizes: '32x32', type: 'image/png' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  };
}
