import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, HeartPulse } from 'lucide-react';

import { BmiCalculator } from '@/components/calc/age-bmi-percent';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'BMI Calculator — Calculate Your Body Mass Index Free | ToolNest',
  description:
    'Calculate your Body Mass Index (BMI) instantly with metric or imperial units. See your BMI category and healthy weight range — free, no sign-up.',
};

const relatedTools = getRelatedTools('bmi-calculator', 3).filter((t) =>
  ['age-calculator', 'percentage-calculator', 'tip-calculator'].includes(t.slug)
);

export default function BmiCalculatorPage() {
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
            <span className="text-foreground">BMI Calculator</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-red-400 to-pink-600 text-white shadow-lg shadow-brand-purple/25">
              <HeartPulse className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">BMI Calculator</h1>
              <p className="mt-1 text-muted-foreground">Calculate your Body Mass Index and see your weight category — free, instant, no sign-up.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <BmiCalculator />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="A BMI Calculator measures your Body Mass Index — a ratio of weight to height used to screen for weight categories that may lead to health problems. ToolNest's BMI Calculator supports both metric (kg/cm) and imperial (lb/in) units, instantly classifies your result as underweight, normal, overweight, or obese, and shows your healthy weight range."
          howTo={[
            'Choose your preferred unit system: metric (kg, cm) or imperial (lb, in).',
            'Enter your weight and height in the selected units.',
            'Your BMI value and category appear instantly.',
            'Review the healthy weight range shown for your height.',
            'Adjust your inputs to explore different weight scenarios.',
          ]}
          benefits={[
            { title: 'Metric & imperial support', description: 'Switch between kilograms/centimeters and pounds/inches without re-entering your values.' },
            { title: 'Instant categorization', description: 'See immediately whether your BMI falls in the underweight, normal, overweight, or obese range.' },
            { title: 'Healthy weight range', description: 'Discover the weight range considered healthy for your specific height.' },
            { title: 'Educational guidance', description: 'Understand what your BMI number means and when to consult a healthcare professional.' },
          ]}
          faqs={[
            { q: 'What is a healthy BMI range?', a: 'A BMI between 18.5 and 24.9 is generally considered normal for adults. Below 18.5 is underweight, 25–29.9 is overweight, and 30 or above is classified as obese.' },
            { q: 'Is BMI accurate for everyone?', a: 'BMI is a useful screening tool but does not account for muscle mass, bone density, or body composition. Athletes and older adults may get results that do not reflect their true health status.' },
            { q: 'Does the calculator support imperial units?', a: 'Yes. You can enter your weight in pounds and height in inches, and the calculator converts internally to produce your BMI.' },
            { q: 'What BMI should I aim for?', a: 'For most adults, a BMI between 18.5 and 24.9 is associated with the lowest health risks. Always consult a doctor for personalized advice based on your overall health.' },
            { q: 'Is BMI the same as body fat percentage?', a: 'No. BMI estimates weight status using height and weight only, while body fat percentage directly measures fat mass. They are related but measure different things.' },
            { q: 'Can children use this BMI calculator?', a: 'This calculator uses adult BMI thresholds. Children and teens require age- and sex-specific BMI percentile charts, so consult a pediatrician for younger users.' },
          ]}
        />
      </section>

      <RelatedTools slug="bmi-calculator" tools={relatedTools} />
    </>
  );
}
