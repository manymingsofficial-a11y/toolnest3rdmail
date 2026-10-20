import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { ConsolidatedAiGenerator } from '@/components/ai/consolidated-ai-generator';

export const metadata = buildToolMetadata(
  'ai-email',
  'AI Email Writer (Template)',
  'writes professional emails, cold outreach, follow-ups, and professional replies for any business situation using templates'
);

const relatedSlugs = ['ai-business', 'ai-career', 'ai-writing-assistant'];

export default function AiEmailPage() {
  return (
    <ToolPageTemplate
      slug="ai-email"
      relatedSlugs={relatedSlugs}
      blurColor="bg-amber-400/20"
      seo={{
        whatIs: `The AI Email Writer (Template) is a free browser-based template generator that creates professional emails including general emails, cold outreach, follow-ups, and professional replies. All generation happens locally in your browser using predefined templates and rule-based logic — no AI models, no paid APIs, no server calls.`,
        howTo: [
          'Select an email mode from the dropdown (e.g., Email Writer, Cold Email Generator, Follow-up Email, Professional Reply).',
          'Enter your email purpose, product details, or paste a received email in the field provided.',
          'Click Generate to create the email content using templates.',
          'Review the generated result and edit if needed.',
          'Copy the result to your clipboard and send it from your email client.'
        ],
        benefits: [
          { title: '4 email tools in one', description: 'Access email writer, cold outreach, follow-ups, and professional replies from a single interface.' },
          { title: 'Free and unlimited', description: 'Use all modes as many times as you want, completely free with no sign-up required.' },
          { title: 'Privacy first', description: 'All processing happens in your browser. Your data never leaves your device.' },
          { title: 'Professional templates', description: 'Templates designed for business communication best practices.' },
          { title: 'Works on any device', description: 'Fully responsive and works on desktop, tablet, and mobile browsers.' }
        ],
        faqs: [
          { q: 'Is the AI Email Writer free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
          { q: 'Does this tool use AI?', a: 'No. This is a template-based generator that uses predefined patterns and rule-based logic. It does not use any AI models, LLMs, or paid APIs.' },
          { q: 'How many email modes are included?', a: '4 modes: Email Writer, Cold Email Generator, Follow-up Email Generator, and Professional Reply Generator.' },
          { q: 'Can I use the Professional Reply mode for any email?', a: 'Yes, paste any received email and it will generate a professional response template.' },
          { q: 'Does the tool work on mobile?', a: 'Yes, the tool is fully responsive and works on any modern mobile browser.' },
          { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' }
        ],
      }}
    >
      <ConsolidatedAiGenerator slug="ai-email" />
    </ToolPageTemplate>
  );
}