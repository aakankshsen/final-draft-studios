-- Run in the Supabase SQL editor for new and existing installations.
begin;

alter table public.enquiries add column if not exists archived_at timestamptz;

drop policy if exists "admin delete enquiries" on public.enquiries;
drop function if exists public.delete_selected_enquiries(uuid[]);

create or replace function public.archive_selected_enquiries(enquiry_ids uuid[])
returns bigint
language sql
security invoker
set search_path = ''
as $$
  with archived as (
    update public.enquiries
    set archived_at = now()
    where id = any(enquiry_ids) and archived_at is null
    returning id
  )
  select count(*) from archived;
$$;

revoke all on function public.archive_selected_enquiries(uuid[]) from public, anon;
grant execute on function public.archive_selected_enquiries(uuid[]) to authenticated;

commit;
