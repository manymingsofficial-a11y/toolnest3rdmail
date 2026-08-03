import { Footer } from '@/components/footer';
import { fetchCategories, fetchTools, fetchSiteSettings, fetchHomepageSettings } from '@/lib/public-data';

export async function FooterWrapper() {
  const [categories, tools, siteSettings, homepageSettings] = await Promise.all([
    fetchCategories(),
    fetchTools(),
    fetchSiteSettings(),
    fetchHomepageSettings(),
  ]);

  const popularSlugs = homepageSettings?.popularToolSlugs ?? [];
  const recentSlugs = homepageSettings?.recentToolSlugs ?? [];

  const popularTools = popularSlugs
    .map((slug) => tools.find((t) => t.slug === slug))
    .filter(Boolean) as typeof tools;

  const latestTools = recentSlugs
    .map((slug) => tools.find((t) => t.slug === slug))
    .filter(Boolean) as typeof tools;

  return (
    <Footer
      categories={categories}
      popularTools={popularTools}
      latestTools={latestTools}
      siteName={siteSettings?.websiteName}
      footerText={homepageSettings?.footerText}
      socialLinks={siteSettings?.socialLinks}
    />
  );
}
