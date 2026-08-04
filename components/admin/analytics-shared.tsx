'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileSpreadsheet } from 'lucide-react';

export type { TimeSeriesPoint, CategoryData, DateRange } from '@/lib/analytics-queries';

export function EmptyData({ message = 'No data available yet' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}

export function TimeRangeTabs({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: 'daily' | 'weekly' | 'monthly' | 'yearly') => void;
}) {
  const ranges: { key: 'daily' | 'weekly' | 'monthly' | 'yearly'; label: string }[] = [
    { key: 'daily', label: 'Daily' },
    { key: 'weekly', label: 'Weekly' },
    { key: 'monthly', label: 'Monthly' },
    { key: 'yearly', label: 'Yearly' },
  ];
  return (
    <div className="inline-flex rounded-lg border border-border/60 p-1">
      {ranges.map((r) => (
        <button
          key={r.key}
          onClick={() => onChange(r.key)}
          className={cn(
            'rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
            value === r.key ? 'bg-gradient-brand text-white' : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {r.label}
        </button>
      ))}
    </div>
  );
}

export function exportToCSV(filename: string, headers: string[], rows: (string | number)[][]) {
  const csv = [
    headers.join(','),
    ...rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')),
  ].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.csv') ? filename : `${filename}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportToExcel(filename: string, sheetName: string, headers: string[], rows: (string | number)[][]) {
  // Excel-compatible XML spreadsheet
  const escapeXml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const headerRow = `<Row>${headers.map((h) => `<Cell><Data ss:Type="String">${escapeXml(h)}</Data></Cell>`).join('')}</Row>`;
  const dataRows = rows
    .map(
      (r) =>
        `<Row>${r
          .map((c) => {
            const isNum = typeof c === 'number';
            return `<Cell><Data ss:Type="${isNum ? 'Number' : 'String'}">${isNum ? c : escapeXml(String(c))}</Data></Cell>`;
          })
          .join('')}</Row>`
    )
    .join('');

  const xml = `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
 <Worksheet ss:Name="${escapeXml(sheetName)}">
  <Table>${headerRow}${dataRows}</Table>
 </Worksheet>
</Workbook>`;

  const blob = new Blob([xml], { type: 'application/vnd.ms-excel' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.xls') ? filename : `${filename}.xls`;
  a.click();
  URL.revokeObjectURL(url);
}

export function ExportButtons({
  filename,
  headers,
  rows,
  sheetName = 'Analytics',
}: {
  filename: string;
  headers: string[];
  rows: (string | number)[][];
  sheetName?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={() => exportToCSV(filename, headers, rows)}
      >
        <Download className="h-4 w-4" />
        CSV
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={() => exportToExcel(filename, sheetName, headers, rows)}
      >
        <FileSpreadsheet className="h-4 w-4" />
        Excel
      </Button>
    </div>
  );
}

export function AnalyticsTable({
  headers,
  rows,
  emptyMessage = 'No data available yet',
}: {
  headers: string[];
  rows: (string | number)[][];
  emptyMessage?: string;
}) {
  if (rows.length === 0) {
    return <EmptyData message={emptyMessage} />;
  }
  return (
    <div className="overflow-x-auto rounded-xl border border-border/60">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border/60 bg-muted/30">
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-3 text-left font-medium text-muted-foreground">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border/40 transition-colors hover:bg-muted/20">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function BreakdownCard({
  title,
  data,
  total,
}: {
  title: string;
  data: { label: string; value: number }[];
  total?: number;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const totalVal = total ?? data.reduce((sum, d) => sum + d.value, 0);

  return (
    <Card className="glass-card p-5">
      <h3 className="font-semibold">{title}</h3>
      {data.length === 0 ? (
        <EmptyData />
      ) : (
        <div className="mt-4 space-y-3">
          {data.map((item, i) => {
            const pct = totalVal > 0 ? (item.value / totalVal) * 100 : 0;
            return (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="capitalize text-muted-foreground">{item.label || 'unknown'}</span>
                  <span className="font-medium">
                    {item.value.toLocaleString()} ({pct.toFixed(1)}%)
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-purple to-brand-purple/60 transition-all duration-500"
                    style={{ width: `${(item.value / max) * 100}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
