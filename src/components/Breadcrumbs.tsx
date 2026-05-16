import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const SITE_URL = 'https://chargebase-ua.vercel.app';

export type Crumb = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            return (
              <li key={idx} className="flex items-center gap-2">
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="transition hover:text-emerald-400"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className={isLast ? 'text-slate-200' : ''}>
                    {item.label}
                  </span>
                )}
                {!isLast && (
                  <ChevronRight size={14} className="text-slate-600" />
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
