'use client';

import { AdSlot as AdSlotInner } from '@/components/ads/ad-placeholder';
import type { AdSlot as AdSlotType, AdSettings } from '@/lib/monetization';

type AdSlotClientProps = {
  slot: AdSlotType;
  settings: AdSettings;
  className?: string;
  minHeight?: number;
};

export function AdSlotClient({ slot, settings, className, minHeight }: AdSlotClientProps) {
  return (
    <AdSlotInner
      slot={slot}
      settings={settings}
      className={className}
      minHeight={minHeight}
    />
  );
}
