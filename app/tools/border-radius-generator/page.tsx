import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { DesignTool } from '@/components/design/design-tool';
import { designToolConfigs } from '@/lib/design-configs';

export const metadata = buildToolMetadata(
  'border-radius-generator',
  'Border Radius Generator',
  'Generate border-radius CSS with visual preview.'
);

const relatedSlugs = ['css-button-generator', 'css-shadow-generator', 'css-gradient-generator'];

export default function BorderRadiusGeneratorPage() {
  return (
    <ToolPageTemplate
      slug="border-radius-generator"
      relatedSlugs={relatedSlugs}
      blurColor="bg-teal-400/20"
      seo={{
        whatIs: `The Border Radius Generator is a free online tool that works entirely in your browser. ToolNest's Border Radius Generator lets you generate border-radius css with visual preview. All processing happens locally — no uploads, no registration, no paid APIs.`,
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
        { q: 'Is the Border Radius Generator free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
        { q: 'Does the Border Radius Generator work on mobile?', a: 'Yes, the tool is fully responsive and works on any modern mobile browser.' },
        { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' },
        { q: 'Do I need to install any software?', a: 'No. The Border Radius Generator runs entirely in your browser with no downloads or plugins required.' },
      ],
      }}
    >
      <DesignTool config={designToolConfigs['border-radius-generator']} />
    </ToolPageTemplate>
  );
}
