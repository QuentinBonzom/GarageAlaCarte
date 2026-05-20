-- One-shot cleanup: disable CMS sections that are no longer rendered on the public site.
-- Their data stays in the database (re-activable any time via is_active = true) but they
-- disappear from the admin UI navigation and stop loading on each visitor's first paint.
-- Run once in the Supabase SQL Editor. Re-run-safe.

update public.cms_sections
set is_active = false,
    updated_at = now()
where section_key in (
  'marquee_words',   -- old marquee strip removed from landing
  'visual_strip',    -- old 3D plan + Aymeric/Juliette section
  'why',             -- old 3-stat "Why us" block (4 / 20mi / 100%)
  'audience',        -- old 3-persona Homeowners/Agents/Developers
  'team_intro',      -- old team section (still has data in team_members table)
  'testimonials_v2'  -- testimonials dropped pending real customer quotes
);

-- Sanity check
-- select section_key, is_active from public.cms_sections order by section_key;

-- If you ever want to bring one back, run:
--   update public.cms_sections set is_active = true where section_key = 'testimonials_v2';
