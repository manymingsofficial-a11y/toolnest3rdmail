import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Utensils } from 'lucide-react';

import { TipCalculator } from '@/components/calc/financial';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Tip Calculator — Calculate Restaurant Tips & Split Bills Free | ToolNest',
  description:
    'Calculate tips and split the bill among friends. Enter bill amount, tip percentage, and number of people — free online tip calculator, no sign-up.',
};

const relatedTools = getRelatedTools('tip-calculator', 3).filter((t) =>
  ['discount-calculator', 'percentage-calculator', 'gst-calculator'].includes(t.slug)
);

export default function TipCalculatorPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <div className="absolute left-1/2 top-0 h-[280px] w-[480px] -translate-x-1/2 rounded-full bg-teal-400/20 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tools" className="transition-colors hover:text-foreground">Tools</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Tip Calculator</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-600 text-white shadow-lg shadow-brand-purple/25">
              <Utensils className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Tip Calculator</h1>
              <p className="mt-1 text-muted-foreground">Calculate tips and split the bill fairly among your group — free, instant, no sign-up.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <TipCalculator />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="A Tip Calculator helps you determine the appropriate tip amount for a bill and split the total cost among multiple people. ToolNest's Tip Calculator lets you enter the bill amount, choose a tip percentage, and specify how many people are sharing the cost, then shows the tip, total, and per-person amount instantly."
          howTo={[
            'Enter the total bill amount before tip.',
            'Select a tip percentage or enter a custom amount.',
            'Enter the number of people splitting the bill.',
            'View the tip amount, total bill, and per-person share instantly.',
            'Adjust any value to find the fair split for your group.',
          ]}
          benefits={[
            { title: 'Fair bill splitting', description: 'Divide the total — including tip — evenly across any number of diners for a hassle-free split.' },
            { title: 'Custom tip percentages', description: 'Choose common tip rates or enter a custom percentage to match your preference and local customs.' },
            { title: 'Instant per-person total', description: 'See exactly how much each person owes without doing mental math at the table.' },
            { title: 'Works in any currency', description: 'Enter your bill in dollars, euros, pounds, rupees, or any currency — the math is the same.' },
          ]}
          faqs={[
            { q: 'What is a standard tip percentage?', a: 'In the United States, 15–20% is customary for sit-down restaurant service. In many other countries, 10% is common or tipping is not expected. Adjust the percentage to match local customs.' },
            { q: 'Should I tip on the pre-tax or post-tax amount?', a: 'Tipping on the pre-tax subtotal is technically standard, but many people tip on the total bill for simplicity. Use whichever you prefer — the calculator works with the amount you enter.' },
            { q: 'How is the per-person amount calculated?', a: 'The tip is added to the bill to get the total, which is then divided by the number of people. Each person pays an equal share of the combined bill and tip.' },
            { q: 'Can I split the bill unevenly?', a: 'This calculator splits the total equally. For uneven splits where people ordered different items, calculate each person\'s subtotal separately and apply the tip proportionally.' },
            { q: 'Does the calculator include tax?', a: 'Enter the bill amount as shown on your receipt. If you include tax in the entered amount, the tip and split will be based on the tax-inclusive total.' },
            { q: 'What if I want to round up the tip?', a: 'You can enter a custom tip percentage that rounds the tip to a convenient whole number, or simply adjust the percentage until the tip amount looks right.' },
          ]}
        />
      </section>

      <RelatedTools slug="tip-calculator" tools={relatedTools} />
    </>
  );
}
