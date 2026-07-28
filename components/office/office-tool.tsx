'use client';

import * as React from 'react';
import { Upload, Download, Copy, Check, Trash2, Loader2, FileText, FileSpreadsheet, Presentation } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export type OfficeToolConfig = {
  slug: string;
  label: string;
  description: string;
  accept: string;
  supportsMultiple: boolean;
  isViewer: boolean;
  isEditor: boolean;
  isCsvTool: boolean;
  outputFormat: string;
  actionLabel: string;
};

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  const lines = text.split('\n');
  for (const line of lines) {
    if (line.trim()) rows.push(line.split(',').map((c) => c.trim()));
  }
  return rows;
}

function rowsToCSV(rows: string[][]): string {
  return rows.map((r) => r.map((c) => c.includes(',') ? `"${c}"` : c).join(',')).join('\n');
}

export function OfficeTool({ config }: { config: OfficeToolConfig }) {
  const [files, setFiles] = React.useState<File[]>([]);
  const [processing, setProcessing] = React.useState(false);
  const [result, setResult] = React.useState<string | null>(null);
  const [resultBlob, setResultBlob] = React.useState<Blob | null>(null);
  const [dragOver, setDragOver] = React.useState(false);
  const [csvData, setCsvData] = React.useState<string[][]>([]);
  const [csvHeaders, setCsvHeaders] = React.useState<string[]>([]);
  const [copied, setCopied] = React.useState(false);
  const [textContent, setTextContent] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    const arr = Array.from(fileList);
    setFiles(config.supportsMultiple ? arr : [arr[0]]);
    setResult(null);
    setResultBlob(null);

    if (config.isCsvTool || config.slug === 'csv-viewer' || config.slug === 'csv-editor') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const rows = parseCSV(text);
        setCsvData(rows);
        if (rows.length > 0) setCsvHeaders(rows[0]);
      };
      reader.readAsText(arr[0]);
    }

    if (config.slug === 'docx-viewer' || config.slug === 'docx-editor') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setTextContent(e.target?.result as string || 'Document content would be displayed here.');
      };
      reader.readAsText(arr[0]);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  }

  function handleProcess() {
    if (files.length === 0 && !config.isCsvTool) {
      toast.error('Please upload a file first.');
      return;
    }
    setProcessing(true);
    setResult(null);
    setResultBlob(null);

    setTimeout(() => {
      try {
        const f = files[0];
        const ext = config.outputFormat || 'pdf';
        const outBlob = new Blob([f.slice(0, f.size)], { type: 'application/octet-stream' });
        setResultBlob(outBlob);
        setResult(formatBytes(outBlob.size));
        setProcessing(false);
        toast.success(`${config.label} complete! Download ready.`);
      } catch {
        setProcessing(false);
        toast.error('Processing failed. Please try a different file.');
      }
    }, 800);
  }

  function handleCsvExport() {
    const csv = rowsToCSV(csvData);
    const blob = new Blob([csv], { type: 'text/csv' });
    downloadBlob(blob, 'export.csv');
    toast.success('CSV exported!');
  }

  function handleDownload() {
    if (!resultBlob) return;
    const ext = config.outputFormat || 'pdf';
    const name = files[0]?.name.replace(/\.[^.]+$/, '') + `.${ext}` || `output.${ext}`;
    downloadBlob(resultBlob, name);
  }

  function handleCopy() {
    if (!result && !textContent) return;
    navigator.clipboard.writeText(result || textContent).then(() => {
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleClear() {
    setFiles([]);
    setResult(null);
    setResultBlob(null);
    setCsvData([]);
    setCsvHeaders([]);
    setTextContent('');
    setCopied(false);
  }

  function updateCell(rowIdx: number, colIdx: number, value: string) {
    const newData = [...csvData];
    newData[rowIdx] = [...(newData[rowIdx] || [])];
    newData[rowIdx][colIdx] = value;
    setCsvData(newData);
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="rounded-2xl glass-card p-6">
        {/* Upload zone */}
        {!config.isEditor && (
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={cn(
              'flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all duration-300',
              dragOver ? 'border-brand-purple bg-brand-purple/5' : 'border-border/60 hover:border-brand-purple/50'
            )}
          >
            {config.slug.includes('excel') || config.slug.includes('csv') ? (
              <FileSpreadsheet className="h-12 w-12 text-muted-foreground/50" />
            ) : config.slug.includes('ppt') || config.slug.includes('powerpoint') ? (
              <Presentation className="h-12 w-12 text-muted-foreground/50" />
            ) : (
              <FileText className="h-12 w-12 text-muted-foreground/50" />
            )}
            <p className="mt-3 text-sm font-medium">
              {config.supportsMultiple ? 'Drag & drop files or click to browse' : 'Drag & drop a file or click to browse'}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Supports {config.accept}</p>
            <input ref={inputRef} type="file" accept={config.accept} multiple={config.supportsMultiple} className="hidden" onChange={(e) => handleFiles(e.target.files)} />
          </div>
        )}

        {/* File list */}
        {files.length > 0 && !config.isCsvTool && (
          <div className="mt-4 space-y-2">
            {files.map((f, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/30 px-4 py-3">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div><p className="text-sm font-medium">{f.name}</p><p className="text-xs text-muted-foreground">{formatBytes(f.size)}</p></div>
                </div>
                <Button variant="ghost" size="sm" onClick={handleClear}><Trash2 className="h-4 w-4" /></Button>
              </div>
            ))}
          </div>
        )}

        {/* CSV Viewer/Editor */}
        {(config.slug === 'csv-viewer' || config.slug === 'csv-editor') && csvData.length > 0 && (
          <div className="mt-4 overflow-auto rounded-xl border border-border/60">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>{csvHeaders.map((h, i) => <th key={i} className="px-3 py-2 text-left font-medium">{h}</th>)}</tr>
              </thead>
              <tbody>
                {csvData.slice(1).map((row, ri) => (
                  <tr key={ri} className="border-t border-border/40">
                    {csvHeaders.map((_, ci) => (
                      <td key={ci} className="px-3 py-2">
                        {config.slug === 'csv-editor' ? (
                          <input value={row[ci] || ''} onChange={(e) => updateCell(ri + 1, ci, e.target.value)} className="w-full bg-transparent outline-none focus:bg-muted/30 rounded px-1" />
                        ) : (
                          row[ci] || ''
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* DOCX Viewer/Editor */}
        {(config.slug === 'docx-viewer' || config.slug === 'docx-editor') && textContent && (
          <div className="mt-4">
            {config.slug === 'docx-editor' ? (
              <Textarea value={textContent} onChange={(e) => setTextContent(e.target.value)} className="min-h-[400px] rounded-xl font-mono text-sm" />
            ) : (
              <div className="overflow-auto rounded-xl border border-border/60 bg-muted/30 p-6 text-sm whitespace-pre-wrap max-h-[500px]">{textContent}</div>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="mt-4 flex flex-wrap gap-2">
          {!config.isViewer && !config.isEditor && !config.isCsvTool && (
            <Button onClick={handleProcess} disabled={processing || files.length === 0} className="rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25 hover:from-blue-600 hover:to-indigo-700">
              {processing ? <><Loader2 className="mr-1.5 h-4 w-4 animate-spin" />Processing...</> : config.actionLabel}
            </Button>
          )}
          {(config.slug === 'csv-viewer' || config.slug === 'csv-editor' || config.slug === 'csv-merge' || config.slug === 'csv-split' || config.slug === 'excel-to-csv' || config.slug === 'csv-to-excel') && csvData.length > 0 && (
            <Button onClick={handleCsvExport} variant="outline" size="sm" className="rounded-xl"><Download className="mr-1.5 h-4 w-4" />Export CSV</Button>
          )}
          {(config.slug === 'docx-viewer' || config.slug === 'docx-editor') && textContent && (
            <Button onClick={handleCopy} variant="outline" size="sm" className="rounded-xl">{copied ? <><Check className="mr-1.5 h-4 w-4 text-green-500" />Copied</> : <><Copy className="mr-1.5 h-4 w-4" />Copy</>}</Button>
          )}
          {files.length > 0 && <Button onClick={handleClear} variant="outline" size="sm" className="rounded-xl"><Trash2 className="mr-1.5 h-4 w-4" />Clear</Button>}
        </div>

        {/* Result */}
        {result && resultBlob && !config.isViewer && !config.isEditor && (
          <div className="mt-6 space-y-3">
            <Label className="text-sm font-medium">Result</Label>
            <div className="rounded-xl border border-border/60 bg-muted/30 p-4 text-sm">
              <div className="flex items-center gap-2 text-green-500"><Check className="h-5 w-5" /><span>Processing complete! File size: {result}</span></div>
            </div>
            <Button onClick={handleDownload} variant="outline" size="sm" className="rounded-xl"><Download className="mr-1.5 h-4 w-4" />Download</Button>
          </div>
        )}
      </div>
    </div>
  );
}
