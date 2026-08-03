'use client';

import * as React from 'react';
import { Footer } from '@/components/footer';
import { supabase } from '@/lib/supabase-client';
import type { Tool, Category } from '@/lib/data';

export function FooterWrapper() {
  const [data, setData] = React.useState<{
    categories: Category[];
    popularTools: Tool[];
    latestTools: Tool[];
    siteName?: string;
    footerText?: string;
    socialLinks?: { twitter: string; github: string; linkedin: string; instagram: string };
  } | null>(null);

  React.useEffect(() => {
    async function load() {
      try {
        const [catRes, toolRes, siteRes, homeRes] = await Promise.all([
          supabase.from('admin_categories').select('slug, name, count, icon_name, gradient, description').order('sort_order'),
          supabase.from('admin_tools').select('slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago').eq('status', 'published').is('deleted_at', null),
          supabase.from('admin_site_settings').select('website_name, social_links').eq('singleton', true).maybeSingle(),
          supabase.from('admin_homepage_settings').select('popular_tool_slugs, recent_tool_slugs, footer_text').eq('singleton', true).maybeSingle(),
        ]);

        const categories = (catRes.data ?? []) as unknown as Category[];
        const tools = (toolRes.data ?? []) as unknown as Tool[];
        const site = siteRes.data as { website_name?: string; social_links?: { twitter: string; github: string; linkedin: string; instagram: string } } | null;
        const home = homeRes.data as { popular_tool_slugs?: string[]; recent_tool_slugs?: string[]; footer_text?: string } | null;

        const popularSlugs = home?.popular_tool_slugs ?? [];
        const recentSlugs = home?.recent_tool_slugs ?? [];

        const popularTools = popularSlugs.map((s) => tools.find((t) => t.slug === s)).filter(Boolean) as Tool[];
        const latestTools = recentSlugs.map((s) => tools.find((t) => t.slug === s)).filter(Boolean) as Tool[];

        setData({
          categories,
          popularTools,
          latestTools,
          siteName: site?.website_name,
          footerText: home?.footer_text,
          socialLinks: site?.social_links,
        });
      } catch {
        setData({ categories: [], popularTools: [], latestTools: [] });
      }
    }
    load();
  }, []);

  if (!data) return null;

  return (
    <Footer
      categories={data.categories}
      popularTools={data.popularTools}
      latestTools={data.latestTools}
      siteName={data.siteName}
      footerText={data.footerText}
      socialLinks={data.socialLinks}
    />
  );
}
