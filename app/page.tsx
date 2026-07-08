import { Hero } from '@/components/sections/hero';
import { StatsBanner } from '@/components/sections/stats-banner';
import { Categories } from '@/components/sections/categories';
import { FeaturedTools } from '@/components/sections/featured-tools';
import { MostPopularTools } from '@/components/sections/most-popular-tools';
import { WhyChooseUs } from '@/components/sections/why-choose-us';
import { LatestTools } from '@/components/sections/latest-tools';
import { FAQ } from '@/components/sections/faq';
import { RecentlyUsedTools, PopularToolsSection } from '@/components/sections/recently-used';

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBanner />
      <RecentlyUsedTools />
      <Categories />
      <FeaturedTools />
      <PopularToolsSection />
      <MostPopularTools />
      <WhyChooseUs />
      <LatestTools />
      <FAQ />
    </>
  );
}
