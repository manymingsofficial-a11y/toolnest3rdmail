import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Tags } from 'lucide-react';

import { MetaTagGenerator } from '@/components/seo/generators';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Meta Tag Generator — Create HTML Meta Tags Online Free | ToolNest',
  description:
    'Generate SEO meta tags, Open Graph tags, and Twitter Card tags for your website. Preview, copy, and paste ready-to-use HTML — free, no sign-up.',
};

const relatedTools = getRelatedTools('meta-tag-generator', 3).filter((t) =>
  ['open-graph-generator', 'twitter-card-generator', 'canonical-url-generator'].includes(t.slug)
);

export default function MetaTagGeneratorPage() {
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
            <span className="text-foreground">Meta Tag Generator</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-orange-400 to-amber-600 text-white shadow-lg shadow-brand-purple/25">
              <Tags className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Meta Tag Generator</h1>
              <p className="mt-1 text-muted-foreground">Create SEO, Open Graph, and Twitter meta tags — free, instant, no sign-up.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <MetaTagGenerator />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="A Meta Tag Generator produces the HTML meta tags that sit inside your page's <head> element and tell search engines and social platforms what your page is about. ToolNest's Meta Tag Generator covers the essentials — title, description, viewport, charset, robots directives — alongside Open Graph and Twitter Card tags for rich social sharing. As you fill in the fields, it builds a ready-to-paste block of HTML and shows a live preview of how your page will look in search results and on social platforms. You can fine-tune character counts, canonical URLs, and indexing rules without touching a single line of code."
          howTo={[
            'Enter your page title (aim for 50–60 characters) and meta description (150–160 characters).',
            'Add your canonical URL and choose a robots directive (index/noindex, follow/nofollow).',
            'Fill in Open Graph fields — og:title, og:description, og:image URL, and og:type.',
            'Add Twitter Card fields such as twitter:card, twitter:title, and twitter:image.',
            'Watch the live preview update to see how your page appears in search and social posts.',
            'Click "Copy HTML" and paste the generated tags into your page <head>.',
          ]}
          benefits={[
            { title: 'All-in-one tags', description: 'Generate SEO, Open Graph, and Twitter Card tags in a single pass instead of juggling separate tools or hand-writing each tag.' },
            { title: 'Live search preview', description: 'See exactly how your title and description render in Google-style search results before you publish a single line.' },
            { title: 'Character-count guidance', description: 'Built-in counters warn you when your title or description is too long and risks being truncated in search snippets.' },
            { title: 'Copy-ready HTML', description: 'One click copies clean, valid HTML you can paste straight into your <head> — no formatting cleanup required.' },
          ]}
          faqs={[
            { q: 'What are meta tags?', a: 'Meta tags are HTML elements placed inside the <head> of a page that provide metadata about the document — its title, description, author, viewport, and social sharing instructions. They are not visible on the page itself but are read by browsers, search engines, and social platforms.' },
            { q: 'Which meta tags matter most for SEO?', a: 'The title tag and meta description are the most impactful for search. The title appears as the clickable headline in search results, while the description summarizes the page and influences click-through rate. Robots meta tags control indexing, and canonical tags prevent duplicate-content issues.' },
            { q: 'How long should my title and description be?', a: 'Aim for a title of 50–60 characters and a description of 150–160 characters. Google typically truncates titles around 60 characters and descriptions around 155–160 characters, so staying within these limits keeps your snippets clean.' },
            { q: 'Do I need Open Graph and Twitter tags separately?', a: 'Open Graph tags are used by Facebook, LinkedIn, and most social platforms, while Twitter Cards rely on twitter: tags (though Twitter can fall back on Open Graph). Generating both ensures your links look polished everywhere they are shared.' },
            { q: 'Will meta tags alone improve my rankings?', a: 'Meta tags are necessary but not sufficient. A well-crafted title and description improve click-through rate and help search engines understand your page, but rankings also depend on content quality, backlinks, page speed, and user experience.' },
            { q: 'Where do I paste the generated HTML?', a: 'Paste the copied tags inside your page <head> element, after the charset declaration and before the closing </head> tag. If you use a CMS like WordPress, a plugin or theme setting can inject them for you.' },
          ]}
        />
      </section>

      <RelatedTools slug="meta-tag-generator" tools={relatedTools} />
    </>
  );
}
