-- Restore the four service cards under "Choose your level of support."
-- Run this in the Supabase SQL editor after database/schema.sql.

begin;

insert into public.services (
  slug, service_number, title, subtitle, description, price_label, badge_label,
  tag_label, includes, not_included, deposit_schedule, onsite_label, display_order, is_active
)
values
  ('blueprint', '01',
    jsonb_build_object('en', 'Design Blueprint', 'fr', 'Design Blueprint'),
    jsonb_build_object('en', 'Plan it right. Build it your way.', 'fr', 'Planifiez bien. Construisez à votre façon.'),
    jsonb_build_object('en', 'Ideal for getting started: see your future garage before you build anything, with a custom layout, 3D design, and expert guidance.', 'fr', 'Idéal pour démarrer : visualisez votre futur garage avant de construire quoi que ce soit, avec un agencement sur-mesure, un design 3D et un accompagnement expert.'),
    jsonb_build_object('en', 'starts at $950', 'fr', 'à partir de 950 $'),
    null, null,
    jsonb_build_object('en', jsonb_build_array('1 optimized layout', '2 realistic views', '1 round of minor adjustments', 'Expert design guidance'), 'fr', jsonb_build_array('1 agencement optimisé', '2 vues réalistes', '1 série d''ajustements mineurs', 'Conseil expert')),
    jsonb_build_object('en', 'No product purchasing, no delivery, no installation.', 'fr', 'Pas d''achat de produits, pas de livraison, pas d''installation.'),
    null,
    jsonb_build_object('en', 'Design Blueprint + On-Site Assessment starts at $1,350', 'fr', 'Design Blueprint + évaluation sur site à partir de 1 350 $'),
    10, true),
  ('delivery', '02',
    jsonb_build_object('en', 'Design & Setup', 'fr', 'Design & Setup'),
    jsonb_build_object('en', 'Plan it right. Prepare it with confidence.', 'fr', 'Planifiez bien. Préparez avec confiance.'),
    jsonb_build_object('en', 'Move from vision to execution without the sourcing headache: design, realistic views, product selection, sourcing guidance, and setup planning.', 'fr', 'Passez de la vision à l''exécution sans la charge du sourcing : design, vues réalistes, sélection produits, accompagnement sourcing et plan de mise en place.'),
    jsonb_build_object('en', 'starts at $1,500', 'fr', 'à partir de 1 500 $'),
    jsonb_build_object('en', 'Most popular', 'fr', 'Le plus choisi'), null,
    jsonb_build_object('en', jsonb_build_array('1 optimized layout', '2 realistic views', 'Product selection guidance', 'Sourcing coordination', 'Setup planning for installation', '1 round of minor adjustments'), 'fr', jsonb_build_array('1 agencement optimisé', '2 vues réalistes', 'Sélection des produits', 'Coordination du sourcing', 'Planification de l''installation', '1 série d''ajustements mineurs')),
    jsonb_build_object('en', 'No final installation or contractor labor unless upgraded to Full Transformation.', 'fr', 'Pas d''installation finale ni de main-d''oeuvre entrepreneur sauf évolution vers Transformation Complète.'),
    jsonb_build_object('en', '50% / 25% / 25%', 'fr', '50 % / 25 % / 25 %'),
    null,
    20, true),
  ('transform', '03',
    jsonb_build_object('en', 'Full Transformation', 'fr', 'Transformation Complète'),
    jsonb_build_object('en', 'From concept to completion. We handle everything.', 'fr', 'Du concept à la livraison. Nous gérons tout.'),
    jsonb_build_object('en', 'Our most comprehensive service: a fully designed, fully managed, turnkey garage transformation with execution oversight.', 'fr', 'Notre service le plus complet : une transformation de garage clé en main, entièrement conçue, coordonnée et suivie jusqu''à l''exécution.'),
    jsonb_build_object('en', 'starts at $2,750', 'fr', 'à partir de 2 750 $'),
    null, null,
    jsonb_build_object('en', jsonb_build_array('Custom optimized layout', '3D design with 4-6 realistic views', 'Full space planning', 'Complete material & equipment selection', 'Sourcing and logistics coordination', 'Project management and execution oversight', 'Final walkthrough'), 'fr', jsonb_build_array('Agencement optimisé sur-mesure', 'Design 3D avec 4 à 6 vues réalistes', 'Planification complète de l''espace', 'Sélection complète matériaux & équipements', 'Coordination sourcing & logistique', 'Gestion de projet et suivi d''exécution', 'Visite finale')),
    null,
    jsonb_build_object('en', '50% / 25% / 25%', 'fr', '50 % / 25 % / 25 %'),
    null,
    30, true),
  ('smart', '04',
    jsonb_build_object('en', 'Smart Integration', 'fr', 'Smart Integration'),
    jsonb_build_object('en', 'Designed for daily performance, not just visual appeal.', 'fr', 'Pensé pour la performance au quotidien, pas seulement pour l''esthétique.'),
    jsonb_build_object('en', 'For projects requiring real functionality: technical planning for plumbing, electrical, HVAC, ventilation, media, smart features, and built-in systems.', 'fr', 'Pour les projets qui demandent une vraie fonctionnalité : planification technique plomberie, électricité, HVAC, ventilation, média, smart features et systèmes intégrés.'),
    jsonb_build_object('en', 'starts at $3,500', 'fr', 'à partir de 3 500 $'),
    null, jsonb_build_object('en', 'Add-on', 'fr', 'Add-on'),
    jsonb_build_object('en', jsonb_build_array('Technical integration aligned with your design', 'Planning of plumbing, electrical, HVAC, and ventilation', 'Built-in storage, media setup, and smart features', 'Coordination with qualified professionals', 'Technical layouts prepared for implementation'), 'fr', jsonb_build_array('Intégration technique alignée avec le design', 'Planification plomberie, électricité, HVAC et ventilation', 'Rangements intégrés, média et smart features', 'Coordination avec des professionnels qualifiés', 'Plans techniques prêts pour l''exécution')),
    null,
    jsonb_build_object('en', 'Included within your main project deposit structure.', 'fr', 'Inclus dans la structure d''acompte du projet principal.'),
    null,
    40, true)
on conflict (slug) do update
set service_number = excluded.service_number,
    title = excluded.title,
    subtitle = excluded.subtitle,
    description = excluded.description,
    price_label = excluded.price_label,
    badge_label = excluded.badge_label,
    tag_label = excluded.tag_label,
    includes = excluded.includes,
    not_included = excluded.not_included,
    deposit_schedule = excluded.deposit_schedule,
    onsite_label = excluded.onsite_label,
    display_order = excluded.display_order,
    is_active = true,
    updated_at = now();

delete from public.service_team_members
where service_id in (
  select id from public.services where slug in ('blueprint', 'delivery', 'transform', 'smart')
);

insert into public.service_team_members (service_id, team_member_id, display_order)
select s.id, t.id, x.display_order
from (
  values
    ('blueprint', 'aymeric', 10), ('blueprint', 'juliette', 20), ('blueprint', 'guillaume', 30),
    ('delivery', 'aymeric', 10), ('delivery', 'juliette', 20), ('delivery', 'guillaume', 30),
    ('transform', 'guillaume', 10), ('transform', 'aymeric', 20), ('transform', 'juliette', 30),
    ('smart', 'guillaume', 10), ('smart', 'aymeric', 20), ('smart', 'juliette', 30)
) as x(service_slug, team_slug, display_order)
join public.services s on s.slug = x.service_slug
join public.team_members t on t.slug = x.team_slug;

update public.cms_sections
set content = content || jsonb_build_object(
      'title', jsonb_build_object('en', 'Choose your level of support.', 'fr', 'Choisissez votre niveau d''accompagnement.'),
      'sub', jsonb_build_object(
        'en', 'Avoid costly mistakes. Start with a plan — or go all the way. Upgrade anytime.',
        'fr', 'Évitez les erreurs coûteuses. Commencez par un plan — ou allez jusqu''au bout. Évoluez à tout moment.'
      )
    ),
    is_active = true,
    updated_at = now()
where section_key = 'services_intro';

commit;

select slug, title, is_active, display_order
from public.services
where slug in ('blueprint', 'delivery', 'transform', 'smart')
order by display_order;
