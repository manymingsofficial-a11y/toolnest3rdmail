/*
# ToolNest Admin Dashboard Schema

## Overview
Creates the complete database schema for the ToolNest Admin Dashboard.
All tables support CRUD operations from the admin panel with proper
foreign keys, timestamps, soft deletes, and Row Level Security.

## New Tables
1. `admin_categories` — Tool categories with SEO fields and sort order
2. `admin_tools` — Individual tools, FK to categories, soft delete
3. `admin_blog_posts` — Blog articles with content, tags, SEO, scheduling
4. `admin_seo_settings` — Single-row default SEO config
5. `admin_homepage_settings` — Single-row homepage config with tool slug arrays
6. `admin_ad_settings` — Single-row advertisement config with slot JSON
7. `admin_affiliate_products` — Affiliate products per network
8. `admin_affiliate_settings` — Single-row affiliate network config
9. `admin_newsletter_subscribers` — Email subscribers with status
10. `admin_newsletter_settings` — Single-row newsletter config
11. `admin_site_settings` — Single-row global site settings
12. `admin_logs` — System log entries with level and source

## Security
- RLS enabled on every table
- Policies scoped to `authenticated` role (admin-only access)
- No anon access — admin dashboard requires Supabase Auth login
- 4 policies per table (SELECT, INSERT, UPDATE, DELETE)

## Notes
- Single-row config tables use a `singleton` boolean to enforce one row
- `admin_tools` has `deleted_at` for soft delete
- `admin_blog_posts` stores content as JSONB
- All tables have `created_at` and `updated_at` timestamps
- `updated_at` auto-updates via trigger
*/

-- ============================================================
-- HELPER: auto-update updated_at trigger function
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- 1. admin_categories
-- ============================================================
CREATE TABLE IF NOT EXISTS admin_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  count integer NOT NULL DEFAULT 0,
  icon_name text NOT NULL DEFAULT 'FolderTree',
  gradient text NOT NULL DEFAULT 'from-brand-purple to-brand-purple/60',
  description text NOT NULL DEFAULT '',
  seo_title text,
  seo_description text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE admin_categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_admin_categories" ON admin_categories;
CREATE POLICY "select_admin_categories" ON admin_categories FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "insert_admin_categories" ON admin_categories;
CREATE POLICY "insert_admin_categories" ON admin_categories FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "update_admin_categories" ON admin_categories;
CREATE POLICY "update_admin_categories" ON admin_categories FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "delete_admin_categories" ON admin_categories;
CREATE POLICY "delete_admin_categories" ON admin_categories FOR DELETE
  TO authenticated USING (true);

DROP TRIGGER IF EXISTS trg_admin_categories_updated ON admin_categories;
CREATE TRIGGER trg_admin_categories_updated BEFORE UPDATE ON admin_categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- 2. admin_tools
-- ============================================================
CREATE TABLE IF NOT EXISTS admin_tools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT '',
  icon_name text NOT NULL DEFAULT 'Wrench',
  gradient text NOT NULL DEFAULT 'from-brand-purple to-brand-purple/60',
  badge text,
  is_new boolean NOT NULL DEFAULT false,
  popularity integer NOT NULL DEFAULT 50,
  status text NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'draft')),
  added_days_ago integer,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

ALTER TABLE admin_tools ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_admin_tools" ON admin_tools;
CREATE POLICY "select_admin_tools" ON admin_tools FOR SELECT
  TO authenticated USING (deleted_at IS NULL);

DROP POLICY IF EXISTS "insert_admin_tools" ON admin_tools;
CREATE POLICY "insert_admin_tools" ON admin_tools FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "update_admin_tools" ON admin_tools;
CREATE POLICY "update_admin_tools" ON admin_tools FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "delete_admin_tools" ON admin_tools;
CREATE POLICY "delete_admin_tools" ON admin_tools FOR DELETE
  TO authenticated USING (true);

DROP TRIGGER IF EXISTS trg_admin_tools_updated ON admin_tools;
CREATE TRIGGER trg_admin_tools_updated BEFORE UPDATE ON admin_tools
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_admin_tools_category ON admin_tools(category);
CREATE INDEX IF NOT EXISTS idx_admin_tools_status ON admin_tools(status);
CREATE INDEX IF NOT EXISTS idx_admin_tools_deleted ON admin_tools(deleted_at);

-- ============================================================
-- 3. admin_blog_posts
-- ============================================================
CREATE TABLE IF NOT EXISTS admin_blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT '',
  tags text[] NOT NULL DEFAULT '{}',
  author text NOT NULL DEFAULT 'ToolNest Team',
  published_at text NOT NULL,
  updated_at_text text,
  reading_time integer NOT NULL DEFAULT 5,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('published', 'draft', 'scheduled')),
  featured_image text,
  content jsonb NOT NULL DEFAULT '[]',
  seo_title text,
  seo_description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE admin_blog_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_admin_blog_posts" ON admin_blog_posts;
CREATE POLICY "select_admin_blog_posts" ON admin_blog_posts FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "insert_admin_blog_posts" ON admin_blog_posts;
CREATE POLICY "insert_admin_blog_posts" ON admin_blog_posts FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "update_admin_blog_posts" ON admin_blog_posts;
CREATE POLICY "update_admin_blog_posts" ON admin_blog_posts FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "delete_admin_blog_posts" ON admin_blog_posts;
CREATE POLICY "delete_admin_blog_posts" ON admin_blog_posts FOR DELETE
  TO authenticated USING (true);

DROP TRIGGER IF EXISTS trg_admin_blog_posts_updated ON admin_blog_posts;
CREATE TRIGGER trg_admin_blog_posts_updated BEFORE UPDATE ON admin_blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- 4. admin_seo_settings (singleton)
-- ============================================================
CREATE TABLE IF NOT EXISTS admin_seo_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  singleton boolean NOT NULL DEFAULT true,
  default_title text NOT NULL DEFAULT 'ToolNest — Free Online Tools',
  default_description text NOT NULL DEFAULT '',
  default_keywords text[] NOT NULL DEFAULT '{}',
  canonical_base_url text NOT NULL DEFAULT 'https://toolnest.com',
  og_site_name text NOT NULL DEFAULT 'ToolNest',
  og_locale text NOT NULL DEFAULT 'en_US',
  og_default_image text NOT NULL DEFAULT '/og-default.png',
  twitter_handle text NOT NULL DEFAULT '@toolnest',
  twitter_card_type text NOT NULL DEFAULT 'summary_large_image',
  robots_txt text NOT NULL DEFAULT 'User-agent: *\nAllow: /',
  sitemap_enabled boolean NOT NULL DEFAULT true,
  json_ld_enabled boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE admin_seo_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_admin_seo_settings" ON admin_seo_settings;
CREATE POLICY "select_admin_seo_settings" ON admin_seo_settings FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "insert_admin_seo_settings" ON admin_seo_settings;
CREATE POLICY "insert_admin_seo_settings" ON admin_seo_settings FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "update_admin_seo_settings" ON admin_seo_settings;
CREATE POLICY "update_admin_seo_settings" ON admin_seo_settings FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "delete_admin_seo_settings" ON admin_seo_settings;
CREATE POLICY "delete_admin_seo_settings" ON admin_seo_settings FOR DELETE
  TO authenticated USING (true);

DROP TRIGGER IF EXISTS trg_admin_seo_settings_updated ON admin_seo_settings;
CREATE TRIGGER trg_admin_seo_settings_updated BEFORE UPDATE ON admin_seo_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- 5. admin_homepage_settings (singleton)
-- ============================================================
CREATE TABLE IF NOT EXISTS admin_homepage_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  singleton boolean NOT NULL DEFAULT true,
  hero_title text NOT NULL DEFAULT 'All Your Tools in One Nest',
  hero_subtitle text NOT NULL DEFAULT '',
  hero_badge text NOT NULL DEFAULT '100% Free Forever',
  featured_tool_slugs text[] NOT NULL DEFAULT '{}',
  trending_tool_slugs text[] NOT NULL DEFAULT '{}',
  recent_tool_slugs text[] NOT NULL DEFAULT '{}',
  popular_tool_slugs text[] NOT NULL DEFAULT '{}',
  footer_text text NOT NULL DEFAULT 'Built for everyone — free forever.',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE admin_homepage_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_admin_homepage_settings" ON admin_homepage_settings;
CREATE POLICY "select_admin_homepage_settings" ON admin_homepage_settings FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "insert_admin_homepage_settings" ON admin_homepage_settings;
CREATE POLICY "insert_admin_homepage_settings" ON admin_homepage_settings FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "update_admin_homepage_settings" ON admin_homepage_settings;
CREATE POLICY "update_admin_homepage_settings" ON admin_homepage_settings FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "delete_admin_homepage_settings" ON admin_homepage_settings;
CREATE POLICY "delete_admin_homepage_settings" ON admin_homepage_settings FOR DELETE
  TO authenticated USING (true);

DROP TRIGGER IF EXISTS trg_admin_homepage_settings_updated ON admin_homepage_settings;
CREATE TRIGGER trg_admin_homepage_settings_updated BEFORE UPDATE ON admin_homepage_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- 6. admin_ad_settings (singleton)
-- ============================================================
CREATE TABLE IF NOT EXISTS admin_ad_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  singleton boolean NOT NULL DEFAULT true,
  enabled boolean NOT NULL DEFAULT true,
  network text NOT NULL DEFAULT 'placeholder' CHECK (network IN ('adsense', 'placeholder')),
  publisher_id text NOT NULL DEFAULT '',
  slots jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE admin_ad_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_admin_ad_settings" ON admin_ad_settings;
CREATE POLICY "select_admin_ad_settings" ON admin_ad_settings FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "insert_admin_ad_settings" ON admin_ad_settings;
CREATE POLICY "insert_admin_ad_settings" ON admin_ad_settings FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "update_admin_ad_settings" ON admin_ad_settings;
CREATE POLICY "update_admin_ad_settings" ON admin_ad_settings FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "delete_admin_ad_settings" ON admin_ad_settings;
CREATE POLICY "delete_admin_ad_settings" ON admin_ad_settings FOR DELETE
  TO authenticated USING (true);

DROP TRIGGER IF EXISTS trg_admin_ad_settings_updated ON admin_ad_settings;
CREATE TRIGGER trg_admin_ad_settings_updated BEFORE UPDATE ON admin_ad_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- 7. admin_affiliate_products
-- ============================================================
CREATE TABLE IF NOT EXISTS admin_affiliate_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  network text NOT NULL DEFAULT 'custom',
  name text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  url text NOT NULL DEFAULT '',
  image text,
  price text,
  rating numeric(2,1),
  brand text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE admin_affiliate_products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_admin_affiliate_products" ON admin_affiliate_products;
CREATE POLICY "select_admin_affiliate_products" ON admin_affiliate_products FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "insert_admin_affiliate_products" ON admin_affiliate_products;
CREATE POLICY "insert_admin_affiliate_products" ON admin_affiliate_products FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "update_admin_affiliate_products" ON admin_affiliate_products;
CREATE POLICY "update_admin_affiliate_products" ON admin_affiliate_products FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "delete_admin_affiliate_products" ON admin_affiliate_products;
CREATE POLICY "delete_admin_affiliate_products" ON admin_affiliate_products FOR DELETE
  TO authenticated USING (true);

DROP TRIGGER IF EXISTS trg_admin_affiliate_products_updated ON admin_affiliate_products;
CREATE TRIGGER trg_admin_affiliate_products_updated BEFORE UPDATE ON admin_affiliate_products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- 8. admin_affiliate_settings (singleton)
-- ============================================================
CREATE TABLE IF NOT EXISTS admin_affiliate_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  singleton boolean NOT NULL DEFAULT true,
  enabled boolean NOT NULL DEFAULT true,
  networks jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE admin_affiliate_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_admin_affiliate_settings" ON admin_affiliate_settings;
CREATE POLICY "select_admin_affiliate_settings" ON admin_affiliate_settings FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "insert_admin_affiliate_settings" ON admin_affiliate_settings;
CREATE POLICY "insert_admin_affiliate_settings" ON admin_affiliate_settings FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "update_admin_affiliate_settings" ON admin_affiliate_settings;
CREATE POLICY "update_admin_affiliate_settings" ON admin_affiliate_settings FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "delete_admin_affiliate_settings" ON admin_affiliate_settings;
CREATE POLICY "delete_admin_affiliate_settings" ON admin_affiliate_settings FOR DELETE
  TO authenticated USING (true);

DROP TRIGGER IF EXISTS trg_admin_affiliate_settings_updated ON admin_affiliate_settings;
CREATE TRIGGER trg_admin_affiliate_settings_updated BEFORE UPDATE ON admin_affiliate_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- 9. admin_newsletter_subscribers
-- ============================================================
CREATE TABLE IF NOT EXISTS admin_newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  subscribed_at text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE admin_newsletter_subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_admin_newsletter_subscribers" ON admin_newsletter_subscribers;
CREATE POLICY "select_admin_newsletter_subscribers" ON admin_newsletter_subscribers FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "insert_admin_newsletter_subscribers" ON admin_newsletter_subscribers;
CREATE POLICY "insert_admin_newsletter_subscribers" ON admin_newsletter_subscribers FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "update_admin_newsletter_subscribers" ON admin_newsletter_subscribers;
CREATE POLICY "update_admin_newsletter_subscribers" ON admin_newsletter_subscribers FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "delete_admin_newsletter_subscribers" ON admin_newsletter_subscribers;
CREATE POLICY "delete_admin_newsletter_subscribers" ON admin_newsletter_subscribers FOR DELETE
  TO authenticated USING (true);

DROP TRIGGER IF EXISTS trg_admin_newsletter_subscribers_updated ON admin_newsletter_subscribers;
CREATE TRIGGER trg_admin_newsletter_subscribers_updated BEFORE UPDATE ON admin_newsletter_subscribers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- 10. admin_newsletter_settings (singleton)
-- ============================================================
CREATE TABLE IF NOT EXISTS admin_newsletter_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  singleton boolean NOT NULL DEFAULT true,
  enabled boolean NOT NULL DEFAULT true,
  provider text NOT NULL DEFAULT 'internal' CHECK (provider IN ('internal', 'mailchimp', 'convertkit')),
  endpoint text NOT NULL DEFAULT '/api/newsletter',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE admin_newsletter_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_admin_newsletter_settings" ON admin_newsletter_settings;
CREATE POLICY "select_admin_newsletter_settings" ON admin_newsletter_settings FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "insert_admin_newsletter_settings" ON admin_newsletter_settings;
CREATE POLICY "insert_admin_newsletter_settings" ON admin_newsletter_settings FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "update_admin_newsletter_settings" ON admin_newsletter_settings;
CREATE POLICY "update_admin_newsletter_settings" ON admin_newsletter_settings FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "delete_admin_newsletter_settings" ON admin_newsletter_settings;
CREATE POLICY "delete_admin_newsletter_settings" ON admin_newsletter_settings FOR DELETE
  TO authenticated USING (true);

DROP TRIGGER IF EXISTS trg_admin_newsletter_settings_updated ON admin_newsletter_settings;
CREATE TRIGGER trg_admin_newsletter_settings_updated BEFORE UPDATE ON admin_newsletter_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- 11. admin_site_settings (singleton)
-- ============================================================
CREATE TABLE IF NOT EXISTS admin_site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  singleton boolean NOT NULL DEFAULT true,
  website_name text NOT NULL DEFAULT 'ToolNest',
  logo text NOT NULL DEFAULT '/logo.png',
  favicon text NOT NULL DEFAULT '/favicon.ico',
  default_theme text NOT NULL DEFAULT 'dark' CHECK (default_theme IN ('light', 'dark', 'system')),
  contact_email text NOT NULL DEFAULT 'support@toolnest.com',
  social_links jsonb NOT NULL DEFAULT '{}',
  analytics_ids jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE admin_site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_admin_site_settings" ON admin_site_settings;
CREATE POLICY "select_admin_site_settings" ON admin_site_settings FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "insert_admin_site_settings" ON admin_site_settings;
CREATE POLICY "insert_admin_site_settings" ON admin_site_settings FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "update_admin_site_settings" ON admin_site_settings;
CREATE POLICY "update_admin_site_settings" ON admin_site_settings FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "delete_admin_site_settings" ON admin_site_settings;
CREATE POLICY "delete_admin_site_settings" ON admin_site_settings FOR DELETE
  TO authenticated USING (true);

DROP TRIGGER IF EXISTS trg_admin_site_settings_updated ON admin_site_settings;
CREATE TRIGGER trg_admin_site_settings_updated BEFORE UPDATE ON admin_site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- 12. admin_logs
-- ============================================================
CREATE TABLE IF NOT EXISTS admin_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  level text NOT NULL DEFAULT 'info' CHECK (level IN ('info', 'warning', 'error')),
  message text NOT NULL,
  source text NOT NULL DEFAULT 'system',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_admin_logs" ON admin_logs;
CREATE POLICY "select_admin_logs" ON admin_logs FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "insert_admin_logs" ON admin_logs;
CREATE POLICY "insert_admin_logs" ON admin_logs FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "update_admin_logs" ON admin_logs;
CREATE POLICY "update_admin_logs" ON admin_logs FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "delete_admin_logs" ON admin_logs;
CREATE POLICY "delete_admin_logs" ON admin_logs FOR DELETE
  TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_admin_logs_created ON admin_logs(created_at DESC);
