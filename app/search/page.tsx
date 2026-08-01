'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';

import { tools, categories } from '@/lib/data';
import type { Tool } from '@/lib/data';
import { ToolCard } from '@/components/tool-card';
import { PageHeader } from '@/components/page-header';
import { useRecentSearches } from '@/hooks/use-tools-storage';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') ?? '';
  const [query, setQuery] = React.useState(initialQuery);
  const [submitted, setSubmitted] = React.useState(initialQuery);
  const { searches, addSearch, clearSearches, hydrated } = useRecentSearches();

  React.useEffect(() => {
    setQuery(initialQuery);
    setSubmitted(initialQuery);
  }, [initialQuery]);

  const results = React.useMemo(() => {
    if (!submitted.trim()) return [];
    const q = submitted.toLowerCase();
    return tools.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
    );
  }, [submitted]);

  const categoryResults = React.useMemo(() => {
    if (!submitted.trim()) return [];
    const q = submitted.toLowerCase();
    return categories.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
    );
  }, [submitted]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    setSubmitted(trimmed);
    if (trimmed) addSearch(trimmed);
    const url = trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : '/search';
    window.history.replaceState(null, '', url);
  }

  return (
    <>
      <PageHeader
        eyebrow="Find your tool"
        title="Search Tools"
        description={`Search across all ${tools.length} free online tools on ToolNest.`}
      />

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        {/* Search bar */}
        <form onSubmit={handleSubmit} className="mx-auto max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a tool…"
              className="h-14 w-full rounded-2xl border border-border/60 bg-background/40 pl-12 pr-12 text-base outline-none backdrop-blur-md transition-colors focus:border-brand-purple/50"
              aria-label="Search tools"
              autoFocus
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setSubmitted('');
                  window.history.replaceState(null, '', '/search');
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </form>

        {/* Recent searches */}
        {hydrated && searches.length > 0 && !submitted && (
          <div className="mx-auto mt-6 max-w-2xl">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Recent searches</p>
              <button
                onClick={clearSearches}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {searches.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setQuery(s);
                    setSubmitted(s);
                    addSearch(s);
                    window.history.replaceState(null, '', `/search?q=${encodeURIComponent(s)}`);
                  }}
                  className="rounded-lg border border-border/60 bg-background/40 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {submitted ? (
          <>
            <div className="mx-auto max-w-2xl mt-8">
              <p className="text-sm text-muted-foreground">
                {results.length + categoryResults.length} result{results.length + categoryResults.length === 1 ? '' : 's'} for &ldquo;{submitted}&rdquo;
              </p>
            </div>

            {categoryResults.length > 0 && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold tracking-tight mb-4">Categories</h2>
                <div className="flex flex-wrap gap-3">
                  {categoryResults.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/categories?cat=${cat.slug}`}
                      className="rounded-xl glass-card px-4 py-3 text-sm font-medium transition-colors hover:text-brand-purple"
                    >
                      {cat.name}
                      <span className="ml-2 text-xs text-muted-foreground">{cat.count} tools</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {results.length > 0 ? (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {results.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool} />
                ))}
              </div>
            ) : categoryResults.length === 0 ? (
              <div className="mt-12 rounded-2xl glass-card p-12 text-center">
                <p className="text-lg font-semibold">No tools found</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try a different search term or{' '}
                  <Link href="/tools" className="text-brand-purple hover:underline">
                    browse all tools
                  </Link>
                </p>
              </div>
            ) : null}
          </>
        ) : (
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              Start typing to search across {tools.length} tools.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
