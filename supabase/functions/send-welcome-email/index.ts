// Supabase Edge Function: send-welcome-email
// Envoie un email de bienvenue via Resend (https://resend.com) au visiteur
// qui a soumis son adresse dans la popup du site.
//
// Variables d'environnement requises (à définir via `supabase secrets set`) :
//   RESEND_API_KEY      Clé API Resend (re_...)
//   FROM_EMAIL          Adresse d'expéditeur vérifiée sur Resend
//                       ex: "Garage à la carte <hello@garagealacarte.com>"
//   REPLY_TO_EMAIL      (optionnel) adresse de réponse
//   SITE_URL            (optionnel) URL du site, ex: https://garagealacarte.com

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const FROM_EMAIL = Deno.env.get("FROM_EMAIL") ?? "Garage à la carte <onboarding@resend.dev>";
const REPLY_TO_EMAIL = Deno.env.get("REPLY_TO_EMAIL") ?? "";
const SITE_URL = Deno.env.get("SITE_URL") ?? "https://garagealacarte.com";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

type Mistake = { title: string; body: string };
type Copy = {
  preview: string;
  eyebrow: string;
  title: string;
  intro: string;
  mistakes: [Mistake, Mistake, Mistake, Mistake, Mistake];
  outroEyebrow: string;
  outroTitle: string;
  outroBody: string;
  cta: string;
  footer: string;
};

function buildHtml(locale: "fr" | "en"): string {
  const en: Copy = {
    preview: "5 garage remodeling mistakes to avoid before you start",
    eyebrow: "FREE GUIDE · 5 MISTAKES",
    title: "5 Garage Remodeling Mistakes to Avoid",
    intro: "Most garage projects go off-track for the same handful of reasons. Here are the five we see most often — and how to sidestep them.",
    mistakes: [
      { title: "Treating the Garage as Storage Only", body: "Your garage can become one of the most functional and valuable spaces in your home." },
      { title: "Ignoring Florida Climate Conditions", body: "Heat, humidity, and flooding risks require smarter material and layout choices." },
      { title: "Designing Without a Clear Plan", body: "Buying cabinets or flooring too early often leads to costly layout mistakes later." },
      { title: "Prioritizing Looks Over Function", body: "A garage should not only look good — it should improve everyday living." },
      { title: "Forgetting Future Needs", body: "The best garages evolve with your lifestyle, hobbies, and future needs." },
    ],
    outroEyebrow: "READY TO REIMAGINE YOUR GARAGE?",
    outroTitle: "Transform Your Garage with a Smarter Vision",
    outroBody: "A successful garage transformation starts with a clear vision.",
    cta: "Start Your Design Project",
    footer: "Garage à la carte — custom garage design.",
  };

  const fr: Copy = {
    preview: "5 erreurs à éviter avant de transformer votre garage",
    eyebrow: "GUIDE OFFERT · 5 ERREURS",
    title: "5 erreurs à éviter pour réussir son garage",
    intro: "La plupart des projets de garage déraillent pour les mêmes raisons. Voici les cinq que nous voyons le plus souvent — et comment les éviter.",
    mistakes: [
      { title: "Ne voir le garage que comme un débarras", body: "Votre garage peut devenir l'un des espaces les plus utiles et valorisés de votre maison." },
      { title: "Ignorer le climat de Floride", body: "Chaleur, humidité et risques d'inondation imposent des matériaux et une implantation pensés pour durer." },
      { title: "Avancer sans plan clair", body: "Acheter les meubles ou le revêtement trop tôt mène souvent à des erreurs de plan coûteuses." },
      { title: "Privilégier l'esthétique à la fonction", body: "Un garage ne doit pas seulement être beau — il doit améliorer le quotidien." },
      { title: "Oublier les besoins futurs", body: "Les meilleurs garages évoluent avec votre style de vie, vos hobbies et vos besoins à venir." },
    ],
    outroEyebrow: "PRÊT À REPENSER VOTRE GARAGE ?",
    outroTitle: "Transformez votre garage avec une vision plus juste",
    outroBody: "Une transformation de garage réussie commence par une vision claire.",
    cta: "Démarrer mon projet",
    footer: "Garage à la carte — aménagement de garage sur-mesure.",
  };

  const t = locale === "en" ? en : fr;
  const ink = "#1a1a1a";
  const cream = "#f4ede2";
  const creamDeep = "#ece2cf";
  const brass = "#c9a05c";
  const muted = "#6b6b6b";

  const mistakeRows = t.mistakes
    .map((m, i) => `
      <tr>
        <td style="padding:18px 0;border-top:1px solid ${creamDeep};">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td valign="top" width="56" style="font-family:Georgia,'Times New Roman',serif;font-size:32px;line-height:1;color:${brass};font-style:italic;padding-top:2px;">${i + 1}</td>
              <td valign="top">
                <div style="font-family:Georgia,'Times New Roman',serif;font-size:18px;line-height:1.3;color:${ink};margin-bottom:6px;">${m.title}</div>
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.55;color:${muted};">${m.body}</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>`)
    .join("");

  return `<!doctype html>
<html lang="${locale}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="color-scheme" content="light only" />
<title>${t.title}</title>
</head>
<body style="margin:0;padding:0;background:${cream};font-family:Arial,Helvetica,sans-serif;color:${ink};">
  <span style="display:none!important;visibility:hidden;opacity:0;height:0;width:0;overflow:hidden;mso-hide:all;">${t.preview}</span>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${cream};padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 24px rgba(26,26,26,0.06);">

          <!-- Header -->
          <tr>
            <td style="background:${ink};color:${cream};padding:48px 40px 44px;text-align:center;">
              <div style="font-family:'Courier New',Courier,monospace;font-size:11px;letter-spacing:0.25em;color:${brass};">${t.eyebrow}</div>
              <h1 style="margin:18px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:30px;line-height:1.2;font-weight:normal;letter-spacing:-0.01em;">${t.title}</h1>
            </td>
          </tr>

          <!-- Intro -->
          <tr>
            <td style="padding:36px 40px 8px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:${muted};">
              ${t.intro}
            </td>
          </tr>

          <!-- Mistakes list -->
          <tr>
            <td style="padding:8px 40px 16px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${mistakeRows}
                <tr><td style="border-top:1px solid ${creamDeep};font-size:0;line-height:0;">&nbsp;</td></tr>
              </table>
            </td>
          </tr>

          <!-- Outro + CTA -->
          <tr>
            <td style="padding:8px 40px 48px;text-align:center;">
              <div style="font-family:'Courier New',Courier,monospace;font-size:11px;letter-spacing:0.2em;color:${brass};margin-top:24px;">${t.outroEyebrow}</div>
              <h2 style="margin:14px 0 12px;font-family:Georgia,'Times New Roman',serif;font-size:24px;line-height:1.25;font-weight:normal;color:${ink};">${t.outroTitle}</h2>
              <p style="margin:0 0 28px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:${muted};">${t.outroBody}</p>
              <table role="presentation" cellpadding="0" cellspacing="0" align="center" style="margin:0 auto;">
                <tr>
                  <td style="border-radius:4px;background:${ink};">
                    <a href="${SITE_URL}" target="_blank" rel="noopener" style="display:inline-block;padding:16px 32px;font-family:Arial,Helvetica,sans-serif;font-size:14px;letter-spacing:0.08em;text-transform:uppercase;color:${cream};text-decoration:none;border-radius:4px;">${t.cta} &nbsp;↗</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:22px 40px;background:${cream};font-family:Arial,Helvetica,sans-serif;font-size:11px;color:${muted};text-align:center;">
              ${t.footer}<br/>
              <a href="${SITE_URL}" style="color:${muted};text-decoration:underline;">${SITE_URL.replace(/^https?:\/\//, "")}</a>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS_HEADERS });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }

  if (!RESEND_API_KEY) {
    return new Response(JSON.stringify({ error: "RESEND_API_KEY not configured" }), {
      status: 500,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }

  let payload: { email?: string; locale?: string };
  try {
    payload = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }

  const email = (payload.email ?? "").trim().toLowerCase();
  const locale: "fr" | "en" = payload.locale === "en" ? "en" : "fr";

  if (!isValidEmail(email)) {
    return new Response(JSON.stringify({ error: "Invalid email" }), {
      status: 400,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }

  const subject = locale === "en"
    ? "5 Garage Remodeling Mistakes to Avoid"
    : "5 erreurs à éviter pour réussir son garage";

  const body: Record<string, unknown> = {
    from: FROM_EMAIL,
    to: [email],
    subject,
    html: buildHtml(locale),
  };
  if (REPLY_TO_EMAIL) body.reply_to = REPLY_TO_EMAIL;

  const resendRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!resendRes.ok) {
    const text = await resendRes.text();
    return new Response(JSON.stringify({ error: "Resend failed", details: text }), {
      status: 502,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }

  const data = await resendRes.json();
  return new Response(JSON.stringify({ ok: true, id: data.id }), {
    status: 200,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
});
