import { tools, categories } from '@/lib/data';
import { blogPosts } from '@/lib/seo';
import { monetizationConfig } from '@/lib/monetization';
import type {
  AdminTool,
  AdminCategory,
  AdminBlogPost,
  AdminSeoSettings,
  AdminHomepageSettings,
  AdminAdSettings,
  AdminAffiliateSettings,
  AdminNewsletterSettings,
  AdminSettings,
  AdminSystemInfo,
  AdminLogEntry,
  AdminDashboardStats,
} from './types';
import type { DataProvider } from './provider';

function delay(ms = 100): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function toIconName(icon: unknown): string {
  if (typeof icon === 'object' && icon !== null && 'displayName' in icon) {
    return String((icon as { displayName: string }).displayName);
  }
  return 'Wrench';
}

function toAdminTool(tool: (typeof tools)[number]): AdminTool {
  return {
    slug: tool.slug,
    name: tool.name,
    description: tool.description,
    category: tool.category,
    iconName: toIconName(tool.icon),
    gradient: tool.gradient,
    badge: tool.badge,
    isNew: tool.isNew,
    popularity: tool.popularity,
    status: 'published',
    addedDaysAgo: tool.addedDaysAgo,
  };
}

function toAdminCategory(cat: (typeof categories)[number], sortOrder: number): AdminCategory {
  return {
    slug: cat.slug,
    name: cat.name,
    count: cat.count,
    iconName: toIconName(cat.icon),
    gradient: cat.gradient,
    description: cat.description,
    sortOrder,
  };
}

function toAdminBlogPost(post: (typeof blogPosts)[number]): AdminBlogPost {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    category: post.category,
    tags: post.tags,
    author: post.author,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    readingTime: post.readingTime,
    status: 'published',
    content: post.content,
  };
}

export class StaticDataProvider implements DataProvider {
  private _tools: AdminTool[] = [];
  private _categories: AdminCategory[] = [];
  private _blogPosts: AdminBlogPost[] = [];
  private _seoSettings: AdminSeoSettings | null = null;
  private _homepageSettings: AdminHomepageSettings | null = null;
  private _adSettings: AdminAdSettings | null = null;
  private _affiliateSettings: AdminAffiliateSettings | null = null;
  private _newsletterSettings: AdminNewsletterSettings | null = null;
  private _settings: AdminSettings | null = null;
  private _logs: AdminLogEntry[] = [];
  private _lastBackup: string | null = null;

  constructor() {
    this._tools = tools.map(toAdminTool);
    this._categories = categories.map((c, i) => toAdminCategory(c, i));
    this._blogPosts = blogPosts.map(toAdminBlogPost);
    this._logs = [
      { id: '1', timestamp: new Date(Date.now() - 3600000).toISOString(), level: 'info', message: 'Admin dashboard initialized', source: 'system' },
      { id: '2', timestamp: new Date(Date.now() - 7200000).toISOString(), level: 'info', message: 'Static data provider loaded', source: 'dataProvider' },
    ];
  }

  async getDashboardStats(): Promise<AdminDashboardStats> {
    await delay();
    const mostUsed = [...this._tools]
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 8)
      .map((t) => ({ name: t.name, count: t.popularity }));

    const popularCats = this._categories
      .map((c) => ({
        name: c.name,
        count: this._tools.filter((t) => t.category === c.name).length,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    const today = new Date();
    const dailySearches = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() - (6 - i));
      return {
        date: d.toISOString().split('T')[0],
        count: Math.floor(Math.random() * 0 + 120) + 80 + i * 15,
      };
    });

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const weeklyActivity = days.map((day, i) => ({
      day,
      tools: 40 + i * 8,
      searches: 90 + i * 12,
    }));

    return {
      totalTools: this._tools.length,
      totalCategories: this._categories.length,
      totalBlogPosts: this._blogPosts.length,
      totalSearches: 12450,
      totalFavorites: 892,
      totalRecentUsage: 3210,
      totalViews: 145000,
      websiteStatus: 'operational',
      mostUsedTools: mostUsed,
      popularCategories: popularCats,
      dailySearches,
      weeklyActivity,
    };
  }

  async getTools(): Promise<AdminTool[]> {
    await delay();
    return [...this._tools];
  }

  async getTool(slug: string): Promise<AdminTool | null> {
    await delay();
    return this._tools.find((t) => t.slug === slug) ?? null;
  }

  async createTool(tool: AdminTool): Promise<AdminTool> {
    await delay();
    this._tools = [tool, ...this._tools];
    this.addLog('info', `Tool "${tool.name}" created`, 'tools');
    return tool;
  }

  async updateTool(slug: string, updates: Partial<AdminTool>): Promise<AdminTool> {
    await delay();
    const idx = this._tools.findIndex((t) => t.slug === slug);
    if (idx === -1) throw new Error('Tool not found');
    this._tools[idx] = { ...this._tools[idx], ...updates };
    this.addLog('info', `Tool "${slug}" updated`, 'tools');
    return this._tools[idx];
  }

  async deleteTool(slug: string): Promise<void> {
    await delay();
    this._tools = this._tools.filter((t) => t.slug !== slug);
    this.addLog('warning', `Tool "${slug}" deleted`, 'tools');
  }

  async duplicateTool(slug: string): Promise<AdminTool> {
    await delay();
    const original = this._tools.find((t) => t.slug === slug);
    if (!original) throw new Error('Tool not found');
    const copy: AdminTool = {
      ...original,
      slug: `${original.slug}-copy`,
      name: `${original.name} (Copy)`,
      status: 'draft',
    };
    this._tools = [copy, ...this._tools];
    this.addLog('info', `Tool "${slug}" duplicated`, 'tools');
    return copy;
  }

  async bulkDeleteTools(slugs: string[]): Promise<void> {
    await delay();
    this._tools = this._tools.filter((t) => !slugs.includes(t.slug));
    this.addLog('warning', `${slugs.length} tools bulk deleted`, 'tools');
  }

  async bulkUpdateToolCategory(slugs: string[], category: string): Promise<void> {
    await delay();
    this._tools = this._tools.map((t) =>
      slugs.includes(t.slug) ? { ...t, category } : t
    );
    this.addLog('info', `${slugs.length} tools moved to "${category}"`, 'tools');
  }

  async bulkUpdateToolStatus(slugs: string[], status: 'published' | 'draft'): Promise<void> {
    await delay();
    this._tools = this._tools.map((t) =>
      slugs.includes(t.slug) ? { ...t, status } : t
    );
    this.addLog('info', `${slugs.length} tools set to ${status}`, 'tools');
  }

  async getCategories(): Promise<AdminCategory[]> {
    await delay();
    return [...this._categories].sort((a, b) => a.sortOrder - b.sortOrder);
  }

  async getCategory(slug: string): Promise<AdminCategory | null> {
    await delay();
    return this._categories.find((c) => c.slug === slug) ?? null;
  }

  async createCategory(category: AdminCategory): Promise<AdminCategory> {
    await delay();
    this._categories = [...this._categories, category];
    this.addLog('info', `Category "${category.name}" created`, 'categories');
    return category;
  }

  async updateCategory(slug: string, updates: Partial<AdminCategory>): Promise<AdminCategory> {
    await delay();
    const idx = this._categories.findIndex((c) => c.slug === slug);
    if (idx === -1) throw new Error('Category not found');
    this._categories[idx] = { ...this._categories[idx], ...updates };
    this.addLog('info', `Category "${slug}" updated`, 'categories');
    return this._categories[idx];
  }

  async deleteCategory(slug: string): Promise<void> {
    await delay();
    this._categories = this._categories.filter((c) => c.slug !== slug);
    this.addLog('warning', `Category "${slug}" deleted`, 'categories');
  }

  async reorderCategories(slugs: string[]): Promise<void> {
    await delay();
    this._categories = slugs.map((slug, i) => {
      const cat = this._categories.find((c) => c.slug === slug);
      return cat ? { ...cat, sortOrder: i } : cat!;
    }).filter(Boolean);
    this.addLog('info', 'Categories reordered', 'categories');
  }

  async getBlogPosts(): Promise<AdminBlogPost[]> {
    await delay();
    return [...this._blogPosts];
  }

  async getBlogPost(slug: string): Promise<AdminBlogPost | null> {
    await delay();
    return this._blogPosts.find((p) => p.slug === slug) ?? null;
  }

  async createBlogPost(post: AdminBlogPost): Promise<AdminBlogPost> {
    await delay();
    this._blogPosts = [post, ...this._blogPosts];
    this.addLog('info', `Blog post "${post.title}" created`, 'blog');
    return post;
  }

  async updateBlogPost(slug: string, updates: Partial<AdminBlogPost>): Promise<AdminBlogPost> {
    await delay();
    const idx = this._blogPosts.findIndex((p) => p.slug === slug);
    if (idx === -1) throw new Error('Blog post not found');
    this._blogPosts[idx] = { ...this._blogPosts[idx], ...updates };
    this.addLog('info', `Blog post "${slug}" updated`, 'blog');
    return this._blogPosts[idx];
  }

  async deleteBlogPost(slug: string): Promise<void> {
    await delay();
    this._blogPosts = this._blogPosts.filter((p) => p.slug !== slug);
    this.addLog('warning', `Blog post "${slug}" deleted`, 'blog');
  }

  async getSeoSettings(): Promise<AdminSeoSettings> {
    await delay();
    if (!this._seoSettings) {
      this._seoSettings = {
        defaultTitle: 'ToolNest — Free Online Tools',
        defaultDescription: `${tools.length} free online tools — PDF, image, QR, SEO, AI, text, developer, calculators and more.`,
        defaultKeywords: ['free online tools', 'PDF tools', 'image tools', 'QR code generator', 'ToolNest'],
        canonicalBaseUrl: 'https://toolnest.com',
        openGraphDefaults: {
          siteName: 'ToolNest',
          locale: 'en_US',
          defaultImage: '/og-default.png',
        },
        twitterDefaults: {
          handle: '@toolnest',
          cardType: 'summary_large_image',
        },
        robotsTxt: 'User-agent: *\nAllow: /',
        sitemapEnabled: true,
        jsonLdEnabled: true,
      };
    }
    return { ...this._seoSettings };
  }

  async updateSeoSettings(updates: Partial<AdminSeoSettings>): Promise<AdminSeoSettings> {
    await delay();
    const current = await this.getSeoSettings();
    this._seoSettings = { ...current, ...updates };
    this.addLog('info', 'SEO settings updated', 'seo');
    return { ...this._seoSettings };
  }

  async getHomepageSettings(): Promise<AdminHomepageSettings> {
    await delay();
    if (!this._homepageSettings) {
      this._homepageSettings = {
        heroTitle: 'All Your Tools in One Nest',
        heroSubtitle: `${tools.length} free online tools — no signup, no limits, no hassle.`,
        heroBadge: '100% Free Forever',
        featuredToolSlugs: tools.slice(0, 8).map((t) => t.slug),
        trendingToolSlugs: tools.slice(0, 6).map((t) => t.slug),
        recentToolSlugs: tools.slice(0, 6).map((t) => t.slug),
        popularToolSlugs: [...tools].sort((a, b) => b.popularity - a.popularity).slice(0, 6).map((t) => t.slug),
        footerText: 'Built for everyone — free forever.',
      };
    }
    return { ...this._homepageSettings };
  }

  async updateHomepageSettings(updates: Partial<AdminHomepageSettings>): Promise<AdminHomepageSettings> {
    await delay();
    const current = await this.getHomepageSettings();
    this._homepageSettings = { ...current, ...updates };
    this.addLog('info', 'Homepage settings updated', 'homepage');
    return { ...this._homepageSettings };
  }

  async getAdSettings(): Promise<AdminAdSettings> {
    await delay();
    if (!this._adSettings) {
      const slots = monetizationConfig.ads.slots;
      this._adSettings = {
        enabled: monetizationConfig.ads.enabled,
        network: monetizationConfig.ads.network,
        publisherId: monetizationConfig.ads.publisherId,
        slots: Object.entries(slots).reduce<Record<string, { enabled: boolean; slotId: string }>>(
          (acc, [key, val]) => {
            acc[key] = { enabled: true, slotId: val };
            return acc;
          },
          {}
        ),
      };
    }
    return { ...this._adSettings, slots: { ...this._adSettings.slots } };
  }

  async updateAdSettings(updates: Partial<AdminAdSettings>): Promise<AdminAdSettings> {
    await delay();
    const current = await this.getAdSettings();
    this._adSettings = { ...current, ...updates };
    this.addLog('info', 'Ad settings updated', 'ads');
    return { ...this._adSettings, slots: { ...this._adSettings.slots } };
  }

  async getAffiliateSettings(): Promise<AdminAffiliateSettings> {
    await delay();
    if (!this._affiliateSettings) {
      this._affiliateSettings = {
        enabled: monetizationConfig.affiliates.enabled,
        networks: {
          amazon: { enabled: true, affiliateTag: 'toolnest-20' },
          impact: { enabled: false, affiliateId: '' },
          cj: { enabled: false, publisherId: '' },
          digistore24: { enabled: false, affiliateId: '' },
          whop: { enabled: false, affiliateId: '' },
          custom: { enabled: false, affiliateId: '' },
        },
        products: monetizationConfig.affiliates.products as AdminAffiliateSettings['products'],
      };
    }
    return JSON.parse(JSON.stringify(this._affiliateSettings));
  }

  async updateAffiliateSettings(updates: Partial<AdminAffiliateSettings>): Promise<AdminAffiliateSettings> {
    await delay();
    const current = await this.getAffiliateSettings();
    this._affiliateSettings = { ...current, ...updates };
    this.addLog('info', 'Affiliate settings updated', 'affiliates');
    return JSON.parse(JSON.stringify(this._affiliateSettings));
  }

  async getNewsletterSettings(): Promise<AdminNewsletterSettings> {
    await delay();
    if (!this._newsletterSettings) {
      this._newsletterSettings = {
        enabled: monetizationConfig.newsletter.enabled,
        provider: monetizationConfig.newsletter.provider,
        endpoint: monetizationConfig.newsletter.endpoint,
        subscribers: [],
      };
    }
    return JSON.parse(JSON.stringify(this._newsletterSettings));
  }

  async updateNewsletterSettings(updates: Partial<AdminNewsletterSettings>): Promise<AdminNewsletterSettings> {
    await delay();
    const current = await this.getNewsletterSettings();
    this._newsletterSettings = { ...current, ...updates };
    this.addLog('info', 'Newsletter settings updated', 'newsletter');
    return JSON.parse(JSON.stringify(this._newsletterSettings));
  }

  async getSettings(): Promise<AdminSettings> {
    await delay();
    if (!this._settings) {
      this._settings = {
        websiteName: 'ToolNest',
        logo: '/logo.png',
        favicon: '/favicon.ico',
        defaultTheme: 'dark',
        contactEmail: 'support@toolnest.com',
        socialLinks: {
          twitter: 'https://twitter.com/toolnest',
          github: 'https://github.com/toolnest',
          linkedin: 'https://www.linkedin.com/company/toolnest',
          instagram: '',
        },
        analyticsIds: {
          googleAnalytics: '',
          googleSearchConsole: '',
          facebookPixel: '',
        },
      };
    }
    return { ...this._settings };
  }

  async updateSettings(updates: Partial<AdminSettings>): Promise<AdminSettings> {
    await delay();
    const current = await this.getSettings();
    this._settings = { ...current, ...updates };
    this.addLog('info', 'Site settings updated', 'settings');
    return { ...this._settings };
  }

  async getSystemInfo(): Promise<AdminSystemInfo> {
    await delay();
    return {
      cacheSize: '24.5 MB',
      lastBackup: this._lastBackup,
      logCount: this._logs.length,
      uptime: '14d 6h 32m',
      version: '1.0.0',
    };
  }

  async getLogs(): Promise<AdminLogEntry[]> {
    await delay();
    return [...this._logs].reverse();
  }

  async clearCache(): Promise<void> {
    await delay();
    this.addLog('info', 'Cache cleared', 'system');
  }

  async createBackup(): Promise<{ filename: string; size: string }> {
    await delay(300);
    const filename = `backup-${new Date().toISOString().split('T')[0]}.json`;
    this._lastBackup = new Date().toISOString();
    this.addLog('info', `Backup created: ${filename}`, 'system');
    return { filename, size: '1.2 MB' };
  }

  async restoreBackup(filename: string): Promise<void> {
    await delay(300);
    this.addLog('info', `Restored from backup: ${filename}`, 'system');
  }

  private addLog(level: AdminLogEntry['level'], message: string, source: string) {
    this._logs.push({
      id: String(Date.now()),
      timestamp: new Date().toISOString(),
      level,
      message,
      source,
    });
  }
}

// Re-export getDataProvider from the Supabase provider.
// The static provider is kept for reference/testing only.
// The production admin dashboard uses the Supabase provider.
export { getDataProvider } from './supabase-provider';
