export const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const LOWER = 'abcdefghijklmnopqrstuvwxyz';
export const NUMBERS = '0123456789';
export const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';
export const SIMILAR = /[il1Lo0O]/g;
export const AMBIGUOUS = /[{}[\]()/\\'"`~,;:.<>]/g;

export type StrengthResult = {
  score: 0 | 1 | 2 | 3 | 4;
  label: string;
  color: string;
  entropy: number;
  crackTime: string;
  suggestions: string[];
};

const WORDS_PER_SECOND = 1e10;

export function analyzePassword(pw: string): StrengthResult {
  if (!pw) {
    return {
      score: 0,
      label: 'Empty',
      color: 'bg-muted',
      entropy: 0,
      crackTime: 'Instant',
      suggestions: ['Start typing a password to see its strength.'],
    };
  }

  let pool = 0;
  const hasLower = /[a-z]/.test(pw);
  const hasUpper = /[A-Z]/.test(pw);
  const hasNumber = /[0-9]/.test(pw);
  const hasSymbol = /[^a-zA-Z0-9]/.test(pw);
  if (hasLower) pool += 26;
  if (hasUpper) pool += 26;
  if (hasNumber) pool += 10;
  if (hasSymbol) pool += 32;

  const entropy = pw.length * Math.log2(pool || 1);
  const seconds = Math.pow(2, entropy) / WORDS_PER_SECOND;

  let score: 0 | 1 | 2 | 3 | 4;
  if (entropy < 28) score = 1;
  else if (entropy < 36) score = 2;
  else if (entropy < 60) score = 3;
  else if (entropy < 128) score = 4;
  else score = 4;
  if (pw.length < 4) score = 1;

  const labels = ['Empty', 'Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];
  const colors = ['bg-muted', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-emerald-500'];
  const idx = pw.length === 0 ? 0 : score;

  const suggestions: string[] = [];
  if (pw.length < 12) suggestions.push('Use at least 12 characters for better security.');
  if (!hasUpper) suggestions.push('Add uppercase letters (A-Z).');
  if (!hasLower) suggestions.push('Add lowercase letters (a-z).');
  if (!hasNumber) suggestions.push('Add numbers (0-9).');
  if (!hasSymbol) suggestions.push('Add symbols (!@#$%^&*).');
  if (/(.)\1{2,}/.test(pw)) suggestions.push('Avoid repeated characters (aaa, 111).');
  if (/^(123|abc|qwe|password|letmein|admin)/i.test(pw))
    suggestions.push('Avoid common patterns and dictionary words.');
  if (suggestions.length === 0) suggestions.push('Great! This is a strong password.');

  return {
    score,
    label: labels[idx],
    color: colors[idx],
    entropy: Math.round(entropy),
    crackTime: formatCrackTime(seconds),
    suggestions,
  };
}

export function formatCrackTime(seconds: number): string {
  if (seconds < 1) return 'Instant';
  if (seconds < 60) return `${Math.round(seconds)} seconds`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
  if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
  const years = seconds / 31536000;
  if (years < 1000) return `${Math.round(years)} years`;
  if (years < 1e6) return `${Math.round(years / 1000)}K years`;
  if (years < 1e9) return `${Math.round(years / 1e6)}M years`;
  if (years < 1e12) return `${Math.round(years / 1e9)}B years`;
  return 'Centuries+';
}

export function secureRandomInt(max: number): number {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return arr[0] % max;
}

export function pickRandom(str: string): string {
  return str[secureRandomInt(str.length)];
}
