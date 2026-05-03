export type OrderStatus =
  | 'new'
  | 'paid'
  | 'ordered'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export type Order = {
  id: string;
  created_at: string;
  updated_at: string;
  customer_name: string;
  phone: string;
  email: string | null;
  city: string;
  np_branch: string;
  comment: string | null;
  quantity: number;
  total_uah: number;
  status: OrderStatus;
  tracking_number: string | null;
  locale: string | null;
};

export const STATUS_LABELS: Record<OrderStatus, string> = {
  new: 'Новый',
  paid: 'Оплачен',
  ordered: 'Заказан на AliExpress',
  shipped: 'Отправлен',
  delivered: 'Доставлен',
  cancelled: 'Отменён',
};

export const STATUS_COLORS: Record<OrderStatus, string> = {
  new: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
  paid: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  ordered: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  shipped: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
  delivered: 'bg-emerald-600/20 text-emerald-200 border-emerald-600/40',
  cancelled: 'bg-red-500/15 text-red-300 border-red-500/30',
};
