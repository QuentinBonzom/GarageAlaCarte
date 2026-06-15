import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { SEO_ROUTES } from "../lib/seo";

// All article routes (derived from SEO_ROUTES so it stays in sync), used for "related articles".
const ARTICLE_ROUTES = Object.entries(SEO_ROUTES)
  .filter(([, cfg]) => cfg.isArticle && cfg.slug)
  .map(([route, cfg]) => ({ route, slug: cfg.slug, path: cfg.path, title: cfg.title }));

// Editorial category label per article (shown as the header eyebrow).
const CATEGORIES = {
  "garage-remodeling-guide": { en: "Guide", fr: "Guía" },
  "garage-transformation-ideas": { en: "Ideas", fr: "Ideas" },
  "garage-storage-solutions": { en: "Storage", fr: "Almacenamiento" },
};

const FALLBACK_ARTICLE_SECTIONS = {
  "garage-remodeling-guide": {
    en: [
      {
        heading: "Start with the way you want to use the garage",
        body: "A successful garage remodel starts with purpose. Decide whether the space should become a home gym, office, lounge, workshop, organized storage room, or a flexible combination of uses. That decision guides the layout, lighting, flooring, storage, ventilation, and budget.",
      },
      {
        heading: "Plan the layout before buying materials",
        body: "A clear design plan helps avoid expensive changes during installation. In Orlando homes, we usually look at heat, humidity, ceiling height, access, garage door clearance, electrical needs, and how daily storage will work once the transformation is complete.",
      },
      {
        heading: "Build a realistic scope and timeline",
        body: "Design-only projects can move quickly, while full garage renovations depend on product lead times, contractor availability, permits, and site readiness. The safest first step is a consultation, a 3D concept, and a written scope before committing to materials or labor.",
      },
    ],
    fr: [
      {
        heading: "Empieza por cómo quieres usar el garaje",
        body: "Una buena reforma de garaje empieza por una función clara. Define si el espacio será un gimnasio, oficina, lounge, taller, zona de almacenamiento o una combinación flexible. Esa decisión guía la distribución, la iluminación, el suelo, el almacenamiento, la ventilación y el presupuesto.",
      },
      {
        heading: "Planifica antes de comprar materiales",
        body: "Un plan de diseño claro evita cambios costosos durante la instalación. En Orlando, revisamos calor, humedad, altura, acceso, apertura de la puerta, necesidades eléctricas y cómo funcionará el almacenamiento diario una vez terminada la transformación.",
      },
      {
        heading: "Define alcance y plazo realistas",
        body: "Los proyectos solo de diseño pueden avanzar rápido, mientras que una reforma completa depende de materiales, disponibilidad, permisos y preparación del espacio. El primer paso más seguro es una consulta, un concepto 3D y un alcance escrito.",
      },
    ],
  },
  "garage-transformation-ideas": {
    en: [
      {
        heading: "Turn the garage into a room you actually use",
        body: "The most effective garage transformations solve a real lifestyle need. A gym needs resilient flooring and ventilation. An office needs comfort, lighting, and acoustic planning. A lounge or media room needs atmosphere, storage, and electrical coordination.",
      },
      {
        heading: "Keep storage integrated from day one",
        body: "Even lifestyle garages still need practical storage. Cabinets, wall systems, ceiling racks, and hidden zones should be planned into the design so tools, seasonal items, and sports equipment do not take over the finished room.",
      },
      {
        heading: "Use 3D views to validate the concept",
        body: "Before a garage becomes a man cave, home gym, office, or lounge, 3D views help confirm scale, circulation, colors, materials, and lighting. This makes the project easier to price and easier to execute.",
      },
    ],
    fr: [
      {
        heading: "Convierte el garaje en una estancia útil",
        body: "Las mejores transformaciones resuelven una necesidad real. Un gimnasio necesita suelo resistente y ventilación. Una oficina necesita confort, luz y acústica. Un lounge o sala multimedia necesita ambiente, almacenamiento y planificación eléctrica.",
      },
      {
        heading: "Integra el almacenamiento desde el principio",
        body: "Incluso un garaje de ocio necesita almacenamiento práctico. Armarios, sistemas murales, racks suspendidos y zonas ocultas deben formar parte del diseño para que herramientas y objetos de temporada no invadan el espacio.",
      },
      {
        heading: "Valida el concepto con vistas 3D",
        body: "Antes de convertir un garaje en gimnasio, oficina, lounge o man cave, las vistas 3D ayudan a confirmar escala, circulación, colores, materiales e iluminación. Así el proyecto es más fácil de presupuestar y ejecutar.",
      },
    ],
  },
  "garage-storage-solutions": {
    en: [
      {
        heading: "Choose storage around your habits",
        body: "The best garage storage system depends on what you use every week and what only needs seasonal access. Cabinets, wall panels, shelving, ceiling racks, and workbench zones should be chosen around real daily behavior, not just empty-wall space.",
      },
      {
        heading: "Combine open and closed storage",
        body: "Open storage keeps frequently used items visible, while closed cabinets calm the room and protect tools, sports gear, and supplies. A balanced garage organization plan usually combines both with clear zones.",
      },
      {
        heading: "Plan storage with the full remodel",
        body: "Storage should be designed alongside flooring, lighting, outlets, and the garage's future use. This prevents cabinets from blocking circulation and keeps the space flexible for a home gym, office, workshop, or lounge.",
      },
    ],
    fr: [
      {
        heading: "Elige el almacenamiento según tus hábitos",
        body: "El mejor sistema depende de lo que usas cada semana y de lo que solo necesitas por temporadas. Armarios, paneles murales, estanterías, racks de techo y zonas de trabajo deben elegirse según el uso real del día a día.",
      },
      {
        heading: "Combina almacenamiento abierto y cerrado",
        body: "El almacenamiento abierto mantiene visibles los objetos frecuentes, mientras que los armarios cerrados ordenan visualmente y protegen herramientas, material deportivo y suministros. Una buena organización combina ambos con zonas claras.",
      },
      {
        heading: "Planifica el almacenamiento con la reforma completa",
        body: "El almacenamiento debe diseñarse junto con el suelo, la iluminación, los enchufes y el futuro uso del garaje. Así se evita bloquear la circulación y se mantiene flexibilidad para gimnasio, oficina, taller o lounge.",
      },
    ],
  },
};

function getFallbackArticle(slug, route) {
  const page = SEO_ROUTES[route];
  if (!page) return null;
  return {
    slug,
    title_en: page.title.en,
    title_fr: page.title.fr,
    intro_en: page.description.en,
    intro_fr: page.description.fr,
    content_en: FALLBACK_ARTICLE_SECTIONS[slug]?.en || [],
    content_fr: FALLBACK_ARTICLE_SECTIONS[slug]?.fr || [],
    cta_en:
      "Ready to plan a garage remodel in Orlando? Start with a free consultation and a clear design direction.",
    cta_fr:
      "¿Listo para planificar una reforma de garaje en Orlando? Empieza con una consulta gratuita y una dirección de diseño clara.",
    cta_button_en: "Request a free estimate",
    cta_button_fr: "Solicitar presupuesto gratuito",
    created_at: page.datePublished,
    updated_at: page.datePublished,
  };
}

function formatDate(value, lang) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(lang === "fr" ? "es-ES" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Shared layout for every blog article. The three blog pages are thin wrappers
 * around this component, they only differ by `slug`/`route`.
 */
export function BlogArticle({ slug, route, lang = "en", onNav }) {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const isSpanish = lang === "fr";

  useEffect(() => {
    window.scrollTo(0, 0);
    let active = true;
    const fallbackArticle = getFallbackArticle(slug, route);
    (async () => {
      try {
        const { data, error } = await supabase
          .from("blog_articles")
          .select("*")
          .eq("slug", slug)
          .eq("is_active", true)
          .single();
        if (error) throw error;
        if (active) setArticle(data || fallbackArticle);
      } catch {
        if (active) setArticle(fallbackArticle);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [slug, route]);

  const go = (target) => (e) => {
    if (onNav) {
      e.preventDefault();
      onNav(target);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "80px 20px", textAlign: "center", color: "var(--muted)" }}>
        {isSpanish ? "Cargando…" : "Loading…"}
      </div>
    );
  }

  if (!article) {
    return (
      <div style={{ padding: "80px 20px", textAlign: "center", color: "var(--muted)" }}>
        {isSpanish ? "Artículo no encontrado" : "Article not found"}
      </div>
    );
  }

  const title = isSpanish ? article.title_fr || article.title_en : article.title_en;
  const intro = isSpanish ? article.intro_fr || article.intro_en : article.intro_en;
  const sections = isSpanish ? article.content_fr || article.content_en : article.content_en;
  const cta = isSpanish ? article.cta_fr || article.cta_en : article.cta_en;
  const ctaButton = isSpanish
    ? article.cta_button_fr || article.cta_button_en
    : article.cta_button_en;
  const published = formatDate(article.created_at, lang);
  const category = CATEGORIES[slug]
    ? CATEGORIES[slug][lang] || CATEGORIES[slug].en
    : isSpanish
      ? "Artículo"
      : "Article";
  const related = ARTICLE_ROUTES.filter((a) => a.slug !== slug);

  return (
    <article className="blog-article">
      <nav className="blog-article__breadcrumb" aria-label="Breadcrumb">
        <a href="/" onClick={go("home")}>{isSpanish ? "Inicio" : "Home"}</a>
        <span>/</span>
        <a href="/blog/" onClick={go("blog")}>Blog</a>
        <span>/</span>
        <span aria-current="page">{title}</span>
      </nav>

      <header className="blog-article__header">
        <div className="blog-article__eyebrow text-mono">{category}</div>
        <h1>{title}</h1>
        {published && (
          <div className="blog-article__meta">
            {isSpanish ? "Publicado el " : "Published "}
            {published}
          </div>
        )}
        <p className="blog-article__intro">{intro}</p>
      </header>

      <div className="blog-article__content">
        {Array.isArray(sections) &&
          sections.map((section, idx) => (
            <section key={idx} className="blog-article__section">
              <h2>{section.heading}</h2>
              {String(section.body || "")
                .split("\n\n")
                .map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
            </section>
          ))}
      </div>

      {cta && (
        <div className="blog-article__cta">
          <p>{cta}</p>
          <a href="/contact/" className="btn btn--primary" onClick={go("contact")}>
            {ctaButton || (isSpanish ? "Contáctanos" : "Contact us")}
          </a>
        </div>
      )}

      {related.length > 0 && (
        <aside className="blog-article__related">
          <h2>{isSpanish ? "Artículos relacionados" : "Related articles"}</h2>
          <div className="blog-index__list">
            {related.map((a) => (
              <a
                key={a.slug}
                href={a.path}
                className="blog-index__card"
                onClick={go(a.route)}
              >
                <h2>{isSpanish ? a.title.fr || a.title.en : a.title.en}</h2>
                <span className="blog-index__more">
                  {isSpanish ? "Leer el artículo →" : "Read the article →"}
                </span>
              </a>
            ))}
          </div>
        </aside>
      )}
    </article>
  );
}
