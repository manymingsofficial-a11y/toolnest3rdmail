import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Terminal } from 'lucide-react';

import { JsMinifier } from '@/components/dev/minifiers';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'JS Minifier — Compress JavaScript Online Free | ToolNest',
  description:
    'Minify JavaScript by removing comments and whitespace. Reduce file size for faster page loads — free, no sign-up.',
};

const relatedTools = getRelatedTools('js-minifier', 3).filter((t) =>
  ['css-minifier', 'html-formatter', 'json-formatter'].includes(t.slug)
);

export default function JsMinifierPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <div className="absolute left-1/2 top-0 h-[280px] w-[480px] -translate-x-1/2 rounded-full bg-yellow-400/20 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tools" className="transition-colors hover:text-foreground">Tools</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">JS Minifier</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-600 text-white shadow-lg shadow-brand-purple/25">
              <Terminal className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">JS Minifier</h1>
              <p className="mt-1 text-muted-foreground">Compress JavaScript and strip whitespace for faster loads — free, instant, no sign-up.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <JsMinifier />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="A JavaScript Minifier compresses source code by removing comments, whitespace, and line breaks, and by shortening local variable names where safe, producing a smaller file that executes identically. Smaller JavaScript downloads faster, parses faster, and reduces bandwidth costs — all of which improve page load performance. ToolNest's JS Minifier strips what the engine ignores while preserving program logic, so behavior never changes. All processing happens locally in your browser."
          howTo={[
            'Paste your JavaScript code into the input area.',
            'Click "Minify" to compress the code.',
            'The minified output appears on the right.',
            'Compare the original and minified sizes to see your savings.',
            'Click "Copy" to copy the compressed JavaScript.',
            'Use the output in your production build or script tag.',
          ]}
          benefits={[
            { title: 'Faster downloads', description: 'Smaller files transfer over the network more quickly, directly improving Time to Interactive and other load metrics.' },
            { title: 'Faster parsing', description: 'The browser parses fewer characters, reducing main-thread blocking time on lower-end devices and improving responsiveness.' },
            { title: 'Behavior preserved', description: 'Only comments, whitespace, and safe-to-rename locals are removed. Your code runs exactly as before — just smaller.' },
            { title: '100% private', description: 'All minification happens in your browser. Your source code is never uploaded to a server or stored.' },
          ]}
          faqs={[
            { q: 'Will minification change how my code runs?', a: 'No. The minifier removes comments, whitespace, and renames only local variables that are safe to shorten. Program logic and output stay identical.' },
            { q: 'How much can I save by minifying JavaScript?', a: 'For typical hand-written code, savings of 30–60% are common. Heavily commented or generously formatted files see the largest reductions.' },
            { q: 'Should I minify code during development?', a: 'No. Keep your source readable while developing — comments and formatting help you debug. Minify as a production build step, and keep source maps for debugging production issues.' },
            { q: 'Does it handle modern syntax like arrow functions and modules?', a: 'Yes. Modern ES6+ syntax is preserved during minification. The tool compresses whitespace and comments without transpiling, so use a compiler like Babel separately if you need older-browser support.' },
            { q: 'Is this as good as a build-tool minifier like Terser?', a: 'It covers the core savings from whitespace and comment removal. Advanced minifiers like Terser also dead-code-eliminate and mangle identifiers more aggressively. For large apps, integrate a full minifier into your build pipeline.' },
            { q: 'Is my code sent to a server?', a: 'No. All minification runs locally in your browser. Your JavaScript source is never transmitted or stored.' },
          ]}
        />
      </section>

      <RelatedTools slug="js-minifier" tools={relatedTools} />
    </>
  );
}
