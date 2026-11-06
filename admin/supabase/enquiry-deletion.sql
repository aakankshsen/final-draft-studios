-- Run once in the Supabase SQL editor for existing installations.
drop policy if exists "admin delete enquiries" on public.enquiries;
create policy "admin delete enquiries" on public.enquiries
  for delete to authenticated using (true);

create or replace function public.delete_selected_enquiries(enquiry_ids uuid[])
returns bigint
language sql
security invoker
set search_path = ''
as $$
  with deleted as (
    delete from public.enquiries where id = any(enquiry_ids) returning id
  )
  select count(*) from deleted;
$$;

revoke all on function public.delete_selected_enquiries(uuid[]) from public, anon;
grant execute on function public.delete_selected_enquiries(uuid[]) to authenticated;
