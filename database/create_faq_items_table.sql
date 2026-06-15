-- =========================================================
-- FAQ items, bilingual CMS table (EN + ES, the "fr" key = Spanish here).
-- Powers the visible FAQ (home + contact) AND the FAQPage structured data.
--
-- NOTE: an OLD monolingual French `faq_items` table existed (columns
-- question/answer/category) and was not displayed anywhere. This migration
-- preserves it as `faq_items_legacy_fr`, then creates the new bilingual table
-- seeded with 5 SEO/client-relevant questions.
--
-- Run ONCE in the Supabase SQL editor, then redeploy. (Re-running errors on the
-- rename, which is an intentional safety net against wiping your edits.)
-- =========================================================

-- 1) Preserve the legacy French FAQ (safe: errors on re-run instead of destroying data)
ALTER TABLE IF EXISTS public.faq_items RENAME TO faq_items_legacy_fr;

-- 2) New bilingual table
CREATE TABLE public.faq_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_en TEXT NOT NULL,
  question_fr TEXT,
  answer_en TEXT NOT NULL,
  answer_fr TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_faq_items_active ON public.faq_items(is_active);
CREATE INDEX idx_faq_items_order ON public.faq_items(display_order);

-- 3) Row Level Security
ALTER TABLE public.faq_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "faq_items_public_read" ON public.faq_items
  FOR SELECT USING (is_active = TRUE);
CREATE POLICY "faq_items_auth_insert" ON public.faq_items
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "faq_items_auth_update" ON public.faq_items
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "faq_items_auth_delete" ON public.faq_items
  FOR DELETE TO authenticated USING (true);

-- 4) Seed the 5 SEO/client-relevant questions (EN + ES)
INSERT INTO public.faq_items (question_en, question_fr, answer_en, answer_fr, display_order) VALUES
(
  $$How much does a garage remodel cost in Orlando?$$,
  $$¿Cuánto cuesta reformar un garaje en Orlando?$$,
  $$Garage remodeling costs in Orlando typically range from $3,000 to $25,000+ depending on scope. Design-only projects start at $950, while full transformations with custom cabinetry, flooring, and smart systems cost more. We provide free estimates tailored to your specific project.$$,
  $$El coste de reformar un garaje en Orlando suele oscilar entre 3 000 $ y 25 000 $ o más, según el alcance. Los proyectos solo de diseño parten desde 950 $, mientras que las transformaciones completas con armarios a medida, suelo y sistemas inteligentes cuestan más. Ofrecemos presupuestos gratuitos adaptados a tu proyecto.$$,
  10
),
(
  $$What's the best garage storage system?$$,
  $$¿Cuál es el mejor sistema de almacenamiento para el garaje?$$,
  $$The best garage storage system depends on your needs. Options include wall-mounted shelving, ceiling-mounted systems, modular cabinets, and vertical storage. We recommend a combination approach tailored to your lifestyle, tools, and space. Our team designs custom solutions that maximize usable space.$$,
  $$El mejor sistema depende de tus necesidades. Las opciones incluyen estanterías de pared, sistemas suspendidos del techo, armarios modulares y almacenamiento vertical. Recomendamos un enfoque combinado, adaptado a tu estilo de vida, tus herramientas y tu espacio. Nuestro equipo diseña soluciones a medida que maximizan el espacio útil.$$,
  20
),
(
  $$Can a garage be converted into a home gym or office?$$,
  $$¿Se puede convertir un garaje en gimnasio u oficina?$$,
  $$Yes, garages make excellent home gyms, offices, or lounges. Proper climate control, lighting, flooring, and electrical planning are essential. Our design services ensure your converted garage is functional, comfortable, and aligned with your lifestyle needs.$$,
  $$Sí, los garajes son excelentes como gimnasios, oficinas o lounges. Son esenciales un buen control de la temperatura, iluminación, suelo y planificación eléctrica. Nuestro servicio de diseño garantiza que tu garaje convertido sea funcional, cómodo y acorde a tu estilo de vida.$$,
  30
),
(
  $$How long does a garage transformation take?$$,
  $$¿Cuánto tarda una transformación de garaje?$$,
  $$Timeline varies by project. Design-only projects take 1-2 weeks. Installation timelines depend on scope, permits, and contractor availability. A typical full remodel takes 4-12 weeks. We provide detailed project schedules during your consultation.$$,
  $$El plazo varía según el proyecto. Los proyectos solo de diseño tardan de 1 a 2 semanas. Los plazos de instalación dependen del alcance, los permisos y la disponibilidad. Una reforma completa típica lleva de 4 a 12 semanas. Te entregamos un calendario detallado durante la consulta.$$,
  40
),
(
  $$Do you offer free garage design consultations?$$,
  $$¿Ofrecen consultas de diseño gratuitas?$$,
  $$Yes, we offer free initial consultations to understand your vision and project goals. For detailed 3D designs and professional plans, we provide services starting at $950. Contact us for your free consultation.$$,
  $$Sí, ofrecemos consultas iniciales gratuitas para entender tu visión y tus objetivos. Para diseños 3D detallados y planos profesionales, ofrecemos servicios desde 950 $. Contáctanos para tu consulta gratuita.$$,
  50
);
