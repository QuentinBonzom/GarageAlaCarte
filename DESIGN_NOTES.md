# Garage à la Carte — Landing V2 Design Notes

## Why this redesign
Client feedback: *"lighter, clearer, more premium for the American market"*.
The V1 reads as fun-Miami (vivid coral, busy decoration). The V2 aims for
**Restoration Hardware / Cuyana / Parachute Home** — premium-accessible,
warm neutrals, generous whitespace, photography as the product.

## Stack notes
- Vite + React 18 (JSX, no TS), CSS variables (no Tailwind), Supabase CMS.
- V2 lives at `/v2/` (route `v2`, `noindex`) so it doesn't disturb production.
- All V2 styles are scoped under a single `.lv2` root class.
- Existing V1 components are left untouched. **Never delete a V1 component
  without explicit validation.**

## Folder layout
```
src/
├─ components/landing-v2/      ← V2 components (HeroV2, TrustBar, etc.)
├─ pages/LandingV2.jsx         ← V2 page shell, hosts the V2 sections
└─ styles/landing-v2.css       ← V2 tokens + section styles, all under `.lv2`
```

## Palette

| Token | Hex | Role |
|---|---|---|
| `--lv2-ink` | `#0A2540` | Titles, dark sections |
| `--lv2-ink-soft` | `#1F3A5F` | Sub headlines, secondary text |
| `--lv2-muted` | `#6B6157` | Warm grey — body secondary, captions |
| `--lv2-bone` | `#F7F4EE` | Page background (warm off-white, replaces cold cream) |
| `--lv2-paper` | `#FFFDF8` | Elevated surfaces, cards |
| `--lv2-sand` | `#EBE3D5` | Alt sections, dividers, hover background |
| `--lv2-terra` | `#C97B5A` | **Primary accent** — CTA, links, hover |
| `--lv2-terra-deep` | `#A85F40` | CTA hover state |
| `--lv2-gold` | `#C9A961` | Small accents — process numbers, marks |
| `--lv2-line` | `rgba(10,37,64,0.08)` | Fine borders |
| `--lv2-line-strong` | `rgba(10,37,64,0.18)` | Card borders |

**Why terracotta over coral**: the V1 `#ff5e5b` reads vivid-Miami. `#C97B5A`
sits in the RH / Cuyana zone — still warm, but mature and luxe.

**Section rhythm**: alternate `--bone` / `--paper` / `--sand` (light) with
1–2 `--ink` sections (typically FinalCTA) to create the premium light/dark
cadence used by Apple, RH, Tesla.

## Typography
- **Titles**: `Fraunces` (Google Fonts, variable). Optical sizing on,
  `SOFT` axis bumped slightly for warmer roundings. Falls back to
  `DM Serif Display` if Fraunces fails to load.
- **Body**: `Inter` (Google Fonts). Tight line-height stack
  (`1.625` body, `1.05` titles).
- **Mono**: `JetBrains Mono` for eyebrows and captions. Falls back to `DM Mono`.
- Maximum **3 text sizes per section** to maintain hierarchy.

## Components & sections (status)

| Component | Status | Notes |
|---|---|---|
| `HeroV2` | ✅ Built | Split 55/45, headline option A, trust strip at bottom |
| `TrustBarV2` | ⏳ Pending | Compact horizontal trust signals |
| `ServicesV2` | ⏳ Pending | Refresh of the 4 service cards (statu quo strategy) |
| `BeforeAfterShowcaseV2` | ⏳ Pending | Reuse of V1 slider with refined chrome |
| `WhyV2` | ⏳ Pending | 3 stats refresh |
| `ProcessV2` | ⏳ Pending | Horizontal connected steps, serif numbers |
| `TestimonialsV2` | ⏳ Pending | New section — 3 testimonials |
| `FinalCTAV2` | ⏳ Pending | Dark section, single CTA |

Audience section (V1) has been **dropped** per client decision — the
3-persona dilution didn't serve the US homeowner journey.

## Copy guidelines
- US Florida tone: warm, confident, slightly aspirational. **No corporate
  jargon.**
- Prefer "We turn your garage into your favorite room" over "Premium garage
  transformation solutions".
- Headlines: 5–7 words.
- Subheads: 10–15 words max.
- Per section: **one dominant message**.

## CMS / admin impact (Supabase)
Each new V2 section that drives copy from the DB must be registered:

1. New `section_key` in `database/seed.sql` (`cms_sections` insert).
2. `KNOWN_SECTION_DEFAULTS` entry in `src/pages/AdminPage.jsx`.
3. French labels in `SECTION_LABELS` + `FIELD_LABELS` in `AdminPage.jsx`.
4. Image fields must end in `_image` so `isImageKey()` renders the upload
   widget automatically.

New section keys planned: `trust_bar`, `testimonials_v2`.

## Bilingual
- V2 ships **English-only first** (the brief targets the US market).
- French translation is a second pass once copy is validated.
- All `CONTENT.*` lookups keep the `{ en, fr }` shape — the FR string can be
  empty initially and falls back to `en`.

## Performance
- All images: `loading="lazy"` except the Hero image (eager).
- Explicit `width` / `height` attrs on every `<img>` (CLS guard).
- No JS framework added. No icon library inflation: each icon is inline SVG.

## Preview workflow
1. Build a section in `src/components/landing-v2/`.
2. Wire it into `src/pages/LandingV2.jsx`.
3. Open `/v2` locally + on Vercel preview.
4. Iterate, then move to the next section.
5. When the whole V2 is signed off, swap the home route in `App.jsx` and
   delete V1 only after approval.
