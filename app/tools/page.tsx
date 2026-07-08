'use client';

import * as React from 'react';
import { Search, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { tools, categories, getToolsByCategory } from '@/lib/data';
import { PageHeader } from '@/components/page-header';
import { ToolCard } from '@/components/tool-card';
import { SearchCommandPalette } from '@/components/search-command-palette';

const categoryFilters = ['All', ...categories.map((c) => c.name)];

export default function ToolsPage() {
  const [query, setQuery] = React.useState('');
  const [activeCat, setActiveCat] = React.useState('All');

  const filtered = React.useMemo(() => {
    const pool = activeCat === 'All' ? tools : getToolsByCategory(activeCat);
    if (!query) return pool;
    const q = query.toLowerCase();
    return pool.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
    );
  }, [query, activeCat]);

  return (
    <>
      <PageHeader
        eyebrow="The directory"
        title="All tools"
        description="Browse and search every tool on ToolNest. Filter by category or search by name to find exactly what you need."
      />

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tools by name…"
              className="h-10 w-full rounded-xl border border-border/60 bg-background/40 pl-10 pr-4 text-sm outline-none backdrop-blur-md focus:border-brand-purple/50"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <SearchCommandPalette />
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {categoryFilters.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={cn(
                'rounded-full px-4 py-1.5 text-sm font-medium transition-all',
                activeCat === cat
                  ? 'bg-gradient-brand text-white shadow-md shadow-brand-purple/25'
                  : 'border border-border/60 bg-background/40 text-muted-foreground hover:text-foreground'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <p className="mb-6 text-sm text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? 'tool' : 'tools'} found
        </p>

        {filtered.length === 0 ? (
          <div className="rounded-2xl glass-card p-12 text-center">
            <p className="text-sm text-muted-foreground">
              No tools found matching your search.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
