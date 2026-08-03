'use client';

import Link from 'next/link';
import { Compass, Home, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SearchCommandPalette } from '@/components/search-command-palette';
import { mostPopularTools, tools as staticTools, categories as staticCategories } from '@/lib/data';
import { ToolCard } from '@/components/tool-card';

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-20">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div className="absolute left-1/2 top-1/3 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-purple/20 blur-[120px]" />
      </div>

      <div className="w-full max-w-3xl text-center">
        <div className="mx-auto grid h-20 w-20 animate-float place-items-center rounded-3xl bg-gradient-brand text-white shadow-2xl shadow-brand-purple/30">
          <Compass className="h-10 w-10" />
        </div>

        <h1 className="mt-8 text-7xl font-bold tracking-tight sm:text-8xl">
          <span className="text-gradient">404</span>
        </h1>
        <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
          Page not found
        </h2>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Don&apos;t worry — there are plenty of tools to explore.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild className="rounded-xl bg-gradient-brand text-white shadow-lg shadow-brand-purple/25">
            <Link href="/">
              <Home className="h-4 w-4" />
              Go Home
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-xl">
            <Link href="/tools">
              <Search className="h-4 w-4" />
              Browse tools
            </Link>
          </Button>
          <SearchCommandPalette tools={staticTools} categories={staticCategories} />
        </div>

        {/* Popular tools */}
        <div className="mt-16">
          <h3 className="text-lg font-semibold tracking-tight">
            Popular tools
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Try one of these instead
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mostPopularTools.slice(0, 6).map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
