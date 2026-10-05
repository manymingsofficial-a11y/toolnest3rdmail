import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { BackgroundRemover } from '@/components/image/image-tools-extra';

export const metadata = buildToolMetadata(
  'background-remover',
  'Background Color Remover',
  'Remove solid-color backgrounds from images using color threshold.'
);

const relatedSlugs = ['image-compressor', 'image-converter', 'image-resizer'];

export default function BackgroundRemoverPage() {
  return (
    <ToolPageTemplate
      slug="background-remover"
      relatedSlugs={relatedSlugs}
      blurColor="bg-fuchsia-400/20"
      seo={{
        whatIs: `The Background Color Remover removes solid-color backgrounds from images by making pixels within a color threshold transparent. It works best for images with uniform backgrounds (like product photos on white). For complex backgrounds, a machine learning-based tool would be needed. All processing happens locally in your browser.`,
        howTo: [
          'Upload an image with a solid-color background.',
          'Adjust the background color and threshold if needed.',
          'Click Remove Background to make matching pixels transparent.',
          'Download the result as a PNG with transparency.'
        ],
        benefits: [
          { title: 'Free and unlimited', description: 'Use this tool as many times as you want, completely free with no sign-up required.' },
          { title: 'Privacy first', description: 'All processing happens in your browser. Your data never leaves your device.' },
          { title: 'Works on solid backgrounds', description: 'Best for product photos, logos, and graphics with uniform backgrounds.' },
          { title: 'No ML model required', description: 'Runs entirely in-browser with no heavy dependencies or external APIs.' },
        ],
        faqs: [
          { q: 'Is the Background Color Remover free to use?', a: 'Yes, it is completely free with no limits, no registration, and no watermarks.' },
          { q: 'Does the tool upload my data?', a: 'No. All processing happens locally in your browser. Your data is never sent to a server.' },
          { q: 'Does it work on complex backgrounds?', a: 'This tool works best on solid, uniform backgrounds. For complex backgrounds (people, scenes, gradients), you would need an ML-based background remover which is not currently available in this tool.' },
          { q: 'What file formats are supported?', a: 'Input: PNG, JPG, WebP. Output: PNG (to preserve transparency).' },
        ],
      }}
    >
      <BackgroundRemover />
    </ToolPageTemplate>
  );
}
