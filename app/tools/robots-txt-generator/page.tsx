import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Bot } from 'lucide-react';

import { RobotsTxtGenerator } from '@/components/seo/generators';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Robots.txt Generator — Create Crawl Rules for Search Bots | ToolNest',
  description:
    'Generate a robots.txt file to control which search engine bots can crawl your site. Allow, disallow, and set crawl-delay — free, no sign-up.',
};

const relatedTools = getRelatedTools('robots-txt-generator', 3).filter((t) =>
  ['sitemap-generator', 'meta-tag-generator', 'redirect-checker'].includes(t.slug)
);

export default function RobotsTxtGeneratorPage() {
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
            <span className="text-foreground">Robots.txt Generator</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-slate-400 to-gray-600 text-white shadow-lg shadow-brand-purple/25">
              <Bot className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Robots.txt Generator</h1>
              <p className="mt-1 text-muted-foreground">Create crawl rules for search engine bots — free, instant, no sign-up.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <RobotsTxtGenerator />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="A robots.txt generator produces the robots.txt file that lives at the root of your domain and tells search engine crawlers which parts of your site they may or may not access. It uses simple directives like User-agent, Allow, Disallow, and Crawl-delay to guide bots such as Googlebot, Bingbot, and others. ToolNest's generator lets you target specific user-agents or use the wildcard *, block entire directories or individual paths, and add a pointer to your XML sitemap. The result is a syntactically valid robots.txt you can download or copy directly to your server."
          howTo={[
            'Choose a user-agent to target (or use * to apply rules to all crawlers).',
            'Add paths to disallow — e.g. /admin/, /private/, or /search? to block specific areas.',
            'Optionally add allow rules to override a broader disallow for specific paths.',
            'Set a crawl-delay value if you want to slow down aggressive bots.',
            'Enter your sitemap URL so crawlers can discover it via robots.txt.',
            'Review the generated file and click "Copy" or "Download" to deploy it to your root.',
          ]}
          benefits={[
            { title: 'Granular crawler control', description: 'Target specific bots like Googlebot or Bingbot with tailored rules, or use the wildcard to set a default policy for every crawler.' },
            { title: 'Protect sensitive paths', description: 'Block crawlers from staging, admin, search results, or parameter-laden URLs that waste crawl budget or expose duplicate content.' },
            { title: 'Sitemap discovery', description: 'Add your sitemap URL so search engines find and crawl your most important pages faster, without waiting for external discovery.' },
            { title: 'Valid syntax guaranteed', description: 'The generator outputs correctly formatted robots.txt syntax, avoiding common mistakes like missing colons or malformed wildcards.' },
          ]}
          faqs={[
            { q: 'What does robots.txt do?', a: 'robots.txt is a text file at your site root that instructs search engine crawlers which pages or directories they may crawl. It is the first file bots request, and it helps you manage crawl budget and keep sensitive areas out of the index.' },
            { q: 'Does robots.txt block indexing?', a: 'No. robots.txt controls crawling, not indexing. A disallowed URL can still be indexed if it is linked from elsewhere. To prevent indexing, use the noindex meta tag or X-Robots-Tag header instead.' },
            { q: 'What does the * user-agent mean?', a: 'The asterisk (*) is a wildcard that matches any crawler not explicitly named by its own User-agent block. Rules under * act as a default policy for all bots that do not have a more specific rule set.' },
            { q: 'Should I disallow my /admin/ folder?', a: 'Yes, it is good practice to disallow administrative or private paths. However, true security requires authentication — robots.txt is a request, not an enforcement mechanism, and malicious bots may ignore it.' },
            { q: 'What is crawl-delay?', a: 'Crawl-delay is a directive that asks a bot to wait a specified number of seconds between requests. Google ignores it, but Bing and some other crawlers honor it. Use it sparingly to throttle aggressive bots.' },
            { q: 'Where do I put the robots.txt file?', a: 'Upload it to the root of your domain so it is reachable at https://example.com/robots.txt. Only one file is allowed per site, and it must be at the root for crawlers to find it.' },
          ]}
        />
      </section>

      <RelatedTools slug="robots-txt-generator" tools={relatedTools} />
    </>
  );
}
