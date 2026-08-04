import { supabaseServer } from '@/lib/supabase-server';

export type AdSlot =
  | 'homepage-top'
  | 'homepage-middle'
  | 'homepage-bottom'
  | 'category-top'
  | 'category-middle'
  | 'category-bottom'
  | 'tool-top'
  | 'tool-after'
  | 'tool-bottom'
  | 'tool-sidebar'
  | 'blog-top'
  | 'blog-middle'
  | 'blog-bottom'
  | 'sidebar'
  | 'footer';

export type AffiliateNetwork =
  | 'amazon'
  | 'impact'
  | 'cj'
  | 'digistore24'
  | 'whop'
  | 'custom';

export type AffiliateProduct = {
  id: string;
  network: AffiliateNetwork;
  name: string;
  description: string;
  url: string;
  image?: string;
  price?: string;
  rating?: number;
  brand?: string;
};

export type SponsoredItem = {
  id: string;
  name: string;
  description: string;
  url: string;
  image?: string;
  badge: string;
  sponsor: string;
};

export type AdSlotConfig = {
  enabled: boolean;
  slotId: string;
};

export type AdSettings = {
  enabled: boolean;
  network: 'adsense' | 'placeholder';
  publisherId: string;
  slots: Record<string, AdSlotConfig>;
};

const ALL_SLOTS: AdSlot[] = [
  'homepage-top',
  'homepage-middle',
  'homepage-bottom',
  'category-top',
  'category-middle',
  'category-bottom',
  'tool-top',
  'tool-after',
  'tool-bottom',
  'tool-sidebar',
  'blog-top',
  'blog-middle',
  'blog-bottom',
  'sidebar',
  'footer',
];

export const slotLabels: Record<AdSlot, string> = {
  'homepage-top': 'Homepage Top',
  'homepage-middle': 'Homepage Middle',
  'homepage-bottom': 'Homepage Bottom',
  'category-top': 'Category Top',
  'category-middle': 'Category Middle',
  'category-bottom': 'Category Bottom',
  'tool-top': 'Tool Top',
  'tool-after': 'After Tool',
  'tool-bottom': 'Tool Bottom',
  'tool-sidebar': 'Tool Sidebar',
  'blog-top': 'Blog Top',
  'blog-middle': 'Blog Middle',
  'blog-bottom': 'Blog Bottom',
  'sidebar': 'Sidebar',
  'footer': 'Footer',
};

export const slotMinHeights: Record<AdSlot, number> = {
  'homepage-top': 90,
  'homepage-middle': 90,
  'homepage-bottom': 90,
  'category-top': 90,
  'category-middle': 90,
  'category-bottom': 90,
  'tool-top': 90,
  'tool-after': 90,
  'tool-bottom': 90,
  'tool-sidebar': 250,
  'blog-top': 90,
  'blog-middle': 90,
  'blog-bottom': 90,
  'sidebar': 250,
  'footer': 90,
};

const DEFAULT_SLOTS: Record<AdSlot, AdSlotConfig> = ALL_SLOTS.reduce(
  (acc, slot) => {
    acc[slot] = { enabled: true, slotId: 'XXXXXXXXXX' };
    return acc;
  },
  {} as Record<AdSlot, AdSlotConfig>
);

const DEFAULT_AD_SETTINGS: AdSettings = {
  enabled: true,
  network: 'placeholder',
  publisherId: '',
  slots: DEFAULT_SLOTS,
};

let _adCache: AdSettings | null = null;
let _adCacheTs = 0;
const AD_CACHE_TTL = 60_000;

export async function fetchAdSettings(): Promise<AdSettings> {
  const now = Date.now();
  if (_adCache && now - _adCacheTs < AD_CACHE_TTL) {
    return _adCache;
  }

  try {
    const { data, error } = await supabaseServer
      .from('admin_ad_settings')
      .select('*')
      .eq('singleton', true)
      .maybeSingle();

    if (error || !data) {
      _adCache = DEFAULT_AD_SETTINGS;
      _adCacheTs = now;
      return _adCache;
    }

    const r = data as Record<string, unknown>;
    const dbSlots = (r.slots as Record<string, AdSlotConfig>) ?? {};

    // Merge DB slots with defaults so new slots always exist
    const merged: Record<string, AdSlotConfig> = { ...DEFAULT_SLOTS };
    for (const slot of ALL_SLOTS) {
      if (dbSlots[slot]) {
        merged[slot] = dbSlots[slot];
      }
    }

    _adCache = {
      enabled: r.enabled as boolean,
      network: r.network as 'adsense' | 'placeholder',
      publisherId: r.publisher_id as string,
      slots: merged,
    };
    _adCacheTs = now;
    return _adCache;
  } catch {
    _adCache = DEFAULT_AD_SETTINGS;
    _adCacheTs = now;
    return _adCache;
  }
}

export function isAdSlotEnabled(settings: AdSettings, slot: AdSlot): boolean {
  if (!settings.enabled) return false;
  const slotConfig = settings.slots[slot];
  return slotConfig ? slotConfig.enabled : false;
}

export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

// Legacy synchronous helpers — still used by components that haven't been
// upgraded to the async fetch pattern. These return true so that the DB-driven
// path is the sole gatekeeper.
export function isAdsEnabled(): boolean {
  return true;
}

export function isAffiliatesEnabled(): boolean {
  return true;
}

export function isNewsletterEnabled(): boolean {
  return true;
}

export function isSponsoredEnabled(): boolean {
  return true;
}

export const monetizationConfig = {
  ads: {
    enabled: true,
    network: 'placeholder' as 'adsense' | 'placeholder',
    publisherId: '',
    slots: DEFAULT_SLOTS,
  },
  affiliates: {
    enabled: true,
    products: [] as AffiliateProduct[],
  },
  newsletter: {
    enabled: true,
    provider: 'internal' as 'internal' | 'mailchimp' | 'convertkit',
    endpoint: '/api/newsletter',
  },
  sponsored: {
    enabled: true,
    items: [] as SponsoredItem[],
  },
};
