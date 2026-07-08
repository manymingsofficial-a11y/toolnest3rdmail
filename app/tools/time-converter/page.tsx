import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Clock } from 'lucide-react';

import { TimeConverter } from '@/components/calc/converters';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Time Converter — Convert Seconds, Minutes, Hours & Days Free | ToolNest',
  description:
    'Convert between time units — seconds, minutes, hours, days, weeks, months, and years. Free online time duration converter, no sign-up.',
};

const relatedTools = getRelatedTools('time-converter', 3).filter((t) =>
  ['length-converter', 'weight-converter', 'data-storage-converter'].includes(t.slug)
);

export default function TimeConverterPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <div className="absolute left-1/2 top-0 h-[280px] w-[480px] -translate-x-1/2 rounded-full bg-indigo-400/20 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tools" className="transition-colors hover:text-foreground">Tools</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Time Converter</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-indigo-400 to-violet-600 text-white shadow-lg shadow-brand-purple/25">
              <Clock className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Time Converter</h1>
              <p className="mt-1 text-muted-foreground">Convert between seconds, minutes, hours, days, and more — free, instant, no sign-up.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <TimeConverter />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="A Time Converter translates durations between time units — seconds, minutes, hours, days, weeks, months, and years. ToolNest's Time Converter lets you enter a duration in one unit and instantly see it expressed in every other supported unit, useful for scheduling, project planning, and scientific calculations."
          howTo={[
            'Enter the time value you want to convert.',
            'Select the source unit (seconds, minutes, hours, days, etc.).',
            'Choose the target unit you want to convert to.',
            'The converted duration appears instantly.',
            'Swap units to compare the same duration across multiple time scales.',
          ]}
          benefits={[
            { title: 'All common time units', description: 'Convert between seconds, minutes, hours, days, weeks, months, and years in a single tool.' },
            { title: 'Instant conversion', description: 'Results update in real time as you type or change the selected units.' },
            { title: 'One-click swap', description: 'Reverse the source and target units instantly to see the conversion in the opposite direction.' },
            { title: 'Precise calculations', description: 'Conversions use exact factors (60 seconds per minute, 24 hours per day) with appropriate decimal precision.' },
          ]}
          faqs={[
            { q: 'How many seconds are in a day?', a: 'There are 86,400 seconds in a standard 24-hour day (60 × 60 × 24). The converter calculates this automatically when you enter 1 day and select seconds.' },
            { q: 'How many hours are in a week?', a: 'There are 168 hours in a standard week (24 × 7). Enter 1 week and select hours to see this result instantly.' },
            { q: 'How are months and years handled in conversion?', a: 'Months are treated as 30.44 days (the average month length over a year) and years as 365.25 days (accounting for leap years) to provide consistent average-based conversions.' },
            { q: 'Can I convert large durations like years to seconds?', a: 'Yes. Enter the number of years and select seconds as the target. One average year equals approximately 31,557,600 seconds, and the converter applies this precisely.' },
            { q: 'Does the converter account for leap years?', a: 'For average conversions, a year is treated as 365.25 days to account for leap years. For exact calendar calculations between specific dates, use the age calculator instead.' },
            { q: 'Can I convert milliseconds or microseconds?', a: 'The converter focuses on the most commonly used units from seconds to years. For sub-second precision, convert to seconds first and calculate smaller units manually if needed.' },
          ]}
        />
      </section>

      <RelatedTools slug="time-converter" tools={relatedTools} />
    </>
  );
}
