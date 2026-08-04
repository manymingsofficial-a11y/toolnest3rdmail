'use client';

import * as React from 'react';
import Link from 'next/link';
import { ExternalLink, Star, TrendingUp, ShoppingBag, ArrowRight, Check } from 'lucide-react';
import type { AffiliateProduct, AffiliateNetwork } from '@/lib/monetization';
import { cn } from '@/lib/utils';

const networkLabels: Record<AffiliateNetwork, string> = {
  amazon: 'Amazon',
  impact: 'Impact',
  cj: 'CJ Affiliate',
  digistore24: 'Digistore24',
  whop: 'Whop',
  custom: 'Sponsored',
};

const networkColors: Record<AffiliateNetwork, string> = {
  amazon: 'bg-amber-500/10 text-amber-600',
  impact: 'bg-blue-500/10 text-blue-600',
  cj: 'bg-emerald-500/10 text-emerald-600',
  digistore24: 'bg-rose-500/10 text-rose-600',
  whop: 'bg-violet-500/10 text-violet-600',
  custom: 'bg-brand-purple/10 text-brand-purple',
};

function trackAffiliateClick(product: AffiliateProduct) {
  try {
    fetch('/api/track-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'affiliate',
        placement: product.network,
        targetId: product.id,
        metadata: { name: product.name, url: product.url },
      }),
    }).catch(() => {});
  } catch {
    // best-effort
  }
}

function withTracking(product: AffiliateProduct) {
  return {
    href: product.url,
    target: '_blank' as const,
    rel: 'noopener noreferrer sponsored',
    onClick: () => trackAffiliateClick(product),
  };
}

/* ── Affiliate Banner ──────────────────────────────────────── */

export function AffiliateBanner({
  product,
  className,
}: {
  product: AffiliateProduct;
  className?: string;
}) {
  return (
    <a
      {...withTracking(product)}
      className={cn(
        'group flex items-center gap-4 rounded-2xl glass-card p-5 transition-all hover:shadow-lg hover:shadow-brand-purple/10',
        className
      )}
    >
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={80}
          height={80}
          className="h-16 w-16 shrink-0 rounded-xl object-cover"
        />
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className={cn('rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide', networkColors[product.network])}>
            {networkLabels[product.network]}
          </span>
          {product.price && (
            <span className="text-sm font-bold text-foreground">{product.price}</span>
          )}
        </div>
        <h4 className="mt-1.5 truncate font-semibold tracking-tight">{product.name}</h4>
        <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">{product.description}</p>
      </div>
      <ExternalLink className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-brand-purple" />
    </a>
  );
}

/* ── Affiliate Product Card ────────────────────────────────── */

export function AffiliateProductCard({
  product,
  className,
}: {
  product: AffiliateProduct;
  className?: string;
}) {
  return (
    <a
      {...withTracking(product)}
      className={cn(
        'group flex flex-col overflow-hidden rounded-2xl glass-card transition-all hover:shadow-xl hover:shadow-brand-purple/10 hover:-translate-y-1',
        className
      )}
    >
      {product.image && (
        <div className="relative aspect-video w-full overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={400}
            height={225}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <span className={cn('absolute left-3 top-3 rounded-md px-2 py-1 text-[10px] font-semibold uppercase tracking-wide', networkColors[product.network])}>
            {networkLabels[product.network]}
          </span>
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        {product.brand && (
          <span className="text-xs font-medium text-muted-foreground">{product.brand}</span>
        )}
        <h4 className="mt-1 font-semibold tracking-tight group-hover:text-brand-purple transition-colors">{product.name}</h4>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
        <div className="mt-3 flex items-center gap-3">
          {product.rating && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              {product.rating}
            </span>
          )}
          {product.price && (
            <span className="text-sm font-bold">{product.price}</span>
          )}
        </div>
        <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-purple">
          <ShoppingBag className="h-4 w-4" />
          View deal
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </a>
  );
}

/* ── Affiliate CTA Box ─────────────────────────────────────── */

export function AffiliateCtaBox({
  product,
  className,
}: {
  product: AffiliateProduct;
  className?: string;
}) {
  return (
    <div className={cn('rounded-2xl border border-brand-purple/20 bg-gradient-to-br from-brand-purple/5 to-brand-blue/5 p-6', className)}>
      <div className="flex items-center gap-2">
        <span className={cn('rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide', networkColors[product.network])}>
          {networkLabels[product.network]}
        </span>
        <TrendingUp className="h-4 w-4 text-brand-purple" />
      </div>
      <h4 className="mt-3 text-lg font-bold tracking-tight">{product.name}</h4>
      <p className="mt-2 text-sm text-muted-foreground">{product.description}</p>
      <a
        {...withTracking(product)}
        className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-purple/25 transition-transform hover:scale-105"
      >
        {product.price ? `Get it for ${product.price}` : 'Learn more'}
        <ExternalLink className="h-4 w-4" />
      </a>
    </div>
  );
}

/* ── Affiliate Inline Recommendation ───────────────────────── */

export function AffiliateInline({
  product,
  className,
}: {
  product: AffiliateProduct;
  className?: string;
}) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-muted/30 px-3 py-1.5 text-sm', className)}>
      <span className="text-muted-foreground">Recommended:</span>
      <a
        {...withTracking(product)}
        className="font-medium text-brand-purple hover:underline"
      >
        {product.name}
      </a>
      {product.price && (
        <span className="text-xs font-bold text-foreground">{product.price}</span>
      )}
    </span>
  );
}

/* ── Affiliate Comparison Box ──────────────────────────────── */

export function AffiliateComparisonBox({
  products,
  className,
}: {
  products: AffiliateProduct[];
  className?: string;
}) {
  if (!products || products.length === 0) return null;

  return (
    <div className={cn('rounded-2xl glass-card p-6', className)}>
      <div className="flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-brand-purple" />
        <h3 className="text-lg font-bold tracking-tight">Top Picks</h3>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">Compare our recommended options</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, idx) => (
          <div
            key={product.id}
            className={cn(
              'flex flex-col rounded-xl border p-4 transition-all',
              idx === 0
                ? 'border-brand-purple/30 bg-brand-purple/5'
                : 'border-border/60 bg-background/40'
            )}
          >
            {idx === 0 && (
              <span className="mb-2 inline-flex w-fit items-center gap-1 rounded-md bg-brand-purple px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                <Check className="h-3 w-3" /> Best Value
              </span>
            )}
            <span className={cn('w-fit rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide', networkColors[product.network])}>
              {networkLabels[product.network]}
            </span>
            <h4 className="mt-2 font-semibold tracking-tight">{product.name}</h4>
            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{product.description}</p>
            <div className="mt-3 flex items-center gap-2">
              {product.rating && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  {product.rating}
                </span>
              )}
              {product.price && (
                <span className="text-sm font-bold">{product.price}</span>
              )}
            </div>
            <a
              {...withTracking(product)}
              className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-lg bg-gradient-brand px-4 py-2 text-xs font-semibold text-white transition-transform hover:scale-105"
            >
              View deal
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
