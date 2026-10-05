import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { OfficeTool } from '@/components/office/office-tool';
import { officeToolConfigs } from '@/lib/office-configs';

export const metadata = buildToolMetadata(
  'docx-viewer',
  'DOCX Text Extractor',
  'Extract text content from Word documents in your browser.'
);

const relatedSlugs = ['docx-editor', 'excel-viewer', 'csv-viewer'];

export default function DocxViewerPage() {
  return (
    <ToolPageTemplate
      slug="docx-viewer"
      relatedSlugs={relatedSlugs}
      blurColor="bg-blue-400/20"
      seo={{
        whatIs: `The DOCX Text Extractor extracts text content from Word (.docx, .doc) files in your browser. It does not render the document with formatting — it extracts the text content for viewing and copying. For full document rendering with formatting, you would need Microsoft Word or a compatible viewer. All processing happens locally in your browser.`,
        howTo: [
          'Upload a .docx or .doc file.',
          'Click View to extract text content.',
          'Copy or download the extracted text.'
        ],
        benefits: [
          { title: 'Free and unlimited', description: 'Use this tool as many times as you want, completely free with no sign-up required.' },
          { title: 'Privacy first', description: 'All processing happens in your browser. Your data never leaves your device.' },
          { title: 'Text extraction', description: 'Extracts text content from documents for searching and copying.' },
          { title: 'No software needed', description: 'Runs entirely in your browser with no downloads or plugins required.' },
        ],
        faqs: [
          { q: 'Is the DOCX Text Extractor free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
          { q: 'Does it render documents with formatting?', a: 'No. This tool extracts text content only. It does not render document layouts, images, tables, or formatting visually.' },
          { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' },
          { q: 'What file formats are supported?', a: 'Input: .docx, .doc. Output: Plain text (.txt).' },
        ],
      }}
    >
      <OfficeTool config={officeToolConfigs['docx-viewer']} />
    </ToolPageTemplate>
  );
}
