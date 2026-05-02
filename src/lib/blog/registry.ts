import { article as yakVybratyArticle } from './articles/yak-vybraty-zaryadnu-stantsiyu-2026';
import type { Article } from './types';

export const ARTICLES: Article[] = [yakVybratyArticle].sort((a, b) =>
  b.date.localeCompare(a.date),
);

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
