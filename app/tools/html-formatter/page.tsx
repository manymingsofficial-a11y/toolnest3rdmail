import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, FileCode2 } from 'lucide-react';

import { HtmlFormatter } from '@/components/dev/minifiers';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'HTML Formatter — Beautify & Pretty Print HTML Online Free | ToolNest',
  description:
    'Format and beautify messy HTML with proper indentation. Validate structure, fix nesting, and copy clean output — free, no sign-up.',
};

const relatedTools = getRelatedTools('html-formatter', 3).filter((t) =>
  ['css-minifier', 'js-minifier', 'json-formatter'].includes(t.slug)
);

export default function HtmlFormatterPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <div className="absolute left-1/2 top-0 h-[280px] w-[480px] -translate-x-1/2 rounded-full bg-orange-400/20 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tools" className="transition-colors hover:text-foreground">Tools</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">HTML Formatter</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-orange-400 to-red-600 text-white shadow-lg shadow-brand-purple/25">
              <FileCode2 className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">HTML Formatter</h1>
              <p className="mt-1 text-muted-foreground">Beautify and pretty-print HTML with clean indentation — free, instant, no sign-up.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <HtmlFormatter />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="An HTML Formatter takes minified, single-line, or poorly indented HTML and restructures it with consistent line breaks and indentation so the tag hierarchy is easy to follow. ToolNest's HTML Formatter parses your markup, nests each element on its own line, and lets you choose your preferred indent size. It preserves inline content, attributes, and text while making the structure readable — ideal for debugging templates, inspecting scraped pages, or cleaning up generated markup. All processing runs in your browser."
          howTo={[
            'Paste your raw or minified HTML into the input area.',
            'Choose your preferred indentation size (2, 4, or tabs).',
            'Click "Format" to beautify the HTML.',
            'Review the indented output on the right.',
            'Adjust indentation and re-format if needed.',
            'Click "Copy" to copy the formatted HTML to your clipboard.',
          ]}
          benefits={[
            { title: 'Readable tag hierarchy', description: 'Each nested element gets its own line and proper indent level, so you can see the document structure at a glance instead of scrolling through a wall of text.' },
            { title: 'Custom indentation', description: "Match your project's style guide with 2-space, 4-space, or tab indentation, and reformat instantly if you switch conventions." },
            { title: 'Preserves content and attributes', description: 'Text nodes, inline content, and all attributes are kept intact — only whitespace and line breaks are adjusted for readability.' },
            { title: '100% private', description: 'HTML is parsed and formatted entirely in your browser. Your markup is never uploaded to a server or stored.' },
          ]}
          faqs={[
            { q: 'Will formatting change how my page renders?', a: 'No. The formatter only adjusts whitespace and line breaks between tags, which browsers ignore. Inline content inside elements is preserved so rendering stays identical.' },
            { q: 'Does it fix broken or invalid HTML?', a: 'The formatter restructures valid markup for readability. It does not repair unclosed tags or invalid nesting — fix structural errors first, then format.' },
            { q: 'Can it format HTML with embedded CSS or JavaScript?', a: 'Yes. Style and script blocks are preserved as-is within their tags. For best results, extract large CSS or JS into separate files and format them with the dedicated tools.' },
            { q: 'What is the difference between this and an HTML minifier?', a: 'A formatter adds whitespace for human readability; a minifier removes all unnecessary whitespace to reduce file size. Use the formatter while developing and a minifier for production.' },
            { q: 'Does it handle templating syntax like JSX or Blade?', a: 'This tool formats standard HTML. Templating syntax with curly braces or custom directives may not indent perfectly, but the surrounding HTML structure will still be cleaned up.' },
            { q: 'Is my HTML sent to a server?', a: 'No. All formatting happens locally in your browser. Your markup is never transmitted, stored, or logged.' },
          ]}
        />
      </section>

      <RelatedTools slug="html-formatter" tools={relatedTools} />
    </>
  );
}
