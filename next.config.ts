import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ae-pic-a1.aliexpress-media.com',
      },
      {
        protocol: 'https',
        hostname: 'ae01.alicdn.com',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
