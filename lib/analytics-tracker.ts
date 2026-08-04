'use client';

/**
 * Client-side analytics tracker with batching, session/visitor IDs,
 * and device detection. Sends events to /api/track in batches.
 */

const VISITOR_KEY = 'tn_visitor_id';
const SESSION_KEY = 'tn_session_id';
const SESSION_LAST_KEY = 'tn_session_last';
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

const BATCH_SIZE = 10;
const BATCH_TIMEOUT = 5000;

type AnalyticsEvent = {
  type: 'page_view' | 'search' | 'ad_impression';
  data: Record<string, unknown>;
};

let batch: AnalyticsEvent[] = [];
let batchTimer: ReturnType<typeof setTimeout> | null = null;

function getOrCreateVisitorId(): string {
  if (typeof window === 'undefined') return '';
  let id = localStorage.getItem(VISITOR_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(VISITOR_KEY, id);
  }
  return id;
}

function getOrCreateSessionId(): { sessionId: string; isReturning: boolean } {
  if (typeof window === 'undefined') return { sessionId: '', isReturning: false };
  const now = Date.now();
  const last = parseInt(localStorage.getItem(SESSION_LAST_KEY) ?? '0', 10);
  let sessionId = sessionStorage.getItem(SESSION_KEY) ?? '';
  let isReturning = false;

  // New session if no session ID or session expired
  if (!sessionId || now - last > SESSION_TIMEOUT) {
    const previousVisitor = localStorage.getItem(VISITOR_KEY);
    isReturning = !!previousVisitor;
    sessionId = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, sessionId);
  }

  localStorage.setItem(SESSION_LAST_KEY, String(now));
  return { sessionId, isReturning };
}

function detectDevice(): { deviceType: string; browser: string; os: string } {
  if (typeof navigator === 'undefined') return { deviceType: '', browser: '', os: '' };

  const ua = navigator.userAgent;
  let deviceType = 'desktop';
  if (/Mobile|Android|iPhone/i.test(ua)) deviceType = 'mobile';
  else if (/iPad|Tablet/i.test(ua)) deviceType = 'tablet';

  let browser = 'other';
  if (/Edg\//i.test(ua)) browser = 'edge';
  else if (/Chrome\//i.test(ua)) browser = 'chrome';
  else if (/Firefox\//i.test(ua)) browser = 'firefox';
  else if (/Safari\//i.test(ua)) browser = 'safari';

  let os = 'other';
  if (/Windows/i.test(ua)) os = 'windows';
  else if (/Mac OS/i.test(ua)) os = 'macos';
  else if (/Android/i.test(ua)) os = 'android';
  else if (/iPhone|iPad|iPod/i.test(ua)) os = 'ios';
  else if (/Linux/i.test(ua)) os = 'linux';

  return { deviceType, browser, os };
}

function derivePageType(path: string): { pageType: string; toolSlug: string; categorySlug: string; blogSlug: string } {
  let pageType = 'other';
  let toolSlug = '';
  let categorySlug = '';
  let blogSlug = '';

  if (path === '/') pageType = 'homepage';
  else if (path.startsWith('/tools/')) {
    pageType = 'tool';
    toolSlug = path.split('/')[2] ?? '';
  } else if (path.startsWith('/categories')) {
    pageType = 'category';
    const params = new URLSearchParams(path.split('?')[1] ?? '');
    categorySlug = params.get('cat') ?? '';
  } else if (path.startsWith('/blog/')) {
    pageType = 'blog';
    blogSlug = path.split('/')[2] ?? '';
  } else if (path.startsWith('/search')) {
    pageType = 'search';
  }

  return { pageType, toolSlug, categorySlug, blogSlug };
}

function flushBatch() {
  if (batch.length === 0) return;
  const events = [...batch];
  batch = [];
  if (batchTimer) {
    clearTimeout(batchTimer);
    batchTimer = null;
  }

  try {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ events }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // best-effort
  }
}

function queueEvent(event: AnalyticsEvent) {
  batch.push(event);
  if (batch.length >= BATCH_SIZE) {
    flushBatch();
  } else if (!batchTimer) {
    batchTimer = setTimeout(flushBatch, BATCH_TIMEOUT);
  }
}

export function trackPageView(path: string) {
  if (typeof window === 'undefined') return;
  // Don't track admin pages
  if (path.startsWith('/admin')) return;
  // Don't track API routes
  if (path.startsWith('/api/')) return;

  const visitorId = getOrCreateVisitorId();
  const { sessionId, isReturning } = getOrCreateSessionId();
  const { deviceType, browser, os } = detectDevice();
  const { pageType, toolSlug, categorySlug, blogSlug } = derivePageType(path);
  const referrer = document.referrer ?? '';

  queueEvent({
    type: 'page_view',
    data: {
      visitorId,
      sessionId,
      isReturning,
      path,
      pageType,
      toolSlug,
      categorySlug,
      blogSlug,
      referrer,
      deviceType,
      browser,
      os,
    },
  });
}

export function trackSearch(query: string, resultCount: number, source: 'page' | 'command_palette' = 'page') {
  if (typeof window === 'undefined') return;
  if (!query.trim()) return;

  const visitorId = getOrCreateVisitorId();
  const { sessionId } = getOrCreateSessionId();

  queueEvent({
    type: 'search',
    data: {
      visitorId,
      sessionId,
      query: query.trim().toLowerCase(),
      resultCount,
      source,
    },
  });
}

export function trackAdImpression(slot: string) {
  if (typeof window === 'undefined') return;
  if (!slot) return;

  const visitorId = getOrCreateVisitorId();
  const { sessionId } = getOrCreateSessionId();

  queueEvent({
    type: 'ad_impression',
    data: {
      slot,
      visitorId,
      sessionId,
    },
  });
}

export function flushAnalytics() {
  flushBatch();
}
