-- =========================================================
-- Remove em-dashes ("—") from all live CMS content (the text actually shown
-- on the site lives in these tables, not in the code). Replaces them with
-- clean, professional punctuation:
--   "Label — Sublabel"  -> "Label: Sublabel"  (known headline cases)
--   "... go —"          -> "... go…"          (trailing dash -> ellipsis)
--   "word — word"       -> "word, word"        (mid-sentence -> comma)
--   any leftover "—"    -> "-"
-- Run ONCE in the Supabase SQL editor, then redeploy (so the prerender re-bakes).
-- =========================================================

-- Session-local helper (auto-dropped at end of session).
CREATE OR REPLACE FUNCTION pg_temp.nodash(t text) RETURNS text AS $fn$
  SELECT CASE WHEN $1 IS NULL THEN NULL ELSE
    regexp_replace(
      replace(
        replace(
          replace(
            replace(
              replace($1,
                'The Social Hub — Smart Living Garage', 'The Social Hub: Smart Living Garage'),
              'From Concept to Completion — We Handle Everything', 'From Concept to Completion: We Handle Everything'),
            'Del concepto a la entrega — nos encargamos de todo', 'Del concepto a la entrega: nos encargamos de todo'),
          ' —"', '…"'),
        ' — ', ', '),
      '—', '-', 'g')
  END;
$fn$ LANGUAGE sql IMMUTABLE;

-- Services (all bilingual jsonb)
UPDATE public.services SET
  title           = pg_temp.nodash(title::text)::jsonb,
  subtitle        = pg_temp.nodash(subtitle::text)::jsonb,
  description     = pg_temp.nodash(description::text)::jsonb,
  price_label     = pg_temp.nodash(price_label::text)::jsonb,
  badge_label     = pg_temp.nodash(badge_label::text)::jsonb,
  tag_label       = pg_temp.nodash(tag_label::text)::jsonb,
  includes        = pg_temp.nodash(includes::text)::jsonb,
  not_included    = pg_temp.nodash(not_included::text)::jsonb,
  deposit_schedule= pg_temp.nodash(deposit_schedule::text)::jsonb,
  onsite_label    = pg_temp.nodash(onsite_label::text)::jsonb,
  detail_sections = pg_temp.nodash(detail_sections::text)::jsonb;

-- Projects
UPDATE public.projects SET
  name           = pg_temp.nodash(name::text)::jsonb,
  tagline        = pg_temp.nodash(tagline::text)::jsonb,
  project_type   = pg_temp.nodash(project_type::text)::jsonb,
  size_label     = pg_temp.nodash(size_label::text)::jsonb,
  duration_label = pg_temp.nodash(duration_label::text)::jsonb,
  description    = pg_temp.nodash(description::text)::jsonb,
  includes       = pg_temp.nodash(includes::text)::jsonb,
  value_points   = pg_temp.nodash(value_points::text)::jsonb,
  project_range  = pg_temp.nodash(project_range::text)::jsonb,
  closing_line   = pg_temp.nodash(closing_line::text)::jsonb;

-- Team members
UPDATE public.team_members SET
  role     = pg_temp.nodash(role::text)::jsonb,
  bio      = pg_temp.nodash(bio::text)::jsonb,
  long_bio = pg_temp.nodash(long_bio::text)::jsonb;

-- Blog articles (text + jsonb)
UPDATE public.blog_articles SET
  title_en       = pg_temp.nodash(title_en),
  title_fr       = pg_temp.nodash(title_fr),
  intro_en       = pg_temp.nodash(intro_en),
  intro_fr       = pg_temp.nodash(intro_fr),
  cta_en         = pg_temp.nodash(cta_en),
  cta_fr         = pg_temp.nodash(cta_fr),
  cta_button_en  = pg_temp.nodash(cta_button_en),
  cta_button_fr  = pg_temp.nodash(cta_button_fr),
  content_en     = pg_temp.nodash(content_en::text)::jsonb,
  content_fr     = pg_temp.nodash(content_fr::text)::jsonb;

-- FAQ items (text)
UPDATE public.faq_items SET
  question_en = pg_temp.nodash(question_en),
  question_fr = pg_temp.nodash(question_fr),
  answer_en   = pg_temp.nodash(answer_en),
  answer_fr   = pg_temp.nodash(answer_fr);

-- CMS sections (hero, services intro, use cases, contact form, popup, etc.)
UPDATE public.cms_sections SET
  content = pg_temp.nodash(content::text)::jsonb;

-- Legal / conditions
UPDATE public.legal_sections SET
  title = pg_temp.nodash(title::text)::jsonb,
  body  = pg_temp.nodash(body::text)::jsonb;
