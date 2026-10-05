import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { OfficeTool } from '@/components/office/office-tool';
import { officeToolConfigs } from '@/lib/office-configs';

export const metadata = buildToolMetadata(
  'ppt-viewer',
  'PPT File Viewer',
  'Extract text content from PowerPoint files in your browser.'
);

const relatedSlugs = ['docx-viewer', 'excel-viewer', 'powerpoint-to-pdf'];

export default function PptViewerPage() {
  return (
    <ToolPageTemplate
      slug="ppt-viewer"
      relatedSlugs={relatedSlugs}
      blurColor="bg-orange-400/20"
      seo={{
        whatIs: `The PPT File Viewer extracts text content from PowerPoint (.pptx) files in your browser. It does not render slides visually — it extracts the text content for viewing and copying. For full slide rendering, you would need Microsoft PowerPoint or a compatible viewer. All processing happens locally in your browser.`,
        howTo: [
          'Upload a .pptx or .ppt file.',
          'Click View to extract text content.',
          'Copy or download the extracted text.'
        ],
        benefits: [
          { title: 'Free and unlimited', description: 'Use this tool as many times as you want, completely free with no sign-up required.' },
          { title: 'Privacy first', description: 'All processing happens in your browser. Your data never leaves your device.' },
          { title: 'Text extraction', description: 'Extracts text content from slides for searching and copying.' },
          { title: 'No software needed', description: 'Runs entirely in your browser with no downloads or plugins required.' },
        ],
        faqs: [
          { q: 'Is the PPT File Viewer free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
          { q: 'Does it render slides visually?', a: 'No. This tool extracts text content only. It does not render slide layouts, images, or formatting visually.' },
          { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' },
          { q: 'What file formats are supported?', a: 'Input: .pptx, .ppt. Output: Plain text (.txt).' },
        ],
      }}
    >
      <OfficeTool config={officeToolConfigs['ppt-viewer']} />
    </ToolPageTemplate>
  );
}
