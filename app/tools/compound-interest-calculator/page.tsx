import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Sigma } from 'lucide-react';

import { CompoundInterestCalculator } from '@/components/calc/interest';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Compound Interest Calculator — Calculate CI Online Free | ToolNest',
  description:
    'Calculate compound interest with any compounding frequency. Enter principal, rate, time, and frequency — free online compound interest calculator.',
};

const relatedTools = getRelatedTools('compound-interest-calculator', 3).filter((t) =>
  ['simple-interest-calculator', 'loan-emi-calculator', 'scientific-calculator'].includes(t.slug)
);

export default function CompoundInterestCalculatorPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <div className="absolute left-1/2 top-0 h-[280px] w-[480px] -translate-x-1/2 rounded-full bg-violet-400/20 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tools" className="transition-colors hover:text-foreground">Tools</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Compound Interest Calculator</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-violet-400 to-purple-600 text-white shadow-lg shadow-brand-purple/25">
              <Sigma className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Compound Interest Calculator</h1>
              <p className="mt-1 text-muted-foreground">See how your money grows with compounding — free, instant, no sign-up.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <CompoundInterestCalculator />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="A Compound Interest Calculator shows how an investment grows when interest is reinvested at regular intervals, causing your money to earn interest on interest. ToolNest's Compound Interest Calculator accepts the principal, annual rate, time period, and compounding frequency (annually, semi-annually, quarterly, monthly, or daily) to project the final amount and total interest earned."
          howTo={[
            'Enter your initial principal investment amount.',
            'Input the annual interest rate as a percentage.',
            'Specify the investment duration in years.',
            'Select the compounding frequency (monthly, quarterly, yearly, etc.).',
            'View the final amount and total interest earned instantly.',
          ]}
          benefits={[
            { title: 'Multiple compounding frequencies', description: 'Choose annual, semi-annual, quarterly, monthly, or daily compounding to match your investment product.' },
            { title: 'See the power of compounding', description: 'Understand how reinvested interest accelerates growth over time compared to simple interest.' },
            { title: 'Plan long-term goals', description: 'Project how much your savings, fixed deposits, or investments will be worth at a future date.' },
            { title: 'Instant, accurate results', description: 'The standard compound interest formula is applied with full precision and updates in real time.' },
          ]}
          faqs={[
            { q: 'What is the compound interest formula?', a: 'A = P × (1 + r ÷ n)^(n × t), where A is the final amount, P is the principal, r is the annual rate, n is the number of compounding periods per year, and t is the number of years. Total interest is A minus P.' },
            { q: 'What compounding frequency should I choose?', a: 'It depends on your investment. Savings accounts typically compound monthly, fixed deposits may compound quarterly, and bonds often compound semi-annually. More frequent compounding yields slightly more interest.' },
            { q: 'How much more does compound interest earn versus simple interest?', a: 'The difference grows with time and frequency. Over short periods the gap is small, but over decades the reinvested interest can significantly outpace simple interest — especially with monthly or daily compounding.' },
            { q: 'Can I include regular contributions?', a: 'This calculator focuses on a single lump-sum principal. For recurring monthly contributions, a dedicated investment calculator with periodic deposits would be more appropriate.' },
            { q: 'Does the calculator account for inflation?', a: 'No. The results show nominal growth. To estimate real returns, subtract the inflation rate from your interest rate before entering it, or adjust the result manually.' },
            { q: 'Is the result before or after tax?', a: 'The calculator shows gross returns before taxes and fees. Actual take-home returns depend on your tax bracket and any account fees charged by your financial institution.' },
          ]}
        />
      </section>

      <RelatedTools slug="compound-interest-calculator" tools={relatedTools} />
    </>
  );
}
