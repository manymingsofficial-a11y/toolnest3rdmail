'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, LayoutGrid } from 'lucide-react';

import { cn } from '@/lib/utils';
import { categories, getToolsByCategory } from '@/lib/data';
import { PageHeader } from '@/components/page-header';

export default function CategoriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Browse by discipline"
        title="Explore tool categories"
        description="Collections covering PDF, image, QR & barcode, text, developer, security, calculators, converters and more — each with its own set of focused tools."
      />

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {categories.map((cat) => {
            const catTools = getToolsByCategory(cat.name);
            const featured = catTools[0];
            const actualCount = catTools.length || cat.count;

            const CatIcon = cat.icon;
            const FeaturedIcon = featured?.icon;

            return (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="group relative overflow-hidden rounded-2xl glass-card p-6 transition-all duration-300 hover:-translate-y-1 hover:glow"
              >
                <div
                  aria-hidden
                  className={cn(
                    'absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br opacity-20 blur-3xl transition-opacity duration-300 group-hover:opacity-40',
                    cat.gradient
                  )}
                />

                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      'grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg',
                      cat.gradient
                    )}
                  >
                    <CatIcon className="h-7 w-7" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold tracking-tight">{cat.name}</h2>
                      <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                        {actualCount} {actualCount === 1 ? 'tool' : 'tools'}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {cat.description}
                    </p>
                  </div>
                  <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:text-foreground" />
                </div>

                {featured && (
                  <div className="mt-5 rounded-xl border border-border/60 bg-background/40 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Featured tool
                    </p>
                    <div className="mt-2 flex items-center gap-3">
                    {FeaturedIcon && (
                      <div
                        className={cn(
                          'grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br text-white',
                          featured.gradient
                        )}
                      >
                        <FeaturedIcon className="h-4 w-4" />
                      </div>
                    )}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">{featured.name}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          {featured.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {catTools.slice(0, 4).map((t) => (
                    <span
                      key={t.slug}
                      className="rounded-lg border border-border/60 bg-background/40 px-2.5 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {t.name}
                    </span>
                  ))}
                  {catTools.length > 4 && (
                    <span className="rounded-lg px-2.5 py-1 text-xs text-muted-foreground">
                      +{catTools.length - 4} more
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/40 px-5 py-2.5 text-sm font-medium backdrop-blur-md transition-colors hover:text-brand-blue"
          >
            <LayoutGrid className="h-4 w-4 text-brand-blue" />
            View all tools
          </Link>
        </div>
      </section>
    </>
  );
}
