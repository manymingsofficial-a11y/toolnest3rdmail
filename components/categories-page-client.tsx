'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import { getIcon } from '@/lib/icon-map';
import { PageHeader } from '@/components/page-header';
import { AdPlaceholder } from '@/components/ads/ad-placeholder';
import type { Tool, Category } from '@/lib/data';

export function CategoriesPageClient({
  tools,
  categories,
}: {
  tools: Tool[];
  categories: Category[];
}) {
  const searchParams = useSearchParams();
  const initialSlug = searchParams.get('cat') || 'all';
  const [activeSlug, setActiveSlug] = React.useState<string>(initialSlug);

  const activeCategory = categories.find((c) => c.slug === activeSlug);
  const filteredTools = activeSlug === 'all'
    ? tools
    : tools.filter((t) => t.category === activeCategory?.name);

  return (
    <>
      <PageHeader
        eyebrow="Categories"
        title="Browse by category"
        description={`${categories.length} categories with ${tools.length} free tools. Find exactly what you need.`}
      />

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <AdPlaceholder slot="category-top" className="mb-6" />

        {/* Category chips */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSlug('all')}
            className={cn(
              'rounded-lg px-3 py-1.5 text-xs font-medium transition-all',
              activeSlug === 'all'
                ? 'bg-gradient-brand text-white'
                : 'border border-border/60 bg-background/40 text-muted-foreground hover:text-foreground'
            )}
          >
            All ({tools.length})
          </button>
          {categories.map((cat) => {
            const count = tools.filter((t) => t.category === cat.name).length;
            return (
              <button
                key={cat.slug}
                onClick={() => setActiveSlug(cat.slug)}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-xs font-medium transition-all',
                  activeSlug === cat.slug
                    ? 'bg-gradient-brand text-white'
                    : 'border border-border/60 bg-background/40 text-muted-foreground hover:text-foreground'
                )}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Category cards */}
        {activeSlug === 'all' ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((cat) => {
              const CatIcon = getIcon(cat.icon);
              const count = tools.filter((t) => t.category === cat.name).length;
              return (
                <button
                  key={cat.slug}
                  onClick={() => setActiveSlug(cat.slug)}
                  className="group relative block overflow-hidden rounded-2xl glass-card p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:glow"
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
                </button>
              );
            })}
          </div>
        ) : (
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div
                className={cn(
                  'grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br text-white shadow-lg',
                  activeCategory?.gradient
                )}
              >
                {(() => {
                  const Icon = activeCategory ? getIcon(activeCategory.icon) : null;
                  return Icon ? <Icon className="h-5 w-5" /> : null;
                })()}
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight">
                  {activeCategory?.name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {activeCategory?.description}
                </p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filteredTools.map((tool) => {
                const ToolIcon = getIcon(tool.icon);
                return (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="group relative block overflow-hidden rounded-2xl glass-card p-5 transition-all duration-300 hover:-translate-y-1 hover:glow"
                  >
                    <div className="flex items-start justify-between">
                      <div
                        className={cn(
                          'grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br text-white shadow-lg transition-transform duration-300 group-hover:scale-110',
                          tool.gradient
                        )}
                      >
                        <ToolIcon className="h-5 w-5" />
                      </div>
                    </div>
                    <h3 className="mt-4 text-base font-semibold tracking-tight">
                      {tool.name}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                      {tool.description}
                    </p>
                    <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors group-hover:text-brand-purple">
                      Open tool
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        <AdPlaceholder slot="category-middle" className="mt-6" />
        <AdPlaceholder slot="category-bottom" className="mt-6" />
      </section>
    </>
  );
}
