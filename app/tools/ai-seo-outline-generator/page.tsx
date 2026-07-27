import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { AiGenerator } from '@/components/ai/ai-generator';

export const metadata = buildToolMetadata(
  'ai-seo-outline-generator',
  'AI SEO Outline Generator',
  'Create SEO-optimized content outlines instantly.'
);

const relatedSlugs = ['ai-blog-outline-generator', 'ai-keyword-generator', 'ai-meta-title-generator'];

export default function AiSeoOutlineGeneratorPage() {
  return (
    <ToolPageTemplate
      slug="ai-seo-outline-generator"
      relatedSlugs={relatedSlugs}
      blurColor="bg-cyan-400/20"
      seo={{
        whatIs: `The AI SEO Outline Generator is a free online AI tool that works entirely in your browser. ToolNest's AI SEO Outline Generator lets you create seo-optimized content outlines instantly. All processing happens locally — no uploads, no registration, no paid APIs.`,
        howTo: [
        'Enter your topic or text in the input field.',
        'Click the Generate button.',
        'Review the generated content in the result area.',
        'Copy the result to your clipboard with one click.',
      ],
        benefits: [
        { title: 'Free and unlimited', description: 'Use this tool as many times as you want, completely free with no sign-up required.' },
        { title: 'Privacy first', description: 'All processing happens in your browser. Your data never leaves your device.' },
        { title: 'Fast and easy', description: 'No learning curve. Open the tool, use it, and get your result instantly.' },
        { title: 'Works on any device', description: 'Fully responsive and works on desktop, tablet, and mobile browsers.' },
      ],
        faqs: [
        { q: 'Is the AI SEO Outline Generator free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
        { q: 'Does this tool use paid AI APIs?', a: 'No. All generation happens in your browser using smart templates and rule-based logic. No OpenAI or paid services are used.' },
        { q: 'Does the AI SEO Outline Generator work on mobile?', a: 'Yes, the tool is fully responsive and works on any modern mobile browser.' },
        { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' },
      ],
      }}
    >
      <AiGenerator slug="ai-seo-outline-generator" />
    </ToolPageTemplate>
  );
}
