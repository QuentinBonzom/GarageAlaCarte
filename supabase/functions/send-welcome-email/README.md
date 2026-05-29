# send-welcome-email

Edge Function Supabase qui envoie un email de bienvenue via [Resend](https://resend.com)
au visiteur ayant soumis son adresse dans la popup d'accueil.

## 1. Pré-requis

- Compte Resend → créer une clé API (`re_...`)
- Domaine vérifié dans Resend (sinon utiliser `onboarding@resend.dev` pour tester)
- CLI Supabase installée : `brew install supabase/tap/supabase`

## 2. Variables d'environnement (côté serveur)

```bash
supabase secrets set \
  RESEND_API_KEY=re_xxx \
  FROM_EMAIL="Garage à la carte <hello@votre-domaine.com>" \
  REPLY_TO_EMAIL="contact@votre-domaine.com" \
  SITE_URL="https://garagealacarte.com"
```

## 3. Déploiement

```bash
# depuis la racine du projet
supabase link --project-ref <REF_PROJET_SUPABASE>
supabase functions deploy send-welcome-email --no-verify-jwt
```

> `--no-verify-jwt` autorise l'appel public depuis le navigateur via la clé anon.
> La fonction valide elle-même l'email côté serveur.

## 4. Test rapide

```bash
curl -X POST "https://<REF>.supabase.co/functions/v1/send-welcome-email" \
  -H "Authorization: Bearer <ANON_KEY>" \
  -H "Content-Type: application/json" \
  -d '{"email":"votre@adresse.com","locale":"fr"}'
```

## 5. Logs

```bash
supabase functions logs send-welcome-email --tail
```
