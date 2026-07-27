import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { AiGenerator } from '@/components/ai/ai-generator';

export const metadata = buildToolMetadata(
  'ai-cover-letter-generator',
  'AI Cover Letter Generator',
  'Generate professional cover letters instantly.'
);

const relatedSlugs = ['ai-resume-summary-generator', 'ai-job-description-generator', 'ai-interview-questions-generator'];

export default function AiCoverLetterGeneratorPage() {
  return (
    <ToolPageTemplate
      slug="ai-cover-letter-generator"
      relatedSlugs={relatedSlugs}
      blurColor="bg-teal-400/20"
      seo={{
        whatIs: `The AI Cover Letter Generator is a free online AI tool that works entirely in your browser. ToolNest's AI Cover Letter Generator lets you generate professional cover letters instantly. All processing happens locally — no uploads, no registration, no paid APIs.`,
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
        { q: 'Is the AI Cover Letter Generator free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
        { q: 'Does this tool use paid AI APIs?', a: 'No. All generation happens in your browser using smart templates and rule-based logic. No OpenAI or paid services are used.' },
        { q: 'Does the AI Cover Letter Generator work on mobile?', a: 'Yes, the tool is fully responsive and works on any modern mobile browser.' },
        { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' },
      ],
      }}
    >
      <AiGenerator slug="ai-cover-letter-generator" />
    </ToolPageTemplate>
  );
}
