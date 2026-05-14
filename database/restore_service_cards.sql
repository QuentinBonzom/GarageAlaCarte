-- Restore the four service cards under "Choose your level of support."
-- Run this in the Supabase SQL editor after database/schema.sql.

begin;

alter table public.services
  add column if not exists detail_sections jsonb not null default '[]'::jsonb;

insert into public.services (
  slug, service_number, title, subtitle, description, price_label, badge_label,
  tag_label, includes, not_included, deposit_schedule, onsite_label, detail_sections, display_order, is_active
)
values
  ('blueprint', '01',
    jsonb_build_object('en', 'Design Blueprint', 'fr', 'Design Blueprint'),
    jsonb_build_object('en', 'Plan it right. Build it your way.', 'fr', 'Planifiez bien. Construisez à votre façon.'),
    jsonb_build_object('en', 'Ideal for getting started: see your future garage before you build anything, with a custom layout, two realistic views, and expert guidance to avoid costly mistakes.', 'fr', 'Idéal pour démarrer : visualisez votre futur garage avant de construire quoi que ce soit, avec un agencement sur-mesure, deux vues réalistes et des conseils experts pour éviter les erreurs coûteuses.'),
    jsonb_build_object('en', 'starts at $950', 'fr', 'à partir de 950 $'),
    null, null,
    jsonb_build_object('en', jsonb_build_array('1 optimized layout', '2 realistic views', '1 round of minor adjustments', 'Expert design guidance'), 'fr', jsonb_build_array('1 agencement optimisé', '2 vues réalistes', '1 série d''ajustements mineurs', 'Conseil expert')),
    jsonb_build_object('en', 'No product purchasing, no delivery, no installation.', 'fr', 'Pas d''achat de produits, pas de livraison, pas d''installation.'),
    null,
    jsonb_build_object('en', 'Design Blueprint + On-Site Assessment starts at $1,350', 'fr', 'Design Blueprint + évaluation sur site à partir de 1 350 $'),
    $$[
      {"title":{"en":"Choose your level","fr":"Choisissez votre niveau"},"items":{"en":["Design Blueprint (Remote) starts at $950","Design Blueprint + On-Site Assessment starts at $1,350"],"fr":["Design Blueprint à distance à partir de 950 $","Design Blueprint + évaluation sur site à partir de 1 350 $"]}},
      {"title":{"en":"How it works","fr":"Comment ça marche"},"items":{"en":["Free consultation to define your project","Fixed price, no surprises","Delivered digitally","Every detail is captured remotely or on-site when needed"],"fr":["Consultation gratuite pour définir le projet","Prix fixe, sans surprise","Livraison digitale","Chaque détail est relevé à distance ou sur site si nécessaire"]}},
      {"title":{"en":"Revisions","fr":"Révisions"},"body":{"en":"Requests for extra views, major changes, or a new direction after approval are quoted separately.","fr":"Les vues supplémentaires, changements majeurs ou nouvelles directions après validation sont chiffrés séparément."}},
      {"title":{"en":"Continue your project","fr":"Poursuivre votre projet"},"body":{"en":"Move forward anytime with setup support or a full transformation once your design is validated.","fr":"Vous pouvez poursuivre à tout moment avec l'accompagnement setup ou une transformation complète une fois le design validé."}},
      {"title":{"en":"Delivery area","fr":"Zone de service"},"body":{"en":"On-site visits are available throughout the Orlando area. Visits beyond our standard zone are quoted based on location.","fr":"Les visites sur site sont disponibles dans la région d'Orlando. Au-delà de la zone standard, elles sont chiffrées selon la localisation."}}
    ]$$::jsonb,
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
    $$[
      {"title":{"en":"Service fee credit","fr":"Crédit des honoraires"},"body":{"en":"The service fee is fully credited when you move forward with a signed project contract.","fr":"Les honoraires sont entièrement crédités si vous poursuivez avec un contrat de projet signé."}},
      {"title":{"en":"How it works","fr":"Comment ça marche"},"items":{"en":["Free consultation to define your project","Clear scope before commitment","Fixed starting price; final pricing depends on size, complexity, and sourcing needs","Delivered digitally with setup guidance"],"fr":["Consultation gratuite pour définir votre projet","Périmètre clair avant engagement","Prix de départ fixe ; le prix final dépend de la taille, de la complexité et des besoins de sourcing","Livraison digitale avec guide de setup"]}},
      {"title":{"en":"Deposit structure","fr":"Structure de paiement"},"items":{"en":["50% to secure your project and begin design","25% after design validation during materials and sourcing","25% upon completion and final walkthrough"],"fr":["50 % pour sécuriser le projet et démarrer le design","25 % après validation du design, pendant la phase matériaux et sourcing","25 % à la fin, lors de la visite finale"]}},
      {"title":{"en":"Use of designs","fr":"Utilisation des designs"},"body":{"en":"Plans and visual designs remain the property of Garage à la Carte and are provided for your personal project use only. If you build independently or work with another contractor, a separate usage or release agreement may be required.","fr":"Les plans et visuels restent la propriété de Garage à la Carte et sont fournis uniquement pour votre projet personnel. Si vous construisez seul ou avec un autre entrepreneur, un accord d'utilisation ou de cession peut être requis."}},
      {"title":{"en":"Continue your project","fr":"Poursuivre votre projet"},"body":{"en":"Move forward anytime with full transformation. Everything is planned, selected, and ready for execution.","fr":"Vous pouvez passer à la transformation complète à tout moment. Tout est planifié, sélectionné et prêt pour l'exécution."}},
      {"title":{"en":"Delivery area","fr":"Zone de service"},"body":{"en":"Delivery and setup coordination are included within 20 miles of Orlando. Extended zones are available with a mileage fee, and statewide projects may be available upon request.","fr":"La coordination livraison et setup est incluse dans un rayon de 20 miles autour d'Orlando. Les zones étendues sont possibles avec frais kilométriques, et certains projets dans tout l'État peuvent être étudiés sur demande."}}
    ]$$::jsonb,
    20, true),
  ('transform', '03',
    jsonb_build_object('en', 'Full Transformation', 'fr', 'Transformation Complète'),
    jsonb_build_object('en', 'From concept to completion. We handle everything.', 'fr', 'Du concept à la livraison. Nous gérons tout.'),
    jsonb_build_object('en', 'A complete, turnkey solution where we design, plan, coordinate, and oversee your full garage transformation from concept to final walkthrough.', 'fr', 'Une solution complète clé en main : nous concevons, planifions, coordonnons et suivons votre transformation de garage du concept à la visite finale.'),
    jsonb_build_object('en', 'starts at $2,750', 'fr', 'à partir de 2 750 $'),
    jsonb_build_object('en', 'Premium Experience', 'fr', 'Expérience premium'), null,
    jsonb_build_object('en', jsonb_build_array('Custom optimized layout', '3D design with 4-6 realistic views', 'Full space planning', 'Complete material & equipment selection', 'Sourcing and logistics coordination', 'Project management and execution oversight', 'Final walkthrough'), 'fr', jsonb_build_array('Agencement optimisé sur-mesure', 'Design 3D avec 4 à 6 vues réalistes', 'Planification complète de l''espace', 'Sélection complète matériaux & équipements', 'Coordination sourcing & logistique', 'Gestion de projet et suivi d''exécution', 'Visite finale')),
    null,
    jsonb_build_object('en', '50% / 25% / 25%', 'fr', '50 % / 25 % / 25 %'),
    null,
    $$[
      {"title":{"en":"Service fee credit","fr":"Crédit des honoraires"},"body":{"en":"The service fee is fully credited when you move forward with a signed project contract.","fr":"Les honoraires sont entièrement crédités si vous poursuivez avec un contrat de projet signé."}},
      {"title":{"en":"How it works","fr":"Comment ça marche"},"items":{"en":["Dedicated consultation to define your vision","Clear scope, budget, and timeline","Structured phases from design to completion","One expert guiding your project throughout"],"fr":["Consultation dédiée pour définir votre vision","Périmètre, budget et calendrier clairs","Phases structurées du design à la livraison","Un expert qui guide votre projet tout au long du processus"]}},
      {"title":{"en":"Deposit structure","fr":"Structure de paiement"},"items":{"en":["50% to secure your project and begin design","25% after design validation during materials and sourcing","25% upon completion and final walkthrough"],"fr":["50 % pour sécuriser le projet et démarrer le design","25 % après validation du design, pendant la phase matériaux et sourcing","25 % à la fin, lors de la visite finale"]}},
      {"title":{"en":"Project investment","fr":"Investissement projet"},"body":{"en":"Typical project investment depends on layout, finishes, and customization level. This investment elevates daily living and adds lasting value to your property.","fr":"L'investissement final dépend de l'agencement, des finitions et du niveau de personnalisation. Il améliore votre quotidien et ajoute une valeur durable à votre bien."}},
      {"title":{"en":"Use of designs","fr":"Utilisation des designs"},"body":{"en":"Plans and visual designs remain the property of Garage à la Carte and are provided for your personal project use only. If you build independently or work with another contractor, a separate usage or release agreement may be required.","fr":"Les plans et visuels restent la propriété de Garage à la Carte et sont fournis uniquement pour votre projet personnel. Si vous construisez seul ou avec un autre entrepreneur, un accord d'utilisation ou de cession peut être requis."}},
      {"title":{"en":"Continue your project","fr":"Poursuivre votre projet"},"body":{"en":"Upgrade your space with integrated systems such as plumbing, electrical, climate control, and smart features designed to work seamlessly together.","fr":"Améliorez votre espace avec des systèmes intégrés comme la plomberie, l'électricité, le contrôle climatique et les fonctions connectées, pensés pour fonctionner ensemble."}},
      {"title":{"en":"Delivery area","fr":"Zone de service"},"body":{"en":"Included within 20 miles of Orlando. Extended zones are available with a mileage fee, and statewide projects may be available upon request.","fr":"Inclus dans un rayon de 20 miles autour d'Orlando. Les zones étendues sont possibles avec frais kilométriques, et certains projets dans tout l'État peuvent être étudiés sur demande."}}
    ]$$::jsonb,
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
    $$[
      {"title":{"en":"How it works","fr":"Comment ça marche"},"items":{"en":["Systems are planned during the design phase","Integration is coordinated before any work begins","All components are designed to function seamlessly together"],"fr":["Les systèmes sont planifiés pendant la phase design","L'intégration est coordonnée avant le démarrage des travaux","Tous les composants sont pensés pour fonctionner ensemble"]}},
      {"title":{"en":"Investment","fr":"Investissement"},"body":{"en":"Custom add-on based on your systems and integration needs. Typically included within Design & Setup or Full Transformation.","fr":"Add-on sur-mesure selon vos systèmes et besoins d'intégration. Généralement inclus dans Design & Setup ou Transformation Complète."},"items":{"en":["Can be added as a standalone upgrade if needed","Technical feasibility validated before implementation","Clear scope and system requirements defined upfront","Coordination planned prior to execution"],"fr":["Peut être ajouté comme upgrade autonome si nécessaire","Faisabilité technique validée avant mise en oeuvre","Périmètre et exigences systèmes définis à l'avance","Coordination prévue avant l'exécution"]}},
      {"title":{"en":"Service fee credit","fr":"Crédit des honoraires"},"body":{"en":"The service fee starts at $3,500 and is fully credited when you move forward with a signed project contract.","fr":"Les honoraires démarrent à 3 500 $ et sont entièrement crédités si vous poursuivez avec un contrat de projet signé."}},
      {"title":{"en":"Additional work","fr":"Travaux additionnels"},"body":{"en":"Any additional systems, upgrades, or scope changes are clearly defined and quoted separately.","fr":"Tout système supplémentaire, upgrade ou changement de périmètre est clairement défini et chiffré séparément."}},
      {"title":{"en":"Use of designs","fr":"Utilisation des plans"},"body":{"en":"Technical layouts and integration plans remain the property of Garage à la Carte and are provided for your personal project use only. If you work with another contractor, a separate usage or release agreement may be required.","fr":"Les plans techniques et plans d'intégration restent la propriété de Garage à la Carte et sont fournis uniquement pour votre projet personnel. Si vous travaillez avec un autre entrepreneur, un accord d'utilisation ou de cession peut être requis."}},
      {"title":{"en":"Permits & regulations","fr":"Permis & réglementation"},"body":{"en":"Some systems may require city or county permits depending on the scope. We guide you through requirements and coordinate with the appropriate professionals when needed.","fr":"Certains systèmes peuvent nécessiter des permis municipaux ou county selon le périmètre. Nous vous guidons sur les exigences et coordonnons avec les professionnels adaptés si nécessaire."}},
      {"title":{"en":"Delivery area","fr":"Zone de service"},"body":{"en":"Included within 20 miles of Orlando. Extended zones are available with a mileage fee, and statewide projects may be available upon request.","fr":"Inclus dans un rayon de 20 miles autour d'Orlando. Les zones étendues sont possibles avec frais kilométriques, et certains projets dans tout l'État peuvent être étudiés sur demande."}}
    ]$$::jsonb,
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
    detail_sections = excluded.detail_sections,
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
