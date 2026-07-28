import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { DesignTool } from '@/components/design/design-tool';
import { designToolConfigs } from '@/lib/design-configs';

export const metadata = buildToolMetadata(
  'image-placeholder-generator',
  'Image Placeholder Generator',
  'Generate placeholder images for mockups and prototypes.'
);

const relatedSlugs = ['favicon-generator', 'image-resizer', 'color-palette-generator'];

export default function ImagePlaceholderGeneratorPage() {
  return (
    <ToolPageTemplate
      slug="image-placeholder-generator"
      relatedSlugs={relatedSlugs}
      blurColor="bg-pink-400/20"
      seo={{
        whatIs: `The Image Placeholder Generator is a free online tool that works entirely in your browser. ToolNest's Image Placeholder Generator lets you generate placeholder images for mockups and prototypes. All processing happens locally — no uploads, no registration, no paid APIs.`,
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
        { q: 'Is the Image Placeholder Generator free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
        { q: 'Does the Image Placeholder Generator work on mobile?', a: 'Yes, the tool is fully responsive and works on any modern mobile browser.' },
        { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' },
        { q: 'Do I need to install any software?', a: 'No. The Image Placeholder Generator runs entirely in your browser with no downloads or plugins required.' },
      ],
      }}
    >
      <DesignTool config={designToolConfigs['image-placeholder-generator']} />
    </ToolPageTemplate>
  );
}
