'use client';

import { AdSlot as AdSlotInner } from '@/components/ads/ad-placeholder';
import type { AdSlot as AdSlotType, AdSettings } from '@/lib/monetization';
import { getAdEligibility } from '@/lib/tool-classification';

type AdSlotClientProps = {
  slot: AdSlotType;
  settings: AdSettings;
  className?: string;
  minHeight?: number;
  toolSlug?: string;
};

export function AdSlotClient({ slot, settings, className, minHeight, toolSlug }: AdSlotClientProps) {
  // Check tool classification for ad eligibility
  if (toolSlug && !getAdEligibility(toolSlug)) {
    return null;
  }
  
  return (
    <AdSlotInner
      slot={slot}
      settings={settings}
      className={className}
      minHeight={minHeight}
    />
  );
}