import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Landmark } from 'lucide-react';

import { LoanEmiCalculator } from '@/components/calc/financial';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Loan EMI Calculator — Calculate Monthly Loan Payments Free | ToolNest',
  description:
    'Calculate your monthly EMI, total interest, and total payable amount for any loan. Adjust principal, rate, and tenure — free online loan EMI calculator.',
};

const relatedTools = getRelatedTools('loan-emi-calculator', 3).filter((t) =>
  ['gst-calculator', 'discount-calculator', 'simple-interest-calculator'].includes(t.slug)
);

export default function LoanEmiCalculatorPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <div className="absolute left-1/2 top-0 h-[280px] w-[480px] -translate-x-1/2 rounded-full bg-emerald-400/20 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tools" className="transition-colors hover:text-foreground">Tools</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Loan EMI Calculator</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-emerald-400 to-green-600 text-white shadow-lg shadow-brand-purple/25">
              <Landmark className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Loan EMI Calculator</h1>
              <p className="mt-1 text-muted-foreground">Calculate monthly loan payments, total interest, and amount payable — free, instant, no sign-up.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <LoanEmiCalculator />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="A Loan EMI Calculator computes the Equated Monthly Installment you pay on a loan based on the principal amount, interest rate, and loan tenure. ToolNest's EMI Calculator shows your monthly payment, total interest paid, and total amount payable, helping you compare loan offers and plan your repayment budget."
          howTo={[
            'Enter the loan principal amount you wish to borrow.',
            'Input the annual interest rate offered by your lender.',
            'Set the loan tenure in months or years.',
            'View your monthly EMI, total interest, and total payable amount.',
            'Adjust any value to compare different loan scenarios.',
          ]}
          benefits={[
            { title: 'Complete repayment breakdown', description: 'See your monthly EMI alongside total interest and total amount payable for full transparency.' },
            { title: 'Flexible tenure input', description: 'Specify the loan term in months or years to match how your lender quotes the period.' },
            { title: 'Instant scenario comparison', description: 'Change principal, rate, or tenure to instantly compare different loan offers side by side.' },
            { title: 'Budget planning', description: 'Know your monthly obligation before signing so you can confirm the payment fits your budget.' },
          ]}
          faqs={[
            { q: 'What is an EMI?', a: 'EMI stands for Equated Monthly Installment — the fixed monthly payment you make to repay a loan. Each EMI covers part of the principal and part of the interest, calculated so the loan is fully paid off by the end of the tenure.' },
            { q: 'How is EMI calculated?', a: 'EMI = P × r × (1 + r)^n ÷ ((1 + r)^n − 1), where P is the principal, r is the monthly interest rate (annual rate ÷ 12 ÷ 100), and n is the number of monthly installments.' },
            { q: 'Does the calculator account for processing fees?', a: 'This calculator focuses on principal, rate, and tenure. Processing fees and other charges vary by lender and should be confirmed with your loan provider separately.' },
            { q: 'What happens if I prepay part of the loan?', a: 'Prepayments reduce the outstanding principal, which can lower your future EMIs or shorten your tenure. This calculator shows the standard amortization without prepayments.' },
            { q: 'Can I use this for home, car, and personal loans?', a: 'Yes. The EMI formula applies to any amortizing loan — home loans, car loans, personal loans, education loans, and more. Just enter the correct principal, rate, and tenure.' },
            { q: 'Is a lower EMI always better?', a: 'Not necessarily. A lower EMI usually means a longer tenure, which increases the total interest you pay. Compare both the monthly EMI and the total interest to choose the best option.' },
          ]}
        />
      </section>

      <RelatedTools slug="loan-emi-calculator" tools={relatedTools} />
    </>
  );
}
