import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Scale } from 'lucide-react';

import { WeightConverter } from '@/components/calc/converters';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Weight Converter — Convert Kg, Lbs, Grams, Ounces Free | ToolNest',
  description:
    'Convert between metric and imperial weight units — kilograms, grams, pounds, ounces, tons, and more. Free online weight converter, no sign-up.',
};

const relatedTools = getRelatedTools('weight-converter', 3).filter((t) =>
  ['length-converter', 'temperature-converter', 'data-storage-converter'].includes(t.slug)
);

export default function WeightConverterPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <div className="absolute left-1/2 top-0 h-[280px] w-[480px] -translate-x-1/2 rounded-full bg-orange-400/20 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tools" className="transition-colors hover:text-foreground">Tools</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Weight Converter</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-orange-400 to-amber-600 text-white shadow-lg shadow-brand-purple/25">
              <Scale className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Weight Converter</h1>
              <p className="mt-1 text-muted-foreground">Convert between metric and imperial weight units — free, instant, no sign-up.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <WeightConverter />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="A Weight Converter translates mass and weight measurements between metric units (kilograms, grams, milligrams, metric tons) and imperial units (pounds, ounces, stones, US tons). ToolNest's Weight Converter instantly displays your value across all supported units so you can switch between systems without memorizing conversion factors."
          howTo={[
            'Enter the weight value you wish to convert.',
            'Select the source unit from the dropdown.',
            'Choose the target unit you want to convert to.',
            'The converted weight appears instantly.',
            'Swap units anytime to compare values across different scales.',
          ]}
          benefits={[
            { title: 'Metric and imperial', description: 'Convert between kilograms, grams, milligrams, metric tons, pounds, ounces, stones, and US tons seamlessly.' },
            { title: 'Instant results', description: 'Every conversion updates in real time as you change the value or selected units.' },
            { title: 'One-click swap', description: 'Reverse the conversion direction instantly by swapping source and target units.' },
            { title: 'Precise factors', description: 'All conversions use internationally standardized factors like 1 kg = 2.20462 pounds for accuracy.' },
          ]}
          faqs={[
            { q: 'How many pounds are in a kilogram?', a: 'One kilogram equals approximately 2.20462 pounds. The converter applies this factor precisely when moving between metric and imperial weight units.' },
            { q: 'How do I convert grams to ounces?', a: 'One gram equals approximately 0.035274 ounces. Enter your gram value and select ounces as the target unit to get the exact result.' },
            { q: 'What is a stone and how is it used?', a: 'A stone is an imperial unit equal to 14 pounds, commonly used in the UK and Ireland for body weight. The converter supports stones alongside pounds and kilograms.' },
            { q: 'Is a US ton the same as a metric ton?', a: 'No. A US ton (short ton) is 2,000 pounds, while a metric tonne is 1,000 kilograms (approximately 2,204.62 pounds). The converter distinguishes between them.' },
            { q: 'Can I convert very small weights like milligrams?', a: 'Yes. The converter supports milligrams for precise measurements like medication doses or nutritional values, as well as tons for heavy weights.' },
            { q: 'Are the weight conversions accurate for cooking?', a: 'Yes. The conversions use exact standard factors. For baking, note that some recipes specify weight by volume (cups) rather than mass — those require a different conversion approach.' },
          ]}
        />
      </section>

      <RelatedTools slug="weight-converter" tools={relatedTools} />
    </>
  );
}
