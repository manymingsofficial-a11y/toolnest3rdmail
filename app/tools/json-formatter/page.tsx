import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Braces } from 'lucide-react';

import { JsonFormatter } from '@/components/dev/json-encoder';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'JSON Formatter — Beautify & Pretty Print JSON Online Free | ToolNest',
  description:
    'Format and pretty-print messy JSON with adjustable indentation. Validate syntax, spot errors instantly, and copy clean output — free, no sign-up.',
};

const relatedTools = getRelatedTools('json-formatter', 3).filter((t) =>
  ['json-validator', 'base64-encoder', 'url-encoder'].includes(t.slug)
);

export default function JsonFormatterPage() {
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
            <span className="text-foreground">JSON Formatter</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-emerald-400 to-green-600 text-white shadow-lg shadow-brand-purple/25">
              <Braces className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">JSON Formatter</h1>
              <p className="mt-1 text-muted-foreground">Beautify, pretty-print, and validate JSON — free, instant, no sign-up.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <JsonFormatter />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="A JSON Formatter takes compact or malformed JSON and restructures it with consistent indentation, line breaks, and spacing so it's easy to read and debug. ToolNest's JSON Formatter parses your input, highlights syntax errors with the exact line and column, and lets you choose 2, 4, or tab indentation. It handles nested arrays and objects of any depth and outputs valid, pretty-printed JSON you can copy with one click. All parsing happens in your browser, so your data never leaves your machine."
          howTo={[
            'Paste your raw JSON into the input box on the left.',
            'Pick your preferred indentation: 2 spaces, 4 spaces, or tabs.',
            'Click "Format" to pretty-print the JSON.',
            'If there is a syntax error, the error message shows the location — fix it and format again.',
            'Review the formatted output on the right.',
            'Click "Copy" to copy the beautified JSON to your clipboard.',
          ]}
          benefits={[
            { title: 'Spot errors instantly', description: 'Invalid JSON is flagged with the precise line and column so you can fix typos, trailing commas, and missing brackets in seconds.' },
            { title: 'Flexible indentation', description: "Switch between 2-space, 4-space, or tab indentation to match your project's style guide or personal preference." },
            { title: 'Handles deep nesting', description: 'Arrays within objects within arrays are formatted cleanly at any depth, with no truncation or data loss.' },
            { title: '100% private', description: 'JSON is parsed and formatted entirely in your browser. Nothing is uploaded to a server, stored, or logged.' },
          ]}
          faqs={[
            { q: 'Is my JSON sent to a server?', a: 'No. All formatting and validation happens locally in your browser using the native JSON parser. Your data never leaves your device.' },
            { q: 'What happens if my JSON is invalid?', a: 'The formatter shows an error message with the line and column number of the problem, such as an unexpected token or trailing comma. Fix the issue and click Format again.' },
            { q: 'Can I minify JSON too?', a: 'Yes — this formatter focuses on beautifying. If you need to compress JSON back to a single line, paste formatted output and remove whitespace, or use a minifier.' },
            { q: 'What indentation should I use?', a: '2 spaces is the most common convention and works well for most projects. 4 spaces offers more visual separation, while tabs save bytes and let each developer set their own tab width.' },
            { q: 'Does it support JSON5 or comments?', a: 'No. This tool uses the strict JSON specification, which does not allow comments or trailing commas. Input containing them will be flagged as invalid.' },
            { q: 'Is there a size limit?', a: 'There is no hard limit, but very large documents (tens of megabytes) may slow down your browser. For typical API responses and config files, performance is instant.' },
          ]}
        />
      </section>

      <RelatedTools slug="json-formatter" tools={relatedTools} />
    </>
  );
}
