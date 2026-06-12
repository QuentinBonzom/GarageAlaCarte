-- ============================================================================
-- EXPORT du contenu actuel (pour audit des traductions EN ↔ ES)
-- ----------------------------------------------------------------------------
-- À exécuter dans Supabase → SQL Editor.
-- Renvoie UNE seule cellule JSON regroupant toutes les tables de contenu.
-- → Clique sur la cellule, copie tout (ou « Download CSV »), et envoie-le.
-- (Lecture seule : cette requête ne modifie rien.)
-- ============================================================================

select jsonb_pretty(jsonb_build_object(
  'cms_sections',     (select jsonb_agg(jsonb_build_object('section_key', section_key, 'content', content) order by display_order) from public.cms_sections),
  'services',         (select jsonb_agg(to_jsonb(s) order by s.display_order) from public.services s),
  'team_members',     (select jsonb_agg(to_jsonb(t) order by t.display_order) from public.team_members t),
  'projects',         (select jsonb_agg(to_jsonb(p) order by p.display_order) from public.projects p),
  'process_steps',    (select jsonb_agg(to_jsonb(ps) order by ps.display_order) from public.process_steps ps),
  'contact_channels', (select jsonb_agg(to_jsonb(c) order by c.display_order) from public.contact_channels c),
  'legal_documents',  (select jsonb_agg(to_jsonb(d)) from public.legal_documents d),
  'legal_sections',   (select jsonb_agg(to_jsonb(ls) order by ls.section_number) from public.legal_sections ls),
  'site_settings',    (select jsonb_agg(to_jsonb(ss)) from public.site_settings ss)
)) as content_dump;
