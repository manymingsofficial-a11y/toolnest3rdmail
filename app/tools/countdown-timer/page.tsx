import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { ProductivityTool } from '@/components/productivity/productivity-tool';
import { productivityToolConfigs } from '@/lib/productivity-configs';

export const metadata = buildToolMetadata(
  'countdown-timer',
  'Countdown Timer',
  'Set a countdown to any date or event.'
);

const relatedSlugs = ['pomodoro-timer', 'stopwatch', 'timezone-converter'];

export default function CountdownTimerPage() {
  return (
    <ToolPageTemplate
      slug="countdown-timer"
      relatedSlugs={relatedSlugs}
      blurColor="bg-amber-400/20"
      seo={{
        whatIs: `The Countdown Timer is a free online tool that works entirely in your browser. ToolNest's Countdown Timer lets you set a countdown to any date or event. All processing happens locally — no uploads, no registration, no paid APIs.`,
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
        { q: 'Is the Countdown Timer free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
        { q: 'Does the Countdown Timer work on mobile?', a: 'Yes, the tool is fully responsive and works on any modern mobile browser.' },
        { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' },
        { q: 'Do I need to install any software?', a: 'No. The Countdown Timer runs entirely in your browser with no downloads or plugins required.' },
      ],
      }}
    >
      <ProductivityTool config={productivityToolConfigs['countdown-timer']} />
    </ToolPageTemplate>
  );
}
