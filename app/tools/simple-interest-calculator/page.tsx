import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, TrendingUp } from 'lucide-react';

import { SimpleInterestCalculator } from '@/components/calc/interest';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Simple Interest Calculator — Calculate SI Online Free | ToolNest',
  description:
    'Calculate simple interest on any principal amount. Enter principal, rate, and time to see interest and total amount — free online SI calculator.',
};

const relatedTools = getRelatedTools('simple-interest-calculator', 3).filter((t) =>
  ['compound-interest-calculator', 'loan-emi-calculator', 'gst-calculator'].includes(t.slug)
);

export default function SimpleInterestCalculatorPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <div className="absolute left-1/2 top-0 h-[280px] w-[480px] -translate-x-1/2 rounded-full bg-lime-400/20 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tools" className="transition-colors hover:text-foreground">Tools</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Simple Interest Calculator</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-lime-400 to-green-600 text-white shadow-lg shadow-brand-purple/25">
              <TrendingUp className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Simple Interest Calculator</h1>
              <p className="mt-1 text-muted-foreground">Calculate simple interest and total amount from principal, rate, and time — free, instant, no sign-up.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <SimpleInterestCalculator />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="A Simple Interest Calculator computes the interest earned or paid on a principal amount using the straightforward simple interest formula, where interest is calculated only on the original principal. ToolNest's Simple Interest Calculator takes the principal, annual interest rate, and time period, then shows the interest amount and total amount payable."
          howTo={[
            'Enter the principal amount you are investing or borrowing.',
            'Input the annual interest rate as a percentage.',
            'Specify the time period in years, months, or days.',
            'View the simple interest and total amount instantly.',
            'Adjust any input to compare different rates or durations.',
          ]}
          benefits={[
            { title: 'Flexible time units', description: 'Enter the duration in years, months, or days — the calculator normalizes everything automatically.' },
            { title: 'Clear interest breakdown', description: 'See the interest earned and the total amount (principal plus interest) displayed separately.' },
            { title: 'Instant results', description: 'Every value updates in real time as you type, with no need to submit a form.' },
            { title: 'Useful for loans and deposits', description: 'Works for short-term loans, fixed deposits, bonds, and any scenario using simple interest.' },
          ]}
          faqs={[
            { q: 'What is the simple interest formula?', a: 'Simple Interest = (P × R × T) ÷ 100, where P is the principal, R is the annual interest rate, and T is the time in years. The total amount is the principal plus the interest.' },
            { q: 'How does simple interest differ from compound interest?', a: 'Simple interest is calculated only on the original principal for the entire period. Compound interest is calculated on the principal plus accumulated interest, meaning interest earns interest over time.' },
            { q: 'Can I enter the time in months or days?', a: 'Yes. The calculator converts months and days to their year equivalent (e.g., 6 months = 0.5 years) before applying the formula.' },
            { q: 'What types of loans use simple interest?', a: 'Many short-term loans, auto loans, and personal loans use simple interest. Some mortgages also use amortized simple interest calculations for their payment schedules.' },
            { q: 'Is simple interest better than compound interest for savings?', a: 'For savers, compound interest yields more over time because interest is reinvested. Simple interest is more common in borrowing scenarios and short-term instruments.' },
            { q: 'Does the calculator handle different compounding frequencies?', a: 'No — this tool is specifically for simple interest, which does not compound. For interest that compounds monthly, quarterly, or annually, use the compound interest calculator.' },
          ]}
        />
      </section>

      <RelatedTools slug="simple-interest-calculator" tools={relatedTools} />
    </>
  );
}
