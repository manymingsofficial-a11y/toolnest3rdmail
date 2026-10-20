import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { ConsolidatedAiGenerator } from '@/components/ai/consolidated-ai-generator';

export const metadata = buildToolMetadata(
  'ai-seo-tools',
  'AI SEO Tools (Template)',
  'generates meta titles, descriptions, keywords, FAQs, SEO outlines, slugs, schema markup, and alt text using templates'
);

const relatedSlugs = ['ai-writing-assistant', 'ai-social-media', 'ai-ecommerce'];

export default function AiSeoToolsPage() {
  return (
    <ToolPageTemplate
      slug="ai-seo-tools"
      relatedSlugs={relatedSlugs}
      blurColor="bg-emerald-400/20"
      seo={{
        whatIs: `The AI SEO Tools (Template) is a free browser-based template generator that creates SEO-optimized content including meta titles, meta descriptions, keywords, FAQs, SEO outlines, URL slugs, Product schema markup, and image alt text. All generation happens locally in your browser using predefined templates and rule-based logic — no AI models, no paid APIs, no server calls.`,
        howTo: [
          'Select an SEO mode from the dropdown (e.g., Meta Title Generator, Keyword Generator, FAQ Generator).',
          'Enter your topic, keyword, or product details in the field provided.',
          'Click Generate to create the SEO content using templates.',
          'Review the generated result and edit if needed.',
          'Copy the result to your clipboard or use it directly in your content.'
        ],
        benefits: [
          { title: '8 SEO tools in one', description: 'Access meta titles, descriptions, keywords, FAQs, outlines, slugs, schema, and alt text from a single interface.' },
          { title: 'Free and unlimited', description: 'Use all modes as many times as you want, completely free with no sign-up required.' },
          { title: 'Privacy first', description: 'All processing happens in your browser. Your data never leaves your device.' },
          { title: 'SEO-focused templates', description: 'Templates designed for search engine optimization best practices.' },
          { title: 'Works on any device', description: 'Fully responsive and works on desktop, tablet, and mobile browsers.' }
        ],
        faqs: [
          { q: 'Is the AI SEO Tools free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
          { q: 'Does this tool use AI?', a: 'No. This is a template-based generator that uses predefined patterns and rule-based logic. It does not use any AI models, LLMs, or paid APIs.' },
          { q: 'How many SEO modes are included?', a: '8 modes: Meta Title Generator, Meta Description Generator, Keyword Generator, FAQ Generator, SEO Outline Generator, Slug Generator Pro, Product Schema Writer, and Alt Text Generator.' },
          { q: 'Can I use the generated schema markup directly?', a: 'Yes, the Product Schema Writer outputs valid JSON-LD that can be embedded in your pages.' },
          { q: 'Does the tool work on mobile?', a: 'Yes, the tool is fully responsive and works on any modern mobile browser.' },
          { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' }
        ],
      }}
    >
      <ConsolidatedAiGenerator slug="ai-seo-tools" />
    </ToolPageTemplate>
  );
}