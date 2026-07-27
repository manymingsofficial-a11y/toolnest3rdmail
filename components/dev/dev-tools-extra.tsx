'use client';

import * as React from 'react';
import { Copy, Check, Boxes, FileJson, Database, FileCode, FileSpreadsheet, Braces, Palette, Timer } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [copied, setCopied] = React.useState(false);
  return (
    <Button
      onClick={() => {
        navigator.clipboard.writeText(text).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        });
      }}
      variant="outline"
      size="sm"
      className="rounded-xl"
      disabled={!text}
    >
      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
      {copied ? 'Copied' : label}
    </Button>
  );
}

function ToolCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-2xl glass-card p-6">
        <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">{title}</h3>
        <div className="mt-4 space-y-4">{children}</div>
      </div>
    </div>
  );
}

export function UuidBulkGenerator() {
  const [count, setCount] = React.useState(5);
  const [uppercase, setUppercase] = React.useState(false);
  const [noHyphens, setNoHyphens] = React.useState(false);
  const [uuids, setUuids] = React.useState<string[]>([]);

  function generate() {
    const result: string[] = [];
    for (let i = 0; i < count; i++) {
      let uuid = crypto.randomUUID();
      if (noHyphens) uuid = uuid.replace(/-/g, '');
      if (uppercase) uuid = uuid.toUpperCase();
      result.push(uuid);
    }
    setUuids(result);
  }

  return (
    <ToolCard title="UUID Bulk Generator">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Count</Label>
          <Input type="number" value={count} onChange={(e) => setCount(Math.max(1, Math.min(1000, Number(e.target.value) || 1)))} className="rounded-xl" />
        </div>
        <div className="flex items-end gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} />
            Uppercase
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={noHyphens} onChange={(e) => setNoHyphens(e.target.checked)} />
            No hyphens
          </label>
        </div>
      </div>
      <Button onClick={generate} className="rounded-xl">
        <Boxes className="mr-1.5 h-4 w-4" />
        Generate UUIDs
      </Button>
      {uuids.length > 0 && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Generated UUIDs ({uuids.length})</Label>
          <Textarea value={uuids.join('\n')} readOnly className="min-h-[200px] rounded-xl font-mono text-sm" />
          <CopyButton text={uuids.join('\n')} label="Copy All" />
        </div>
      )}
    </ToolCard>
  );
}

function base64UrlEncode(str: string): string {
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(str: string): string {
  let s = str.replace(/-/g, '+').replace(/_/g, '/');
  while (s.length % 4) s += '=';
  return atob(s);
}

export function JwtDecoder() {
  const [token, setToken] = React.useState('');
  const [header, setHeader] = React.useState('');
  const [payload, setPayload] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!token) {
      setHeader('');
      setPayload('');
      setError(null);
      return;
    }
    try {
      const parts = token.trim().split('.');
      if (parts.length < 2) {
        setError('Invalid JWT format.');
        return;
      }
      setHeader(JSON.stringify(JSON.parse(base64UrlDecode(parts[0])), null, 2));
      setPayload(JSON.stringify(JSON.parse(base64UrlDecode(parts[1])), null, 2));
      setError(null);
    } catch {
      setError('Failed to decode JWT. Check the token format.');
    }
  }, [token]);

  return (
    <ToolCard title="JWT Decoder">
      <div className="space-y-2">
        <Label className="text-sm font-medium">JWT Token</Label>
        <Textarea value={token} onChange={(e) => setToken(e.target.value)} placeholder="Paste your JWT token here..." className="min-h-[100px] rounded-xl font-mono text-sm" />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      {header && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Header</Label>
          <pre className="overflow-auto rounded-xl border border-border/60 bg-muted/30 p-4 font-mono text-sm">{header}</pre>
        </div>
      )}
      {payload && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Payload</Label>
          <pre className="overflow-auto rounded-xl border border-border/60 bg-muted/30 p-4 font-mono text-sm">{payload}</pre>
          <CopyButton text={payload} />
        </div>
      )}
    </ToolCard>
  );
}

export function JwtEncoder() {
  const [header, setHeader] = React.useState('{\n  "alg": "HS256",\n  "typ": "JWT"\n}');
  const [payload, setPayload] = React.useState('{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "iat": 1516239022\n}');
  const [secret, setSecret] = React.useState('');
  const [token, setToken] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);

  async function encode() {
    setError(null);
    try {
      const h = JSON.parse(header);
      const p = JSON.parse(payload);
      const headerB64 = base64UrlEncode(JSON.stringify(h));
      const payloadB64 = base64UrlEncode(JSON.stringify(p));
      const data = `${headerB64}.${payloadB64}`;
      if (secret) {
        const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
        const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
        const sigBytes = new Uint8Array(sig);
        let sigStr = '';
        for (let i = 0; i < sigBytes.length; i++) sigStr += String.fromCharCode(sigBytes[i]);
        const sigB64 = base64UrlEncode(sigStr);
        setToken(`${data}.${sigB64}`);
      } else {
        setToken(`${data}.`);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to encode JWT.');
    }
  }

  return (
    <ToolCard title="JWT Encoder">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Header (JSON)</Label>
          <Textarea value={header} onChange={(e) => setHeader(e.target.value)} className="min-h-[120px] rounded-xl font-mono text-sm" />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">Payload (JSON)</Label>
          <Textarea value={payload} onChange={(e) => setPayload(e.target.value)} className="min-h-[120px] rounded-xl font-mono text-sm" />
        </div>
      </div>
      <div className="space-y-2">
        <Label className="text-sm font-medium">Secret (for HMAC-SHA256 signing)</Label>
        <Input type="password" value={secret} onChange={(e) => setSecret(e.target.value)} placeholder="Enter signing secret" className="rounded-xl" />
      </div>
      <Button onClick={encode} className="rounded-xl">
        <FileJson className="mr-1.5 h-4 w-4" />
        Encode JWT
      </Button>
      {error && <p className="text-sm text-destructive">{error}</p>}
      {token && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">JWT Token</Label>
          <Textarea value={token} readOnly className="min-h-[80px] rounded-xl font-mono text-sm break-all" />
          <CopyButton text={token} />
        </div>
      )}
    </ToolCard>
  );
}

export function SqlFormatter() {
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');

  function format() {
    let sql = input;
    sql = sql.replace(/\s+/g, ' ').trim();
    const keywords = ['SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'OUTER JOIN', 'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'OFFSET', 'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE FROM', 'CREATE TABLE', 'ALTER TABLE', 'DROP TABLE', 'UNION', 'UNION ALL'];
    for (const kw of keywords) {
      const re = new RegExp(`\\b${kw}\\b`, 'gi');
      sql = sql.replace(re, '\n' + kw);
    }
    sql = sql.replace(/\n\s+/g, '\n').trim();
    sql = sql.replace(/,\s+/g, ',\n  ');
    setOutput(sql);
  }

  return (
    <ToolCard title="SQL Formatter">
      <div className="space-y-2">
        <Label className="text-sm font-medium">SQL Input</Label>
        <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="SELECT * FROM users WHERE id = 1" className="min-h-[120px] rounded-xl font-mono text-sm" />
      </div>
      <Button onClick={format} className="rounded-xl">
        <Database className="mr-1.5 h-4 w-4" />
        Format SQL
      </Button>
      {output && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Formatted SQL</Label>
          <Textarea value={output} readOnly className="min-h-[150px] rounded-xl font-mono text-sm" />
          <CopyButton text={output} />
        </div>
      )}
    </ToolCard>
  );
}

export function XmlFormatter() {
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);

  function format() {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(input, 'text/xml');
      if (doc.querySelector('parsererror')) {
        setError('Invalid XML.');
        setOutput('');
        return;
      }
      const serialized = new XMLSerializer().serializeToString(doc);
      let formatted = '';
      let indent = '';
      for (const ch of serialized) {
        if (ch === '>') {
          formatted += ch + '\n' + indent;
        } else if (ch === '<' && formatted.endsWith(indent)) {
          formatted = formatted.slice(0, -indent.length);
          formatted += ch;
        } else {
          formatted += ch;
        }
      }
      setOutput(formatted.trim());
      setError(null);
    } catch {
      setError('Failed to format XML.');
    }
  }

  return (
    <ToolCard title="XML Formatter">
      <div className="space-y-2">
        <Label className="text-sm font-medium">XML Input</Label>
        <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="<root><item>value</item></root>" className="min-h-[120px] rounded-xl font-mono text-sm" />
      </div>
      <Button onClick={format} className="rounded-xl">
        <FileCode className="mr-1.5 h-4 w-4" />
        Format XML
      </Button>
      {error && <p className="text-sm text-destructive">{error}</p>}
      {output && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Formatted XML</Label>
          <Textarea value={output} readOnly className="min-h-[150px] rounded-xl font-mono text-sm" />
          <CopyButton text={output} />
        </div>
      )}
    </ToolCard>
  );
}

export function XmlValidator() {
  const [input, setInput] = React.useState('');
  const [valid, setValid] = React.useState<boolean | null>(null);
  const [message, setMessage] = React.useState('');

  function validate() {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(input, 'text/xml');
      if (doc.querySelector('parsererror')) {
        setValid(false);
        setMessage('Invalid XML: parse error detected.');
      } else {
        setValid(true);
        setMessage('Valid XML! No errors found.');
      }
    } catch {
      setValid(false);
      setMessage('Invalid XML.');
    }
  }

  return (
    <ToolCard title="XML Validator">
      <div className="space-y-2">
        <Label className="text-sm font-medium">XML Input</Label>
        <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="<root><item>value</item></root>" className="min-h-[150px] rounded-xl font-mono text-sm" />
      </div>
      <Button onClick={validate} className="rounded-xl">
        <FileCode className="mr-1.5 h-4 w-4" />
        Validate XML
      </Button>
      {valid !== null && (
        <div className={cn('rounded-xl border p-4 text-center', valid ? 'border-green-500/30 bg-green-500/10' : 'border-red-500/30 bg-red-500/10')}>
          <p className={valid ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>{message}</p>
        </div>
      )}
    </ToolCard>
  );
}

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          cell += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cell += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ',') {
        row.push(cell);
        cell = '';
      } else if (ch === '\n') {
        row.push(cell);
        rows.push(row);
        row = [];
        cell = '';
      } else if (ch !== '\r') {
        cell += ch;
      }
    }
  }
  if (cell || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }
  return rows.filter((r) => r.length > 1 || (r.length === 1 && r[0] !== ''));
}

export function CsvToJson() {
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');

  function convert() {
    const rows = parseCsv(input);
    if (rows.length < 2) {
      setOutput('[]');
      return;
    }
    const headers = rows[0];
    const result = rows.slice(1).map((row) => {
      const obj: Record<string, string> = {};
      headers.forEach((h, i) => {
        obj[h] = row[i] ?? '';
      });
      return obj;
    });
    setOutput(JSON.stringify(result, null, 2));
  }

  return (
    <ToolCard title="CSV to JSON">
      <div className="space-y-2">
        <Label className="text-sm font-medium">CSV Input</Label>
        <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="name,age,city\nJohn,30,NYC" className="min-h-[120px] rounded-xl font-mono text-sm" />
      </div>
      <Button onClick={convert} className="rounded-xl">
        <FileSpreadsheet className="mr-1.5 h-4 w-4" />
        Convert to JSON
      </Button>
      {output && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">JSON Output</Label>
          <Textarea value={output} readOnly className="min-h-[150px] rounded-xl font-mono text-sm" />
          <CopyButton text={output} />
        </div>
      )}
    </ToolCard>
  );
}

export function JsonToCsv() {
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);

  function convert() {
    try {
      const data = JSON.parse(input);
      if (!Array.isArray(data) || data.length === 0) {
        setError('Input must be a non-empty JSON array of objects.');
        setOutput('');
        return;
      }
      const headers = Object.keys(data[0]);
      const csvRows = [headers.join(',')];
      for (const item of data) {
        const values = headers.map((h) => {
          const val = String(item[h] ?? '');
          if (val.includes(',') || val.includes('"') || val.includes('\n')) {
            return `"${val.replace(/"/g, '""')}"`;
          }
          return val;
        });
        csvRows.push(values.join(','));
      }
      setOutput(csvRows.join('\n'));
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JSON.');
      setOutput('');
    }
  }

  return (
    <ToolCard title="JSON to CSV">
      <div className="space-y-2">
        <Label className="text-sm font-medium">JSON Input</Label>
        <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder='[{"name":"John","age":30}]' className="min-h-[120px] rounded-xl font-mono text-sm" />
      </div>
      <Button onClick={convert} className="rounded-xl">
        <FileSpreadsheet className="mr-1.5 h-4 w-4" />
        Convert to CSV
      </Button>
      {error && <p className="text-sm text-destructive">{error}</p>}
      {output && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">CSV Output</Label>
          <Textarea value={output} readOnly className="min-h-[100px] rounded-xl font-mono text-sm" />
          <CopyButton text={output} />
        </div>
      )}
    </ToolCard>
  );
}

export function YamlFormatter() {
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);

  function format() {
    try {
      const lines = input.split('\n');
      const formatted = lines
        .map((line) => {
          const trimmed = line.trimEnd();
          const indent = line.length - line.trimStart().length;
          return ' '.repeat(indent) + trimmed.trimStart();
        })
        .join('\n');
      setOutput(formatted);
      setError(null);
    } catch {
      setError('Failed to format YAML.');
    }
  }

  return (
    <ToolCard title="YAML Formatter">
      <div className="space-y-2">
        <Label className="text-sm font-medium">YAML Input</Label>
        <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="key: value" className="min-h-[120px] rounded-xl font-mono text-sm" />
      </div>
      <Button onClick={format} className="rounded-xl">
        <Braces className="mr-1.5 h-4 w-4" />
        Format YAML
      </Button>
      {error && <p className="text-sm text-destructive">{error}</p>}
      {output && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Formatted YAML</Label>
          <Textarea value={output} readOnly className="min-h-[120px] rounded-xl font-mono text-sm" />
          <CopyButton text={output} />
        </div>
      )}
    </ToolCard>
  );
}

export function YamlValidator() {
  const [input, setInput] = React.useState('');
  const [valid, setValid] = React.useState<boolean | null>(null);

  function validate() {
    try {
      const lines = input.split('\n');
      let valid = true;
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          if (!trimmed.includes(':') && !trimmed.startsWith('-')) {
            valid = false;
            break;
          }
        }
      }
      setValid(valid);
    } catch {
      setValid(false);
    }
  }

  return (
    <ToolCard title="YAML Validator">
      <div className="space-y-2">
        <Label className="text-sm font-medium">YAML Input</Label>
        <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="key: value" className="min-h-[150px] rounded-xl font-mono text-sm" />
      </div>
      <Button onClick={validate} className="rounded-xl">
        <Braces className="mr-1.5 h-4 w-4" />
        Validate YAML
      </Button>
      {valid !== null && (
        <div className={cn('rounded-xl border p-4 text-center', valid ? 'border-green-500/30 bg-green-500/10' : 'border-red-500/30 bg-red-500/10')}>
          <p className={valid ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
            {valid ? 'YAML appears valid!' : 'YAML validation failed.'}
          </p>
        </div>
      )}
    </ToolCard>
  );
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return null;
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

export function ColorConverter() {
  const [hex, setHex] = React.useState('#6366f1');
  const [rgb, setRgb] = React.useState({ r: 99, g: 102, b: 241 });
  const [hsl, setHsl] = React.useState<[number, number, number]>([239, 84, 67]);

  function updateFromHex(value: string) {
    setHex(value);
    const c = hexToRgb(value);
    if (c) {
      setRgb(c);
      setHsl(rgbToHsl(c.r, c.g, c.b));
    }
  }

  function updateFromRgb(key: 'r' | 'g' | 'b', value: number) {
    const next = { ...rgb, [key]: value };
    setRgb(next);
    setHex(rgbToHex(next.r, next.g, next.b));
    setHsl(rgbToHsl(next.r, next.g, next.b));
  }

  return (
    <ToolCard title="Color Converter">
      <div className="flex items-center gap-4">
        <div className="h-20 w-20 shrink-0 rounded-xl border border-border/60" style={{ backgroundColor: hex }} />
        <div className="flex-1 space-y-2">
          <Label className="text-sm font-medium">HEX</Label>
          <Input value={hex} onChange={(e) => updateFromHex(e.target.value)} className="rounded-xl font-mono" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {(['r', 'g', 'b'] as const).map((ch) => (
          <div key={ch} className="space-y-2">
            <Label className="text-sm font-medium">{ch.toUpperCase()}</Label>
            <Input type="number" min={0} max={255} value={rgb[ch]} onChange={(e) => updateFromRgb(ch, Number(e.target.value))} className="rounded-xl" />
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-border/60 bg-muted/30 p-4 text-sm">
        <p>RGB: <span className="font-mono font-bold">{rgb.r}, {rgb.g}, {rgb.b}</span></p>
        <p>HSL: <span className="font-mono font-bold">{hsl[0]}°, {hsl[1]}%, {hsl[2]}%</span></p>
      </div>
      <CopyButton text={`HEX: ${hex}\nRGB: ${rgb.r}, ${rgb.g}, ${rgb.b}\nHSL: ${hsl[0]}°, ${hsl[1]}%, ${hsl[2]}%`} label="Copy All" />
    </ToolCard>
  );
}

export function HexToRgb() {
  const [hex, setHex] = React.useState('#6366f1');
  const result = React.useMemo(() => {
    const c = hexToRgb(hex);
    return c ? `rgb(${c.r}, ${c.g}, ${c.b})` : '';
  }, [hex]);

  return (
    <ToolCard title="HEX to RGB">
      <div className="space-y-2">
        <Label className="text-sm font-medium">HEX Color</Label>
        <div className="flex items-center gap-2">
          <input type="color" value={hex} onChange={(e) => setHex(e.target.value)} className="h-10 w-14 cursor-pointer rounded-lg border border-border/60" />
          <Input value={hex} onChange={(e) => setHex(e.target.value)} className="rounded-xl font-mono" />
        </div>
      </div>
      {result && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">RGB Result</Label>
          <div className="rounded-xl border border-border/60 bg-muted/30 p-3 font-mono text-sm">{result}</div>
          <CopyButton text={result} />
        </div>
      )}
    </ToolCard>
  );
}

export function RgbToHex() {
  const [r, setR] = React.useState(99);
  const [g, setG] = React.useState(102);
  const [b, setB] = React.useState(241);
  const hex = rgbToHex(r, g, b);

  return (
    <ToolCard title="RGB to HEX">
      <div className="grid gap-4 sm:grid-cols-3">
        {([
          ['r', r, setR],
          ['g', g, setG],
          ['b', b, setB],
        ] as const).map(([ch, val, set]) => (
          <div key={ch} className="space-y-2">
            <Label className="text-sm font-medium">{ch.toUpperCase()}</Label>
            <Input type="number" min={0} max={255} value={val} onChange={(e) => set(Math.max(0, Math.min(255, Number(e.target.value) || 0)))} className="rounded-xl" />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 shrink-0 rounded-xl border border-border/60" style={{ backgroundColor: hex }} />
        <div className="flex-1 space-y-2">
          <Label className="text-sm font-medium">HEX Result</Label>
          <div className="rounded-xl border border-border/60 bg-muted/30 p-3 font-mono text-sm">{hex}</div>
        </div>
        <CopyButton text={hex} />
      </div>
    </ToolCard>
  );
}

export function TimestampConverter() {
  const [timestamp, setTimestamp] = React.useState(String(Math.floor(Date.now() / 1000)));
  const [date, setDate] = React.useState(new Date().toISOString().slice(0, 19));

  const tsToDate = React.useMemo(() => {
    const ts = Number(timestamp);
    if (isNaN(ts)) return '';
    const d = new Date(ts * 1000);
    return d.toUTCString();
  }, [timestamp]);

  const dateToTs = React.useMemo(() => {
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    return Math.floor(d.getTime() / 1000);
  }, [date]);

  return (
    <ToolCard title="Timestamp Converter">
      <div className="space-y-2">
        <Label className="text-sm font-medium">Unix Timestamp (seconds)</Label>
        <Input value={timestamp} onChange={(e) => setTimestamp(e.target.value)} className="rounded-xl font-mono" />
      </div>
      {tsToDate && (
        <div className="rounded-xl border border-border/60 bg-muted/30 p-3 text-sm">
          <p className="font-mono">{tsToDate}</p>
        </div>
      )}
      <div className="space-y-2">
        <Label className="text-sm font-medium">ISO Date</Label>
        <Input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} className="rounded-xl" />
      </div>
      {dateToTs && (
        <div className="rounded-xl border border-border/60 bg-muted/30 p-3 text-sm">
          <p>Unix timestamp: <span className="font-mono font-bold">{dateToTs}</span></p>
        </div>
      )}
    </ToolCard>
  );
}

export function UnixTimeConverter() {
  const [now, setNow] = React.useState(Math.floor(Date.now() / 1000));
  const [input, setInput] = React.useState('');
  const [result, setResult] = React.useState('');

  React.useEffect(() => {
    const interval = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(interval);
  }, []);

  function convert() {
    const ts = Number(input);
    if (isNaN(ts)) {
      setResult('Invalid timestamp.');
      return;
    }
    const d = new Date(ts * 1000);
    setResult(d.toLocaleString());
  }

  return (
    <ToolCard title="Unix Time Converter">
      <div className="rounded-xl border border-border/60 bg-muted/30 p-4 text-center">
        <p className="text-sm text-muted-foreground">Current Unix Time</p>
        <p className="mt-1 font-mono text-2xl font-bold">{now}</p>
      </div>
      <div className="space-y-2">
        <Label className="text-sm font-medium">Unix Timestamp</Label>
        <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="1690000000" className="rounded-xl font-mono" />
      </div>
      <Button onClick={convert} className="rounded-xl">
        <Timer className="mr-1.5 h-4 w-4" />
        Convert
      </Button>
      {result && (
        <div className="rounded-xl border border-border/60 bg-muted/30 p-3 text-sm font-mono">{result}</div>
      )}
    </ToolCard>
  );
}
