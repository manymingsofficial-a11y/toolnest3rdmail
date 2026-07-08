import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Route } from 'lucide-react';

import { RedirectChecker } from '@/components/seo/analyzers';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Redirect Checker — Trace URL Redirect Chains & Status Codes | ToolNest',
  description:
    'Check HTTP redirect chains, status codes (301, 302, 307, 308), and final destination URLs. Find loops and broken redirects — free, no sign-up.',
};

const relatedTools = getRelatedTools('redirect-checker', 3).filter((t) =>
  ['robots-txt-generator', 'canonical-url-generator', 'sitemap-generator'].includes(t.slug)
);

export default function RedirectCheckerPage() {
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
            <span className="text-foreground">Redirect Checker</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 text-white shadow-lg shadow-brand-purple/25">
              <Route className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Redirect Checker</h1>
              <p className="mt-1 text-muted-foreground">Trace redirect chains and HTTP status codes — free, instant, no sign-up.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <RedirectChecker />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="A redirect checker follows a URL through every hop in its redirect chain and reports the HTTP status code at each step — 301, 302, 307, 308 — until it reaches the final destination or encounters a loop or error. This is essential for SEO and site maintenance: long redirect chains slow down page loads and dilute link equity, while incorrect status codes (using a 302 where a 301 is needed) can prevent ranking signals from passing to the new URL. ToolNest's checker displays each hop, its status code, the intermediate URLs, and flags redirect loops and broken destinations so you can fix issues fast."
          howTo={[
            'Paste the URL you want to trace into the input field.',
            'Click "Check" to follow the URL through its redirect chain.',
            'Review each hop — the status code, intermediate URL, and response headers.',
            'Look for the final destination URL and its status code (ideally 200 OK).',
            'Watch for warnings about redirect loops, broken links, or excessive hops.',
            'Fix any issues by updating your server or CDN redirect rules.',
          ]}
          benefits={[
            { title: 'Full chain visibility', description: 'See every hop in the redirect chain, not just the final URL, so you can identify unnecessary intermediate steps that slow users and crawlers down.' },
            { title: 'Correct status-code detection', description: 'Distinguishes permanent (301, 308) from temporary (302, 307) redirects so you can confirm SEO-critical rules use the right status code.' },
            { title: 'Loop and error alerts', description: 'Instantly flags redirect loops, broken destinations, and chains that exceed a healthy number of hops, preventing crawl waste and lost link equity.' },
            { title: 'Faster site fixes', description: 'Pinpoints the exact hop where a redirect breaks, so you can update the precise server or CDN rule instead of guessing where the chain fails.' },
          ]}
          faqs={[
            { q: 'What is a redirect chain?', a: 'A redirect chain is a sequence of two or more redirects that a request passes through before reaching its final destination. For example, URL A redirects to B, which redirects to C. Each extra hop adds latency and can dilute ranking signals.' },
            { q: 'What is the difference between 301 and 302?', a: 'A 301 redirect is permanent and passes most link equity to the destination, which is what you want for SEO. A 302 is temporary and may not consolidate ranking signals. Always use 301 for permanent moves.' },
            { q: 'What about 307 and 308?', a: '307 and 308 are the HTTP/1.1 equivalents of 302 and 301 respectively, preserving the original request method. 308 is permanent like 301. Most SEO scenarios use 301 or 308 for permanent redirects.' },
            { q: 'How many redirects is too many?', a: 'Ideally keep chains to a single hop. Google may stop following chains with more than about 5 hops, and each redirect adds latency. If you have long chains, replace intermediate steps with a direct redirect to the final URL.' },
            { q: 'What is a redirect loop?', a: 'A redirect loop occurs when two or more URLs redirect to each other in a cycle, so the browser never reaches a final page and shows an error. The checker detects loops so you can break the cycle in your redirect rules.' },
            { q: 'Do redirects hurt SEO?', a: 'A single, correct 301 redirect passes almost all ranking signals and is fine. Problems arise with long chains, temporary 302s used for permanent moves, or loops. Use this checker to confirm your redirects are clean and use the right status codes.' },
          ]}
        />
      </section>

      <RelatedTools slug="redirect-checker" tools={relatedTools} />
    </>
  );
}
