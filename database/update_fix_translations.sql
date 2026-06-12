-- ============================================================================
-- Correction des traductions ES (l'EN fait référence)
-- ----------------------------------------------------------------------------
-- À exécuter dans Supabase → SQL Editor. Idempotent.
-- Corrige : français résiduel dans les champs `fr`, ES périmé, listes en/fr
-- de longueurs différentes. L'anglais (en) n'est jamais modifié.
-- Cible les slugs RÉELS de la prod (peuvent différer de seed.sql).
-- ============================================================================

-- 1) Projet « The Family Lounge Garage » — nom/tagline ES périmés
update public.projects set
  name    = jsonb_build_object('en', 'The Family Lounge Garage', 'fr', 'El Garaje Lounge Familiar'),
  tagline = jsonb_build_object('en', 'A Garage Designed Around Your Lifestyle', 'fr', 'Un garaje diseñado en torno a tu estilo de vida'),
  updated_at = now()
where slug = 'the-family-lounge-garage';

-- 2) Projet « Sports Game Garage » (slug daily-living-garage) — fr était en français
update public.projects set
  name        = jsonb_build_object('en', 'Sports Game Garage', 'fr', 'El Garaje Deportivo'),
  tagline     = jsonb_build_object('en', 'A Space Designed to Watch, Gather & Unwind', 'fr', 'Un espacio diseñado para ver el partido, reunirse y relajarse'),
  project_type= jsonb_build_object('en', 'Daily living / Utility', 'fr', 'Vida diaria / Utilitario'),
  size_label  = jsonb_build_object('en', '2 car garage', 'fr', 'Garaje para 2 coches'),
  duration_label = jsonb_build_object('en', '5 weeks', 'fr', '5 semanas'),
  description = jsonb_build_object(
    'en', 'A complete transformation that turns your garage into a functional, comfortable extension of your home — combining utility, comfort, and style.',
    'fr', 'Una transformación completa que convierte tu garaje en una extensión funcional y cómoda de tu hogar — combinando utilidad, confort y estilo.'
  ),
  includes = jsonb_build_object(
    'en', jsonb_build_array('Integrated laundry and utility area', 'Comfortable lounge space with TV, relaxation, and daily use', 'Smart storage solutions to keep everything organized', 'Clean, functional environment ready for everyday living'),
    'fr', jsonb_build_array('Zona de lavandería y utilitarios integrada', 'Espacio lounge cómodo con TV, relajación y uso diario', 'Soluciones de almacenamiento inteligentes para mantener todo organizado', 'Un entorno limpio y funcional listo para la vida cotidiana')
  ),
  value_points = jsonb_build_object(
    'en', jsonb_build_array('Free up space in the rest of your home', 'Simplify your daily routines and reduce clutter', 'Improve comfort while increasing your property value'),
    'fr', jsonb_build_array('Libera espacio en el resto de tu casa', 'Simplifica tu rutina diaria y reduce el desorden', 'Mejora el confort y aumenta el valor de tu propiedad')
  ),
  updated_at = now()
where slug = 'daily-living-garage';

-- 3) Service « Smart Integration » — includes (alignés sur les 3 EN) + detail_sections reconstruits
update public.services set
  includes = jsonb_build_object(
    'en', jsonb_build_array('Technical integration aligned with your design', 'Planning of plumbing, electrical, HVAC, and ventilation', 'Smart features, media setup, and built-in systems'),
    'fr', jsonb_build_array('Integración técnica alineada con tu diseño', 'Planificación de fontanería, electricidad, HVAC y ventilación', 'Funciones inteligentes, multimedia y sistemas integrados')
  ),
  detail_sections = $$[
    {"title":{"en":"Technical Integration — Designed for Performance, Comfort, and Everyday Use","fr":"Integración técnica — diseñada para el rendimiento, el confort y el uso diario"},"body":{"en":"This service transforms your garage into a fully functional space by integrating all essential systems from the start. No guesswork. No costly adjustments later.","fr":"Este servicio convierte tu garaje en un espacio plenamente funcional integrando todos los sistemas esenciales desde el principio. Sin improvisaciones. Sin ajustes costosos después."}},
    {"title":{"en":"What you get","fr":"Lo que incluye"},"items":{"en":["Technical integration aligned with your design","Planning of plumbing, electrical, HVAC, and ventilation","Built-in storage, media setup, and smart features","Coordination with qualified professionals","Technical layouts prepared for implementation"],"fr":["Integración técnica alineada con tu diseño","Planificación de fontanería, electricidad, HVAC y ventilación","Almacenamiento integrado, multimedia y funciones inteligentes","Coordinación con profesionales cualificados","Planos técnicos listos para la ejecución"]}},
    {"title":{"en":"How it works","fr":"Cómo funciona"},"items":{"en":["Systems are planned during the design phase","Integration is coordinated before execution begins","Technical requirements are clearly defined upfront"],"fr":["Los sistemas se planifican durante la fase de diseño","La integración se coordina antes de iniciar la ejecución","Los requisitos técnicos se definen claramente desde el principio"]}},
    {"title":{"en":"Pricing","fr":"Precio"},"body":{"en":"Starting at $3,500 — fully credited toward your signed project contract.","fr":"Desde 3 500 $ — acreditado íntegramente sobre tu contrato de proyecto firmado."}},
    {"title":{"en":"Integration planning","fr":"Planificación de la integración"},"body":{"en":"Available as a standalone upgrade or integrated within larger transformation projects.","fr":"Disponible como mejora independiente o integrada en proyectos de transformación más amplios."},"items":{"en":["Technical feasibility reviewed before implementation","System requirements clearly defined upfront","Coordination planned prior to execution"],"fr":["Viabilidad técnica revisada antes de la ejecución","Requisitos de los sistemas definidos claramente desde el principio","Coordinación prevista antes de la ejecución"]}},
    {"title":{"en":"Deposit structure","fr":"Estructura de pago"},"body":{"en":"Included within your main project deposit structure. Defined separately only if requested as a standalone upgrade.","fr":"Incluido en la estructura de pago de tu proyecto principal. Se define por separado solo si se solicita como mejora independiente."}},
    {"title":{"en":"Additional work","fr":"Trabajos adicionales"},"body":{"en":"Any additional systems, upgrades, or changes in scope will be clearly defined and quoted separately.","fr":"Cualquier sistema adicional, mejora o cambio de alcance se define claramente y se presupuesta por separado."}},
    {"title":{"en":"Use of designs","fr":"Uso de los diseños"},"body":{"en":"All technical layouts and integration plans remain the property of Garage à la Carte and are provided for your personal project use only. If you choose to work with another contractor, a separate usage or release agreement may be required.","fr":"Todos los planos técnicos y de integración siguen siendo propiedad de Garage à la Carte y se entregan exclusivamente para tu proyecto personal. Si decides trabajar con otro contratista, puede requerirse un acuerdo de uso o cesión por separado."}},
    {"title":{"en":"Permits & regulations","fr":"Permisos y normativa"},"body":{"en":"Some systems may require city or county permits depending on the scope. We guide you through requirements and coordinate with the appropriate professionals when needed.","fr":"Algunos sistemas pueden requerir permisos municipales o del condado según el alcance. Te guiamos sobre los requisitos y coordinamos con los profesionales adecuados cuando es necesario."}},
    {"title":{"en":"Delivery area","fr":"Zona de servicio"},"body":{"en":"On-site visits are available throughout the Orlando area. Visits beyond our standard zone are quoted based on location.","fr":"Las visitas in situ están disponibles en toda la zona de Orlando. Las visitas fuera de nuestra zona estándar se presupuestan según la ubicación."}}
  ]$$::jsonb,
  updated_at = now()
where slug = 'smart';

-- 4) Bio longue de Juliette — était en français
update public.team_members set
  long_bio = jsonb_build_object(
    'en', $$I am Juliette Bergougnoux, an American-French designer born in New York City, with a creative background shaped by both American innovation and European design culture.

I hold a Master's degree in Interior Transportation Design with a specialization in Color, Material & Finish (CMF), completed in Paris, France.

My experience includes collaborations with major automotive brands such as Citroën and Dacia, where I developed CMF concepts for transportation interiors, focusing on material selection, color integration, visual identity, and user experience.

My design approach combines functionality, atmosphere, and refined material storytelling to create spaces that feel both distinctive and purposeful.

Today, I bring this expertise to Garage à la Carte alongside Aymeric and Guillaume, helping to design personalized garage environments that reflect each client's lifestyle through thoughtful space planning, materials, colors, and functionality.$$,
    'fr', $$Soy Juliette Bergougnoux, diseñadora franco-americana nacida en Nueva York, con una trayectoria creativa moldeada por la innovación americana y la cultura del diseño europeo.

Soy Máster en Interior Transportation Design con especialización en Color, Material y Acabado (CMF), obtenido en París, Francia.

Mi experiencia incluye colaboraciones con grandes marcas del automóvil como Citroën y Dacia, donde desarrollé conceptos CMF para interiores de vehículos, centrándome en la selección de materiales, la integración del color, la identidad visual y la experiencia de usuario.

Mi enfoque del diseño combina funcionalidad, atmósfera y un relato cuidado de los materiales para crear espacios distintivos y llenos de sentido.

Hoy aporto esta experiencia a Garage à la Carte junto a Aymeric y Guillaume, ayudando a diseñar garajes personalizados que reflejan el estilo de vida de cada cliente a través de una cuidada planificación del espacio, los materiales, los colores y la funcionalidad.$$
  ),
  updated_at = now()
where slug = 'juliette';

-- Vérification (optionnel)
-- select slug, name->>'fr', tagline->>'fr' from public.projects order by display_order;
-- select slug, jsonb_array_length(includes->'en') en_n, jsonb_array_length(includes->'fr') fr_n from public.services where slug='smart';
