import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { AiGenerator } from '@/components/ai/ai-generator';

export const metadata = buildToolMetadata(
  'ai-facebook-caption-generator',
  'Facebook Caption Generator (Template)',
  'creates Facebook post captions from a topic using templates'
);

const relatedSlugs = ['ai-instagram-caption-generator', 'ai-linkedin-post-generator', 'ai-hashtag-generator'];

export default function AiFacebookCaptionGeneratorPage() {
  return (
    <ToolPageTemplate
      slug="ai-facebook-caption-generator"
      relatedSlugs={relatedSlugs}
      blurColor="bg-blue-400/20"
      seo={{
        whatIs: `The Facebook Caption Generator (Template) is a free browser-based template generator that creates Facebook post captions from a topic using templates. All generation happens locally in your browser using predefined templates and rule-based logic — no AI models, no paid APIs, no server calls.`,
        howTo: [
        'Enter your input in the field provided.',
        'Click Generate to create the output using templates.',
        'Review the generated result and edit if needed.',
        'Copy the result to your clipboard or download it.'
      ],
        benefits: [
        { title: 'Free and unlimited', description: 'Use this tool as many times as you want, completely free with no sign-up required.' },
        { title: 'Privacy first', description: 'All processing happens in your browser. Your data never leaves your device.' },
        { title: 'Fast and easy', description: 'No learning curve. Open the tool, use it, and get your result instantly.' },
        { title: 'Works on any device', description: 'Fully responsive and works on desktop, tablet, and mobile browsers.' }
      ],
        faqs: [
        { q: 'Is the Facebook Caption Generator (Template) free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
        { q: 'Does this tool use AI?', a: 'No. This is a template-based generator that uses predefined patterns and rule-based logic. It does not use any AI models, LLMs, or paid APIs.' },
        { q: 'Does the tool work on mobile?', a: 'Yes, the tool is fully responsive and works on any modern mobile browser.' },
        { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' }
      ],
      }}
    >
      <AiGenerator slug="ai-facebook-caption-generator" />
    </ToolPageTemplate>
  );
}
