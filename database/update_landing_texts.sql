-- =============================================================
-- Mise à jour des textes de la page d'accueil (CMS).
-- Exécuter en une fois dans le SQL Editor de Supabase.
-- =============================================================

-- 1. Hero — accroche au-dessus du sous-titre
update public.cms_sections
set content = content || jsonb_build_object(
  'tagline', jsonb_build_object(
    'en', 'Unlock the Full Potential of Your Garage',
    'fr', 'Révélez tout le potentiel de votre garage'
  )
),
updated_at = now()
where page_key = 'home' and section_key = 'hero';

-- 2. Pick your room — sous-titre
update public.cms_sections
set content = content || jsonb_build_object(
  'sub', jsonb_build_object(
    'en', 'We specialize in garage remodeling, makeovers, and custom storage solutions for homeowners, real estate agencies, developers, builders, and property managers across Orlando and the surrounding areas.',
    'fr', 'Nous sommes spécialisés dans la rénovation de garages, les transformations et les solutions de rangement sur-mesure pour les propriétaires, les agences immobilières, les promoteurs, les constructeurs et les gestionnaires de biens à Orlando et ses environs.'
  )
),
updated_at = now()
where page_key = 'home' and section_key = 'use_cases';

-- 3. Before / After — phrase de conclusion
update public.cms_sections
set content = content || jsonb_build_object(
  'statement', jsonb_build_object(
    'en', 'Experience American practicality and precision combined with European mood-visual design and advanced Color, Material & Finish (CMF) expertise for a stunning, functional space.',
    'fr', 'Découvrez la praticité et la précision américaines alliées au design visuel et à l''ambiance européens, ainsi qu''à une expertise avancée en Couleur, Matière & Finition (CMF), pour un espace fonctionnel et époustouflant.'
  )
),
updated_at = now()
where page_key = 'home' and section_key = 'before_after';

-- Vérification
-- select section_key, content from public.cms_sections
-- where page_key = 'home' and section_key in ('hero', 'use_cases', 'before_after');
