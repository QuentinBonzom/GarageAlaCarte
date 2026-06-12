# Archive — migrations ponctuelles

Scripts SQL **déjà appliqués** à la base de production et **déjà intégrés** dans
`../seed.sql`. Ils ne font pas partie de l'installation d'une base neuve (voir
`../README.md`) et sont conservés uniquement pour l'historique.

- `migrate_fr_to_spanish.sql` — a converti le contenu FR → ES (one-shot).
- `update_aymeric_profile.sql` — a mis à jour le profil public d'Aymeric (one-shot).
- `cleanup_orphan_sections.sql` — a désactivé des sections CMS non affichées (maintenance).

## Mise à jour du contenu cliente (juin 2026)

Scripts granulaires **regroupés dans `../update_all.sql`** (qui fait foi). Conservés
ici pour référence ; inutile de les exécuter séparément.

- `update_contact_info.sql` — coordonnées (email + téléphones).
- `update_service_blueprint.sql` — service 1 « Garage Design & Build Plan ».
- `update_service_delivery.sql` — service 2 « Design & Setup ».
- `update_service_transform.sql` — service 3 « Full Transformation ».
- `update_delivery_area.sql` — harmonisation zone de service « Orlando area ».
- `update_conditions.sql` — page Conditions (24 sections).
- `update_project_hybrid_lifestyle.sql` — projet « The Hybrid Lifestyle Garage ».
