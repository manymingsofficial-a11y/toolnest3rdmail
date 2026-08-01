import { Hero } from '@/components/sections/hero';
import { StatsBanner } from '@/components/sections/stats-banner';
import { Categories } from '@/components/sections/categories';
import { FeaturedTools } from '@/components/sections/featured-tools';
import { WhyChooseUs } from '@/components/sections/why-choose-us';
import { LatestTools } from '@/components/sections/latest-tools';
import { FAQ } from '@/components/sections/faq';
import { TrendingTools } from '@/components/sections/trending-tools';
import { AdPlaceholder } from '@/components/ads/ad-placeholder';
import { Newsletter } from '@/components/ads/newsletter';
import { generateFaqJsonLd } from '@/lib/seo';
import { faqs } from '@/lib/faqs';

export default function Home() {
  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Hero />
      <StatsBanner />
      <TrendingTools />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AdPlaceholder slot="homepage-top" className="my-8" />
      </div>

      <Categories />
      <FeaturedTools />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AdPlaceholder slot="homepage-middle" className="my-8" />
      </div>

      <WhyChooseUs />
      <LatestTools />

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
