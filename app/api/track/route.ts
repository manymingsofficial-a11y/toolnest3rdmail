import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';

type BatchEvent = {
  type: 'page_view' | 'search' | 'ad_impression';
  data: Record<string, unknown>;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const events: BatchEvent[] = body.events ?? [];

    if (!Array.isArray(events) || events.length === 0) {
      return NextResponse.json({ error: 'No events' }, { status: 400 });
    }

    if (events.length > 100) {
      return NextResponse.json({ error: 'Too many events' }, { status: 413 });
    }

    const MAX_LEN = 500;
    const clamp = (v: unknown): string =>
      typeof v === 'string' ? v.slice(0, MAX_LEN) : '';

    const pageViewInserts: Record<string, unknown>[] = [];
    const searchInserts: Record<string, unknown>[] = [];
    const adImpressionInserts: Record<string, unknown>[] = [];
    const sessionUpserts: Record<string, unknown>[] = [];

    for (const event of events) {
      if (event.type === 'page_view') {
        const d = event.data;
        const now = new Date().toISOString();
        pageViewInserts.push({
          visitor_id: clamp(d.visitorId),
          session_id: clamp(d.sessionId),
          path: clamp(d.path),
          page_type: clamp(d.pageType) || 'other',
          tool_slug: clamp(d.toolSlug),
          category_slug: clamp(d.categorySlug),
          blog_slug: clamp(d.blogSlug),
          referrer: clamp(d.referrer),
          device_type: clamp(d.deviceType),
          browser: clamp(d.browser),
          os: clamp(d.os),
          country: '',
          created_at: now,
        });
        sessionUpserts.push({
          visitor_id: clamp(d.visitorId),
          session_id: clamp(d.sessionId),
          is_returning: d.isReturning ?? false,
          device_type: clamp(d.deviceType),
          browser: clamp(d.browser),
          os: clamp(d.os),
          country: '',
          referrer: clamp(d.referrer),
          landing_page: clamp(d.path),
          exit_page: clamp(d.path),
          page_count: 1,
          started_at: now,
          last_activity: now,
        });
      } else if (event.type === 'search') {
        const d = event.data;
        searchInserts.push({
          visitor_id: clamp(d.visitorId),
          session_id: clamp(d.sessionId),
          query: clamp(d.query),
          result_count: typeof d.resultCount === 'number' ? d.resultCount : 0,
          source: clamp(d.source) || 'page',
          created_at: new Date().toISOString(),
        });
      } else if (event.type === 'ad_impression') {
        const d = event.data;
        adImpressionInserts.push({
          slot: clamp(d.slot),
          visitor_id: clamp(d.visitorId),
          session_id: clamp(d.sessionId),
          created_at: new Date().toISOString(),
        });
      }
    }

    const errors: string[] = [];

    if (pageViewInserts.length > 0) {
      const { error } = await supabaseServer.from('analytics_page_views').insert(pageViewInserts);
      if (error) errors.push(`page_views: ${error.message}`);
    }

    if (searchInserts.length > 0) {
      const { error } = await supabaseServer.from('analytics_search_events').insert(searchInserts);
      if (error) errors.push(`search_events: ${error.message}`);
    }

    if (adImpressionInserts.length > 0) {
      const { error } = await supabaseServer.from('analytics_ad_impressions').insert(adImpressionInserts);
      if (error) errors.push(`ad_impressions: ${error.message}`);
    }

    if (sessionUpserts.length > 0) {
      // Upsert sessions — update last_activity and exit_page if session exists
      for (const s of sessionUpserts) {
        const { error: upsertError } = await supabaseServer
          .from('analytics_visitor_sessions')
          .upsert(s, { onConflict: 'session_id' });
        if (upsertError) errors.push(`sessions: ${upsertError.message}`);
      }
    }

    if (errors.length > 0) {
      return NextResponse.json({ ok: true, partial: true, errors }, { status: 200 });
    }

    return NextResponse.json({ ok: true, count: events.length });
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
