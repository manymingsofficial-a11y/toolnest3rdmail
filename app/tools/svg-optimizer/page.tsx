import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { DesignTool } from '@/components/design/design-tool';
import { designToolConfigs } from '@/lib/design-configs';

export const metadata = buildToolMetadata(
  'svg-optimizer',
  'SVG Optimizer',
  'Minify and optimize SVG files for the web.'
);

const relatedSlugs = ['svg-viewer', 'svg-to-png', 'css-minifier'];

export default function SvgOptimizerPage() {
  return (
    <ToolPageTemplate
      slug="svg-optimizer"
      relatedSlugs={relatedSlugs}
      blurColor="bg-purple-400/20"
      seo={{
        whatIs: `The SVG Optimizer is a free online tool that works entirely in your browser. ToolNest's SVG Optimizer lets you minify and optimize svg files for the web. All processing happens locally — no uploads, no registration, no paid APIs.`,
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
        { q: 'Is the SVG Optimizer free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
        { q: 'Does the SVG Optimizer work on mobile?', a: 'Yes, the tool is fully responsive and works on any modern mobile browser.' },
        { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' },
        { q: 'Do I need to install any software?', a: 'No. The SVG Optimizer runs entirely in your browser with no downloads or plugins required.' },
      ],
      }}
    >
      <DesignTool config={designToolConfigs['svg-optimizer']} />
    </ToolPageTemplate>
  );
}
