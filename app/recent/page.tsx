'use client';

import * as React from 'react';
import Link from 'next/link';
import { Clock, Search, Sparkles, Trash2, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/page-header';
import { ToolCard } from '@/components/tool-card';
import { useRecentlyUsed } from '@/hooks/use-tools-storage';

export default function RecentPage() {
  const { recentTools, clear, hydrated } = useRecentlyUsed();
  const [query, setQuery] = React.useState('');

  const filtered = React.useMemo(() => {
    if (!query.trim()) return recentTools;
    const q = query.toLowerCase();
    return recentTools.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
    );
  }, [recentTools, query]);

  return (
    <>
      <PageHeader
        eyebrow="Your activity"
        title="Recently Used"
        description="Tools you've opened recently — saved locally for quick access so you can jump right back in."
      />

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        {!hydrated ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-48 animate-pulse rounded-2xl glass-card" />
            ))}
          </div>
        ) : recentTools.length === 0 ? (
          <div className="mx-auto max-w-lg rounded-2xl glass-card p-12 text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-brand text-white shadow-lg shadow-brand-purple/25">
              <Clock className="h-8 w-8" />
            </div>
            <h2 className="mt-6 text-xl font-semibold tracking-tight">
              No recent activity
            </h2>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
              Tools you open will appear here so you can quickly return to them.
              Your history is stored locally in your browser.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild className="rounded-xl bg-gradient-brand text-white">
                <Link href="/tools">
                  <Search className="h-4 w-4" />
                  Browse tools
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-xl">
                <Link href="/">
                  <Sparkles className="h-4 w-4" />
                  Go home
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                {recentTools.length} recent {recentTools.length === 1 ? 'tool' : 'tools'}
              </p>
              <div className="flex items-center gap-3">
                <div className="relative max-w-xs">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search recent…"
                    className="h-10 w-full rounded-xl border border-border/60 bg-background/40 pl-10 pr-9 text-sm outline-none backdrop-blur-md focus:border-brand-purple/50"
                    aria-label="Search recent tools"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      aria-label="Clear search"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <button
                  onClick={clear}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-border/60 px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Clear
                </button>
              </div>
            </div>
            {filtered.length === 0 ? (
              <div className="rounded-2xl glass-card p-12 text-center">
                <p className="text-sm text-muted-foreground">
                  No recent tools match &ldquo;{query}&rdquo;.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool} />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}
