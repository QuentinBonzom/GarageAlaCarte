# 🚀 Migration Blog Articles CMS

## Étapes pour activer le blog CMS

### Étape 1 : Exécuter le SQL dans Supabase

1. **Ouvre Supabase** → Va sur ton projet
   - https://app.supabase.com/project/`[YOUR_PROJECT_ID]`/sql

2. **Crée une nouvelle query**
   - Click "New query" (ou "Nouvelle requête")

3. **Copie le SQL** du fichier:

   ```
   /database/create_blog_articles_table.sql
   ```

4. **Colle** le contenu complet dans l'éditeur SQL

5. **Exécute** la query (Cmd+Enter ou Ctrl+Enter)

6. **Vérifie** que la table `blog_articles` apparaît dans:
   - Supabase → Database → Tables

### Étape 2 : Utiliser le CMS Admin

Une fois la table créée :

1. **Ouvre l'admin panel** en dev:

   ```bash
   npm run dev
   ```

   Puis va sur `http://localhost:5173/?admin=true`

2. **Login** avec tes credentials admin

3. **Accède au blog CMS** (nouvel onglet dans le sidebar)

4. **Édite les articles**:
   - Modifie les titres, introductions, CTA
   - Ajoute des traductions (FR/ES)
   - Active/désactive les articles

### Étape 3 : Vérifier les articles sur le site

- Les articles s'affichent automatiquement dans le footer (Resources)
- Language switching (EN/FR) fonctionne sur les articles
- SEO metadata incluse pour les routes blog

## 📊 Structure de la table

```sql
blog_articles
├── id (UUID)
├── slug (unique)
├── title_en, title_fr
├── intro_en, intro_fr
├── content_en, content_fr (JSONB sections)
├── cta_en, cta_fr (description)
├── cta_button_en, cta_button_fr
├── is_active (boolean)
├── created_at, updated_at
```

## 🔒 Sécurité RLS

- **Public**: Peut lire articles actifs (is_active=TRUE)
- **Admin**: Peut créer, modifier, supprimer articles

## 📝 Contenu Initial

La migration crée 3 articles par défaut:

1. `garage-remodeling-guide` - Rénovation complète
2. `garage-transformation-ideas` - Transformations (Gym, Mancave, etc.)
3. `garage-storage-solutions` - Solutions de rangement

Modifiez-les à votre guise via l'admin CMS!

## ⚙️ Troubleshooting

### La table n'existe pas?

- Assure-toi que le SQL a été exécuté (voir Étape 1)
- Vérifie que tu es loggé comme admin dans Supabase

### Les articles ne s'affichent pas?

- Vérifie `is_active=TRUE` dans la base de données
- Rafraîchis la page du site
- Vérifie la console pour les erreurs

### Erreur "RLS violation"?

- Utilise le compte admin pour les modifications
- Les articles doivent avoir `is_active=TRUE` pour les lecteurs publics

## 📚 Documentation

- Blog routes: `/src/lib/seo.js` (SEO_ROUTES)
- Blog components: `/src/pages/Blog*.jsx`
- CMS admin: `/src/pages/AdminPage.jsx` + `BlogArticlesPanel`
- SQL migration: `/database/create_blog_articles_table.sql`
