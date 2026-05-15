import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createAdminClient } from '@/lib/supabase/server';
import { sendOrderNotification } from '@/lib/telegram';

const orderSchema = z.object({
  name: z.string().min(2).max(100),
  phone: z
    .string()
    .min(10)
    .max(20)
    .regex(/^[+\d\s()-]{10,}$/),
  email: z.string().email().optional().or(z.literal('')),
  city: z.string().min(2).max(100),
  branch: z.string().min(1).max(200),
  comment: z.string().max(1000).optional(),
  locale: z.enum(['uk', 'ru', 'en']).optional(),
});

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = orderSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const supabase = createAdminClient();

  const insertPayload = {
    customer_name: data.name,
    phone: data.phone,
    email: data.email || null,
    city: data.city,
    np_branch: data.branch,
    comment: data.comment || null,
    locale: data.locale || 'uk',
  };

  const { data: inserted, error } = await supabase
    .from('orders')
    .insert(insertPayload)
    .select('id')
    .single();

  if (error || !inserted) {
    console.error('Order insert error:', error);
    return NextResponse.json({ error: 'Failed to save order' }, { status: 500 });
  }

  try {
    await sendOrderNotification({ id: inserted.id, ...insertPayload });
  } catch (e) {
    console.error('Order saved but Telegram notification failed:', e);
  }

  return NextResponse.json({ ok: true });
}
