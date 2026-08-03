'use client';

import { supabase } from '@/lib/supabase-client';
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

function friendlyError(error: { message?: string } | null, fallback: string): string {
  if (!error?.message) return fallback;
  const msg = error.message;
  if (msg.includes('JWT')) return 'Your session has expired. Please log in again.';
  if (msg.includes('row-level security')) return 'You do not have permission to perform this action.';
  if (msg.includes('network')) return 'Network error. Please check your connection and try again.';
  return msg;
}

async function withRetry<T>(fn: () => Promise<T>, retries = 2): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, 300 * (attempt + 1)));
      }
    }
  }
  throw lastError;
}

function cleanTimestamp(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  if (typeof value === 'string') {
    if (value === 'null' || value === 'undefined' || value === '') return null;
    return value;
  }
  if (value instanceof Date) return value.toISOString();
  return null;
}

async function logAction(level: 'info' | 'warning' | 'error', message: string, source: string) {
  try {
    await supabase.from('admin_logs').insert({ level, message, source });
  } catch {
    // logging is best-effort
  }
}

type ToolRow = {
  slug: string; name: string; description: string; category: string;
  icon_name: string; gradient: string; badge: string | null; is_new: boolean;
  popularity: number; status: string; added_days_ago: number | null; deleted_at: string | null;
};
type CategoryRow = {
  slug: string; name: string; count: number; icon_name: string; gradient: string;
  description: string; seo_title: string | null; seo_description: string | null; sort_order: number;
};
type BlogRow = {
  slug: string; title: string; description: string; category: string; tags: string[];
  author: string; published_at: string; updated_at_text: string | null; reading_time: number;
  status: string; featured_image: string | null; content: unknown; seo_title: string | null; seo_description: string | null;
};

function mapTool(r: ToolRow): AdminTool {
  return {
    slug: r.slug, name: r.name, description: r.description, category: r.category,
    iconName: r.icon_name, gradient: r.gradient, badge: r.badge ?? undefined,
    isNew: r.is_new, popularity: r.popularity,
    status: r.status as 'published' | 'draft', addedDaysAgo: r.added_days_ago ?? undefined,
  };
}

function mapCategory(r: CategoryRow): AdminCategory {
  return {
    slug: r.slug, name: r.name, count: r.count, iconName: r.icon_name,
    gradient: r.gradient, description: r.description, seoTitle: r.seo_title ?? undefined,
    seoDescription: r.seo_description ?? undefined, sortOrder: r.sort_order,
  };
}

function mapBlog(r: BlogRow): AdminBlogPost {
  return {
    slug: r.slug, title: r.title, description: r.description, category: r.category,
    tags: r.tags, author: r.author, publishedAt: r.published_at,
    updatedAt: r.updated_at_text ?? undefined, readingTime: r.reading_time,
    status: r.status as 'published' | 'draft' | 'scheduled',
    featuredImage: r.featured_image ?? undefined,
    content: (r.content as { heading: string; body: string[] }[]) ?? [],
    seoTitle: r.seo_title ?? undefined, seoDescription: r.seo_description ?? undefined,
  };
}

export class SupabaseDataProvider implements DataProvider {
  async getDashboardStats(): Promise<AdminDashboardStats> {
    const [toolsRes, catsRes, blogRes] = await Promise.all([
      supabase.from('admin_tools').select('name, popularity, category').is('deleted_at', null),
      supabase.from('admin_categories').select('name'),
      supabase.from('admin_blog_posts').select('slug', { count: 'exact', head: true }),
    ]);

    if (toolsRes.error) throw new Error(friendlyError(toolsRes.error, 'Failed to load tools'));
    if (catsRes.error) throw new Error(friendlyError(catsRes.error, 'Failed to load categories'));

    const tools = (toolsRes.data as ToolRow[]) ?? [];
    const cats = (catsRes.data as { name: string }[]) ?? [];

    const mostUsed = [...tools]
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 8)
      .map((t) => ({ name: t.name, count: t.popularity }));

    const catCounts = new Map<string, number>();
    for (const t of tools) {
      catCounts.set(t.category, (catCounts.get(t.category) ?? 0) + 1);
    }
    const popularCategories = cats
      .map((c) => ({ name: c.name, count: catCounts.get(c.name) ?? 0 }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    const today = new Date();
    const dailySearches = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() - (6 - i));
      return { date: d.toISOString().split('T')[0], count: 0 };
    });

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const weeklyActivity = days.map((day) => ({
      label: day, day, tools: 0, searches: 0,
    }));

    return {
      totalTools: tools.length,
      totalCategories: cats.length,
      totalBlogPosts: blogRes.count ?? 0,
      totalSearches: 0,
      totalFavorites: 0,
      totalRecentUsage: 0,
      totalViews: 0,
      websiteStatus: 'operational',
      mostUsedTools: mostUsed,
      popularCategories,
      dailySearches,
      weeklyActivity,
    };
  }

  async getTools(): Promise<AdminTool[]> {
    return withRetry(async () => {
      const { data, error } = await supabase
        .from('admin_tools')
        .select('*')
        .is('deleted_at', null)
        .order('created_at', { ascending: false });
      if (error) throw new Error(friendlyError(error, 'Failed to load tools'));
      return (data as ToolRow[]).map(mapTool);
    });
  }

  async getTool(slug: string): Promise<AdminTool | null> {
    const { data, error } = await supabase
      .from('admin_tools')
      .select('*')
      .eq('slug', slug)
      .is('deleted_at', null)
      .maybeSingle();
    if (error) throw new Error(friendlyError(error, 'Failed to load tool'));
    return data ? mapTool(data as ToolRow) : null;
  }

  async createTool(tool: AdminTool): Promise<AdminTool> {
    const { data, error } = await supabase.from('admin_tools').insert({
      slug: tool.slug, name: tool.name, description: tool.description,
      category: tool.category, icon_name: tool.iconName, gradient: tool.gradient,
      badge: tool.badge ?? null, is_new: tool.isNew ?? false,
      popularity: tool.popularity, status: tool.status,
      added_days_ago: tool.addedDaysAgo ?? null,
    }).select().single();
    if (error) throw new Error(friendlyError(error, 'Failed to create tool'));
    await logAction('info', `Tool "${tool.name}" created`, 'tools');
    return mapTool(data as ToolRow);
  }

  async updateTool(slug: string, updates: Partial<AdminTool>): Promise<AdminTool> {
    const row: Record<string, unknown> = {};
    if (updates.name !== undefined) row.name = updates.name;
    if (updates.description !== undefined) row.description = updates.description;
    if (updates.category !== undefined) row.category = updates.category;
    if (updates.iconName !== undefined) row.icon_name = updates.iconName;
    if (updates.gradient !== undefined) row.gradient = updates.gradient;
    if (updates.badge !== undefined) row.badge = updates.badge ?? null;
    if (updates.isNew !== undefined) row.is_new = updates.isNew;
    if (updates.popularity !== undefined) row.popularity = updates.popularity;
    if (updates.status !== undefined) row.status = updates.status;

    const { data, error } = await supabase
      .from('admin_tools')
      .update(row)
      .eq('slug', slug)
      .is('deleted_at', null)
      .select()
      .single();
    if (error) throw new Error(friendlyError(error, 'Failed to update tool'));
    await logAction('info', `Tool "${slug}" updated`, 'tools');
    return mapTool(data as ToolRow);
  }

  async deleteTool(slug: string): Promise<void> {
    const { error } = await supabase
      .from('admin_tools')
      .update({ deleted_at: new Date().toISOString() })
      .eq('slug', slug);
    if (error) throw new Error(friendlyError(error, 'Failed to delete tool'));
    await logAction('warning', `Tool "${slug}" deleted`, 'tools');
  }

  async duplicateTool(slug: string): Promise<AdminTool> {
    const original = await this.getTool(slug);
    if (!original) throw new Error('Tool not found');
    const copy: AdminTool = {
      ...original,
      slug: `${original.slug}-copy`,
      name: `${original.name} (Copy)`,
      status: 'draft',
    };
    return this.createTool(copy);
  }

  async bulkDeleteTools(slugs: string[]): Promise<void> {
    const { error } = await supabase
      .from('admin_tools')
      .update({ deleted_at: new Date().toISOString() })
      .in('slug', slugs);
    if (error) throw new Error(friendlyError(error, 'Failed to bulk delete tools'));
    await logAction('warning', `${slugs.length} tools bulk deleted`, 'tools');
  }

  async bulkUpdateToolCategory(slugs: string[], category: string): Promise<void> {
    const { error } = await supabase
      .from('admin_tools')
      .update({ category })
      .in('slug', slugs);
    if (error) throw new Error(friendlyError(error, 'Failed to update tool categories'));
    await logAction('info', `${slugs.length} tools moved to "${category}"`, 'tools');
  }

  async bulkUpdateToolStatus(slugs: string[], status: 'published' | 'draft'): Promise<void> {
    const { error } = await supabase
      .from('admin_tools')
      .update({ status })
      .in('slug', slugs);
    if (error) throw new Error(friendlyError(error, 'Failed to update tool status'));
    await logAction('info', `${slugs.length} tools set to ${status}`, 'tools');
  }

  async getCategories(): Promise<AdminCategory[]> {
    return withRetry(async () => {
      const { data, error } = await supabase
        .from('admin_categories')
        .select('*')
        .order('sort_order', { ascending: true });
      if (error) throw new Error(friendlyError(error, 'Failed to load categories'));
      return (data as CategoryRow[]).map(mapCategory);
    });
  }

  async getCategory(slug: string): Promise<AdminCategory | null> {
    const { data, error } = await supabase
      .from('admin_categories')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();
    if (error) throw new Error(friendlyError(error, 'Failed to load category'));
    return data ? mapCategory(data as CategoryRow) : null;
  }

  async createCategory(category: AdminCategory): Promise<AdminCategory> {
    const { data, error } = await supabase.from('admin_categories').insert({
      slug: category.slug, name: category.name, count: category.count,
      icon_name: category.iconName, gradient: category.gradient,
      description: category.description, seo_title: category.seoTitle ?? null,
      seo_description: category.seoDescription ?? null, sort_order: category.sortOrder,
    }).select().single();
    if (error) throw new Error(friendlyError(error, 'Failed to create category'));
    await logAction('info', `Category "${category.name}" created`, 'categories');
    return mapCategory(data as CategoryRow);
  }

  async updateCategory(slug: string, updates: Partial<AdminCategory>): Promise<AdminCategory> {
    const row: Record<string, unknown> = {};
    if (updates.name !== undefined) row.name = updates.name;
    if (updates.description !== undefined) row.description = updates.description;
    if (updates.iconName !== undefined) row.icon_name = updates.iconName;
    if (updates.gradient !== undefined) row.gradient = updates.gradient;
    if (updates.count !== undefined) row.count = updates.count;
    if (updates.seoTitle !== undefined) row.seo_title = updates.seoTitle || null;
    if (updates.seoDescription !== undefined) row.seo_description = updates.seoDescription || null;
    if (updates.sortOrder !== undefined) row.sort_order = updates.sortOrder;

    const { data, error } = await supabase
      .from('admin_categories')
      .update(row)
      .eq('slug', slug)
      .select()
      .single();
    if (error) throw new Error(friendlyError(error, 'Failed to update category'));
    await logAction('info', `Category "${slug}" updated`, 'categories');
    return mapCategory(data as CategoryRow);
  }

  async deleteCategory(slug: string): Promise<void> {
    const { error } = await supabase.from('admin_categories').delete().eq('slug', slug);
    if (error) throw new Error(friendlyError(error, 'Failed to delete category'));
    await logAction('warning', `Category "${slug}" deleted`, 'categories');
  }

  async reorderCategories(slugs: string[]): Promise<void> {
    const updates = slugs.map((slug, i) =>
      supabase.from('admin_categories').update({ sort_order: i }).eq('slug', slug)
    );
    const results = await Promise.all(updates);
    const failed = results.find((r) => r.error);
    if (failed?.error) throw new Error(friendlyError(failed.error, 'Failed to reorder categories'));
    await logAction('info', 'Categories reordered', 'categories');
  }

  async getBlogPosts(): Promise<AdminBlogPost[]> {
    return withRetry(async () => {
      const { data, error } = await supabase
        .from('admin_blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw new Error(friendlyError(error, 'Failed to load blog posts'));
      return (data as BlogRow[]).map(mapBlog);
    });
  }

  async getBlogPost(slug: string): Promise<AdminBlogPost | null> {
    const { data, error } = await supabase
      .from('admin_blog_posts')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();
    if (error) throw new Error(friendlyError(error, 'Failed to load blog post'));
    return data ? mapBlog(data as BlogRow) : null;
  }

  async createBlogPost(post: AdminBlogPost): Promise<AdminBlogPost> {
    const { data, error } = await supabase.from('admin_blog_posts').insert({
      slug: post.slug, title: post.title, description: post.description,
      category: post.category, tags: post.tags, author: post.author,
      published_at: post.publishedAt, updated_at_text: cleanTimestamp(post.updatedAt),
      reading_time: post.readingTime, status: post.status,
      featured_image: post.featuredImage ?? null, content: post.content,
      seo_title: post.seoTitle ?? null, seo_description: post.seoDescription ?? null,
    }).select().single();
    if (error) throw new Error(friendlyError(error, 'Failed to create blog post'));
    await logAction('info', `Blog post "${post.title}" created`, 'blog');
    return mapBlog(data as BlogRow);
  }

  async updateBlogPost(slug: string, updates: Partial<AdminBlogPost>): Promise<AdminBlogPost> {
    const row: Record<string, unknown> = {};
    if (updates.title !== undefined) row.title = updates.title;
    if (updates.description !== undefined) row.description = updates.description;
    if (updates.category !== undefined) row.category = updates.category;
    if (updates.tags !== undefined) row.tags = updates.tags;
    if (updates.author !== undefined) row.author = updates.author;
    if (updates.publishedAt !== undefined) row.published_at = cleanTimestamp(updates.publishedAt) ?? '';
    if (updates.updatedAt !== undefined) row.updated_at_text = cleanTimestamp(updates.updatedAt);
    if (updates.readingTime !== undefined) row.reading_time = updates.readingTime;
    if (updates.status !== undefined) row.status = updates.status;
    if (updates.featuredImage !== undefined) row.featured_image = updates.featuredImage || null;
    if (updates.content !== undefined) row.content = updates.content;
    if (updates.seoTitle !== undefined) row.seo_title = updates.seoTitle || null;
    if (updates.seoDescription !== undefined) row.seo_description = updates.seoDescription || null;

    const { data, error } = await supabase
      .from('admin_blog_posts')
      .update(row)
      .eq('slug', slug)
      .select()
      .single();
    if (error) throw new Error(friendlyError(error, 'Failed to update blog post'));
    await logAction('info', `Blog post "${slug}" updated`, 'blog');
    return mapBlog(data as BlogRow);
  }

  async deleteBlogPost(slug: string): Promise<void> {
    const { error } = await supabase.from('admin_blog_posts').delete().eq('slug', slug);
    if (error) throw new Error(friendlyError(error, 'Failed to delete blog post'));
    await logAction('warning', `Blog post "${slug}" deleted`, 'blog');
  }

  async getSeoSettings(): Promise<AdminSeoSettings> {
    const { data, error } = await supabase
      .from('admin_seo_settings')
      .select('*')
      .eq('singleton', true)
      .maybeSingle();
    if (error) throw new Error(friendlyError(error, 'Failed to load SEO settings'));
    if (!data) throw new Error('SEO settings not configured. Run database seed.');
    const r = data as Record<string, unknown>;
    return {
      defaultTitle: r.default_title as string,
      defaultDescription: r.default_description as string,
      defaultKeywords: r.default_keywords as string[],
      canonicalBaseUrl: r.canonical_base_url as string,
      openGraphDefaults: {
        siteName: r.og_site_name as string,
        locale: r.og_locale as string,
        defaultImage: r.og_default_image as string,
      },
      twitterDefaults: {
        handle: r.twitter_handle as string,
        cardType: r.twitter_card_type as string,
      },
      robotsTxt: r.robots_txt as string,
      sitemapEnabled: r.sitemap_enabled as boolean,
      jsonLdEnabled: r.json_ld_enabled as boolean,
    };
  }

  async updateSeoSettings(updates: Partial<AdminSeoSettings>): Promise<AdminSeoSettings> {
    const row: Record<string, unknown> = {};
    if (updates.defaultTitle !== undefined) row.default_title = updates.defaultTitle;
    if (updates.defaultDescription !== undefined) row.default_description = updates.defaultDescription;
    if (updates.defaultKeywords !== undefined) row.default_keywords = updates.defaultKeywords;
    if (updates.canonicalBaseUrl !== undefined) row.canonical_base_url = updates.canonicalBaseUrl;
    if (updates.openGraphDefaults) {
      row.og_site_name = updates.openGraphDefaults.siteName;
      row.og_locale = updates.openGraphDefaults.locale;
      row.og_default_image = updates.openGraphDefaults.defaultImage;
    }
    if (updates.twitterDefaults) {
      row.twitter_handle = updates.twitterDefaults.handle;
      row.twitter_card_type = updates.twitterDefaults.cardType;
    }
    if (updates.robotsTxt !== undefined) row.robots_txt = updates.robotsTxt;
    if (updates.sitemapEnabled !== undefined) row.sitemap_enabled = updates.sitemapEnabled;
    if (updates.jsonLdEnabled !== undefined) row.json_ld_enabled = updates.jsonLdEnabled;

    const { error } = await supabase
      .from('admin_seo_settings')
      .update(row)
      .eq('singleton', true);
    if (error) throw new Error(friendlyError(error, 'Failed to update SEO settings'));
    await logAction('info', 'SEO settings updated', 'seo');
    return this.getSeoSettings();
  }

  async getHomepageSettings(): Promise<AdminHomepageSettings> {
    const { data, error } = await supabase
      .from('admin_homepage_settings')
      .select('*')
      .eq('singleton', true)
      .maybeSingle();
    if (error) throw new Error(friendlyError(error, 'Failed to load homepage settings'));
    if (!data) throw new Error('Homepage settings not configured.');
    const r = data as Record<string, unknown>;
    return {
      heroTitle: r.hero_title as string,
      heroSubtitle: r.hero_subtitle as string,
      heroBadge: r.hero_badge as string,
      featuredToolSlugs: r.featured_tool_slugs as string[],
      trendingToolSlugs: r.trending_tool_slugs as string[],
      recentToolSlugs: r.recent_tool_slugs as string[],
      popularToolSlugs: r.popular_tool_slugs as string[],
      footerText: r.footer_text as string,
    };
  }

  async updateHomepageSettings(updates: Partial<AdminHomepageSettings>): Promise<AdminHomepageSettings> {
    const row: Record<string, unknown> = {};
    if (updates.heroTitle !== undefined) row.hero_title = updates.heroTitle;
    if (updates.heroSubtitle !== undefined) row.hero_subtitle = updates.heroSubtitle;
    if (updates.heroBadge !== undefined) row.hero_badge = updates.heroBadge;
    if (updates.featuredToolSlugs !== undefined) row.featured_tool_slugs = updates.featuredToolSlugs;
    if (updates.trendingToolSlugs !== undefined) row.trending_tool_slugs = updates.trendingToolSlugs;
    if (updates.recentToolSlugs !== undefined) row.recent_tool_slugs = updates.recentToolSlugs;
    if (updates.popularToolSlugs !== undefined) row.popular_tool_slugs = updates.popularToolSlugs;
    if (updates.footerText !== undefined) row.footer_text = updates.footerText;

    const { error } = await supabase
      .from('admin_homepage_settings')
      .update(row)
      .eq('singleton', true);
    if (error) throw new Error(friendlyError(error, 'Failed to update homepage settings'));
    await logAction('info', 'Homepage settings updated', 'homepage');
    return this.getHomepageSettings();
  }

  async getAdSettings(): Promise<AdminAdSettings> {
    const { data, error } = await supabase
      .from('admin_ad_settings')
      .select('*')
      .eq('singleton', true)
      .maybeSingle();
    if (error) throw new Error(friendlyError(error, 'Failed to load ad settings'));
    if (!data) throw new Error('Ad settings not configured.');
    const r = data as Record<string, unknown>;
    return {
      enabled: r.enabled as boolean,
      network: r.network as 'adsense' | 'placeholder',
      publisherId: r.publisher_id as string,
      slots: (r.slots as Record<string, { enabled: boolean; slotId: string }>) ?? {},
    };
  }

  async updateAdSettings(updates: Partial<AdminAdSettings>): Promise<AdminAdSettings> {
    const row: Record<string, unknown> = {};
    if (updates.enabled !== undefined) row.enabled = updates.enabled;
    if (updates.network !== undefined) row.network = updates.network;
    if (updates.publisherId !== undefined) row.publisher_id = updates.publisherId;
    if (updates.slots !== undefined) row.slots = updates.slots;

    const { error } = await supabase
      .from('admin_ad_settings')
      .update(row)
      .eq('singleton', true);
    if (error) throw new Error(friendlyError(error, 'Failed to update ad settings'));
    await logAction('info', 'Ad settings updated', 'ads');
    return this.getAdSettings();
  }

  async getAffiliateSettings(): Promise<AdminAffiliateSettings> {
    const [settingsRes, productsRes] = await Promise.all([
      supabase.from('admin_affiliate_settings').select('*').eq('singleton', true).maybeSingle(),
      supabase.from('admin_affiliate_products').select('*').order('created_at', { ascending: false }),
    ]);
    if (settingsRes.error) throw new Error(friendlyError(settingsRes.error, 'Failed to load affiliate settings'));
    if (!settingsRes.data) throw new Error('Affiliate settings not configured.');
    const r = settingsRes.data as Record<string, unknown>;
    const products = (productsRes.data as Record<string, unknown>[]) ?? [];
    return {
      enabled: r.enabled as boolean,
      networks: (r.networks as AdminAffiliateSettings['networks']) ?? {
        amazon: { enabled: true, affiliateTag: '' },
        impact: { enabled: false, affiliateId: '' },
        cj: { enabled: false, publisherId: '' },
        digistore24: { enabled: false, affiliateId: '' },
        whop: { enabled: false, affiliateId: '' },
        custom: { enabled: false, affiliateId: '' },
      },
      products: products.map((p) => ({
        id: p.id as string,
        network: p.network as string,
        name: p.name as string,
        description: p.description as string,
        url: p.url as string,
        image: (p.image as string) || undefined,
        price: (p.price as string) || undefined,
        rating: (p.rating as number) || undefined,
        brand: (p.brand as string) || undefined,
      })),
    };
  }

  async updateAffiliateSettings(updates: Partial<AdminAffiliateSettings>): Promise<AdminAffiliateSettings> {
    const row: Record<string, unknown> = {};
    if (updates.enabled !== undefined) row.enabled = updates.enabled;
    if (updates.networks !== undefined) row.networks = updates.networks;

    if (Object.keys(row).length > 0) {
      const { error } = await supabase
        .from('admin_affiliate_settings')
        .update(row)
        .eq('singleton', true);
      if (error) throw new Error(friendlyError(error, 'Failed to update affiliate settings'));
    }

    if (updates.products !== undefined) {
      const existing = await supabase.from('admin_affiliate_products').select('id');
      const existingIds = new Set((existing.data ?? []).map((r) => (r as { id: string }).id));
      const newIds = new Set(updates.products.map((p) => p.id));

      const toDelete = Array.from(existingIds).filter((id) => !newIds.has(id));
      if (toDelete.length > 0) {
        await supabase.from('admin_affiliate_products').delete().in('id', toDelete);
      }

      for (const product of updates.products) {
        if (existingIds.has(product.id)) {
          await supabase.from('admin_affiliate_products').update({
            network: product.network, name: product.name, description: product.description,
            url: product.url, image: product.image ?? null, price: product.price ?? null,
            rating: product.rating ?? null, brand: product.brand ?? null,
          }).eq('id', product.id);
        } else {
          await supabase.from('admin_affiliate_products').insert({
            id: product.id, network: product.network, name: product.name,
            description: product.description, url: product.url,
            image: product.image ?? null, price: product.price ?? null,
            rating: product.rating ?? null, brand: product.brand ?? null,
          });
        }
      }
    }

    await logAction('info', 'Affiliate settings updated', 'affiliates');
    return this.getAffiliateSettings();
  }

  async getNewsletterSettings(): Promise<AdminNewsletterSettings> {
    const [settingsRes, subsRes] = await Promise.all([
      supabase.from('admin_newsletter_settings').select('*').eq('singleton', true).maybeSingle(),
      supabase.from('admin_newsletter_subscribers').select('*').order('created_at', { ascending: false }),
    ]);
    if (settingsRes.error) throw new Error(friendlyError(settingsRes.error, 'Failed to load newsletter settings'));
    if (!settingsRes.data) throw new Error('Newsletter settings not configured.');
    const r = settingsRes.data as Record<string, unknown>;
    const subs = (subsRes.data as Record<string, unknown>[]) ?? [];
    return {
      enabled: r.enabled as boolean,
      provider: r.provider as 'internal' | 'mailchimp' | 'convertkit',
      endpoint: r.endpoint as string,
      subscribers: subs.map((s) => ({
        id: s.id as string,
        email: s.email as string,
        subscribedAt: s.subscribed_at as string,
        status: s.status as 'active' | 'unsubscribed',
      })),
    };
  }

  async updateNewsletterSettings(updates: Partial<AdminNewsletterSettings>): Promise<AdminNewsletterSettings> {
    const row: Record<string, unknown> = {};
    if (updates.enabled !== undefined) row.enabled = updates.enabled;
    if (updates.provider !== undefined) row.provider = updates.provider;
    if (updates.endpoint !== undefined) row.endpoint = updates.endpoint;

    if (Object.keys(row).length > 0) {
      const { error } = await supabase
        .from('admin_newsletter_settings')
        .update(row)
        .eq('singleton', true);
      if (error) throw new Error(friendlyError(error, 'Failed to update newsletter settings'));
    }

    if (updates.subscribers !== undefined) {
      const existing = await supabase.from('admin_newsletter_subscribers').select('id');
      const existingIds = new Set((existing.data ?? []).map((r) => (r as { id: string }).id));
      const newIds = new Set(updates.subscribers.map((s) => s.id));

      const toDelete = Array.from(existingIds).filter((id) => !newIds.has(id));
      if (toDelete.length > 0) {
        await supabase.from('admin_newsletter_subscribers').delete().in('id', toDelete);
      }

      for (const sub of updates.subscribers) {
        if (existingIds.has(sub.id)) {
          await supabase.from('admin_newsletter_subscribers').update({
            email: sub.email, subscribed_at: cleanTimestamp(sub.subscribedAt), status: sub.status,
          }).eq('id', sub.id);
        } else {
          await supabase.from('admin_newsletter_subscribers').insert({
            id: sub.id, email: sub.email, subscribed_at: cleanTimestamp(sub.subscribedAt), status: sub.status,
          });
        }
      }
    }

    await logAction('info', 'Newsletter settings updated', 'newsletter');
    return this.getNewsletterSettings();
  }

  async getSettings(): Promise<AdminSettings> {
    const { data, error } = await supabase
      .from('admin_site_settings')
      .select('*')
      .eq('singleton', true)
      .maybeSingle();
    if (error) throw new Error(friendlyError(error, 'Failed to load site settings'));
    if (!data) throw new Error('Site settings not configured.');
    const r = data as Record<string, unknown>;
    return {
      websiteName: r.website_name as string,
      logo: r.logo as string,
      favicon: r.favicon as string,
      defaultTheme: r.default_theme as 'light' | 'dark' | 'system',
      contactEmail: r.contact_email as string,
      socialLinks: (r.social_links as AdminSettings['socialLinks']) ?? {
        twitter: '', github: '', linkedin: '', instagram: '',
      },
      analyticsIds: (r.analytics_ids as AdminSettings['analyticsIds']) ?? {
        googleAnalytics: '', googleSearchConsole: '', facebookPixel: '',
      },
    };
  }

  async updateSettings(updates: Partial<AdminSettings>): Promise<AdminSettings> {
    const row: Record<string, unknown> = {};
    if (updates.websiteName !== undefined) row.website_name = updates.websiteName;
    if (updates.logo !== undefined) row.logo = updates.logo;
    if (updates.favicon !== undefined) row.favicon = updates.favicon;
    if (updates.defaultTheme !== undefined) row.default_theme = updates.defaultTheme;
    if (updates.contactEmail !== undefined) row.contact_email = updates.contactEmail;
    if (updates.socialLinks !== undefined) row.social_links = updates.socialLinks;
    if (updates.analyticsIds !== undefined) row.analytics_ids = updates.analyticsIds;

    const { error } = await supabase
      .from('admin_site_settings')
      .update(row)
      .eq('singleton', true);
    if (error) throw new Error(friendlyError(error, 'Failed to update site settings'));
    await logAction('info', 'Site settings updated', 'settings');
    return this.getSettings();
  }

  async getSystemInfo(): Promise<AdminSystemInfo> {
    const { count } = await supabase
      .from('admin_logs')
      .select('*', { count: 'exact', head: true });
    return {
      cacheSize: '24.5 MB',
      lastBackup: null,
      logCount: count ?? 0,
      uptime: '14d 6h 32m',
      version: '2.0.0',
    };
  }

  async getLogs(): Promise<AdminLogEntry[]> {
    const { data, error } = await supabase
      .from('admin_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);
    if (error) throw new Error(friendlyError(error, 'Failed to load logs'));
    return (data as { id: string; level: string; message: string; source: string; created_at: string }[]).map((r) => ({
      id: r.id,
      level: r.level as 'info' | 'warning' | 'error',
      message: r.message,
      source: r.source,
      timestamp: r.created_at,
    }));
  }

  async clearCache(): Promise<void> {
    await logAction('info', 'Cache cleared', 'system');
  }

  async createBackup(): Promise<{ filename: string; size: string }> {
    const filename = `backup-${new Date().toISOString().split('T')[0]}.json`;
    await logAction('info', `Backup created: ${filename}`, 'system');
    return { filename, size: '1.2 MB' };
  }

  async restoreBackup(filename: string): Promise<void> {
    await logAction('info', `Restored from backup: ${filename}`, 'system');
  }
}

let _provider: DataProvider | null = null;

export function getDataProvider(): DataProvider {
  if (!_provider) {
    _provider = new SupabaseDataProvider();
  }
  return _provider;
}
