import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Cake } from 'lucide-react';

import { AgeCalculator } from '@/components/calc/age-bmi-percent';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Age Calculator — Calculate Your Exact Age in Years, Months & Days | ToolNest',
  description:
    'Calculate your exact age in years, months, weeks, days, hours, and minutes from your birth date. Free online age calculator — instant results, no sign-up.',
};

const relatedTools = getRelatedTools('age-calculator', 3).filter((t) =>
  ['bmi-calculator', 'percentage-calculator', 'scientific-calculator'].includes(t.slug)
);

export default function AgeCalculatorPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <div className="absolute left-1/2 top-0 h-[280px] w-[480px] -translate-x-1/2 rounded-full bg-pink-400/20 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tools" className="transition-colors hover:text-foreground">Tools</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Age Calculator</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-pink-400 to-rose-600 text-white shadow-lg shadow-brand-purple/25">
              <Cake className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Age Calculator</h1>
              <p className="mt-1 text-muted-foreground">Find your exact age in years, months, weeks, days, and more — free, instant, no sign-up.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <AgeCalculator />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="An Age Calculator computes the exact time elapsed between two dates — typically your birth date and today. ToolNest's Age Calculator breaks the result down into years, months, weeks, days, hours, and minutes, and also shows the time until your next birthday. It accounts for leap years and varying month lengths for precise results."
          howTo={[
            'Enter your date of birth in the input field.',
            'Optionally set a target date if you want to calculate age as of a specific day.',
            'The calculator instantly displays your age in years, months, and days.',
            'View additional breakdowns including weeks, days, hours, and minutes lived.',
            'See how much time remains until your next birthday.',
          ]}
          benefits={[
            { title: 'Precise to the day', description: 'Accounts for leap years and month-length differences so every count is calendar-accurate.' },
            { title: 'Multiple time units', description: 'Shows your age in years, months, weeks, days, hours, and minutes all at once.' },
            { title: 'Next birthday countdown', description: 'Instantly see how many days and months remain until your next birthday.' },
            { title: 'Custom target dates', description: 'Calculate the gap between any two dates, not just birth date to today.' },
          ]}
          faqs={[
            { q: 'How is exact age calculated?', a: 'The calculator finds the difference between your birth date and the target date, then breaks it into full years, remaining full months, and remaining days — correctly handling leap years and months of different lengths.' },
            { q: 'Does it account for leap years?', a: 'Yes. February 29 is handled properly, and leap years are included in the total day count so your age is always accurate.' },
            { q: 'Can I calculate age for a future date?', a: 'Yes. Set the target date to any future day and the calculator will show the age you will be on that date.' },
            { q: 'What is the difference between calendar age and total days?', a: 'Calendar age expresses the span in years, months, and days. Total days simply counts every day elapsed, which is useful for tracking milestones.' },
            { q: 'Is my birth date stored anywhere?', a: 'No. All calculations happen locally in your browser. Your date of birth is never sent to a server or stored.' },
            { q: 'Can I calculate the gap between any two dates?', a: 'Yes. Set the birth date and target date to any two dates to measure the exact duration between them.' },
          ]}
        />
      </section>

      <RelatedTools slug="age-calculator" tools={relatedTools} />
    </>
  );
}
