-- Database setup for the restaurant style questionnaire.
-- Run once in Supabase: SQL Editor > New query > paste this file > Run.
-- Before running, replace YOUR_ADMIN_EMAIL below with the email you will log in with on admin.html.
--
-- Access model:
--   * Anyone visiting the website (anon key) can INSERT a submission, and nothing else.
--   * Only logged-in users whose email is in public.admins can SELECT or DELETE submissions.

  create table if not exists public.submissions (
    id           uuid primary key default gen_random_uuid(),
    created_at   timestamptz not null default now(),
    client_name  text not null check (char_length(client_name) between 1 and 200),
    client_email text not null check (char_length(client_email) between 3 and 320),
    picks        jsonb not null default '{}'::jsonb,
    yesno        jsonb not null default '{}'::jsonb,
    answers      jsonb not null default '{}'::jsonb,
    constraint submissions_size_limit
      check (pg_column_size(picks) + pg_column_size(yesno) + pg_column_size(answers) < 100000)
  );

  create table if not exists public.admins (
    email text primary key
  );

  insert into public.admins (email) values ('YOUR_ADMIN_EMAIL')
  on conflict (email) do nothing;

  -- Runs with the owner's rights so policies can check the admins table,
  -- which itself stays unreadable through the API.
  create or replace function public.is_admin()
  returns boolean
  language sql
  stable
  security definer
  set search_path = public
  as $$
    select exists (
      select 1 from public.admins where lower(email) = lower(auth.jwt() ->> 'email')
    );
  $$;

  alter table public.submissions enable row level security;
  alter table public.admins enable row level security;

  drop policy if exists "Anyone can submit answers" on public.submissions;
  create policy "Anyone can submit answers"
    on public.submissions for insert
    to anon, authenticated
    with check (true);

  drop policy if exists "Admins can read answers" on public.submissions;
  create policy "Admins can read answers"
    on public.submissions for select
    to authenticated
    using (public.is_admin());

  drop policy if exists "Admins can delete answers" on public.submissions;
  create policy "Admins can delete answers"
    on public.submissions for delete
    to authenticated
    using (public.is_admin());

  revoke all on public.submissions from anon, authenticated;
  grant insert on public.submissions to anon, authenticated;
  grant select, delete on public.submissions to authenticated;
  revoke all on public.admins from anon, authenticated;
