-- ============================================================================
-- SCRIPT COMPLET — Mise à jour Garage à la Carte
-- ----------------------------------------------------------------------------
-- Regroupe toutes les mises à jour de contenu de cette session :
--   1. Coordonnées (email + téléphones Guillaume/Juliette)
--   2. Adresse / zone de service harmonisée (« Orlando area »)
--   3. Services 1 à 3 (texte officiel de la cliente)
--   4. Service 4 (smart) — zone de service harmonisée
--   5. Page Conditions (24 sections détaillées)
--   6. Projet 4 « The Hybrid Lifestyle Garage »
--
-- À exécuter en une fois dans Supabase → SQL Editor.
-- Idempotent : peut être ré-exécuté sans risque. L'ordre est sûr
-- (les Conditions, qui remplacent toutes les sections légales, sont en dernier).
-- ============================================================================


-- ============================================================================
-- 1. COORDONNÉES
-- ============================================================================

-- Canaux de contact : email + téléphone principal (= Guillaume, n° SEO)
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

-- Adresse affichée (footer + page Contact) — zone de service harmonisée
update public.contact_channels
set value = 'Orlando, FL · on-site visits across the Orlando area',
    updated_at = now()
where channel_key = 'address';

-- Équipe : téléphones individuels + email partagé
update public.team_members
set phone = '+1 (917) 353-4950', email = 'garagealacarte@gmail.com', updated_at = now()
where slug = 'guillaume';

update public.team_members
set phone = '+1 (689) 217-4074', email = 'garagealacarte@gmail.com', updated_at = now()
where slug = 'juliette';


-- ============================================================================
-- 2. SERVICE 1 — « Garage Design & Build Plan » (slug = blueprint)
-- ============================================================================

update public.services
set title = jsonb_build_object('en', 'Garage Design & Build Plan', 'fr', 'Garage Design & Build Plan'),
    onsite_label = jsonb_build_object('en', 'Garage Design & Build Plan + On-Site Assessment starts at $1,350', 'fr', 'Garage Design & Build Plan + evaluación in situ desde 1 350 $'),
    subtitle = jsonb_build_object('en', 'Plan It Right. Build It Your Way.', 'fr', 'Hazlo bien desde el principio. Construye a tu manera.'),
    description = jsonb_build_object(
      'en', 'You want to plan your garage with confidence before making decisions. See your future garage before you build anything — with a custom layout and 3D design, three realistic views, and expert guidance to avoid costly mistakes. Most clients start here, then move forward once they see their design.',
      'fr', 'Quieres planificar tu garaje con seguridad antes de tomar decisiones. Visualiza tu futuro garaje antes de construir nada — con una distribución a medida y diseño 3D, tres vistas realistas y asesoramiento experto para evitar errores costosos. La mayoría de los clientes empieza aquí y avanza una vez que ve su diseño.'
    ),
    includes = jsonb_build_object(
      'en', jsonb_build_array('Custom layouts and technical planning', '3 initial realistic views', 'Expert design guidance from our team'),
      'fr', jsonb_build_array('Distribuciones a medida y planificación técnica', '3 vistas realistas iniciales', 'Asesoramiento de diseño experto de nuestro equipo')
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


-- ============================================================================
-- 3. SERVICE 2 — « Design & Setup » (slug = delivery)
-- ============================================================================

update public.services
set subtitle = jsonb_build_object('en', 'Plan It Right. Prepare It With Confidence.', 'fr', 'Hazlo bien desde el principio. Prepáralo con confianza.'),
    description = jsonb_build_object(
      'en', 'You want more than a design — you want the right products, materials, and a clear setup plan. Move from vision to execution without the sourcing headache. We take your project beyond design, ensuring every detail is addressed before purchasing, delivery, or installation begins. Most clients move forward with a full transformation once everything is planned and ready.',
      'fr', 'Quieres algo más que un diseño — quieres los productos adecuados, los materiales correctos y un plan de instalación claro. Pasa de la visión a la ejecución sin la carga del sourcing. Llevamos tu proyecto más allá del diseño, asegurándonos de que cada detalle esté resuelto antes de iniciar compras, entrega o instalación. La mayoría de los clientes pasa a la transformación completa una vez que todo está planificado y listo.'
    ),
    includes = jsonb_build_object(
      'en', jsonb_build_array('Custom layouts and technical planning', '3 initial realistic views', 'Product selection guidance', 'Sourcing coordination', 'Delivery and assembly of selected components', 'Expert design guidance from our team'),
      'fr', jsonb_build_array('Distribuciones a medida y planificación técnica', '3 vistas realistas iniciales', 'Asesoramiento en la selección de productos', 'Coordinación del sourcing', 'Entrega y montaje de los componentes seleccionados', 'Asesoramiento de diseño experto de nuestro equipo')
    ),
    not_included = jsonb_build_object('en', 'No final installation or contractor labor unless upgraded to Full Transformation.', 'fr', 'Sin instalación final ni mano de obra del contratista, salvo al pasar a Transformación Completa.'),
    deposit_schedule = jsonb_build_object('en', '50% / 50%', 'fr', '50 % / 50 %'),
    detail_sections = $$[
      {"title":{"en":"Service fee credit","fr":"Crédito de honorarios"},"body":{"en":"The service fee is fully credited when you move forward with a signed project contract.","fr":"Los honorarios se acreditan íntegramente si continúas con un contrato de proyecto firmado."}},
      {"title":{"en":"Design Review Period","fr":"Periodo de revisión del diseño"},"body":{"en":"After receiving your design package, you'll have up to 7 days to review the proposed concept with our team. During this review period, additional visual perspectives and minor design refinements may be provided as needed to help you confidently validate your project before moving forward. Our goal is to ensure every product, material, and design decision is fully aligned before purchasing, delivery, or installation begins.","fr":"Tras recibir tu paquete de diseño, dispondrás de hasta 7 días para revisar la propuesta con nuestro equipo. Durante este periodo de revisión se pueden aportar perspectivas visuales adicionales y pequeños ajustes de diseño, según sea necesario, para ayudarte a validar tu proyecto con total confianza antes de avanzar. Nuestro objetivo es que cada decisión de producto, material y diseño esté plenamente alineada antes de iniciar compras, entrega o instalación."}},
      {"title":{"en":"How it works","fr":"Cómo funciona"},"items":{"en":["Free consultation to define your project","Clear scope before commitment","Fixed starting price — final pricing depends on size, complexity, and sourcing needs","Design package delivered digitally","Product sourcing, delivery, and assembly coordinated by our team"],"fr":["Consulta gratuita para definir tu proyecto","Alcance claro antes del compromiso","Precio inicial fijo — el precio final depende del tamaño, la complejidad y las necesidades de sourcing","Paquete de diseño entregado digitalmente","Sourcing de productos, entrega y montaje coordinados por nuestro equipo"]}},
      {"title":{"en":"Deposit structure","fr":"Estructura de pago"},"body":{"en":"This ensures your entire project is fully prepared before execution. After the 7-day review period and final approval, any major redesign, significant scope change, or change in project direction may require additional design services and will be quoted separately.","fr":"Así nos aseguramos de que todo tu proyecto esté completamente preparado antes de la ejecución. Tras los 7 días de revisión y la aprobación final, cualquier rediseño importante, cambio significativo de alcance o cambio de dirección del proyecto puede requerir servicios de diseño adicionales y se presupuestará por separado."},"items":{"en":["50% to secure your project and begin design","50% upon completion and final walkthrough"],"fr":["50 % para asegurar tu proyecto e iniciar el diseño","50 % al finalizar, en la visita final"]}},
      {"title":{"en":"Design Ownership","fr":"Propiedad del diseño"},"body":{"en":"All layouts, plans, and visual designs remain the property of Garage à la Carte and are provided for your personal project use. Independent use or third-party execution may require a separate usage agreement.","fr":"Todos los planos, diseños y visuales siguen siendo propiedad de Garage à la Carte y se proporcionan para uso personal de tu proyecto. El uso independiente o la ejecución por terceros puede requerir un acuerdo de uso por separado."}},
      {"title":{"en":"Continue your project","fr":"Continúa tu proyecto"},"body":{"en":"Move forward anytime with Full Transformation.","fr":"Pasa a la transformación completa cuando quieras."}},
      {"title":{"en":"Delivery area","fr":"Zona de servicio"},"body":{"en":"On-site visits are available throughout the Orlando area. Visits beyond our standard zone are quoted based on location. Everything is prepared so you can move forward with confidence.","fr":"Las visitas in situ están disponibles en toda la zona de Orlando. Las visitas fuera de nuestra zona estándar se presupuestan según la ubicación. Todo queda preparado para que puedas avanzar con confianza."}}
    ]$$::jsonb,
    updated_at = now()
where slug = 'delivery';


-- ============================================================================
-- 4. SERVICE 3 — « Full Transformation » (slug = transform)
-- ============================================================================

update public.services
set subtitle = jsonb_build_object('en', 'From Concept to Completion — We Handle Everything', 'fr', 'Del concepto a la entrega — nos encargamos de todo'),
    description = jsonb_build_object(
      'en', 'Experience our most comprehensive service. You want a complete, worry-free transformation — fully designed, fully managed, fully delivered. A complete, turnkey solution where we design, plan, and coordinate your full garage transformation, handling scheduling and coordination so your project runs smoothly. Most clients enhance their transformation with integrated upgrades, such as lighting, electrical, climate control, and smart features, designed to work seamlessly together. We don''t just design your garage — we manage the entire transformation, from initial concept to final walkthrough.',
      'fr', 'Vive nuestro servicio más completo. Quieres una transformación completa y sin preocupaciones — totalmente diseñada, gestionada y entregada. Una solución llave en mano donde diseñamos, planificamos y coordinamos toda la transformación de tu garaje, encargándonos de la planificación y la coordinación para que tu proyecto avance sin contratiempos. La mayoría de los clientes complementa su transformación con integraciones, como iluminación, electricidad, climatización y funciones inteligentes, pensadas para funcionar en conjunto. No solo diseñamos tu garaje — gestionamos toda la transformación, desde el concepto inicial hasta la visita final.'
    ),
    includes = jsonb_build_object(
      'en', jsonb_build_array('Custom layouts and technical planning', '3 initial realistic views', 'Full space planning (storage, living, utility, entertainment, and lifestyle zones)', 'Complete material and equipment selection', 'Sourcing and logistics coordination', 'Complete transformation management from design to final walkthrough', 'Final walkthrough of your completed space', 'Expert design guidance from our team'),
      'fr', jsonb_build_array('Distribuciones a medida y planificación técnica', '3 vistas realistas iniciales', 'Planificación completa del espacio (almacenamiento, estancia, servicios, ocio y zonas de estilo de vida)', 'Selección completa de materiales y equipamiento', 'Coordinación de sourcing y logística', 'Gestión completa de la transformación, del diseño a la visita final', 'Visita final de tu espacio terminado', 'Asesoramiento de diseño experto de nuestro equipo')
    ),
    detail_sections = $$[
      {"title":{"en":"Service fee credit","fr":"Crédito de honorarios"},"body":{"en":"Fully credited toward your signed Full Transformation project contract.","fr":"Se acredita íntegramente sobre tu contrato de proyecto Full Transformation firmado."}},
      {"title":{"en":"Design Review Period","fr":"Periodo de revisión del diseño"},"body":{"en":"After receiving your design package, you'll have up to 7 days to review the proposed concept with our team. During this review period, additional visual perspectives and minor design refinements may be provided as needed to help you confidently validate your project before moving forward. Our goal is to ensure every design, material, and project decision is fully aligned before purchasing, scheduling, delivery, or installation begins. After the 7-day review period and final approval, any major redesign, significant scope change, or change in project direction may require additional design services and will be quoted separately.","fr":"Tras recibir tu paquete de diseño, dispondrás de hasta 7 días para revisar la propuesta con nuestro equipo. Durante este periodo de revisión se pueden aportar perspectivas visuales adicionales y pequeños ajustes de diseño, según sea necesario, para ayudarte a validar tu proyecto con total confianza antes de avanzar. Nuestro objetivo es que cada decisión de diseño, material y proyecto esté plenamente alineada antes de iniciar compras, planificación, entrega o instalación. Tras los 7 días de revisión y la aprobación final, cualquier rediseño importante, cambio significativo de alcance o cambio de dirección del proyecto puede requerir servicios de diseño adicionales y se presupuestará por separado."}},
      {"title":{"en":"How it works","fr":"Cómo funciona"},"items":{"en":["Dedicated consultation to define your vision","Clear scope, budget, and timeline","Structured phases from design to completion","One expert guiding your project throughout"],"fr":["Consulta dedicada para definir tu visión","Alcance, presupuesto y plazos claros","Fases estructuradas del diseño a la entrega","Un experto que acompaña tu proyecto durante todo el proceso"]}},
      {"title":{"en":"Deposit structure","fr":"Estructura de pago"},"items":{"en":["50% to secure your project and begin design","25% after design validation during materials and sourcing","25% upon completion and final walkthrough"],"fr":["50 % para asegurar el proyecto e iniciar el diseño","25 % tras la validación del diseño, durante la fase de materiales y sourcing","25 % al finalizar, en la visita final"]}},
      {"title":{"en":"Project investment","fr":"Inversión del proyecto"},"body":{"en":"Final project investment varies depending on garage size, finishes, customization level, and integrated features.","fr":"La inversión final del proyecto varía según el tamaño del garaje, los acabados, el nivel de personalización y las funciones integradas."}},
      {"title":{"en":"Design Ownership","fr":"Propiedad del diseño"},"body":{"en":"All layouts, plans, and visual designs remain the property of Garage à la Carte and are provided for your personal project use. Independent use or third-party execution may require a separate usage agreement.","fr":"Todos los planos, diseños y visuales siguen siendo propiedad de Garage à la Carte y se proporcionan para uso personal de tu proyecto. El uso independiente o la ejecución por terceros puede requerir un acuerdo de uso por separado."}},
      {"title":{"en":"Continue your project","fr":"Continúa tu proyecto"},"body":{"en":"Upgrade your space with integrated systems such as plumbing, electrical, climate control, and smart features designed to work seamlessly together.","fr":"Mejora tu espacio con sistemas integrados como fontanería, electricidad, climatización y funciones inteligentes, pensados para funcionar en conjunto."}},
      {"title":{"en":"Delivery area","fr":"Zona de servicio"},"body":{"en":"On-site visits are available throughout the Orlando area. Visits beyond our standard zone are quoted based on location.","fr":"Las visitas in situ están disponibles en toda la zona de Orlando. Las visitas fuera de nuestra zona estándar se presupuestan según la ubicación."}}
    ]$$::jsonb,
    updated_at = now()
where slug = 'transform';


-- ============================================================================
-- 5. SERVICE 4 — « Smart Integration » (slug = smart) : zone de service
-- ============================================================================

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


-- ============================================================================
-- 6. PAGE CONDITIONS (document « project_conditions ») — 24 sections
-- ============================================================================

update public.legal_documents
set title = jsonb_build_object('en', 'Website Project Details & Conditions', 'fr', 'Condiciones y compromisos del proyecto'),
    intro = jsonb_build_object(
      'en', $$We set clear expectations from day one, plan carefully, and guide your project from idea to completion — depending on the level of service you choose. These guidelines ensure a smooth, transparent, and well-managed experience. By engaging with Garage à la Carte, you agree to these project guidelines unless otherwise defined in a written agreement.$$,
      'fr', $$Definimos expectativas claras desde el primer día, planificamos con cuidado y acompañamos tu proyecto desde la idea hasta la entrega — según el nivel de servicio que elijas. Estas pautas garantizan una experiencia fluida, transparente y bien gestionada. Al trabajar con Garage à la Carte, aceptas estas pautas salvo acuerdo escrito en sentido contrario.$$
    ),
    is_active = true,
    updated_at = now()
where document_key = 'project_conditions';

delete from public.legal_sections
where document_id = (select id from public.legal_documents where document_key = 'project_conditions');

insert into public.legal_sections (document_id, section_number, title, body, display_order, is_active)
select d.id, s.idx::int, s.section->'title', s.section->'body', (s.idx * 10)::int, true
from public.legal_documents d
cross join (
  select row_number() over () as idx, value as section
  from jsonb_array_elements($$[
    {"title":{"en":"Free Estimate","fr":"Presupuesto Gratuito"},"body":{"en":"We begin with a consultation to understand your space, your goals, and the level of service that best fits your project. Your estimate is an initial evaluation and may evolve based on final selections, site conditions, and project details. Estimates are typically valid for a limited period due to potential changes in material costs and availability.","fr":"Empezamos con una consulta para entender tu espacio, tus objetivos y el nivel de servicio que mejor se adapta a tu proyecto. El presupuesto es una evaluación inicial que puede evolucionar según las elecciones finales, las condiciones del sitio y los detalles del proyecto. Los presupuestos suelen ser válidos durante un periodo limitado debido a posibles variaciones en los costes y la disponibilidad de los materiales."}},
    {"title":{"en":"Project Validation","fr":"Validación del Proyecto"},"body":{"en":"A project is considered ready once the following are clearly defined: selected service level; confirmed layout and design direction; estimated budget and main components. Once validated, we move into planning and execution.","fr":"Un proyecto se considera listo cuando los siguientes elementos están claramente definidos: nivel de servicio elegido; distribución y dirección de diseño confirmadas; presupuesto estimado y componentes principales. Una vez validado, pasamos a la planificación y la ejecución."}},
    {"title":{"en":"Scope of Work & Service Levels","fr":"Alcance y Niveles de Servicio"},"body":{"en":"Each service includes only what is clearly defined within the selected level: Garage Design & Build Plan → planning and visual design; Design & Setup → design, sourcing, and preparation; Full Transformation → full coordination and execution; Smart Integration → technical systems and upgrades. Any request outside the selected service is handled as a project adjustment.","fr":"Cada servicio incluye únicamente lo que está claramente definido en el nivel elegido: Garage Design & Build Plan → planificación y diseño; Design & Setup → diseño, sourcing y preparación; Transformación Completa → coordinación y ejecución completas; Smart Integration → sistemas técnicos y mejoras. Cualquier solicitud fuera del servicio elegido se trata como un ajuste de proyecto."}},
    {"title":{"en":"Design Visuals","fr":"Visuales de Diseño"},"body":{"en":"Our 3D visuals and renderings are designed to help you clearly visualize your future space and make confident decisions. They represent the overall design intent, layout, and atmosphere of your project. As every garage is unique, small variations may occur in the final result due to materials, lighting, site conditions, or product availability. Our goal is always to stay as close as possible to the approved design while adapting to real-world conditions.","fr":"Nuestras imágenes 3D y renders están pensados para ayudarte a visualizar con claridad tu futuro espacio y tomar decisiones con confianza. Representan la intención de diseño, la distribución y la atmósfera de tu proyecto. Como cada garaje es único, pueden producirse pequeñas variaciones en el resultado final debido a los materiales, la iluminación, las condiciones del sitio o la disponibilidad de los productos. Nuestro objetivo es siempre acercarnos lo máximo posible al diseño aprobado, adaptándonos a las condiciones reales."}},
    {"title":{"en":"Design Approval","fr":"Aprobación del Diseño"},"body":{"en":"Before moving forward, you'll review and approve your design, including layout, materials, and overall concept. This step ensures everything is aligned with your vision before we begin sourcing or execution. Once approved, your project moves forward based on these validated plans. Any changes made afterward are considered project adjustments and may affect the timeline and pricing. We encourage you to review every detail carefully — this is your opportunity to make sure everything feels right before we build.","fr":"Antes de avanzar, revisarás y aprobarás tu diseño, incluida la distribución, los materiales y el concepto general. Este paso garantiza que todo esté alineado con tu visión antes de iniciar el sourcing o la ejecución. Una vez aprobado, el proyecto avanza según estos planos validados. Cualquier cambio posterior se considera un ajuste de proyecto y puede afectar a los plazos y al precio. Te animamos a revisar cada detalle con atención — es tu oportunidad para asegurarte de que todo encaja antes de construir."}},
    {"title":{"en":"Use of Designs & Intellectual Property","fr":"Uso de los Diseños y Propiedad Intelectual"},"body":{"en":"All layouts, technical plans, renderings, visual concepts, and design documents created by Garage à la Carte remain the intellectual property of Garage à la Carte unless otherwise agreed in writing. These materials are provided for the personal use of your project and may not be reproduced, sold, distributed, or used for commercial purposes without prior authorization. If you move forward with a signed Garage à la Carte project contract, your service fee may be credited in accordance with the terms of your selected service. If you choose to build independently or work with another contractor, a separate design usage or release agreement may be required before project documents are transferred for execution.","fr":"Todos los planos, planos técnicos, renders, conceptos visuales y documentos de diseño creados por Garage à la Carte siguen siendo propiedad intelectual de Garage à la Carte salvo acuerdo escrito en sentido contrario. Estos materiales se proporcionan para el uso personal de tu proyecto y no pueden reproducirse, venderse, distribuirse ni utilizarse con fines comerciales sin autorización previa. Si avanzas con un contrato de proyecto firmado con Garage à la Carte, tus honorarios pueden acreditarse según las condiciones del servicio elegido. Si decides construir por tu cuenta o trabajar con otro contratista, puede requerirse un acuerdo de uso o cesión de diseño antes de transferir los documentos del proyecto para su ejecución."}},
    {"title":{"en":"Client Responsibilities","fr":"Responsabilidades del Cliente"},"body":{"en":"To ensure your project runs smoothly, you agree to: provide accurate information about your space and needs; review and approve designs in a timely manner; ensure access to the property for delivery or installation; obtain any required approvals (HOA, building management, etc.). Utilities (electrical, plumbing, etc.) must be accessible and compliant prior to installation unless otherwise agreed.","fr":"Para que tu proyecto se desarrolle sin contratiempos, te comprometes a: facilitar información precisa sobre tu espacio y tus necesidades; revisar y aprobar los diseños con rapidez; garantizar el acceso a la propiedad para la entrega o la instalación; obtener las autorizaciones necesarias (HOA, administración del edificio, etc.). Los suministros (electricidad, fontanería, etc.) deben estar accesibles y en regla antes de la instalación, salvo acuerdo en sentido contrario."}},
    {"title":{"en":"Site Readiness & Decluttering","fr":"Preparación del Sitio"},"body":{"en":"Before delivery or installation, the garage must be fully prepared: personal items removed; workspace cleared; access unobstructed. Decluttering and item removal remain the client's responsibility. If the site is not ready, the project may be delayed or rescheduled, and additional costs may apply.","fr":"Antes de la entrega o la instalación, el garaje debe estar totalmente preparado: objetos personales retirados; espacio de trabajo despejado; acceso libre. El despeje y la retirada de objetos son responsabilidad del cliente. Si el sitio no está listo, el proyecto puede retrasarse o reprogramarse, y pueden aplicarse costes adicionales."}},
    {"title":{"en":"Site Documentation (Internal Use)","fr":"Documentación del Sitio (Uso Interno)"},"body":{"en":"To ensure a smooth and accurate process, we may take photos or short videos of your garage during on-site visits. This allows our team — including Guillaume and Juliette — to capture important details without requiring additional visits, helping us plan and execute your project efficiently. These materials are used strictly for internal purposes and remain private. They are never used for marketing without your prior approval (see Portfolio Use).","fr":"Para garantizar un proceso fluido y preciso, podemos tomar fotos o vídeos cortos de tu garaje durante las visitas. Esto permite a nuestro equipo — incluidos Guillaume y Juliette — capturar detalles importantes sin necesidad de visitas adicionales, ayudándonos a planificar y ejecutar tu proyecto con eficiencia. Estos materiales se utilizan estrictamente con fines internos y permanecen privados. Nunca se usan con fines de marketing sin tu autorización previa (ver Uso del Portfolio)."}},
    {"title":{"en":"Installation & Responsibility","fr":"Instalación y Responsabilidad"},"body":{"en":"Execution depends on your selected service level: Garage Design & Build Plan → client-managed execution; Design & Setup → client installs or requests support; Full Transformation → installation managed by our team and partners.","fr":"La ejecución depende del nivel de servicio elegido: Garage Design & Build Plan → ejecución gestionada por el cliente; Design & Setup → el cliente instala o solicita apoyo; Transformación Completa → instalación gestionada por nuestro equipo y socios."}},
    {"title":{"en":"Permits & Regulations","fr":"Permisos y Normativa"},"body":{"en":"Some projects may require permits depending on the scope and local regulations. Unless otherwise included, the client is responsible for obtaining permits. We provide guidance or coordination when part of the selected service.","fr":"Algunos proyectos pueden requerir permisos según el alcance y la normativa local. Salvo que se incluya, el cliente es responsable de obtener los permisos. Ofrecemos orientación o coordinación cuando forma parte del servicio elegido."}},
    {"title":{"en":"Licensed Trades","fr":"Profesionales Acreditados"},"body":{"en":"When required, we coordinate with qualified and licensed professionals to ensure compliance and quality.","fr":"Cuando es necesario, coordinamos con profesionales cualificados y acreditados para garantizar el cumplimiento y la calidad."}},
    {"title":{"en":"Project Timeline","fr":"Plazos del Proyecto"},"body":{"en":"Timelines are estimated and may be influenced by: material availability; supplier delays; weather conditions; permits and approvals; site readiness. We communicate any updates as early as possible.","fr":"Los plazos son estimativos y pueden verse afectados por: la disponibilidad de materiales; los retrasos de los proveedores; la meteorología; los permisos y autorizaciones; la preparación del sitio. Comunicamos cualquier actualización lo antes posible."}},
    {"title":{"en":"Payment Terms","fr":"Condiciones de Pago"},"body":{"en":"A deposit is required to secure your project and begin planning. The payment structure depends on your selected service and project scope and is defined during your project setup. It typically includes an initial deposit, progress payments, and a final balance prior to completion. No work begins without confirmed payment.","fr":"Se requiere un anticipo para asegurar tu proyecto e iniciar la planificación. La estructura de pago depende del servicio elegido y del alcance del proyecto, y se define durante la configuración del proyecto. Suele incluir un anticipo inicial, pagos parciales y un saldo final antes de la finalización. Ningún trabajo se inicia sin pago confirmado."}},
    {"title":{"en":"Project Adjustments","fr":"Ajustes del Proyecto"},"body":{"en":"Any change after approval is handled as a project adjustment. Adjustments may impact pricing, timeline, and delivery conditions, and are confirmed before moving forward.","fr":"Cualquier cambio tras la aprobación se gestiona como un ajuste de proyecto. Los ajustes pueden afectar al precio, los plazos y las condiciones de entrega, y se confirman antes de avanzar."}},
    {"title":{"en":"Existing Conditions","fr":"Condiciones Existentes"},"body":{"en":"We are not responsible for pre-existing issues such as structural defects, electrical or plumbing problems, or hidden damage. If identified, solutions may be proposed as part of an updated scope.","fr":"No somos responsables de problemas preexistentes como defectos estructurales, problemas eléctricos o de fontanería, o daños ocultos. Si se detectan, pueden proponerse soluciones como parte de un alcance actualizado."}},
    {"title":{"en":"Product Availability","fr":"Disponibilidad de Productos"},"body":{"en":"If a product becomes unavailable, we may recommend equivalent alternatives in quality and function, subject to your approval.","fr":"Si un producto deja de estar disponible, podemos recomendar alternativas equivalentes en calidad y función, sujetas a tu aprobación."}},
    {"title":{"en":"External Factors","fr":"Factores Externos"},"body":{"en":"Delays may occur due to factors beyond our control, including severe weather, supply chain disruptions, or regulatory constraints. We adapt and communicate as needed.","fr":"Pueden producirse retrasos por factores ajenos a nuestro control, como condiciones meteorológicas severas, interrupciones en la cadena de suministro o restricciones normativas. Nos adaptamos y comunicamos según sea necesario."}},
    {"title":{"en":"Delivery Area","fr":"Zona de Servicio"},"body":{"en":"On-site visits are available throughout the Orlando area. Visits beyond our standard zone are quoted based on location.","fr":"Las visitas in situ están disponibles en toda la zona de Orlando. Las visitas fuera de nuestra zona estándar se presupuestan según la ubicación."}},
    {"title":{"en":"Final Walkthrough","fr":"Visita Final"},"body":{"en":"For managed projects, a final walkthrough may be conducted to ensure everything aligns with the agreed plan.","fr":"En los proyectos gestionados, puede realizarse una visita final para asegurar que todo coincide con el plan acordado."}},
    {"title":{"en":"Cancellation","fr":"Cancelación"},"body":{"en":"Custom work and orders may not be canceled once initiated. Work completed up to the time of cancellation remains payable.","fr":"Los trabajos y pedidos personalizados no pueden cancelarse una vez iniciados. El trabajo realizado hasta el momento de la cancelación sigue siendo facturable."}},
    {"title":{"en":"Warranty","fr":"Garantía"},"body":{"en":"Manufacturer warranties apply to products. The installation warranty applies when installation is handled by our team or partners.","fr":"Las garantías del fabricante se aplican a los productos. La garantía de instalación se aplica cuando la instalación es gestionada por nuestro equipo o socios."}},
    {"title":{"en":"Portfolio Use","fr":"Uso del Portfolio"},"body":{"en":"We may use project photos for portfolio and marketing purposes unless you request otherwise in writing.","fr":"Podemos usar fotos del proyecto con fines de portfolio y marketing, salvo solicitud escrita en sentido contrario."}},
    {"title":{"en":"Our Commitment","fr":"Nuestro Compromiso"},"body":{"en":"Clear communication. Thoughtful design. Reliable coordination. Results aligned with your expectations.","fr":"Comunicación clara. Diseño cuidado. Coordinación fiable. Resultados alineados con tus expectativas."}}
  ]$$::jsonb)
) as s
where d.document_key = 'project_conditions';


-- ============================================================================
-- 7. PROJET 4 — « The Hybrid Lifestyle Garage » (slug = modern-automotive-lounge)
-- ============================================================================
-- Renommage / mise à jour de l'ancien « Modern Automotive Lounge ».
-- Slug et images inchangés.

update public.projects
set name = jsonb_build_object('en', 'The Hybrid Lifestyle Garage', 'fr', 'El Garaje Híbrido Lifestyle'),
    tagline = jsonb_build_object('en', 'A Garage Designed for Cars, Work & Entertainment', 'fr', 'Un garaje diseñado para coches, trabajo y entretenimiento'),
    project_type = jsonb_build_object('en', 'Hybrid lifestyle / Multi-use', 'fr', 'Estilo de vida híbrido / Multi-uso'),
    description = jsonb_build_object(
      'en', 'Transform your garage into the ultimate hybrid lifestyle space — designed for the way you live. This complete transformation blends premium vehicle display, a productive workspace, entertainment, and comfort into one beautifully designed, fully integrated environment. A garage designed to showcase your passion, support your productivity, and elevate your everyday living.',
      'fr', 'Convierte tu garaje en el espacio de estilo de vida híbrido definitivo — diseñado para tu forma de vivir. Esta transformación completa combina una exposición premium del vehículo, un espacio de trabajo productivo, entretenimiento y confort en un único entorno bellamente diseñado y totalmente integrado. Un garaje pensado para mostrar tu pasión, apoyar tu productividad y elevar tu día a día.'
    ),
    includes = jsonb_build_object(
      'en', jsonb_build_array('Premium vehicle display area', 'Lounge zone with sofa and oversized screen', 'Modern workspace or gaming setup', 'Beverage / coffee corner with storage', 'Integrated lighting and upscale finishes', 'Functional layout designed for everyday use'),
      'fr', jsonb_build_array('Zona de exposición premium del vehículo', 'Espacio lounge con sofá y pantalla de gran tamaño', 'Espacio de trabajo moderno o setup de gaming', 'Rincón de café / bebidas con almacenamiento', 'Iluminación integrada y acabados de alta gama', 'Distribución funcional pensada para el uso diario')
    ),
    value_points = jsonb_build_object(
      'en', jsonb_build_array('Turn underused garage space into a lifestyle destination', 'Combine cars, work, entertainment, and relaxation in one environment', 'Create a clean, organized, high-end atmosphere', 'Increase comfort, functionality, and property appeal', 'Enjoy a garage designed to impress and be lived in'),
      'fr', jsonb_build_array('Convierte un espacio de garaje infrautilizado en un destino de estilo de vida', 'Combina coches, trabajo, entretenimiento y relajación en un único entorno', 'Crea una atmósfera limpia, organizada y de alta gama', 'Aumenta el confort, la funcionalidad y el atractivo de tu propiedad', 'Disfruta de un garaje diseñado para impresionar y para vivirlo')
    ),
    project_range = jsonb_build_object(
      'en', 'Typical Project Range (3-Car Garage). Depending on how far you want to go. Each garage is fully customized. Final pricing is based on your space, layout, and level of transformation (finishes, technology integration, and level of customization).',
      'fr', 'Rango típico del proyecto (garaje para 3 coches). Según hasta dónde quieras llegar. Cada garaje se personaliza por completo. El precio final depende de tu espacio, distribución y nivel de transformación (acabados, integración tecnológica y nivel de personalización).'
    ),
    closing_line = jsonb_build_object(
      'en', 'Start with a design — and transform your garage into a space built for cars, work, and entertainment.',
      'fr', 'Empieza por el diseño — y transforma tu garaje en un espacio pensado para coches, trabajo y entretenimiento.'
    ),
    updated_at = now()
where slug = 'modern-automotive-lounge';


-- ============================================================================
-- FIN — Vérifications rapides (optionnel)
-- ============================================================================
-- select channel_key, value from public.contact_channels where channel_key in ('main_email','main_phone','address');
-- select slug, title->>'en', deposit_schedule->>'en' from public.services order by display_order;
-- select section_number, title->>'en' from public.legal_sections
--   where document_id = (select id from public.legal_documents where document_key='project_conditions')
--   order by section_number;
