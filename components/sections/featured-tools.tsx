import Link from 'next/link';
import { ArrowUpRight, Star } from 'lucide-react';

import { ToolCard } from '@/components/tool-card';
import { cn } from '@/lib/utils';
import { getIcon } from '@/lib/icon-map';
import type { Tool, Category } from '@/lib/data';

export function FeaturedTools({
  categories,
  featuredTools,
}: {
  categories: Category[];
  featuredTools: Tool[];
}) {
  const featuredCategorySlugs = ['pdf-tools', 'image-tools', 'qr-tools', 'developer-tools'];
  const featuredCategories = categories.filter((c) => featuredCategorySlugs.includes(c.slug));
  const tools = featuredTools.length > 0
    ? featuredTools
    : [];

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

        {/* Featured categories */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredCategories.map((cat) => {
            const CatIcon = getIcon(cat.icon);
            return (
              <Link
                key={cat.slug}
                href={`/categories?cat=${cat.slug}`}
                className="group relative block overflow-hidden rounded-2xl glass-card p-6 transition-all duration-300 hover:-translate-y-1 hover:glow"
              >
                <div
                  aria-hidden
                  className={cn(
                    'absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br opacity-20 blur-2xl transition-opacity duration-300 group-hover:opacity-40',
                    cat.gradient
                  )}
                />
                <div
                  className={cn(
                    'grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br text-white shadow-lg',
                    cat.gradient
                  )}
                >
                  <CatIcon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-base font-semibold tracking-tight">
                  {cat.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {cat.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors group-hover:text-brand-purple">
                  Browse {cat.name.replace(' Tools', '')}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            );
          })}
        </div>

        {/* Popular tools */}
        {tools.length > 0 && (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
