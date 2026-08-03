'use client';

import Link from 'next/link';
import { ArrowUpRight, Flame, Sparkles, TrendingUp } from 'lucide-react';

import { ToolCard } from '@/components/tool-card';
import { usePopularTools, useRecentlyUsed } from '@/hooks/use-tools-storage';
import type { Tool } from '@/lib/data';

export function TrendingTools({
  trendingTools,
  newestTools,
  allTools,
}: {
  trendingTools: Tool[];
  newestTools: Tool[];
  allTools: Tool[];
}) {
  const { mostUsed, hydrated } = usePopularTools();
  const { recentTools } = useRecentlyUsed();

  const trending = hydrated && mostUsed.length >= 3 ? mostUsed : (trendingTools.length > 0 ? trendingTools : []);
  const newest = newestTools.filter((t) => t.isNew).slice(0, 4);
  const continueTools = recentTools.slice(0, 4);

  return (
    <>
      {/* Continue Using */}
      {continueTools.length > 0 && (
        <section className="relative py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-end justify-between gap-4 sm:flex-row">
              <div>
                <p className="inline-flex items-center gap-2 text-sm font-medium text-brand-blue">
                  <ArrowUpRight className="h-4 w-4" />
                  Continue Using
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                  Pick up where you left off
                </h2>
                <p className="mt-2 max-w-xl text-muted-foreground">
                  Jump back into the tools you opened most recently.
                </p>
              </div>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {continueTools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trending Tools */}
      <section id="trending" className="relative py-20 sm:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-brand opacity-[0.05] blur-3xl"
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-end justify-between gap-4 sm:flex-row">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-medium text-brand-purple">
                <TrendingUp className="h-4 w-4" />
                Trending Now
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Tools people are loving
              </h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                A blend of your most-visited tools, popular picks, and the latest
                additions to ToolNest.
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
            {trending.slice(0, 4).map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>

          {newest.length > 0 && (
            <>
              <div className="mt-12 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-brand-blue" />
                <h3 className="text-lg font-semibold tracking-tight">
                  Newest additions
                </h3>
              </div>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {newest.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
