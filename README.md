# Garage à la Carte

Application React/Vite pour le site Garage à la Carte.

## Commandes

```bash
npm install
npm run dev
npm run build
```

## Supabase

Le projet lit les variables Vite suivantes dans `.env`:

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
VITE_SUPABASE_ADMIN_EMAIL=admin@garagealacarte.com
```

La connexion est centralisée dans `src/lib/supabase.js`. Au démarrage, l'app hydrate le contenu depuis Supabase via `src/data/contentRepository.js`, avec `src/data/content.js` comme fallback de contenu réel si la DB est indisponible. Les formulaires écrivent uniquement dans `email_leads` et `contact_submissions`.

L'admin affiche seulement un champ mot de passe. En arrière-plan, il utilise Supabase Auth avec l'email défini par `VITE_SUPABASE_ADMIN_EMAIL`, ce qui permet de garder les règles RLS actives. Crée donc un utilisateur Supabase Auth avec cet email, puis utilise son mot de passe dans l'onglet Admin.

Les images de projets se chargent depuis l'admin vers le bucket Supabase Storage `project-images`. Le bucket est créé par `database/schema.sql`; relance ce fichier dans Supabase après une mise à jour du schéma.

## Architecture

```text
src/
  app/          Shell applicatif, routing et état global léger
  components/   Composants réutilisables, UI commune et panneau de tweaks
  data/         Contenu bilingue du site
  pages/        Pages métier: home, projects, contact, admin
  styles/       Design system et styles globaux
database/
  schema.sql    Schéma PostgreSQL/Supabase cible
  seed.sql      Données initiales alignées avec le contenu actuel
```
