import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { ConsolidatedAiGenerator } from '@/components/ai/consolidated-ai-generator';

export const metadata = buildToolMetadata(
  'ai-career',
  'AI Career Assistant (Template)',
  'generates resume summaries, cover letters, job descriptions, and interview questions for career advancement using templates'
);

const relatedSlugs = ['ai-email', 'ai-business', 'ai-writing-assistant'];

export default function AiCareerPage() {
  return (
    <ToolPageTemplate
      slug="ai-career"
      relatedSlugs={relatedSlugs}
      blurColor="bg-indigo-400/20"
      seo={{
        whatIs: `The AI Career Assistant (Template) is a free browser-based template generator that creates career content including resume summaries, cover letters, job descriptions, and interview questions. All generation happens locally in your browser using predefined templates and rule-based logic — no AI models, no paid APIs, no server calls.`,
        howTo: [
          'Select a career mode from the dropdown (e.g., Resume Summary, Cover Letter, Job Description, Interview Questions).',
          'Enter your job title, company, or skills in the field provided.',
          'Click Generate to create the career content using templates.',
          'Review the generated result and edit if needed.',
          'Copy the result to your clipboard and use it for your job applications or hiring.'
        ],
        benefits: [
          { title: '4 career tools in one', description: 'Access resume summaries, cover letters, job descriptions, and interview questions from a single interface.' },
          { title: 'Free and unlimited', description: 'Use all modes as many times as you want, completely free with no sign-up required.' },
          { title: 'Privacy first', description: 'All processing happens in your browser. Your data never leaves your device.' },
          { title: 'Career-focused templates', description: 'Templates designed for job applications, hiring, and career development.' },
          { title: 'Works on any device', description: 'Fully responsive and works on desktop, tablet, and mobile browsers.' }
        ],
        faqs: [
          { q: 'Is the AI Career Assistant free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
          { q: 'Does this tool use AI?', a: 'No. This is a template-based generator that uses predefined patterns and rule-based logic. It does not use any AI models, LLMs, or paid APIs.' },
          { q: 'How many career modes are included?', a: '4 modes: Resume Summary Generator, Cover Letter Generator, Job Description Generator, and Interview Questions Generator.' },
          { q: 'Can I customize the generated cover letter?', a: 'Yes, the generated content is a template starting point. You should customize it with your specific experience and the job requirements.' },
          { q: 'Does the tool work on mobile?', a: 'Yes, the tool is fully responsive and works on any modern mobile browser.' },
          { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' }
        ],
      }}
    >
      <ConsolidatedAiGenerator slug="ai-career" />
    </ToolPageTemplate>
  );
}