import fs from "node:fs";
import path from "node:path";
import {
  PRIMARY_SEO_KEYWORDS,
  SERVICE_AREA_PLACES,
  SERVICE_SEO,
  SEO_ROUTES,
  SITE_URL,
  buildBusinessJsonLd,
  buildPageJsonLd,
  getPageSeo,
} from "../src/lib/seo.js";

const root = process.cwd();
const distDir = path.join(root, "dist");
const baseIndexPath = path.join(distDir, "index.html");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function safeJson(data) {
  return JSON.stringify(data, null, 2).replaceAll("<", "\\u003c");
}

function replaceOrInsert(html, regex, replacement) {
  if (regex.test(html)) return html.replace(regex, replacement);
  return html.replace("</head>", `    ${replacement}\n  </head>`);
}

function setMeta(html, attr, key, content) {
  const selector = escapeRegExp(key);
  const regex = new RegExp(`<meta\\b(?=[^>]*\\b${attr}="${selector}")[^>]*>`, "i");
  return replaceOrInsert(html, regex, `<meta ${attr}="${key}" content="${escapeHtml(content)}" />`);
}

function setLink(html, rel, href) {
  const selector = escapeRegExp(rel);
  const regex = new RegExp(`<link\\s+rel="${selector}"\\s+href="[^"]*"\\s*/?>`, "i");
  return replaceOrInsert(html, regex, `<link rel="${rel}" href="${escapeHtml(href)}" />`);
}

function setJsonLd(html, id, data) {
  const regex = new RegExp(`<script\\s+type="application/ld\\+json"\\s+id="${escapeRegExp(id)}">[\\s\\S]*?<\\/script>`, "i");
  const replacement = `<script type="application/ld+json" id="${id}">${safeJson(data)}</script>`;
  return replaceOrInsert(html, regex, replacement);
}

function serviceLinksHtml() {
  return Object.values(SERVICE_SEO)
    .map((service) => `<li><a href="${escapeHtml(service.path)}">${escapeHtml(service.title.en)}</a></li>`)
    .join("");
}

function keywordListHtml(keywords = PRIMARY_SEO_KEYWORDS) {
  return keywords.map((keyword) => `<li>${escapeHtml(keyword)}</li>`).join("");
}

function buildStaticFallback(route, page) {
  const areaList = SERVICE_AREA_PLACES.map((place) => `<li>${escapeHtml(place)}</li>`).join("");

  if (route === "projects") {
    return `
      <article class="seo-fallback">
        <h1>${escapeHtml(page.title)}</h1>
        <p>${escapeHtml(page.description)}</p>
        <h2>Popular searches</h2>
        <ul>${keywordListHtml(page.keywords)}</ul>
        <p>View custom garage remodeling ideas for lounges, home gyms, offices, entertainment rooms, automotive spaces, and smart storage in the Orlando area.</p>
      </article>`;
  }

  if (route === "contact") {
    return `
      <article class="seo-fallback">
        <h1>${escapeHtml(page.title)}</h1>
        <p>${escapeHtml(page.description)}</p>
        <h2>Estimate requests</h2>
        <ul>${keywordListHtml(page.keywords)}</ul>
        <p>Email Garage a la Carte at <a href="mailto:hello@garagealacarte.com">hello@garagealacarte.com</a> to plan a custom garage design, remodel, or transformation in Orlando, Florida.</p>
      </article>`;
  }

  if (route === "conditions") {
    return `
      <article class="seo-fallback">
        <h1>${escapeHtml(page.title)}</h1>
        <p>${escapeHtml(page.description)}</p>
      </article>`;
  }

  if (route === "admin") {
    return `
      <article class="seo-fallback">
        <h1>${escapeHtml(page.title)}</h1>
        <p>${escapeHtml(page.description)}</p>
      </article>`;
  }

  return `
    <article class="seo-fallback">
      <h1>${escapeHtml(page.title)}</h1>
      <p>${escapeHtml(page.description)}</p>
      <h2>Orlando garage services</h2>
      <ul>${keywordListHtml()}</ul>
      <h2>Garage remodeling services in Orlando</h2>
      <ul>${serviceLinksHtml()}</ul>
      <h2>Service area</h2>
      <ul>${areaList}</ul>
      <p><a href="/contact/">Request a free garage transformation estimate</a></p>
    </article>`;
}

function setRootFallback(html, fallback) {
  const rootRegex = /<div id="root">[\s\S]*?<\/div>/i;
  return html.replace(rootRegex, `<div id="root">${fallback}</div>`);
}

// --- Préchargement de l'image du hero (récupérée depuis Supabase au build) ---

// Lit le .env local (utile en dev ; sur Vercel les variables sont dans process.env).
function readDotenv() {
  try {
    const txt = fs.readFileSync(path.join(root, ".env"), "utf8");
    const out = {};
    for (const line of txt.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, "").trim();
    }
    return out;
  } catch {
    return {};
  }
}

function resolvePublicUrl(value, supabaseUrl) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  if (/^https?:\/\//i.test(raw)) return raw;
  let p = raw.replace(/^\/+/, "");
  if (p.startsWith("project-images/")) p = p.slice("project-images/".length);
  return `${supabaseUrl.replace(/\/$/, "")}/storage/v1/object/public/project-images/${p}`;
}

// Récupère l'URL de la 1re image du hero depuis cms_sections. Retourne "" si
// indisponible (Supabase non configuré, erreur réseau…) — le build continue.
async function fetchHeroImageUrl() {
  const env = readDotenv();
  const url = (process.env.VITE_SUPABASE_URL || env.VITE_SUPABASE_URL || "").trim();
  const key = (process.env.VITE_SUPABASE_PUBLISHABLE_KEY || env.VITE_SUPABASE_PUBLISHABLE_KEY || "").trim();
  if (!url || !key) return "";
  try {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(url, key);
    const { data, error } = await supabase
      .from("cms_sections")
      .select("content")
      .eq("section_key", "hero_caption")
      .eq("is_active", true)
      .maybeSingle();
    if (error || !data?.content) return "";
    const c = data.content;
    const first =
      (Array.isArray(c.images) ? c.images : [])
        .map((img) => (typeof img === "string" ? img : img?.image || img?.url))
        .filter(Boolean)[0] || c.image || c.after_image;
    return resolvePublicUrl(first, url);
  } catch {
    return "";
  }
}

function setHeroPreload(html, heroUrl) {
  if (!heroUrl) return html;
  const tag = `<link rel="preload" as="image" href="${escapeHtml(heroUrl)}" fetchpriority="high" />`;
  if (html.includes(tag)) return html;
  return html.replace("</head>", `    ${tag}\n  </head>`);
}

function renderPage(html, route, heroPreloadUrl = "") {
  const page = getPageSeo(route, "en");
  let next = html;
  if (route === "home") next = setHeroPreload(next, heroPreloadUrl);

  next = next.replace(/<html\s+lang="[^"]*"/i, '<html lang="en"');
  next = next.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(page.title)}</title>`);
  next = setMeta(next, "name", "description", page.description);
  next = setMeta(next, "name", "robots", page.noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large");
  next = setLink(next, "canonical", page.canonical);

  next = setMeta(next, "property", "og:type", "website");
  next = setMeta(next, "property", "og:site_name", "Garage a la Carte");
  next = setMeta(next, "property", "og:title", page.title);
  next = setMeta(next, "property", "og:description", page.description);
  next = setMeta(next, "property", "og:url", page.canonical);
  next = setMeta(next, "property", "og:image", page.image);
  next = setMeta(next, "property", "og:image:alt", `${page.title} - Garage a la Carte Orlando`);
  next = setMeta(next, "property", "og:locale", page.locale);
  next = setMeta(next, "name", "twitter:title", page.title);
  next = setMeta(next, "name", "twitter:description", page.description);
  next = setMeta(next, "name", "twitter:image", page.image);
  next = setMeta(next, "name", "twitter:image:alt", `${page.title} - Garage a la Carte Orlando`);

  next = setJsonLd(next, "seo-business-jsonld", buildBusinessJsonLd());
  next = setJsonLd(next, "seo-page-jsonld", buildPageJsonLd(page));
  next = setRootFallback(next, buildStaticFallback(route, page));

  return next;
}

// Per-route sitemap hints. Routes not listed here are skipped, as are noindex
// routes (e.g. admin). changefreq/priority mirror the previous static sitemap.
const SITEMAP_META = {
  home: { changefreq: "weekly", priority: "1.0" },
  projects: { changefreq: "weekly", priority: "0.9" },
  contact: { changefreq: "monthly", priority: "0.8" },
  conditions: { changefreq: "yearly", priority: "0.3" },
};

function writeSitemap() {
  const lastmod = new Date().toISOString().slice(0, 10);
  const entries = Object.keys(SEO_ROUTES)
    .filter((route) => SITEMAP_META[route] && !SEO_ROUTES[route].noindex)
    .map((route) => {
      const { changefreq, priority } = SITEMAP_META[route];
      const loc = `${SITE_URL}${SEO_ROUTES[route].path}`;
      return [
        "  <url>",
        `    <loc>${loc}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${changefreq}</changefreq>`,
        `    <priority>${priority}</priority>`,
        "  </url>",
      ].join("\n");
    });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>
`;

  fs.writeFileSync(path.join(distDir, "sitemap.xml"), xml);
  return lastmod;
}

if (!fs.existsSync(baseIndexPath)) {
  throw new Error("dist/index.html not found. Run vite build first.");
}

const baseHtml = fs.readFileSync(baseIndexPath, "utf8");

const heroPreloadUrl = await fetchHeroImageUrl();

for (const route of Object.keys(SEO_ROUTES)) {
  const page = getPageSeo(route, "en");
  const html = renderPage(baseHtml, route, heroPreloadUrl);
  const outputPath =
    route === "home"
      ? baseIndexPath
      : path.join(distDir, page.path.replace(/^\/+/, ""), "index.html");

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, html);
}

const sitemapDate = writeSitemap();

console.log("SEO prerendered routes:", Object.keys(SEO_ROUTES).map((route) => SEO_ROUTES[route].path).join(", "));
console.log("Sitemap generated with lastmod:", sitemapDate);
console.log("Hero preload:", heroPreloadUrl || "(none — Supabase indisponible au build)");
