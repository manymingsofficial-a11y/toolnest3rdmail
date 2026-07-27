import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { AiGenerator } from '@/components/ai/ai-generator';

export const metadata = buildToolMetadata(
  'ai-meta-description-generator',
  'AI Meta Description Generator',
  'Create compelling meta descriptions for SEO.'
);

const relatedSlugs = ['ai-meta-title-generator', 'ai-faq-generator', 'ai-keyword-generator'];

export default function AiMetaDescriptionGeneratorPage() {
  return (
    <ToolPageTemplate
      slug="ai-meta-description-generator"
      relatedSlugs={relatedSlugs}
      blurColor="bg-indigo-400/20"
      seo={{
        whatIs: `The AI Meta Description Generator is a free online AI tool that works entirely in your browser. ToolNest's AI Meta Description Generator lets you create compelling meta descriptions for seo. All processing happens locally — no uploads, no registration, no paid APIs.`,
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
        { q: 'Is the AI Meta Description Generator free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
        { q: 'Does this tool use paid AI APIs?', a: 'No. All generation happens in your browser using smart templates and rule-based logic. No OpenAI or paid services are used.' },
        { q: 'Does the AI Meta Description Generator work on mobile?', a: 'Yes, the tool is fully responsive and works on any modern mobile browser.' },
        { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' },
      ],
      }}
    >
      <AiGenerator slug="ai-meta-description-generator" />
    </ToolPageTemplate>
  );
}
