-- Garage à la Carte target schema
-- PostgreSQL / Supabase compatible.
--
-- This is the cleaned schema for the current React project. It replaces the
-- previous generic content model with tables that match the app surface:
-- bilingual CMS sections, services, projects, team, process, legal conditions,
-- contact submissions, and email leads.

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null,
  description text,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.cms_sections (
  id uuid primary key default gen_random_uuid(),
  page_key text not null,
  section_key text not null unique,
  content jsonb not null default '{}'::jsonb,
  display_order integer not null default 0,
  is_active boolean not null default true,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  constraint cms_sections_content_object check (jsonb_typeof(content) = 'object')
);

create table if not exists public.contact_channels (
  id uuid primary key default gen_random_uuid(),
  channel_key text not null unique,
  channel_type text not null check (channel_type in ('email', 'phone', 'address', 'social', 'service_area', 'other')),
  label jsonb,
  value text not null,
  href text,
  display_order integer not null default 0,
  is_active boolean not null default true,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  constraint contact_channels_label_langs check (label is null or (label ? 'en' and label ? 'fr'))
);

create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  role jsonb not null,
  bio jsonb not null,
  email text,
  phone text,
  avatar_url text,
  display_order integer not null default 0,
  is_active boolean not null default true,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  constraint team_members_role_langs check (role ? 'en' and role ? 'fr'),
  constraint team_members_bio_langs check (bio ? 'en' and bio ? 'fr')
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  service_number text not null,
  title jsonb not null,
  subtitle jsonb not null,
  description jsonb not null,
  price_label jsonb not null,
  badge_label jsonb,
  tag_label jsonb,
  includes jsonb not null default '{"en": [], "fr": []}'::jsonb,
  not_included jsonb,
  deposit_schedule jsonb,
  onsite_label jsonb,
  detail_sections jsonb not null default '[]'::jsonb,
  display_order integer not null default 0,
  is_active boolean not null default true,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  constraint services_title_langs check (title ? 'en' and title ? 'fr'),
  constraint services_subtitle_langs check (subtitle ? 'en' and subtitle ? 'fr'),
  constraint services_description_langs check (description ? 'en' and description ? 'fr'),
  constraint services_price_langs check (price_label ? 'en' and price_label ? 'fr'),
  constraint services_includes_langs check (includes ? 'en' and includes ? 'fr'),
  constraint services_badge_langs check (badge_label is null or (badge_label ? 'en' and badge_label ? 'fr')),
  constraint services_tag_langs check (tag_label is null or (tag_label ? 'en' and tag_label ? 'fr')),
  constraint services_not_included_langs check (not_included is null or (not_included ? 'en' and not_included ? 'fr')),
  constraint services_deposit_langs check (deposit_schedule is null or (deposit_schedule ? 'en' and deposit_schedule ? 'fr')),
  constraint services_onsite_langs check (onsite_label is null or (onsite_label ? 'en' and onsite_label ? 'fr'))
);

create table if not exists public.service_team_members (
  service_id uuid not null references public.services(id) on delete cascade,
  team_member_id uuid not null references public.team_members(id) on delete cascade,
  display_order integer not null default 0,
  primary key (service_id, team_member_id)
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  service_id uuid references public.services(id) on delete set null,
  name jsonb not null,
  tagline jsonb not null,
  project_type jsonb,
  size_label jsonb,
  duration_label jsonb,
  year text,
  description jsonb,
  includes jsonb not null default '{"en": [], "fr": []}'::jsonb,
  value_points jsonb not null default '{"en": [], "fr": []}'::jsonb,
  status text not null default 'live' check (status in ('live', 'draft', 'upcoming', 'archived')),
  is_featured boolean not null default false,
  is_large boolean not null default false,
  display_order integer not null default 0,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  constraint projects_name_langs check (name ? 'en' and name ? 'fr'),
  constraint projects_tagline_langs check (tagline ? 'en' and tagline ? 'fr'),
  constraint projects_type_langs check (project_type is null or (project_type ? 'en' and project_type ? 'fr')),
  constraint projects_size_langs check (size_label is null or (size_label ? 'en' and size_label ? 'fr')),
  constraint projects_duration_langs check (duration_label is null or (duration_label ? 'en' and duration_label ? 'fr')),
  constraint projects_description_langs check (description is null or (description ? 'en' and description ? 'fr')),
  constraint projects_includes_langs check (includes ? 'en' and includes ? 'fr'),
  constraint projects_value_points_langs check (value_points ? 'en' and value_points ? 'fr')
);

create table if not exists public.project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  image_url text,
  alt_text jsonb,
  label text,
  placeholder_color text,
  kind text not null default 'gallery' check (kind in ('hero', 'before', 'after', 'gallery', 'detail')),
  display_order integer not null default 0,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  constraint project_images_project_order_unique unique (project_id, display_order),
  constraint project_images_alt_langs check (alt_text is null or (alt_text ? 'en' and alt_text ? 'fr'))
);

create table if not exists public.process_steps (
  id uuid primary key default gen_random_uuid(),
  step_number integer not null,
  title jsonb not null,
  description jsonb not null,
  display_order integer not null default 0,
  is_active boolean not null default true,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  constraint process_steps_number_unique unique (step_number),
  constraint process_steps_title_langs check (title ? 'en' and title ? 'fr'),
  constraint process_steps_description_langs check (description ? 'en' and description ? 'fr')
);

create table if not exists public.legal_documents (
  id uuid primary key default gen_random_uuid(),
  document_key text not null unique,
  title jsonb not null,
  intro jsonb,
  is_active boolean not null default true,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  constraint legal_documents_title_langs check (title ? 'en' and title ? 'fr'),
  constraint legal_documents_intro_langs check (intro is null or (intro ? 'en' and intro ? 'fr'))
);

create table if not exists public.legal_sections (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.legal_documents(id) on delete cascade,
  section_number integer not null,
  title jsonb not null,
  body jsonb not null,
  display_order integer not null default 0,
  is_active boolean not null default true,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  constraint legal_sections_document_number_unique unique (document_id, section_number),
  constraint legal_sections_title_langs check (title ? 'en' and title ? 'fr'),
  constraint legal_sections_body_langs check (body ? 'en' and body ? 'fr')
);

create table if not exists public.email_leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source text not null default 'Exit popup',
  locale text not null default 'en' check (locale in ('en', 'fr')),
  status text not null default 'new' check (status in ('new', 'subscribed', 'exported', 'unsubscribed', 'archived')),
  captured_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  service_id uuid references public.services(id) on delete set null,
  service_slug text not null default 'not-sure',
  message text not null,
  locale text not null default 'en' check (locale in ('en', 'fr')),
  source text not null default 'contact_form',
  consent_accepted boolean not null default false,
  status text not null default 'new' check (status in ('new', 'in_review', 'replied', 'archived', 'spam')),
  internal_notes text,
  submitted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

-- Legacy schema compatibility -------------------------------------------------
-- CREATE TABLE IF NOT EXISTS does not add columns or change types on tables that
-- already exist. These blocks upgrade the previous schema safely enough for the
-- policies and seeds below.

do $$
begin
  if to_regclass('public.contact_submissions') is not null then
    alter table public.contact_submissions add column if not exists service_id uuid;
    alter table public.contact_submissions add column if not exists service_slug text;
    alter table public.contact_submissions add column if not exists locale text;
    alter table public.contact_submissions add column if not exists source text;
    alter table public.contact_submissions add column if not exists consent_accepted boolean;
    alter table public.contact_submissions add column if not exists internal_notes text;
    alter table public.contact_submissions add column if not exists created_at timestamptz;

    if exists (
      select 1
      from information_schema.columns
      where table_schema = 'public'
        and table_name = 'contact_submissions'
        and column_name = 'project_type'
    ) then
      update public.contact_submissions
      set service_slug = coalesce(service_slug, nullif(project_type::text, ''), 'not-sure');
    else
      update public.contact_submissions
      set service_slug = coalesce(service_slug, 'not-sure');
    end if;

    if exists (
      select 1
      from information_schema.columns
      where table_schema = 'public'
        and table_name = 'contact_submissions'
        and column_name = 'notes'
    ) then
      update public.contact_submissions
      set internal_notes = coalesce(internal_notes, notes);
    end if;

    update public.contact_submissions
    set locale = coalesce(locale, 'en'),
        source = coalesce(source, 'contact_form'),
        consent_accepted = coalesce(consent_accepted, false),
        created_at = coalesce(created_at, submitted_at, now()),
        updated_at = coalesce(updated_at, submitted_at, now());

    alter table public.contact_submissions alter column service_slug set default 'not-sure';
    alter table public.contact_submissions alter column service_slug set not null;
    alter table public.contact_submissions alter column locale set default 'en';
    alter table public.contact_submissions alter column locale set not null;
    alter table public.contact_submissions alter column source set default 'contact_form';
    alter table public.contact_submissions alter column source set not null;
    alter table public.contact_submissions alter column consent_accepted set default false;
    alter table public.contact_submissions alter column consent_accepted set not null;
    alter table public.contact_submissions alter column created_at set default now();
    alter table public.contact_submissions alter column created_at set not null;
  end if;
end;
$$;

do $$
begin
  if to_regclass('public.services') is not null then
    if exists (
      select 1 from information_schema.columns
      where table_schema = 'public'
        and table_name = 'services'
        and column_name = 'title'
        and data_type <> 'jsonb'
    ) then
      alter table public.services alter column title type jsonb
      using jsonb_build_object('en', title::text, 'fr', title::text);
    end if;

    if exists (
      select 1 from information_schema.columns
      where table_schema = 'public'
        and table_name = 'services'
        and column_name = 'description'
        and data_type <> 'jsonb'
    ) then
      alter table public.services alter column description type jsonb
      using jsonb_build_object('en', coalesce(description::text, ''), 'fr', coalesce(description::text, ''));
    end if;

    alter table public.services add column if not exists service_number text;
    alter table public.services add column if not exists subtitle jsonb;
    alter table public.services add column if not exists price_label jsonb;
    alter table public.services add column if not exists badge_label jsonb;
    alter table public.services add column if not exists tag_label jsonb;
    alter table public.services add column if not exists includes jsonb;
    alter table public.services add column if not exists not_included jsonb;
    alter table public.services add column if not exists deposit_schedule jsonb;
    alter table public.services add column if not exists onsite_label jsonb;
    alter table public.services add column if not exists detail_sections jsonb not null default '[]'::jsonb;

    update public.services
    set service_number = coalesce(service_number, lpad(coalesce(display_order, 0)::text, 2, '0')),
        subtitle = coalesce(subtitle, jsonb_build_object('en', '', 'fr', '')),
        price_label = coalesce(price_label, jsonb_build_object('en', '', 'fr', '')),
        includes = coalesce(includes, '{"en": [], "fr": []}'::jsonb),
        detail_sections = coalesce(detail_sections, '[]'::jsonb);

    if exists (
      select 1 from information_schema.columns
      where table_schema = 'public'
        and table_name = 'services'
        and column_name = 'price_range'
    ) then
      update public.services
      set price_label = jsonb_build_object('en', coalesce(price_range::text, ''), 'fr', coalesce(price_range::text, ''))
      where price_label = jsonb_build_object('en', '', 'fr', '');
    end if;

    alter table public.services alter column service_number set default '00';
    alter table public.services alter column service_number set not null;
    alter table public.services alter column subtitle set default '{"en": "", "fr": ""}'::jsonb;
    alter table public.services alter column subtitle set not null;
    alter table public.services alter column description set default '{"en": "", "fr": ""}'::jsonb;
    alter table public.services alter column description set not null;
    alter table public.services alter column price_label set default '{"en": "", "fr": ""}'::jsonb;
    alter table public.services alter column price_label set not null;
    alter table public.services alter column includes set default '{"en": [], "fr": []}'::jsonb;
    alter table public.services alter column includes set not null;
  end if;
end;
$$;

do $$
begin
  if to_regclass('public.contact_submissions') is not null
     and to_regclass('public.services') is not null then
    update public.contact_submissions as c
    set service_id = s.id
    from public.services as s
    where c.service_id is null
      and c.service_slug = s.slug;

    update public.contact_submissions as c
    set service_id = null
    where c.service_id is not null
      and not exists (
        select 1
        from public.services as s
        where s.id = c.service_id
      );

    if not exists (
      select 1
      from pg_constraint
      where conrelid = 'public.contact_submissions'::regclass
        and conname = 'contact_submissions_service_id_fkey'
    ) then
      alter table public.contact_submissions
      add constraint contact_submissions_service_id_fkey
      foreign key (service_id) references public.services(id) on delete set null;
    end if;
  end if;
end;
$$;

do $$
begin
  if to_regclass('public.process_steps') is not null then
    if exists (
      select 1 from information_schema.columns
      where table_schema = 'public'
        and table_name = 'process_steps'
        and column_name = 'title'
        and data_type <> 'jsonb'
    ) then
      alter table public.process_steps alter column title type jsonb
      using jsonb_build_object('en', title::text, 'fr', title::text);
    end if;

    if exists (
      select 1 from information_schema.columns
      where table_schema = 'public'
        and table_name = 'process_steps'
        and column_name = 'description'
        and data_type <> 'jsonb'
    ) then
      alter table public.process_steps alter column description type jsonb
      using jsonb_build_object('en', description::text, 'fr', description::text);
    end if;
  end if;
end;
$$;

create index if not exists cms_sections_page_key_idx on public.cms_sections(page_key, display_order);
create index if not exists contact_channels_active_idx on public.contact_channels(is_active, display_order);
create index if not exists team_members_active_idx on public.team_members(is_active, display_order);
create index if not exists services_active_idx on public.services(is_active, display_order);
create index if not exists projects_status_idx on public.projects(status, display_order);
create index if not exists project_images_project_idx on public.project_images(project_id, display_order);
create index if not exists process_steps_active_idx on public.process_steps(is_active, display_order);
create index if not exists legal_sections_document_idx on public.legal_sections(document_id, display_order);
create index if not exists email_leads_email_idx on public.email_leads(lower(email));
create index if not exists contact_submissions_status_idx on public.contact_submissions(status, submitted_at desc);
create index if not exists contact_submissions_email_idx on public.contact_submissions(lower(email));

drop trigger if exists set_updated_at on public.site_settings;
create trigger set_updated_at before update on public.site_settings
for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at on public.cms_sections;
create trigger set_updated_at before update on public.cms_sections
for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at on public.contact_channels;
create trigger set_updated_at before update on public.contact_channels
for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at on public.team_members;
create trigger set_updated_at before update on public.team_members
for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at on public.services;
create trigger set_updated_at before update on public.services
for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at on public.projects;
create trigger set_updated_at before update on public.projects
for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at on public.project_images;
create trigger set_updated_at before update on public.project_images
for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at on public.process_steps;
create trigger set_updated_at before update on public.process_steps
for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at on public.legal_documents;
create trigger set_updated_at before update on public.legal_documents
for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at on public.legal_sections;
create trigger set_updated_at before update on public.legal_sections
for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at on public.email_leads;
create trigger set_updated_at before update on public.email_leads
for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at on public.contact_submissions;
create trigger set_updated_at before update on public.contact_submissions
for each row execute function public.set_updated_at();

alter table public.site_settings enable row level security;
alter table public.cms_sections enable row level security;
alter table public.contact_channels enable row level security;
alter table public.team_members enable row level security;
alter table public.services enable row level security;
alter table public.service_team_members enable row level security;
alter table public.projects enable row level security;
alter table public.project_images enable row level security;
alter table public.process_steps enable row level security;
alter table public.legal_documents enable row level security;
alter table public.legal_sections enable row level security;
alter table public.email_leads enable row level security;
alter table public.contact_submissions enable row level security;

do $$
begin
  if to_regclass('storage.buckets') is not null then
    insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
    values (
      'project-images',
      'project-images',
      true,
      10485760,
      array['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[]
    )
    on conflict (id) do update
    set public = excluded.public,
        file_size_limit = excluded.file_size_limit,
        allowed_mime_types = excluded.allowed_mime_types;
  end if;

  if to_regclass('storage.objects') is not null then
    execute 'drop policy if exists "Public can read project image files" on storage.objects';
    execute 'create policy "Public can read project image files" on storage.objects for select using (bucket_id = ''project-images'')';

    execute 'drop policy if exists "Authenticated users can upload project image files" on storage.objects';
    execute 'create policy "Authenticated users can upload project image files" on storage.objects for insert to authenticated with check (bucket_id = ''project-images'')';

    execute 'drop policy if exists "Authenticated users can update project image files" on storage.objects';
    execute 'create policy "Authenticated users can update project image files" on storage.objects for update to authenticated using (bucket_id = ''project-images'') with check (bucket_id = ''project-images'')';

    execute 'drop policy if exists "Authenticated users can delete project image files" on storage.objects';
    execute 'create policy "Authenticated users can delete project image files" on storage.objects for delete to authenticated using (bucket_id = ''project-images'')';
  end if;
end;
$$;

drop policy if exists "Public can read site settings" on public.site_settings;
create policy "Public can read site settings"
on public.site_settings for select
using (true);

drop policy if exists "Public can read active cms sections" on public.cms_sections;
create policy "Public can read active cms sections"
on public.cms_sections for select
using (is_active);

drop policy if exists "Public can read active contact channels" on public.contact_channels;
create policy "Public can read active contact channels"
on public.contact_channels for select
using (is_active);

drop policy if exists "Public can read active team members" on public.team_members;
create policy "Public can read active team members"
on public.team_members for select
using (is_active);

drop policy if exists "Public can read active services" on public.services;
create policy "Public can read active services"
on public.services for select
using (is_active);

drop policy if exists "Public can read service team members" on public.service_team_members;
create policy "Public can read service team members"
on public.service_team_members for select
using (true);

drop policy if exists "Public can read visible projects" on public.projects;
create policy "Public can read visible projects"
on public.projects for select
using (status in ('live', 'upcoming'));

drop policy if exists "Public can read project images" on public.project_images;
create policy "Public can read project images"
on public.project_images for select
using (
  exists (
    select 1 from public.projects
    where projects.id = project_images.project_id
      and projects.status in ('live', 'upcoming')
  )
);

drop policy if exists "Public can read active process steps" on public.process_steps;
create policy "Public can read active process steps"
on public.process_steps for select
using (is_active);

drop policy if exists "Public can read active legal documents" on public.legal_documents;
create policy "Public can read active legal documents"
on public.legal_documents for select
using (is_active);

drop policy if exists "Public can read active legal sections" on public.legal_sections;
create policy "Public can read active legal sections"
on public.legal_sections for select
using (
  is_active
  and exists (
    select 1 from public.legal_documents
    where legal_documents.id = legal_sections.document_id
      and legal_documents.is_active
  )
);

drop policy if exists "Anyone can create email leads" on public.email_leads;
create policy "Anyone can create email leads"
on public.email_leads for insert
with check (true);

drop policy if exists "Anyone can create contact submissions" on public.contact_submissions;
create policy "Anyone can create contact submissions"
on public.contact_submissions for insert
with check (consent_accepted);

drop policy if exists "Authenticated users can manage site settings" on public.site_settings;
create policy "Authenticated users can manage site settings"
on public.site_settings for all
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated users can manage cms sections" on public.cms_sections;
create policy "Authenticated users can manage cms sections"
on public.cms_sections for all
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated users can manage contact channels" on public.contact_channels;
create policy "Authenticated users can manage contact channels"
on public.contact_channels for all
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated users can manage team members" on public.team_members;
create policy "Authenticated users can manage team members"
on public.team_members for all
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated users can manage services" on public.services;
create policy "Authenticated users can manage services"
on public.services for all
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated users can manage service teams" on public.service_team_members;
create policy "Authenticated users can manage service teams"
on public.service_team_members for all
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated users can manage projects" on public.projects;
create policy "Authenticated users can manage projects"
on public.projects for all
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated users can manage project images" on public.project_images;
create policy "Authenticated users can manage project images"
on public.project_images for all
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated users can manage process steps" on public.process_steps;
create policy "Authenticated users can manage process steps"
on public.process_steps for all
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated users can manage legal documents" on public.legal_documents;
create policy "Authenticated users can manage legal documents"
on public.legal_documents for all
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated users can manage legal sections" on public.legal_sections;
create policy "Authenticated users can manage legal sections"
on public.legal_sections for all
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated users can manage email leads" on public.email_leads;
create policy "Authenticated users can manage email leads"
on public.email_leads for all
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated users can manage contact submissions" on public.contact_submissions;
create policy "Authenticated users can manage contact submissions"
on public.contact_submissions for all
to authenticated
using (true)
with check (true);
