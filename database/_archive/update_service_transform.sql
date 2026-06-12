-- ============================================================================
-- Mise à jour du service 3 « Full Transformation » (slug = transform)
-- Texte officiel de la cliente (PDF « CARD 3 — PREMIUM SERVICE »).
-- ----------------------------------------------------------------------------
-- À exécuter dans Supabase → SQL Editor. Idempotent (UPDATE sur la ligne existante).
-- ============================================================================

update public.services
set subtitle = jsonb_build_object(
      'en', 'From Concept to Completion — We Handle Everything',
      'fr', 'Del concepto a la entrega — nos encargamos de todo'
    ),
    description = jsonb_build_object(
      'en', 'Experience our most comprehensive service. You want a complete, worry-free transformation — fully designed, fully managed, fully delivered. A complete, turnkey solution where we design, plan, and coordinate your full garage transformation, handling scheduling and coordination so your project runs smoothly. Most clients enhance their transformation with integrated upgrades, such as lighting, electrical, climate control, and smart features, designed to work seamlessly together. We don''t just design your garage — we manage the entire transformation, from initial concept to final walkthrough.',
      'fr', 'Vive nuestro servicio más completo. Quieres una transformación completa y sin preocupaciones — totalmente diseñada, gestionada y entregada. Una solución llave en mano donde diseñamos, planificamos y coordinamos toda la transformación de tu garaje, encargándonos de la planificación y la coordinación para que tu proyecto avance sin contratiempos. La mayoría de los clientes complementa su transformación con integraciones, como iluminación, electricidad, climatización y funciones inteligentes, pensadas para funcionar en conjunto. No solo diseñamos tu garaje — gestionamos toda la transformación, desde el concepto inicial hasta la visita final.'
    ),
    includes = jsonb_build_object(
      'en', jsonb_build_array(
        'Custom layouts and technical planning',
        '3 initial realistic views',
        'Full space planning (storage, living, utility, entertainment, and lifestyle zones)',
        'Complete material and equipment selection',
        'Sourcing and logistics coordination',
        'Complete transformation management from design to final walkthrough',
        'Final walkthrough of your completed space',
        'Expert design guidance from our team'
      ),
      'fr', jsonb_build_array(
        'Distribuciones a medida y planificación técnica',
        '3 vistas realistas iniciales',
        'Planificación completa del espacio (almacenamiento, estancia, servicios, ocio y zonas de estilo de vida)',
        'Selección completa de materiales y equipamiento',
        'Coordinación de sourcing y logística',
        'Gestión completa de la transformación, del diseño a la visita final',
        'Visita final de tu espacio terminado',
        'Asesoramiento de diseño experto de nuestro equipo'
      )
    ),
    detail_sections = $$[
      {"title":{"en":"Service fee credit","fr":"Crédito de honorarios"},"body":{"en":"Fully credited toward your signed Full Transformation project contract.","fr":"Se acredita íntegramente sobre tu contrato de proyecto Full Transformation firmado."}},
      {"title":{"en":"Design Review Period","fr":"Periodo de revisión del diseño"},"body":{"en":"After receiving your design package, you'll have up to 7 days to review the proposed concept with our team. During this review period, additional visual perspectives and minor design refinements may be provided as needed to help you confidently validate your project before moving forward. Our goal is to ensure every design, material, and project decision is fully aligned before purchasing, scheduling, delivery, or installation begins. After the 7-day review period and final approval, any major redesign, significant scope change, or change in project direction may require additional design services and will be quoted separately.","fr":"Tras recibir tu paquete de diseño, dispondrás de hasta 7 días para revisar la propuesta con nuestro equipo. Durante este periodo de revisión se pueden aportar perspectivas visuales adicionales y pequeños ajustes de diseño, según sea necesario, para ayudarte a validar tu proyecto con total confianza antes de avanzar. Nuestro objetivo es que cada decisión de diseño, material y proyecto esté plenamente alineada antes de iniciar compras, planificación, entrega o instalación. Tras los 7 días de revisión y la aprobación final, cualquier rediseño importante, cambio significativo de alcance o cambio de dirección del proyecto puede requerir servicios de diseño adicionales y se presupuestará por separado."}},
      {"title":{"en":"How it works","fr":"Cómo funciona"},"items":{"en":["Personalized project consultation to define your vision","Clear scope, budget, and timeline","Structured phases from design to completion","One expert guiding your project throughout"],"fr":["Consulta personalizada del proyecto para definir tu visión","Alcance, presupuesto y plazos claros","Fases estructuradas del diseño a la entrega","Un experto que acompaña tu proyecto durante todo el proceso"]}},
      {"title":{"en":"Deposit structure","fr":"Estructura de pago"},"body":{"en":"This ensures your entire project is fully prepared before execution.","fr":"Así nos aseguramos de que todo tu proyecto esté completamente preparado antes de la ejecución."},"items":{"en":["50% to secure your project and begin design","25% after design validation (materials & sourcing phase)","25% upon completion and final walkthrough"],"fr":["50 % para asegurar tu proyecto e iniciar el diseño","25 % tras la validación del diseño (fase de materiales y sourcing)","25 % al finalizar, en la visita final"]}},
      {"title":{"en":"Project investment","fr":"Inversión del proyecto"},"body":{"en":"Final project investment varies depending on garage size, finishes, customization level, and integrated features.","fr":"La inversión final del proyecto varía según el tamaño del garaje, los acabados, el nivel de personalización y las funciones integradas."}},
      {"title":{"en":"Design Ownership","fr":"Propiedad del diseño"},"body":{"en":"All layouts, plans, and visual designs remain the property of Garage à la Carte and are provided for your personal project use. Independent use or third-party execution may require a separate usage agreement.","fr":"Todos los planos, diseños y visuales siguen siendo propiedad de Garage à la Carte y se proporcionan para uso personal de tu proyecto. El uso independiente o la ejecución por terceros puede requerir un acuerdo de uso por separado."}},
      {"title":{"en":"Continue your project","fr":"Continúa tu proyecto"},"body":{"en":"Ready to go further? Upgrade your space with integrated systems — plumbing, electrical, climate control, and smart features — designed to work seamlessly together. Transform your garage into a fully equipped, high-performance space.","fr":"¿Quieres ir más allá? Mejora tu espacio con sistemas integrados — fontanería, electricidad, climatización y funciones inteligentes — diseñados para funcionar en conjunto. Transforma tu garaje en un espacio totalmente equipado y de alto rendimiento."}},
      {"title":{"en":"Delivery area","fr":"Zona de servicio"},"body":{"en":"On-site visits are available throughout the Orlando area. Visits beyond our standard zone are quoted based on location.","fr":"Las visitas in situ están disponibles en toda la zona de Orlando. Las visitas fuera de nuestra zona estándar se presupuestan según la ubicación."}}
    ]$$::jsonb,
    updated_at = now()
where slug = 'transform';

-- Vérification (optionnel)
-- select slug, subtitle, description, includes, detail_sections from public.services where slug = 'transform';
