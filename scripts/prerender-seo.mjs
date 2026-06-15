import fs from "node:fs";
import path from "node:path";
import {
  CONTACT_EMAIL,
  FAQ_ITEMS,
  PRIMARY_SEO_KEYWORDS,
  SERVICE_AREA_PLACES,
  SERVICE_SEO,
  SEO_ROUTES,
  SITE_URL,
  buildBusinessJsonLd,
  buildFaqJsonLd,
  buildPageJsonLd,
  getVisibleFaqItems,
  getPageSeo,
  routeHasFaq,
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
  const regex = new RegExp(
    `<meta\\b(?=[^>]*\\b${attr}="${selector}")[^>]*>`,
    "i",
  );
  return replaceOrInsert(
    html,
    regex,
    `<meta ${attr}="${key}" content="${escapeHtml(content)}" />`,
  );
}

function setLink(html, rel, href) {
  const selector = escapeRegExp(rel);
  const regex = new RegExp(
    `<link\\s+rel="${selector}"\\s+href="[^"]*"\\s*/?>`,
    "i",
  );
  return replaceOrInsert(
    html,
    regex,
    `<link rel="${rel}" href="${escapeHtml(href)}" />`,
  );
}

function setJsonLd(html, id, data) {
  const regex = new RegExp(
    `<script\\s+type="application/ld\\+json"\\s+id="${escapeRegExp(id)}">[\\s\\S]*?<\\/script>`,
    "i",
  );
  const replacement = `<script type="application/ld+json" id="${id}">${safeJson(data)}</script>`;
  return replaceOrInsert(html, regex, replacement);
}

function serviceLinksHtml() {
  return Object.values(SERVICE_SEO)
    .map(
      (service) =>
        `<li><a href="${escapeHtml(service.path)}">${escapeHtml(service.title.en)}</a></li>`,
    )
    .join("");
}

function keywordListHtml(keywords = PRIMARY_SEO_KEYWORDS) {
  return keywords.map((keyword) => `<li>${escapeHtml(keyword)}</li>`).join("");
}

function articleBodyHtml(body) {
  return String(body || "")
    .split(/\n\n+/)
    .map((para) => para.trim())
    .filter(Boolean)
    .map((para) => `<p>${escapeHtml(para)}</p>`)
    .join("");
}

function blogIndexFallback(page, articles) {
  const items = Object.values(articles || {});
  const cards = items.length
    ? items
        .map(
          (a) =>
            `<li><a href="/blog/${escapeHtml(a.slug)}/"><h2>${escapeHtml(a.title_en)}</h2></a><p>${escapeHtml(a.intro_en || "")}</p></li>`,
        )
        .join("")
    : Object.values(SEO_ROUTES)
        .filter((cfg) => cfg.isArticle && cfg.slug)
        .map(
          (cfg) =>
            `<li><a href="${escapeHtml(cfg.path)}"><h2>${escapeHtml(cfg.title.en)}</h2></a><p>${escapeHtml(cfg.description.en)}</p></li>`,
        )
        .join("");
  return `
    <section class="seo-fallback">
      <h1>${escapeHtml(page.title)}</h1>
      <p>${escapeHtml(page.description)}</p>
      <ul>${cards}</ul>
    </section>`;
}

function blogArticleFallback(page, article) {
  if (!article) {
    return `
      <article class="seo-fallback">
        <h1>${escapeHtml(page.title)}</h1>
        <p>${escapeHtml(page.description)}</p>
        <h2>Garage remodeling in Orlando</h2>
        <p>Plan your garage transformation around the way you want to use the space: home gym, office, lounge, workshop, storage, or a full custom remodel.</p>
        <h2>Popular searches</h2>
        <ul>${keywordListHtml(page.keywords)}</ul>
        <p><a href="/contact/">Request a free garage remodeling estimate</a></p>
      </article>`;
  }
  const sections = Array.isArray(article.content_en) ? article.content_en : [];
  const sectionsHtml = sections
    .map(
      (s) =>
        `<section><h2>${escapeHtml(s.heading || "")}</h2>${articleBodyHtml(s.body)}</section>`,
    )
    .join("");
  const cta = article.cta_en
    ? `<aside><p>${escapeHtml(article.cta_en)}</p><a href="/contact/">${escapeHtml(article.cta_button_en || "Contact us")}</a></aside>`
    : "";
  return `
    <article class="seo-fallback">
      <h1>${escapeHtml(article.title_en || page.title)}</h1>
      <p>${escapeHtml(article.intro_en || page.description)}</p>
      ${sectionsHtml}
      ${cta}
    </article>`;
}

function faqFallbackHtml(faqItems = FAQ_ITEMS) {
  const list = getVisibleFaqItems(faqItems);
  const items = list
    .map(
      (item) =>
        `<div><h3>${escapeHtml(item.q.en)}</h3><p>${escapeHtml(item.a.en)}</p></div>`,
    )
    .join("");
  return `
      <section class="seo-fallback">
        <h2>Frequently asked questions</h2>
        ${items}
      </section>`;
}

function localSeoFallbackHtml() {
  return `
    <section class="seo-fallback" aria-labelledby="local-seo-title">
      <h2 id="local-seo-title">Garage remodeling in Orlando, built from a clear design plan.</h2>
      <p>Garage a la Carte designs and coordinates custom garage transformations across Orlando and Central Florida: home gyms, offices, lounges, workshops, storage systems, cabinets, lighting, flooring, and smart integrations.</p>
      <p>Every project starts with a layout, 3D views, product direction, and a realistic scope before materials are purchased or installation begins.</p>
      <ul>
        <li>Custom garage design and 3D planning</li>
        <li>Garage organization, cabinets, and storage systems</li>
        <li>Full garage renovation for a gym, office, lounge, or workshop</li>
        <li>Lighting, HVAC, electrical, media, and smart integration planning</li>
      </ul>
      <p>Service area: Orlando, Winter Park, Lake Nona, Windermere, Winter Garden, Kissimmee, Maitland, Doctor Phillips, and Central Florida.</p>
      <p><a href="/contact/">Request a free estimate</a></p>
    </section>`;
}

function buildStaticFallback(route, page, articles = {}, faqItems = FAQ_ITEMS) {
  const areaList = SERVICE_AREA_PLACES.map(
    (place) => `<li>${escapeHtml(place)}</li>`,
  ).join("");

  if (route === "blog") {
    return blogIndexFallback(page, articles);
  }

  if (page.isArticle) {
    return blogArticleFallback(page, articles[page.slug]);
  }

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
        <p>Email Garage a la Carte at <a href="mailto:${escapeHtml(CONTACT_EMAIL)}">${escapeHtml(CONTACT_EMAIL)}</a> to plan a custom garage design, remodel, or transformation in Orlando, Florida.</p>
      </article>${faqFallbackHtml(faqItems)}`;
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
    ${localSeoFallbackHtml()}
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
    </article>${faqFallbackHtml(faqItems)}`;
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
  const url = (
    process.env.VITE_SUPABASE_URL ||
    env.VITE_SUPABASE_URL ||
    ""
  ).trim();
  const key = (
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    ""
  ).trim();
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
        .filter(Boolean)[0] ||
      c.image ||
      c.after_image;
    return resolvePublicUrl(first, url);
  } catch {
    return "";
  }
}

// Build a Supabase client from env/.env, or null if unavailable.
async function getBuildSupabase() {
  const env = readDotenv();
  const url = (process.env.VITE_SUPABASE_URL || env.VITE_SUPABASE_URL || "").trim();
  const key = (
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    ""
  ).trim();
  if (!url || !key) return null;
  try {
    const { createClient } = await import("@supabase/supabase-js");
    return createClient(url, key);
  } catch {
    return null;
  }
}

// Fetch active blog articles at build time so their text can be baked into the
// prerendered HTML (real content for crawlers, not just an empty shell).
// Returns a map keyed by slug; empty object if Supabase is unavailable.
async function fetchBlogArticles() {
  const supabase = await getBuildSupabase();
  if (!supabase) return {};
  try {
    const { data, error } = await supabase
      .from("blog_articles")
      .select(
        "slug, title_en, intro_en, content_en, cta_en, cta_button_en, updated_at, is_active",
      )
      .eq("is_active", true);
    if (error || !Array.isArray(data)) return {};
    return Object.fromEntries(data.map((a) => [a.slug, a]));
  } catch {
    return {};
  }
}

// Fetch CMS-managed FAQ at build time (falls back to the static FAQ_ITEMS in
// seo.js if the table is empty/unavailable). Returns the {q,a} shape.
async function fetchFaqItems() {
  const supabase = await getBuildSupabase();
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from("faq_items")
      .select("*")
      .eq("is_active", true)
      .order("display_order");
    if (error || !Array.isArray(data) || !data.length) return [];
    return data
      .filter((item) => item.question_en && item.answer_en)
      .map((item) => ({
        q: { en: item.question_en, fr: item.question_fr || item.question_en },
        a: { en: item.answer_en, fr: item.answer_fr || item.answer_en },
      }));
  } catch {
    return [];
  }
}

function isoDate(value) {
  const d = value ? new Date(value) : null;
  return d && !Number.isNaN(d.getTime())
    ? d.toISOString().slice(0, 10)
    : todayIsoDate();
}

function todayIsoDate() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 10);
}

function setHeroPreload(html, heroUrl) {
  if (!heroUrl) return html;
  const tag = `<link rel="preload" as="image" href="${escapeHtml(heroUrl)}" fetchpriority="high" />`;
  if (html.includes(tag)) return html;
  return html.replace("</head>", `    ${tag}\n  </head>`);
}

function renderPage(html, route, heroPreloadUrl = "", articles = {}, faqItems = FAQ_ITEMS) {
  const page = getPageSeo(route, "en");
  if (page.isArticle) {
    const article = articles[page.slug];
    page.dateModified = isoDate(article?.updated_at || page.datePublished);
  }
  let next = html;
  if (route === "home") next = setHeroPreload(next, heroPreloadUrl);

  next = next.replace(/<html\s+lang="[^"]*"/i, '<html lang="en"');
  next = next.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeHtml(page.title)}</title>`,
  );
  next = setMeta(next, "name", "description", page.description);
  next = setMeta(
    next,
    "name",
    "robots",
    page.noindex
      ? "noindex, nofollow"
      : "index, follow, max-image-preview:large",
  );
  next = setLink(next, "canonical", page.canonical);

  next = setMeta(next, "property", "og:type", page.isArticle ? "article" : "website");
  if (page.isArticle) {
    next = setMeta(next, "property", "article:published_time", page.datePublished || "");
    next = setMeta(next, "property", "article:modified_time", page.dateModified || page.datePublished || "");
  }
  next = setMeta(next, "property", "og:site_name", "Garage a la Carte");
  next = setMeta(next, "property", "og:title", page.title);
  next = setMeta(next, "property", "og:description", page.description);
  next = setMeta(next, "property", "og:url", page.canonical);
  next = setMeta(next, "property", "og:image", page.image);
  next = setMeta(
    next,
    "property",
    "og:image:alt",
    `${page.title} - Garage a la Carte Orlando`,
  );
  next = setMeta(next, "property", "og:locale", page.locale);
  next = setMeta(next, "name", "twitter:title", page.title);
  next = setMeta(next, "name", "twitter:description", page.description);
  next = setMeta(next, "name", "twitter:image", page.image);
  next = setMeta(
    next,
    "name",
    "twitter:image:alt",
    `${page.title} - Garage a la Carte Orlando`,
  );

  next = setJsonLd(next, "seo-business-jsonld", buildBusinessJsonLd());
  // FAQ schema only on pages that visibly display the FAQ (Google requirement).
  if (routeHasFaq(route)) {
    next = setJsonLd(next, "seo-faq-jsonld", buildFaqJsonLd("en", faqItems));
  }
  next = setJsonLd(next, "seo-page-jsonld", buildPageJsonLd(page));
  next = setRootFallback(next, buildStaticFallback(route, page, articles, faqItems));

  return next;
}

// Per-route sitemap hints. Routes not listed here are skipped, as are noindex
// routes (e.g. admin). changefreq/priority mirror the previous static sitemap.
const SITEMAP_META = {
  home: { changefreq: "weekly", priority: "1.0" },
  projects: { changefreq: "weekly", priority: "0.9" },
  contact: { changefreq: "monthly", priority: "0.8" },
  conditions: { changefreq: "yearly", priority: "0.3" },
  blog: { changefreq: "weekly", priority: "0.7" },
  blog_remodeling_guide: { changefreq: "monthly", priority: "0.7" },
  blog_transformation_ideas: { changefreq: "monthly", priority: "0.7" },
  blog_storage_solutions: { changefreq: "monthly", priority: "0.7" },
};

function writeSitemap(articles = {}) {
  const today = todayIsoDate();
  const entries = Object.keys(SEO_ROUTES)
    .filter((route) => SITEMAP_META[route] && !SEO_ROUTES[route].noindex)
    .map((route) => {
      const cfg = SEO_ROUTES[route];
      const { changefreq, priority } = SITEMAP_META[route];
      const loc = `${SITE_URL}${cfg.path}`;
      const lastmod =
        cfg.isArticle && articles[cfg.slug]?.updated_at
          ? isoDate(articles[cfg.slug].updated_at)
          : today;
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
  return today;
}

if (!fs.existsSync(baseIndexPath)) {
  throw new Error("dist/index.html not found. Run vite build first.");
}

const baseHtml = fs.readFileSync(baseIndexPath, "utf8");

const heroPreloadUrl = await fetchHeroImageUrl();
const blogArticles = await fetchBlogArticles();
const faqItems = await fetchFaqItems();

for (const route of Object.keys(SEO_ROUTES)) {
  const page = getPageSeo(route, "en");
  const html = renderPage(baseHtml, route, heroPreloadUrl, blogArticles, faqItems);
  const outputPath =
    route === "home"
      ? baseIndexPath
      : path.join(distDir, page.path.replace(/^\/+/, ""), "index.html");

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, html);
}

const sitemapDate = writeSitemap(blogArticles);

console.log(
  "SEO prerendered routes:",
  Object.keys(SEO_ROUTES)
    .map((route) => SEO_ROUTES[route].path)
    .join(", "),
);
console.log("Sitemap generated with lastmod:", sitemapDate);
console.log(
  "Hero preload:",
  heroPreloadUrl || "(none — Supabase indisponible au build)",
);
console.log(
  "Blog articles baked into HTML:",
  Object.keys(blogArticles).length || "(none — Supabase indisponible au build)",
);
console.log(
  "FAQ items baked into HTML:",
  faqItems.length || "(static fallback — table empty or unavailable)",
);
