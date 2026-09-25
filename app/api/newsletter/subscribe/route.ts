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

    if (email.length > 320) {
      return NextResponse.json(
        { error: 'Email address is too long.' },
        { status: 400 }
      );
    }

    // Check for existing subscriber (duplicate prevention)
    const { data: existing } = await supabaseServer
      .from('admin_newsletter_subscribers')
      .select('id, status')
      .eq('email', email)
      .maybeSingle();

    // Always return success to prevent email enumeration
    // The actual logic still runs but response is generic
    if (existing) {
      if (existing.status === 'active') {
        // Already subscribed - silently return success
        return NextResponse.json({
          ok: true,
          message: "If this email is subscribed, you'll receive a confirmation. If not, you've been added to the list.",
        });
      }
      // Reactivate unsubscribed user
      const { error: reactivateError } = await supabaseServer
        .from('admin_newsletter_subscribers')
        .update({
          status: 'active',
          subscribed_at: new Date().toISOString(),
        })
        .eq('id', existing.id);

      if (reactivateError) {
        return NextResponse.json(
          { error: 'Failed to subscribe. Please try again.' },
          { status: 500 }
        );
      }

      // Track signup
      await supabaseServer.from('admin_click_events').insert({
        type: 'newsletter',
        placement: 'subscribe',
        target_id: email,
        metadata: { action: 'reactivate' },
      });

      return NextResponse.json({
        ok: true,
        message: "If this email was previously unsubscribed, it's been reactivated. If not, you've been added to the list.",
      });
    }

    // Insert new subscriber
    const { error: insertError } = await supabaseServer
      .from('admin_newsletter_subscribers')
      .insert({
        email,
        subscribed_at: new Date().toISOString(),
        status: 'active',
      });

    if (insertError) {
      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again.' },
        { status: 500 }
      );
    }

    // Track signup
    await supabaseServer.from('admin_click_events').insert({
      type: 'newsletter',
      placement: 'subscribe',
      target_id: email,
      metadata: { action: 'new' },
    });

    return NextResponse.json({
      ok: true,
      message: "If this email is new, you've been added to the list. If it was already subscribed, no changes were made.",
    });
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}