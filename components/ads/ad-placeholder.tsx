'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import type { AdSlot, AdSettings } from '@/lib/monetization';
import { isProduction, isAdSlotEnabled, slotLabels, slotMinHeights } from '@/lib/monetization';

type AdSlotProps = {
  slot: AdSlot;
  settings: AdSettings;
  className?: string;
  minHeight?: number;
};

function trackAdClick(slot: AdSlot) {
  try {
    fetch('/api/track-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'ad', placement: slot, targetId: slot }),
    }).catch(() => {});
  } catch {
    // best-effort
  }
}

export function AdSlot({ slot, settings, className, minHeight }: AdSlotProps) {
  const [inView, setInView] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    if (!mounted) return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [mounted]);

  // Gate: DB-driven enable/disable
  if (!isAdSlotEnabled(settings, slot)) return null;

  // Prevent hydration mismatch: don't render ad content until mounted
  if (!mounted) {
    return (
      <div
        ref={containerRef}
        className={cn('ad-container relative w-full overflow-hidden rounded-xl', className)}
        style={{ minHeight: minHeight ?? slotMinHeights[slot] }}
        data-ad-slot={slot}
        aria-hidden
      />
    );
  }

  const showPlaceholder = !isProduction() || settings.network === 'placeholder';
  const resolvedMinHeight = minHeight ?? slotMinHeights[slot];

  return (
    <div
      ref={containerRef}
      className={cn(
        'ad-container relative w-full overflow-hidden rounded-xl',
        showPlaceholder && 'border border-dashed border-border/40 bg-muted/20',
        className
      )}
      style={{ minHeight: resolvedMinHeight }}
      data-ad-slot={slot}
      aria-label="Advertisement"
      onClick={() => trackAdClick(slot)}
    >
      {inView ? (
        showPlaceholder ? (
          <div className="flex h-full min-h-[inherit] flex-col items-center justify-center gap-1 p-4 text-center">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground/60">
              Ad Slot
            </span>
            <span className="text-sm text-muted-foreground/80">{slotLabels[slot]}</span>
            <span className="text-[10px] text-muted-foreground/40">
              {settings.network === 'adsense' ? 'AdSense ready' : 'Replace with ad code'}
            </span>
          </div>
        ) : (
          <ins
            className="adsbygoogle block"
            style={{ display: 'block', minHeight: resolvedMinHeight }}
            data-ad-client={settings.publisherId}
            data-ad-slot={settings.slots[slot]?.slotId ?? ''}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        )
      ) : null}
    </div>
  );
}

// Legacy export for backward compatibility — renders nothing if no settings provided
export function AdPlaceholder({ slot, className, minHeight }: { slot: AdSlot; className?: string; minHeight?: number }) {
  return (
    <div
      className={cn('ad-container relative w-full overflow-hidden rounded-xl border border-dashed border-border/40 bg-muted/20', className)}
      style={{ minHeight: minHeight ?? slotMinHeights[slot] }}
      data-ad-slot={slot}
      aria-label="Advertisement"
    >
      <div className="flex h-full min-h-[inherit] flex-col items-center justify-center gap-1 p-4 text-center">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground/60">
          Ad Slot
        </span>
        <span className="text-sm text-muted-foreground/80">{slotLabels[slot]}</span>
      </div>
    </div>
  );
}
