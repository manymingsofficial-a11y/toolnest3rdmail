import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Thermometer } from 'lucide-react';

import { TemperatureConverter } from '@/components/calc/converters';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Temperature Converter — Convert Celsius, Fahrenheit, Kelvin Free | ToolNest',
  description:
    'Convert between Celsius, Fahrenheit, Kelvin, and more temperature scales. Free online temperature converter — instant results, no sign-up.',
};

const relatedTools = getRelatedTools('temperature-converter', 3).filter((t) =>
  ['length-converter', 'weight-converter', 'data-storage-converter'].includes(t.slug)
);

export default function TemperatureConverterPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <div className="absolute left-1/2 top-0 h-[280px] w-[480px] -translate-x-1/2 rounded-full bg-red-400/20 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tools" className="transition-colors hover:text-foreground">Tools</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Temperature Converter</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-red-400 to-orange-600 text-white shadow-lg shadow-brand-purple/25">
              <Thermometer className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Temperature Converter</h1>
              <p className="mt-1 text-muted-foreground">Convert between Celsius, Fahrenheit, Kelvin, and more — free, instant, no sign-up.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <TemperatureConverter />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="A Temperature Converter translates values between the major temperature scales — Celsius, Fahrenheit, Kelvin, and Rankine. ToolNest's Temperature Converter lets you enter a reading in one scale and instantly see the equivalent in all others, using the precise formulas that define each scale relationship."
          howTo={[
            'Enter the temperature value you want to convert.',
            'Select the scale you are converting from (Celsius, Fahrenheit, Kelvin, etc.).',
            'Choose the target temperature scale.',
            'The converted temperature appears instantly.',
            'Switch scales at any time to compare across all units.',
          ]}
          benefits={[
            { title: 'All major scales', description: 'Convert between Celsius, Fahrenheit, Kelvin, and Rankine without memorizing conversion formulas.' },
            { title: 'Instant results', description: 'Temperatures update in real time as you type or change the selected scales.' },
            { title: 'Scientific accuracy', description: 'Conversions use the exact defining formulas, including absolute zero handling for Kelvin.' },
            { title: 'Bidirectional conversion', description: 'Swap source and target scales with one click to reverse the conversion instantly.' },
          ]}
          faqs={[
            { q: 'How do I convert Celsius to Fahrenheit?', a: 'Multiply the Celsius value by 9/5 and add 32. For example, 25°C = (25 × 9/5) + 32 = 77°F. The converter applies this formula automatically.' },
            { q: 'How do I convert Fahrenheit to Celsius?', a: 'Subtract 32 from the Fahrenheit value, then multiply by 5/9. For example, 98.6°F = (98.6 − 32) × 5/9 = 37°C, normal body temperature.' },
            { q: 'What is Kelvin and when is it used?', a: 'Kelvin is the SI unit of temperature starting at absolute zero (0 K = −273.15°C). It is used in scientific contexts where absolute temperature matters, such as physics and chemistry.' },
            { q: 'Can temperature go below zero in Kelvin?', a: 'No. Zero Kelvin is absolute zero — the theoretical lowest possible temperature. The converter will not produce negative Kelvin values from valid inputs.' },
            { q: 'What is the Rankine scale?', a: 'Rankine is an absolute temperature scale like Kelvin but uses Fahrenheit-sized degrees. Zero Rankine equals absolute zero, and 1°R = 1°F. It is mainly used in some engineering fields.' },
            { q: 'Are the conversions accurate for cooking and weather?', a: 'Yes. The same formulas apply whether you are converting oven temperatures, weather forecasts, or scientific measurements — the conversion is always mathematically exact.' },
          ]}
        />
      </section>

      <RelatedTools slug="temperature-converter" tools={relatedTools} />
    </>
  );
}
