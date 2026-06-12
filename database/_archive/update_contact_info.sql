-- ============================================================================
-- Mise à jour des coordonnées réelles (email + téléphones)
-- ----------------------------------------------------------------------------
-- À exécuter dans Supabase → SQL Editor.
-- Idempotent : peut être ré-exécuté sans risque (UPDATE sur des lignes existantes).
--
-- Email partagé : garagealacarte@gmail.com
-- Guillaume     : +1 (917) 353-4950  (indicatif New York) — numéro utilisé pour le SEO
-- Juliette      : +1 (689) 217-4074  (indicatif Orlando)
-- ============================================================================

-- 1) Canaux de contact (page Contact + footer + téléphone des données SEO)
--    Le numéro principal du site est celui de Guillaume.
update public.contact_channels
set value = 'garagealacarte@gmail.com',
    href  = 'mailto:garagealacarte@gmail.com',
    updated_at = now()
where channel_key = 'main_email';

update public.contact_channels
set value = '+1 (917) 353-4950',
    href  = 'tel:+19173534950',
    updated_at = now()
where channel_key = 'main_phone';

-- 2) Équipe : téléphones individuels + email partagé
update public.team_members
set phone = '+1 (917) 353-4950',
    email = 'garagealacarte@gmail.com',
    updated_at = now()
where slug = 'guillaume';

update public.team_members
set phone = '+1 (689) 217-4074',
    email = 'garagealacarte@gmail.com',
    updated_at = now()
where slug = 'juliette';

-- 3) Vérification (optionnel) — décommenter pour contrôler le résultat
-- select channel_key, value, href from public.contact_channels
--   where channel_key in ('main_email', 'main_phone');
-- select slug, name, email, phone from public.team_members
--   where slug in ('guillaume', 'juliette');
