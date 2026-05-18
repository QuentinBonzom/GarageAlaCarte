import React, { useState, useEffect, useRef } from "react";
import { CONTENT } from "../data/content";
import { ImagePlaceholder, Reveal, useReveal } from "../components/common";

export function HomePage({ lang, onNav }) {
  return (
    <div className="page">
      <Hero lang={lang} onNav={onNav} />
      <UseCasesSection lang={lang} onNav={onNav} />
      <BeforeAfterSection lang={lang} />
      <ServicesSection lang={lang} onNav={onNav} />
      <ProcessSection lang={lang} />
      <FinalCTA lang={lang} onNav={onNav} />
    </div>
  );
};

// ============================ HERO — "Your garage, reimagined." ============================
function Hero({ lang, onNav }) {
  const C = CONTENT.hero;
  const cap = CONTENT.hero_caption || {};
  const heroImage = cap.image || cap.after_image || "";
  const heroVideo = cap.video || cap.video_url || "/hero-video.mp4";

  const titleLines = Array.isArray(C.title?.[lang])
    ? C.title[lang]
    : String(C.title?.[lang] || "").split("\n").filter(Boolean);
  const italicWord = C.italic_word?.[lang];

  return (
    <section id="hero" className="hero-v2">
      <div className="hero-v2__media" aria-hidden="true">
        {heroVideo ? (
          <video
            src={heroVideo}
            poster={heroImage || undefined}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : heroImage ? (
          <img src={heroImage} alt="" loading="eager" fetchpriority="high" />
        ) : (
          <div className="hero-v2__placeholder" />
        )}
      </div>
      <div className="hero-v2__scrim" aria-hidden="true" />

      <div className="hero-v2__inner">
        <Reveal as="div" className="hero-v2__locale hero-v2__locale--top">
          <span className="hero-v2__locale-dot" aria-hidden="true" />
          Orlando, FL
        </Reveal>

        <Reveal as="h1" className="hero-v2__title">
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
          <p className="hero-v2__sub">{C.sub[lang]}</p>
          <div className="hero-v2__ctas">
            <button className="btn" onClick={() => onNav("contact")}>
              {C.primary_cta[lang]} <span className="arrow">↗</span>
            </button>
            <button className="btn btn-ghost" onClick={() => onNav("projects")}>
              {C.secondary_cta[lang]}
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
          <Reveal as="div" className="usecases__eyebrow">
            {C.eyebrow?.[lang] || (lang === "en" ? "Transformations" : "Transformations")}
          </Reveal>
          <Reveal as="h2" className="usecases__title">
            {C.title?.[lang] || (lang === "en" ? "Pick your room." : "Choisissez votre pièce.")}
          </Reveal>
          {C.sub?.[lang] && (
            <Reveal as="p" className="usecases__sub" delay={0.1}>{C.sub[lang]}</Reveal>
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

  return (
    <article
      ref={ref}
      className="reveal usecase-card"
      style={{ transitionDelay: `${index * 0.08}s` }}
      onClick={() => onNav?.("contact")}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") onNav?.("contact"); }}
    >
      <div className="usecase-card__media">
        {image ? (
          <img src={image} alt={name} loading="lazy" />
        ) : (
          <ImagePlaceholder label={name || "Transformation"} color="#a89378" style={{ position: "absolute", inset: 0, borderRadius: 0 }} />
        )}
        <span className="usecase-card__index">0{index + 1}</span>
      </div>
      <div className="usecase-card__body">
        <h3 className="usecase-card__name">{name}</h3>
        {tagline && <p className="usecase-card__tagline">{tagline}</p>}
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
          <Reveal as="div" className="ba-v2__eyebrow">
            {lang === "en" ? "The transformation" : "La transformation"}
          </Reveal>
          <Reveal as="h2" className="ba-v2__title">
            {C.title[lang]}
          </Reveal>
        </div>

        <Reveal>
          <BeforeAfterSlider
            beforeSrc={C.before_image}
            afterSrc={C.after_image}
            beforeLabel={lang === "en" ? "Before" : "Avant"}
            afterLabel={lang === "en" ? "After" : "Après"}
            height="clamp(360px, 56vh, 720px)"
          />
        </Reveal>

        <div className="ba-v2__captions">
          <Reveal>
            <div className="ba-v2__caption">
              <span className="ba-v2__caption-label">{lang === "en" ? "Before" : "Avant"}</span>
              <p>{C.before[lang]}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="ba-v2__caption ba-v2__caption--after">
              <span className="ba-v2__caption-label">{lang === "en" ? "After" : "Après"}</span>
              <p>{C.after[lang]}</p>
            </div>
          </Reveal>
        </div>
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
          <Reveal as="div" className="svc-v2__eyebrow">
            {lang === "en" ? "Pricing" : "Tarifs"}
          </Reveal>
          <Reveal as="h2" className="svc-v2__title">{C.title[lang]}</Reveal>
          <Reveal as="p" className="svc-v2__sub" delay={0.1}>{C.sub[lang]}</Reveal>
        </div>

        <div className="svc-v2__grid">
          {C.items.map((s, i) => (
            <ServiceCard key={s.id} svc={s} lang={lang} index={i} onNav={onNav} />
          ))}
        </div>

        <Reveal as="p" className="svc-v2__note" delay={0.2}>
          {lang === "en"
            ? "Service fees are credited 100% on a signed project contract."
            : "Les honoraires sont crédités à 100 % sur un contrat de projet signé."}
        </Reveal>
      </div>
    </section>
  );
}

function ServiceCard({ svc, lang, index, onNav }) {
  const [open, setOpen] = useState(false);
  const ref = useReveal();
  const isFeatured = Boolean(svc.badge);
  return (
    <>
      <article
        ref={ref}
        className={`reveal svc-card${isFeatured ? " svc-card--featured" : ""}`}
        style={{ transitionDelay: `${index * 0.08}s` }}
      >
        <div className="svc-card__top">
          <span className="svc-card__num">{svc.num}</span>
          {svc.badge && <span className="svc-card__badge">{svc.badge[lang]}</span>}
          {svc.tag && !svc.badge && <span className="svc-card__tag">{svc.tag[lang]}</span>}
        </div>
        <h3 className="svc-card__title">{svc.title[lang]}</h3>
        <div className="svc-card__price-row">
          <span className="svc-card__price">{svc.price[lang]}</span>
        </div>
        <button className="svc-card__cta" onClick={() => setOpen(true)}>
          {lang === "en" ? "View details" : "Voir les détails"} <span aria-hidden="true">→</span>
        </button>
      </article>
      {open && <ServiceModal svc={svc} lang={lang} onClose={()=>setOpen(false)} onNav={onNav} />}
    </>
  );
}

function ServiceModal({ svc, lang, onClose, onNav }) {
  const includes = svc.includes?.[lang] ?? [];
  const details = svc.details ?? svc.detail_sections ?? [];
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e)=>e.stopPropagation()} style={{padding:"60px"}}>
        <button className="modal__close" onClick={onClose}>×</button>
        <div style={{display:"grid", gridTemplateColumns:"1.2fr 1fr", gap:"60px"}}>
          <div>
            <div className="text-mono text-muted">SERVICE {svc.num}</div>
            <h2 className="display-m" style={{marginTop:"16px"}}>{svc.title[lang]}</h2>
            <p style={{fontStyle:"italic", color:"var(--accent)", fontSize:"20px", marginTop:"12px"}}>{svc.sub[lang]}</p>
            <p className="lead" style={{marginTop:"24px"}}>{svc.description[lang]}</p>

            {includes.length > 0 && <div style={{marginTop:"40px"}}>
              <div className="text-mono text-muted" style={{marginBottom:"16px"}}>{lang==="en"?"WHAT YOU GET":"CE QUE VOUS RECEVEZ"}</div>
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
                <strong>{lang==="en"?"Not included: ":"Non inclus : "}</strong>{svc.not_included[lang]}
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
              <div style={{fontFamily:"var(--mono)", fontSize:"11px", letterSpacing:"0.15em", color:"var(--brass-soft)"}}>{lang==="en"?"SERVICE FEE":"HONORAIRES"}</div>
              <div style={{fontFamily:"var(--serif)", fontSize:"56px", letterSpacing:"-0.03em", marginTop:"16px", lineHeight:1}}>{svc.price[lang]}</div>
              {svc.deposit && <div style={{marginTop:"24px", paddingTop:"24px", borderTop:"1px solid rgba(244,237,226,0.15)", fontSize:"13px"}}>
                <div className="text-mono" style={{color:"var(--brass-soft)", marginBottom:"8px"}}>DEPOSIT</div>
                {svc.deposit[lang]}
              </div>}
              <button className="btn" style={{marginTop:"32px", width:"100%", justifyContent:"center", background:"var(--accent)"}} onClick={()=>{onClose(); onNav("contact");}}>
                {lang==="en"?"Start this project":"Démarrer ce projet"} <span className="arrow">↗</span>
              </button>
            </div>
            <div style={{padding:"24px", border:"1px solid var(--line)", borderRadius:"16px"}}>
              <div className="text-mono text-muted" style={{marginBottom:"12px"}}>{lang==="en"?"LED BY":"PAR"}</div>
              <div style={{display:"flex", flexDirection:"column", gap:"4px", fontFamily:"var(--serif)", fontSize:"22px"}}>
                {svc.led_by.map((n) => <span key={n}>{n}</span>)}
              </div>
            </div>
            {svc.on_site && (
              <p style={{marginTop:"16px", fontSize:"13px", color:"var(--muted)"}}>
                + {svc.on_site[lang]}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================ PROCESS — "How it works" (4 steps) ============================
function ProcessSection({ lang }) {
  const C = CONTENT.process;
  return (
    <section id="process_intro" className="process-v2">
      <div className="process-v2__inner">
        <div className="process-v2__head">
          <Reveal as="div" className="process-v2__eyebrow">
            {lang === "en" ? "How it works" : "Comment ça marche"}
          </Reveal>
          <Reveal as="h2" className="process-v2__title">{C.title[lang]}</Reveal>
        </div>

        <div className="process-v2__grid">
          {C.steps.map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="process-step">
                <span className="process-step__num">{s.num}</span>
                <h3 className="process-step__title">{s.title[lang]}</h3>
                <p className="process-step__text">{s.text[lang]}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================ FINAL CTA — single button, dark ============================
function FinalCTA({ lang, onNav }) {
  const C = CONTENT.final_cta;
  return (
    <section id="final_cta" className="fcta-v2">
      <div className="fcta-v2__inner">
        <Reveal as="h2" className="fcta-v2__title">{C.title[lang]}</Reveal>
        <Reveal delay={0.15} className="fcta-v2__cta">
          <button className="btn" onClick={() => onNav("contact")}>
            {lang === "en" ? "Get my free estimate" : "Devis gratuit"} <span className="arrow">↗</span>
          </button>
        </Reveal>
        <Reveal as="p" className="fcta-v2__fineprint" delay={0.25}>
          {lang === "en"
            ? "Free 30-min consultation · No commitment · Reply within 48h"
            : "Consultation 30 min · Sans engagement · Réponse sous 48h"}
        </Reveal>
      </div>
    </section>
  );
}
