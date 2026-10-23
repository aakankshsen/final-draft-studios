-- Run in Supabase SQL editor.
-- After this: Authentication > Providers > Email > disable "Allow new users to sign up",
-- then create the client's user manually (Authentication > Users > Add user).

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  service text,
  message text not null,
  status text not null default 'new'
    check (status in ('new', 'contacted', 'in-progress', 'won', 'lost')),
  notes text not null default ''
);

create index if not exists enquiries_created_at_idx on public.enquiries (created_at desc);
create index if not exists enquiries_status_idx on public.enquiries (status);

create or replace function public.touch_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists enquiries_touch on public.enquiries;
create trigger enquiries_touch before update on public.enquiries
  for each row execute function public.touch_updated_at();

create table if not exists public.push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  endpoint text not null unique,
  p256dh text not null,
  auth text not null,
  created_at timestamptz not null default now()
);

alter table public.enquiries enable row level security;
alter table public.push_subscriptions enable row level security;

-- Inserts into enquiries come from the public site via the service role (bypasses RLS).
create policy "admin read enquiries" on public.enquiries
  for select to authenticated using (true);
create policy "admin update enquiries" on public.enquiries
  for update to authenticated using (true) with check (true);

create policy "own push subs select" on public.push_subscriptions
  for select to authenticated using (user_id = auth.uid());
create policy "own push subs insert" on public.push_subscriptions
  for insert to authenticated with check (user_id = auth.uid());
create policy "own push subs delete" on public.push_subscriptions
  for delete to authenticated using (user_id = auth.uid());
