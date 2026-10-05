import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { OfficeTool } from '@/components/office/office-tool';
import { officeToolConfigs } from '@/lib/office-configs';

export const metadata = buildToolMetadata(
  'docx-editor',
  'DOCX Text Editor',
  'Edit text content of Word documents in your browser.'
);

const relatedSlugs = ['docx-viewer', 'csv-editor', 'word-to-pdf'];

export default function DocxEditorPage() {
  return (
    <ToolPageTemplate
      slug="docx-editor"
      relatedSlugs={relatedSlugs}
      blurColor="bg-indigo-400/20"
      seo={{
        whatIs: `The DOCX Text Editor allows you to extract, edit, and save text content from Word (.docx, .doc) files in your browser. It does not preserve complex formatting, styles, or layout — it works with the text content only. For full document editing with formatting, you would need Microsoft Word or a compatible editor. All processing happens locally in your browser.`,
        howTo: [
          'Upload a .docx or .doc file.',
          'Click Edit to extract and view the text content.',
          'Modify the text as needed.',
          'Download the edited text as a new .docx file.'
        ],
        benefits: [
          { title: 'Free and unlimited', description: 'Use this tool as many times as you want, completely free with no sign-up required.' },
          { title: 'Privacy first', description: 'All processing happens in your browser. Your data never leaves your device.' },
          { title: 'Text editing', description: 'Edit the text content of documents.' },
          { title: 'No software needed', description: 'Runs entirely in your browser with no downloads or plugins required.' },
        ],
        faqs: [
          { q: 'Is the DOCX Text Editor free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
          { q: 'Does it preserve formatting and styles?', a: 'No. This tool works with text content only. Complex formatting, styles, images, tables, and layout are not preserved.' },
          { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' },
          { q: 'What file formats are supported?', a: 'Input: .docx, .doc. Output: .docx (text content only).' },
        ],
      }}
    >
      <OfficeTool config={officeToolConfigs['docx-editor']} />
    </ToolPageTemplate>
  );
}
