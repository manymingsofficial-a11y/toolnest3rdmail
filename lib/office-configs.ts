import type { OfficeToolConfig } from '@/components/office/office-tool';

export const officeToolConfigs: Record<string, OfficeToolConfig> = {
  'word-to-pdf': { slug: 'word-to-pdf', label: 'Word to PDF', description: 'Convert DOCX to PDF', accept: '.docx,.doc', supportsMultiple: false, isViewer: false, isEditor: false, isCsvTool: false, outputFormat: 'pdf', actionLabel: 'Convert to PDF' },
  'excel-to-pdf': { slug: 'excel-to-pdf', label: 'Excel to PDF', description: 'Convert XLSX to PDF', accept: '.xlsx,.xls', supportsMultiple: false, isViewer: false, isEditor: false, isCsvTool: false, outputFormat: 'pdf', actionLabel: 'Convert to PDF' },
  'powerpoint-to-pdf': { slug: 'powerpoint-to-pdf', label: 'PowerPoint to PDF', description: 'Convert PPTX to PDF', accept: '.pptx,.ppt', supportsMultiple: false, isViewer: false, isEditor: false, isCsvTool: false, outputFormat: 'pdf', actionLabel: 'Convert to PDF' },
  'pdf-to-word': { slug: 'pdf-to-word', label: 'PDF to Word', description: 'Convert PDF to DOCX', accept: '.pdf', supportsMultiple: false, isViewer: false, isEditor: false, isCsvTool: false, outputFormat: 'docx', actionLabel: 'Convert to Word' },
  'pdf-to-excel': { slug: 'pdf-to-excel', label: 'PDF to Excel', description: 'Convert PDF to XLSX', accept: '.pdf', supportsMultiple: false, isViewer: false, isEditor: false, isCsvTool: false, outputFormat: 'xlsx', actionLabel: 'Convert to Excel' },
  'pdf-to-powerpoint': { slug: 'pdf-to-powerpoint', label: 'PDF to PowerPoint', description: 'Convert PDF to PPTX', accept: '.pdf', supportsMultiple: false, isViewer: false, isEditor: false, isCsvTool: false, outputFormat: 'pptx', actionLabel: 'Convert to PPT' },
  'docx-viewer': { slug: 'docx-viewer', label: 'DOCX Viewer', description: 'View DOCX', accept: '.docx,.doc', supportsMultiple: false, isViewer: true, isEditor: false, isCsvTool: false, outputFormat: 'txt', actionLabel: 'View' },
  'docx-editor': { slug: 'docx-editor', label: 'DOCX Editor', description: 'Edit DOCX', accept: '.docx,.doc', supportsMultiple: false, isViewer: false, isEditor: true, isCsvTool: false, outputFormat: 'docx', actionLabel: 'Edit' },
  'excel-viewer': { slug: 'excel-viewer', label: 'Excel Viewer', description: 'View XLSX', accept: '.xlsx,.xls', supportsMultiple: false, isViewer: true, isEditor: false, isCsvTool: false, outputFormat: 'txt', actionLabel: 'View' },
  'csv-viewer': { slug: 'csv-viewer', label: 'CSV Viewer', description: 'View CSV', accept: '.csv', supportsMultiple: false, isViewer: true, isEditor: false, isCsvTool: true, outputFormat: 'csv', actionLabel: 'View' },
  'csv-editor': { slug: 'csv-editor', label: 'CSV Editor', description: 'Edit CSV', accept: '.csv', supportsMultiple: false, isViewer: false, isEditor: true, isCsvTool: true, outputFormat: 'csv', actionLabel: 'Edit' },
  'csv-merge': { slug: 'csv-merge', label: 'CSV Merge', description: 'Merge CSV files', accept: '.csv', supportsMultiple: true, isViewer: false, isEditor: false, isCsvTool: true, outputFormat: 'csv', actionLabel: 'Merge CSV' },
  'csv-split': { slug: 'csv-split', label: 'CSV Split', description: 'Split CSV', accept: '.csv', supportsMultiple: false, isViewer: false, isEditor: false, isCsvTool: true, outputFormat: 'csv', actionLabel: 'Split CSV' },
  'excel-to-csv': { slug: 'excel-to-csv', label: 'Excel to CSV', description: 'Convert XLSX to CSV', accept: '.xlsx,.xls', supportsMultiple: false, isViewer: false, isEditor: false, isCsvTool: true, outputFormat: 'csv', actionLabel: 'Convert to CSV' },
  'csv-to-excel': { slug: 'csv-to-excel', label: 'CSV to Excel', description: 'Convert CSV to XLSX', accept: '.csv', supportsMultiple: false, isViewer: false, isEditor: false, isCsvTool: true, outputFormat: 'xlsx', actionLabel: 'Convert to Excel' },
  'ppt-viewer': { slug: 'ppt-viewer', label: 'PPT Viewer', description: 'View PPTX', accept: '.pptx,.ppt', supportsMultiple: false, isViewer: true, isEditor: false, isCsvTool: false, outputFormat: 'txt', actionLabel: 'View' },
};
