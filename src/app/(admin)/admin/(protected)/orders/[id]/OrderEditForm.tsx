'use client';

import { useActionState } from 'react';
import { updateOrderAction } from '../../actions';
import { STATUS_LABELS, type OrderStatus } from '@/lib/orders/types';

const STATUSES: OrderStatus[] = [
  'new',
  'paid',
  'ordered',
  'shipped',
  'delivered',
  'cancelled',
];

const initialState: { error?: string; ok?: boolean } = {};

export function OrderEditForm({
  id,
  status,
  trackingNumber,
}: {
  id: string;
  status: OrderStatus;
  trackingNumber: string;
}) {
  const [state, formAction, isPending] = useActionState(
    async (_prev: typeof initialState, formData: FormData) => {
      const result = await updateOrderAction(formData);
      return result ?? initialState;
    },
    initialState,
  );

  return (
    <form
      action={formAction}
      className="space-y-4 rounded-2xl border border-white/10 bg-white/3 p-5"
    >
      <input type="hidden" name="id" value={id} />

      <div>
        <label
          htmlFor="status"
          className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400"
        >
          Статус
        </label>
        <select
          id="status"
          name="status"
          defaultValue={status}
          className="w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2.5 text-sm text-slate-100 focus:border-emerald-500/50 focus:outline-none"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="tracking_number"
          className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400"
        >
          Трек-номер Новой Почты
        </label>
        <input
          id="tracking_number"
          name="tracking_number"
          type="text"
          defaultValue={trackingNumber}
          placeholder="20450123456789"
          className="w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-500/50 focus:outline-none"
        />
      </div>

      {state.error && (
        <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-300">
          {state.error}
        </p>
      )}
      {state.ok && (
        <p className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-300">
          Сохранено
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-full bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:opacity-60"
      >
        {isPending ? 'Сохраняем...' : 'Сохранить'}
      </button>
    </form>
  );
}
