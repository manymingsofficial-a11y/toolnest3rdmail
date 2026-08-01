'use client';

import Link from 'next/link';
import { ExternalLink, Star, BadgeCheck, Megaphone } from 'lucide-react';
import { isSponsoredEnabled, type SponsoredItem } from '@/lib/monetization';
import { cn } from '@/lib/utils';

/* ── Sponsored Tool Card ────────────────────────────────────── */

export function SponsoredToolCard({ item, className }: { item: SponsoredItem; className?: string }) {
  if (!isSponsoredEnabled()) return null;

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 transition-all hover:shadow-lg hover:shadow-amber-500/10 hover:-translate-y-1',
        className
      )}
    >
      <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-amber-600">
        <BadgeCheck className="h-3 w-3" />
        Sponsored
      </div>
      <div className="mt-3 flex items-center gap-3">
        {item.image && (
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            width={48}
            height={48}
            className="h-12 w-12 rounded-xl object-cover"
          />
        )}
        <div className="min-w-0 flex-1">
          <h4 className="truncate font-semibold tracking-tight group-hover:text-brand-purple transition-colors">{item.name}</h4>
          <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">{item.description}</p>
        </div>
        <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-brand-purple" />
      </div>
      <p className="mt-3 text-[10px] text-muted-foreground/60">Sponsored by {item.sponsor}</p>
    </a>
  );
}

/* ── Sponsored Blog Card ───────────────────────────────────── */

export function SponsoredBlogCard({ item, className }: { item: SponsoredItem; className?: string }) {
  if (!isSponsoredEnabled()) return null;

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-amber-500/20 bg-amber-500/5 transition-all hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1',
        className
      )}
    >
      {item.image && (
        <div className="relative aspect-video w-full overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            width={400}
            height={225}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 rounded-md bg-amber-500/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
            Sponsored
          </span>
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-amber-600">
          <BadgeCheck className="h-3 w-3" />
          Sponsored Content
        </div>
        <h4 className="mt-2 font-semibold tracking-tight group-hover:text-brand-purple transition-colors">{item.name}</h4>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
        <p className="mt-3 text-[10px] text-muted-foreground/60">Sponsored by {item.sponsor}</p>
      </div>
    </a>
  );
}

/* ── Sponsored Category Card ───────────────────────────────── */

export function SponsoredCategoryCard({ item, className }: { item: SponsoredItem; className?: string }) {
  if (!isSponsoredEnabled()) return null;

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={cn(
        'group relative block overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-orange-500/5 p-6 transition-all hover:shadow-lg hover:shadow-amber-500/10',
        className
      )}
    >
      <div className="flex items-center gap-2">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-500/10 text-amber-600">
          <Star className="h-5 w-5" />
        </span>
        <div>
          <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-amber-600">
            <BadgeCheck className="h-3 w-3" />
            Sponsored Category
          </div>
          <h4 className="font-semibold tracking-tight group-hover:text-brand-purple transition-colors">{item.name}</h4>
        </div>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{item.description}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-purple">
        Explore
        <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </span>
    </a>
  );
}

/* ── Sponsored Banner ──────────────────────────────────────── */

export function SponsoredBanner({ item, className }: { item: SponsoredItem; className?: string }) {
  if (!isSponsoredEnabled()) return null;

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={cn(
        'group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/5 via-amber-500/10 to-orange-500/5 p-5 transition-all hover:shadow-lg hover:shadow-amber-500/10',
        className
      )}
    >
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-amber-500/10 text-amber-600">
        <Megaphone className="h-6 w-6" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-amber-600">
          <BadgeCheck className="h-3 w-3" />
          Sponsored
        </div>
        <h4 className="mt-0.5 truncate font-semibold tracking-tight">{item.name}</h4>
        <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">{item.description}</p>
      </div>
      <span className="hidden shrink-0 rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition-transform group-hover:scale-105 sm:inline-flex">
        {item.badge}
      </span>
    </a>
  );
}
