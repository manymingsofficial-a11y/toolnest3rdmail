import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { ConsolidatedAiGenerator } from '@/components/ai/consolidated-ai-generator';

export const metadata = buildToolMetadata(
  'ai-youtube',
  'AI YouTube Assistant (Template)',
  'generates video titles, descriptions, hooks, scripts, Shorts captions, and thumbnail text for YouTube growth using templates'
);

const relatedSlugs = ['ai-social-media', 'ai-writing-assistant', 'ai-business'];

export default function AiYouTubePage() {
  return (
    <ToolPageTemplate
      slug="ai-youtube"
      relatedSlugs={relatedSlugs}
      blurColor="bg-red-400/20"
      seo={{
        whatIs: `The AI YouTube Assistant (Template) is a free browser-based template generator that creates YouTube content including video titles, descriptions, hooks, scripts, Shorts captions, and thumbnail text. All generation happens locally in your browser using predefined templates and rule-based logic — no AI models, no paid APIs, no server calls.`,
        howTo: [
          'Select a YouTube mode from the dropdown (e.g., Video Title Generator, Video Script Generator, Thumbnail Text).',
          'Enter your video topic in the field provided.',
          'Click Generate to create the YouTube content using templates.',
          'Review the generated result and edit if needed.',
          'Copy the result to your clipboard and use it for your video.'
        ],
        benefits: [
          { title: '6 YouTube tools in one', description: 'Access video titles, descriptions, hooks, scripts, Shorts captions, and thumbnail text from a single interface.' },
          { title: 'Free and unlimited', description: 'Use all modes as many times as you want, completely free with no sign-up required.' },
          { title: 'Privacy first', description: 'All processing happens in your browser. Your data never leaves your device.' },
          { title: 'YouTube-optimized templates', description: 'Templates designed for YouTube SEO, click-through rates, and viewer retention.' },
          { title: 'Works on any device', description: 'Fully responsive and works on desktop, tablet, and mobile browsers.' }
        ],
        faqs: [
          { q: 'Is the AI YouTube Assistant free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
          { q: 'Does this tool use AI?', a: 'No. This is a template-based generator that uses predefined patterns and rule-based logic. It does not use any AI models, LLMs, or paid APIs.' },
          { q: 'How many YouTube modes are included?', a: '6 modes: Video Title Generator, Video Description Generator, Video Hook Generator, Video Script Generator, Shorts Caption Generator, and Thumbnail Text Generator.' },
          { q: 'Can I use the generated scripts directly?', a: 'Yes, the Video Script Generator creates structured scripts with hooks, intros, main content, demonstrations, CTAs, and outros.' },
          { q: 'Does the tool work on mobile?', a: 'Yes, the tool is fully responsive and works on any modern mobile browser.' },
          { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' }
        ],
      }}
    >
      <ConsolidatedAiGenerator slug="ai-youtube" />
    </ToolPageTemplate>
  );
}