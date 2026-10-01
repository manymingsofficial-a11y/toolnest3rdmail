import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { PngToSvg } from '@/components/design/png-to-svg';

export const metadata = buildToolMetadata(
  'png-to-svg',
  'PNG to SVG',
  'Convert PNG images to SVG container format while preserving the original image. Free, fast, runs in your browser.'
);

const relatedSlugs = ['svg-to-png', 'svg-optimizer', 'image-converter'];

export default function PngToSvgPage() {
  return (
    <ToolPageTemplate
      slug="png-to-svg"
      relatedSlugs={relatedSlugs}
      blurColor="bg-violet-400/20"
      seo={{
        whatIs: `The PNG to SVG tool converts PNG images to an SVG container format. The PNG is embedded as a data URI inside a valid SVG document with the correct intrinsic dimensions, viewBox, and image element. The visual appearance is identical to the source PNG. This is not vectorization — the raster pixels are not traced into paths. The output is a self-contained SVG file that displays the original PNG image. All processing happens locally in your browser with no uploads, no registration, and no paid APIs.`,
        howTo: [
          'Upload a PNG file by dragging it into the upload area or clicking to browse.',
          'Review the note explaining that this wraps the PNG in an SVG container — no vectorization occurs.',
          'Click "Convert PNG to SVG" to generate a self-contained SVG file containing your PNG as a data URI.',
          'Preview the SVG and download it with the .svg extension.',
        ],
        benefits: [
          { title: 'Free and unlimited', description: 'Use this tool as many times as you want, completely free with no sign-up required.' },
          { title: 'Privacy first', description: 'All processing happens in your browser. Your image never leaves your device.' },
          { title: 'Technically honest', description: 'The tool does not claim vectorization. The PNG is embedded as-is in a valid SVG container.' },
          { title: 'Correct SVG output', description: 'Output includes proper width, height, viewBox, and image element with data URI.' },
          { title: 'Works on any device', description: 'Fully responsive and works on desktop, tablet, and mobile browsers.' },
        ],
        faqs: [
          { q: 'Is the PNG to SVG tool free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
          { q: 'Does this convert my PNG to vector paths?', a: 'No. This tool wraps the PNG in an SVG container with the image embedded as a data URI. The output is visually identical to the input but is not vectorized. For true vectorization, use a dedicated tracing tool.' },
          { q: 'What is the output format?', a: 'A valid SVG file (image/svg+xml) containing an <image> element with your PNG embedded as a base64 data URI.' },
          { q: 'Will the SVG look different from my PNG?', a: 'No. The SVG renders the embedded PNG at its original dimensions. Visual appearance is identical.' },
          { q: 'What input format is supported?', a: 'PNG only.' },
          { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' },
          { q: 'Do I need to install any software?', a: 'No. The tool runs entirely in your browser with no downloads or plugins required.' },
        ],
      }}
    >
      <PngToSvg />
    </ToolPageTemplate>
  );
}