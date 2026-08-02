import type { LucideIcon } from 'lucide-react';

export type AdminTool = {
  slug: string;
  name: string;
  description: string;
  category: string;
  iconName: string;
  gradient: string;
  badge?: string;
  isNew?: boolean;
  popularity: number;
  status: 'published' | 'draft';
  addedDaysAgo?: number;
};

export type AdminCategory = {
  slug: string;
  name: string;
  count: number;
  iconName: string;
  gradient: string;
  description: string;
  seoTitle?: string;
  seoDescription?: string;
  sortOrder: number;
};

export type AdminBlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  status: 'published' | 'draft' | 'scheduled';
  featuredImage?: string;
  content: { heading: string; body: string[] }[];
  seoTitle?: string;
  seoDescription?: string;
};

export type AdminSeoSettings = {
  defaultTitle: string;
  defaultDescription: string;
  defaultKeywords: string[];
  canonicalBaseUrl: string;
  openGraphDefaults: {
    siteName: string;
    locale: string;
    defaultImage: string;
  };
  twitterDefaults: {
    handle: string;
    cardType: string;
  };
  robotsTxt: string;
  sitemapEnabled: boolean;
  jsonLdEnabled: boolean;
};

export type AdminHomepageSettings = {
  heroTitle: string;
  heroSubtitle: string;
  heroBadge: string;
  featuredToolSlugs: string[];
  trendingToolSlugs: string[];
  recentToolSlugs: string[];
  popularToolSlugs: string[];
  footerText: string;
};

export type AdminAdSettings = {
  enabled: boolean;
  network: 'adsense' | 'placeholder';
  publisherId: string;
  slots: Record<string, { enabled: boolean; slotId: string }>;
};

export type AdminAffiliateSettings = {
  enabled: boolean;
  networks: {
    amazon: { enabled: boolean; affiliateTag: string };
    impact: { enabled: boolean; affiliateId: string };
    cj: { enabled: boolean; publisherId: string };
    digistore24: { enabled: boolean; affiliateId: string };
    whop: { enabled: boolean; affiliateId: string };
    custom: { enabled: boolean; affiliateId: string };
  };
  products: {
    id: string;
    network: string;
    name: string;
    description: string;
    url: string;
    image?: string;
    price?: string;
    rating?: number;
    brand?: string;
  }[];
};

export type AdminNewsletterSettings = {
  enabled: boolean;
  provider: 'internal' | 'mailchimp' | 'convertkit';
  endpoint: string;
  subscribers: {
    id: string;
    email: string;
    subscribedAt: string;
    status: 'active' | 'unsubscribed';
  }[];
};

export type AdminSettings = {
  websiteName: string;
  logo: string;
  favicon: string;
  defaultTheme: 'light' | 'dark' | 'system';
  contactEmail: string;
  socialLinks: {
    twitter: string;
    github: string;
    linkedin: string;
    instagram: string;
  };
  analyticsIds: {
    googleAnalytics: string;
    googleSearchConsole: string;
    facebookPixel: string;
  };
};

export type AdminSystemInfo = {
  cacheSize: string;
  lastBackup: string | null;
  logCount: number;
  uptime: string;
  version: string;
};

export type AdminLogEntry = {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  message: string;
  source: string;
};

export type AdminDashboardStats = {
  totalTools: number;
  totalCategories: number;
  totalBlogPosts: number;
  totalSearches: number;
  totalFavorites: number;
  totalRecentUsage: number;
  totalViews: number;
  websiteStatus: 'operational' | 'degraded' | 'down';
  mostUsedTools: { name: string; count: number }[];
  popularCategories: { name: string; count: number }[];
  dailySearches: { date: string; count: number }[];
  weeklyActivity: { day: string; tools: number; searches: number }[];
};
