import { useState } from "react";
import { CONTENT } from "../data/content";
import { ImagePlaceholder, Reveal, useReveal } from "../components/common";

export function ProjectsPage({ lang, onNav }) {
  const C = CONTENT.projects_page;
  const projects = CONTENT.projects;
  const [active, setActive] = useState(null);
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? projects : filter === "live" ? projects.filter(p => !p.placeholder) : [];

  return (
    <div className="page">
      <section id="projects_page" className="section" style={{paddingTop:"60px", paddingBottom:"40px"}}>
        <div className="container">
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:"40px"}}>
            <div className="eyebrow">{text(C.eyebrow, lang)}</div>
            <div className="text-mono text-muted">{filtered.length} / {projects.length}</div>
          </div>
          <Reveal as="h1" className="display-xl" style={{maxWidth:"16ch"}}>{text(C.title, lang)}</Reveal>
          <Reveal delay={0.15} style={{display:"grid", gridTemplateColumns:"1fr auto", gap:"40px", alignItems:"end", marginTop:"40px"}}>
            <p className="lead">{text(C.sub, lang)}</p>
            <div style={{display:"flex", gap:"4px", padding:"4px", border:"1px solid var(--line-strong)", borderRadius:"100px", fontFamily:"var(--mono)", fontSize:"11px"}}>
              {[
                {id:"all", l:lang==="en"?"All":"Tous"},
                {id:"live", l:lang==="en"?"Built":"Réalisés"},
                {id:"upcoming", l:lang==="en"?"Coming":"À venir"}
              ].map(f => (
                <button key={f.id} onClick={()=>setFilter(f.id)} style={{padding:"8px 16px", borderRadius:"100px", border:0, background: filter===f.id ? "var(--ink)" : "transparent", color: filter===f.id ? "var(--cream)" : "var(--muted)", letterSpacing:"0.1em", textTransform:"uppercase"}}>{f.l}</button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Masonry grid */}
      <section className="section" style={{paddingTop:"40px"}}>
        <div className="container">
          <div className="projects-grid" style={{display:"grid", gridTemplateColumns:"repeat(12, 1fr)", gap:"24px", gridAutoRows:"100px"}}>
            {filtered.map((p, i) => {
              const layout = getLayout(i, p);
              return <ProjectTile key={p.id} project={p} lang={lang} layout={layout} onClick={()=>!p.placeholder && setActive(p)} index={i} />;
            })}
            {!filtered.length && (
              <div style={{gridColumn:"1 / -1", padding:"80px 20px", textAlign:"center", color:"var(--muted)"}}>
                {lang==="en"?"No project in this view yet.":"Aucun projet dans cette vue pour le moment."}
              </div>
            )}
          </div>
        </div>
      </section>

      {active && <ProjectModal project={active} lang={lang} onClose={()=>setActive(null)} onNav={onNav} />}
    </div>
  );
};

function getLayout(i, p) {
  // asymmetric masonry
  const patterns = [
    { col: "span 8", row: "span 5" },   // big
    { col: "span 4", row: "span 3" },
    { col: "span 4", row: "span 4" },
    { col: "span 4", row: "span 3" },
    { col: "span 8", row: "span 4" },
    { col: "span 4", row: "span 4" },
    { col: "span 4", row: "span 3" },
    { col: "span 4", row: "span 5" },
    { col: "span 4", row: "span 3" }
  ];
  return patterns[i % patterns.length];
}

function ProjectTile({ project, lang, layout, onClick, index }) {
  const ref = useReveal();
  const [hover, setHover] = useState(false);
  const isPh = project.placeholder;
  const heroImage = getProjectImage(project);
  const projectName = text(project.name, lang, lang === "en" ? "Untitled project" : "Projet sans titre");
  const tagline = text(project.tagline, lang, "");
  const size = text(project.size, lang, lang === "en" ? "Size TBD" : "Taille à définir");
  const service = text(project.service, lang, lang === "en" ? "Project" : "Projet");

  return (
    <div
      ref={ref}
      className="reveal hoverable"
      style={{
        gridColumn: layout.col,
        gridRow: layout.row,
        position:"relative",
        borderRadius:"16px",
        overflow:"hidden",
        cursor: isPh ? "default" : "pointer",
        transitionDelay: `${index * 0.05}s`,
        opacity: isPh ? 0.55 : 1
      }}
      onClick={onClick}
      onMouseEnter={()=>setHover(true)}
      onMouseLeave={()=>setHover(false)}
    >
      <ImagePlaceholder
        label={isPh ? "COMING SOON" : heroImage?.label}
        color={heroImage?.color || "#70675d"}
        src={heroImage?.url}
        alt={text(heroImage?.alt, lang, projectName)}
        style={{position:"absolute", inset:0, borderRadius:"16px", transform: hover && !isPh ? "scale(1.04)" : "scale(1)", transition:"transform 0.6s cubic-bezier(.2,.7,.3,1)"}}
      />
      <div style={{position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)"}}></div>

      {/* Top tags */}
      <div style={{position:"absolute", top:"20px", left:"20px", right:"20px", display:"flex", justifyContent:"space-between", alignItems:"flex-start"}}>
        <span className="tag" style={{background: isPh ? "rgba(244,237,226,0.85)" : "var(--cream)"}}>{isPh ? (lang==="en"?"Upcoming":"À venir") : (project.year || "—")}</span>
        {!isPh && <span className="tag" style={{background:"var(--accent)", color:"var(--cream)"}}>{service}</span>}
      </div>

      {/* Bottom info */}
      <div style={{position:"absolute", bottom:"24px", left:"24px", right:"24px", color:"var(--cream)"}}>
        <div style={{fontFamily:"var(--serif)", fontSize:"clamp(22px, 2.4vw, 36px)", letterSpacing:"-0.02em", lineHeight:1.05}}>{projectName}</div>
        {!isPh && tagline && <div style={{fontSize:"13px", color:"rgba(244,237,226,0.75)", marginTop:"6px", maxWidth:"38ch"}}>{tagline}</div>}
        {!isPh && <div style={{marginTop:"16px", fontFamily:"var(--mono)", fontSize:"11px", letterSpacing:"0.15em", color:"rgba(244,237,226,0.6)", textTransform:"uppercase", display:"flex", justifyContent:"space-between"}}>
          <span>{size}</span>
          <span style={{color:"var(--brass-soft)"}}>{lang==="en"?"View case →":"Voir →"}</span>
        </div>}
      </div>
    </div>
  );
}

function ProjectModal({ project, lang, onClose, onNav }) {
  const heroImage = getProjectImage(project);
  const projectName = text(project.name, lang, lang === "en" ? "Untitled project" : "Projet sans titre");
  const tagline = text(project.tagline, lang, "");
  const service = text(project.service, lang, lang === "en" ? "Project" : "Projet");
  const description = text(project.description, lang, "");
  const includes = list(project.includes, lang);
  const why = list(project.why, lang);
  const images = project.images || [];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e)=>e.stopPropagation()} style={{padding:0, maxWidth:"1200px"}}>
        <button className="modal__close" onClick={onClose}>×</button>

        {/* Hero image */}
        <div style={{position:"relative", height:"500px"}}>
          <ImagePlaceholder
            color={heroImage?.color || "#70675d"}
            label={heroImage?.label}
            src={heroImage?.url}
            alt={text(heroImage?.alt, lang, projectName)}
            style={{position:"absolute", inset:0, borderRadius:"24px 24px 0 0"}}
          />
          <div style={{position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.7), transparent 50%)", borderRadius:"24px 24px 0 0"}}></div>
          <div style={{position:"absolute", bottom:"40px", left:"40px", right:"40px", color:"var(--cream)"}}>
            <span className="tag" style={{background:"var(--accent)", color:"var(--cream)"}}>{service}</span>
            <h2 className="display-l" style={{marginTop:"16px", color:"var(--cream)"}}>{projectName}</h2>
            {tagline && <p style={{fontStyle:"italic", fontSize:"22px", marginTop:"12px", color:"rgba(244,237,226,0.85)"}}>{tagline}</p>}
          </div>
        </div>

        <div style={{padding:"60px"}}>
          <div style={{display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:"24px", marginBottom:"48px", paddingBottom:"48px", borderBottom:"1px solid var(--line)"}}>
            <Meta label={lang==="en"?"Type":"Type"} value={text(project.type, lang)} />
            <Meta label={lang==="en"?"Size":"Taille"} value={text(project.size, lang)} />
            <Meta label={lang==="en"?"Duration":"Durée"} value={text(project.duration, lang)} />
            <Meta label={lang==="en"?"Year":"Année"} value={project.year || "—"} />
          </div>

          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"60px"}}>
            <div>
              {description && <p className="lead">{description}</p>}

              {includes.length > 0 && <div style={{marginTop:"40px"}}>
                <div className="text-mono text-muted" style={{marginBottom:"16px"}}>{lang==="en"?"WHAT'S INCLUDED":"INCLUS"}</div>
                <ul style={{listStyle:"none", padding:0, margin:0}}>
                  {includes.map((it, i) => (
                    <li key={i} style={{padding:"12px 0", borderBottom:"1px solid var(--line)", display:"flex", gap:"16px"}}>
                      <span style={{color:"var(--accent)", fontFamily:"var(--mono)", fontSize:"12px"}}>0{i+1}</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>}
            </div>

            <div>
              {why.length > 0 && <>
                <div className="text-mono text-muted" style={{marginBottom:"16px"}}>{lang==="en"?"WHY THIS MATTERS":"POURQUOI"}</div>
                <ul style={{listStyle:"none", padding:0, margin:0}}>
                  {why.map((it, i) => (
                    <li key={i} style={{padding:"16px", background:"var(--cream-deep)", borderRadius:"8px", marginBottom:"12px", fontSize:"15px", lineHeight:1.5}}>
                      {it}
                    </li>
                  ))}
                </ul>
              </>}

              {images.length > 1 && (
                <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px", marginTop:"32px"}}>
                  {images.slice(1).map((img, i) => (
                    <ImagePlaceholder
                      key={i}
                      color={img.color}
                      label={img.label}
                      src={img.url}
                      alt={text(img.alt, lang, img.label || "")}
                      style={{height:"160px", borderRadius:"8px"}}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div style={{marginTop:"60px", display:"flex", gap:"16px", justifyContent:"center", paddingTop:"40px", borderTop:"1px solid var(--line)"}}>
            <button className="btn" onClick={()=>{onClose(); onNav("contact");}}>
              {lang==="en"?"Start a similar project":"Démarrer un projet similaire"} <span className="arrow">↗</span>
            </button>
            <button className="btn btn-ghost" onClick={onClose}>{lang==="en"?"Close":"Fermer"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Meta({ label, value }) {
  return (
    <div>
      <div className="text-mono text-muted">{label}</div>
      <div style={{fontFamily:"var(--serif)", fontSize:"22px", marginTop:"6px", letterSpacing:"-0.01em"}}>{value}</div>
    </div>
  );
}

function getProjectImage(project) {
  return project.images?.[0] || null;
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
