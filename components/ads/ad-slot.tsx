import { fetchAdSettings } from '@/lib/monetization';
import { AdSlotClient } from '@/components/ads/ad-slot-client';
import type { AdSlot as AdSlotType } from '@/lib/monetization';
import { getAdEligibility } from '@/lib/tool-classification';

type AdSlotProps = {
  slot: AdSlotType;
  className?: string;
  minHeight?: number;
  toolSlug?: string;
};

export async function AdSlot({ slot, className, minHeight, toolSlug }: AdSlotProps) {
  const settings = await fetchAdSettings();
  
  // Check tool classification for ad eligibility
  if (toolSlug && !getAdEligibility(toolSlug)) {
    return null;
  }
  
  return (
    <AdSlotClient
      slot={slot}
      settings={settings}
      className={className}
      minHeight={minHeight}
    />
  );
}
