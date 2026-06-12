-- Garage a la Carte seed data
-- Run after database/schema.sql.

insert into public.site_settings (key, value, description)
values
  ('brand', jsonb_build_object(
    'name', 'Garage a la Carte',
    'tagline', jsonb_build_object(
      'en', 'American precision, European design.',
      'fr', 'Precisión americana, diseño europeo.'
    )
  ), 'Brand identity used by the header, footer, and metadata.'),
  ('default_locale', '"en"'::jsonb, 'Default public language.'),
  ('service_area', jsonb_build_object('city', 'Orlando', 'state', 'FL', 'radius_miles', 20), 'Default service area.'),
  ('theme', jsonb_build_object(
    'accentColor', '#F1B395',
    'density', 1,
    'cardStyle', 'soft',
    'colors', jsonb_build_object(
      '--cream', '#F2EDE5',
      '--cream-deep', '#D8C7B3',
      '--paper', '#FAF6EE',
      '--ink', '#1F1F1F',
      '--ink-soft', '#3A2D27',
      '--muted', '#6b6157',
      '--line', 'rgba(31, 31, 31, 0.10)',
      '--line-strong', 'rgba(31, 31, 31, 0.22)',
      '--accent', '#F1B395',
      '--accent-deep', '#E89977',
      '--terra-soft', '#F8D7C3',
      '--slate', '#A9B6BF',
      '--slate-soft', '#C3CCD2',
      '--slate-deep', '#8A98A2',
      '--brass', '#c9a961',
      '--brass-soft', '#e0c994',
      '--aqua', '#5ec4d6',
      '--sunset', '#ffd166',
      '--palm', '#2a9d8f'
    )
  ), 'UI defaults for the React app (accent, layout, and full color palette).')
on conflict (key) do update
set value = excluded.value,
    description = excluded.description,
    updated_at = now();

insert into public.cms_sections (page_key, section_key, content, display_order, is_active)
values
  ('global', 'nav', jsonb_build_object(
    'en', jsonb_build_object('home', 'Home', 'projects', 'Projects', 'contact', 'Contact', 'admin', 'Admin'),
    'fr', jsonb_build_object('home', 'Inicio', 'projects', 'Proyectos', 'contact', 'Contacto', 'admin', 'Admin')
  ), 10, true),
  ('home', 'hero', jsonb_build_object(
    'eyebrow', jsonb_build_object(
      'en', 'Orlando, FL · Custom garage transformations',
      'fr', 'Orlando, FL · Transformaciones de garaje a medida'
    ),
    'title', jsonb_build_object(
      'en', jsonb_build_array('Your garage,', 'reimagined.'),
      'fr', jsonb_build_array('Tu garaje,', 'reinventado.')
    ),
    'italic_word', jsonb_build_object('en', 'reimagined.', 'fr', 'reinventado.'),
    'tagline', jsonb_build_object(
      'en', 'Unlock the Full Potential of Your Garage',
      'fr', 'Libera todo el potencial de tu garaje'
    ),

    'sub', jsonb_build_object(
      'en', 'Custom garage transformations in Orlando.',
      'fr', 'Transformaciones de garaje a medida en Orlando.'
    ),
    'primary_cta', jsonb_build_object('en', 'Get my free estimate', 'fr', 'Obtener mi presupuesto gratuito'),
    'secondary_cta', jsonb_build_object('en', 'See our work', 'fr', 'Ver nuestros proyectos')
  ), 10, true),

  ('home', 'hero_caption', jsonb_build_object(
    'label', jsonb_build_object('en', 'Featured project', 'fr', 'Proyecto destacado'),
    'images', jsonb_build_array(),
    'featured_label', jsonb_build_object('en', 'FEATURED PROJECT', 'fr', 'PROYECTO DESTACADO'),
    'featured_title', jsonb_build_object('en', 'The Social Hub', 'fr', 'The Social Hub')
  ), 20, true),
  ('home', 'before_after', jsonb_build_object(
    'eyebrow', jsonb_build_object('en', 'The transformation', 'fr', 'La transformación'),
    'title', jsonb_build_object('en', 'From cluttered garage to dream garage. See the transformation!', 'fr', 'De un garaje desordenado al garaje de tus sueños. ¡Descubre la transformación!'),

    'before', jsonb_build_object('en', 'Boxes, tools, wasted square footage. No clear purpose.', 'fr', 'Cajas, herramientas, metros cuadrados desperdiciados. Sin un propósito claro.'),
    'after', jsonb_build_object('en', 'A clean, planned, functional garage designed around your lifestyle.', 'fr', 'Un garaje limpio, planificado y funcional, diseñado en torno a tu estilo de vida.'),
    'statement', jsonb_build_object(
      'en', 'Experience American practicality and precision combined with European mood-visual design and advanced Color, Material & Finish (CMF) expertise for a stunning, functional space.',
      'fr', 'Descubre la practicidad y precisión americanas combinadas con el diseño visual y la atmósfera europeos, junto a una experiencia avanzada en Color, Material y Acabado (CMF), para un espacio funcional e impresionante.'
    )
  ), 40, true),
  ('home', 'services_intro', jsonb_build_object(
    'eyebrow', jsonb_build_object('en', 'Pricing', 'fr', 'Tarifas'),
    'title', jsonb_build_object('en', 'Explore Our Four Signature Services', 'fr', 'Descubre nuestros cuatro servicios estrella'),
    'sub', jsonb_build_object('en', 'Start with a plan. Go all the way. Upgrade anytime.', 'fr', 'Empieza con un plan. Ve hasta el final. Mejora cuando quieras.')
  ), 50, true),
  ('home', 'final_cta', jsonb_build_object(
    'title', jsonb_build_object('en', 'Ready to reimagine your garage?', 'fr', '¿Listo para reinventar tu garaje?'),
    'sub', jsonb_build_object('en', 'Tell us about your space. We''ll send a free estimate within 48 hours.', 'fr', 'Cuéntanos sobre tu espacio. Te enviaremos un presupuesto gratuito en 48 h.')
  ), 60, true),
  ('home', 'use_cases', jsonb_build_object(
    'eyebrow', jsonb_build_object('en', 'Transformations', 'fr', 'Transformaciones'),
    'title', jsonb_build_object('en', 'Discover Your Dream Garage. Explore, Imagine, and Get Inspired!', 'fr', 'Descubre el garaje de tus sueños. ¡Explora, imagina e inspírate!'),
    'sub', jsonb_build_object(
      'en', 'We specialize in garage remodeling, makeovers, and custom storage solutions for homeowners, real estate agencies, developers, builders, and property managers across Orlando and the surrounding areas.',
      'fr', 'Estamos especializados en la reforma de garajes, transformaciones y soluciones de almacenamiento a medida para propietarios, agencias inmobiliarias, promotores, constructores y administradores de fincas en Orlando y alrededores.'
    ),
    'items', jsonb_build_array(
      jsonb_build_object(
        'image', '',
        'name', jsonb_build_object('en', 'Daily Living Garage', 'fr', 'Garaje del Día a Día'),
        'tagline', jsonb_build_object('en', 'Multi-functional / Lifestyle', 'fr', 'Multifuncional / Estilo de vida')
      ),
      jsonb_build_object(
        'image', '',
        'name', jsonb_build_object('en', 'The Social Hub — Smart Living Garage', 'fr', 'The Social Hub — Smart Living Garage'),
        'tagline', jsonb_build_object(
          'en', 'A Garage Designed for Entertainment and Lifestyle',
          'fr', 'Un garaje diseñado para el entretenimiento y el estilo de vida'
        )
      ),
      jsonb_build_object(
        'image', '',
        'name', jsonb_build_object('en', 'The Daily Living Garage', 'fr', 'El Garaje del Día a Día'),
        'tagline', jsonb_build_object(
          'en', 'A Multi-Functional Garage for Work, Fitness, and Relaxation',
          'fr', 'Un garaje multifuncional para el trabajo, el fitness y la relajación'
        )
      ),
      jsonb_build_object(
        'image', '',
        'name', jsonb_build_object('en', 'Modern Automotive Lounge', 'fr', 'Lounge Automovilístico Moderno'),
        'tagline', jsonb_build_object(
          'en', 'A High-End Garage for Cars, Work, Entertainment, and Lifestyle',
          'fr', 'Un garaje de alta gama para coches, trabajo, entretenimiento y estilo de vida'
        )
      )
    )
  ), 30, true),

  ('projects', 'projects_page', jsonb_build_object(
    'eyebrow', jsonb_build_object('en', 'Selected work', 'fr', 'Selección'),
    'title', jsonb_build_object('en', 'Our garages, redesigned.', 'fr', 'Nuestros garajes, repensados.'),
    'sub', jsonb_build_object('en', 'Custom transformations. Tap any project for the full story.', 'fr', 'Transformaciones a medida. Haz clic para conocer la historia completa.')
  ), 10, true),
  ('contact', 'contact_page', jsonb_build_object(
    'eyebrow', jsonb_build_object('en', 'Get in touch', 'fr', 'Contacto'),
    'title', jsonb_build_object('en', 'Let''s design your garage.', 'fr', 'Diseñemos tu garaje.'),
    'sub', jsonb_build_object('en', 'Tell us about your space and your vision. We''ll come back to you within 48 hours with a free estimate and clear next steps.', 'fr', 'Cuéntanos sobre tu espacio y tu visión. Te responderemos en 48 h con un presupuesto gratuito y los próximos pasos claros.'),
    'info_title', jsonb_build_object('en', 'Direct line', 'fr', 'Contacto directo'),
    'form', jsonb_build_object(
      'name', jsonb_build_object('en', 'Your name', 'fr', 'Tu nombre'),
      'email', jsonb_build_object('en', 'Email', 'fr', 'Email'),
      'phone', jsonb_build_object('en', 'Phone (optional)', 'fr', 'Teléfono (opcional)'),
      'service', jsonb_build_object('en', 'Service interested in', 'fr', 'Servicio de interés'),
      'message', jsonb_build_object('en', 'Tell us about your project', 'fr', 'Cuéntanos sobre tu proyecto'),
      'submit', jsonb_build_object('en', 'Send my request', 'fr', 'Enviar mi solicitud'),
      'consent', jsonb_build_object('en', 'I have read and agreed to the', 'fr', 'He leído y acepto las'),
      'consent_link', jsonb_build_object('en', 'project conditions', 'fr', 'condiciones del proyecto')
    )
  ), 10, true),
  ('global', 'popup', jsonb_build_object(
    'title', jsonb_build_object('en', 'Before you go —', 'fr', 'Antes de irte —'),
    'sub', jsonb_build_object('en', 'Get our free guide: 5 mistakes to avoid before transforming your garage.', 'fr', 'Recibe nuestra guía gratuita: 5 errores que evitar antes de transformar tu garaje.'),
    'placeholder', jsonb_build_object('en', 'Your email', 'fr', 'Tu email'),
    'cta', jsonb_build_object('en', 'Send me the guide', 'fr', 'Enviarme la guía'),
    'decline', jsonb_build_object('en', 'No thanks', 'fr', 'No, gracias'),
    'success', jsonb_build_object('en', 'Thanks — check your inbox.', 'fr', 'Gracias — revisa tu bandeja de entrada.')
  ), 20, true)
on conflict (section_key) do update
set page_key = excluded.page_key,
    content = excluded.content,
    display_order = excluded.display_order,
    is_active = excluded.is_active,
    updated_at = now();

insert into public.contact_channels (channel_key, channel_type, label, value, href, display_order, is_active)
values
  ('main_email', 'email', jsonb_build_object('en', 'Email', 'fr', 'Email'), 'garagealacarte@gmail.com', 'mailto:garagealacarte@gmail.com', 10, true),
  ('main_phone', 'phone', jsonb_build_object('en', 'Phone', 'fr', 'Teléfono'), '+1 (917) 353-4950', 'tel:+19173534950', 20, true),
  ('address', 'address', jsonb_build_object('en', 'Address', 'fr', 'Dirección'), 'Orlando, FL · on-site visits across the Orlando area', null, 30, true)
on conflict (channel_key) do update
set channel_type = excluded.channel_type,
    label = excluded.label,
    value = excluded.value,
    href = excluded.href,
    display_order = excluded.display_order,
    is_active = excluded.is_active,
    updated_at = now();

insert into public.team_members (slug, name, role, bio, long_bio, email, phone, website, display_order, is_active)
values
  ('guillaume', 'Guillaume',
    jsonb_build_object('en', 'Garage Transformation & Build Lead', 'fr', 'Responsable de Transformación y Construcción de Garaje'),
    jsonb_build_object('en', 'Based in Orlando, Guillaume brings real-world construction experience and ensures every project is grounded, feasible, and built right.', 'fr', 'Con sede en Orlando, Guillaume aporta una sólida experiencia en obra y garantiza que cada proyecto sea realista, viable y bien ejecutado.'),
    null,
    'garagealacarte@gmail.com', '+1 (917) 353-4950', 'https://www.ecuafranceelectric.com/', 10, true),
  ('aymeric', 'Aymeric Vanelle',
    jsonb_build_object('en', '3D Space Planning & Technical Design Lead', 'fr', 'Responsable de planificación espacial 3D y diseño técnico'),
    jsonb_build_object('en', 'Industrial designer specializing in 3D design and custom space planning, with a Paris-trained background in fine woodworking, industrial design, and applied arts.', 'fr', 'Diseñador industrial especializado en diseño 3D y planificación de espacios a medida, con formación parisina en ebanistería fina, diseño industrial y artes aplicadas.'),
    jsonb_build_object(
      'en', $$I am Aymeric Vanelle, an industrial designer specializing in 3D design and custom space planning. My background includes fine woodworking, industrial design, and applied arts, all earned in Paris, France.

My experience spans high-end cabinetry, luxury residential projects, the French film industry, and the creation of luxury presentation boxes for watchmaking and cigar brands.

This background has shaped my approach, combining technical precision, craftsmanship, and meticulous attention to detail.

At Garage a la Carte, I contribute expertise in technical design and space optimization, transforming ideas into functional and well-planned environments. By creating detailed 3D floor plans and applying thoughtful space planning, I ensure every project is practical, efficient, and tailored to the client's specific needs.

Working with Juliette and Guillaume, we design smart, functional, and personalized garages that enhance everyday living and integrate naturally into each family's lifestyle.$$,
      'fr', $$Soy Aymeric Vanelle, diseñador industrial especializado en diseño 3D y planificación de espacios a medida. Mi formación incluye ebanistería fina, diseño industrial y artes aplicadas, todo ello en París, Francia.

Mi experiencia abarca mobiliario de alta gama, proyectos residenciales de lujo, la industria cinematográfica francesa y la creación de cajas de presentación de lujo para marcas de relojería y cigarros.

Este recorrido ha dado forma a mi enfoque, combinando precisión técnica, artesanía y una atención minuciosa al detalle.

En Garage a la Carte, aporto experiencia en diseño técnico y optimización del espacio, transformando ideas en entornos funcionales y bien planificados. Mediante planos 3D detallados y una planificación espacial cuidada, me aseguro de que cada proyecto sea práctico, eficiente y adaptado a las necesidades específicas del cliente.

Junto a Juliette y Guillaume, diseñamos garajes inteligentes, funcionales y personalizados que mejoran la vida diaria y se integran de forma natural en el estilo de vida de cada familia.$$
    ),
    null, null, null, 20, true),
  ('juliette', 'Juliette',
    jsonb_build_object('en', 'Mood-Visual & Advanced Color, Material & Finish (CMF) Design Lead', 'fr', 'Responsable de Diseño Mood-Visual y Color, Material y Acabado (CMF) avanzado'),
    jsonb_build_object('en', 'Combines American precision with European creativity and space-saving design — turning ideas into immersive visuals so you see your future space before it''s built.', 'fr', 'Combina la precisión americana con la creatividad europea. Juliette crea imágenes inmersivas para que veas tu espacio antes incluso de que exista.'),
    jsonb_build_object(
      'en', $$I am Juliette Bergougnoux, an American-French designer born in New York City, with a creative background shaped by both American innovation and European design culture.

I hold a Master's degree in Interior Transportation Design with a specialization in Color, Material & Finish (CMF), completed in Paris, France.

My experience includes collaborations with major automotive brands such as Citroën and Dacia, where I developed CMF concepts for transportation interiors, focusing on material selection, color integration, visual identity, and user experience.

My design approach combines functionality, atmosphere, and refined material storytelling to create spaces that feel both distinctive and purposeful.

Today, I bring this expertise to Garage a la Carte alongside Aymeric and Guillaume, helping to design personalized garage environments that reflect each client's lifestyle through thoughtful space planning, materials, colors, and functionality.$$,
      'fr', $$Soy Juliette Bergougnoux, diseñadora franco-americana nacida en Nueva York, con un recorrido creativo moldeado por la innovación americana y la cultura del diseño europeo.

Soy Máster en Interior Transportation Design con especialización en Color, Material y Acabado (CMF), obtenido en París.

Mi experiencia incluye colaboraciones con grandes marcas del automóvil como Citroën y Dacia, donde desarrollé conceptos CMF para interiores de vehículos, trabajando la selección de materiales, la integración del color, la identidad visual y la experiencia de usuario.

Mi enfoque del diseño combina funcionalidad, atmósfera y un relato cuidado de los materiales para crear espacios distintivos y llenos de sentido.

Hoy aporto esta experiencia a Garage a la Carte junto a Aymeric y Guillaume, diseñando garajes personalizados que reflejan el estilo de vida de cada cliente a través de una cuidada planificación del espacio, los materiales, los colores y la funcionalidad.$$
    ),
    'garagealacarte@gmail.com', '+1 (689) 217-4074', null, 30, true),
  ('nelly', 'Nelly',
    jsonb_build_object('en', 'Project Coordination Lead', 'fr', 'Responsable de Coordinación de Proyecto'),
    jsonb_build_object('en', 'Nelly keeps every project on track — coordinating schedules, suppliers, and your peace of mind from kickoff to handover.', 'fr', 'Nelly mantiene cada proyecto en marcha — coordina agendas, proveedores y tu tranquilidad, desde el inicio hasta la entrega.'),
    null,
    null, null, null, 40, true)
on conflict (slug) do update
set name = excluded.name,
    role = excluded.role,
    bio = excluded.bio,
    long_bio = excluded.long_bio,
    email = excluded.email,
    phone = excluded.phone,
    website = excluded.website,
    display_order = excluded.display_order,
    is_active = excluded.is_active,
    updated_at = now();

-- Only the 4 canonical services should exist on the homepage
delete from public.services
where slug not in ('blueprint', 'delivery', 'transform', 'smart');

insert into public.services (
  slug, service_number, title, subtitle, description, price_label, badge_label,
  tag_label, includes, not_included, deposit_schedule, onsite_label, detail_sections, display_order, is_active
)
values
  ('blueprint', '01',
    jsonb_build_object('en', 'Garage Design & Build Plan', 'fr', 'Garage Design & Build Plan'),
    jsonb_build_object('en', 'Plan It Right. Build It Your Way.', 'fr', 'Hazlo bien desde el principio. Construye a tu manera.'),
    jsonb_build_object('en', 'You want to plan your garage with confidence before making decisions. See your future garage before you build anything — with a custom layout and 3D design, three realistic views, and expert guidance to avoid costly mistakes. Most clients start here, then move forward once they see their design.', 'fr', 'Quieres planificar tu garaje con seguridad antes de tomar decisiones. Visualiza tu futuro garaje antes de construir nada — con una distribución a medida y diseño 3D, tres vistas realistas y asesoramiento experto para evitar errores costosos. La mayoría de los clientes empieza aquí y avanza una vez que ve su diseño.'),
    jsonb_build_object('en', 'starts at $950', 'fr', 'desde 950 $'),
    null,
    jsonb_build_object('en', 'Ideal for getting started', 'fr', 'Ideal para empezar'),
    jsonb_build_object('en', jsonb_build_array('Custom layouts and technical planning', '3 initial realistic views', 'Expert design guidance from our team'), 'fr', jsonb_build_array('Distribuciones a medida y planificación técnica', '3 vistas realistas iniciales', 'Asesoramiento de diseño experto de nuestro equipo')),
    jsonb_build_object('en', 'No product purchasing, no delivery, no installation.', 'fr', 'Sin compra de productos, sin entrega, sin instalación.'),
    null,
    jsonb_build_object('en', 'Garage Design & Build Plan + On-Site Assessment starts at $1,350', 'fr', 'Garage Design & Build Plan + evaluación in situ desde 1 350 $'),
    $$[
      {"title":{"en":"Choose your level","fr":"Elige tu nivel"},"items":{"en":["Garage Design & Build Plan (Remote) starts at $950","Garage Design & Build Plan + On-Site Assessment starts at $1,350"],"fr":["Garage Design & Build Plan a distancia desde 950 $","Garage Design & Build Plan + evaluación in situ desde 1 350 $"]}},
      {"title":{"en":"Design Review Period","fr":"Periodo de revisión del diseño"},"body":{"en":"After receiving your design package, you'll have up to 7 days to review the proposed concept with our team. During this review period, additional visual perspectives and minor design refinements may be provided as needed. Our goal is to ensure you have a clear vision of your future garage before any purchasing, delivery, or installation decisions are made. Some projects may require custom pricing depending on garage size, level of customization, requested visuals, revisions, or technical complexity.","fr":"Tras recibir tu paquete de diseño, dispondrás de hasta 7 días para revisar la propuesta con nuestro equipo. Durante este periodo de revisión se pueden aportar perspectivas visuales adicionales y pequeños ajustes de diseño, según sea necesario. Nuestro objetivo es que tengas una visión clara de tu futuro garaje antes de tomar cualquier decisión de compra, entrega o instalación. Algunos proyectos pueden requerir un precio personalizado según el tamaño del garaje, el nivel de personalización, las vistas solicitadas, las revisiones o la complejidad técnica."}},
      {"title":{"en":"How it works","fr":"Cómo funciona"},"items":{"en":["Initial project discussion to understand your vision","Custom design package with clear deliverables and fixed pricing","Delivered digitally, with optional on-site assessment when needed"],"fr":["Conversación inicial para entender tu visión","Paquete de diseño a medida con entregables claros y precio fijo","Entrega digital, con evaluación in situ opcional cuando es necesario"]}},
      {"title":{"en":"Continue your project","fr":"Continúa tu proyecto"},"body":{"en":"Move forward at any time with setup or a full transformation.","fr":"Avanza en cualquier momento con el setup o una transformación completa."}},
      {"title":{"en":"Design Ownership","fr":"Propiedad del diseño"},"body":{"en":"All layouts, plans, and visual designs remain the property of Garage à la Carte and are provided for your personal project use. Independent use or third-party execution may require a separate usage agreement.","fr":"Todos los planos, diseños y visuales siguen siendo propiedad de Garage à la Carte y se proporcionan para uso personal de tu proyecto. El uso independiente o la ejecución por terceros puede requerir un acuerdo de uso por separado."}},
      {"title":{"en":"Delivery area","fr":"Zona de servicio"},"body":{"en":"On-site visits are available throughout the Orlando area. Visits beyond our standard zone are quoted based on location.","fr":"Las visitas in situ están disponibles en toda la zona de Orlando. Las visitas fuera de nuestra zona estándar se presupuestan según la ubicación."}}
    ]$$::jsonb,
    10, true),
  ('delivery', '02',
    jsonb_build_object('en', 'Design & Setup', 'fr', 'Design & Setup'),
    jsonb_build_object('en', 'Plan It Right. Prepare It With Confidence.', 'fr', 'Hazlo bien desde el principio. Prepáralo con confianza.'),
    jsonb_build_object('en', 'You want more than a design — you want the right products, materials, and a clear setup plan. Move from vision to execution without the sourcing headache. We take your project beyond design, ensuring every detail is addressed before purchasing, delivery, or installation begins. Most clients move forward with a full transformation once everything is planned and ready.', 'fr', 'Quieres algo más que un diseño — quieres los productos adecuados, los materiales correctos y un plan de instalación claro. Pasa de la visión a la ejecución sin la carga del sourcing. Llevamos tu proyecto más allá del diseño, asegurándonos de que cada detalle esté resuelto antes de iniciar compras, entrega o instalación. La mayoría de los clientes pasa a la transformación completa una vez que todo está planificado y listo.'),
    jsonb_build_object('en', 'starts at $1,500', 'fr', 'desde 1 500 $'),
    jsonb_build_object('en', 'Most popular', 'fr', 'El más elegido'), null,
    jsonb_build_object('en', jsonb_build_array('Custom layouts and technical planning', '3 initial realistic views', 'Product selection guidance', 'Sourcing coordination', 'Delivery and assembly of selected components', 'Expert design guidance from our team'), 'fr', jsonb_build_array('Distribuciones a medida y planificación técnica', '3 vistas realistas iniciales', 'Asesoramiento en la selección de productos', 'Coordinación del sourcing', 'Entrega y montaje de los componentes seleccionados', 'Asesoramiento de diseño experto de nuestro equipo')),
    jsonb_build_object('en', 'No final installation or contractor labor unless upgraded to Full Transformation.', 'fr', 'Sin instalación final ni mano de obra del contratista, salvo al pasar a Transformación Completa.'),
    jsonb_build_object('en', '50% / 50%', 'fr', '50 % / 50 %'),
    null,
    $$[
      {"title":{"en":"Service fee credit","fr":"Crédito de honorarios"},"body":{"en":"The service fee is fully credited when you move forward with a signed project contract.","fr":"Los honorarios se acreditan íntegramente si continúas con un contrato de proyecto firmado."}},
      {"title":{"en":"Design Review Period","fr":"Periodo de revisión del diseño"},"body":{"en":"After receiving your design package, you'll have up to 7 days to review the proposed concept with our team. During this review period, additional visual perspectives and minor design refinements may be provided as needed to help you confidently validate your project before moving forward. Our goal is to ensure every product, material, and design decision is fully aligned before purchasing, delivery, or installation begins.","fr":"Tras recibir tu paquete de diseño, dispondrás de hasta 7 días para revisar la propuesta con nuestro equipo. Durante este periodo de revisión se pueden aportar perspectivas visuales adicionales y pequeños ajustes de diseño, según sea necesario, para ayudarte a validar tu proyecto con total confianza antes de avanzar. Nuestro objetivo es que cada decisión de producto, material y diseño esté plenamente alineada antes de iniciar compras, entrega o instalación."}},
      {"title":{"en":"How it works","fr":"Cómo funciona"},"items":{"en":["Free consultation to define your project","Clear scope before commitment","Fixed starting price — final pricing depends on size, complexity, and sourcing needs","Design package delivered digitally","Product sourcing, delivery, and assembly coordinated by our team"],"fr":["Consulta gratuita para definir tu proyecto","Alcance claro antes del compromiso","Precio inicial fijo — el precio final depende del tamaño, la complejidad y las necesidades de sourcing","Paquete de diseño entregado digitalmente","Sourcing de productos, entrega y montaje coordinados por nuestro equipo"]}},
      {"title":{"en":"Deposit structure","fr":"Estructura de pago"},"body":{"en":"This ensures your entire project is fully prepared before execution. After the 7-day review period and final approval, any major redesign, significant scope change, or change in project direction may require additional design services and will be quoted separately.","fr":"Así nos aseguramos de que todo tu proyecto esté completamente preparado antes de la ejecución. Tras los 7 días de revisión y la aprobación final, cualquier rediseño importante, cambio significativo de alcance o cambio de dirección del proyecto puede requerir servicios de diseño adicionales y se presupuestará por separado."},"items":{"en":["50% to secure your project and begin design","50% upon completion and final walkthrough"],"fr":["50 % para asegurar tu proyecto e iniciar el diseño","50 % al finalizar, en la visita final"]}},
      {"title":{"en":"Design Ownership","fr":"Propiedad del diseño"},"body":{"en":"All layouts, plans, and visual designs remain the property of Garage à la Carte and are provided for your personal project use. Independent use or third-party execution may require a separate usage agreement.","fr":"Todos los planos, diseños y visuales siguen siendo propiedad de Garage à la Carte y se proporcionan para uso personal de tu proyecto. El uso independiente o la ejecución por terceros puede requerir un acuerdo de uso por separado."}},
      {"title":{"en":"Continue your project","fr":"Continúa tu proyecto"},"body":{"en":"Move forward anytime with Full Transformation.","fr":"Pasa a la transformación completa cuando quieras."}},
      {"title":{"en":"Delivery area","fr":"Zona de servicio"},"body":{"en":"On-site visits are available throughout the Orlando area. Visits beyond our standard zone are quoted based on location. Everything is prepared so you can move forward with confidence.","fr":"Las visitas in situ están disponibles en toda la zona de Orlando. Las visitas fuera de nuestra zona estándar se presupuestan según la ubicación. Todo queda preparado para que puedas avanzar con confianza."}}
    ]$$::jsonb,
    20, true),
  ('transform', '03',
    jsonb_build_object('en', 'Full Transformation', 'fr', 'Transformación Completa'),
    jsonb_build_object('en', 'From Concept to Completion — We Handle Everything', 'fr', 'Del concepto a la entrega — nos encargamos de todo'),
    jsonb_build_object('en', 'Experience our most comprehensive service. You want a complete, worry-free transformation — fully designed, fully managed, fully delivered. A complete, turnkey solution where we design, plan, and coordinate your full garage transformation, handling scheduling and coordination so your project runs smoothly. Most clients enhance their transformation with integrated upgrades, such as lighting, electrical, climate control, and smart features, designed to work seamlessly together. We don''t just design your garage — we manage the entire transformation, from initial concept to final walkthrough.', 'fr', 'Vive nuestro servicio más completo. Quieres una transformación completa y sin preocupaciones — totalmente diseñada, gestionada y entregada. Una solución llave en mano donde diseñamos, planificamos y coordinamos toda la transformación de tu garaje, encargándonos de la planificación y la coordinación para que tu proyecto avance sin contratiempos. La mayoría de los clientes complementa su transformación con integraciones, como iluminación, electricidad, climatización y funciones inteligentes, pensadas para funcionar en conjunto. No solo diseñamos tu garaje — gestionamos toda la transformación, desde el concepto inicial hasta la visita final.'),
    jsonb_build_object('en', 'starts at $2,750', 'fr', 'desde 2 750 $'),
    jsonb_build_object('en', 'Premium Experience', 'fr', 'Experiencia premium'), null,
    jsonb_build_object('en', jsonb_build_array('Custom layouts and technical planning', '3 initial realistic views', 'Full space planning (storage, living, utility, entertainment, and lifestyle zones)', 'Complete material and equipment selection', 'Sourcing and logistics coordination', 'Complete transformation management from design to final walkthrough', 'Final walkthrough of your completed space', 'Expert design guidance from our team'), 'fr', jsonb_build_array('Distribuciones a medida y planificación técnica', '3 vistas realistas iniciales', 'Planificación completa del espacio (almacenamiento, estancia, servicios, ocio y zonas de estilo de vida)', 'Selección completa de materiales y equipamiento', 'Coordinación de sourcing y logística', 'Gestión completa de la transformación, del diseño a la visita final', 'Visita final de tu espacio terminado', 'Asesoramiento de diseño experto de nuestro equipo')),
    null,
    jsonb_build_object('en', '50% / 25% / 25%', 'fr', '50 % / 25 % / 25 %'),
    null,
    $$[
      {"title":{"en":"Service fee credit","fr":"Crédito de honorarios"},"body":{"en":"Fully credited toward your signed Full Transformation project contract.","fr":"Se acredita íntegramente sobre tu contrato de proyecto Full Transformation firmado."}},
      {"title":{"en":"Design Review Period","fr":"Periodo de revisión del diseño"},"body":{"en":"After receiving your design package, you'll have up to 7 days to review the proposed concept with our team. During this review period, additional visual perspectives and minor design refinements may be provided as needed to help you confidently validate your project before moving forward. Our goal is to ensure every design, material, and project decision is fully aligned before purchasing, scheduling, delivery, or installation begins. After the 7-day review period and final approval, any major redesign, significant scope change, or change in project direction may require additional design services and will be quoted separately.","fr":"Tras recibir tu paquete de diseño, dispondrás de hasta 7 días para revisar la propuesta con nuestro equipo. Durante este periodo de revisión se pueden aportar perspectivas visuales adicionales y pequeños ajustes de diseño, según sea necesario, para ayudarte a validar tu proyecto con total confianza antes de avanzar. Nuestro objetivo es que cada decisión de diseño, material y proyecto esté plenamente alineada antes de iniciar compras, planificación, entrega o instalación. Tras los 7 días de revisión y la aprobación final, cualquier rediseño importante, cambio significativo de alcance o cambio de dirección del proyecto puede requerir servicios de diseño adicionales y se presupuestará por separado."}},
      {"title":{"en":"How it works","fr":"Cómo funciona"},"items":{"en":["Personalized project consultation to define your vision","Clear scope, budget, and timeline","Structured phases from design to completion","One expert guiding your project throughout"],"fr":["Consulta personalizada del proyecto para definir tu visión","Alcance, presupuesto y plazos claros","Fases estructuradas del diseño a la entrega","Un experto que acompaña tu proyecto durante todo el proceso"]}},
      {"title":{"en":"Deposit structure","fr":"Estructura de pago"},"body":{"en":"This ensures your entire project is fully prepared before execution.","fr":"Así nos aseguramos de que todo tu proyecto esté completamente preparado antes de la ejecución."},"items":{"en":["50% to secure your project and begin design","25% after design validation (materials & sourcing phase)","25% upon completion and final walkthrough"],"fr":["50 % para asegurar tu proyecto e iniciar el diseño","25 % tras la validación del diseño (fase de materiales y sourcing)","25 % al finalizar, en la visita final"]}},
      {"title":{"en":"Project investment","fr":"Inversión del proyecto"},"body":{"en":"Final project investment varies depending on garage size, finishes, customization level, and integrated features.","fr":"La inversión final del proyecto varía según el tamaño del garaje, los acabados, el nivel de personalización y las funciones integradas."}},
      {"title":{"en":"Design Ownership","fr":"Propiedad del diseño"},"body":{"en":"All layouts, plans, and visual designs remain the property of Garage à la Carte and are provided for your personal project use. Independent use or third-party execution may require a separate usage agreement.","fr":"Todos los planos, diseños y visuales siguen siendo propiedad de Garage à la Carte y se proporcionan para uso personal de tu proyecto. El uso independiente o la ejecución por terceros puede requerir un acuerdo de uso por separado."}},
      {"title":{"en":"Continue your project","fr":"Continúa tu proyecto"},"body":{"en":"Ready to go further? Upgrade your space with integrated systems — plumbing, electrical, climate control, and smart features — designed to work seamlessly together. Transform your garage into a fully equipped, high-performance space.","fr":"¿Quieres ir más allá? Mejora tu espacio con sistemas integrados — fontanería, electricidad, climatización y funciones inteligentes — diseñados para funcionar en conjunto. Transforma tu garaje en un espacio totalmente equipado y de alto rendimiento."}},
      {"title":{"en":"Delivery area","fr":"Zona de servicio"},"body":{"en":"On-site visits are available throughout the Orlando area. Visits beyond our standard zone are quoted based on location.","fr":"Las visitas in situ están disponibles en toda la zona de Orlando. Las visitas fuera de nuestra zona estándar se presupuestan según la ubicación."}}
    ]$$::jsonb,
    30, true),
  ('smart', '04',
    jsonb_build_object('en', 'Smart Integration', 'fr', 'Smart Integration'),
    jsonb_build_object('en', 'Designed for daily performance — not just visual appeal.', 'fr', 'Pensado para el rendimiento diario — no solo para la estética.'),
    jsonb_build_object('en', 'You want more than a beautiful space — you want a garage that works seamlessly every day. We integrate the systems that bring your space to life: technical planning for plumbing, electrical, HVAC, ventilation, media, smart features, and built-in systems — typically integrated within Design & Setup or Full Transformation.', 'fr', 'Quieres algo más que un espacio bonito — quieres un garaje que funcione perfectamente cada día. Integramos los sistemas que dan vida a tu espacio: fontanería, electricidad, HVAC, ventilación, multimedia, funciones inteligentes y sistemas integrados — generalmente combinados con Design & Setup o Transformación Completa.'),
    jsonb_build_object('en', 'starts at $3,500', 'fr', 'desde 3 500 $'),
    null, jsonb_build_object('en', 'Add-on', 'fr', 'Add-on'),
    jsonb_build_object('en', jsonb_build_array('Technical integration aligned with your design', 'Planning of plumbing, electrical, HVAC, and ventilation', 'Built-in storage, media setup, and smart features', 'Coordination with qualified professionals', 'Technical layouts prepared for implementation'), 'fr', jsonb_build_array('Integración técnica alineada con el diseño', 'Planificación de fontanería, electricidad, HVAC y ventilación', 'Almacenamiento integrado, multimedia y funciones inteligentes', 'Coordinación con profesionales cualificados', 'Planos técnicos listos para la ejecución')),
    null,
    jsonb_build_object('en', 'Included within your main project deposit structure.', 'fr', 'Incluido en la estructura de pago del proyecto principal.'),
    null,
    $$[
      {"title":{"en":"How it works","fr":"Cómo funciona"},"items":{"en":["Systems are planned during the design phase","Integration is coordinated before any work begins","All components are designed to function seamlessly together"],"fr":["Los sistemas se planifican durante la fase de diseño","La integración se coordina antes de iniciar los trabajos","Todos los componentes están pensados para funcionar en conjunto"]}},
      {"title":{"en":"Investment","fr":"Inversión"},"body":{"en":"Custom add-on based on your systems and integration needs. Typically included within Design & Setup or Full Transformation.","fr":"Add-on a medida según tus sistemas y necesidades de integración. Generalmente incluido en Design & Setup o Transformación Completa."},"items":{"en":["Can be added as a standalone upgrade if needed","Technical feasibility validated before implementation","Clear scope and system requirements defined upfront","Coordination planned prior to execution"],"fr":["Puede añadirse como upgrade independiente si es necesario","Viabilidad técnica validada antes de la ejecución","Alcance y requisitos de los sistemas definidos por adelantado","Coordinación prevista antes de la ejecución"]}},
      {"title":{"en":"Service fee credit","fr":"Crédito de honorarios"},"body":{"en":"The service fee starts at $3,500 and is fully credited when you move forward with a signed project contract.","fr":"Los honorarios comienzan en 3 500 $ y se acreditan íntegramente si continúas con un contrato de proyecto firmado."}},
      {"title":{"en":"Additional work","fr":"Trabajos adicionales"},"body":{"en":"Any additional systems, upgrades, or scope changes are clearly defined and quoted separately.","fr":"Cualquier sistema adicional, upgrade o cambio de alcance se define claramente y se presupuesta por separado."}},
      {"title":{"en":"Use of designs","fr":"Uso de los planos"},"body":{"en":"Technical layouts and integration plans remain the property of Garage a la Carte and are provided for your personal project use only. If you work with another contractor, a separate usage or release agreement may be required.","fr":"Los planos técnicos y planos de integración son propiedad de Garage a la Carte y se entregan exclusivamente para tu proyecto personal. Si trabajas con otro contratista, puede requerirse un acuerdo de uso o cesión."}},
      {"title":{"en":"Permits & regulations","fr":"Permisos y normativa"},"body":{"en":"Some systems may require city or county permits depending on the scope. We guide you through requirements and coordinate with the appropriate professionals when needed.","fr":"Algunos sistemas pueden requerir permisos municipales o del condado según el alcance. Te guiamos sobre los requisitos y coordinamos con los profesionales adecuados cuando es necesario."}},
      {"title":{"en":"Delivery area","fr":"Zona de servicio"},"body":{"en":"On-site visits are available throughout the Orlando area. Visits beyond our standard zone are quoted based on location.","fr":"Las visitas in situ están disponibles en toda la zona de Orlando. Las visitas fuera de nuestra zona estándar se presupuestan según la ubicación."}}
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
    is_active = excluded.is_active,
    updated_at = now();

delete from public.service_team_members
where service_id in (select id from public.services where slug in ('blueprint', 'delivery', 'transform', 'smart'));

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

delete from public.process_steps
where step_number in (1, 2, 3, 4);

insert into public.process_steps (step_number, title, description, display_order, is_active)
values
  (1, jsonb_build_object('en', 'Tell us your vision', 'fr', 'Cuéntanos tu visión'), jsonb_build_object('en', 'Free 30-minute consultation.', 'fr', 'Consulta gratuita de 30 minutos.'), 10, true),
  (2, jsonb_build_object('en', 'Choose your level', 'fr', 'Elige tu fórmula'), jsonb_build_object('en', 'Four à la carte tiers.', 'fr', 'Cuatro fórmulas à la carte.'), 20, true),
  (3, jsonb_build_object('en', 'Plan before spending', 'fr', 'Planifica antes de gastar'), jsonb_build_object('en', 'See it in 3D first.', 'fr', 'Visualiza tu garaje en 3D.'), 30, true),
  (4, jsonb_build_object('en', 'Bring it to life', 'fr', 'Dale vida'), jsonb_build_object('en', 'DIY, supported, or turnkey.', 'fr', 'Tú mismo, acompañado o llave en mano.'), 40, true);

-- Keep only the portfolio projects currently used on the website.
delete from public.projects
where slug not in ('the-social-hub', 'the-daily-living-garage', 'smart-living-garage', 'modern-automotive-lounge');

insert into public.projects (
  slug, service_id, name, tagline, project_type, size_label, duration_label, year,
  description, includes, value_points, project_range, closing_line, status, is_featured, is_large, display_order
)
values
  ('the-social-hub', (select id from public.services where slug = 'transform'),
    jsonb_build_object('en', 'The Social Hub', 'fr', 'El Social Hub'),
    jsonb_build_object('en', 'A Garage Designed for Entertainment and Lifestyle', 'fr', 'Un garaje diseñado para el entretenimiento y el estilo de vida'),
    jsonb_build_object('en', 'Entertainment / Bar', 'fr', 'Entretenimiento / Bar'),
    jsonb_build_object('en', '2–3 car garage', 'fr', 'Garaje para 2–3 coches'),
    jsonb_build_object('en', '8 weeks', 'fr', '8 semanas'),
    '2025',
    jsonb_build_object('en', 'A complete transformation that turns your garage into a social, functional, and high-impact living space. Turn your garage into the centerpiece of your home — built for entertaining, relaxing, and everyday enjoyment. A modern, time- and cost-saving alternative to traditional home additions — a value-packed solution that outshines conventional builds.', 'fr', 'Una transformación completa que convierte tu garaje en un espacio social, funcional y de gran impacto. Convierte tu garaje en el corazón de tu casa — pensado para recibir, relajarse y disfrutar a diario. Una alternativa moderna que ahorra tiempo y dinero frente a una ampliación tradicional — una solución de gran valor que supera las ampliaciones convencionales.'),
    jsonb_build_object('en', jsonb_build_array('Wet bar', 'Custom cabinetry', 'Built-in appliances', 'Decorative wood wall panels', 'Pool table'), 'fr', jsonb_build_array('Bar con punto de agua', 'Mobiliario a medida', 'Electrodomésticos integrados', 'Paneles de madera decorativos', 'Mesa de billar')),
    jsonb_build_object('en', jsonb_build_array('Create a dedicated space for entertaining and relaxing', 'Add comfort and functionality without expanding your home', 'Increase your property value with a high-impact upgrade'), 'fr', jsonb_build_array('Crea un espacio dedicado para recibir y relajarse', 'Añade confort y funcionalidad sin ampliar tu casa', 'Aumenta el valor de tu propiedad con una mejora de gran impacto')),
    jsonb_build_object('en', 'Depending on how far you want to go. Each garage is fully customized, and final pricing is based on your space, layout, and level of transformation.', 'fr', 'Según hasta dónde quieras llegar. Cada garaje se personaliza por completo y el precio final depende de tu espacio, distribución y nivel de transformación.'),
    jsonb_build_object('en', 'Start with a design — and turn your garage into a space built around your lifestyle.', 'fr', 'Empieza por el diseño — y convierte tu garaje en un espacio diseñado en torno a tu estilo de vida.'),
    'live', true, true, 10),
  ('the-daily-living-garage', (select id from public.services where slug = 'transform'),
    jsonb_build_object('en', 'The Daily Living Garage', 'fr', 'El Garaje del Día a Día'),
    jsonb_build_object('en', 'A Multi-Functional Garage for Work, Fitness, and Relaxation', 'fr', 'Un garaje multifuncional para el trabajo, el fitness y la relajación'),
    jsonb_build_object('en', 'Multi-functional / Lifestyle', 'fr', 'Multifuncional / Lifestyle'),
    jsonb_build_object('en', '2 car garage', 'fr', 'Garaje para 2 coches'),
    jsonb_build_object('en', '6 weeks', 'fr', '6 semanas'),
    '2025',
    jsonb_build_object('en', 'A complete transformation that turns your garage into a flexible, everyday living space designed to support your routine. A space designed to support your daily routine — from movement to focus to relaxation.', 'fr', 'Una transformación completa que convierte tu garaje en un espacio de vida flexible y cotidiano, diseñado para acompañar tu rutina. Un espacio pensado para apoyar tu día a día — del movimiento a la concentración y la relajación.'),
    jsonb_build_object('en', jsonb_build_array('Home fitness area (cardio equipment, floor space, mirror)', 'Lounge zone (sofa, TV, relaxation area)', 'Compact workspace or home office', 'Coffee / utility corner with storage', 'Integrated lighting and layout for daily use'), 'fr', jsonb_build_array('Zona fitness (equipo de cardio, espacio libre, espejo)', 'Lounge (sofá, TV, zona de descanso)', 'Despacho compacto u home office', 'Rincón de café / utilitario con almacenamiento', 'Iluminación y distribución integradas para el uso diario')),
    jsonb_build_object('en', jsonb_build_array('Combine multiple functions in one optimized space', 'Improve daily comfort without expanding your home', 'Create a practical, organized environment for work and lifestyle', 'Increase your property value with a smart transformation'), 'fr', jsonb_build_array('Combina varias funciones en un espacio optimizado', 'Mejora el confort diario sin ampliar tu casa', 'Crea un entorno práctico y organizado para el trabajo y el lifestyle', 'Aumenta el valor de tu propiedad con una transformación inteligente')),
    jsonb_build_object('en', 'Depending on how far you want to go. Each garage is fully customized, and final pricing is based on your space, layout, and level of transformation.', 'fr', 'Según hasta dónde quieras llegar. Cada garaje se personaliza por completo y el precio final depende de tu espacio, distribución y nivel de transformación.'),
    jsonb_build_object('en', 'Start with a design — and turn your garage into a space that truly supports your everyday life.', 'fr', 'Empieza por el diseño — y convierte tu garaje en un espacio que realmente acompañe tu día a día.'),
    'live', true, false, 20),
  ('smart-living-garage', (select id from public.services where slug = 'transform'),
    jsonb_build_object('en', 'Smart Living Garage', 'fr', 'Smart Living Garage'),
    jsonb_build_object('en', 'A Garage Designed for Daily Living', 'fr', 'Un garaje diseñado para el día a día'),
    jsonb_build_object('en', 'Sports bar / Lifestyle', 'fr', 'Bar deportivo / Lifestyle'),
    jsonb_build_object('en', '2 car garage', 'fr', 'Garaje para 2 coches'),
    jsonb_build_object('en', '5 weeks', 'fr', '5 semanas'),
    '2025',
    jsonb_build_object('en', 'A complete transformation that turns your garage into a functional, comfortable extension of your home. A space that combines utility, comfort, and style — designed to simplify your daily life and elevate your home.', 'fr', 'Una transformación completa que convierte tu garaje en una extensión funcional y cómoda de tu hogar. Un espacio que combina utilidad, confort y estilo, diseñado para simplificar tu día a día y realzar tu hogar.'),
    jsonb_build_object('en', jsonb_build_array('Integrated laundry and utility area', 'Comfortable lounge space (TV, relaxation, daily use)', 'Smart storage solutions to keep everything organized', 'A clean, functional environment ready for everyday living'), 'fr', jsonb_build_array('Zona de lavandería y utilitarios integrada', 'Espacio lounge cómodo (TV, relajación, uso diario)', 'Soluciones de almacenamiento inteligentes para mantener todo organizado', 'Un entorno limpio y funcional listo para la vida cotidiana')),
    jsonb_build_object('en', jsonb_build_array('Free up space in the rest of your home', 'Simplify your daily routines and reduce clutter', 'Improve comfort while increasing your property value'), 'fr', jsonb_build_array('Libera espacio en el resto de tu casa', 'Simplifica tu rutina diaria y reduce el desorden', 'Mejora el confort y aumenta el valor de tu propiedad')),
    jsonb_build_object('en', 'Depending on how far you want to go. Each garage is fully customized, and final pricing is based on your space, layout, and level of transformation.', 'fr', 'Según hasta dónde quieras llegar. Cada garaje se personaliza por completo y el precio final depende de tu espacio, distribución y nivel de transformación.'),
    jsonb_build_object('en', 'Start with a design — and turn your garage into a space that truly works for your life.', 'fr', 'Empieza por el diseño — y convierte tu garaje en un espacio que realmente funcione para tu vida.'),
    'live', true, false, 30),
  ('modern-automotive-lounge', (select id from public.services where slug = 'transform'),
    jsonb_build_object('en', 'The Hybrid Lifestyle Garage', 'fr', 'El Garaje Híbrido Lifestyle'),
    jsonb_build_object('en', 'A Garage Designed for Cars, Work & Entertainment', 'fr', 'Un garaje diseñado para coches, trabajo y entretenimiento'),
    jsonb_build_object('en', 'Hybrid lifestyle / Multi-use', 'fr', 'Estilo de vida híbrido / Multi-uso'),
    jsonb_build_object('en', '3 car garage', 'fr', 'Garaje para 3 coches'),
    jsonb_build_object('en', '7 weeks', 'fr', '7 semanas'),
    '2025',
    jsonb_build_object('en', 'Transform your garage into the ultimate hybrid lifestyle space — designed for the way you live. This complete transformation blends premium vehicle display, a productive workspace, entertainment, and comfort into one beautifully designed, fully integrated environment. A garage designed to showcase your passion, support your productivity, and elevate your everyday living.', 'fr', 'Convierte tu garaje en el espacio de estilo de vida híbrido definitivo — diseñado para tu forma de vivir. Esta transformación completa combina una exposición premium del vehículo, un espacio de trabajo productivo, entretenimiento y confort en un único entorno bellamente diseñado y totalmente integrado. Un garaje pensado para mostrar tu pasión, apoyar tu productividad y elevar tu día a día.'),
    jsonb_build_object('en', jsonb_build_array('Premium vehicle display area', 'Lounge zone with sofa and oversized screen', 'Modern workspace or gaming setup', 'Beverage / coffee corner with storage', 'Integrated lighting and upscale finishes', 'Functional layout designed for everyday use'), 'fr', jsonb_build_array('Zona de exposición premium del vehículo', 'Espacio lounge con sofá y pantalla de gran tamaño', 'Espacio de trabajo moderno o setup de gaming', 'Rincón de café / bebidas con almacenamiento', 'Iluminación integrada y acabados de alta gama', 'Distribución funcional pensada para el uso diario')),
    jsonb_build_object('en', jsonb_build_array('Turn underused garage space into a lifestyle destination', 'Combine cars, work, entertainment, and relaxation in one environment', 'Create a clean, organized, high-end atmosphere', 'Increase comfort, functionality, and property appeal', 'Enjoy a garage designed to impress and be lived in'), 'fr', jsonb_build_array('Convierte un espacio de garaje infrautilizado en un destino de estilo de vida', 'Combina coches, trabajo, entretenimiento y relajación en un único entorno', 'Crea una atmósfera limpia, organizada y de alta gama', 'Aumenta el confort, la funcionalidad y el atractivo de tu propiedad', 'Disfruta de un garaje diseñado para impresionar y para vivirlo')),
    jsonb_build_object('en', 'Typical Project Range (3-Car Garage). Depending on how far you want to go. Each garage is fully customized. Final pricing is based on your space, layout, and level of transformation (finishes, technology integration, and level of customization).', 'fr', 'Rango típico del proyecto (garaje para 3 coches). Según hasta dónde quieras llegar. Cada garaje se personaliza por completo. El precio final depende de tu espacio, distribución y nivel de transformación (acabados, integración tecnológica y nivel de personalización).'),
    jsonb_build_object('en', 'Start with a design — and transform your garage into a space built for cars, work, and entertainment.', 'fr', 'Empieza por el diseño — y transforma tu garaje en un espacio pensado para coches, trabajo y entretenimiento.'),
    'live', true, false, 40)
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
    project_range = excluded.project_range,
    closing_line = excluded.closing_line,
    status = excluded.status,
    is_featured = excluded.is_featured,
    is_large = excluded.is_large,
    display_order = excluded.display_order,
    updated_at = now();

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
    ('smart-living-garage', 'Bar & media wall', '#3a2c22', 'hero', 10),
    ('smart-living-garage', 'Lounge & laundry corner', '#4a3d33', 'gallery', 20),
    ('smart-living-garage', 'Lounge & racing wall', '#5a4334', 'detail', 30),
    ('modern-automotive-lounge', 'Lounge & workspace · overview', '#2c2722', 'hero', 10),
    ('modern-automotive-lounge', 'Car bay & lounge', '#7a6450', 'gallery', 20),
    ('modern-automotive-lounge', 'Retro coffee bar', '#b5703a', 'detail', 30),
    ('modern-automotive-lounge', 'Media lounge & sofa', '#3d322a', 'gallery', 40)
) as x(project_slug, label, placeholder_color, kind, display_order)
join public.projects p on p.slug = x.project_slug
on conflict (project_id, display_order) do update
set label = excluded.label,
    placeholder_color = excluded.placeholder_color,
    kind = excluded.kind,
    updated_at = now();

insert into public.legal_documents (document_key, title, intro, is_active)
values (
  'project_conditions',
  jsonb_build_object('en', 'Website Project Details & Conditions', 'fr', 'Condiciones y compromisos del proyecto'),
  jsonb_build_object(
    'en', 'We set clear expectations from day one, plan carefully, and guide your project from idea to completion — depending on the level of service you choose. These guidelines ensure a smooth, transparent, and well-managed experience. By engaging with Garage à la Carte, you agree to these project guidelines unless otherwise defined in a written agreement.',
    'fr', 'Definimos expectativas claras desde el primer día, planificamos con cuidado y acompañamos tu proyecto desde la idea hasta la entrega — según el nivel de servicio que elijas. Estas pautas garantizan una experiencia fluida, transparente y bien gestionada. Al trabajar con Garage à la Carte, aceptas estas pautas salvo acuerdo escrito en sentido contrario.'
  ),
  true
)
on conflict (document_key) do update
set title = excluded.title,
    intro = excluded.intro,
    is_active = excluded.is_active,
    updated_at = now();

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
