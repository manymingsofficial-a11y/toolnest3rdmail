import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, CheckCircle2 } from 'lucide-react';

import { JsonValidator } from '@/components/dev/json-encoder';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'JSON Validator — Check & Validate JSON Syntax Online Free | ToolNest',
  description:
    'Validate JSON syntax and find errors fast. Get exact line and column for mistakes, with clear error messages — free, instant, no sign-up.',
};

const relatedTools = getRelatedTools('json-validator', 3).filter((t) =>
  ['json-formatter', 'base64-encoder', 'url-encoder'].includes(t.slug)
);

export default function JsonValidatorPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <div className="absolute left-1/2 top-0 h-[280px] w-[480px] -translate-x-1/2 rounded-full bg-green-400/20 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tools" className="transition-colors hover:text-foreground">Tools</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">JSON Validator</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 text-white shadow-lg shadow-brand-purple/25">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">JSON Validator</h1>
              <p className="mt-1 text-muted-foreground">Check JSON syntax and pinpoint errors instantly — free, no sign-up.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <JsonValidator />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="A JSON Validator checks whether a string conforms to the JSON specification (RFC 8259) and reports the first syntax error it finds with an exact line and column. ToolNest's JSON Validator parses your input in real time and tells you immediately whether it's valid or exactly where and why it broke — common culprits include trailing commas, single quotes, unquoted keys, and comments, none of which are legal in strict JSON. Everything runs in your browser, so sensitive config files and API payloads stay private."
          howTo={[
            'Paste or type your JSON into the input area.',
            'The validator checks the syntax automatically as you type.',
            'If valid, you will see a success confirmation.',
            'If invalid, read the error message and note the reported line and column.',
            'Jump to that spot in your input and fix the mistake.',
            'Repeat until the validator reports that your JSON is valid.',
          ]}
          benefits={[
            { title: 'Pinpoint error locations', description: 'Every error is reported with its line and column number, so you can jump straight to the problem instead of scanning the whole document.' },
            { title: 'Real-time feedback', description: 'Validation runs as you type, so you get instant confirmation the moment your JSON becomes valid — no clicking a button.' },
            { title: 'Clear error messages', description: 'Human-readable explanations like "Unexpected token" or "Expected property name" help you understand what went wrong, not just where.' },
            { title: 'Strict spec compliance', description: 'Uses the official JSON parser, so a "valid" result means your JSON will be accepted by any standards-compliant parser or API.' },
          ]}
          faqs={[
            { q: 'Why is my JSON marked invalid when it looks fine?', a: 'The most common causes are trailing commas, single quotes instead of double quotes, unquoted object keys, or comments — all of which are illegal in strict JSON. The error message points you to the exact location.' },
            { q: 'Does it support JSON with comments (JSONC)?', a: 'No. This validator enforces the strict JSON specification. Comments and trailing commas will be reported as errors. Remove them before using the JSON with a strict parser.' },
            { q: 'Can it validate JSON from an API response?', a: 'Yes. Copy the response body from your API tool or browser and paste it in. The validator will check it just like any other JSON string.' },
            { q: 'Is my data uploaded anywhere?', a: 'No. Validation is performed entirely in your browser using the native JSON.parse function. Your input is never sent to a server or stored.' },
            { q: 'What is the difference between this and the JSON Formatter?', a: 'The Validator confirms whether your JSON is syntactically correct and shows errors. The Formatter additionally restructures valid JSON with indentation for readability. Use the Validator first to fix errors, then the Formatter to beautify.' },
            { q: 'Does it handle very large JSON files?', a: 'Yes, though performance depends on your browser. Files up to several megabytes validate instantly; extremely large documents may cause a brief pause but will still be checked correctly.' },
          ]}
        />
      </section>

      <RelatedTools slug="json-validator" tools={relatedTools} />
    </>
  );
}
