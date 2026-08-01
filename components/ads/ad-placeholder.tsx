'use client';

import * as React from 'react';
import { isAdsEnabled, isProduction, type AdSlot } from '@/lib/monetization';
import { cn } from '@/lib/utils';

type AdPlaceholderProps = {
  slot: AdSlot;
  className?: string;
  minHeight?: number;
};

const slotLabels: Record<AdSlot, string> = {
  'homepage-top': 'Homepage Top',
  'homepage-middle': 'Homepage Middle',
  'homepage-bottom': 'Homepage Bottom',
  'tool-after': 'After Tool',
  'tool-sidebar': 'Tool Sidebar',
  'blog-top': 'Blog Top',
  'blog-middle': 'Blog Middle',
  'blog-bottom': 'Blog Bottom',
  'category-top': 'Category Top',
  'category-middle': 'Category Middle',
};

export function AdPlaceholder({ slot, className, minHeight = 90 }: AdPlaceholderProps) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!isAdsEnabled()) return null;
  if (!isProduction() && !mounted) return null;

  const showPlaceholder = !isProduction();

  return (
    <div
      className={cn(
        'ad-container relative w-full overflow-hidden rounded-xl border border-dashed border-border/40',
        showPlaceholder && 'bg-muted/20',
        className
      )}
      style={{ minHeight }}
      data-ad-slot={slot}
      aria-label="Advertisement"
    >
      {showPlaceholder ? (
        <div className="flex h-full min-h-[inherit] flex-col items-center justify-center gap-1 p-4 text-center">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground/60">
            Ad Slot
          </span>
          <span className="text-sm text-muted-foreground/80">{slotLabels[slot]}</span>
          <span className="text-[10px] text-muted-foreground/40">
            Replace with Google AdSense code
          </span>
        </div>
      ) : (
        <ins
          className="adsbygoogle block"
          style={{ display: 'block', minHeight }}
          data-ad-client={monetizationConfigPublisherId()}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      )}
    </div>
  );
}

function monetizationConfigPublisherId(): string {
  return 'ca-pub-XXXXXXXXXXXXXXXX';
}
