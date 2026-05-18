-- Add the hero tagline ("Unlock the Full Potential of Your Garage")
-- displayed just above the hero sub-line.
-- Run in Supabase SQL Editor.

update public.cms_sections
set content = content || jsonb_build_object(
  'tagline', jsonb_build_object(
    'en', 'Unlock the Full Potential of Your Garage',
    'fr', 'Révélez tout le potentiel de votre garage'
  )
),
updated_at = now()
where page_key = 'home'
  and section_key = 'hero';

-- Sanity check
-- select section_key, content->'tagline' as tagline
-- from public.cms_sections
-- where page_key = 'home' and section_key = 'hero';
