'use client';

import Link from 'next/link';
import { ArrowUpRight, Star } from 'lucide-react';

import { tools } from '@/lib/data';
import { ToolCard } from '@/components/tool-card';

export function FeaturedTools() {
  return (
    <section id="featured" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-end justify-between gap-4 sm:flex-row">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-medium text-brand-purple">
              <Star className="h-4 w-4" />
              Featured Tools
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Essential tools, ready to use
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              The most useful free tools across PDF, image, QR, developer and
              more — all available right now, no sign-up needed.
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
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
}
