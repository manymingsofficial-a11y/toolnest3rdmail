import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = (body.email as string)?.trim().toLowerCase();

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const { data: existing } = await supabaseServer
      .from('admin_newsletter_subscribers')
      .select('id, status')
      .eq('email', email)
      .maybeSingle();

    // Always return success to prevent email enumeration
    if (!existing) {
      // Email not found - return generic success
      return NextResponse.json({
        ok: true,
        message: "If this email was subscribed, it has been unsubscribed. If it wasn't subscribed, no action was needed.",
      });
    }

    if (existing.status === 'unsubscribed') {
      // Already unsubscribed - return generic success
      return NextResponse.json({
        ok: true,
        message: "If this email was subscribed, it has been unsubscribed. If it was already unsubscribed, no changes were made.",
      });
    }

    const { error } = await supabaseServer
      .from('admin_newsletter_subscribers')
      .update({ status: 'unsubscribed' })
      .eq('id', existing.id);

    if (error) {
      return NextResponse.json(
        { error: 'Failed to unsubscribe. Please try again.' },
        { status: 500 }
      );
    }

    // Track unsubscribe
    await supabaseServer.from('admin_click_events').insert({
      type: 'newsletter',
      placement: 'unsubscribe',
      target_id: email,
      metadata: { action: 'unsubscribe' },
    });

    return NextResponse.json({
      ok: true,
      message: "If this email was subscribed, it has been unsubscribed. You will no longer receive updates.",
    });
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}