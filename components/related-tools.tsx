import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { getIcon } from '@/lib/icon-map';
import { getRelatedTools, type Tool } from '@/lib/data';

export function RelatedTools({ slug, tools: explicit }: { slug: string; tools?: Tool[] }) {
  const related = explicit ?? getRelatedTools(slug, 3);
  if (related.length === 0) return null;

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Related tools</h2>
      <p className="mt-2 text-muted-foreground">
        Other free tools you might find useful.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="group relative block overflow-hidden rounded-2xl glass-card p-6 transition-all duration-300 hover:-translate-y-1 hover:glow"
          >
            <div
              aria-hidden
              className={cn(
                'absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br opacity-20 blur-2xl transition-opacity duration-300 group-hover:opacity-40',
                tool.gradient
              )}
            />
            <div className="flex items-start justify-between">
              <div
                className={cn(
                  'grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br text-white shadow-lg',
                  tool.gradient
                )}
              >
                {(() => {
                  const Icon = getIcon(tool.icon);
                  return <Icon className="h-6 w-6" />;
                })()}
              </div>
            </div>
            <h3 className="mt-5 text-base font-semibold tracking-tight">
              {tool.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {tool.description}
            </p>
            <div className="mt-5 flex items-center justify-between">
              <Badge
                variant="secondary"
                className="rounded-full border border-border/60 bg-background/60 backdrop-blur-md"
              >
                {tool.category}
              </Badge>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors group-hover:text-brand-purple">
                Open
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
