import { Hero } from '@/components/sections/hero';
import { StatsBanner } from '@/components/sections/stats-banner';
import { Categories } from '@/components/sections/categories';
import { FeaturedTools } from '@/components/sections/featured-tools';
import { WhyChooseUs } from '@/components/sections/why-choose-us';
import { LatestTools } from '@/components/sections/latest-tools';
import { FAQ } from '@/components/sections/faq';
import { TrendingTools } from '@/components/sections/trending-tools';
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
      <Categories />
      <FeaturedTools />
      <WhyChooseUs />
      <LatestTools />
      <FAQ />
    </>
  );
}
