'use client';

import Link from 'next/link';
import { ArrowUpRight, Flame } from 'lucide-react';

import { mostPopularTools } from '@/lib/data';
import { ToolCard } from '@/components/tool-card';
import { cn } from '@/lib/utils';

export function MostPopularTools() {
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
              <Flame className="h-4 w-4" />
              Most Popular
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              The tools everyone&apos;s using
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Our most-used tools this month, ranked by popularity. Trusted by
              millions of users every day.
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

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mostPopularTools.map((tool, i) => (
            <div key={tool.slug} className="relative">
              <span
                className={cn(
                  'absolute -left-2 -top-2 z-10 grid h-8 w-8 place-items-center rounded-full bg-gradient-brand text-xs font-bold text-white shadow-lg shadow-brand-purple/30',
                  'ring-4 ring-background'
                )}
              >
                {i + 1}
              </span>
              <ToolCard tool={tool} className="h-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
