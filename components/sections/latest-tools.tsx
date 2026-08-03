import Link from 'next/link';
import { ArrowUpRight, Clock, Sparkles } from 'lucide-react';

import { ToolCard } from '@/components/tool-card';
import type { Tool } from '@/lib/data';

export function LatestTools({
  latestTools,
  totalTools,
}: {
  latestTools: Tool[];
  totalTools: number;
}) {
  return (
    <section id="latest" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-end justify-between gap-4 sm:flex-row">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-medium text-brand-blue">
              <Clock className="h-4 w-4" />
              Latest Tools
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Freshly added to the nest
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              New free tools added every week. Be the first to try the latest
              additions to the platform.
            </p>
          </div>
          <Link
            href="/tools"
            className="group inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors hover:text-brand-blue"
          >
            See what&apos;s new
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {latestTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/40 px-5 py-2.5 text-sm font-medium backdrop-blur-md transition-colors hover:text-brand-blue"
          >
            <Sparkles className="h-4 w-4 text-brand-blue" />
            Discover all {totalTools} tools
          </Link>
        </div>
      </div>
    </section>
  );
}
