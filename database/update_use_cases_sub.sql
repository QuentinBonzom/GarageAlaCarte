-- Update the "Pick your room" sub-line on the home page.
-- Run in Supabase SQL Editor.

update public.cms_sections
set content = content || jsonb_build_object(
  'sub', jsonb_build_object(
    'en', 'We specialize in garage remodeling, makeovers, and custom storage solutions for homeowners, real estate agencies, developers, builders, and property managers across Orlando and the surrounding areas.',
    'fr', 'Nous sommes spécialisés dans la rénovation de garages, les transformations et les solutions de rangement sur-mesure pour les propriétaires, les agences immobilières, les promoteurs, les constructeurs et les gestionnaires de biens à Orlando et ses environs.'
  )
),
updated_at = now()
where page_key = 'home'
  and section_key = 'use_cases';

-- Sanity check
-- select section_key, content->'sub' as sub
-- from public.cms_sections
-- where page_key = 'home' and section_key = 'use_cases';
