import fs from "node:fs";
import path from "node:path";
import {
  SEO_ROUTES,
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
  const regex = new RegExp(`<meta\\s+${attr}="${selector}"\\s+content="[^"]*"\\s*/?>`, "i");
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

function renderPage(html, route) {
  const page = getPageSeo(route, "en");
  let next = html;

  next = next.replace(/<html\s+lang="[^"]*"/i, '<html lang="en"');
  next = next.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(page.title)}</title>`);
  next = setMeta(next, "name", "description", page.description);
  next = setMeta(next, "name", "robots", page.noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large");
  next = setLink(next, "canonical", page.canonical);

  next = setMeta(next, "property", "og:title", page.title);
  next = setMeta(next, "property", "og:description", page.description);
  next = setMeta(next, "property", "og:url", page.canonical);
  next = setMeta(next, "property", "og:image", page.image);
  next = setMeta(next, "property", "og:locale", page.locale);
  next = setMeta(next, "name", "twitter:title", page.title);
  next = setMeta(next, "name", "twitter:description", page.description);
  next = setMeta(next, "name", "twitter:image", page.image);

  next = setJsonLd(next, "seo-business-jsonld", buildBusinessJsonLd());
  next = setJsonLd(next, "seo-page-jsonld", buildPageJsonLd(page));

  return next;
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

console.log("SEO prerendered routes:", Object.keys(SEO_ROUTES).map((route) => SEO_ROUTES[route].path).join(", "));
