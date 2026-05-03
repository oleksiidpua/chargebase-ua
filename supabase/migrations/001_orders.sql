-- Orders table for ChargeBase UA
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  customer_name text not null,
  phone text not null,
  email text,
  city text not null,
  np_branch text not null,
  comment text,
  quantity int not null default 1,
  total_uah numeric(10, 2) not null default 22950,
  status text not null default 'new' check (
    status in ('new', 'paid', 'ordered', 'shipped', 'delivered', 'cancelled')
  ),
  tracking_number text,
  locale text default 'uk'
);

create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists orders_status_idx on public.orders (status);

-- Updated_at trigger
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists orders_set_updated_at on public.orders;
create trigger orders_set_updated_at
  before update on public.orders
  for each row execute function public.set_updated_at();

-- Row Level Security
alter table public.orders enable row level security;

-- Anyone (anonymous) can INSERT orders (form submission).
-- The API route MUST use `Prefer: return=minimal` (or omit .select())
-- because anon has no SELECT policy, so returning the row would fail RLS.
drop policy if exists "anon_insert_orders" on public.orders;
create policy "anon_insert_orders" on public.orders
  for insert to anon with check (true);

grant insert on public.orders to anon;

-- Only authenticated users (admins) can SELECT/UPDATE/DELETE
drop policy if exists "auth_select_orders" on public.orders;
create policy "auth_select_orders" on public.orders
  for select to authenticated using (true);

drop policy if exists "auth_update_orders" on public.orders;
create policy "auth_update_orders" on public.orders
  for update to authenticated using (true) with check (true);

drop policy if exists "auth_delete_orders" on public.orders;
create policy "auth_delete_orders" on public.orders
  for delete to authenticated using (true);

grant select, insert, update, delete on public.orders to authenticated;
