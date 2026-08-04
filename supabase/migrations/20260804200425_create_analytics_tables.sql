/*
# Enterprise Analytics Schema

## Tables
1. analytics_page_views — every page view with visitor session, path, type, referrer, device
2. analytics_search_events — search queries with result count
3. analytics_visitor_sessions — unique visitor sessions with device/browser/OS info

## Security
- RLS enabled on every table
- anon + authenticated can INSERT (tracking from browser)
- Only authenticated (admin) can SELECT
- No UPDATE or DELETE from anon

## Notes
- Reuses existing admin_click_events for ad/affiliate/newsletter click tracking
- visitor_id stored in localStorage on client, session_id per session
- page_type derived from path on server side
*/

-- ============================================================
-- 1. analytics_page_views
-- ============================================================
CREATE TABLE IF NOT EXISTS analytics_page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id text NOT NULL DEFAULT '',
  session_id text NOT NULL DEFAULT '',
  path text NOT NULL DEFAULT '',
  page_type text NOT NULL DEFAULT 'page' CHECK (page_type IN ('homepage', 'tool', 'category', 'blog', 'search', 'other', 'page')),
  tool_slug text NOT NULL DEFAULT '',
  category_slug text NOT NULL DEFAULT '',
  blog_slug text NOT NULL DEFAULT '',
  referrer text NOT NULL DEFAULT '',
  device_type text NOT NULL DEFAULT '',
  browser text NOT NULL DEFAULT '',
  os text NOT NULL DEFAULT '',
  country text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE analytics_page_views ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "insert_page_views_anon" ON analytics_page_views;
CREATE POLICY "insert_page_views_anon" ON analytics_page_views
  FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "select_page_views_authenticated" ON analytics_page_views;
CREATE POLICY "select_page_views_authenticated" ON analytics_page_views
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "delete_page_views_authenticated" ON analytics_page_views;
CREATE POLICY "delete_page_views_authenticated" ON analytics_page_views
  FOR DELETE TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_page_views_created ON analytics_page_views (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_type ON analytics_page_views (page_type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_tool ON analytics_page_views (tool_slug, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_category ON analytics_page_views (category_slug, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_visitor ON analytics_page_views (visitor_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_session ON analytics_page_views (session_id, created_at DESC);

-- ============================================================
-- 2. analytics_search_events
-- ============================================================
CREATE TABLE IF NOT EXISTS analytics_search_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id text NOT NULL DEFAULT '',
  session_id text NOT NULL DEFAULT '',
  query text NOT NULL DEFAULT '',
  result_count integer NOT NULL DEFAULT 0,
  source text NOT NULL DEFAULT 'page' CHECK (source IN ('page', 'command_palette')),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE analytics_search_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "insert_search_events_anon" ON analytics_search_events;
CREATE POLICY "insert_search_events_anon" ON analytics_search_events
  FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "select_search_events_authenticated" ON analytics_search_events;
CREATE POLICY "select_search_events_authenticated" ON analytics_search_events
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "delete_search_events_authenticated" ON analytics_search_events;
CREATE POLICY "delete_search_events_authenticated" ON analytics_search_events
  FOR DELETE TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_search_events_created ON analytics_search_events (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_search_events_query ON analytics_search_events (query, created_at DESC);

-- ============================================================
-- 3. analytics_visitor_sessions
-- ============================================================
CREATE TABLE IF NOT EXISTS analytics_visitor_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id text NOT NULL DEFAULT '',
  session_id text NOT NULL DEFAULT '',
  is_returning boolean NOT NULL DEFAULT false,
  device_type text NOT NULL DEFAULT '',
  browser text NOT NULL DEFAULT '',
  os text NOT NULL DEFAULT '',
  country text NOT NULL DEFAULT '',
  referrer text NOT NULL DEFAULT '',
  landing_page text NOT NULL DEFAULT '',
  exit_page text NOT NULL DEFAULT '',
  page_count integer NOT NULL DEFAULT 0,
  started_at timestamptz NOT NULL DEFAULT now(),
  last_activity timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE analytics_visitor_sessions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "insert_visitor_sessions_anon" ON analytics_visitor_sessions;
CREATE POLICY "insert_visitor_sessions_anon" ON analytics_visitor_sessions
  FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "select_visitor_sessions_authenticated" ON analytics_visitor_sessions;
CREATE POLICY "select_visitor_sessions_authenticated" ON analytics_visitor_sessions
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "delete_visitor_sessions_authenticated" ON analytics_visitor_sessions;
CREATE POLICY "delete_visitor_sessions_authenticated" ON analytics_visitor_sessions
  FOR DELETE TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_visitor_sessions_visitor ON analytics_visitor_sessions (visitor_id, started_at DESC);
CREATE INDEX IF NOT EXISTS idx_visitor_sessions_started ON analytics_visitor_sessions (started_at DESC);

-- ============================================================
-- 4. analytics_ad_impressions
-- ============================================================
CREATE TABLE IF NOT EXISTS analytics_ad_impressions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slot text NOT NULL DEFAULT '',
  visitor_id text NOT NULL DEFAULT '',
  session_id text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE analytics_ad_impressions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "insert_ad_impressions_anon" ON analytics_ad_impressions;
CREATE POLICY "insert_ad_impressions_anon" ON analytics_ad_impressions
  FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "select_ad_impressions_authenticated" ON analytics_ad_impressions;
CREATE POLICY "select_ad_impressions_authenticated" ON analytics_ad_impressions
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "delete_ad_impressions_authenticated" ON analytics_ad_impressions;
CREATE POLICY "delete_ad_impressions_authenticated" ON analytics_ad_impressions
  FOR DELETE TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_ad_impressions_slot ON analytics_ad_impressions (slot, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ad_impressions_created ON analytics_ad_impressions (created_at DESC);