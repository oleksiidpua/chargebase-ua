import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

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
  const supabase = await createClient();

  const { error } = await supabase.from('orders').insert({
    customer_name: data.name,
    phone: data.phone,
    email: data.email || null,
    city: data.city,
    np_branch: data.branch,
    comment: data.comment || null,
    locale: data.locale || 'uk',
  });

  if (error) {
    console.error('Order insert error:', error);
    return NextResponse.json({ error: 'Failed to save order' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
