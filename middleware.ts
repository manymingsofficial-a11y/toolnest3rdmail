import { NextRequest, NextResponse } from 'next/server';

// Rate limiter for API routes
// Note: In Netlify/serverless, each function invocation is stateless.
// In-memory rate limiting works within a single warm instance but resets on cold starts.
// For production-grade global rate limiting, use Netlify Edge Functions or a dedicated service (Upstash, Cloudflare KV).

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  message: string;
}

const API_RATE_LIMITS: Record<string, RateLimitConfig> = {
  '/api/track': { windowMs: 60_000, maxRequests: 100, message: 'Too many analytics requests. Please slow down.' },
  '/api/track-click': { windowMs: 60_000, maxRequests: 50, message: 'Too many click tracking requests.' },
  '/api/newsletter/subscribe': { windowMs: 60_000, maxRequests: 10, message: 'Too many subscription attempts.' },
  '/api/newsletter/unsubscribe': { windowMs: 60_000, maxRequests: 10, message: 'Too many unsubscribe attempts.' },
  '/api/contact': { windowMs: 60_000, maxRequests: 5, message: 'Too many contact form submissions.' },
};

// In-memory store (per instance)
const requestCounts = new Map<string, { count: number; resetAt: number }>();

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  const cfConnectingIp = req.headers.get('cf-connecting-ip');
  
  return cfConnectingIp || realIp || forwarded?.split(',')[0]?.trim() || 'unknown';
}

function getRateLimitKey(req: NextRequest, path: string): string {
  const ip = getClientIp(req);
  return `${path}:${ip}`;
}

function checkRateLimit(key: string, config: RateLimitConfig): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const entry = requestCounts.get(key);
  
  if (!entry || now > entry.resetAt) {
    requestCounts.set(key, { count: 1, resetAt: now + config.windowMs });
    return { allowed: true, remaining: config.maxRequests - 1, resetAt: now + config.windowMs };
  }
  
  if (entry.count >= config.maxRequests) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }
  
  entry.count++;
  return { allowed: true, remaining: config.maxRequests - entry.count, resetAt: entry.resetAt };
}

// Cleanup old entries periodically
setInterval(() => {
  const now = Date.now();
  const keys = Array.from(requestCounts.keys());
  for (const key of keys) {
    const entry = requestCounts.get(key);
    if (entry && now > entry.resetAt) {
      requestCounts.delete(key);
    }
  }
}, 5 * 60_000); // Every 5 minutes

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  
  // Only apply rate limiting to API routes
  if (!path.startsWith('/api/')) {
    return NextResponse.next();
  }
  
  // Find matching rate limit config (exact match first, then prefix)
  let config: RateLimitConfig | undefined;
  if (API_RATE_LIMITS[path]) {
    config = API_RATE_LIMITS[path];
  } else {
    // Check for prefix matches (e.g., /api/newsletter/*)
    for (const [pattern, cfg] of Object.entries(API_RATE_LIMITS)) {
      if (path.startsWith(pattern.replace('*', ''))) {
        config = cfg;
        break;
      }
    }
  }
  
  if (!config) {
    return NextResponse.next();
  }
  
  const key = getRateLimitKey(req, path);
  const { allowed, remaining, resetAt } = checkRateLimit(key, config);
  
  if (!allowed) {
    const retryAfter = Math.ceil((resetAt - Date.now()) / 1000);
    return new NextResponse(JSON.stringify({ 
      error: config.message,
      retryAfter 
    }), {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': String(retryAfter),
        'X-RateLimit-Limit': String(config.maxRequests),
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': String(Math.ceil(resetAt / 1000)),
      },
    });
  }
  
  const response = NextResponse.next();
  response.headers.set('X-RateLimit-Limit', String(config.maxRequests));
  response.headers.set('X-RateLimit-Remaining', String(remaining));
  response.headers.set('X-RateLimit-Reset', String(Math.ceil(resetAt / 1000)));
  
  return response;
}

export const config = {
  matcher: [
    '/api/track',
    '/api/track-click',
    '/api/newsletter/subscribe',
    '/api/newsletter/unsubscribe',
    '/api/contact',
  ],
};