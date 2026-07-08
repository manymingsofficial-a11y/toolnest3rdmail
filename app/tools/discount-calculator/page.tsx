import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, BadgePercent } from 'lucide-react';

import { DiscountCalculator } from '@/components/calc/financial';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Discount Calculator — Calculate Sale Price & Savings Free | ToolNest',
  description:
    'Calculate the final price after a discount and see how much you save. Enter original price and discount percentage — free online discount calculator.',
};

const relatedTools = getRelatedTools('discount-calculator', 3).filter((t) =>
  ['gst-calculator', 'tip-calculator', 'percentage-calculator'].includes(t.slug)
);

export default function DiscountCalculatorPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <div className="absolute left-1/2 top-0 h-[280px] w-[480px] -translate-x-1/2 rounded-full bg-amber-400/20 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tools" className="transition-colors hover:text-foreground">Tools</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Discount Calculator</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 text-white shadow-lg shadow-brand-purple/25">
              <BadgePercent className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Discount Calculator</h1>
              <p className="mt-1 text-muted-foreground">Find the sale price after a discount and see your savings — free, instant, no sign-up.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <DiscountCalculator />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="A Discount Calculator determines the final price of an item after a percentage discount is applied, along with the exact amount you save. ToolNest's Discount Calculator lets you enter the original price and discount percentage to instantly see the sale price and savings, making shopping decisions quick and easy."
          howTo={[
            'Enter the original price of the item.',
            'Input the discount percentage being offered.',
            'The sale price and your savings appear instantly.',
            'Adjust the discount percentage to compare different offers.',
            'Use the result to decide whether a deal is worth it.',
          ]}
          benefits={[
            { title: 'Instant sale price', description: 'See the final price you will pay after the discount is applied, without manual math.' },
            { title: 'Clear savings display', description: 'Know exactly how much money the discount saves you on each purchase.' },
            { title: 'Compare multiple offers', description: 'Change the discount percentage to quickly compare competing deals on the same product.' },
            { title: 'Works with any currency', description: 'The calculator is currency-agnostic — enter amounts in dollars, euros, rupees, or any currency.' },
          ]}
          faqs={[
            { q: 'How is a discount calculated?', a: 'Multiply the original price by the discount percentage divided by 100 to get the savings. Subtract the savings from the original price to get the sale price. For example, a 25% discount on $80 saves $20, making the sale price $60.' },
            { q: 'Can I calculate stacked discounts?', a: 'For multiple discounts applied sequentially, calculate the first discount, then apply the second to the already-discounted price. This calculator handles a single discount at a time for clarity.' },
            { q: 'What is the difference between percentage off and fixed amount off?', a: 'A percentage discount reduces the price by a proportion of the original (e.g., 20% off). A fixed discount subtracts a set amount (e.g., $10 off). This calculator focuses on percentage discounts.' },
            { q: 'Does the calculator handle tax?', a: 'This tool calculates the pre-tax discounted price. To find the final price including tax, apply your local sales tax rate to the discounted price separately.' },
            { q: 'Can I find the original price from a sale price?', a: 'If you know the sale price and discount percentage, divide the sale price by (1 − discount ÷ 100) to reverse-calculate the original price.' },
            { q: 'Is a bigger discount percentage always a better deal?', a: 'A higher percentage saves more on the same item, but always compare the final sale price — a smaller discount on a lower base price can sometimes cost less overall.' },
          ]}
        />
      </section>

      <RelatedTools slug="discount-calculator" tools={relatedTools} />
    </>
  );
}
