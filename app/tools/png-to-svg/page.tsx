import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { DesignTool } from '@/components/design/design-tool';
import { designToolConfigs } from '@/lib/design-configs';

export const metadata = buildToolMetadata(
  'png-to-svg',
  'PNG to SVG',
  'Convert PNG images to SVG vector format.'
);

const relatedSlugs = ['svg-to-png', 'svg-optimizer', 'image-converter'];

export default function PngToSvgPage() {
  return (
    <ToolPageTemplate
      slug="png-to-svg"
      relatedSlugs={relatedSlugs}
      blurColor="bg-violet-400/20"
      seo={{
        whatIs: `The PNG to SVG is a free online tool that works entirely in your browser. ToolNest's PNG to SVG lets you convert png images to svg vector format. All processing happens locally — no uploads, no registration, no paid APIs.`,
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
        { q: 'Is the PNG to SVG free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
        { q: 'Does the PNG to SVG work on mobile?', a: 'Yes, the tool is fully responsive and works on any modern mobile browser.' },
        { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' },
        { q: 'Do I need to install any software?', a: 'No. The PNG to SVG runs entirely in your browser with no downloads or plugins required.' },
      ],
      }}
    >
      <DesignTool config={designToolConfigs['png-to-svg']} />
    </ToolPageTemplate>
  );
}
