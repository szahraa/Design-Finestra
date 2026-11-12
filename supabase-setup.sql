-- Design Finestra — Supabase setup
-- Run this in the Supabase SQL Editor (Dashboard → SQL → New query)

-- 1) Projects table
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text default '',
  category text not null default 'Interior',
  image_url text not null,
  created_at timestamptz not null default now()
);

create index if not exists projects_created_at_idx
  on public.projects (created_at desc);

create index if not exists projects_category_idx
  on public.projects (category);

-- 2) Enable Row Level Security
alter table public.projects enable row level security;

-- Anyone can read projects (public gallery)
drop policy if exists "Public can view projects" on public.projects;
create policy "Public can view projects"
  on public.projects
  for select
  to anon, authenticated
  using (true);

-- Only authenticated users can insert
drop policy if exists "Authenticated can insert projects" on public.projects;
create policy "Authenticated can insert projects"
  on public.projects
  for insert
  to authenticated
  with check (true);

-- Only authenticated users can update
drop policy if exists "Authenticated can update projects" on public.projects;
create policy "Authenticated can update projects"
  on public.projects
  for update
  to authenticated
  using (true)
  with check (true);

-- Only authenticated users can delete
drop policy if exists "Authenticated can delete projects" on public.projects;
create policy "Authenticated can delete projects"
  on public.projects
  for delete
  to authenticated
  using (true);

-- 3) Storage bucket for project photos (public read)
insert into storage.buckets (id, name, public)
values ('project-photos', 'project-photos', true)
on conflict (id) do update set public = excluded.public;

-- Public read for photos
drop policy if exists "Public can view project photos" on storage.objects;
create policy "Public can view project photos"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'project-photos');

-- Authenticated upload
drop policy if exists "Authenticated can upload project photos" on storage.objects;
create policy "Authenticated can upload project photos"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'project-photos');

-- Authenticated update
drop policy if exists "Authenticated can update project photos" on storage.objects;
create policy "Authenticated can update project photos"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'project-photos')
  with check (bucket_id = 'project-photos');

-- Authenticated delete
drop policy if exists "Authenticated can delete project photos" on storage.objects;
create policy "Authenticated can delete project photos"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'project-photos');

-- 4) Optional sample row (remove if you prefer an empty gallery)
-- insert into public.projects (title, description, category, image_url)
-- values (
--   'Sliding Glass Patio',
--   'Instalasi pintu sliding aluminium untuk hunian modern.',
--   'Kusen Aluminium',
--   'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
-- );
