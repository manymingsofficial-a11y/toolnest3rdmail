/**
 * Secure URL validation utility to prevent SSRF attacks.
 * Validates URLs before making external requests from client or server.
 */

export interface ValidationResult {
  valid: boolean;
  error?: string;
  sanitizedUrl?: string;
}

// Private IPv4 ranges (RFC 1918)
const PRIVATE_IPV4_RANGES = [
  { start: ipToInt('10.0.0.0'), end: ipToInt('10.255.255.255') },      // 10.0.0.0/8
  { start: ipToInt('172.16.0.0'), end: ipToInt('172.31.255.255') },    // 172.16.0.0/12
  { start: ipToInt('192.168.0.0'), end: ipToInt('192.168.255.255') },  // 192.168.0.0/16
];

// Special IPv4 ranges
const SPECIAL_IPV4_RANGES = [
  { start: ipToInt('127.0.0.0'), end: ipToInt('127.255.255.255') },     // 127.0.0.0/8 - Loopback
  { start: ipToInt('169.254.0.0'), end: ipToInt('169.254.255.255') },   // 169.254.0.0/16 - Link-local
  { start: ipToInt('0.0.0.0'), end: ipToInt('0.255.255.255') },         // 0.0.0.0/8 - Current network
  { start: ipToInt('224.0.0.0'), end: ipToInt('239.255.255.255') },     // 224.0.0.0/4 - Multicast
  { start: ipToInt('240.0.0.0'), end: ipToInt('255.255.255.255') },     // 240.0.0.0/4 - Reserved
];

// Private IPv6 ranges
const PRIVATE_IPV6_PREFIXES = [
  '::1',                    // Loopback
  'fe80::',                 // Link-local (fe80::/10)
  'fc00::',                 // Unique local (fc00::/7)
  'fd00::',                 // Unique local
  '::ffff:',                // IPv4-mapped IPv6
  '64:ff9b::',              // IPv4-IPv6 translation
  '2001:db8::',             // Documentation (2001:db8::/32)
  '2001::',                 // Teredo (2001::/32)
  '2002::',                 // 6to4 (2002::/16)
];

// Blocked hostnames
const BLOCKED_HOSTNAMES = new Set([
  'localhost',
  'localhost.localdomain',
  'localhost6',
  'localhost6.localdomain6',
  'broadcasthost',
  'metadata',
  'metadata.google.internal',
  '169.254.169.254',        // AWS/GCP/Azure metadata
  'metadata.azure.com',
  'metadata.service',
]);

function ipToInt(ip: string): number {
  const parts = ip.split('.').map(Number);
  if (parts.length !== 4 || parts.some(p => p < 0 || p > 255 || isNaN(p))) {
    return -1;
  }
  return (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3];
}

function isPrivateIPv4(hostname: string): boolean {
  const ip = ipToInt(hostname);
  if (ip === -1) return false;

  for (const range of PRIVATE_IPV4_RANGES) {
    if (ip >= range.start && ip <= range.end) return true;
  }
  for (const range of SPECIAL_IPV4_RANGES) {
    if (ip >= range.start && ip <= range.end) return true;
  }
  return false;
}

function isPrivateIPv6(hostname: string): boolean {
  const lower = hostname.toLowerCase();
  for (const prefix of PRIVATE_IPV6_PREFIXES) {
    if (lower.startsWith(prefix)) return true;
  }
  return false;
}

function isBlockedHostname(hostname: string): boolean {
  const lower = hostname.toLowerCase();
  return BLOCKED_HOSTNAMES.has(lower);
}

/**
 * Validates a URL for safe external requests.
 * Returns sanitized URL if valid, or error if blocked.
 */
export function validateUrlForFetch(
  url: string,
  options: {
    allowHttp?: boolean;
    allowLocalhost?: boolean;
    allowedProtocols?: string[];
  } = {}
): ValidationResult {
  const {
    allowHttp = false,
    allowLocalhost = false,
    allowedProtocols = ['https:'],
  } = options;

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return { valid: false, error: 'Invalid URL format' };
  }

  // Protocol check
  if (!allowedProtocols.includes(parsed.protocol)) {
    return { valid: false, error: `Protocol ${parsed.protocol} not allowed. Allowed: ${allowedProtocols.join(', ')}` };
  }

  if (!allowHttp && parsed.protocol === 'http:') {
    return { valid: false, error: 'HTTP protocol not allowed. Use HTTPS.' };
  }

  const hostname = parsed.hostname.toLowerCase();

  // Check blocked hostnames
  if (isBlockedHostname(hostname)) {
    return { valid: false, error: `Access to ${hostname} is blocked` };
  }

  // Check localhost
  if (!allowLocalhost && (hostname === 'localhost' || hostname === 'localhost.localdomain' || hostname === '[::1]')) {
    return { valid: false, error: 'Access to localhost is blocked' };
  }

  // Check if hostname is an IP address
  const isIPv4 = /^(\d{1,3}\.){3}\d{1,3}$/.test(parsed.hostname);
  const isIPv6 = parsed.hostname.includes(':') && !parsed.hostname.startsWith('[');

  if (isIPv4) {
    if (isPrivateIPv4(parsed.hostname)) {
      return { valid: false, error: 'Access to private IP ranges is blocked' };
    }
  } else if (isIPv6 || parsed.hostname.startsWith('[')) {
    const ipv6Host = parsed.hostname.replace(/[\[\]]/g, '');
    if (isPrivateIPv6(ipv6Host)) {
      return { valid: false, error: 'Access to private IPv6 ranges is blocked' };
    }
  }

  // Validate port - block common internal service ports
  const port = parsed.port ? parseInt(parsed.port, 10) : (parsed.protocol === 'https:' ? 443 : 80);
  const BLOCKED_PORTS = new Set([
    22,    // SSH
    23,    // Telnet
    25,    // SMTP
    53,    // DNS
    110,   // POP3
    143,   // IMAP
    993,   // IMAPS
    995,   // POP3S
    1433,  // MSSQL
    3306,  // MySQL
    3389,  // RDP
    5432,  // PostgreSQL
    5900,  // VNC
    6379,  // Redis
    8080,  // Common proxy
    8443,  // Common alt HTTPS
    9000,  // Common dev
    9200,  // Elasticsearch
    27017, // MongoDB
  ]);
  if (BLOCKED_PORTS.has(port)) {
    return { valid: false, error: `Access to port ${port} is blocked` };
  }

  return { valid: true, sanitizedUrl: parsed.href };
}

/**
 * Validates a URL and all its redirect destinations.
 * For client-side use, this validates the initial URL only (redirects are handled by browser).
 * For server-side use, this would need to be called for each redirect.
 */
export function validateUrlAndRedirects(
  url: string,
  options: Parameters<typeof validateUrlForFetch>[1] = {}
): ValidationResult {
  return validateUrlForFetch(url, options);
}

/**
 * Creates a safe fetch wrapper with URL validation, timeout, and size limits.
 */
export async function safeFetch(
  url: string,
  init: RequestInit = {},
  options: {
    timeout?: number;
    maxSize?: number;
    maxRedirects?: number;
    validateUrl?: Parameters<typeof validateUrlForFetch>[1];
  } = {}
): Promise<Response> {
  const {
    timeout = 10000,
    maxSize = 10 * 1024 * 1024, // 10MB
    maxRedirects = 5,
    validateUrl: urlOptions = {},
  } = options;

  // Validate URL before fetching
  const validation = validateUrlForFetch(url, urlOptions);
  if (!validation.valid) {
    throw new Error(validation.error || 'Invalid URL');
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  let redirectCount = 0;
  let currentUrl = url;

  while (redirectCount <= maxRedirects) {
    const validated = validateUrlForFetch(currentUrl, urlOptions);
    if (!validated.valid) {
      throw new Error(`Redirect to blocked URL: ${validated.error}`);
    }

    try {
      const response = await fetch(currentUrl, {
        ...init,
        signal: controller.signal,
        redirect: 'manual', // Handle redirects manually
      });

      clearTimeout(timeoutId);

      // Check content length
      const contentLength = response.headers.get('content-length');
      if (contentLength && parseInt(contentLength, 10) > maxSize) {
        throw new Error(`Response too large (max ${maxSize} bytes)`);
      }

      // Handle redirects manually
      if (response.status >= 300 && response.status < 400) {
        const location = response.headers.get('location');
        if (!location) {
          return response;
        }
        currentUrl = new URL(location, currentUrl).href;
        redirectCount++;
        continue;
      }

      return response;
    } catch (err) {
      clearTimeout(timeoutId);
      if (err instanceof DOMException && err.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw err;
    }
  }

  throw new Error('Too many redirects');
}

/**
 * Validates a URL for display/preview purposes (less strict).
 * Allows HTTP and localhost for preview tools.
 */
export function validateUrlForPreview(url: string): ValidationResult {
  return validateUrlForFetch(url, {
    allowHttp: true,
    allowLocalhost: true,
    allowedProtocols: ['http:', 'https:'],
  });
}