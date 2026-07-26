'use client';

import * as React from 'react';
import Link from 'next/link';
import { Search, ChevronRight, Wrench, ArrowRight } from 'lucide-react';

import { categories, getToolsByCategory } from '@/lib/data';
import { ToolCard } from '@/components/tool-card';
import { cn } from '@/lib/utils';

export function CategoryPageClient({ slug }: { slug: string }) {
  const cat = React.useMemo(() => categories.find((c) => c.slug === slug), [slug]);
  const allTools = React.useMemo(() => (cat ? getToolsByCategory(cat.name) : []), [cat]);
  const [query, setQuery] = React.useState('');

  const relatedCategories = React.useMemo(
    () => categories.filter((c) => c.slug !== slug).slice(0, 4),
    [slug]
  );

  const filtered = React.useMemo(() => {
    if (!query) return allTools;
    const q = query.toLowerCase();
    return allTools.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
    );
  }, [query, allTools]);

  if (!cat) return null;
  const Icon = cat.icon;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <div
            className={cn(
              'absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full opacity-15 blur-[120px] bg-gradient-to-br',
              cat.gradient
            )}
          />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/categories" className="transition-colors hover:text-foreground">
              Categories
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">{cat.name}</span>
          </nav>

          {/* Title row */}
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  'grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg',
                  cat.gradient
                )}
              >
                <Icon className="h-7 w-7" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {cat.name}
                </h1>
                <p className="mt-1 text-muted-foreground">{cat.description}</p>
              </div>
            </div>
            <span className="self-start rounded-full border border-border/60 bg-muted/60 px-4 py-1.5 text-sm font-semibold text-muted-foreground sm:self-auto">
              {allTools.length} {allTools.length === 1 ? 'tool' : 'tools'}
            </span>
          </div>

          {/* Search */}
          <div className="mt-8 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search ${cat.name.toLowerCase()}…`}
                className="h-11 w-full rounded-xl border border-input bg-background pl-10 pr-4 text-sm outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tool grid */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-24 text-center">
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
          <>
            {query && (
              <p className="mb-6 text-sm text-muted-foreground">
                Showing {filtered.length} of {allTools.length} tools
              </p>
            )}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </>
        )}
      </section>

      {/* Related categories */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight">Related categories</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {relatedCategories.map((rc) => {
            const RcIcon = rc.icon;
            return (
              <Link
                key={rc.slug}
                href={`/categories/${rc.slug}`}
                className="group relative block overflow-hidden rounded-2xl glass-card p-5 transition-all duration-300 hover:-translate-y-1 hover:glow"
              >
                <div
                  aria-hidden
                  className={cn(
                    'absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br opacity-15 blur-2xl transition-opacity duration-300 group-hover:opacity-30',
                    rc.gradient
                  )}
                />
                <div
                  className={cn(
                    'grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br text-white shadow-lg',
                    rc.gradient
                  )}
                >
                  <RcIcon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-sm font-semibold tracking-tight">
                  {rc.name}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                  {rc.description}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-foreground transition-colors group-hover:text-brand-purple">
                  Explore
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
