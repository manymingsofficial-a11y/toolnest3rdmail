-- ============================================================
-- RESTORE: Singleton config rows + RPC search_path fix
-- Safety: ON CONFLICT DO NOTHING — will not overwrite existing rows
-- No DELETE, no TRUNCATE, no ALTER to existing data tables
-- ============================================================

-- 1. admin_site_settings (singleton)
INSERT INTO admin_site_settings (singleton, website_name, logo, favicon, default_theme, contact_email, social_links, analytics_ids)
VALUES (true, 'ToolNest', '/logo.png', '/favicon.ico', 'dark', 'support@toolnest.com', '{}'::jsonb, '{}'::jsonb)
ON CONFLICT DO NOTHING;

-- 2. admin_homepage_settings (singleton)
INSERT INTO admin_homepage_settings (singleton, hero_title, hero_subtitle, hero_badge, featured_tool_slugs, trending_tool_slugs, recent_tool_slugs, popular_tool_slugs, footer_text)
VALUES (true, 'All Your Tools in One Nest', '', '100% Free Forever', '{}'::text[], '{}'::text[], '{}'::text[], '{}'::text[], 'Built for everyone — free forever.')
ON CONFLICT DO NOTHING;

-- 3. admin_seo_settings (singleton)
-- canonical_base_url set to https://freetoolnest.vercel.app per user instruction
INSERT INTO admin_seo_settings (singleton, default_title, default_description, default_keywords, canonical_base_url, og_site_name, og_locale, og_default_image, twitter_handle, twitter_card_type, robots_txt, sitemap_enabled, json_ld_enabled)
VALUES (true, 'ToolNest — Free Online Tools', '', '{}'::text[], 'https://freetoolnest.vercel.app', 'ToolNest', 'en_US', '/og-default.png', '@toolnest', 'summary_large_image', 'User-agent: *
Allow: /', true, true)
ON CONFLICT DO NOTHING;

-- 4. admin_ad_settings (singleton)
INSERT INTO admin_ad_settings (singleton, enabled, network, publisher_id, slots)
VALUES (true, true, 'placeholder', '', '{}'::jsonb)
ON CONFLICT DO NOTHING;

-- 5. admin_affiliate_settings (singleton)
INSERT INTO admin_affiliate_settings (singleton, enabled, networks)
VALUES (
  true, true,
  '{"amazon":{"enabled":true,"affiliateTag":""},"impact":{"enabled":false,"affiliateId":""},"cj":{"enabled":false,"publisherId":""},"digistore24":{"enabled":false,"affiliateId":""},"whop":{"enabled":false,"affiliateId":""},"custom":{"enabled":false,"affiliateId":""}}'::jsonb
)
ON CONFLICT DO NOTHING;

-- 6. admin_newsletter_settings (singleton)
INSERT INTO admin_newsletter_settings (singleton, enabled, provider, endpoint)
VALUES (true, true, 'internal', '/api/newsletter')
ON CONFLICT DO NOTHING;

-- ============================================================
-- 7. Fix analytics RPC function search_path (security)
-- Recreate both functions with SET search_path = '' to prevent
-- search path injection on SECURITY DEFINER functions.
-- ============================================================

CREATE OR REPLACE FUNCTION get_page_view_timeseries(start_date timestamptz, interval_unit text)
RETURNS TABLE (bucket text, count bigint) AS $$
BEGIN
  IF interval_unit = 'day' THEN
    RETURN QUERY
      SELECT date_trunc('day', created_at)::text AS bucket, count(*)::bigint
      FROM analytics_page_views
      WHERE created_at >= start_date
      GROUP BY 1 ORDER BY 1;
  ELSIF interval_unit = 'week' THEN
    RETURN QUERY
      SELECT date_trunc('week', created_at)::text AS bucket, count(*)::bigint
      FROM analytics_page_views
      WHERE created_at >= start_date
      GROUP BY 1 ORDER BY 1;
  ELSIF interval_unit = 'month' THEN
    RETURN QUERY
      SELECT date_trunc('month', created_at)::text AS bucket, count(*)::bigint
      FROM analytics_page_views
      WHERE created_at >= start_date
      GROUP BY 1 ORDER BY 1;
  ELSIF interval_unit = 'year' THEN
    RETURN QUERY
      SELECT date_trunc('year', created_at)::text AS bucket, count(*)::bigint
      FROM analytics_page_views
      WHERE created_at >= start_date
      GROUP BY 1 ORDER BY 1;
  END IF;
  RETURN;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

CREATE OR REPLACE FUNCTION get_search_timeseries(start_date timestamptz, interval_unit text)
RETURNS TABLE (bucket text, count bigint) AS $$
BEGIN
  IF interval_unit = 'day' THEN
    RETURN QUERY
      SELECT date_trunc('day', created_at)::text AS bucket, count(*)::bigint
      FROM analytics_search_events
      WHERE created_at >= start_date
      GROUP BY 1 ORDER BY 1;
  ELSIF interval_unit = 'week' THEN
    RETURN QUERY
      SELECT date_trunc('week', created_at)::text AS bucket, count(*)::bigint
      FROM analytics_search_events
      WHERE created_at >= start_date
      GROUP BY 1 ORDER BY 1;
  ELSIF interval_unit = 'month' THEN
    RETURN QUERY
      SELECT date_trunc('month', created_at)::text AS bucket, count(*)::bigint
      FROM analytics_search_events
      WHERE created_at >= start_date
      GROUP BY 1 ORDER BY 1;
  ELSIF interval_unit = 'year' THEN
    RETURN QUERY
      SELECT date_trunc('year', created_at)::text AS bucket, count(*)::bigint
      FROM analytics_search_events
      WHERE created_at >= start_date
      GROUP BY 1 ORDER BY 1;
  END IF;
  RETURN;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- Re-grant execute permissions (CREATE OR REPLACE may reset grants)
GRANT EXECUTE ON FUNCTION get_page_view_timeseries TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_search_timeseries TO anon, authenticated;