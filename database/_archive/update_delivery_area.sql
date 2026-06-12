-- ============================================================================
-- Harmonisation de la zone de service sur la formulation de la cliente
-- « On-site visits are available throughout the Orlando area. Visits beyond
--   our standard zone are quoted based on location. »
-- (remplace les anciennes mentions « within 20 miles of Orlando »)
-- ----------------------------------------------------------------------------
-- À exécuter dans Supabase → SQL Editor. Idempotent.
-- Les services 1, 2 et 3 sont déjà couverts par leurs scripts dédiés ;
-- ici on traite le service 4 (smart), l'adresse de contact et la page conditions.
-- ============================================================================

-- 1) Service 4 « Smart Integration » : section « Delivery area » dans detail_sections
update public.services
set detail_sections = (
      select jsonb_agg(
        case
          when section->'title'->>'en' = 'Delivery area'
          then section || jsonb_build_object('body', jsonb_build_object(
            'en', 'On-site visits are available throughout the Orlando area. Visits beyond our standard zone are quoted based on location.',
            'fr', 'Las visitas in situ están disponibles en toda la zona de Orlando. Las visitas fuera de nuestra zona estándar se presupuestan según la ubicación.'
          ))
          else section
        end
      )
      from jsonb_array_elements(detail_sections) as section
    ),
    updated_at = now()
where slug = 'smart';

-- 2) Adresse affichée (footer + page Contact)
update public.contact_channels
set value = 'Orlando, FL · on-site visits across the Orlando area',
    updated_at = now()
where channel_key = 'address';

-- 3) Page Conditions : section « Delivery Area »
update public.legal_sections
set body = jsonb_build_object(
      'en', 'On-site visits are available throughout the Orlando area. Visits beyond our standard zone are quoted based on location.',
      'fr', 'Las visitas in situ están disponibles en toda la zona de Orlando. Las visitas fuera de nuestra zona estándar se presupuestan según la ubicación.'
    ),
    updated_at = now()
where title->>'en' = 'Delivery Area';
