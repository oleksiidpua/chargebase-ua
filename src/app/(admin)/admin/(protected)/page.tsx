import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { type Order, STATUS_LABELS, STATUS_COLORS } from '@/lib/orders/types';

export const dynamic = 'force-dynamic';

export default async function OrdersListPage() {
  const supabase = await createClient();
  const { data: orders, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">
        Ошибка загрузки заказов: {error.message}
      </div>
    );
  }

  const list = (orders ?? []) as Order[];

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Заказы</h1>
        <span className="text-sm text-slate-400">всего: {list.length}</span>
      </div>

      {list.length === 0 ? (
        <p className="mt-12 text-center text-slate-400">
          Заказов пока нет. Когда клиент отправит форму с сайта — заказ появится здесь.
        </p>
      ) : (
        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-left text-xs uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-4 py-3">Дата</th>
                <th className="px-4 py-3">Клиент</th>
                <th className="px-4 py-3">Телефон</th>
                <th className="px-4 py-3">Город</th>
                <th className="px-4 py-3">Статус</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {list.map((order) => (
                <tr key={order.id} className="hover:bg-white/3">
                  <td className="whitespace-nowrap px-4 py-3 text-slate-400">
                    {formatDate(order.created_at)}
                  </td>
                  <td className="px-4 py-3 font-medium">
                    {order.customer_name}
                  </td>
                  <td className="px-4 py-3 text-slate-300">
                    <a
                      href={`tel:${order.phone}`}
                      className="hover:text-emerald-400"
                    >
                      {order.phone}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-slate-300">{order.city}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[order.status]}`}
                    >
                      {STATUS_LABELS[order.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="text-xs font-medium text-emerald-400 hover:text-emerald-300"
                    >
                      Открыть →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}
