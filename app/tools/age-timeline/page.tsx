import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { ProductivityTool } from '@/components/productivity/productivity-tool';
import { productivityToolConfigs } from '@/lib/productivity-configs';

export const metadata = buildToolMetadata(
  'age-timeline',
  'Age Timeline',
  'Visualize your life timeline in weeks.'
);

const relatedSlugs = ['calendar', 'business-day-calculator', 'age-calculator'];

export default function AgeTimelinePage() {
  return (
    <ToolPageTemplate
      slug="age-timeline"
      relatedSlugs={relatedSlugs}
      blurColor="bg-orange-400/20"
      seo={{
        whatIs: `The Age Timeline is a free online tool that works entirely in your browser. ToolNest's Age Timeline lets you visualize your life timeline in weeks. All processing happens locally — no uploads, no registration, no paid APIs.`,
        howTo: [
        'Upload your file or enter your input.',
        'Adjust any settings if needed.',
        'Click the action button to process.',
        'Download or copy the result.',
      ],
        benefits: [
        { title: 'Free and unlimited', description: 'Use this tool as many times as you want, completely free with no sign-up required.' },
        { title: 'Privacy first', description: 'All processing happens in your browser. Your data never leaves your device.' },
        { title: 'Fast and easy', description: 'No learning curve. Open the tool, use it, and get your result instantly.' },
        { title: 'Works on any device', description: 'Fully responsive and works on desktop, tablet, and mobile browsers.' },
      ],
        faqs: [
        { q: 'Is the Age Timeline free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
        { q: 'Does the Age Timeline work on mobile?', a: 'Yes, the tool is fully responsive and works on any modern mobile browser.' },
        { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' },
        { q: 'Do I need to install any software?', a: 'No. The Age Timeline runs entirely in your browser with no downloads or plugins required.' },
      ],
      }}
    >
      <ProductivityTool config={productivityToolConfigs['age-timeline']} />
    </ToolPageTemplate>
  );
}
