-- =========================================================
-- Blog Articles Table — Supabase CMS
-- Structure: en (English) + fr (Spanish)
-- =========================================================

-- Create blog_articles table
CREATE TABLE IF NOT EXISTS blog_articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  title_en TEXT NOT NULL,
  title_fr TEXT,
  intro_en TEXT NOT NULL,
  intro_fr TEXT,
  content_en JSONB NOT NULL DEFAULT '[]'::jsonb,
  content_fr JSONB,
  cta_en TEXT,
  cta_fr TEXT,
  cta_button_en TEXT,
  cta_button_fr TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for queries
CREATE INDEX IF NOT EXISTS idx_blog_articles_slug ON blog_articles(slug);
CREATE INDEX IF NOT EXISTS idx_blog_articles_active ON blog_articles(is_active);

-- =========================================================
-- Row Level Security (RLS)
-- =========================================================

ALTER TABLE blog_articles ENABLE ROW LEVEL SECURITY;

-- Allow public read (only active articles)
CREATE POLICY "blog_articles_public_read" ON blog_articles
  FOR SELECT
  USING (is_active = TRUE);

-- Allow authenticated update (admin)
CREATE POLICY "blog_articles_authenticated_update" ON blog_articles
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated insert (admin)
CREATE POLICY "blog_articles_authenticated_insert" ON blog_articles
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- =========================================================
-- Insert Initial Blog Articles
-- =========================================================

INSERT INTO blog_articles (slug, title_en, title_fr, intro_en, intro_fr, cta_en, cta_fr, cta_button_en, cta_button_fr, content_en, content_fr, is_active)
VALUES (
  'garage-remodeling-guide',
  'Complete Garage Remodeling Guide for Orlando Homeowners',
  'Guía Completa de Reforma de Garaje para Propietarios de Orlando',
  'Thinking about transforming your garage? This comprehensive guide walks you through everything you need to know about garage remodeling in Orlando, from costs and timelines to permits and contractor selection.',
  '¿Pensando en transformar tu garaje? Esta guía completa te lleva a través de todo lo que necesitas saber sobre la reforma de garajes en Orlando, desde costos y plazos hasta permisos y selección de contratistas.',
  'Ready to transform your garage? Get your free design consultation and custom estimate today.',
  '¿Listo para transformar tu garaje? Obtén tu consulta de diseño gratuita y presupuesto personalizado hoy.',
  'Get Free Estimate',
  'Obtener Presupuesto Gratuito',
  '[
    {
      "heading": "1. Understanding Garage Remodeling Costs in Orlando",
      "body": "Garage remodeling costs vary widely depending on scope and quality. In Orlando, you can expect:\n\n• Design-only projects: $950–$1,500\n• Design + product sourcing: $1,500–$5,000\n• Full transformation (flooring, cabinets, electrical): $8,000–$25,000+"
    },
    {
      "heading": "2. Timeline: How Long Does a Garage Remodel Take?",
      "body": "The timeline depends on project scope:\n\n• Design phase: 1–2 weeks\n• Permitting (if required): 2–4 weeks\n• Installation: 2–8 weeks\n• Total for full transformation: 4–12 weeks"
    }
  ]'::jsonb,
  '[
    {
      "heading": "1. Entender los Costos de Reforma de Garaje en Orlando",
      "body": "Los costos de reforma de garaje varían mucho según el alcance y calidad. En Orlando, puedes esperar:\n\n• Solo diseño: $950–$1,500\n• Diseño + selección de productos: $1,500–$5,000\n• Transformación completa: $8,000–$25,000+"
    },
    {
      "heading": "2. Cronograma: ¿Cuánto Tiempo Tarda una Reforma de Garaje?",
      "body": "El cronograma depende del alcance del proyecto:\n\n• Fase de diseño: 1–2 semanas\n• Permisos: 2–4 semanas\n• Instalación: 2–8 semanas\n• Total: 4–12 semanas"
    }
  ]'::jsonb,
  TRUE
),
(
  'garage-transformation-ideas',
  'Garage Transformation Ideas: Man Cave, Home Gym, Office, Lounge',
  'Ideas de Transformación de Garaje: Cueva de Hombre, Gimnasio, Oficina, Lounge',
  'Your garage does not have to be just parking and storage. Transform it into your favorite room. Explore four popular garage transformation ideas, from entertainment spaces to functional offices.',
  'Tu garaje no tiene que ser solo estacionamiento y almacenamiento. Conviértelo en tu sala favorita. Explora cuatro ideas populares de transformación de garaje.',
  'Curious about a specific transformation? Let us explore what is possible for your garage.',
  '¿Interesado en una transformación específica? Exploremos qué es posible para tu garaje.',
  'Schedule Free Consultation',
  'Programar Consulta Gratuita',
  '[
    {
      "heading": "The Man Cave — Entertainment Hub for Relaxation & Sports",
      "body": "Perfect for: Sports fans, gamers, social butterflies\nKey features: Seating area, bar or beverage station, TV/media setup, sound system\nEstimated cost: $5,000–$15,000\nTimeline: 4–8 weeks"
    },
    {
      "heading": "The Home Gym — Your Personal Fitness Studio",
      "body": "Perfect for: Fitness enthusiasts, busy professionals\nKey features: Epoxy flooring, mirrors, equipment racks, ventilation\nEstimated cost: $4,000–$12,000\nTimeline: 3–6 weeks"
    }
  ]'::jsonb,
  '[
    {
      "heading": "La Cueva de Hombre — Centro de Entretenimiento",
      "body": "Perfecto para: Aficionados al deporte, jugadores\nCaracterísticas principales: Área de asientos, bar, TV, sistema de sonido\nCosto estimado: $5,000–$15,000\nCronograma: 4–8 semanas"
    },
    {
      "heading": "El Gimnasio en Casa — Tu Estudio Fitness Personal",
      "body": "Perfecto para: Entusiastas del fitness, profesionales ocupados\nCaracterísticas principales: Pisos de epoxi, espejos, estantes de equipos\nCosto estimado: $4,000–$12,000\nCronograma: 3–6 semanas"
    }
  ]'::jsonb,
  TRUE
),
(
  'garage-storage-solutions',
  'Best Garage Storage Solutions & Organization Systems 2026',
  'Mejores Soluciones de Almacenamiento de Garaje y Sistemas de Organización 2026',
  'Stop fighting clutter. Discover the most effective garage storage solutions, from wall-mounted systems to ceiling racks and custom cabinets. Learn which system works best for your lifestyle.',
  'Deja de luchar contra el desorden. Descubre las soluciones de almacenamiento de garaje más efectivas, desde sistemas de pared hasta racks de techo y armarios personalizados.',
  'Overwhelmed by options? Let us design a custom storage solution tailored to your garage and lifestyle.',
  '¿Abrumado por las opciones? Diseñemos una solución de almacenamiento personalizada para tu garaje.',
  'Get Organization Consultation',
  'Obtener Consulta de Organización',
  '[
    {
      "heading": "Wall-Mounted Cabinetry & Shelving",
      "body": "Pros:\n• Maximizes vertical space\n• Keeps items organized\n• Professional appearance\nCost: $2,000–$5,000\nBest for: Tools, equipment, seasonal items"
    },
    {
      "heading": "Ceiling-Mounted Storage Racks",
      "body": "Pros:\n• Uses wasted space\n• Affordable\n• Easy installation\nCost: $300–$800 per rack\nBest for: Holiday decorations, luggage, seasonal items"
    }
  ]'::jsonb,
  '[
    {
      "heading": "Armarios y Estantes Montados en la Pared",
      "body": "Ventajas:\n• Maximiza el espacio vertical\n• Mantiene los artículos organizados\n• Aspecto profesional\nCosto: $2,000–$5,000\nMejor para: Herramientas, equipos, artículos estacionales"
    },
    {
      "heading": "Racks de Almacenamiento en el Techo",
      "body": "Ventajas:\n• Utiliza el espacio desperdiciado\n• Asequible\n• Fácil instalación\nCosto: $300–$800 por rack\nMejor para: Decoraciones, equipaje, artículos estacionales"
    }
  ]'::jsonb,
  TRUE
);

-- =========================================================
-- Grant permissions for Supabase public schema
-- =========================================================

GRANT SELECT ON blog_articles TO anon;
GRANT SELECT, UPDATE, INSERT ON blog_articles TO authenticated;
