import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendContactNotification } from '@/lib/telegram';

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  contact: z.string().min(3).max(200),
  question: z.string().min(10).max(2000),
});

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', issues: parsed.error.issues },
      { status: 400 }
    );
  }

  try {
    await sendContactNotification(parsed.data);
  } catch (e) {
    console.error('Contact notification failed:', e);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
