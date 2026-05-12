-- Keep only the three public portfolio projects.
-- Run this in the Supabase SQL editor after database/schema.sql has been applied.
--
-- This preserves existing image_url values for the kept projects.
-- It removes every other project row; project_images linked to removed projects
-- are deleted automatically by the project_images foreign key.

begin;

insert into public.projects (
  slug, service_id, name, tagline, project_type, size_label, duration_label, year,
  description, includes, value_points, status, is_featured, is_large, display_order
)
values
  ('the-social-hub', (select id from public.services where slug = 'transform'),
    jsonb_build_object('en', 'The Social Hub', 'fr', 'Le Social Hub'),
    jsonb_build_object('en', 'Turn your garage into the centerpiece of your home.', 'fr', 'Transformez votre garage en pièce maîtresse de la maison.'),
    jsonb_build_object('en', 'Entertainment / Bar', 'fr', 'Divertissement / Bar'),
    jsonb_build_object('en', '2–3 car garage', 'fr', 'Garage 2–3 voitures'),
    jsonb_build_object('en', '8 weeks', 'fr', '8 semaines'),
    '2025',
    jsonb_build_object('en', 'A complete transformation that turns your garage into a social, functional, and high-impact living space — built for entertaining, relaxing, and everyday enjoyment.', 'fr', 'Une transformation complète qui transforme votre garage en lieu social, fonctionnel et marquant — pensé pour recevoir, se détendre et profiter au quotidien.'),
    jsonb_build_object('en', jsonb_build_array('Wet bar', 'Custom cabinetry', 'Built-in appliances', 'Decorative wood wall panels', 'Pool table'), 'fr', jsonb_build_array('Bar avec point d''eau', 'Mobilier sur-mesure', 'Appareils encastrés', 'Panneaux muraux bois décoratifs', 'Billard')),
    jsonb_build_object('en', jsonb_build_array('Dedicated space for entertaining and relaxing', 'Comfort and functionality without expanding your home', 'High-impact upgrade that increases property value', 'A modern alternative to a traditional home addition'), 'fr', jsonb_build_array('Un espace dédié à recevoir et se détendre', 'Confort et fonctionnalité sans agrandir la maison', 'Une plus-value forte sur votre bien', 'Une alternative moderne à une extension traditionnelle')),
    'live', true, true, 10),
  ('the-daily-living-garage', (select id from public.services where slug = 'transform'),
    jsonb_build_object('en', 'The Daily Living Garage', 'fr', 'Le Garage du Quotidien'),
    jsonb_build_object('en', 'A multi-functional garage for work, fitness, and relaxation.', 'fr', 'Un garage multi-fonctions pour travailler, bouger et se détendre.'),
    jsonb_build_object('en', 'Multi-functional / Lifestyle', 'fr', 'Multi-fonctions / Lifestyle'),
    jsonb_build_object('en', '2 car garage', 'fr', 'Garage 2 voitures'),
    jsonb_build_object('en', '6 weeks', 'fr', '6 semaines'),
    '2025',
    jsonb_build_object('en', 'A complete transformation that turns your garage into a flexible, everyday living space designed to support your routine — from movement to focus to relaxation.', 'fr', 'Une transformation complète qui fait du garage un espace de vie flexible, pensé pour accompagner votre routine — du mouvement à la concentration jusqu''à la détente.'),
    jsonb_build_object('en', jsonb_build_array('Home fitness area with cardio equipment, floor space, and mirror', 'Lounge zone with sofa, TV, and relaxation area', 'Compact workspace or home office', 'Coffee / utility corner with storage', 'Integrated lighting and layout for daily use'), 'fr', jsonb_build_array('Zone fitness avec cardio, espace au sol et miroir', 'Lounge avec canapé, TV et espace détente', 'Bureau compact ou home office', 'Coin café / utilitaire avec rangement', 'Éclairage et agencement intégrés pour le quotidien')),
    jsonb_build_object('en', jsonb_build_array('Combine multiple functions in one optimised space', 'Improve daily comfort without expanding your home', 'Create a practical, organised environment for work and lifestyle', 'Increase your property value with a smart transformation'), 'fr', jsonb_build_array('Plusieurs fonctions dans un espace optimisé', 'Confort au quotidien sans extension', 'Un environnement pratique et organisé pour le travail et le lifestyle', 'Une transformation intelligente qui valorise le bien')),
    'live', true, false, 20),
  ('smart-living-garage', (select id from public.services where slug = 'transform'),
    jsonb_build_object('en', 'Smart Living Garage', 'fr', 'Smart Living Garage'),
    jsonb_build_object('en', 'Utility, comfort, and style — designed for daily life.', 'fr', 'Utilité, confort, style — pensé pour le quotidien.'),
    jsonb_build_object('en', 'Daily living / Utility', 'fr', 'Vie quotidienne / Utilitaire'),
    jsonb_build_object('en', '2 car garage', 'fr', 'Garage 2 voitures'),
    jsonb_build_object('en', '5 weeks', 'fr', '5 semaines'),
    '2025',
    jsonb_build_object('en', 'A complete transformation that turns your garage into a functional, comfortable extension of your home — combining utility, comfort, and style.', 'fr', 'Une transformation complète qui fait du garage une extension fonctionnelle et confortable de la maison — entre utilité, confort et style.'),
    jsonb_build_object('en', jsonb_build_array('Integrated laundry and utility area', 'Comfortable lounge space with TV, relaxation, and daily use', 'Smart storage solutions to keep everything organized', 'Clean, functional environment ready for everyday living'), 'fr', jsonb_build_array('Zone buanderie et utilitaire intégrée', 'Lounge confortable avec TV, détente et usage quotidien', 'Rangements smart pour garder l''espace organisé', 'Environnement propre, fonctionnel et prêt à vivre')),
    jsonb_build_object('en', jsonb_build_array('Free up space in the rest of your home', 'Simplify your daily routines and reduce clutter', 'Improve comfort while increasing your property value'), 'fr', jsonb_build_array('Libérer de l''espace dans le reste de la maison', 'Simplifier les routines quotidiennes et réduire le désordre', 'Améliorer le confort tout en valorisant le bien')),
    'live', true, false, 30)
on conflict (slug) do update
set service_id = excluded.service_id,
    name = excluded.name,
    tagline = excluded.tagline,
    project_type = excluded.project_type,
    size_label = excluded.size_label,
    duration_label = excluded.duration_label,
    year = excluded.year,
    description = excluded.description,
    includes = excluded.includes,
    value_points = excluded.value_points,
    status = excluded.status,
    is_featured = excluded.is_featured,
    is_large = excluded.is_large,
    display_order = excluded.display_order,
    updated_at = now();

delete from public.projects
where slug not in ('the-social-hub', 'the-daily-living-garage', 'smart-living-garage');

insert into public.project_images (project_id, label, placeholder_color, kind, display_order)
select p.id, x.label, x.placeholder_color, x.kind, x.display_order
from (
  values
    ('the-social-hub', 'Hero · Bar view', '#3a2c22', 'hero', 10),
    ('the-social-hub', 'Pool area', '#8b6f4e', 'gallery', 20),
    ('the-social-hub', 'Wood panel detail', '#5a4334', 'detail', 30),
    ('the-social-hub', 'Lounge', '#1f1812', 'gallery', 40),
    ('the-daily-living-garage', 'Lounge zone', '#c4a575', 'hero', 10),
    ('the-daily-living-garage', 'Fitness corner', '#3d322a', 'gallery', 20),
    ('the-daily-living-garage', 'Home office', '#7a6450', 'gallery', 30),
    ('smart-living-garage', 'Hero · open view', '#a89378', 'hero', 10),
    ('smart-living-garage', 'Laundry corner', '#4a3d33', 'gallery', 20),
    ('smart-living-garage', 'Lounge detail', '#d4bfa3', 'detail', 30)
) as x(project_slug, label, placeholder_color, kind, display_order)
join public.projects p on p.slug = x.project_slug
on conflict (project_id, display_order) do update
set label = excluded.label,
    placeholder_color = excluded.placeholder_color,
    kind = excluded.kind,
    updated_at = now();

delete from public.project_images image
where not exists (
  select 1
  from public.projects project
  where project.id = image.project_id
);

commit;

select slug, name, status, display_order
from public.projects
order by display_order;
