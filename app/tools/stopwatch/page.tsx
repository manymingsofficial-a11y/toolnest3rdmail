import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { ProductivityTool } from '@/components/productivity/productivity-tool';
import { productivityToolConfigs } from '@/lib/productivity-configs';

export const metadata = buildToolMetadata(
  'stopwatch',
  'Stopwatch',
  'A precise stopwatch with lap timing support.'
);

const relatedSlugs = ['pomodoro-timer', 'countdown-timer', 'to-do-list'];

export default function StopwatchPage() {
  return (
    <ToolPageTemplate
      slug="stopwatch"
      relatedSlugs={relatedSlugs}
      blurColor="bg-orange-400/20"
      seo={{
        whatIs: `The Stopwatch is a free online tool that works entirely in your browser. ToolNest's Stopwatch lets you a precise stopwatch with lap timing support. All processing happens locally — no uploads, no registration, no paid APIs.`,
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
        { q: 'Is the Stopwatch free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
        { q: 'Does the Stopwatch work on mobile?', a: 'Yes, the tool is fully responsive and works on any modern mobile browser.' },
        { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' },
        { q: 'Do I need to install any software?', a: 'No. The Stopwatch runs entirely in your browser with no downloads or plugins required.' },
      ],
      }}
    >
      <ProductivityTool config={productivityToolConfigs['stopwatch']} />
    </ToolPageTemplate>
  );
}
