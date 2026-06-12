-- ============================================================================
-- Mise à jour du service 1 « Garage Design & Build Plan » (slug = blueprint)
-- Texte officiel de la cliente (PDF « CARD 1 — Garage Design & Build Plan »).
-- ----------------------------------------------------------------------------
-- À exécuter dans Supabase → SQL Editor. Idempotent (UPDATE sur la ligne existante).
-- ============================================================================

update public.services
set title = jsonb_build_object('en', 'Garage Design & Build Plan', 'fr', 'Garage Design & Build Plan'),
    onsite_label = jsonb_build_object('en', 'Garage Design & Build Plan + On-Site Assessment starts at $1,350', 'fr', 'Garage Design & Build Plan + evaluación in situ desde 1 350 $'),
    subtitle = jsonb_build_object(
      'en', 'Plan It Right. Build It Your Way.',
      'fr', 'Hazlo bien desde el principio. Construye a tu manera.'
    ),
    description = jsonb_build_object(
      'en', 'You want to plan your garage with confidence before making decisions. See your future garage before you build anything — with a custom layout and 3D design, three realistic views, and expert guidance to avoid costly mistakes. Most clients start here, then move forward once they see their design.',
      'fr', 'Quieres planificar tu garaje con seguridad antes de tomar decisiones. Visualiza tu futuro garaje antes de construir nada — con una distribución a medida y diseño 3D, tres vistas realistas y asesoramiento experto para evitar errores costosos. La mayoría de los clientes empieza aquí y avanza una vez que ve su diseño.'
    ),
    includes = jsonb_build_object(
      'en', jsonb_build_array(
        'Custom layouts and technical planning',
        '3 initial realistic views',
        'Expert design guidance from our team'
      ),
      'fr', jsonb_build_array(
        'Distribuciones a medida y planificación técnica',
        '3 vistas realistas iniciales',
        'Asesoramiento de diseño experto de nuestro equipo'
      )
    ),
    detail_sections = $$[
      {"title":{"en":"Choose your level","fr":"Elige tu nivel"},"items":{"en":["Garage Design & Build Plan (Remote) starts at $950","Garage Design & Build Plan + On-Site Assessment starts at $1,350"],"fr":["Garage Design & Build Plan a distancia desde 950 $","Garage Design & Build Plan + evaluación in situ desde 1 350 $"]}},
      {"title":{"en":"Design Review Period","fr":"Periodo de revisión del diseño"},"body":{"en":"After receiving your design package, you'll have up to 7 days to review the proposed concept with our team. During this review period, additional visual perspectives and minor design refinements may be provided as needed. Our goal is to ensure you have a clear vision of your future garage before any purchasing, delivery, or installation decisions are made. Some projects may require custom pricing depending on garage size, level of customization, requested visuals, revisions, or technical complexity.","fr":"Tras recibir tu paquete de diseño, dispondrás de hasta 7 días para revisar la propuesta con nuestro equipo. Durante este periodo de revisión se pueden aportar perspectivas visuales adicionales y pequeños ajustes de diseño, según sea necesario. Nuestro objetivo es que tengas una visión clara de tu futuro garaje antes de tomar cualquier decisión de compra, entrega o instalación. Algunos proyectos pueden requerir un precio personalizado según el tamaño del garaje, el nivel de personalización, las vistas solicitadas, las revisiones o la complejidad técnica."}},
      {"title":{"en":"How it works","fr":"Cómo funciona"},"items":{"en":["Initial project discussion to understand your vision","Custom design package with clear deliverables and fixed pricing","Delivered digitally, with optional on-site assessment when needed"],"fr":["Conversación inicial para entender tu visión","Paquete de diseño a medida con entregables claros y precio fijo","Entrega digital, con evaluación in situ opcional cuando es necesario"]}},
      {"title":{"en":"Continue your project","fr":"Continúa tu proyecto"},"body":{"en":"Move forward at any time with setup or a full transformation.","fr":"Avanza en cualquier momento con el setup o una transformación completa."}},
      {"title":{"en":"Design Ownership","fr":"Propiedad del diseño"},"body":{"en":"All layouts, plans, and visual designs remain the property of Garage à la Carte and are provided for your personal project use. Independent use or third-party execution may require a separate usage agreement.","fr":"Todos los planos, diseños y visuales siguen siendo propiedad de Garage à la Carte y se proporcionan para uso personal de tu proyecto. El uso independiente o la ejecución por terceros puede requerir un acuerdo de uso por separado."}},
      {"title":{"en":"Delivery area","fr":"Zona de servicio"},"body":{"en":"On-site visits are available throughout the Orlando area. Visits beyond our standard zone are quoted based on location.","fr":"Las visitas in situ están disponibles en toda la zona de Orlando. Las visitas fuera de nuestra zona estándar se presupuestan según la ubicación."}}
    ]$$::jsonb,
    updated_at = now()
where slug = 'blueprint';

-- Page Conditions : harmonise le nom du service dans la section « Scope of Work & Service Levels »
update public.legal_sections
set body = jsonb_build_object(
      'en', 'Each service includes only what is clearly defined within the selected level: Garage Design & Build Plan, Design & Setup, Full Transformation, or Smart Integration. Any request outside the selected service is handled as a project adjustment.',
      'fr', 'Cada servicio incluye únicamente lo que está claramente definido en el nivel elegido: Garage Design & Build Plan, Design & Setup, Transformación Completa o Smart Integration. Cualquier solicitud fuera del alcance se trata como un ajuste de proyecto.'
    ),
    updated_at = now()
where title->>'en' = 'Scope of Work & Service Levels';

-- Vérification (optionnel)
-- select slug, title, subtitle, description, includes, detail_sections from public.services where slug = 'blueprint';
