import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CONTENT } from "../data/content";
import { ImagePlaceholder, Reveal, useReveal } from "../components/common";
import { cmsAttr } from "../lib/cmsEdit";

export function ProjectsPage({ lang, onNav }) {
  const C = CONTENT.projects_page;
  const projects = CONTENT.projects || [];
  const [active, setActive] = useState(null);

  // Si on arrive depuis une card UseCase, ouvre automatiquement le projet correspondant
  useEffect(() => {
    const targetSlug = sessionStorage.getItem("open_project_slug");
    if (!targetSlug) return;
    sessionStorage.removeItem("open_project_slug");
    const target = projects.find((p) => p.slug === targetSlug && !p.placeholder);
    if (target) setActive(target);
  }, [projects]);

  return (
    <div className="page">
      <section className="projects-v2-head">
        <div className="projects-v2-head__inner">
          <Reveal as="div" className="projects-v2-head__eyebrow" {...cmsAttr("projects_page", "eyebrow")}>
            {text(C.eyebrow, lang, lang === "en" ? "Selected work" : "Sélection")}
          </Reveal>
          <Reveal as="h1" className="projects-v2-head__title" {...cmsAttr("projects_page", "title")}>
            {text(C.title, lang, lang === "en" ? "Our garages, redesigned." : "Nos garages, repensés.")}
          </Reveal>
          {C.sub && (
            <Reveal as="p" className="projects-v2-head__sub" delay={0.1} {...cmsAttr("projects_page", "sub")}>
              {text(C.sub, lang)}
            </Reveal>
          )}
        </div>
      </section>

      <section className="projects-v2-grid-section">
        <div className="projects-v2-grid">
          {projects.map((p, i) => (
            <ProjectTile
              key={p.id}
              project={p}
              lang={lang}
              index={i}
              featured={i === 0}
              onClick={() => !p.placeholder && setActive(p)}
            />
          ))}
          {!projects.length && (
            <div className="projects-v2-empty">
              {lang === "en"
                ? "Projects coming soon — upload one via the admin."
                : "Réalisations à venir — ajoutez-en une via l'admin."}
            </div>
          )}
        </div>
      </section>

      {active && <ProjectModal project={active} lang={lang} onClose={() => setActive(null)} onNav={onNav} />}
    </div>
  );
};

function ProjectTile({ project, lang, index, featured, onClick }) {
  const ref = useReveal();
  const isPh = project.placeholder;
  const heroImage = project.images?.[0] || null;
  const projectName = text(project.name, lang, lang === "en" ? "Untitled project" : "Projet sans titre");
  const tagline = text(project.tagline, lang, "");
  const service = text(project.service, lang, "");

  return (
    <article
      ref={ref}
      className={`reveal project-v2-tile${featured ? " project-v2-tile--featured" : ""}${isPh ? " project-v2-tile--placeholder" : ""}`}
      style={{ transitionDelay: `${index * 0.06}s` }}
      onClick={onClick}
      role={isPh ? undefined : "button"}
      tabIndex={isPh ? undefined : 0}
      onKeyDown={(e) => { if (!isPh && e.key === "Enter") onClick(); }}
      aria-label={isPh ? `${projectName} — coming soon` : `${projectName} — view case`}
    >
      <div className="project-v2-tile__media">
        <ImagePlaceholder
          label={isPh ? (lang === "en" ? "COMING SOON" : "BIENTÔT") : heroImage?.label}
          color={heroImage?.color || "#70675d"}
          src={heroImage?.url}
          alt={text(heroImage?.alt, lang, projectName)}
          style={{ position: "absolute", inset: 0, borderRadius: 0 }}
        />
        <div className="project-v2-tile__scrim" aria-hidden="true" />
      </div>

      <div className="project-v2-tile__body">
        <div className="project-v2-tile__meta-row">
          {service && !isPh && <span className="project-v2-tile__service">{service}</span>}
          <span className="project-v2-tile__year">{isPh ? (lang === "en" ? "Coming" : "À venir") : (project.year || "—")}</span>
        </div>
        <h3 className="project-v2-tile__name">{projectName}</h3>
        {tagline && !isPh && <p className="project-v2-tile__tagline">{tagline}</p>}
        {!isPh && (
          <span className="project-v2-tile__cta">
            {lang === "en" ? "View case" : "Voir le cas"} <span aria-hidden="true">→</span>
          </span>
        )}
      </div>
    </article>
  );
}

function ProjectModal({ project, lang, onClose, onNav }) {
  const projectName = text(project.name, lang, lang === "en" ? "Untitled project" : "Projet sans titre");
  const tagline = text(project.tagline, lang, "");
  const service = text(project.service, lang, "");
  const description = text(project.description, lang, "");
  const includes = list(project.includes, lang);
  const images = project.images || [];

  const [slide, setSlide] = useState(0);
  const total = images.length;
  const safeSlide = total > 0 ? Math.min(slide, total - 1) : 0;
  const currentImage = images[safeSlide] || null;
  const prevSlide = () => setSlide((i) => (i - 1 + total) % total);
  const nextSlide = () => setSlide((i) => (i + 1) % total);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (total > 1 && e.key === "ArrowLeft") prevSlide();
      else if (total > 1 && e.key === "ArrowRight") nextSlide();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [total, onClose]);

  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div className="project-v2-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Close">×</button>

        <div className="project-v2-modal__hero">
          <ImagePlaceholder
            color={currentImage?.color || "#70675d"}
            label={currentImage?.label}
            src={currentImage?.url}
            alt={text(currentImage?.alt, lang, projectName)}
            style={{ position: "absolute", inset: 0, borderRadius: 0 }}
          />
          <div className="project-v2-modal__scrim" aria-hidden="true" />

          {total > 1 && (
            <>
              <button
                type="button"
                className="project-v2-modal__nav project-v2-modal__nav--prev"
                onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                aria-label={lang === "en" ? "Previous image" : "Image précédente"}
              >‹</button>
              <button
                type="button"
                className="project-v2-modal__nav project-v2-modal__nav--next"
                onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                aria-label={lang === "en" ? "Next image" : "Image suivante"}
              >›</button>
              <div className="project-v2-modal__counter" aria-live="polite">
                {safeSlide + 1} / {total}
              </div>
              <div className="project-v2-modal__dots" role="tablist">
                {images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={i === safeSlide}
                    aria-label={`${lang === "en" ? "Image" : "Image"} ${i + 1}`}
                    className={`project-v2-modal__dot${i === safeSlide ? " is-active" : ""}`}
                    onClick={(e) => { e.stopPropagation(); setSlide(i); }}
                  />
                ))}
              </div>
            </>
          )}

          <div className="project-v2-modal__hero-body">
            {service && <span className="project-v2-modal__service">{service}</span>}
            <h2 className="project-v2-modal__title">{projectName}</h2>
            {tagline && <p className="project-v2-modal__tagline">{tagline}</p>}
          </div>
        </div>

        <div className="project-v2-modal__content">
          <div className="project-v2-modal__meta">
            <Meta label={lang === "en" ? "Type" : "Type"} value={text(project.type, lang)} />
            <Meta label={lang === "en" ? "Size" : "Taille"} value={text(project.size, lang)} />
            <Meta label={lang === "en" ? "Duration" : "Durée"} value={text(project.duration, lang)} />
            <Meta label={lang === "en" ? "Year" : "Année"} value={project.year || "—"} />
          </div>

          {description && <p className="project-v2-modal__lead">{description}</p>}

          {includes.length > 0 && (
            <div className="project-v2-modal__includes">
              <div className="project-v2-modal__includes-label">
                {lang === "en" ? "What's included" : "Inclus"}
              </div>
              <ul>
                {includes.map((it, i) => (
                  <li key={i}>
                    <span className="project-v2-modal__includes-num">0{i + 1}</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="project-v2-modal__footer">
            <button className="btn" onClick={() => { onClose(); onNav("contact"); }}>
              {lang === "en" ? "Start a similar project" : "Démarrer un projet similaire"} <span className="arrow">↗</span>
            </button>
            <button className="btn btn-ghost" onClick={onClose}>
              {lang === "en" ? "Close" : "Fermer"}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

function Meta({ label, value }) {
  return (
    <div className="project-v2-modal__meta-item">
      <div className="project-v2-modal__meta-label">{label}</div>
      <div className="project-v2-modal__meta-value">{value}</div>
    </div>
  );
}

function text(value, lang, fallback = "—") {
  if (!value) return fallback;
  if (typeof value === "string") return value;
  return value[lang] || value.en || value.fr || fallback;
}

function list(value, lang) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return value[lang] || value.en || value.fr || [];
}
