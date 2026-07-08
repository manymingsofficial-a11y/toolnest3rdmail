import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Minimize2 } from 'lucide-react';

import { CssMinifier } from '@/components/dev/minifiers';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'CSS Minifier — Compress CSS Online Free | ToolNest',
  description:
    'Minify CSS by removing comments, whitespace, and redundant code. Reduce file size for faster page loads — free, no sign-up.',
};

const relatedTools = getRelatedTools('css-minifier', 3).filter((t) =>
  ['js-minifier', 'html-formatter', 'json-formatter'].includes(t.slug)
);

export default function CssMinifierPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <div className="absolute left-1/2 top-0 h-[280px] w-[480px] -translate-x-1/2 rounded-full bg-sky-400/20 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tools" className="transition-colors hover:text-foreground">Tools</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">CSS Minifier</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 text-white shadow-lg shadow-brand-purple/25">
              <Minimize2 className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">CSS Minifier</h1>
              <p className="mt-1 text-muted-foreground">Compress CSS and strip whitespace for faster loads — free, instant, no sign-up.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <CssMinifier />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="A CSS Minifier compresses stylesheets by removing comments, unnecessary whitespace, line breaks, and trailing semicolons, and by collapsing redundant syntax — all without changing how the browser interprets the rules. The result is a smaller file that downloads and parses faster, improving page load time and Core Web Vitals. ToolNest's CSS Minifier safely strips only what the browser ignores, preserving selector logic, property values, and media queries. All minification runs locally in your browser."
          howTo={[
            'Paste your CSS into the input area.',
            'Click "Minify" to compress the stylesheet.',
            'The minified CSS appears in the output area.',
            'Check the before-and-after size to see how much you saved.',
            'Click "Copy" to copy the minified CSS.',
            'Paste the result into your production build or stylesheet file.',
          ]}
          benefits={[
            { title: 'Smaller file size', description: 'Removing comments, whitespace, and redundant semicolons can cut CSS size by 10–30%, directly speeding up download and parse time.' },
            { title: 'Safe transformation', description: 'Only characters the browser ignores are removed. Selectors, property values, media queries, and cascade logic stay exactly the same.' },
            { title: 'Faster page loads', description: 'Smaller CSS improves First Contentful Paint and other Core Web Vitals metrics, which boost both user experience and search ranking.' },
            { title: '100% private', description: 'Minification happens entirely in your browser. Your stylesheets are never uploaded to a server or stored.' },
          ]}
          faqs={[
            { q: 'Will minification break my CSS?', a: 'No. The minifier removes only comments, whitespace, line breaks, and trailing semicolons — things the browser ignores. Your selectors and declarations behave identically.' },
            { q: 'How much size can I save?', a: 'Typically 10–30% for hand-written CSS, and less if the CSS is already partially minified. Comments and generous indentation produce the biggest savings.' },
            { q: 'Should I minify CSS I am still developing?', a: 'Minify only for production. During development, keep your CSS readable with comments and indentation so you can debug easily. Minify as a build step before deploy.' },
            { q: 'Does it process @media queries and @import rules?', a: 'Yes. Media queries and their contents are preserved and minified. @import statements are kept as-is since they affect how stylesheets are loaded.' },
            { q: 'Does it convert values like 0px to 0?', a: 'Basic minification focuses on whitespace and comments. Shortening zero-values and collapsing shorthand are optimizations some advanced minifiers perform, but the core size savings come from whitespace removal.' },
            { q: 'Is my CSS sent to a server?', a: 'No. All minification runs locally in your browser. Your stylesheets are never transmitted or stored.' },
          ]}
        />
      </section>

      <RelatedTools slug="css-minifier" tools={relatedTools} />
    </>
  );
}
