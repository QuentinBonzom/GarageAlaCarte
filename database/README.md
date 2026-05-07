# Database

Schéma cible PostgreSQL/Supabase pour l'application React actuelle.

## Fichiers

```bash
database/schema.sql
database/seed.sql
```

Ordre d'exécution:

```sql
\i database/schema.sql
\i database/seed.sql
```

Sur Supabase, colle d'abord `schema.sql` dans le SQL Editor, puis `seed.sql`.

## Tables Conservées Ou Remplacées

`contact_info` devient `contact_channels`, avec labels bilingues, `href`, ordre d'affichage et activation.

`contact_submissions` est conservée dans l'esprit, mais adaptée au formulaire actuel: `service_slug`, `service_id`, `locale`, `source`, `consent_accepted`, statuts admin et notes internes.

`services` est conservée et enrichie pour coller aux cartes actuelles: titre, sous-titre, description, prix, badge, tag, inclusions, acompte, option sur site, tous en EN/FR.

`process_steps` est conservée, mais les champs texte deviennent bilingues.

`gallery_items` est remplacée par `projects` + `project_images`, parce que l'app actuelle affiche des réalisations complètes, pas seulement des paires before/after.

`site_content` est remplacée par `cms_sections`, un modèle JSONB plus compatible avec les sections React actuelles: hero, marquee, why, audience, contact, popup, etc.

`faq_items` et `testimonials` sont retirées: aucune page ou composant actuel ne les utilise.

## Tables Ajoutées

`team_members` pour l'équipe affichée sur l'accueil et la page contact.

`service_team_members` pour relier les services aux membres qui les pilotent.

`legal_documents` et `legal_sections` pour remplacer les conditions hardcodées de la page `conditions`.

`email_leads` remplace l'ancien stockage local `galc_emails`.

`site_settings` pour les réglages globaux: brand, langue par défaut, zone de service et thème.

## RLS

Le schéma active Row Level Security:

- lecture publique sur les contenus actifs;
- insertion publique uniquement pour `email_leads` et `contact_submissions`;
- gestion complète réservée au rôle Supabase `authenticated`.

Pour un PostgreSQL hors Supabase, retire les policies `to authenticated` si ce rôle n'existe pas.
