-- Add the Before/After closing statement to the home page.
-- Displayed below the Before / After captions.
-- Run in Supabase SQL Editor.

update public.cms_sections
set content = content || jsonb_build_object(
  'statement', jsonb_build_object(
    'en', 'Experience American practicality and precision combined with European mood-visual design and advanced Color, Material & Finish (CMF) expertise for a stunning, functional space.',
    'fr', 'Découvrez la praticité et la précision américaines alliées au design visuel et à l''ambiance européens, ainsi qu''à une expertise avancée en Couleur, Matière & Finition (CMF), pour un espace fonctionnel et époustouflant.'
  )
),
updated_at = now()
where page_key = 'home'
  and section_key = 'before_after';

-- Sanity check
-- select section_key, content->'statement' as statement
-- from public.cms_sections
-- where page_key = 'home' and section_key = 'before_after';
