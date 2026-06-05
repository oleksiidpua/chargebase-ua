import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const supabase = createAdminClient();

  const { error, count } = await supabase
    .from('orders')
    .select('id', { count: 'exact', head: true });

  if (error) {
    return NextResponse.json(
      { ok: false, db: 'error', error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    db: 'connected',
    orders_count: count,
    timestamp: new Date().toISOString(),
  });
}
