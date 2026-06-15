import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import { SEO_ROUTES } from "../lib/seo";
import { Reveal } from "../components/common";

// Map an article slug to its named route (derived from SEO_ROUTES so the two stay in sync).
const ROUTE_BY_SLUG = Object.fromEntries(
  Object.entries(SEO_ROUTES)
    .filter(([, cfg]) => cfg.isArticle && cfg.slug)
    .map(([route, cfg]) => [cfg.slug, route]),
);

// Editorial category label per article (shown as the row eyebrow).
const CATEGORIES = {
  "garage-remodeling-guide": { en: "Guide", fr: "Guía" },
  "garage-transformation-ideas": { en: "Ideas", fr: "Ideas" },
  "garage-storage-solutions": { en: "Storage", fr: "Almacenamiento" },
};

export function BlogIndex({ lang = "en", onNav }) {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(true);
  const isSpanish = lang === "fr";

  // Static fallback list (used when Supabase is unavailable), kept in sync with SEO_ROUTES.
  const fallback = useMemo(
    () =>
      Object.values(SEO_ROUTES)
        .filter((cfg) => cfg.isArticle && cfg.slug)
        .map((cfg) => ({
          slug: cfg.slug,
          title_en: cfg.title.en,
          title_fr: cfg.title.fr,
          intro_en: cfg.description.en,
          intro_fr: cfg.description.fr,
        })),
    [],
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    let active = true;
    (async () => {
      try {
        const { data, error } = await supabase
          .from("blog_articles")
          .select("slug, title_en, title_fr, intro_en, intro_fr, updated_at")
          .eq("is_active", true)
          .order("created_at", { ascending: true });
        if (error) throw error;
        if (active) setArticles(data?.length ? data : fallback);
      } catch {
        if (active) setArticles(fallback);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [fallback]);

  const list = articles || fallback;

  return (
    <div className="blog-hub">
      <nav className="blog-hub__breadcrumb" aria-label="Breadcrumb">
        <a
          href="/"
          onClick={(e) => {
            if (onNav) {
              e.preventDefault();
              onNav("home");
            }
          }}
        >
          {isSpanish ? "Inicio" : "Home"}
        </a>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Blog</span>
      </nav>

      <header className="blog-hub__head">
        <Reveal as="div" className="blog-hub__eyebrow text-mono">
          {isSpanish ? "El Diario" : "The Journal"}
        </Reveal>
        <Reveal as="h1" className="blog-hub__title" delay={0.05}>
          {isSpanish ? "Blog de Reforma de Garaje" : "Garage Remodeling Blog"}
        </Reveal>
        <Reveal as="p" className="blog-hub__intro" delay={0.1}>
          {isSpanish
            ? "Guías, ideas de transformación y soluciones de almacenamiento para propietarios de Orlando."
            : "Guides, transformation ideas, and storage solutions for Orlando homeowners."}
        </Reveal>
      </header>

      {loading && !articles ? (
        <p style={{ color: "var(--muted)" }}>{isSpanish ? "Cargando…" : "Loading…"}</p>
      ) : (
        <div className="blog-hub__list">
          {list.map((a, i) => {
            const route = ROUTE_BY_SLUG[a.slug];
            const title = isSpanish ? a.title_fr || a.title_en : a.title_en;
            const intro = isSpanish ? a.intro_fr || a.intro_en : a.intro_en;
            const cat = CATEGORIES[a.slug]
              ? CATEGORIES[a.slug][lang] || CATEGORIES[a.slug].en
              : isSpanish
                ? "Artículo"
                : "Article";
            const href = route ? SEO_ROUTES[route].path : `/blog/${a.slug}/`;
            return (
              <Reveal as="div" key={a.slug} delay={0.05 + i * 0.06}>
                <a
                  href={href}
                  className="blog-hub__row"
                  onClick={(e) => {
                    if (route && onNav) {
                      e.preventDefault();
                      onNav(route);
                    }
                  }}
                >
                  <span className="blog-hub__num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="blog-hub__body">
                    <span className="blog-hub__cat">{cat}</span>
                    <span className="blog-hub__row-title">{title}</span>
                    <span className="blog-hub__excerpt">{intro}</span>
                    <span className="blog-hub__more">
                      {isSpanish ? "Leer el artículo" : "Read the article"}
                      <span className="blog-hub__arrow" aria-hidden="true">→</span>
                    </span>
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>
      )}
    </div>
  );
}
