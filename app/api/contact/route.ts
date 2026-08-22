import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactBody = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ContactBody;

    const name = (body.name ?? '').trim();
    const email = (body.email ?? '').trim().toLowerCase();
    const subject = (body.subject ?? '').trim();
    const message = (body.message ?? '').trim();

    if (!name) {
      return NextResponse.json(
        { error: 'Please enter your name.' },
        { status: 400 }
      );
    }
    if (name.length > 100) {
      return NextResponse.json(
        { error: 'Name must be 100 characters or fewer.' },
        { status: 400 }
      );
    }

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

    if (!subject) {
      return NextResponse.json(
        { error: 'Please enter a subject.' },
        { status: 400 }
      );
    }
    if (subject.length > 200) {
      return NextResponse.json(
        { error: 'Subject must be 200 characters or fewer.' },
        { status: 400 }
      );
    }

    if (!message) {
      return NextResponse.json(
        { error: 'Please enter a message.' },
        { status: 400 }
      );
    }
    if (message.length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters.' },
        { status: 400 }
      );
    }
    if (message.length > 5000) {
      return NextResponse.json(
        { error: 'Message must be 5000 characters or fewer.' },
        { status: 400 }
      );
    }

    const { error: insertError } = await supabaseServer
      .from('contact_messages')
      .insert({ name, email, subject, message });

    if (insertError) {
      return NextResponse.json(
        { error: 'Failed to send your message. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: 'Thanks for contacting us. Your message has been received.',
    });
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
