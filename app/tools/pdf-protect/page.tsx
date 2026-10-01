import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { PdfProtect } from '@/components/pdf/pdf-tools-extra';

export const metadata = buildToolMetadata(
  'pdf-protect',
  'PDF Protect (Metadata Only)',
  'Add a password as metadata to your PDF. Note: pdf-lib does not support real encryption — the password is stored as metadata only and does not restrict access.'
);

const relatedSlugs = ['pdf-unlock', 'pdf-merge', 'pdf-compress'];

export default function PdfProtectPage() {
  return (
    <ToolPageTemplate
      slug="pdf-protect"
      relatedSlugs={relatedSlugs}
      blurColor="bg-red-400/20"
      seo={{
        whatIs: `The PDF Protect (Metadata Only) tool adds a password as document metadata to PDF files. <strong>Important:</strong> The current implementation uses pdf-lib v1.17.1, which does <strong>not support PDF encryption</strong>. The password is stored as document metadata but does <strong>not restrict access</strong> to the file. Anyone can open the PDF without entering the password. This tool is provided for metadata tagging purposes only. For real PDF encryption with password protection, use a tool with proper encryption support (e.g., qpdf, Adobe Acrobat, or server-side PDF engines). All processing happens locally in your browser with no uploads, no registration, and no paid APIs.`,
        howTo: [
          'Upload a PDF file by dragging it into the upload area or clicking to browse.',
          'Enter a password that will be stored as document metadata (note: this does NOT encrypt the file).',
          'Click "Save PDF (No Encryption)" to generate a PDF with the password stored as metadata.',
          'Download the resulting PDF. Note: the file can be opened without the password.',
        ],
        benefits: [
          { title: 'Free and unlimited', description: 'Use this tool as many times as you want, completely free with no sign-up required.' },
          { title: 'Privacy first', description: 'All processing happens in your browser. Your PDF never leaves your device.' },
          { title: 'Technically honest', description: 'The tool clearly states that no real encryption is applied — only metadata storage.' },
          { title: 'Metadata tagging', description: 'Useful for adding password metadata for workflow/organizational purposes.' },
          { title: 'Works on any device', description: 'Fully responsive and works on desktop, tablet, and mobile browsers.' },
        ],
        faqs: [
          { q: 'Does this tool actually encrypt my PDF with a password?', a: 'No. The pdf-lib library (v1.17.1) does not support PDF encryption. The password is stored as document metadata only and does not restrict file access. Anyone can open the PDF without the password.' },
          { q: 'Why does this tool exist if it does not encrypt?', a: 'It serves as a metadata tagging tool for workflows where you want to mark a PDF as "password intended" but handle actual encryption elsewhere (e.g., server-side). It is clearly labeled to avoid false expectations.' },
          { q: 'Can I use this for sensitive documents?', a: 'Do not rely on this for security. The output PDF can be opened by anyone. For real protection, use Adobe Acrobat, qpdf, or a server-side PDF engine with encryption support.' },
          { q: 'Will real encryption be added later?', a: 'Real PDF encryption requires a library that supports it (e.g., pdf-lib with encryption extensions, or a different library entirely). This is a known limitation of the current dependencies.' },
          { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' },
          { q: 'Do I need to install any software?', a: 'No. The tool runs entirely in your browser with no downloads or plugins required.' },
        ],
      }}
    >
      <PdfProtect />
    </ToolPageTemplate>
  );
}