-- Assessments from the public contact form.
-- Visitors may insert name, email, phone, service, destination, and message.
-- Only a signed-in staff user can read or update rows.
-- Create that user in the Supabase dashboard. Public sign-up stays off.

create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text not null default '',
  service text not null default '',
  destination text not null default '',
  message text not null,
  status text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  note text not null default ''
);

alter table public.inquiries enable row level security;

revoke all on table public.inquiries from anon, authenticated;

grant insert (name, email, phone, service, destination, message)
  on table public.inquiries to anon, authenticated;

grant select, update on table public.inquiries to authenticated;

create policy inquiries_insert
  on public.inquiries
  for insert
  to anon, authenticated
  with check (true);

create policy inquiries_select
  on public.inquiries
  for select
  to authenticated
  using (true);

create policy inquiries_update
  on public.inquiries
  for update
  to authenticated
  using (true)
  with check (true);
