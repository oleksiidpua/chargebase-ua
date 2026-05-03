'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/admin/login');
}

const ALLOWED_STATUSES = [
  'new',
  'paid',
  'ordered',
  'shipped',
  'delivered',
  'cancelled',
] as const;

type Status = (typeof ALLOWED_STATUSES)[number];

function isStatus(value: string): value is Status {
  return (ALLOWED_STATUSES as readonly string[]).includes(value);
}

export async function updateOrderAction(formData: FormData) {
  const id = String(formData.get('id') ?? '');
  const status = String(formData.get('status') ?? '');
  const tracking = String(formData.get('tracking_number') ?? '').trim();

  if (!id || !isStatus(status)) {
    return { error: 'Некорректные данные' };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');

  const { error } = await supabase
    .from('orders')
    .update({
      status,
      tracking_number: tracking || null,
    })
    .eq('id', id);

  if (error) {
    return { error: 'Не удалось сохранить' };
  }

  revalidatePath('/admin');
  revalidatePath(`/admin/orders/${id}`);
  return { ok: true };
}
