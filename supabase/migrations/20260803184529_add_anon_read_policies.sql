/*
# Add anon SELECT policies for public website reads

## Overview
The public website needs to read tools, categories, blog posts, and all
singleton settings without authentication. These policies grant SELECT
to the anon role so the server-side fetchers can query the database.

## Tables affected
- admin_tools (published only, not soft-deleted)
- admin_categories
- admin_blog_posts (published only)
- admin_seo_settings
- admin_homepage_settings
- admin_ad_settings
- admin_affiliate_settings
- admin_newsletter_settings
- admin_site_settings
*/

CREATE POLICY "anon_select_tools" ON admin_tools FOR SELECT
  TO anon USING (status = 'published' AND deleted_at IS NULL);

CREATE POLICY "anon_select_categories" ON admin_categories FOR SELECT
  TO anon USING (true);

CREATE POLICY "anon_select_blog_posts" ON admin_blog_posts FOR SELECT
  TO anon USING (status = 'published');

CREATE POLICY "anon_select_seo_settings" ON admin_seo_settings FOR SELECT
  TO anon USING (true);

CREATE POLICY "anon_select_homepage_settings" ON admin_homepage_settings FOR SELECT
  TO anon USING (true);

CREATE POLICY "anon_select_ad_settings" ON admin_ad_settings FOR SELECT
  TO anon USING (true);

CREATE POLICY "anon_select_affiliate_settings" ON admin_affiliate_settings FOR SELECT
  TO anon USING (true);

CREATE POLICY "anon_select_newsletter_settings" ON admin_newsletter_settings FOR SELECT
  TO anon USING (true);

CREATE POLICY "anon_select_site_settings" ON admin_site_settings FOR SELECT
  TO anon USING (true);
