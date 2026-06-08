# Archive — migrations ponctuelles

Scripts SQL **déjà appliqués** à la base de production et **déjà intégrés** dans
`../seed.sql`. Ils ne font pas partie de l'installation d'une base neuve (voir
`../README.md`) et sont conservés uniquement pour l'historique.

- `migrate_fr_to_spanish.sql` — a converti le contenu FR → ES (one-shot).
- `update_aymeric_profile.sql` — a mis à jour le profil public d'Aymeric (one-shot).
- `cleanup_orphan_sections.sql` — a désactivé des sections CMS non affichées (maintenance).
