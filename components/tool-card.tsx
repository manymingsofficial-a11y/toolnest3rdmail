'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Heart } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useFavorites } from '@/hooks/use-tools-storage';
import type { Tool } from '@/lib/data';

type ToolCardProps = {
  tool: Tool;
  className?: string;
};

export const ToolCard = React.memo(function ToolCard({
  tool,
  className,
}: ToolCardProps) {
  const { isFav, toggle, hydrated } = useFavorites();
  const [isFavState, setIsFavState] = React.useState(false);

  React.useEffect(() => {
    if (hydrated) setIsFavState(isFav(tool.slug));
  }, [hydrated, isFav, tool.slug]);

  function handleFavorite(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggle(tool.slug);
    setIsFavState((prev) => !prev);
  }

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className={cn(
        'group relative block overflow-hidden rounded-2xl glass-card p-6 transition-all duration-300 hover:-translate-y-1 hover:glow',
        className
      )}
      aria-label={`Open ${tool.name}`}
    >
      <div
        aria-hidden
        className={cn(
          'absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-40',
          tool.gradient
        )}
      />
      <div className="flex items-start justify-between">
        <div
          className={cn(
            'grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br text-white shadow-lg transition-transform duration-300 group-hover:scale-110',
            tool.gradient
          )}
        >
          <tool.icon className="h-6 w-6" />
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleFavorite}
            className="grid h-8 w-8 place-items-center rounded-lg border border-border/60 bg-background/60 backdrop-blur-md transition-all hover:scale-110"
            aria-label={isFavState ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              className={cn(
                'h-4 w-4 transition-colors',
                isFavState ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
              )}
            />
          </button>
          {(tool.badge || tool.isNew) && (
            <Badge
              variant="secondary"
              className="rounded-full border border-border/60 bg-background/60 backdrop-blur-md"
            >
              {tool.isNew ? 'New' : tool.badge}
            </Badge>
          )}
        </div>
      </div>
      <h3 className="mt-5 text-base font-semibold tracking-tight">
        {tool.name}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {tool.description}
      </p>
      <div className="mt-5 flex items-center justify-between">
        <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
          {tool.category}
        </span>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors group-hover:text-brand-purple">
          Open
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
});
