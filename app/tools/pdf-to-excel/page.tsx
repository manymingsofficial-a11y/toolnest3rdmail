import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { OfficeTool } from '@/components/office/office-tool';
import { officeToolConfigs } from '@/lib/office-configs';

export const metadata = buildToolMetadata(
  'pdf-to-excel',
  'PDF to Excel (Text Extraction)',
  'Extract text content from PDF for use in spreadsheets.'
);

const relatedSlugs = ['pdf-to-word', 'csv-viewer', 'excel-to-pdf'];

export default function PdfToExcelPage() {
  return (
    <ToolPageTemplate
      slug="pdf-to-excel"
      relatedSlugs={relatedSlugs}
      blurColor="bg-blue-400/20"
      seo={{
        whatIs: `The PDF to Excel tool extracts text content from PDF files for use in spreadsheet applications. It does not perform true table-to-spreadsheet conversion with preserved cell structure — it extracts text that you can then manually organize in Excel. For actual table extraction with preserved rows/columns, you would need a specialized PDF parsing library or service. All processing happens locally in your browser.`,
        howTo: [
          'Upload a PDF file.',
          'Click Convert to extract text content.',
          'Download the extracted text and paste into Excel manually.'
        ],
        benefits: [
          { title: 'Free and unlimited', description: 'Use this tool as many times as you want, completely free with no sign-up required.' },
          { title: 'Privacy first', description: 'All processing happens in your browser. Your data never leaves your device.' },
          { title: 'Text extraction', description: 'Extracts text content from PDF for manual organization in spreadsheets.' },
          { title: 'No software needed', description: 'Runs entirely in your browser with no downloads or plugins required.' },
        ],
        faqs: [
          { q: 'Is the PDF to Excel tool free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
          { q: 'Does it preserve table structure and cell formatting?', a: 'No. This tool extracts raw text only. It does not detect tables or preserve rows, columns, or cell formatting. You will need to manually organize the text in Excel.' },
          { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' },
          { q: 'What file formats are supported?', a: 'Input: .pdf. Output: .xlsx (text content only, no table structure).' },
        ],
      }}
    >
      <OfficeTool config={officeToolConfigs['pdf-to-excel']} />
    </ToolPageTemplate>
  );
}
