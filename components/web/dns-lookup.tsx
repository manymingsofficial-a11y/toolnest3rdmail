'use client';

import * as React from 'react';
import { Loader2, Search, AlertCircle, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const RECORD_TYPES = ['A', 'AAAA', 'MX', 'TXT', 'NS', 'CNAME', 'SOA'] as const;
type RecordType = (typeof RECORD_TYPES)[number];

type DnsAnswer = {
  name: string;
  type: number;
  TTL: number;
  data: string;
};

type DnsResponse = {
  Status: number;
  Answer?: DnsAnswer[];
  Comment?: string;
};

type RecordResult = {
  type: RecordType;
  records: DnsAnswer[];
  status: number;
  error: string | null;
};

const TYPE_NAMES: Record<number, string> = {
  1: 'A',
  2: 'NS',
  5: 'CNAME',
  6: 'SOA',
  15: 'MX',
  16: 'TXT',
  28: 'AAAA',
};

export function DnsLookup() {
  const [domain, setDomain] = React.useState('');
  const [selectedTypes, setSelectedTypes] = React.useState<Set<RecordType>>(
    new Set(['A', 'AAAA', 'MX'])
  );
  const [looking, setLooking] = React.useState(false);
  const [results, setResults] = React.useState<RecordResult[]>([]);
  const [queryDomain, setQueryDomain] = React.useState('');

  function toggleType(type: RecordType) {
    setSelectedTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  }

  function normalizeDomain(input: string): string {
    let trimmed = input.trim().toLowerCase();
    trimmed = trimmed.replace(/^https?:\/\//, '');
    trimmed = trimmed.replace(/^www\./, '');
    trimmed = trimmed.replace(/\/.*$/, '');
    return trimmed;
  }

  async function lookupType(
    domain: string,
    type: RecordType
  ): Promise<RecordResult> {
    const apiUrl = `https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=${type}`;

    try {
      const response = await fetch(apiUrl, {
        headers: { Accept: 'application/dns-json' },
      });

      if (!response.ok) {
        return {
          type,
          records: [],
          status: -1,
          error: `HTTP ${response.status} from DNS resolver`,
        };
      }

      const data: DnsResponse = await response.json();

      return {
        type,
        records: data.Answer ?? [],
        status: data.Status,
        error: null,
      };
    } catch (err) {
      return {
        type,
        records: [],
        status: -1,
        error: err instanceof Error ? err.message : 'Network error',
      };
    }
  }

  async function handleLookup() {
    const normalized = normalizeDomain(domain);
    if (!normalized) {
      toast.error('Please enter a domain name');
      return;
    }
    if (selectedTypes.size === 0) {
      toast.error('Select at least one record type');
      return;
    }

    setLooking(true);
    setResults([]);
    setQueryDomain(normalized);

    const types = Array.from(selectedTypes);
    const lookupResults = await Promise.all(
      types.map((t) => lookupType(normalized, t))
    );

    setResults(lookupResults);
    setLooking(false);
  }

  const statusText = (status: number): string => {
    if (status === 0) return 'NOERROR';
    if (status === 1) return 'FORMERR';
    if (status === 2) return 'SERVFAIL';
    if (status === 3) return 'NXDOMAIN';
    if (status === 5) return 'REFUSED';
    return `Status ${status}`;
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-2xl glass-card p-6">
        <div className="space-y-3">
          <Label className="text-sm font-medium">Domain name</Label>
          <Input
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="example.com"
            className="rounded-xl"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleLookup();
            }}
          />
        </div>

        <div className="mt-4 space-y-2">
          <Label className="text-sm font-medium">Record types</Label>
          <div className="flex flex-wrap gap-2">
            {RECORD_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => toggleType(type)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  selectedTypes.has(type)
                    ? 'bg-cyan-500 text-white'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <Button
            onClick={handleLookup}
            disabled={looking}
            className="rounded-xl bg-gradient-to-r from-cyan-500 to-teal-600 text-white shadow-lg shadow-cyan-500/25 hover:from-cyan-600 hover:to-teal-700"
          >
            {looking ? (
              <>
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                Looking up...
              </>
            ) : (
              <>
                <Search className="mr-1.5 h-4 w-4" />
                Lookup DNS Records
              </>
            )}
          </Button>
        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          Powered by Google DNS-over-HTTPS (dns.google). Records are fetched in real time.
        </p>

        {results.length > 0 && (
          <div className="mt-6 space-y-4">
            <Label className="text-sm font-medium">
              Results for {queryDomain}
            </Label>
            {results.map((result) => (
              <div
                key={result.type}
                className="rounded-xl border border-border/60 bg-muted/30 p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-cyan-500/10 px-2 py-0.5 text-sm font-semibold text-cyan-600 dark:text-cyan-400">
                      {result.type}
                    </span>
                    {result.error ? (
                      <span className="flex items-center gap-1 text-sm text-red-500">
                        <AlertCircle className="h-3.5 w-3.5" />
                        Error
                      </span>
                    ) : result.records.length > 0 ? (
                      <span className="flex items-center gap-1 text-sm text-green-500">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        {result.records.length} record{result.records.length > 1 ? 's' : ''}
                      </span>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        No records found ({statusText(result.status)})
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {statusText(result.status)}
                  </span>
                </div>

                {result.error && (
                  <p className="mt-2 text-sm text-red-500">{result.error}</p>
                )}

                {result.records.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {result.records.map((record, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 rounded-lg bg-background/50 px-3 py-2 text-sm"
                      >
                        <span className="shrink-0 text-xs text-muted-foreground">
                          TTL {record.TTL}s
                        </span>
                        <span className="break-all font-mono text-foreground">
                          {record.data}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
