-- ============================================================================
-- Renommage / mise à jour du projet « The Hybrid Lifestyle Garage »
-- (anciennement « The Modern Automotive Lounge », slug = modern-automotive-lounge)
-- Texte officiel de la cliente (PDF « The Hybrid Lifestyle Garage »).
-- ----------------------------------------------------------------------------
-- À exécuter dans Supabase → SQL Editor. Idempotent.
-- Le slug et les images restent inchangés (mêmes URL / mêmes photos).
-- ============================================================================

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

-- Vérification (optionnel)
-- select slug, name->>'en', tagline->>'en' from public.projects where slug = 'modern-automotive-lounge';
