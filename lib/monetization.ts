export type AdSlot =
  | 'homepage-top'
  | 'homepage-middle'
  | 'homepage-bottom'
  | 'tool-after'
  | 'tool-sidebar'
  | 'blog-top'
  | 'blog-middle'
  | 'blog-bottom'
  | 'category-top'
  | 'category-middle';

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

export const monetizationConfig = {
  ads: {
    enabled: true,
    network: 'adsense' as 'adsense' | 'placeholder',
    publisherId: 'ca-pub-XXXXXXXXXXXXXXXX',
    slots: {
      'homepage-top': 'XXXXXXXXXX',
      'homepage-middle': 'XXXXXXXXXX',
      'homepage-bottom': 'XXXXXXXXXX',
      'tool-after': 'XXXXXXXXXX',
      'tool-sidebar': 'XXXXXXXXXX',
      'blog-top': 'XXXXXXXXXX',
      'blog-middle': 'XXXXXXXXXX',
      'blog-bottom': 'XXXXXXXXXX',
      'category-top': 'XXXXXXXXXX',
      'category-middle': 'XXXXXXXXXX',
    } as Record<AdSlot, string>,
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

export function isAdsEnabled(): boolean {
  return monetizationConfig.ads.enabled;
}

export function isAffiliatesEnabled(): boolean {
  return monetizationConfig.affiliates.enabled;
}

export function isNewsletterEnabled(): boolean {
  return monetizationConfig.newsletter.enabled;
}

export function isSponsoredEnabled(): boolean {
  return monetizationConfig.sponsored.enabled;
}

export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}
