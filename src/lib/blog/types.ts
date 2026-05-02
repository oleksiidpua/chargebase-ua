import type { ReactNode } from 'react';

export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  readMinutes: number;
  thumbnail: string;
  thumbnailAlt: string;
  Content: () => ReactNode;
}
