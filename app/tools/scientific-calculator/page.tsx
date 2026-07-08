import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Calculator } from 'lucide-react';

import { ScientificCalculator } from '@/components/calc/scientific';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Scientific Calculator — Advanced Online Math Calculator Free | ToolNest',
  description:
    'Free online scientific calculator with trigonometry, logarithms, exponents, factorials, and more. Full keyboard support — no download or sign-up needed.',
};

const relatedTools = getRelatedTools('scientific-calculator', 3).filter((t) =>
  ['percentage-calculator', 'age-calculator', 'compound-interest-calculator'].includes(t.slug)
);

export default function ScientificCalculatorPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <div className="absolute left-1/2 top-0 h-[280px] w-[480px] -translate-x-1/2 rounded-full bg-slate-400/20 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tools" className="transition-colors hover:text-foreground">Tools</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Scientific Calculator</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-slate-400 to-gray-600 text-white shadow-lg shadow-brand-purple/25">
              <Calculator className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Scientific Calculator</h1>
              <p className="mt-1 text-muted-foreground">Perform advanced math — trig, logs, powers, roots, factorials — free, instant, no sign-up.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md">
          <ScientificCalculator />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="A Scientific Calculator handles advanced mathematical operations beyond basic arithmetic, including trigonometric functions, logarithms, exponents, roots, factorials, and constants like π and e. ToolNest's Scientific Calculator runs entirely in your browser with full keyboard support, so you can solve complex equations without installing any software."
          howTo={[
            'Use the on-screen buttons or your keyboard to enter numbers and operators.',
            'Access scientific functions like sin, cos, tan, log, and ln from the function panel.',
            'Use parentheses to control the order of operations in complex expressions.',
            'Press the equals key or button to evaluate your expression.',
            'Use the clear button to reset and start a new calculation.',
          ]}
          benefits={[
            { title: 'Full scientific functions', description: 'Trigonometry, logarithms, exponents, roots, factorials, and constants — everything you need for advanced math.' },
            { title: 'Keyboard support', description: 'Type expressions naturally using your physical keyboard for faster input alongside the on-screen buttons.' },
            { title: 'No installation required', description: 'Runs entirely in your browser on any device — desktop, tablet, or phone — with nothing to download.' },
            { title: 'Order of operations', description: 'Parentheses and operator precedence are respected so complex expressions evaluate correctly.' },
          ]}
          faqs={[
            { q: 'Which functions are available?', a: 'The calculator supports trigonometric functions (sin, cos, tan and their inverses), logarithms (log base 10 and natural log), exponents, roots, factorials, absolute value, and constants including π and e.' },
            { q: 'Can I use my keyboard to type expressions?', a: 'Yes. Numbers, operators, parentheses, and the Enter key for equals are all supported via the physical keyboard for faster input.' },
            { q: 'Does it follow the correct order of operations?', a: 'Yes. The calculator respects standard mathematical precedence — parentheses first, then exponents, then multiplication and division, and finally addition and subtraction.' },
            { q: 'Are the trig functions in degrees or radians?', a: 'You can switch between degree and radian mode using the toggle. Make sure the correct mode is active before evaluating trigonometric expressions.' },
            { q: 'Can I calculate factorials?', a: 'Yes. Use the factorial function to compute the factorial of non-negative integers. The result is displayed instantly.' },
            { q: 'Is my calculation history saved?', a: 'The calculator focuses on the current expression. For record-keeping, copy your results manually or take a screenshot of important calculations.' },
          ]}
        />
      </section>

      <RelatedTools slug="scientific-calculator" tools={relatedTools} />
    </>
  );
}
