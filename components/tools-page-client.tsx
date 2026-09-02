'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Search, SlidersHorizontal, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { getIcon } from '@/lib/icon-map';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/page-header';
import { AdPlaceholder } from '@/components/ads/ad-placeholder';
import { DEFAULT_AD_SETTINGS } from '@/lib/monetization';
import type { Tool, Category } from '@/lib/data';

export function ToolsPageClient({
  tools,
  categories,
}: {
  tools: Tool[];
  categories: Category[];
}) {
  const [query, setQuery] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState<string>('all');
  const [sortBy, setSortBy] = React.useState<'az' | 'newest' | 'popular'>('az');

  const filtered = React.useMemo(() => {
    let result = tools;
    if (activeCategory !== 'all') {
      const cat = categories.find((c) => c.slug === activeCategory);
      if (cat) result = result.filter((t) => t.category === cat.name);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)
      );
    }
    const sorted = [...result];
    if (sortBy === 'az') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'newest') {
      sorted.sort((a, b) => (b.addedDaysAgo ?? 999) - (a.addedDaysAgo ?? 999));
    } else if (sortBy === 'popular') {
      sorted.sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
    }
    return sorted;
  }, [tools, categories, activeCategory, query, sortBy]);

  return (
    <>
      <PageHeader
        eyebrow="All tools"
        title="Browse all tools"
        description={`${tools.length} free online tools across ${categories.length} categories. Search, filter and find exactly what you need.`}
      />

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <AdPlaceholder slot="category-top" className="mb-6" />

        {/* Search & filter bar */}
        <div className="mb-6 rounded-2xl glass-card p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tools…"
                className="h-11 w-full rounded-xl border border-input bg-background pl-10 pr-10 text-sm outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Search tools"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Sort:
              </span>
              {([
                { key: 'az' as const, label: 'A–Z' },
                { key: 'newest' as const, label: 'Newest' },
                { key: 'popular' as const, label: 'Most Used' },
              ]).map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setSortBy(key)}
                  className={cn(
                    'rounded-lg px-3 py-1.5 text-xs font-medium transition-all',
                    sortBy === key
                      ? 'bg-gradient-brand text-white shadow-md shadow-brand-purple/20'
                      : 'border border-border/60 bg-background/40 text-muted-foreground hover:text-foreground'
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Category filter chips */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={cn(
                'rounded-lg px-3 py-1.5 text-xs font-medium transition-all',
                activeCategory === 'all'
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
                  onClick={() => setActiveCategory(cat.slug)}
                  className={cn(
                    'rounded-lg px-3 py-1.5 text-xs font-medium transition-all',
                    activeCategory === cat.slug
                      ? 'bg-gradient-brand text-white'
                      : 'border border-border/60 bg-background/40 text-muted-foreground hover:text-foreground'
                  )}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {query && (
          <p className="mb-4 text-sm text-muted-foreground">
            Showing {filtered.length} of {tools.length} tools
          </p>
        )}

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <p className="text-lg font-semibold">No tools found</p>
            <p className="text-sm text-muted-foreground">
              Try a different search term or category.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((tool) => (
              <ToolListCard key={tool.slug} tool={tool} />
            ))}
          </div>
        )}

        <AdPlaceholder slot="category-middle" className="mt-6" />
        <AdPlaceholder slot="category-bottom" className="mt-6" />
      </section>
    </>
  );
}

function ToolListCard({ tool }: { tool: Tool }) {
  const ToolIcon = getIcon(tool.icon);
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group relative block overflow-hidden rounded-2xl glass-card p-5 transition-all duration-300 hover:-translate-y-1 hover:glow"
      aria-label={`Open ${tool.name}`}
    >
      <div
        aria-hidden
        className={cn(
          'absolute -right-12 -top-12 h-28 w-28 rounded-full bg-gradient-to-br opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-40',
          tool.gradient
        )}
      />
      <div className="flex items-start justify-between">
        <div
          className={cn(
            'grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br text-white shadow-lg transition-transform duration-300 group-hover:scale-110',
            tool.gradient
          )}
        >
          <ToolIcon className="h-5 w-5" />
        </div>
        {(tool.badge || tool.isNew) && (
          <Badge
            variant="secondary"
            className="rounded-full border border-border/60 bg-background/60 backdrop-blur-md"
          >
            {tool.isNew ? 'New' : tool.badge}
          </Badge>
        )}
      </div>
      <h3 className="mt-4 text-base font-semibold tracking-tight">
        {tool.name}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground line-clamp-2">
        {tool.description}
      </p>
      <div className="mt-4 flex items-center justify-between">
        <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors group-hover:text-brand-purple">
          Open tool
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
