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

function getServiceSeoByRoute(route) {
  return Object.values(SERVICE_SEO).find((service) => service.route === route);
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
  const service = getServiceSeoByRoute(route);
  const areaList = SERVICE_AREA_PLACES.map((place) => `<li>${escapeHtml(place)}</li>`).join("");

  if (service) {
    return `
      <article class="seo-fallback">
        <p>Garage services in Orlando, FL</p>
        <h1>${escapeHtml(service.title.en)}</h1>
        <p>${escapeHtml(service.description.en)}</p>
        <h2>Project goals</h2>
        <ul>${keywordListHtml(service.keywords)}</ul>
        <p>Garage a la Carte serves Orlando and nearby Central Florida communities with custom garage design, garage remodeling, storage planning, 3D plans, and smart garage integration.</p>
        <h2>Service area</h2>
        <ul>${areaList}</ul>
        <p><a href="/contact/">Request a free garage estimate in Orlando</a></p>
      </article>`;
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

function renderPage(html, route) {
  const page = getPageSeo(route, "en");
  let next = html;

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
  serviceBlueprint: { changefreq: "monthly", priority: "0.85" },
  serviceSetup: { changefreq: "monthly", priority: "0.85" },
  serviceTransformation: { changefreq: "monthly", priority: "0.85" },
  serviceSmart: { changefreq: "monthly", priority: "0.8" },
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

for (const route of Object.keys(SEO_ROUTES)) {
  const page = getPageSeo(route, "en");
  const html = renderPage(baseHtml, route);
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
