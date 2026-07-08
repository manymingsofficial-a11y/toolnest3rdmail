import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Percent } from 'lucide-react';

import { PercentageCalculator } from '@/components/calc/age-bmi-percent';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Percentage Calculator — Calculate Percentages Online Free | ToolNest',
  description:
    'Calculate percentages, percentage change, increase or decrease, and what percent one number is of another. Free online percentage calculator — instant results.',
};

const relatedTools = getRelatedTools('percentage-calculator', 3).filter((t) =>
  ['age-calculator', 'bmi-calculator', 'discount-calculator'].includes(t.slug)
);

export default function PercentageCalculatorPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <div className="absolute left-1/2 top-0 h-[280px] w-[480px] -translate-x-1/2 rounded-full bg-blue-400/20 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tools" className="transition-colors hover:text-foreground">Tools</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Percentage Calculator</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-600 text-white shadow-lg shadow-brand-purple/25">
              <Percent className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Percentage Calculator</h1>
              <p className="mt-1 text-muted-foreground">Calculate percentages, changes, and ratios — free, instant, no sign-up.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <PercentageCalculator />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="A Percentage Calculator solves common percentage problems instantly — finding what percent one number is of another, calculating a percentage of a value, and determining percentage increase or decrease. ToolNest's Percentage Calculator handles all these scenarios so you do not have to remember the formulas."
          howTo={[
            'Choose the type of percentage calculation you need.',
            'Enter the values required for that calculation.',
            'The result updates instantly as you type.',
            'Switch between calculation modes to solve different percentage problems.',
            'Use the percentage change mode to compare two values over time.',
          ]}
          benefits={[
            { title: 'Multiple calculation modes', description: 'Solve percentage of a number, what percent is X of Y, and percentage increase or decrease — all in one tool.' },
            { title: 'Instant results', description: 'Every result updates in real time as you enter values, with no need to press calculate.' },
            { title: 'No formula memorization', description: 'The tool applies the correct percentage formula for each mode automatically.' },
            { title: 'Useful for everyday math', description: 'Perfect for discounts, tips, grades, statistics, and financial comparisons.' },
          ]}
          faqs={[
            { q: 'How do I calculate what percent one number is of another?', a: 'Divide the part by the whole and multiply by 100. For example, 25 out of 200 is (25 ÷ 200) × 100 = 12.5%.' },
            { q: 'How is percentage increase calculated?', a: 'Subtract the original value from the new value, divide by the original value, and multiply by 100. For example, going from 80 to 100 is ((100 − 80) ÷ 80) × 100 = 25% increase.' },
            { q: 'What is the difference between percentage change and percentage of?', a: 'Percentage of finds a portion of a value (e.g., 15% of 200). Percentage change measures how much a value grew or shrank between two points in time.' },
            { q: 'Can I calculate a discount using this tool?', a: 'Yes. Use the percentage-of mode to find the discount amount, or the percentage-change mode to see how much a price dropped.' },
            { q: 'Does it work with decimal values?', a: 'Yes. You can enter decimal numbers for any value and the result is calculated with full precision.' },
            { q: 'Can I calculate a reverse percentage?', a: 'Yes. If you know a final amount after a percentage was applied, you can work backward to find the original value using the appropriate mode.' },
          ]}
        />
      </section>

      <RelatedTools slug="percentage-calculator" tools={relatedTools} />
    </>
  );
}
