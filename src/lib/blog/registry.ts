import { article as yakVybratyArticle } from './articles/yak-vybraty-zaryadnu-stantsiyu-2026';
import { article as vsHeneratorArticle } from './articles/zaryadna-stantsiya-vs-henerator-2026';
import { article as oglyadR2500Article } from './articles/oglyad-allpowers-r2500-2026';
import type { Article } from './types';

export const ARTICLES: Article[] = [yakVybratyArticle, vsHeneratorArticle, oglyadR2500Article].sort(
  (a, b) => b.date.localeCompare(a.date),
);

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
