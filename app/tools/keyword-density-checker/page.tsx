import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, FileSearch } from 'lucide-react';

import { KeywordDensityChecker } from '@/components/seo/analyzers';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Keyword Density Checker — Analyze Word Frequency in Text | ToolNest',
  description:
    'Check keyword density and word frequency in your content. Spot over-optimization, find top terms, and refine your SEO copy — free, no sign-up.',
};

const relatedTools = getRelatedTools('keyword-density-checker', 3).filter((t) =>
  ['slug-generator', 'meta-tag-generator', 'search-snippet-preview'].includes(t.slug)
);

export default function KeywordDensityCheckerPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <div className="absolute left-1/2 top-0 h-[280px] w-[480px] -translate-x-1/2 rounded-full bg-purple-400/20 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tools" className="transition-colors hover:text-foreground">Tools</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Keyword Density Checker</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-purple-400 to-violet-600 text-white shadow-lg shadow-brand-purple/25">
              <FileSearch className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Keyword Density Checker</h1>
              <p className="mt-1 text-muted-foreground">Analyze keyword density and word frequency in your content — free, instant, no sign-up.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <KeywordDensityChecker />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="A keyword density checker counts how often each word or phrase appears in a piece of text and expresses it as a percentage of the total word count. This helps writers and SEOs understand which terms a page is emphasizing and whether a keyword is being overused (keyword stuffing) or underused. ToolNest's checker breaks down single-word, two-word, and three-word phrase frequency, filters common stop words, and ranks the most prominent terms. It runs entirely in your browser, so you can paste a draft article, blog post, or product description and get instant insight into its topical focus."
          howTo={[
            'Paste your text, article, or page content into the input area.',
            'Choose whether to include or exclude common stop words like "the" and "and".',
            'Select the phrase length to analyze — single words, two-word, or three-word phrases.',
            'Review the ranked list of terms with their counts and density percentages.',
            'Look for over-optimized terms above ~3% density and rewrite for natural flow.',
            'Confirm your target keyword appears at a healthy, readable frequency.',
          ]}
          benefits={[
            { title: 'Spot keyword stuffing', description: 'Catch terms repeated so often they read unnaturally and risk a search engine penalty for over-optimization.' },
            { title: 'Multi-word phrase analysis', description: 'Analyze single words, bigrams, and trigrams so you can evaluate long-tail keyword usage, not just individual words.' },
            { title: 'Stop-word filtering', description: 'Toggle common filler words on or off so the results surface meaningful terms instead of "the", "and", and "of".' },
            { title: '100% private analysis', description: 'All counting happens locally in your browser — your draft content is never uploaded to a server or stored anywhere.' },
          ]}
          faqs={[
            { q: 'What is keyword density?', a: 'Keyword density is the number of times a keyword appears divided by the total word count, expressed as a percentage. For example, if a keyword appears 5 times in a 500-word article, its density is 1%.' },
            { q: 'What is a good keyword density?', a: 'There is no official target, but most SEOs suggest keeping a primary keyword around 1–2% of total word count. Anything much above 3% risks reading unnaturally and can be flagged as keyword stuffing.' },
            { q: 'Does keyword density affect rankings?', a: 'Keyword density is not a standalone ranking factor. Modern search engines use natural language processing to evaluate topical relevance. Appearing naturally is far more important than hitting a specific percentage.' },
            { q: 'What are stop words?', a: 'Stop words are extremely common words like "the", "is", "and", and "in" that add little topical meaning. Filtering them out makes your density report focus on the meaningful terms in your content.' },
            { q: 'Should I optimize for single words or phrases?', a: 'Long-tail phrases (two- and three-word combinations) usually match real search queries better than single words. Analyzing bigrams and trigrams helps you see whether your long-tail targets are well represented.' },
            { q: 'Is keyword stuffing still a risk?', a: 'Yes. Repeating a keyword unnaturally can trigger spam filters and hurt rankings. The best practice is to write naturally for humans first, then use a density check to confirm your target term appears in a healthy, readable way.' },
          ]}
        />
      </section>

      <RelatedTools slug="keyword-density-checker" tools={relatedTools} />
    </>
  );
}
