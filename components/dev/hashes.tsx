'use client';

import * as React from 'react';

import { DevShell, CodeArea, CopyButton, StatusBadge } from './dev-ui';

export function Sha256HashGenerator() {
  const [input, setInput] = React.useState('');
  const [hash, setHash] = React.useState('');
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    if (!input) {
      setHash('');
      setError('');
      return;
    }
    const encoder = new TextEncoder();
    crypto.subtle.digest('SHA-256', encoder.encode(input)).then((buf) => {
      const hex = Array.from(new Uint8Array(buf))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
      setHash(hex);
      setError('');
    }).catch((e) => setError((e as Error).message));
  }, [input]);

  return (
    <div className="space-y-4">
      <DevShell
        input={<CodeArea value={input} onChange={setInput} placeholder="Enter text to hash…" minHeight={200} />}
        output={
          error ? (
            <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">{error}</div>
          ) : (
            <div className="space-y-3">
              <div className="rounded-xl border border-border/60 bg-background/50 p-4">
                <p className="text-xs text-muted-foreground">SHA-256 Hash</p>
                <p className="mt-2 break-all font-mono text-sm font-semibold">{hash || '—'}</p>
              </div>
              <CopyButton text={hash} />
            </div>
          )
        }
      />
      <div className="rounded-xl glass-card p-4 text-sm text-muted-foreground">
        SHA-256 produces a 256-bit (64-character hex) hash. It is used for data integrity, password hashing, and blockchain. This tool uses the Web Crypto API for native performance.
      </div>
    </div>
  );
}

export function Md5HashGenerator() {
  const [input, setInput] = React.useState('');
  const [hash, setHash] = React.useState('');

  React.useEffect(() => {
    if (!input) {
      setHash('');
      return;
    }
    setHash(md5(input));
  }, [input]);

  return (
    <div className="space-y-4">
      <DevShell
        input={<CodeArea value={input} onChange={setInput} placeholder="Enter text to hash…" minHeight={200} />}
        output={
          <div className="space-y-3">
            <div className="rounded-xl border border-border/60 bg-background/50 p-4">
              <p className="text-xs text-muted-foreground">MD5 Hash</p>
              <p className="mt-2 break-all font-mono text-sm font-semibold">{hash || '—'}</p>
            </div>
            <CopyButton text={hash} />
          </div>
        }
      />
      <div className="rounded-xl glass-card p-4 text-sm text-muted-foreground">
        MD5 produces a 128-bit (32-character hex) hash. It is fast but not cryptographically secure — use it for checksums and file verification, not passwords.
      </div>
    </div>
  );
}

export function RegexTester() {
  const [pattern, setPattern] = React.useState('');
  const [flags, setFlags] = React.useState('g');
  const [testStr, setTestStr] = React.useState('');
  const [matches, setMatches] = React.useState<{ match: string; index: number }[]>([]);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    if (!pattern) {
      setMatches([]);
      setError('');
      return;
    }
    try {
      const re = new RegExp(pattern, flags);
      const results: { match: string; index: number }[] = [];
      if (flags.includes('g')) {
        let m;
        while ((m = re.exec(testStr)) !== null) {
          results.push({ match: m[0], index: m.index });
          if (m.index === re.lastIndex) re.lastIndex++;
        }
      } else {
        const m = re.exec(testStr);
        if (m) results.push({ match: m[0], index: m.index });
      }
      setMatches(results);
      setError('');
    } catch (e) {
      setError((e as Error).message);
      setMatches([]);
    }
  }, [pattern, flags, testStr]);

  const highlighted = React.useMemo(() => {
    if (!pattern || error || matches.length === 0) return testStr;
    let result = '';
    let lastIdx = 0;
    for (const m of matches) {
      result += testStr.slice(lastIdx, m.index);
      result += `<mark class="rounded bg-brand-purple/30 px-0.5">${m.match}</mark>`;
      lastIdx = m.index + m.match.length;
    }
    result += testStr.slice(lastIdx);
    return result;
  }, [testStr, matches, pattern, error]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-[1fr_120px]">
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Pattern</label>
          <div className="flex items-center gap-1 rounded-xl border border-input bg-background px-3">
            <span className="text-muted-foreground">/</span>
            <input
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="\\w+"
              className="h-10 flex-1 bg-transparent font-mono text-sm outline-none"
            />
            <span className="text-muted-foreground">/</span>
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Flags</label>
          <input
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            placeholder="gim"
            className="h-10 w-full rounded-xl border border-input bg-background px-3 font-mono text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground">Test string</h3>
          <CodeArea value={testStr} onChange={setTestStr} placeholder="Enter text to test…" minHeight={200} />
        </div>
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground">Matches</h3>
          {error ? (
            <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">{error}</div>
          ) : (
            <>
              <div className="min-h-[100px] rounded-xl border border-border/60 bg-background/50 p-4">
                <p
                  className="whitespace-pre-wrap break-words font-mono text-sm"
                  dangerouslySetInnerHTML={{ __html: highlighted || '<span class="text-muted-foreground">Matches will appear here…</span>' }}
                />
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge ok={matches.length > 0} label={`${matches.length} match${matches.length !== 1 ? 'es' : ''}`} />
              </div>
              {matches.length > 0 && (
                <ul className="space-y-1.5">
                  {matches.slice(0, 10).map((m, i) => (
                    <li key={i} className="flex items-center gap-2 rounded-lg border border-border/60 bg-background/40 px-3 py-1.5 font-mono text-xs">
                      <span className="text-muted-foreground">[{m.index}]</span>
                      <span className="truncate">{m.match}</span>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// MD5 implementation (public domain, Joseph Myers)
function md5(string: string): string {
  function toWords(s: string): number[] {
    const n = s.length;
    const words: number[] = [];
    for (let i = 0; i < n * 8; i += 8) words[i >> 5] |= (s.charCodeAt(i / 8) & 0xff) << i % 32;
    return words;
  }
  function fromWords(words: number[]): string {
    let s = '';
    for (let i = 0; i < words.length * 32; i += 8)
      s += String.fromCharCode((words[i >> 5] >>> i % 32) & 0xff);
    return s;
  }
  function bitrol(num: number, cnt: number): number {
    return (num << cnt) | (num >>> (32 - cnt));
  }
  function safeAdd(x: number, y: number): number {
    const lsw = (x & 0xffff) + (y & 0xffff);
    const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
  }
  function cmn(q: number, a: number, b: number, x: number, s: number, t: number): number {
    return safeAdd(bitrol(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
  }
  function ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return cmn((b & c) | (~b & d), a, b, x, s, t);
  }
  function gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return cmn((b & d) | (c & ~d), a, b, x, s, t);
  }
  function hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return cmn(b ^ c ^ d, a, b, x, s, t);
  }
  function ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return cmn(c ^ (b | ~d), a, b, x, s, t);
  }

  const utf8 = unescape(encodeURIComponent(string));
  const x = toWords(utf8);
  const len = utf8.length;
  x[len >> 5] |= 0x80 << len % 32;
  x[(((len + 64) >>> 9) << 4) + 14] = len * 8;

  let a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;

  for (let i = 0; i < x.length; i += 16) {
    const oa = a, ob = b, oc = c, od = d;
    a = ff(a, b, c, d, x[i], 7, -680876936);
    d = ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = ff(c, d, a, b, x[i + 10], 17, -42063);
    b = ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = gg(b, c, d, a, x[i], 20, -373897302);
    a = gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = gg(d, a, b, c, x[i + 14], 9, -1019803794);
    c = gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = hh(a, b, c, d, x[i + 5], 4, -378558);
    d = hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = hh(d, a, b, c, x[i], 11, -358537222);
    c = hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = ii(a, b, c, d, x[i], 6, -198630844);
    d = ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safeAdd(a, oa);
    b = safeAdd(b, ob);
    c = safeAdd(c, oc);
    d = safeAdd(d, od);
  }

  const hex = (n: number) => {
    const h = (n < 0 ? n + 4294967296 : n).toString(16);
    return '0'.repeat(8 - h.length) + h;
  };
  return hex(a) + hex(b) + hex(c) + hex(d);
}
