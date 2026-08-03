import { supabaseServer } from '@/lib/supabase-server';
import type { Tool, Category } from '@/lib/data';

export type PublicTool = Tool;
export type PublicCategory = Category;

export type PublicBlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  content: { heading: string; body: string[] }[];
  featuredImage?: string;
};

export type PublicSiteSettings = {
  websiteName: string;
  logo: string;
  favicon: string;
  contactEmail: string;
  socialLinks: {
    twitter: string;
    github: string;
    linkedin: string;
    instagram: string;
  };
};

export type PublicHomepageSettings = {
  heroTitle: string;
  heroSubtitle: string;
  heroBadge: string;
  featuredToolSlugs: string[];
  trendingToolSlugs: string[];
  recentToolSlugs: string[];
  popularToolSlugs: string[];
  footerText: string;
};

export type PublicSeoSettings = {
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

type ToolRow = {
  slug: string; name: string; description: string; category: string;
  icon_name: string; gradient: string; badge: string | null; is_new: boolean;
  popularity: number; added_days_ago: number | null;
};

type CategoryRow = {
  slug: string; name: string; count: number; icon_name: string;
  gradient: string; description: string; sort_order: number;
};

type BlogRow = {
  slug: string; title: string; description: string; category: string;
  tags: string[]; author: string; published_at: string; updated_at_text: string | null;
  reading_time: number; featured_image: string | null;
  content: unknown;
};

function mapTool(r: ToolRow): PublicTool {
  return {
    slug: r.slug,
    name: r.name,
    description: r.description,
    category: r.category,
    icon: r.icon_name,
    gradient: r.gradient,
    badge: r.badge ?? undefined,
    isNew: r.is_new,
    popularity: r.popularity,
    addedDaysAgo: r.added_days_ago ?? undefined,
  };
}

function mapCategory(r: CategoryRow): PublicCategory {
  return {
    slug: r.slug,
    name: r.name,
    count: r.count,
    icon: r.icon_name,
    gradient: r.gradient,
    description: r.description,
  };
}

function mapBlogPost(r: BlogRow): PublicBlogPost {
  return {
    slug: r.slug,
    title: r.title,
    description: r.description,
    category: r.category,
    tags: r.tags,
    author: r.author,
    publishedAt: r.published_at,
    updatedAt: r.updated_at_text ?? undefined,
    readingTime: r.reading_time,
    featuredImage: r.featured_image ?? undefined,
    content: (r.content as { heading: string; body: string[] }[]) ?? [],
  };
}

export async function fetchTools(): Promise<PublicTool[]> {
  const { data, error } = await supabaseServer
    .from('admin_tools')
    .select('slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago')
    .eq('status', 'published')
    .is('deleted_at', null)
    .order('popularity', { ascending: false });

  if (error || !data) return [];
  return (data as ToolRow[]).map(mapTool);
}

export async function fetchCategories(): Promise<PublicCategory[]> {
  const { data, error } = await supabaseServer
    .from('admin_categories')
    .select('slug, name, count, icon_name, gradient, description, sort_order')
    .order('sort_order', { ascending: true });

  if (error || !data) return [];
  return (data as CategoryRow[]).map(mapCategory);
}

export async function fetchBlogPosts(): Promise<PublicBlogPost[]> {
  const { data, error } = await supabaseServer
    .from('admin_blog_posts')
    .select('slug, title, description, category, tags, author, published_at, updated_at_text, reading_time, featured_image, content')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error || !data) return [];
  return (data as BlogRow[]).map(mapBlogPost);
}

export async function fetchBlogPost(slug: string): Promise<PublicBlogPost | null> {
  const { data, error } = await supabaseServer
    .from('admin_blog_posts')
    .select('slug, title, description, category, tags, author, published_at, updated_at_text, reading_time, featured_image, content')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle();

  if (error || !data) return null;
  return mapBlogPost(data as BlogRow);
}

export async function fetchSiteSettings(): Promise<PublicSiteSettings | null> {
  const { data, error } = await supabaseServer
    .from('admin_site_settings')
    .select('website_name, logo, favicon, contact_email, social_links')
    .eq('singleton', true)
    .maybeSingle();

  if (error || !data) return null;
  const r = data as { website_name: string; logo: string; favicon: string; contact_email: string; social_links: Record<string, string> };
  return {
    websiteName: r.website_name,
    logo: r.logo,
    favicon: r.favicon,
    contactEmail: r.contact_email,
    socialLinks: {
      twitter: r.social_links?.twitter ?? '',
      github: r.social_links?.github ?? '',
      linkedin: r.social_links?.linkedin ?? '',
      instagram: r.social_links?.instagram ?? '',
    },
  };
}

export async function fetchHomepageSettings(): Promise<PublicHomepageSettings | null> {
  const { data, error } = await supabaseServer
    .from('admin_homepage_settings')
    .select('hero_title, hero_subtitle, hero_badge, featured_tool_slugs, trending_tool_slugs, recent_tool_slugs, popular_tool_slugs, footer_text')
    .eq('singleton', true)
    .maybeSingle();

  if (error || !data) return null;
  const r = data as {
    hero_title: string; hero_subtitle: string; hero_badge: string;
    featured_tool_slugs: string[]; trending_tool_slugs: string[];
    recent_tool_slugs: string[]; popular_tool_slugs: string[];
    footer_text: string;
  };
  return {
    heroTitle: r.hero_title,
    heroSubtitle: r.hero_subtitle,
    heroBadge: r.hero_badge,
    featuredToolSlugs: r.featured_tool_slugs,
    trendingToolSlugs: r.trending_tool_slugs,
    recentToolSlugs: r.recent_tool_slugs,
    popularToolSlugs: r.popular_tool_slugs,
    footerText: r.footer_text,
  };
}

export async function fetchSeoSettings(): Promise<PublicSeoSettings | null> {
  const { data, error } = await supabaseServer
    .from('admin_seo_settings')
    .select('default_title, default_description, default_keywords, canonical_base_url, og_site_name, og_locale, og_default_image, twitter_handle, twitter_card_type, robots_txt, sitemap_enabled, json_ld_enabled')
    .eq('singleton', true)
    .maybeSingle();

  if (error || !data) return null;
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
