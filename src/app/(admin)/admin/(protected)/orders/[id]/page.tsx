import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { type Order, STATUS_LABELS, STATUS_COLORS } from '@/lib/orders/types';
import { OrderEditForm } from './OrderEditForm';

export const dynamic = 'force-dynamic';

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error || !data) {
    notFound();
  }

  const order = data as Order;

  return (
    <div>
      <Link
        href="/admin"
        className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-emerald-400"
      >
        ← К списку заказов
      </Link>

      <div className="mt-4 flex flex-wrap items-baseline gap-3">
        <h1 className="text-2xl font-bold tracking-tight">
          Заказ {order.customer_name}
        </h1>
        <span
          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[order.status]}`}
        >
          {STATUS_LABELS[order.status]}
        </span>
      </div>

      <div className="mt-1 text-sm text-slate-400">
        Создан: {formatDate(order.created_at)} · Обновлён:{' '}
        {formatDate(order.updated_at)}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
            Данные клиента
          </h2>
          <dl className="space-y-3 rounded-2xl border border-white/10 bg-white/3 p-5 text-sm">
            <Row label="ПІБ" value={order.customer_name} />
            <Row
              label="Телефон"
              value={
                <a
                  href={`tel:${order.phone}`}
                  className="text-emerald-400 hover:text-emerald-300"
                >
                  {order.phone}
                </a>
              }
            />
            <Row
              label="Email"
              value={
                order.email ? (
                  <a
                    href={`mailto:${order.email}`}
                    className="text-emerald-400 hover:text-emerald-300"
                  >
                    {order.email}
                  </a>
                ) : (
                  <span className="text-slate-500">не указан</span>
                )
              }
            />
            <Row label="Город" value={order.city} />
            <Row label="Отделение НП" value={order.np_branch} />
            <Row
              label="Комментарий"
              value={
                order.comment ?? (
                  <span className="text-slate-500">пусто</span>
                )
              }
            />
            <Row label="Локаль формы" value={order.locale ?? '—'} />
            <Row label="Количество" value={String(order.quantity)} />
            <Row
              label="Сумма"
              value={`${Number(order.total_uah).toLocaleString('ru-RU')} ₴`}
            />
          </dl>
        </section>

        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
            Управление
          </h2>
          <OrderEditForm
            id={order.id}
            status={order.status}
            trackingNumber={order.tracking_number ?? ''}
          />
        </section>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[140px_1fr] gap-3">
      <dt className="text-slate-400">{label}</dt>
      <dd className="text-slate-100">{value}</dd>
    </div>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
