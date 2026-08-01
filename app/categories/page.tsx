'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowDownAZ, ArrowUpRight, Calendar, Search, SlidersHorizontal, TrendingUp, Wrench, X } from 'lucide-react';

import { categories, getToolsByCategory } from '@/lib/data';
import type { Tool } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/page-header';
import { AdPlaceholder } from '@/components/ads/ad-placeholder';

const STORAGE_KEY = 'toolnest:active-category';

export default function CategoriesPage() {
  const [activeSlug, setActiveSlug] = React.useState<string>(categories[0].slug);
  const [query, setQuery] = React.useState('');
  const [hydrated, setHydrated] = React.useState(false);
  const [mobileCatOpen, setMobileCatOpen] = React.useState(false);
  const [sortBy, setSortBy] = React.useState<'az' | 'newest' | 'popular'>('az');

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const catParam = params.get('cat');
    if (catParam && categories.find((c) => c.slug === catParam)) {
      setActiveSlug(catParam);
      try {
        localStorage.setItem(STORAGE_KEY, catParam);
      } catch {
        /* ignore */
      }
    } else {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved && categories.find((c) => c.slug === saved)) {
          setActiveSlug(saved);
        }
      } catch {
        /* ignore */
      }
    }
    setHydrated(true);
  }, []);

  const activeCat = React.useMemo(
    () => categories.find((c) => c.slug === activeSlug) ?? categories[0],
    [activeSlug]
  );

  const allTools = React.useMemo(
    () => getToolsByCategory(activeCat.name),
    [activeCat]
  );

  const filtered = React.useMemo(() => {
    let result = allTools;
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
  }, [query, allTools, sortBy]);

  function selectCategory(slug: string) {
    setActiveSlug(slug);
    setQuery('');
    setMobileCatOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, slug);
    } catch {
      /* ignore */
    }
  }

  const ActiveIcon = activeCat.icon;

  return (
    <>
      <PageHeader
        eyebrow="Browse by discipline"
        title="Explore tool categories"
        description="Pick a category on the left to instantly see every tool inside it. Search within a category to narrow things down."
      />

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <AdPlaceholder slot="category-top" className="mb-6" />
        {/* Mobile category selector trigger */}
        <div className="mb-6 lg:hidden">
          <button
            onClick={() => setMobileCatOpen((v) => !v)}
            className="flex w-full items-center justify-between rounded-xl glass px-4 py-3 text-sm font-medium"
            aria-expanded={mobileCatOpen}
          >
            <span className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-brand-purple" />
              {activeCat.name}
              <span className="text-muted-foreground">({allTools.length})</span>
            </span>
            <span className="text-xs text-muted-foreground">
              {mobileCatOpen ? 'Hide' : 'Change'}
            </span>
          </button>
          {mobileCatOpen && (
            <div className="mt-2 grid grid-cols-2 gap-2 rounded-xl glass p-3 animate-fade-in">
              {categories.map((cat) => {
                const count = getToolsByCategory(cat.name).length;
                const CatIcon = cat.icon;
                return (
                  <button
                    key={cat.slug}
                    onClick={() => selectCategory(cat.slug)}
                    className={cn(
                      'flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors',
                      cat.slug === activeSlug
                        ? 'bg-gradient-brand text-white'
                        : 'hover:bg-muted'
                    )}
                  >
                    <CatIcon className="h-4 w-4 shrink-0" />
                    <span className="truncate">{cat.name}</span>
                    <span className="ml-auto text-xs opacity-70">{count}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-1">
              <h2 className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Categories
              </h2>
              {categories.map((cat) => {
                const count = getToolsByCategory(cat.name).length;
                const CatIcon = cat.icon;
                const isActive = cat.slug === activeSlug && hydrated;
                return (
                  <button
                    key={cat.slug}
                    onClick={() => selectCategory(cat.slug)}
                    className={cn(
                      'group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-all',
                      isActive
                        ? 'glass shadow-md'
                        : 'hover:bg-muted/50'
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span
                      className={cn(
                        'grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br text-white shadow-sm transition-transform group-hover:scale-105',
                        cat.gradient
                      )}
                    >
                      <CatIcon className="h-4 w-4" />
                    </span>
                    <span
                      className={cn(
                        'flex-1 font-medium',
                        isActive ? 'text-foreground' : 'text-foreground/80'
                      )}
                    >
                      {cat.name}
                    </span>
                    <span
                      className={cn(
                        'text-xs',
                        isActive ? 'text-foreground' : 'text-muted-foreground'
                      )}
                    >
                      {count}
                    </span>
                    {isActive && (
                      <span className="ml-1 h-1.5 w-1.5 rounded-full bg-gradient-brand" />
                    )}
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Right: tools grid */}
          <div className="min-w-0">
            {/* Category header */}
            <div
              key={activeSlug}
              className="animate-fade-in rounded-2xl glass-card p-6"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      'grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg',
                      activeCat.gradient
                    )}
                  >
                    <ActiveIcon className="h-7 w-7" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                      {activeCat.name}
                    </h2>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {activeCat.description}
                    </p>
                  </div>
                </div>
                <span className="self-start rounded-full border border-border/60 bg-muted/60 px-4 py-1.5 text-sm font-semibold text-muted-foreground sm:self-auto">
                  {allTools.length} {allTools.length === 1 ? 'tool' : 'tools'}
                </span>
              </div>

              {/* Search within category */}
              <div className="mt-5 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={`Search within ${activeCat.name.toLowerCase()}…`}
                    className="h-11 w-full rounded-xl border border-input bg-background pl-10 pr-10 text-sm outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label="Search within category"
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
              </div>

              {/* Sort buttons */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  Sort:
                </span>
                {[
                  { key: 'az' as const, label: 'A–Z', icon: ArrowDownAZ },
                  { key: 'newest' as const, label: 'Newest', icon: Calendar },
                  { key: 'popular' as const, label: 'Most Used', icon: TrendingUp },
                ].map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setSortBy(key)}
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all',
                      sortBy === key
                        ? 'bg-gradient-brand text-white shadow-md shadow-brand-purple/20'
                        : 'border border-border/60 bg-background/40 text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <Icon className="h-3 w-3" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tools grid */}
            <div
              key={`${activeSlug}-grid`}
              className="mt-6 animate-fade-in"
            >
              {query && (
                <p className="mb-4 text-sm text-muted-foreground">
                  Showing {filtered.length} of {allTools.length} tools
                </p>
              )}
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center gap-4 py-20 text-center">
                  <div className="grid h-16 w-16 place-items-center rounded-2xl bg-muted">
                    <Wrench className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-lg font-semibold">No tools found</p>
                  <p className="text-sm text-muted-foreground">
                    Try a different search term or{' '}
                    <button
                      onClick={() => setQuery('')}
                      className="text-brand-purple underline-offset-2 hover:underline"
                    >
                      clear the filter
                    </button>
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {filtered.map((tool) => (
                    <CategoryToolCard key={tool.slug} tool={tool} />
                  ))}
                </div>
              )}
              <AdPlaceholder slot="category-middle" className="mt-6" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function CategoryToolCard({ tool }: { tool: Tool }) {
  const ToolIcon = tool.icon;
  const isPopular = tool.badge === 'Popular';
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
        {(tool.badge || tool.isNew || isPopular) && (
          <Badge
            variant="secondary"
            className={cn(
              'rounded-full border border-border/60 bg-background/60 backdrop-blur-md',
              isPopular && !tool.badge && !tool.isNew && 'border-brand-purple/40 text-brand-purple'
            )}
          >
            {tool.isNew ? 'New' : tool.badge ?? (isPopular ? 'Popular' : null)}
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
