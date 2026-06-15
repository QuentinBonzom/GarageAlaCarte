-- Add CMS-managed images (plans, etc.) to services.
-- Each entry: { "url": "<public url>", "alt": { "en": "", "fr": "" } }
-- Files are stored in the existing "project-images" bucket under services/<slug>/.
-- Run this in the Supabase SQL editor.

alter table public.services
  add column if not exists images jsonb not null default '[]'::jsonb;
