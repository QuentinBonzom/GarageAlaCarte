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
      <TeamSection lang={lang} />
      <AudienceSection lang={lang} />
      <ProcessSection lang={lang} />
      <FinalCTA lang={lang} onNav={onNav} />
    </div>
  );
};

// ============================ HERO with before/after drag ============================
function Hero({ lang, onNav }) {
  const C = CONTENT.hero;
  const cap = CONTENT.hero_caption;
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
    <section id="hero" className="section" style={{paddingTop:"60px", paddingBottom:"80px"}}>
      <div className="container">
        {/* Top row: eyebrow + meta */}
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"60px", flexWrap:"wrap", gap:"20px"}}>
          <div className="eyebrow">{C.eyebrow[lang]}</div>
          <div className="text-mono text-muted">N° 2026 / 001</div>
        </div>

        {/* Big title */}
        <Reveal as="h1" className="display-xl" style={{maxWidth:"18ch"}}>
          {C.title[lang].map((line, i) => {
            const words = line.split(" ");
            return (
              <span key={i} style={{display:"block", lineHeight:0.95}}>
                {words.map((w, j) => {
                  const isItalic = w === C.italic_word[lang];
                  return isItalic
                    ? <em key={j} className="italic" style={{color:"var(--accent)"}}>{w}{j < words.length-1 ? " " : ""}</em>
                    : <React.Fragment key={j}>{w}{j < words.length-1 ? " " : ""}</React.Fragment>;
                })}
              </span>
            );
          })}
        </Reveal>

        {/* Sub + CTAs row */}
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"60px", marginTop:"60px", alignItems:"end"}}>
          <Reveal delay={0.15}>
            <p className="lead">{C.sub[lang]}</p>
          </Reveal>
          <Reveal delay={0.25} style={{display:"flex", gap:"16px", flexWrap:"wrap", justifyContent:"flex-end"}}>
            <button className="btn" onClick={()=>onNav("contact")}>{C.primary_cta[lang]} <span className="arrow">↗</span></button>
            <button className="btn btn-ghost" onClick={()=>onNav("contact")}>{C.secondary_cta[lang]}</button>
          </Reveal>
        </div>

        {/* HERO BEFORE/AFTER */}
        <Reveal delay={0.3} style={{marginTop:"80px"}}>
          <div
            ref={containerRef}
            style={{
              position:"relative",
              width:"100%",
              height:"min(72vh, 760px)",
              borderRadius:"24px",
              overflow:"hidden",
              userSelect:"none",
              touchAction:"none",
              cursor:"ew-resize"
            }}
            onMouseDown={onDown}
            onTouchStart={onDown}
          >
            {/* AFTER (full) */}
            <ImagePlaceholder
              label={`${cap.after[lang]} · The Social Hub`}
              color="#3a2c22"
              style={{position:"absolute", inset:0, borderRadius:0}}
            />
            <div style={{position:"absolute", inset:0, background:"radial-gradient(circle at 65% 40%, rgba(184,85,58,0.25), transparent 60%)"}}></div>

            {/* BEFORE (clipped) */}
            <div style={{position:"absolute", inset:0, clipPath:`inset(0 ${100-pos}% 0 0)`}}>
              <ImagePlaceholder
                label={`${cap.before[lang]} · cluttered storage`}
                color="#7a6450"
                style={{position:"absolute", inset:0, borderRadius:0, filter:"saturate(0.5) brightness(0.85)"}}
              />
              <div style={{position:"absolute", inset:0, background:"repeating-linear-gradient(0deg, transparent, transparent 12px, rgba(0,0,0,0.05) 12px, rgba(0,0,0,0.05) 13px)"}}></div>
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
            <div style={{position:"absolute", top:"24px", left:"24px"}}>
              <span className="tag" style={{background:"rgba(244,237,226,0.95)"}}>{cap.before[lang]}</span>
            </div>
            <div style={{position:"absolute", top:"24px", right:"24px"}}>
              <span className="tag" style={{background:"var(--accent)", color:"var(--cream)"}}>{cap.after[lang]}</span>
            </div>
            <div style={{position:"absolute", bottom:"24px", left:"24px", right:"24px", display:"flex", justifyContent:"space-between", alignItems:"flex-end", color:"var(--cream)"}}>
              <div>
                <div className="text-mono" style={{color:"rgba(244,237,226,0.6)"}}>FEATURED PROJECT</div>
                <div style={{fontFamily:"var(--serif)", fontSize:"32px", letterSpacing:"-0.02em", marginTop:"4px"}}>The Social Hub</div>
              </div>
              <div className="text-mono" style={{color:"rgba(244,237,226,0.6)"}}>{cap.label[lang]} →</div>
            </div>
          </div>
        </Reveal>
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
            <div className="eyebrow">{C.eyebrow[lang]}</div>
            <h2 className="display-m" style={{marginTop:"24px", maxWidth:"14ch"}}>
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
              <ImagePlaceholder label="3D PLAN · TOP-DOWN" color="#a89378" style={{height:"100%", borderRadius:"16px"}} />
              <div style={{display:"grid", gridTemplateRows:"1fr 1fr", gap:"16px"}}>
                <ImagePlaceholder label="MOOD · MATERIALS" color="#5a4334" style={{borderRadius:"16px"}} />
                <ImagePlaceholder label="3D · INTERIOR VIEW" color="#3a2c22" style={{borderRadius:"16px"}} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ============================ BEFORE / AFTER STORY ============================
function BeforeAfterSection({ lang }) {
  const C = CONTENT.before_after;
  return (
    <section id="before_after" className="section">
      <div className="container">
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:"60px"}}>
          <div className="eyebrow">{C.eyebrow[lang]}</div>
          <div className="text-mono text-muted">02 / 08</div>
        </div>
        <Reveal as="h2" className="display-l" style={{maxWidth:"20ch", marginBottom:"80px"}}>
          {C.title[lang]}
        </Reveal>

        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"40px"}}>
          <Reveal>
            <div style={{position:"relative"}}>
              <ImagePlaceholder label="BEFORE · garage clutter" color="#7a6450" style={{height:"500px", borderRadius:"16px", filter:"saturate(0.6) brightness(0.85)"}} />
              <div style={{position:"absolute", top:"24px", left:"24px"}}>
                <span className="tag" style={{background:"var(--cream)"}}>Before</span>
              </div>
            </div>
            <p className="lead" style={{marginTop:"24px", fontSize:"18px"}}>{C.before[lang]}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <div style={{position:"relative"}}>
              <ImagePlaceholder label="AFTER · Social Hub" color="#3a2c22" style={{height:"500px", borderRadius:"16px"}} />
              <div style={{position:"absolute", top:"24px", left:"24px"}}>
                <span className="tag" style={{background:"var(--accent)", color:"var(--cream)"}}>After</span>
              </div>
            </div>
            <p className="lead" style={{marginTop:"24px", fontSize:"18px"}}>{C.after[lang]}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ============================ SERVICES ============================
function ServicesSection({ lang, onNav }) {
  const C = CONTENT.services;
  return (
    <section id="services_intro" className="section" style={{background:"var(--paper)"}}>
      <div className="container">
        <div style={{display:"grid", gridTemplateColumns:"1fr 1.2fr", gap:"60px", marginBottom:"80px"}}>
          <Reveal>
            <div className="eyebrow">{C.eyebrow[lang]}</div>
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
        className="reveal card hoverable"
        style={{
          transitionDelay: `${index * 0.08}s`,
          minHeight:"460px", display:"flex", flexDirection:"column", justifyContent:"space-between",
          cursor:"pointer"
        }}
        onClick={() => setOpen(true)}
      >
        <div>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"32px"}}>
            <div style={{fontFamily:"var(--mono)", fontSize:"12px", letterSpacing:"0.15em", color:"var(--brass)"}}>{svc.num}</div>
            {svc.badge && <span className="tag">{svc.badge[lang]}</span>}
            {svc.tag && !svc.badge && <span className="tag">{svc.tag[lang]}</span>}
          </div>
          <h3 className="display-s">{svc.title[lang]}</h3>
          <p style={{fontStyle:"italic", color:"var(--accent)", marginTop:"8px", fontSize:"15px"}}>{svc.sub[lang]}</p>
          <p style={{color:"var(--muted)", marginTop:"24px", fontSize:"14px", lineHeight:1.6}}>{svc.description[lang]}</p>
        </div>
        <div>
          <div style={{borderTop:"1px solid var(--line)", paddingTop:"20px", marginTop:"32px", display:"flex", justifyContent:"space-between", alignItems:"baseline"}}>
            <div>
              <div className="text-mono text-muted" style={{marginBottom:"4px"}}>{lang==="en"?"Service fee":"Honoraires"}</div>
              <div style={{fontFamily:"var(--serif)", fontSize:"24px", letterSpacing:"-0.02em"}}>{svc.price[lang]}</div>
            </div>
            <div style={{fontFamily:"var(--mono)", fontSize:"11px", color:"var(--muted)"}}>{lang==="en"?"View details":"Détails"} →</div>
          </div>
        </div>
      </div>
      {open && <ServiceModal svc={svc} lang={lang} onClose={()=>setOpen(false)} onNav={onNav} />}
    </>
  );
}

function ServiceModal({ svc, lang, onClose, onNav }) {
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

            <div style={{marginTop:"40px"}}>
              <div className="text-mono text-muted" style={{marginBottom:"16px"}}>{lang==="en"?"WHAT YOU GET":"CE QUE VOUS RECEVEZ"}</div>
              <ul style={{listStyle:"none", padding:0, margin:0}}>
                {svc.includes[lang].map((it, i) => (
                  <li key={i} style={{padding:"12px 0", borderBottom:"1px solid var(--line)", display:"flex", gap:"16px"}}>
                    <span style={{color:"var(--accent)", fontFamily:"var(--mono)", fontSize:"12px"}}>0{i+1}</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>

            {svc.not_included && (
              <p style={{marginTop:"24px", padding:"16px", background:"var(--cream-deep)", borderRadius:"8px", fontSize:"13px", color:"var(--muted)"}}>
                <strong>{lang==="en"?"Not included: ":"Non inclus : "}</strong>{svc.not_included[lang]}
              </p>
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
        <div className="eyebrow">{C.eyebrow[lang]}</div>
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

// ============================ TEAM ============================
function TeamSection({ lang }) {
  const C = CONTENT.team;
  return (
    <section id="team_intro" className="section" style={{background:"var(--ink)", color:"var(--cream)"}}>
      <div className="container">
        <div style={{display:"grid", gridTemplateColumns:"1fr 1.2fr", gap:"60px", marginBottom:"60px"}}>
          <Reveal>
            <div className="eyebrow" style={{color:"var(--brass-soft)"}}>{C.eyebrow[lang]}</div>
            <h2 className="display-l" style={{marginTop:"24px"}}>{C.title[lang]}</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="lead" style={{color:"rgba(244,237,226,0.7)", marginTop:"40px"}}>{C.sub[lang]}</p>
          </Reveal>
        </div>
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))", gap:"24px"}}>
          {C.members.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.08}>
              <div style={{padding:"32px", border:"1px solid rgba(244,237,226,0.15)", borderRadius:"16px", height:"100%", background:"rgba(255,255,255,0.02)", transition:"background 0.3s"}}
                   className="hoverable">
                <ImagePlaceholder color={["#5a4334", "#7a6450", "#a89378", "#3a2c22"][i % 4]} style={{height:"320px", marginBottom:"24px", borderRadius:"12px"}} label={`PORTRAIT · ${m.name.toUpperCase()}`} />
                <div style={{fontFamily:"var(--serif)", fontSize:"32px", letterSpacing:"-0.02em"}}>{m.name}</div>
                <div className="text-mono" style={{color:"var(--brass-soft)", marginTop:"8px"}}>{m.role[lang]}</div>
                <p style={{color:"rgba(244,237,226,0.6)", fontSize:"13px", marginTop:"16px", lineHeight:1.6}}>{m.bio[lang]}</p>
              </div>
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
  return (
    <section id="audience" className="section">
      <div className="container">
        <div className="eyebrow">{C.eyebrow[lang]}</div>
        <Reveal as="h2" className="display-l" style={{marginTop:"24px", maxWidth:"22ch"}}>{C.title[lang]}</Reveal>
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))", gap:"24px", marginTop:"80px"}}>
          {C.items.map((it, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="card" style={{minHeight:"360px", display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
                <div className="text-mono text-muted">0{i+1}</div>
                <div>
                  <h3 className="display-s">{it.title[lang]}</h3>
                  <p style={{color:"var(--muted)", marginTop:"16px", fontSize:"15px", lineHeight:1.6}}>{it.text[lang]}</p>
                </div>
              </div>
            </Reveal>
          ))}
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
        <div className="eyebrow">{C.eyebrow[lang]}</div>
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
        <Reveal as="h2" className="display-xl" style={{maxWidth:"18ch", margin:"0 auto"}}>{C.title[lang]}</Reveal>
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
