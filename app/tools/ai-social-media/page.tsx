import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { ConsolidatedAiGenerator } from '@/components/ai/consolidated-ai-generator';

export const metadata = buildToolMetadata(
  'ai-social-media',
  'AI Social Media Generator (Template)',
  'creates captions, posts, bios, hashtags, and pin titles for Instagram, Facebook, LinkedIn, Twitter, and Pinterest using templates'
);

const relatedSlugs = ['ai-writing-assistant', 'ai-youtube', 'ai-email'];

export default function AiSocialMediaPage() {
  return (
    <ToolPageTemplate
      slug="ai-social-media"
      relatedSlugs={relatedSlugs}
      blurColor="bg-pink-400/20"
      seo={{
        whatIs: `The AI Social Media Generator (Template) is a free browser-based template generator that creates social media content including Instagram captions, Facebook posts, LinkedIn posts, tweets, Pinterest pin titles and descriptions, hashtags, and social media bios. All generation happens locally in your browser using predefined templates and rule-based logic — no AI models, no paid APIs, no server calls.`,
        howTo: [
          'Select a social media mode from the dropdown (e.g., Instagram Caption, Tweet Generator, Hashtag Generator).',
          'Enter your post topic, niche, or interests in the field provided.',
          'Click Generate to create the social media content using templates.',
          'Review the generated result and edit if needed.',
          'Copy the result to your clipboard and paste into your social platform.'
        ],
        benefits: [
          { title: '8 social media tools in one', description: 'Access Instagram, Facebook, LinkedIn, Twitter, Pinterest captions, hashtags, and bios from a single interface.' },
          { title: 'Free and unlimited', description: 'Use all modes as many times as you want, completely free with no sign-up required.' },
          { title: 'Privacy first', description: 'All processing happens in your browser. Your data never leaves your device.' },
          { title: 'Platform-optimized templates', description: 'Templates tailored for each social platform\'s best practices and character limits.' },
          { title: 'Works on any device', description: 'Fully responsive and works on desktop, tablet, and mobile browsers.' }
        ],
        faqs: [
          { q: 'Is the AI Social Media Generator free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
          { q: 'Does this tool use AI?', a: 'No. This is a template-based generator that uses predefined patterns and rule-based logic. It does not use any AI models, LLMs, or paid APIs.' },
          { q: 'How many social media modes are included?', a: '8 modes: Instagram Caption, Facebook Caption, LinkedIn Post, Tweet Generator, Pinterest Pin Title, Pinterest Description, Hashtag Generator, and Social Bio Generator.' },
          { q: 'Does the tool include hashtags?', a: 'Yes, the Hashtag Generator mode creates relevant hashtags for any niche, and other modes include platform-appropriate hashtags.' },
          { q: 'Does the tool work on mobile?', a: 'Yes, the tool is fully responsive and works on any modern mobile browser.' },
          { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' }
        ],
      }}
    >
      <ConsolidatedAiGenerator slug="ai-social-media" />
    </ToolPageTemplate>
  );
}