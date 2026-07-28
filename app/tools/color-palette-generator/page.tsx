import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { DesignTool } from '@/components/design/design-tool';
import { designToolConfigs } from '@/lib/design-configs';

export const metadata = buildToolMetadata(
  'color-palette-generator',
  'Color Palette Generator',
  'Generate beautiful color palettes from any base color.'
);

const relatedSlugs = ['gradient-generator', 'css-gradient-generator', 'css-shadow-generator'];

export default function ColorPaletteGeneratorPage() {
  return (
    <ToolPageTemplate
      slug="color-palette-generator"
      relatedSlugs={relatedSlugs}
      blurColor="bg-fuchsia-400/20"
      seo={{
        whatIs: `The Color Palette Generator is a free online tool that works entirely in your browser. ToolNest's Color Palette Generator lets you generate beautiful color palettes from any base color. All processing happens locally — no uploads, no registration, no paid APIs.`,
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
        { q: 'Is the Color Palette Generator free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
        { q: 'Does the Color Palette Generator work on mobile?', a: 'Yes, the tool is fully responsive and works on any modern mobile browser.' },
        { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' },
        { q: 'Do I need to install any software?', a: 'No. The Color Palette Generator runs entirely in your browser with no downloads or plugins required.' },
      ],
      }}
    >
      <DesignTool config={designToolConfigs['color-palette-generator']} />
    </ToolPageTemplate>
  );
}
