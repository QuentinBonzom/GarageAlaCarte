-- ============================================================================
-- Mise à jour du service 2 « Design & Setup » (slug = delivery)
-- Texte officiel de la cliente (PDF « CARD 2 — DESIGN & SETUP »).
-- ----------------------------------------------------------------------------
-- À exécuter dans Supabase → SQL Editor. Idempotent (UPDATE sur la ligne existante).
-- ============================================================================

update public.services
set subtitle = jsonb_build_object(
      'en', 'Plan It Right. Prepare It With Confidence.',
      'fr', 'Hazlo bien desde el principio. Prepáralo con confianza.'
    ),
    description = jsonb_build_object(
      'en', 'You want more than a design — you want the right products, materials, and a clear setup plan. Move from vision to execution without the sourcing headache. We take your project beyond design, ensuring every detail is addressed before purchasing, delivery, or installation begins. Most clients move forward with a full transformation once everything is planned and ready.',
      'fr', 'Quieres algo más que un diseño — quieres los productos adecuados, los materiales correctos y un plan de instalación claro. Pasa de la visión a la ejecución sin la carga del sourcing. Llevamos tu proyecto más allá del diseño, asegurándonos de que cada detalle esté resuelto antes de iniciar compras, entrega o instalación. La mayoría de los clientes pasa a la transformación completa una vez que todo está planificado y listo.'
    ),
    includes = jsonb_build_object(
      'en', jsonb_build_array(
        'Custom layouts and technical planning',
        '3 initial realistic views',
        'Product selection guidance',
        'Sourcing coordination',
        'Delivery and assembly of selected components',
        'Expert design guidance from our team'
      ),
      'fr', jsonb_build_array(
        'Distribuciones a medida y planificación técnica',
        '3 vistas realistas iniciales',
        'Asesoramiento en la selección de productos',
        'Coordinación del sourcing',
        'Entrega y montaje de los componentes seleccionados',
        'Asesoramiento de diseño experto de nuestro equipo'
      )
    ),
    not_included = jsonb_build_object(
      'en', 'No final installation or contractor labor unless upgraded to Full Transformation.',
      'fr', 'Sin instalación final ni mano de obra del contratista, salvo al pasar a Transformación Completa.'
    ),
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

-- Vérification (optionnel)
-- select slug, subtitle, description, includes, not_included, deposit_schedule, detail_sections from public.services where slug = 'delivery';
