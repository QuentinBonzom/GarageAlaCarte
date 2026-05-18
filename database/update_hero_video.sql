-- Configure the home hero video from the CMS database.
-- Run in Supabase SQL Editor.
--
-- To enable the current video:
--   video_url = '/hero-video.mp4'
--
-- To remove the video later and fall back to the hero image:
--   video_url = ''

update public.cms_sections
set content = content || jsonb_build_object(
  'video_url', '/hero-video.mp4'
),
updated_at = now()
where page_key = 'home'
  and section_key = 'hero_caption';

-- Sanity check
-- select section_key, content->>'video_url' as video_url
-- from public.cms_sections
-- where page_key = 'home' and section_key = 'hero_caption';
