import React, { useState, useEffect, useRef } from "react";
import { CONTENT } from "../data/content";
import { Counter, ImagePlaceholder, Marquee, Reveal, useReveal } from "../components/common";

export function HomePage({ lang, onNav }) {
  const C = CONTENT;
  return (
    <div className="page">
      <Hero lang={lang} onNav={onNav} />
      <div id="marquee_words"><Marquee words={C.marquee_words[lang]} /></div>
      <VisualStrip lang={lang} />
      <BeforeAfterSection lang={lang} />
      <ServicesSection lang={lang} onNav={onNav} />
      <WhySection lang={lang} />
      <AudienceSection lang={lang} />
      <ProcessSection lang={lang} />
      <FinalCTA lang={lang} onNav={onNav} />
    </div>
  );
};

// ============================ HERO with single immersive image ============================
function Hero({ lang, onNav }) {
  const C = CONTENT.hero;
  const cap = CONTENT.hero_caption;
  const heroImage = cap.image || cap.after_image;

  return (
    <section id="hero" className="section hero" style={{padding:0, position:"relative"}}>
      <div className="hero__stage" style={{
        position:"relative",
        width:"100%",
        height:"min(92vh, 880px)",
        minHeight:"560px",
        overflow:"hidden",
        background:"var(--ink)"
      }}>
        {/* Single hero image */}
        {heroImage ? (
          <img
            src={heroImage}
            alt={cap.featured_title?.[lang] || "Garage à la carte"}
            style={{position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", display:"block"}}
            draggable={false}
          />
        ) : (
          <>
            <ImagePlaceholder
              label={cap.featured_title?.[lang] || "The Social Hub"}
              color="#3a2c22"
              style={{position:"absolute", inset:0, borderRadius:0}}
            />
            <div style={{position:"absolute", inset:0, background:"radial-gradient(circle at 65% 40%, rgba(184,85,58,0.25), transparent 60%)"}}></div>
          </>
        )}

        {/* Readability scrim for text overlay */}
        <div className="hero__scrim" style={{
          position:"absolute", inset:0, pointerEvents:"none",
          background:"linear-gradient(180deg, rgba(10,37,64,0.55) 0%, rgba(10,37,64,0.25) 35%, rgba(10,37,64,0.15) 60%, rgba(10,37,64,0.75) 100%)"
        }}></div>

        {/* Foreground content overlay */}
        <div className="hero__overlay" style={{
          position:"absolute", inset:0,
          padding:"96px clamp(20px, 4vw, 80px) 56px",
          pointerEvents:"none"
        }}>
        <div className="container hero__container" style={{
          height:"100%",
          display:"flex", flexDirection:"column", justifyContent:"flex-end",
          position:"relative"
        }}>
          {/* Meta */}
          <div className="hero__meta text-mono" style={{
            position:"absolute", top:"24px", left:"50%", transform:"translateX(-50%)",
            color:"rgba(255,248,240,0.7)"
          }}></div>

          {/* Title */}
          <Reveal as="h1" className="hero__title" style={{
            color:"var(--cream)",
            fontFamily:"var(--serif)",
            fontSize:"clamp(36px, 5.2vw, 84px)",
            letterSpacing:"-0.03em",
            lineHeight:0.98,
            maxWidth:"20ch",
            textShadow:"0 2px 24px rgba(0,0,0,0.35)"
          }}>
            {(Array.isArray(C.title?.[lang]) ? C.title[lang] : String(C.title?.[lang] || "").split("\n")).map((line, i) => {
              const words = String(line).split(" ");
              return (
                <span key={i} style={{display:"block"}}>
                  {words.map((w, j) => {
                    const isItalic = w === C.italic_word?.[lang];
                    return isItalic
                      ? <em key={j} className="italic" style={{color:"var(--accent)"}}>{w}{j < words.length-1 ? " " : ""}</em>
                      : <React.Fragment key={j}>{w}{j < words.length-1 ? " " : ""}</React.Fragment>;
                  })}
                </span>
              );
            })}
          </Reveal>

          {/* Sub + CTAs */}
          <div className="hero__cta-row" style={{
            display:"grid", gridTemplateColumns:"minmax(0, 1fr) auto", gap:"40px",
            marginTop:"32px", alignItems:"end", pointerEvents:"auto"
          }}>
            <Reveal delay={0.15} className="hero__sub-wrap">
              <p className="hero__sub" style={{
                color:"rgba(255,248,240,0.88)",
                fontSize:"clamp(15px, 1.15vw, 18px)",
                lineHeight:1.5,
                maxWidth:"52ch",
                textShadow:"0 1px 12px rgba(0,0,0,0.3)"
              }}>{C.sub[lang]}</p>
            </Reveal>
            <Reveal delay={0.25} className="hero__ctas" style={{display:"flex", gap:"12px", flexWrap:"wrap", justifyContent:"flex-end"}}>
              <button className="btn" onClick={()=>onNav("contact")}>{C.primary_cta[lang]} <span className="arrow">↗</span></button>
              <button className="btn btn-ghost hero__ghost" style={{color:"var(--cream)", borderColor:"rgba(255,248,240,0.55)"}} onClick={()=>onNav("contact")}>{C.secondary_cta[lang]}</button>
            </Reveal>
          </div>

          {/* Featured project caption */}
          <div className="hero__featured" style={{
            marginTop:"28px", paddingTop:"20px",
            borderTop:"1px solid rgba(255,248,240,0.18)",
            display:"flex", justifyContent:"space-between", alignItems:"baseline",
            color:"var(--cream)", gap:"24px", flexWrap:"wrap"
          }}>
            <div style={{display:"flex", alignItems:"baseline", gap:"16px", flexWrap:"wrap"}}>
              <div className="text-mono" style={{color:"rgba(255,248,240,0.55)"}}>{cap.featured_label?.[lang] || "FEATURED PROJECT"}</div>
              <div style={{fontFamily:"var(--serif)", fontSize:"clamp(18px, 1.8vw, 24px)", letterSpacing:"-0.02em"}}>{cap.featured_title?.[lang] || "The Social Hub"}</div>
            </div>
            <div className="hero__featured-link text-mono" style={{color:"rgba(255,248,240,0.55)"}}>{cap.label?.[lang] || (lang === "en" ? "Featured project" : "Projet phare")} →</div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

// ============================ VISUAL STRIP (Aymeric & Juliette) ============================
function VisualStrip({ lang }) {
  const C = CONTENT.visual_strip;
  return (
    <section id="visual_strip" className="section" style={{paddingTop:"80px", paddingBottom:"40px"}}>
      <div className="container">
        <div style={{display:"grid", gridTemplateColumns:"1fr 1.3fr", gap:"60px", alignItems:"center"}}>
          <Reveal>
            <h2 className="display-l" style={{marginTop:"24px", maxWidth:"14ch"}}>
              {C.title[lang].split(".").map((s, i, a) =>
                s.trim() ? <span key={i} style={{display:"block"}}>{s.trim()}{i < a.length-1 && i < a.length-2 ? "." : "."}</span> : null
              )}
            </h2>
            <p className="lead" style={{marginTop:"24px"}}>{C.sub[lang]}</p>
            <div style={{display:"flex", gap:"40px", marginTop:"32px", paddingTop:"32px", borderTop:"1px solid var(--line)"}}>
              <div>
                <div className="text-mono text-muted">AYMERIC</div>
                <div style={{fontFamily:"var(--serif)", fontSize:"22px", marginTop:"4px"}}>3D & layout</div>
              </div>
              <div>
                <div className="text-mono text-muted">JULIETTE</div>
                <div style={{fontFamily:"var(--serif)", fontSize:"22px", marginTop:"4px"}}>Atmosphere</div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px", height:"540px"}}>
              <VisualStripSlot src={C.plan_image} label="3D PLAN · TOP-DOWN" color="#a89378" style={{height:"100%", borderRadius:"16px"}} />
              <div style={{display:"grid", gridTemplateRows:"1fr 1fr", gap:"16px"}}>
                <VisualStripSlot src={C.mood_image} label="MOOD · MATERIALS" color="#5a4334" style={{borderRadius:"16px"}} />
                <VisualStripSlot src={C.interior_image} label="3D · INTERIOR VIEW" color="#3a2c22" style={{borderRadius:"16px"}} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ============================ BEFORE / AFTER STORY (drag slider) ============================
function BeforeAfterSection({ lang }) {
  const C = CONTENT.before_after;
  return (
    <section id="before_after" className="section">
      <div className="container">
        <div style={{display:"flex", justifyContent:"flex-end", alignItems:"baseline", marginBottom:"60px"}}>
        </div>
        <Reveal as="h2" className="display-l" style={{maxWidth:"20ch", marginBottom:"56px"}}>
          {C.title[lang]}
        </Reveal>

        <Reveal>
          <BeforeAfterSlider
            beforeSrc={C.before_image}
            afterSrc={C.after_image}
            beforeLabel={lang === "en" ? "Before" : "Avant"}
            afterLabel={lang === "en" ? "After" : "Après"}
            height="min(70vh, 680px)"
          />
        </Reveal>

        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"40px", marginTop:"40px"}}>
          <Reveal>
            <p className="lead" style={{fontSize:"18px"}}>{C.before[lang]}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="lead" style={{fontSize:"18px"}}>{C.after[lang]}</p>
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
        width:"2px", background:"var(--cream)",
        boxShadow:"0 0 24px rgba(0,0,0,0.4)",
        pointerEvents:"none"
      }}>
        <div style={{
          position:"absolute", top:"50%", left:"50%", transform:"translate(-50%, -50%)",
          width:"56px", height:"56px", borderRadius:"50%",
          background:"var(--cream)", border:"1px solid rgba(0,0,0,0.1)",
          display:"flex", alignItems:"center", justifyContent:"center",
          color:"var(--ink)", fontFamily:"var(--mono)", fontSize:"18px",
          boxShadow:"0 8px 32px rgba(0,0,0,0.3)"
        }}>⇄</div>
      </div>

      {/* Labels */}
      <div style={{position:"absolute", top:"24px", left:"24px", pointerEvents:"none"}}>
        <span className="tag" style={{background:"rgba(255,248,240,0.95)"}}>{beforeLabel}</span>
      </div>
      <div style={{position:"absolute", top:"24px", right:"24px", pointerEvents:"none"}}>
        <span className="tag" style={{background:"var(--accent)", color:"var(--cream)"}}>{afterLabel}</span>
      </div>
    </div>
  );
}

function VisualStripSlot({ src, label, color, style }) {
  if (src) {
    return (
      <img
        src={src}
        alt={label}
        style={{ ...style, width: "100%", objectFit: "cover", display: "block" }}
      />
    );
  }
  return <ImagePlaceholder label={label} color={color} style={style} />;
}

// ============================ SERVICES ============================
function ServicesSection({ lang, onNav }) {
  const C = CONTENT.services;
  return (
    <section id="services_intro" className="section" style={{background:"var(--paper)"}}>
      <div className="container">
        <div style={{display:"grid", gridTemplateColumns:"1fr 1.2fr", gap:"60px", marginBottom:"80px"}}>
          <Reveal>
            <h2 className="display-l" style={{marginTop:"24px"}}>{C.title[lang]}</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="lead" style={{marginTop:"40px"}}>{C.sub[lang]}</p>
          </Reveal>
        </div>

        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))", gap:"24px"}}>
          {C.items.map((s, i) => (
            <ServiceCard key={s.id} svc={s} lang={lang} index={i} onNav={onNav} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ svc, lang, index, onNav }) {
  const [open, setOpen] = useState(false);
  const ref = useReveal();
  return (
    <>
      <div
        ref={ref}
        className="reveal card hoverable service-card"
        style={{ transitionDelay: `${index * 0.08}s` }}
        onClick={() => setOpen(true)}
      >
        <div className="service-card__head">
          <div className="service-card__num">{svc.num}</div>
          {svc.badge && <span className="tag">{svc.badge[lang]}</span>}
          {svc.tag && !svc.badge && <span className="tag">{svc.tag[lang]}</span>}
        </div>
        <h3 className="service-card__title">{svc.title[lang]}</h3>
        <p className="service-card__sub">{svc.sub[lang]}</p>
        <p className="service-card__desc">{svc.description[lang]}</p>
        <div className="service-card__foot">
          <div>
            <div className="text-mono text-muted service-card__fee-label">{lang === "en" ? "Service fee" : "Honoraires"}</div>
            <div className="service-card__price">{svc.price[lang]}</div>
          </div>
          <div className="service-card__cta text-mono">{lang === "en" ? "View details" : "Détails"} →</div>
        </div>
      </div>
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

// ============================ WHY ============================
function WhySection({ lang }) {
  const C = CONTENT.why;
  return (
    <section id="why" className="section">
      <div className="container">
        <Reveal as="h2" className="display-l" style={{marginTop:"32px", maxWidth:"22ch"}}>{C.title[lang]}</Reveal>
        <Reveal delay={0.15}>
          <p className="lead" style={{marginTop:"32px", maxWidth:"60ch"}}>{C.sub[lang]}</p>
        </Reveal>
        <div style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:"24px", marginTop:"80px", borderTop:"1px solid var(--line)", paddingTop:"60px"}}>
          {C.stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{fontFamily:"var(--serif)", fontSize:"clamp(72px, 9vw, 144px)", letterSpacing:"-0.04em", lineHeight:0.9, color:"var(--ink)"}}>
                <Counter to={s.num} suffix={s.suffix||""} />
              </div>
              <div className="text-mono" style={{marginTop:"16px", color:"var(--muted)"}}>{s.label[lang]}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================ AUDIENCE ============================
function AudienceSection({ lang }) {
  const C = CONTENT.audience;
  const slotImages = [C.homeowners_image, C.agents_image, C.developers_image];
  const slotMeta = [
    { color: "#c4a575", label: lang === "en" ? "LIFESTYLE GARAGE" : "GARAGE À VIVRE" },
    { color: "#5a4334", label: lang === "en" ? "BUYER POTENTIAL" : "POTENTIEL ACHETEUR" },
    { color: "#a89378", label: lang === "en" ? "PROPERTY VALUE" : "VALEUR DU BIEN" }
  ];

  return (
    <section id="audience" className="section">
      <div className="container">
        <Reveal as="h2" className="display-l" style={{marginTop:"24px", maxWidth:"22ch"}}>{C.title[lang]}</Reveal>
        <div className="audience-grid">
          {C.items.map((it, i) => {
            const src = slotImages[i] || "";
            const meta = slotMeta[i] || slotMeta[0];
            return (
              <Reveal key={i} delay={i * 0.1}>
                <div className="card audience-card">
                  <ImagePlaceholder
                    src={src}
                    alt={it.title[lang]}
                    color={meta.color}
                    label={!src ? meta.label : undefined}
                    style={{height:"100%", borderRadius:"14px"}}
                  />
                  <div className="audience-card__body">
                    <div className="audience-card__meta">
                      <span className="text-mono text-muted">0{i+1}</span>
                    </div>
                    <h3 className="display-s">{it.title[lang]}</h3>
                    <p style={{color:"var(--muted)", marginTop:"16px", fontSize:"15px", lineHeight:1.6}}>{it.text[lang]}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================ PROCESS ============================
function ProcessSection({ lang }) {
  const C = CONTENT.process;
  return (
    <section id="process_intro" className="section" style={{background:"var(--paper)"}}>
      <div className="container">
        <Reveal as="h2" className="display-l" style={{marginTop:"24px"}}>{C.title[lang]}</Reveal>
        <div style={{marginTop:"80px"}}>
          {C.steps.map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div style={{display:"grid", gridTemplateColumns:"100px 1fr 2fr", gap:"40px", padding:"40px 0", borderTop:"1px solid var(--line)", alignItems:"baseline"}}>
                <div style={{fontFamily:"var(--mono)", fontSize:"14px", color:"var(--accent)", letterSpacing:"0.1em"}}>{s.num}</div>
                <h3 style={{fontFamily:"var(--serif)", fontSize:"clamp(28px, 3vw, 44px)", letterSpacing:"-0.02em"}}>{s.title[lang]}</h3>
                <p style={{color:"var(--muted)", fontSize:"17px", lineHeight:1.5}}>{s.text[lang]}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================ FINAL CTA ============================
function FinalCTA({ lang, onNav }) {
  const C = CONTENT.final_cta;
  return (
    <section id="final_cta" className="section" style={{paddingTop:"160px", paddingBottom:"160px"}}>
      <div className="container" style={{textAlign:"center"}}>
        <Reveal as="h2" className="display-l" style={{maxWidth:"22ch", margin:"0 auto"}}>{C.title[lang]}</Reveal>
        <Reveal delay={0.15}>
          <p className="lead" style={{margin:"32px auto 0", textAlign:"center"}}>{C.sub[lang]}</p>
        </Reveal>
        <Reveal delay={0.25} style={{marginTop:"48px", display:"flex", justifyContent:"center", gap:"16px", flexWrap:"wrap"}}>
          <button className="btn" onClick={()=>onNav("contact")}>{lang==="en"?"Get my free estimate":"Devis gratuit"} <span className="arrow">↗</span></button>
          <button className="btn btn-ghost" onClick={()=>onNav("projects")}>{lang==="en"?"See projects":"Voir les réalisations"}</button>
        </Reveal>
      </div>
    </section>
  );
}
