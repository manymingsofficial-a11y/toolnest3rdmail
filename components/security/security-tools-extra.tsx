'use client';

import * as React from 'react';
import { Copy, Check, Lock, Unlock, KeyRound, Dices, ShieldCheck, ShieldAlert, Hash } from 'lucide-react';

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

const enc = new TextEncoder();
const dec = new TextDecoder();

async function deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
  const baseKey = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

function bufToBase64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let str = '';
  for (let i = 0; i < bytes.length; i++) str += String.fromCharCode(bytes[i]);
  return btoa(str);
}

function base64ToBuf(str: string): Uint8Array {
  return Uint8Array.from(atob(str), (c) => c.charCodeAt(0));
}

export function PasswordEncryptor() {
  const [text, setText] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [result, setResult] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);

  async function encrypt() {
    if (!text || !password) return;
    setBusy(true);
    setError(null);
    try {
      const salt = crypto.getRandomValues(new Uint8Array(16));
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const key = await deriveKey(password, salt);
      const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(text));
      const combined = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
      combined.set(salt, 0);
      combined.set(iv, salt.length);
      combined.set(new Uint8Array(encrypted), salt.length + iv.length);
      setResult(bufToBase64(combined.buffer));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Encryption failed.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <ToolCard title="Password Encryptor (AES-GCM)">
      <div className="space-y-2">
        <Label className="text-sm font-medium">Text to Encrypt</Label>
        <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text to encrypt..." className="min-h-[100px] rounded-xl" />
      </div>
      <div className="space-y-2">
        <Label className="text-sm font-medium">Password</Label>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Encryption password" className="rounded-xl" />
      </div>
      <Button onClick={encrypt} disabled={busy || !text || !password} className="rounded-xl">
        <Lock className="mr-1.5 h-4 w-4" />
        {busy ? 'Encrypting...' : 'Encrypt'}
      </Button>
      {error && <p className="text-sm text-destructive">{error}</p>}
      {result && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Encrypted Output</Label>
          <Textarea value={result} readOnly className="min-h-[80px] rounded-xl font-mono text-sm" />
          <CopyButton text={result} />
        </div>
      )}
    </ToolCard>
  );
}

export function PasswordDecryptor() {
  const [encrypted, setEncrypted] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [result, setResult] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);

  async function decrypt() {
    if (!encrypted || !password) return;
    setBusy(true);
    setError(null);
    try {
      const combined = base64ToBuf(encrypted);
      const salt = combined.slice(0, 16);
      const iv = combined.slice(16, 28);
      const data = combined.slice(28);
      const key = await deriveKey(password, salt);
      const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, data);
      setResult(dec.decode(decrypted));
    } catch {
      setError('Decryption failed. Check your password and input.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <ToolCard title="Password Decryptor (AES-GCM)">
      <div className="space-y-2">
        <Label className="text-sm font-medium">Encrypted Text (Base64)</Label>
        <Textarea value={encrypted} onChange={(e) => setEncrypted(e.target.value)} placeholder="Paste encrypted text..." className="min-h-[80px] rounded-xl font-mono text-sm" />
      </div>
      <div className="space-y-2">
        <Label className="text-sm font-medium">Password</Label>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Decryption password" className="rounded-xl" />
      </div>
      <Button onClick={decrypt} disabled={busy || !encrypted || !password} className="rounded-xl">
        <Unlock className="mr-1.5 h-4 w-4" />
        {busy ? 'Decrypting...' : 'Decrypt'}
      </Button>
      {error && <p className="text-sm text-destructive">{error}</p>}
      {result && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Decrypted Text</Label>
          <Textarea value={result} readOnly className="min-h-[80px] rounded-xl text-sm" />
          <CopyButton text={result} />
        </div>
      )}
    </ToolCard>
  );
}

export function RandomPinGenerator() {
  const [length, setLength] = React.useState(6);
  const [count, setCount] = React.useState(1);
  const [pins, setPins] = React.useState<string[]>([]);

  function generate() {
    const result: string[] = [];
    for (let i = 0; i < count; i++) {
      let pin = '';
      for (let j = 0; j < length; j++) {
        pin += crypto.getRandomValues(new Uint32Array(1))[0] % 10;
      }
      result.push(pin);
    }
    setPins(result);
  }

  return (
    <ToolCard title="Random PIN Generator">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">PIN Length</Label>
            <span className="text-sm text-muted-foreground">{length} digits</span>
          </div>
          <Slider value={[length]} min={3} max={12} onValueChange={(v) => setLength(v[0])} />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">Number of PINs</Label>
          <Input type="number" value={count} onChange={(e) => setCount(Math.max(1, Math.min(100, Number(e.target.value) || 1)))} className="rounded-xl" />
        </div>
      </div>
      <Button onClick={generate} className="rounded-xl">
        <KeyRound className="mr-1.5 h-4 w-4" />
        Generate PINs
      </Button>
      {pins.length > 0 && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Generated PINs</Label>
          <div className="space-y-1.5">
            {pins.map((pin, i) => (
              <div key={i} className="flex items-center gap-2 rounded-xl border border-border/60 bg-muted/30 p-3">
                <span className="flex-1 font-mono text-lg font-bold tracking-widest">{pin}</span>
                <CopyButton text={pin} />
              </div>
            ))}
          </div>
        </div>
      )}
    </ToolCard>
  );
}

export function RandomNumberGenerator() {
  const [min, setMin] = React.useState(1);
  const [max, setMax] = React.useState(100);
  const [count, setCount] = React.useState(1);
  const [numbers, setNumbers] = React.useState<number[]>([]);
  const [unique, setUnique] = React.useState(false);

  function generate() {
    const lo = Math.min(min, max);
    const hi = Math.max(min, max);
    const result: number[] = [];
    const maxCount = unique ? hi - lo + 1 : Infinity;
    const n = Math.min(count, maxCount);
    const used = new Set<number>();
    while (result.length < n) {
      const val = lo + Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / 4294967296 * (hi - lo + 1));
      if (unique) {
        if (!used.has(val)) {
          used.add(val);
          result.push(val);
        }
      } else {
        result.push(val);
      }
    }
    setNumbers(result);
  }

  return (
    <ToolCard title="Random Number Generator">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Min</Label>
          <Input type="number" value={min} onChange={(e) => setMin(Number(e.target.value))} className="rounded-xl" />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">Max</Label>
          <Input type="number" value={max} onChange={(e) => setMax(Number(e.target.value))} className="rounded-xl" />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">Count</Label>
          <Input type="number" value={count} onChange={(e) => setCount(Math.max(1, Math.min(1000, Number(e.target.value) || 1)))} className="rounded-xl" />
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={unique} onChange={(e) => setUnique(e.target.checked)} />
        Unique numbers only
      </label>
      <Button onClick={generate} className="rounded-xl">
        <Dices className="mr-1.5 h-4 w-4" />
        Generate Numbers
      </Button>
      {numbers.length > 0 && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Result</Label>
          <div className="flex flex-wrap gap-2">
            {numbers.map((n, i) => (
              <span key={i} className="rounded-lg border border-border/60 bg-muted/30 px-3 py-1.5 font-mono text-sm font-bold">{n}</span>
            ))}
          </div>
          <CopyButton text={numbers.join(', ')} />
        </div>
      )}
    </ToolCard>
  );
}

export function OtpGenerator() {
  const [secret, setSecret] = React.useState('');
  const [code, setCode] = React.useState('');
  const [remaining, setRemaining] = React.useState(30);
  const [error, setError] = React.useState<string | null>(null);

  function base32Decode(str: string): Uint8Array {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    const cleaned = str.toUpperCase().replace(/=+$/, '');
    const bytes: number[] = [];
    let buffer = 0;
    let bits = 0;
    for (const c of cleaned) {
      const idx = alphabet.indexOf(c);
      if (idx === -1) continue;
      buffer = (buffer << 5) | idx;
      bits += 5;
      if (bits >= 8) {
        bytes.push((buffer >> (bits - 8)) & 0xff);
        bits -= 8;
      }
    }
    return new Uint8Array(bytes);
  }

  async function generateHOTP(counter: number): Promise<string> {
    const key = base32Decode(secret);
    const buf = new ArrayBuffer(8);
    const view = new DataView(buf);
    view.setUint32(0, Math.floor(counter / 0x100000000));
    view.setUint32(4, counter & 0xffffffff);
    const hmac = await crypto.subtle.importKey('raw', key, { name: 'HMAC', hash: 'SHA-1' }, false, ['sign']);
    const sig = new Uint8Array(await crypto.subtle.sign('HMAC', hmac, buf));
    const offset = sig[sig.length - 1] & 0xf;
    const num = ((sig[offset] & 0x7f) << 24) | (sig[offset + 1] << 16) | (sig[offset + 2] << 8) | sig[offset + 3];
    return (num % 1000000).toString().padStart(6, '0');
  }

  React.useEffect(() => {
    if (!secret) {
      setCode('');
      return;
    }
    let active = true;
    async function update() {
      try {
        const counter = Math.floor(Date.now() / 30000);
        const otp = await generateHOTP(counter);
        if (active) {
          setCode(otp);
          setRemaining(30 - (Math.floor(Date.now() / 1000) % 30));
          setError(null);
        }
      } catch {
        if (active) setError('Invalid secret. Use Base32 format.');
      }
    }
    update();
    const interval = setInterval(update, 1000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [secret]);

  return (
    <ToolCard title="OTP Generator (TOTP)">
      <div className="space-y-2">
        <Label className="text-sm font-medium">Secret Key (Base32)</Label>
        <Input value={secret} onChange={(e) => setSecret(e.target.value)} placeholder="JBSWY3DPEHPK3PXP" className="rounded-xl font-mono" />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      {code && (
        <div className="rounded-2xl border border-border/60 bg-muted/30 p-6 text-center">
          <p className="font-mono text-4xl font-bold tracking-[0.3em]">{code}</p>
          <p className="mt-2 text-sm text-muted-foreground">Expires in {remaining}s</p>
        </div>
      )}
      {code && <CopyButton text={code} label="Copy OTP" />}
    </ToolCard>
  );
}

export function HashCompare() {
  const [hash1, setHash1] = React.useState('');
  const [hash2, setHash2] = React.useState('');
  const [match, setMatch] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    if (!hash1 || !hash2) {
      setMatch(null);
      return;
    }
    setMatch(hash1.trim().toLowerCase() === hash2.trim().toLowerCase());
  }, [hash1, hash2]);

  return (
    <ToolCard title="Hash Compare">
      <div className="space-y-2">
        <Label className="text-sm font-medium">Hash 1</Label>
        <Input value={hash1} onChange={(e) => setHash1(e.target.value)} placeholder="Paste first hash..." className="rounded-xl font-mono text-sm" />
      </div>
      <div className="space-y-2">
        <Label className="text-sm font-medium">Hash 2</Label>
        <Input value={hash2} onChange={(e) => setHash2(e.target.value)} placeholder="Paste second hash..." className="rounded-xl font-mono text-sm" />
      </div>
      {match !== null && (
        <div className={cn('rounded-xl border p-4 text-center', match ? 'border-green-500/30 bg-green-500/10' : 'border-red-500/30 bg-red-500/10')}>
          {match ? (
            <p className="flex items-center justify-center gap-2 font-medium text-green-600 dark:text-green-400">
              <ShieldCheck className="h-5 w-5" /> Hashes match!
            </p>
          ) : (
            <p className="flex items-center justify-center gap-2 font-medium text-red-600 dark:text-red-400">
              <ShieldAlert className="h-5 w-5" /> Hashes do not match.
            </p>
          )}
        </div>
      )}
    </ToolCard>
  );
}

async function shaHash(algorithm: string, text: string): Promise<string> {
  const buf = await crypto.subtle.digest(algorithm, new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function BcryptGenerator() {
  const [password, setPassword] = React.useState('');
  const [rounds, setRounds] = React.useState(10);
  const [hash, setHash] = React.useState('');
  const [busy, setBusy] = React.useState(false);

  async function generate() {
    if (!password) return;
    setBusy(true);
    try {
      const data = new TextEncoder().encode(password);
      const salt = crypto.getRandomValues(new Uint8Array(16));
      const key = await crypto.subtle.importKey('raw', data, 'PBKDF2', false, ['deriveBits']);
      const derived = await crypto.subtle.deriveBits(
        { name: 'PBKDF2', salt, iterations: Math.pow(2, rounds), hash: 'SHA-256' },
        key,
        256
      );
      const hashHex = Array.from(new Uint8Array(derived)).map((b) => b.toString(16).padStart(2, '0')).join('');
      const saltHex = Array.from(salt).map((b) => b.toString(16).padStart(2, '0')).join('');
      setHash(`pbkdf2-sha256$${rounds}$${saltHex}$${hashHex}`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <ToolCard title="Bcrypt Generator (PBKDF2)">
      <div className="space-y-2">
        <Label className="text-sm font-medium">Password</Label>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" className="rounded-xl" />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Rounds (cost factor)</Label>
          <span className="text-sm text-muted-foreground">{rounds} (2^{rounds})</span>
        </div>
        <Slider value={[rounds]} min={4} max={20} onValueChange={(v) => setRounds(v[0])} />
      </div>
      <Button onClick={generate} disabled={busy || !password} className="rounded-xl">
        {busy ? 'Generating...' : 'Generate Hash'}
      </Button>
      {hash && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Hash Output</Label>
          <Textarea value={hash} readOnly className="min-h-[80px] rounded-xl font-mono text-xs" />
          <CopyButton text={hash} />
        </div>
      )}
    </ToolCard>
  );
}

export function Sha1HashGenerator() {
  const [text, setText] = React.useState('');
  const [hash, setHash] = React.useState('');

  React.useEffect(() => {
    if (!text) {
      setHash('');
      return;
    }
    shaHash('SHA-1', text).then(setHash);
  }, [text]);

  return (
    <ToolCard title="SHA1 Hash Generator">
      <div className="space-y-2">
        <Label className="text-sm font-medium">Input Text</Label>
        <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text to hash..." className="min-h-[100px] rounded-xl" />
      </div>
      {hash && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">SHA1 Hash</Label>
          <div className="rounded-xl border border-border/60 bg-muted/30 p-3 font-mono text-sm break-all">{hash}</div>
          <CopyButton text={hash} />
        </div>
      )}
    </ToolCard>
  );
}

const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

export function Base32Encoder() {
  const [text, setText] = React.useState('');
  const [result, setResult] = React.useState('');

  React.useEffect(() => {
    if (!text) {
      setResult('');
      return;
    }
    const bytes = new TextEncoder().encode(text);
    let bits = 0;
    let value = 0;
    let out = '';
    for (let i = 0; i < bytes.length; i++) {
      const b = bytes[i];
      value = (value << 8) | b;
      bits += 8;
      while (bits >= 5) {
        out += BASE32_ALPHABET[(value >> (bits - 5)) & 0x1f];
        bits -= 5;
      }
    }
    if (bits > 0) {
      out += BASE32_ALPHABET[(value << (5 - bits)) & 0x1f];
    }
    while (out.length % 8 !== 0) out += '=';
    setResult(out);
  }, [text]);

  return (
    <ToolCard title="Base32 Encoder">
      <div className="space-y-2">
        <Label className="text-sm font-medium">Input Text</Label>
        <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text to encode..." className="min-h-[100px] rounded-xl" />
      </div>
      {result && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Base32 Output</Label>
          <Textarea value={result} readOnly className="min-h-[80px] rounded-xl font-mono text-sm" />
          <CopyButton text={result} />
        </div>
      )}
    </ToolCard>
  );
}

export function Base32Decoder() {
  const [text, setText] = React.useState('');
  const [result, setResult] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!text) {
      setResult('');
      setError(null);
      return;
    }
    try {
      const cleaned = text.toUpperCase().replace(/=+$/, '');
      let bits = 0;
      let value = 0;
      const bytes: number[] = [];
      for (const c of cleaned) {
        const idx = BASE32_ALPHABET.indexOf(c);
        if (idx === -1) continue;
        value = (value << 5) | idx;
        bits += 5;
        if (bits >= 8) {
          bytes.push((value >> (bits - 8)) & 0xff);
          bits -= 8;
        }
      }
      setResult(new TextDecoder().decode(new Uint8Array(bytes)));
      setError(null);
    } catch {
      setError('Invalid Base32 input.');
    }
  }, [text]);

  return (
    <ToolCard title="Base32 Decoder">
      <div className="space-y-2">
        <Label className="text-sm font-medium">Base32 Input</Label>
        <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter Base32 text..." className="min-h-[100px] rounded-xl font-mono text-sm" />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      {result && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Decoded Text</Label>
          <Textarea value={result} readOnly className="min-h-[80px] rounded-xl text-sm" />
          <CopyButton text={result} />
        </div>
      )}
    </ToolCard>
  );
}
