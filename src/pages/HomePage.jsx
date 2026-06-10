import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { CONTENT } from "../data/content";
import { ImagePlaceholder, Reveal, useReveal, TeamSection } from "../components/common";
import { cmsAttr, cmsRecordAttr } from "../lib/cmsEdit";
import { getServiceRouteForId, routeToPath } from "../lib/seo";


export function HomePage({ lang, onNav }) {
  return (
    <div className="page">
      <Hero lang={lang} onNav={onNav} />
      <UseCasesSection lang={lang} onNav={onNav} />
      <BeforeAfterSection lang={lang} />
      <ServicesSection lang={lang} onNav={onNav} />
      <TeamSection lang={lang} />

      <FinalCTA lang={lang} onNav={onNav} />
    </div>
  );
};

// ============================ HERO — "Your garage, reimagined." ============================
function Hero({ lang, onNav }) {
  const C = CONTENT.hero;
  const cap = CONTENT.hero_caption || {};
  const heroImage = cap.image || cap.after_image || "";

  const carouselImages = React.useMemo(() => {
    const fromCap = Array.isArray(cap.images)
      ? cap.images
          .map((img) => (typeof img === "string" ? img : img?.image || img?.url))
          .filter(Boolean)
      : [];
    if (fromCap.length > 0) return fromCap;
    return heroImage ? [heroImage] : [];
  }, [cap.images, heroImage]);

  const [activeIdx, setActiveIdx] = useState(0);
  useEffect(() => {
    if (carouselImages.length < 2) return;
    const interval = setInterval(() => {
      setActiveIdx((i) => (i + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const titleLines = Array.isArray(C.title?.[lang])
    ? C.title[lang]
    : String(C.title?.[lang] || "").split("\n").filter(Boolean);
  const italicWord = C.italic_word?.[lang];

  return (
    <section id="hero" className="hero-v2">
      <div className="hero-v2__media" aria-hidden="true">
        {carouselImages.length > 0 ? (
          carouselImages.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              className={`hero-v2__slide${i === activeIdx ? " is-active" : ""}`}
              loading={i === 0 ? "eager" : "lazy"}
              fetchpriority={i === 0 ? "high" : "auto"}
              decoding="async"
            />
          ))
        ) : (
          <div className="hero-v2__placeholder" />
        )}
      </div>
      <div className="hero-v2__scrim" aria-hidden="true" />

      <div className="hero-v2__inner">
        <Reveal as="h1" className="hero-v2__title" {...cmsAttr("hero", "title", "lines")}>

          {titleLines.map((line, i) => {
            const words = String(line).split(" ");
            return (
              <span key={i} style={{ display: "block" }}>
                {words.map((w, j) => {
                  const isItalic = italicWord && w.toLowerCase().replace(/[.,]/g, "") === italicWord.toLowerCase().replace(/[.,]/g, "");
                  const space = j < words.length - 1 ? " " : "";
                  return isItalic
                    ? <em key={j}>{w}{space}</em>
                    : <React.Fragment key={j}>{w}{space}</React.Fragment>;
                })}
              </span>
            );
          })}
        </Reveal>

        <Reveal as="div" className="hero-v2__row" delay={0.1}>
          <div className="hero-v2__sub-group">
            {C.tagline?.[lang] && (
              <p className="hero-v2__tagline" {...cmsAttr("hero", "tagline")}>{C.tagline[lang]}</p>
            )}
            <p className="hero-v2__sub" {...cmsAttr("hero", "sub")}>{C.sub[lang]}</p>
          </div>
          <div className="hero-v2__ctas">
            <button className="btn" onClick={() => onNav("contact")}>
              <span {...cmsAttr("hero", "primary_cta")}>{C.primary_cta[lang]}</span> <span className="arrow">↗</span>
            </button>
            <button className="btn btn-ghost" onClick={() => onNav("projects")}>
              <span {...cmsAttr("hero", "secondary_cta")}>{C.secondary_cta[lang]}</span>
            </button>
          </div>

        </Reveal>
      </div>
    </section>
  );
}

// ============================ USE CASES — "Pick your room" (4 transformations) ============================
function UseCasesSection({ lang, onNav }) {
  const C = CONTENT.use_cases;
  if (!C || !Array.isArray(C.items) || C.items.length === 0) return null;

  return (
    <section id="use_cases" className="usecases">
      <div className="usecases__inner">
        <div className="usecases__head">
          <Reveal as="div" className="usecases__eyebrow" {...cmsAttr("use_cases", "eyebrow")}>
            {C.eyebrow?.[lang] || (lang === "en" ? "Transformations" : "Transformaciones")}
          </Reveal>
          <Reveal as="h2" className="usecases__title" {...cmsAttr("use_cases", "title")}>
            {C.title?.[lang] || (lang === "en"
              ? "Discover Your Dream Garage. Explore, Imagine, and Get Inspired!"
              : "Descubre el garaje de tus sueños. ¡Explora, imagina e inspírate!")}
          </Reveal>
          {C.sub?.[lang] && (
            <Reveal as="p" className="usecases__sub" delay={0.1} {...cmsAttr("use_cases", "sub")}>{C.sub[lang]}</Reveal>

          )}
        </div>

        <div className="usecases__grid">
          {C.items.map((item, i) => (
            <UseCaseCard key={i} item={item} index={i} lang={lang} onNav={onNav} />
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCaseCard({ item, index, lang, onNav }) {
  const ref = useReveal();
  const name = item.name?.[lang] || "";
  const tagline = item.tagline?.[lang] || "";
  const image = item.image || "";

  const linkedProject = item.project_slug
    ? (CONTENT.projects || []).find((p) => p.slug === item.project_slug)
    : null;
  const albumImages = (linkedProject?.images || []).filter((img) => img.url);
  const coverUrl = image || albumImages[0]?.url || "";
  const coverColor = albumImages[0]?.color || "#a89378";
  const photoCount = albumImages.length;

  const goToProject = () => {
    if (item.project_slug) {
      sessionStorage.setItem("open_project_slug", item.project_slug);
    }
    onNav?.("projects");
  };


  return (
    <article
      ref={ref}
      className="reveal usecase-card"
      style={{ transitionDelay: `${index * 0.08}s` }}
      onClick={goToProject}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") goToProject(); }}
      aria-label={`${name} — voir le projet`}
    >
      <div className="usecase-card__media">
        {coverUrl ? (
          <img src={coverUrl} alt={name} loading="lazy" />
        ) : (
          <ImagePlaceholder label={name || "Transformation"} color={coverColor} style={{ position: "absolute", inset: 0, borderRadius: 0 }} />
        )}
        {photoCount > 1 && (
          <span className="usecase-card__album-badge" aria-hidden="true">
            {photoCount} <span>photos</span>
          </span>
        )}
      </div>
      <div className="usecase-card__body">
        <h3 className="usecase-card__name" {...cmsAttr("use_cases", `items.${index}.name`)}>{name}</h3>
        {tagline && <p className="usecase-card__tagline" {...cmsAttr("use_cases", `items.${index}.tagline`)}>{tagline}</p>}

      </div>
    </article>
  );
}

// ============================ BEFORE / AFTER (immersive dark section) ============================
function BeforeAfterSection({ lang }) {
  const C = CONTENT.before_after;
  return (
    <section id="before_after" className="ba-v2">
      <div className="ba-v2__inner">
        <div className="ba-v2__head">
          <Reveal as="div" className="ba-v2__eyebrow" {...cmsAttr("before_after", "eyebrow")}>
            {C.eyebrow?.[lang] || (lang === "en" ? "The transformation" : "La transformación")}
          </Reveal>
          <Reveal as="h2" className="ba-v2__title" {...cmsAttr("before_after", "title")}>
            {C.title[lang]}
          </Reveal>
        </div>

        <Reveal>
          <BeforeAfterSlider
            beforeSrc={C.before_image}
            afterSrc={C.after_image}
            beforeLabel={lang === "en" ? "Before" : "Antes"}
            afterLabel={lang === "en" ? "After" : "Después"}
            height="clamp(360px, 56vh, 720px)"
          />
        </Reveal>

        <div className="ba-v2__captions">
          <Reveal>
            <div className="ba-v2__caption">
              <span className="ba-v2__caption-label">{lang === "en" ? "Before" : "Antes"}</span>
              <p {...cmsAttr("before_after", "before")}>{C.before[lang]}</p>

            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="ba-v2__caption ba-v2__caption--after">
              <span className="ba-v2__caption-label">{lang === "en" ? "After" : "Después"}</span>
              <p {...cmsAttr("before_after", "after")}>{C.after[lang]}</p>

            </div>
          </Reveal>
        </div>

        {C.statement?.[lang] && (
          <Reveal delay={0.15}>
            <p className="ba-v2__statement" {...cmsAttr("before_after", "statement")}>{C.statement[lang]}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function BeforeAfterSlider({ beforeSrc, afterSrc, beforeLabel = "Before", afterLabel = "After", height = "min(70vh, 680px)" }) {
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);
  const containerRef = useRef(null);

  const update = (clientX) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, x)));
  };
  const onDown = (e) => { dragging.current = true; e.preventDefault(); };
  const onMove = (e) => {
    if (!dragging.current) return;
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    update(cx);
  };
  const onUp = () => { dragging.current = false; };

  useEffect(() => {
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position:"relative",
        width:"100%",
        height,
        borderRadius:"24px",
        overflow:"hidden",
        userSelect:"none",
        touchAction:"none",
        cursor:"ew-resize",
        background:"var(--ink)"
      }}
      onMouseDown={onDown}
      onTouchStart={onDown}
    >
      {/* AFTER (full) */}
      {afterSrc ? (
        <img
          src={afterSrc}
          alt={afterLabel}
          style={{position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", display:"block"}}
          draggable={false}
        />
      ) : (
        <ImagePlaceholder label={`${afterLabel} · Social Hub`} color="#3a2c22" style={{position:"absolute", inset:0, borderRadius:0}} />
      )}

      {/* BEFORE (clipped) */}
      <div style={{position:"absolute", inset:0, clipPath:`inset(0 ${100-pos}% 0 0)`}}>
        {beforeSrc ? (
          <img
            src={beforeSrc}
            alt={beforeLabel}
            style={{position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", display:"block"}}
            draggable={false}
          />
        ) : (
          <ImagePlaceholder
            label={`${beforeLabel} · garage clutter`}
            color="#7a6450"
            style={{position:"absolute", inset:0, borderRadius:0, filter:"saturate(0.5) brightness(0.85)"}}
          />
        )}
      </div>

      {/* Slider handle */}
      <div style={{
        position:"absolute", top:0, bottom:0, left:`${pos}%`,
        width:"2px", background:"#fff",
        boxShadow:"0 0 24px rgba(0,0,0,0.45)",
        pointerEvents:"none"
      }}>
        <div style={{
          position:"absolute", top:"50%", left:"50%", transform:"translate(-50%, -50%)",
          width:"60px", height:"60px", borderRadius:"50%",
          background:"#fff", border:"2px solid var(--terra)",
          display:"flex", alignItems:"center", justifyContent:"center",
          color:"var(--ink)", fontFamily:"var(--mono)", fontSize:"18px", fontWeight:500,
          boxShadow:"0 12px 36px rgba(0,0,0,0.35)"
        }}>⇄</div>
      </div>

      {/* Labels */}
      <div style={{position:"absolute", top:"20px", left:"20px", pointerEvents:"none"}}>
        <span className="tag" style={{background:"rgba(247,244,238,0.95)", color:"var(--ink)"}}>{beforeLabel}</span>
      </div>
      <div style={{position:"absolute", top:"20px", right:"20px", pointerEvents:"none"}}>
        <span className="tag" style={{background:"var(--terra)", color:"#fff"}}>{afterLabel}</span>
      </div>
    </div>
  );
}

// ============================ SERVICES ============================
function ServicesSection({ lang, onNav }) {
  const C = CONTENT.services;
  return (
    <section id="services_intro" className="svc-v2">
      <div className="svc-v2__inner">
        <div className="svc-v2__head">
          <Reveal as="div" className="svc-v2__eyebrow" {...cmsAttr("services_intro", "eyebrow")}>
            {C.eyebrow?.[lang] || (lang === "en" ? "Pricing" : "Tarifas")}
          </Reveal>
          <Reveal as="h2" className="svc-v2__title" {...cmsAttr("services_intro", "title")}>{C.title[lang]}</Reveal>
          <Reveal as="p" className="svc-v2__sub" delay={0.1} {...cmsAttr("services_intro", "sub")}>{C.sub[lang]}</Reveal>

        </div>

        <div className="svc-v2__grid">
          {C.items.map((s, i) => (
            <ServiceCard key={s.id} svc={s} lang={lang} index={i} onNav={onNav} />
          ))}
        </div>

        <Reveal as="p" className="svc-v2__expertise" delay={0.18}>
          {lang === "en"
            ? "Our expert team delivers space optimization, organization systems, and innovative renovations — enhanced by mood visual design and advanced Color, Material, and Finish (CMF) expertise to maximize garage functionality, improve curb appeal, and add lasting value to your property."
            : "Nuestro equipo experto ofrece optimización del espacio, sistemas de organización y reformas innovadoras — potenciadas por el mood visual design y una experiencia avanzada en Color, Material y Acabado (CMF) para maximizar la funcionalidad del garaje, mejorar el atractivo exterior y aportar un valor duradero a tu propiedad."}
        </Reveal>


        <Reveal as="p" className="svc-v2__note" delay={0.2}>
          {lang === "en"
            ? "Service fees are credited 100% on a signed project contract."
            : "Los honorarios se acreditan al 100 % al firmar un contrato de proyecto."}
        </Reveal>
      </div>
    </section>
  );
}

function ServiceCard({ svc, lang, index, onNav }) {
  const [open, setOpen] = useState(false);
  const ref = useReveal();
  const isFeatured = Boolean(svc.badge);
  const serviceRoute = getServiceRouteForId(svc.id);
  return (
    <>
      <article
        ref={ref}
        className={`reveal svc-card${isFeatured ? " svc-card--featured" : ""}`}
        style={{ transitionDelay: `${index * 0.08}s` }}
      >
        <div className="svc-card__top">
          <span className="svc-card__num">{svc.num}</span>
          {svc.badge && <span className="svc-card__badge" {...cmsRecordAttr("service", svc.id, "badge_label")}>{svc.badge[lang]}</span>}
          {svc.tag && !svc.badge && <span className="svc-card__tag" {...cmsRecordAttr("service", svc.id, "tag_label")}>{svc.tag[lang]}</span>}
        </div>
        <h3 className="svc-card__title" {...cmsRecordAttr("service", svc.id, "title")}>{svc.title[lang]}</h3>
        <div className="svc-card__price-row">
          <span className="svc-card__price" {...cmsRecordAttr("service", svc.id, "price_label")}>{svc.price[lang]}</span>
        </div>
        <button className="svc-card__cta" onClick={() => setOpen(true)} data-cms-allow>

          {lang === "en" ? "View details" : "Ver detalles"} <span aria-hidden="true">→</span>
        </button>
        <a
          className="svc-card__seo-link"
          href={routeToPath(serviceRoute)}
          onClick={(event) => {
            event.preventDefault();
            onNav(serviceRoute);
          }}
        >
          {lang === "en" ? "Orlando service page" : "Página del servicio en Orlando"}
        </a>
      </article>
      {open && <ServiceModal svc={svc} lang={lang} onClose={()=>setOpen(false)} onNav={onNav} />}
    </>
  );
}

function ServiceModal({ svc, lang, onClose, onNav }) {
  const rawIncludes = svc.includes?.[lang] ?? svc.includes?.en ?? svc.includes?.fr;
  const includes = Array.isArray(rawIncludes) ? rawIncludes : rawIncludes ? [rawIncludes] : [];
  const details = svc.details ?? svc.detail_sections ?? [];

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e)=>e.stopPropagation()} style={{padding:"60px"}}>
        <button className="modal__close" onClick={onClose} data-cms-allow>×</button>
        <div style={{display:"grid", gridTemplateColumns:"1.2fr 1fr", gap:"60px"}}>
          <div>
            <div className="text-mono text-muted">SERVICE {svc.num}</div>
            <h2 className="display-m" style={{marginTop:"16px"}} {...cmsRecordAttr("service", svc.id, "title")}>{svc.title[lang]}</h2>
            <p style={{fontStyle:"italic", color:"var(--accent)", fontSize:"20px", marginTop:"12px"}} {...cmsRecordAttr("service", svc.id, "subtitle")}>{svc.sub[lang]}</p>
            <p className="lead" style={{marginTop:"24px"}} {...cmsRecordAttr("service", svc.id, "description")}>{svc.description[lang]}</p>

            {includes.length > 0 && <div style={{marginTop:"40px"}}>
              <div className="text-mono text-muted" style={{marginBottom:"16px"}}>{lang==="en"?"WHAT YOU GET":"LO QUE INCLUYE"}</div>
              <ul style={{listStyle:"none", padding:0, margin:0}}>
                {includes.map((it, i) => (
                  <li key={i} style={{padding:"12px 0", borderBottom:"1px solid var(--line)", display:"flex", gap:"16px"}}>
                    <span style={{color:"var(--accent)", fontFamily:"var(--mono)", fontSize:"12px"}}>0{i+1}</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>}

            {svc.not_included && (
              <p style={{marginTop:"24px", padding:"16px", background:"var(--cream-deep)", borderRadius:"8px", fontSize:"13px", color:"var(--muted)"}}>
                <strong>{lang==="en"?"Not included: ":"No incluido: "}</strong><span {...cmsRecordAttr("service", svc.id, "not_included")}>{svc.not_included[lang]}</span>
              </p>
            )}

            {details.length > 0 && (
              <div style={{marginTop:"36px", display:"grid", gap:"18px"}}>
                {details.map((section, sectionIndex) => {
                  const title = section.title?.[lang] || section.title?.en || "";
                  const body = section.body?.[lang] || section.body?.en || "";
                  const items = section.items?.[lang] || section.items?.en || [];
                  return (
                    <div key={`${title}-${sectionIndex}`} style={{paddingTop:"18px", borderTop:"1px solid var(--line)"}}>
                      {title && <div className="text-mono text-muted" style={{marginBottom:"10px"}}>{title}</div>}
                      {body && <p style={{color:"var(--ink-soft)", fontSize:"14px", lineHeight:1.65}}>{body}</p>}
                      {items.length > 0 && (
                        <ul style={{listStyle:"none", padding:0, margin:body ? "12px 0 0" : 0, display:"grid", gap:"8px"}}>
                          {items.map((item, itemIndex) => (
                            <li key={itemIndex} style={{display:"flex", gap:"10px", color:"var(--ink-soft)", fontSize:"14px", lineHeight:1.5}}>
                              <span style={{color:"var(--accent)", lineHeight:1.4}}>•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div>
            <div style={{background:"var(--ink)", color:"var(--cream)", padding:"40px", borderRadius:"16px", marginBottom:"24px"}}>
              <div style={{fontFamily:"var(--mono)", fontSize:"11px", letterSpacing:"0.15em", color:"var(--brass-soft)"}}>{lang==="en"?"SERVICE FEE":"HONORARIOS"}</div>
              <div style={{fontFamily:"var(--serif)", fontSize:"56px", letterSpacing:"-0.03em", marginTop:"16px", lineHeight:1}} {...cmsRecordAttr("service", svc.id, "price_label")}>{svc.price[lang]}</div>
              {svc.deposit && <div style={{marginTop:"24px", paddingTop:"24px", borderTop:"1px solid rgba(244,237,226,0.15)", fontSize:"13px"}}>
                <div className="text-mono" style={{color:"var(--brass-soft)", marginBottom:"8px"}}>DEPOSIT</div>
                <span {...cmsRecordAttr("service", svc.id, "deposit_schedule")}>{svc.deposit[lang]}</span>
              </div>}
              <button className="btn" style={{marginTop:"32px", width:"100%", justifyContent:"center", background:"var(--accent)"}} onClick={()=>{onClose(); onNav("contact");}}>
                {lang==="en"?"Start this project":"Iniciar este proyecto"} <span className="arrow">↗</span>
              </button>
            </div>
            <div style={{padding:"24px", border:"1px solid var(--line)", borderRadius:"16px"}}>
              <div className="text-mono text-muted" style={{marginBottom:"12px"}}>{lang==="en"?"LED BY":"POR"}</div>
              <div style={{display:"flex", flexDirection:"column", gap:"4px", fontFamily:"var(--serif)", fontSize:"22px"}}>
                {svc.led_by.map((n) => <span key={n}>{n}</span>)}
              </div>
            </div>
            {svc.on_site && (
              <p style={{marginTop:"16px", fontSize:"13px", color:"var(--muted)"}}>
                + <span {...cmsRecordAttr("service", svc.id, "onsite_label")}>{svc.on_site[lang]}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body

  );
}

// ============================ FINAL CTA — single button, dark ============================
function FinalCTA({ lang, onNav }) {
  const C = CONTENT.final_cta;
  return (
    <section id="final_cta" className="fcta-v2">
      <div className="fcta-v2__inner">
        <Reveal as="h2" className="fcta-v2__title" {...cmsAttr("final_cta", "title")}>{C.title[lang]}</Reveal>

        <Reveal delay={0.15} className="fcta-v2__cta">
          <button className="btn" onClick={() => onNav("contact")}>
            {lang === "en" ? "Get my free estimate" : "Presupuesto gratuito"} <span className="arrow">↗</span>
          </button>
        </Reveal>
        <Reveal as="p" className="fcta-v2__fineprint" delay={0.25}>
          {lang === "en"
            ? "Free consultation · No commitment · Reply within 48h"
            : "Consulta gratuita · Sin compromiso · Respuesta en 48 h"}
        </Reveal>
      </div>
    </section>
  );
}
