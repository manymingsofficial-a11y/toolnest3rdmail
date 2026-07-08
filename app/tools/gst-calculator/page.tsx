import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Receipt } from 'lucide-react';

import { GstCalculator } from '@/components/calc/financial';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'GST Calculator — Add or Remove GST Online Free | ToolNest',
  description:
    'Calculate GST (Goods and Services Tax) inclusive and exclusive amounts instantly. Add or remove GST at any tax rate — free online GST calculator.',
};

const relatedTools = getRelatedTools('gst-calculator', 3).filter((t) =>
  ['loan-emi-calculator', 'discount-calculator', 'tip-calculator'].includes(t.slug)
);

export default function GstCalculatorPage() {
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
            <span className="text-foreground">GST Calculator</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-indigo-400 to-blue-600 text-white shadow-lg shadow-brand-purple/25">
              <Receipt className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">GST Calculator</h1>
              <p className="mt-1 text-muted-foreground">Add or remove GST and see tax-inclusive or exclusive amounts — free, instant, no sign-up.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <GstCalculator />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="A GST Calculator helps you add Goods and Services Tax to a base amount or extract it from a tax-inclusive price. ToolNest's GST Calculator supports any tax rate, lets you switch between add-GST and remove-GST modes, and shows the base amount, tax component, and total clearly."
          howTo={[
            'Enter the amount you want to calculate GST on.',
            'Select the applicable GST rate (e.g., 5%, 12%, 18%, 28%).',
            'Choose whether to add GST to the amount or remove it from a GST-inclusive total.',
            'View the base amount, GST component, and final total instantly.',
            'Adjust the rate or amount to compare different scenarios.',
          ]}
          benefits={[
            { title: 'Add or remove GST', description: 'Switch between adding tax to a net price and extracting tax from a gross price with one click.' },
            { title: 'Custom tax rates', description: 'Enter any GST rate to match the slab applicable to your product or service.' },
            { title: 'Clear breakdown', description: 'See the base amount, tax portion, and total separately for easy invoicing and accounting.' },
            { title: 'Instant results', description: 'All values update in real time as you change the amount or rate — no calculate button needed.' },
          ]}
          faqs={[
            { q: 'What is the difference between GST-inclusive and GST-exclusive amounts?', a: 'A GST-exclusive (net) amount does not include tax, so GST is added on top. A GST-inclusive (gross) amount already contains the tax, so the calculator extracts the base and tax portions from it.' },
            { q: 'How do I remove GST from a total?', a: 'Divide the GST-inclusive total by (1 + rate ÷ 100) to get the base amount. The GST component is the total minus the base. For example, removing 18% GST from 1180 gives a base of 1000 and tax of 180.' },
            { q: 'What GST rates are common?', a: 'Common GST slabs include 5%, 12%, 18%, and 28%, though rates vary by country and product category. You can enter any rate the calculator requires.' },
            { q: 'Can I use this for VAT or sales tax?', a: 'Yes. The calculation works for any percentage-based consumption tax — GST, VAT, sales tax, or HST. Simply enter the applicable rate.' },
            { q: 'Does the calculator round the results?', a: 'Results are shown to two decimal places for currency precision. The underlying calculation uses full precision to ensure accuracy.' },
            { q: 'Is this calculator accurate for business invoicing?', a: 'Yes. The formulas used are the standard GST add and remove calculations. Always verify the applicable rate for your jurisdiction and product category before finalizing invoices.' },
          ]}
        />
      </section>

      <RelatedTools slug="gst-calculator" tools={relatedTools} />
    </>
  );
}
