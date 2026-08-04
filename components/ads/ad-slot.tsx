import { fetchAdSettings } from '@/lib/monetization';
import { AdSlotClient } from '@/components/ads/ad-slot-client';
import type { AdSlot as AdSlotType } from '@/lib/monetization';

type AdSlotProps = {
  slot: AdSlotType;
  className?: string;
  minHeight?: number;
};

export async function AdSlot({ slot, className, minHeight }: AdSlotProps) {
  const settings = await fetchAdSettings();
  return (
    <AdSlotClient
      slot={slot}
      settings={settings}
      className={className}
      minHeight={minHeight}
    />
  );
}
