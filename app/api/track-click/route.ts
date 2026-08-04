import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const type = body.type as string;
    const placement = body.placement as string;
    const targetId = body.targetId as string;
    const metadata = body.metadata ?? {};

    if (!type || !['ad', 'affiliate', 'newsletter'].includes(type)) {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    const { error } = await supabaseServer.from('admin_click_events').insert({
      type,
      placement: placement ?? '',
      target_id: targetId ?? '',
      metadata,
    });

    if (error) {
      return NextResponse.json({ error: 'Failed to track' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
