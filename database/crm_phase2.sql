-- ============================================================================
-- CRM — Phase 2 : pipeline de vente (deals).
-- Chaque deal est rattaché à un contact, a une étape, un montant et un
-- responsable. Sert de base à la vue Kanban de l'admin.
-- À lancer dans Supabase SQL Editor (après crm_phase1.sql). Idempotent.
-- ============================================================================

begin;

create table if not exists public.crm_deals (
  id uuid primary key default gen_random_uuid(),
  contact_id uuid references public.crm_contacts(id) on delete cascade,
  title text not null default 'Nouveau projet',
  stage text not null default 'lead'
    check (stage in ('lead','qualified','estimate','won','lost')),
  amount numeric(12,2) not null default 0,
  service_slug text,
  assigned_to uuid references public.team_members(id) on delete set null,
  expected_close_on date,
  notes text,
  closed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists crm_deals_contact_idx on public.crm_deals (contact_id);
create index if not exists crm_deals_stage_idx on public.crm_deals (stage);
create index if not exists crm_deals_assigned_idx on public.crm_deals (assigned_to);

drop trigger if exists set_updated_at on public.crm_deals;
create trigger set_updated_at before update on public.crm_deals
for each row execute function public.set_updated_at();

alter table public.crm_deals enable row level security;
drop policy if exists "Authenticated manage crm deals" on public.crm_deals;
create policy "Authenticated manage crm deals" on public.crm_deals
for all to authenticated using (true) with check (true);

commit;

-- Vérifications
-- select stage, count(*), sum(amount) from public.crm_deals group by stage;
