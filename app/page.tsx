import { Hero } from '@/components/sections/hero';
import { StatsBanner } from '@/components/sections/stats-banner';
import { Categories } from '@/components/sections/categories';
import { FeaturedTools } from '@/components/sections/featured-tools';
import { WhyChooseUs } from '@/components/sections/why-choose-us';
import { LatestTools } from '@/components/sections/latest-tools';
import { FAQ } from '@/components/sections/faq';
import { TrendingTools } from '@/components/sections/trending-tools';
import { BlogTeaser } from '@/components/sections/blog-teaser';
import { AdPlaceholder } from '@/components/ads/ad-placeholder';
import { Newsletter } from '@/components/ads/newsletter';
import { generateFaqJsonLd } from '@/lib/seo';
import { faqs } from '@/lib/faqs';
import { fetchTools, fetchCategories, fetchHomepageSettings, fetchSiteSettings, fetchBlogPosts } from '@/lib/public-data';
import type { Tool, Category } from '@/lib/data';

export default async function Home() {
  const faqJsonLd = generateFaqJsonLd(faqs);

  const [tools, categories, homepageSettings, siteSettings, blogPosts] = await Promise.all([
    fetchTools(),
    fetchCategories(),
    fetchHomepageSettings(),
    fetchSiteSettings(),
    fetchBlogPosts(),
  ]);

  const getToolsBySlugs = (slugs: string[]): Tool[] =>
    slugs.map((slug) => tools.find((t) => t.slug === slug)).filter(Boolean) as Tool[];

  const featuredTools = getToolsBySlugs(homepageSettings?.featuredToolSlugs ?? []);
  const trendingTools = getToolsBySlugs(homepageSettings?.trendingToolSlugs ?? []);
  const recentTools = getToolsBySlugs(homepageSettings?.recentToolSlugs ?? []);
  const popularTools = getToolsBySlugs(homepageSettings?.popularToolSlugs ?? []);

  const siteName = siteSettings?.websiteName ?? 'ToolNest';

  const newestTools = tools.filter((t) => t.isNew).slice(0, 8);
  const latestTools = newestTools.length > 0 ? newestTools : tools.slice(0, 8);
  const latestBlogPosts = blogPosts.slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Hero
        toolCount={tools.length}
        categoryCount={categories.length}
        heroTitle={homepageSettings?.heroTitle}
        heroSubtitle={homepageSettings?.heroSubtitle}
        heroBadge={homepageSettings?.heroBadge}
        siteName={siteName}
      />
      <StatsBanner toolCount={tools.length} categoryCount={categories.length} />
      <TrendingTools
        trendingTools={trendingTools}
        newestTools={latestTools}
        allTools={tools}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AdPlaceholder slot="homepage-top" className="my-8" />
      </div>

      <Categories categories={categories} />
      <FeaturedTools categories={categories} featuredTools={featuredTools} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AdPlaceholder slot="homepage-middle" className="my-8" />
      </div>

      <WhyChooseUs />
      <LatestTools latestTools={latestTools} totalTools={tools.length} />

      <BlogTeaser posts={latestBlogPosts} />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Newsletter className="my-16" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AdPlaceholder slot="homepage-bottom" className="my-8" />
      </div>

      <FAQ />
    </>
  );
}
