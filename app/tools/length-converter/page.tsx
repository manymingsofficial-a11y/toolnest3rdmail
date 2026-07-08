import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Ruler } from 'lucide-react';

import { LengthConverter } from '@/components/calc/converters';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Length Converter — Convert Meters, Feet, Inches & More Free | ToolNest',
  description:
    'Convert between metric and imperial length units — meters, kilometers, feet, inches, miles, yards, and more. Free online length converter, no sign-up.',
};

const relatedTools = getRelatedTools('length-converter', 3).filter((t) =>
  ['weight-converter', 'temperature-converter', 'data-storage-converter'].includes(t.slug)
);

export default function LengthConverterPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <div className="absolute left-1/2 top-0 h-[280px] w-[480px] -translate-x-1/2 rounded-full bg-sky-400/20 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tools" className="transition-colors hover:text-foreground">Tools</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Length Converter</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 text-white shadow-lg shadow-brand-purple/25">
              <Ruler className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Length Converter</h1>
              <p className="mt-1 text-muted-foreground">Convert between metric and imperial length units — free, instant, no sign-up.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <LengthConverter />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="A Length Converter translates measurements between metric and imperial distance units — such as meters, kilometers, feet, inches, miles, and yards. ToolNest's Length Converter lets you enter a value in one unit and instantly see it in every other supported unit, eliminating manual conversion formulas."
          howTo={[
            'Enter the length value you want to convert.',
            'Select the unit you are converting from.',
            'Choose the unit you want to convert to.',
            'The converted result appears instantly.',
            'Switch units at any time to compare across multiple scales.',
          ]}
          benefits={[
            { title: 'Metric and imperial', description: 'Convert between meters, kilometers, centimeters, millimeters, miles, yards, feet, and inches in one place.' },
            { title: 'Instant conversion', description: 'Results update in real time as you type — no calculate button or page refresh needed.' },
            { title: 'Bidirectional flexibility', description: 'Swap the source and target units with a single click to reverse the conversion direction.' },
            { title: 'Full precision', description: 'Conversions use exact conversion factors and display results with appropriate decimal precision.' },
          ]}
          faqs={[
            { q: 'How many feet are in a meter?', a: 'One meter equals approximately 3.28084 feet. The converter applies this factor precisely when converting between metric and imperial length units.' },
            { q: 'How do I convert kilometers to miles?', a: 'One kilometer equals approximately 0.621371 miles. Enter your kilometer value and select miles as the target unit to get the exact converted distance.' },
            { q: 'What is the difference between a yard and a meter?', a: 'A yard is 0.9144 meters, making a meter slightly longer than a yard. One yard equals exactly 3 feet or 36 inches.' },
            { q: 'Can I convert very small lengths like millimeters?', a: 'Yes. The converter supports millimeters and centimeters for small-scale measurements, as well as kilometers and miles for large distances.' },
            { q: 'Are the conversion factors accurate?', a: 'Yes. All conversions use internationally recognized standard factors, such as 1 inch = 2.54 centimeters exactly, as defined by international agreement.' },
            { q: 'Can I convert nautical miles?', a: 'The converter focuses on the most common metric and imperial units. If nautical miles are needed, convert to meters first (1 nautical mile = 1,852 meters) and proceed from there.' },
          ]}
        />
      </section>

      <RelatedTools slug="length-converter" tools={relatedTools} />
    </>
  );
}
