'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Clock, Trash2 } from 'lucide-react';

import { tools } from '@/lib/data';
import type { Tool } from '@/lib/data';
import { ToolCard } from '@/components/tool-card';
import { useRecentlyUsed } from '@/hooks/use-tools-storage';

export function RecentlyUsedTools() {
  const { recentTools, clear, hydrated } = useRecentlyUsed();

  if (!hydrated || recentTools.length === 0) return null;

  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-end justify-between gap-4 sm:flex-row">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-medium text-brand-blue">
              <Clock className="h-4 w-4" />
              Recently Used
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Pick up where you left off
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Your last {recentTools.length} opened tools — saved locally for quick access.
            </p>
          </div>
          <button
            onClick={clear}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-destructive"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Clear history
          </button>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {recentTools.slice(0, 8).map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
}

function usePopularToolsLocal() {
  const [mostUsed, setMostUsed] = React.useState<Tool[]>([]);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem('toolnest:popular');
      const counts: Record<string, number> = raw ? JSON.parse(raw) : {};
      const sorted = Object.entries(counts)
        .sort(([, a], [, b]) => b - a)
        .map(([slug]) => tools.find((t) => t.slug === slug))
        .filter(Boolean) as Tool[];
      setMostUsed(sorted.slice(0, 8));
    } catch {
      /* ignore */
    }
    setHydrated(true);

    const handler = () => {
      try {
        const raw = localStorage.getItem('toolnest:popular');
        const counts: Record<string, number> = raw ? JSON.parse(raw) : {};
        const sorted = Object.entries(counts)
          .sort(([, a], [, b]) => b - a)
          .map(([slug]) => tools.find((t) => t.slug === slug))
          .filter(Boolean) as Tool[];
        setMostUsed(sorted.slice(0, 8));
      } catch {
        /* ignore */
      }
    };
    window.addEventListener('toolnest:popular-changed', handler);
    return () => window.removeEventListener('toolnest:popular-changed', handler);
  }, []);

  return { mostUsed, hydrated };
}

export function PopularToolsSection() {
  const { mostUsed, hydrated } = usePopularToolsLocal();

  return (
    <section id="popular" className="relative py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-brand opacity-[0.05] blur-3xl"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-end justify-between gap-4 sm:flex-row">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-medium text-brand-purple">
              <ArrowUpRight className="h-4 w-4" />
              Most Visited
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Tools you keep coming back to
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Your most-used tools, ranked by how often you open them. Start
              using tools to see your personal top list here.
            </p>
          </div>
          <Link
            href="/tools"
            className="group inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors hover:text-brand-purple"
          >
            View all tools
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {hydrated && mostUsed.length > 0 ? (
            mostUsed.map((tool) => <ToolCard key={tool.slug} tool={tool} />)
          ) : (
            <p className="col-span-full py-8 text-center text-sm text-muted-foreground">
              Start opening tools to build your personal most-visited list.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
