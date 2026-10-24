import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import { getIcon } from '@/lib/icon-map';
import type { Category, Tool } from '@/lib/data';

export function Categories({
  categories,
  tools,
}: {
  categories: Category[];
  tools?: Tool[];
}) {
  const getCatToolCount = (catName: string): number => {
    if (tools) return tools.filter((t) => t.category === catName).length;
    return 0;
  };

  return (
    <section id="categories" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-end justify-between gap-4 sm:flex-row">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-medium text-brand-blue">
              <ArrowUpRight className="h-4 w-4" />
              Categories
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Find tools by category
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Each category groups focused tools so you can find exactly what
              you need without scrolling through hundreds of options.
            </p>
          </div>
          <Link
            href="/categories"
            className="group inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors hover:text-brand-purple"
          >
            View all categories
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((cat) => {
            const CatIcon = getIcon(cat.icon);
            const count = getCatToolCount(cat.name) || cat.count;
            return (
              <Link
                key={cat.slug}
                href="/categories"
                className="group relative block overflow-hidden rounded-2xl glass-card p-6 transition-all duration-300 hover:-translate-y-1 hover:glow"
              >
                <div
                  aria-hidden
                  className={cn(
                    'absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br opacity-20 blur-2xl transition-opacity duration-300 group-hover:opacity-40',
                    cat.gradient
                  )}
                />
                <div
                  className={cn(
                    'grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br text-white shadow-lg transition-transform duration-300 group-hover:scale-110',
                    cat.gradient
                  )}
                >
                  <CatIcon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-base font-semibold tracking-tight">
                  {cat.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                  {cat.description}
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                    {count} {count === 1 ? 'tool' : 'tools'}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors group-hover:text-brand-purple">
                    Explore
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
