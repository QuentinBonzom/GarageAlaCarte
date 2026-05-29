-- ============================================================================
-- CRM — Phase 1 : fiche contact unifiée + timeline d'activité.
-- Crée crm_contacts (1 ligne par personne, clé = email) et crm_activities
-- (journal chronologique). Un trigger alimente automatiquement le CRM à chaque
-- nouveau formulaire de contact ou inscription email — le chemin public n'a pas
-- besoin d'être modifié. Inclut un backfill des données existantes.
-- À lancer dans Supabase SQL Editor. Idempotent (relançable sans casse).
-- ============================================================================

begin;

-- ----------------------------------------------------------------------------
-- Tables
-- ----------------------------------------------------------------------------
create table if not exists public.crm_contacts (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text,
  phone text,
  locale text not null default 'en',
  status text not null default 'new' check (status in ('new','active','customer','lost','archived')),
  assigned_to uuid references public.team_members(id) on delete set null,
  follow_up_on date,
  first_source text,
  last_activity_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists crm_contacts_follow_up_idx on public.crm_contacts (follow_up_on);
create index if not exists crm_contacts_assigned_idx on public.crm_contacts (assigned_to);
create index if not exists crm_contacts_status_idx on public.crm_contacts (status);

create table if not exists public.crm_activities (
  id uuid primary key default gen_random_uuid(),
  contact_id uuid not null references public.crm_contacts(id) on delete cascade,
  type text not null default 'note'
    check (type in ('note','email','call','meeting','status','system','form','lead')),
  body text,
  author text,
  created_at timestamptz not null default now()
);
create index if not exists crm_activities_contact_idx on public.crm_activities (contact_id, created_at desc);

-- updated_at trigger (réutilise la fonction existante)
drop trigger if exists set_updated_at on public.crm_contacts;
create trigger set_updated_at before update on public.crm_contacts
for each row execute function public.set_updated_at();

-- ----------------------------------------------------------------------------
-- RLS : seuls les utilisateurs authentifiés (admin) accèdent au CRM.
-- ----------------------------------------------------------------------------
alter table public.crm_contacts enable row level security;
alter table public.crm_activities enable row level security;

drop policy if exists "Authenticated manage crm contacts" on public.crm_contacts;
create policy "Authenticated manage crm contacts" on public.crm_contacts
for all to authenticated using (true) with check (true);

drop policy if exists "Authenticated manage crm activities" on public.crm_activities;
create policy "Authenticated manage crm activities" on public.crm_activities
for all to authenticated using (true) with check (true);

-- ----------------------------------------------------------------------------
-- Synchronisation automatique (triggers SECURITY DEFINER : fonctionnent même
-- quand l'insert vient du rôle public anonyme).
-- ----------------------------------------------------------------------------
create or replace function public.crm_sync_from_submission()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_contact_id uuid;
begin
  insert into public.crm_contacts (email, name, phone, locale, first_source, last_activity_at)
  values (lower(new.email), new.name, new.phone, coalesce(new.locale, 'en'),
          coalesce(new.source, 'contact_form'), coalesce(new.submitted_at, now()))
  on conflict (email) do update
    set name = coalesce(excluded.name, public.crm_contacts.name),
        phone = coalesce(excluded.phone, public.crm_contacts.phone),
        last_activity_at = greatest(public.crm_contacts.last_activity_at, excluded.last_activity_at),
        updated_at = now()
  returning id into v_contact_id;

  insert into public.crm_activities (contact_id, type, body, author, created_at)
  values (v_contact_id, 'form',
          'Demande via formulaire (' || coalesce(new.service_slug, '—') || ') : ' || coalesce(new.message, ''),
          'site', coalesce(new.submitted_at, now()));

  return new;
end;
$$;

drop trigger if exists crm_sync_submission on public.contact_submissions;
create trigger crm_sync_submission after insert on public.contact_submissions
for each row execute function public.crm_sync_from_submission();

create or replace function public.crm_sync_from_lead()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_contact_id uuid;
begin
  insert into public.crm_contacts (email, locale, first_source, last_activity_at)
  values (lower(new.email), coalesce(new.locale, 'en'),
          coalesce(new.source, 'Exit popup'), coalesce(new.captured_at, now()))
  on conflict (email) do update
    set last_activity_at = greatest(public.crm_contacts.last_activity_at, excluded.last_activity_at),
        updated_at = now()
  returning id into v_contact_id;

  insert into public.crm_activities (contact_id, type, body, author, created_at)
  values (v_contact_id, 'lead',
          'Inscription email (' || coalesce(new.source, '') || ')',
          'site', coalesce(new.captured_at, now()));

  return new;
end;
$$;

drop trigger if exists crm_sync_lead on public.email_leads;
create trigger crm_sync_lead after insert on public.email_leads
for each row execute function public.crm_sync_from_lead();

-- ----------------------------------------------------------------------------
-- Backfill des données existantes (dernier nom/téléphone connu gagne).
-- ----------------------------------------------------------------------------
insert into public.crm_contacts (email, name, phone, locale, first_source, last_activity_at, created_at)
select lower(email),
       (array_agg(name order by submitted_at desc))[1],
       (array_agg(phone order by submitted_at desc))[1],
       (array_agg(locale order by submitted_at desc))[1],
       'contact_form',
       max(submitted_at),
       min(submitted_at)
from public.contact_submissions
group by lower(email)
on conflict (email) do update
  set name = coalesce(public.crm_contacts.name, excluded.name),
      phone = coalesce(public.crm_contacts.phone, excluded.phone),
      last_activity_at = greatest(public.crm_contacts.last_activity_at, excluded.last_activity_at);

insert into public.crm_contacts (email, locale, first_source, last_activity_at, created_at)
select lower(email),
       (array_agg(locale order by captured_at desc))[1],
       'Exit popup',
       max(captured_at),
       min(captured_at)
from public.email_leads
group by lower(email)
on conflict (email) do update
  set last_activity_at = greatest(public.crm_contacts.last_activity_at, excluded.last_activity_at);

-- Activités issues des enregistrements existants (anti-doublon sur re-run).
insert into public.crm_activities (contact_id, type, body, author, created_at)
select c.id, 'form',
       'Demande via formulaire (' || coalesce(s.service_slug, '—') || ') : ' || coalesce(s.message, ''),
       'site', coalesce(s.submitted_at, now())
from public.contact_submissions s
join public.crm_contacts c on c.email = lower(s.email)
where not exists (
  select 1 from public.crm_activities a
  where a.contact_id = c.id and a.type = 'form' and a.created_at = coalesce(s.submitted_at, now())
);

insert into public.crm_activities (contact_id, type, body, author, created_at)
select c.id, 'lead',
       'Inscription email (' || coalesce(l.source, '') || ')',
       'site', coalesce(l.captured_at, now())
from public.email_leads l
join public.crm_contacts c on c.email = lower(l.email)
where not exists (
  select 1 from public.crm_activities a
  where a.contact_id = c.id and a.type = 'lead' and a.created_at = coalesce(l.captured_at, now())
);

commit;

-- Vérifications
-- select count(*) as contacts from public.crm_contacts;
-- select count(*) as activites from public.crm_activities;
-- select email, name, status, follow_up_on, last_activity_at from public.crm_contacts order by last_activity_at desc;
