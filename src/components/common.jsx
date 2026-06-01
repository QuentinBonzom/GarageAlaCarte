import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { CONTENT } from "../data/content";
import { getServiceRouteForId, routeToPath } from "../lib/seo";
import { cmsAttr } from "../lib/cmsEdit";

function teamText(value, lang, fallback = "") {
  if (!value) return fallback;
  if (typeof value === "string") return value;
  return value[lang] || value.en || value.fr || fallback;
}

// ---------- Reveal on scroll ----------
export function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
};

// ---------- Header ----------
export function Header({ route, onNav, lang, onLang }) {
  const t = CONTENT.nav[lang];
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const links = [
    { id: "home", label: t.home },
    { id: "projects", label: t.projects },
    { id: "contact", label: t.contact }
  ];
  const go = (id) => { setMenuOpen(false); onNav(id); };
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [menuOpen]);
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const THRESHOLD = 80;
    const DELTA = 6;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < THRESHOLD) {
          setHidden(false);
        } else if (Math.abs(y - lastY) > DELTA) {
          setHidden(y > lastY);
        }
        lastY = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { if (menuOpen) setHidden(false); }, [menuOpen]);
  return (
    <>
      <header className={`header${hidden && !menuOpen ? " is-hidden" : ""}`}>
        <a href={routeToPath("home")} className="header__logo header__logo--badge" onClick={(e)=>{e.preventDefault();go("home");}} aria-label="Garage a la Carte">
          <img src="/logo.png" alt="Garage a la Carte" />
        </a>
        <nav className="header__nav">
          {links.map((l) => (
            <a key={l.id} href={routeToPath(l.id)} className={route === l.id ? "active" : ""}
               onClick={(e)=>{e.preventDefault();onNav(l.id);}} {...cmsAttr("nav", `{lang}.${l.id}`)}>{l.label}</a>
          ))}
        </nav>
        <div className="header__right">
          <div className="lang-switch">
            <button data-cms-allow className={lang==="en"?"on":""} onClick={()=>onLang("en")}>EN</button>
            <button data-cms-allow className={lang==="fr"?"on":""} onClick={()=>onLang("fr")}>ES</button>
          </div>
          <button className="btn" onClick={()=>onNav("contact")}>
            <span {...cmsAttr("nav", "{lang}.cta")}>{t.cta || (lang==="en"?"Free estimate":"Presupuesto gratis")}</span> <span className="arrow">↗</span>
          </button>
        </div>
        <button
          type="button"
          className={`header__burger ${menuOpen ? "is-open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span></span><span></span><span></span>
        </button>
      </header>
      {menuOpen && (
        <div className="header__mobile-panel" role="dialog" aria-modal="true" onClick={() => setMenuOpen(false)}>
          <div className="header__mobile-panel-inner" onClick={(e)=>e.stopPropagation()}>
            <nav className="header__mobile-nav">
              {links.map((l) => (
                <a
                  key={l.id}
                  href={routeToPath(l.id)}
                  className={route === l.id ? "active" : ""}
                  onClick={(e)=>{e.preventDefault();go(l.id);}}
                  {...cmsAttr("nav", `{lang}.${l.id}`)}
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <div className="header__mobile-actions">
              <div className="lang-switch">
                <button data-cms-allow className={lang==="en"?"on":""} onClick={()=>onLang("en")}>EN</button>
                <button data-cms-allow className={lang==="fr"?"on":""} onClick={()=>onLang("fr")}>ES</button>
              </div>
              <button className="btn" onClick={()=>go("contact")}>
                <span {...cmsAttr("nav", "{lang}.cta")}>{t.cta || (lang==="en"?"Free estimate":"Presupuesto gratis")}</span> <span className="arrow">↗</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// ---------- Footer ----------
export function Footer({ onNav, lang }) {
  const t = CONTENT.nav[lang];
  const c = CONTENT.contact || {};
  const email = c.main_email || "hello@garagealacarte.com";
  const phone = c.main_phone || "+1 (407) 555-0142";
  const address = c.address?.[lang] || c.address?.en || "Orlando, FL · USA";
  const serviceLinks = [
    { id: "blueprint", label: "Design Blueprint" },
    { id: "delivery", label: "Design + Setup" },
    { id: "transform", label: lang === "en" ? "Full Transformation" : "Transformación Completa" },
    { id: "smart", label: "Smart Integration" },
  ];

  const goService = (event, serviceId) => {
    event.preventDefault();
    onNav(getServiceRouteForId(serviceId));
  };

  return (
    <footer className="footer-v2">
      <div className="footer-v2__grid">
        <div className="footer-v2__brand">
          <div className="footer-v2__wordmark">
            Garage <em>a la</em><br/>Carte
          </div>
          <div className="footer-v2__tagline">
            {lang === "en" ? (
              <>
                <strong>Custom Garage Transformations</strong>
                <span>Orlando &amp; Surrounding Areas, Florida.</span>
                <span>
                  Experience American practicality and precision combined with
                  European-inspired design and advanced Color, Material &amp; Finish
                  (CMF) expertise — creating stunning, functional spaces designed
                  around your lifestyle.
                </span>
                <em>Inclusive &amp; Welcoming.</em>
              </>
            ) : (
              <>
                <strong>Transformaciones de garaje a medida</strong>
                <span>Orlando y alrededores, Florida.</span>
                <span>
                  Descubre la practicidad y la precisión americanas combinadas con un
                  diseño de inspiración europea y una experiencia avanzada en
                  Color, Material y Acabado (CMF) — para crear espacios funcionales
                  e impresionantes diseñados en torno a tu estilo de vida.
                </span>
                <em>Inclusivo y acogedor.</em>
              </>
            )}
          </div>

        </div>
        <div className="footer-v2__col">
          <h4>{lang==="en"?"Navigate":"Navegación"}</h4>
          <a href={routeToPath("home")} onClick={(e)=>{e.preventDefault();onNav("home");}}>{t.home}</a>
          <a href={routeToPath("projects")} onClick={(e)=>{e.preventDefault();onNav("projects");}}>{t.projects}</a>
          <a href={routeToPath("contact")} onClick={(e)=>{e.preventDefault();onNav("contact");}}>{t.contact}</a>
        </div>
        <div className="footer-v2__col">
          <h4>{lang==="en"?"Services":"Servicios"}</h4>
          {serviceLinks.map((service) => (
            <a
              key={service.id}
              href={routeToPath(getServiceRouteForId(service.id))}
              onClick={(event) => goService(event, service.id)}
            >
              {service.label}
            </a>
          ))}
        </div>
        <div className="footer-v2__col">
          <h4>{lang==="en"?"Contact":"Contacto"}</h4>
          <a href={`mailto:${email}`}>{email}</a>
          <a href={`tel:${phone.replace(/[^+\d]/g, "")}`}>{phone}</a>
          <div className="footer-v2__address">{address}</div>
        </div>
        <div className="footer-v2__col">
          <h4>{lang==="en"?"Legal":"Legal"}</h4>
          <a href={routeToPath("conditions")} onClick={(e)=>{e.preventDefault();onNav("conditions");}}>{lang==="en"?"Project conditions":"Condiciones del proyecto"}</a>
          <a href={routeToPath("admin")} onClick={(e)=>{e.preventDefault();onNav("admin");}}>Admin</a>
        </div>
      </div>

      <div className="footer-v2__bottom">
        <span>© 2025 Garage a la Carte. All rights reserved.</span>

        <a href="https://webcodestudio.fr" target="_blank" rel="noreferrer noopener">
          Designed by WebCode Studio
        </a>
      </div>
    </footer>
  );
};

// ---------- Image/media frame ----------
export function ImagePlaceholder({ label, color, height, style, src, alt = "" }) {
  // generate a layered gradient bg simulating photographic warmth
  const bg = color || "#5d4d3f";
  return (
    <div className="img-ph" style={{
      height: height || "100%",
      width: "100%",
      background: `linear-gradient(135deg, ${bg} 0%, ${shade(bg, -15)} 100%)`,
      ...style
    }}>
      {src ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <div style={{
          position:"absolute", inset:0,
          background: `radial-gradient(circle at 30% 20%, rgba(255,240,200,0.25), transparent 50%), radial-gradient(circle at 70% 80%, rgba(0,0,0,0.4), transparent 60%)`
        }}></div>
      )}
      {label && !src && <div className="img-ph__label">{label}</div>}
    </div>
  );
};

export function shade(hex, percent) {
  const h = hex.replace("#","");
  const num = parseInt(h, 16);
  let r = (num >> 16) + percent;
  let g = ((num >> 8) & 0xff) + percent;
  let b = (num & 0xff) + percent;
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));
  return "#" + ((r<<16)|(g<<8)|b).toString(16).padStart(6,"0");
}

// ---------- Reveal wrapper ----------
export function Reveal({ children, delay=0, as="div", style={}, className="", ...rest }) {
  const ref = useReveal();
  const Tag = as;
  return <Tag ref={ref} className={`reveal ${className}`} style={{transitionDelay:`${delay}s`, ...style}} {...rest}>{children}</Tag>;

};

// ---------- Team section (shared by Home & Contact) ----------
export function TeamSection({ lang }) {
  const team = CONTENT.team;
  const [activeMember, setActiveMember] = useState(null);
  if (!Array.isArray(team?.members) || team.members.length === 0) return null;
  return (
    <>
      <section className="contact-v2-team">
        <div className="contact-v2-team__inner">
          <Reveal as="div" className="contact-v2-team__eyebrow text-mono">
            {lang === "en" ? "The team" : "El equipo"}
          </Reveal>
          <Reveal as="h2" className="contact-v2-team__title">
            {teamText(team.title, lang, lang === "en" ? "The people behind your project." : "Las personas detrás de tu proyecto.")}
          </Reveal>
          {team.sub && (
            <Reveal as="p" className="contact-v2-team__sub" delay={0.05}>
              {teamText(team.sub, lang)}
            </Reveal>
          )}
          <div className="contact-v2-team__grid">
            {team.members.map((m, i) => {
              const hasLongBio = Boolean(teamText(m.long_bio, lang, ""));
              const openModal = () => hasLongBio && setActiveMember(m);
              return (
                <Reveal key={m.name} delay={0.06 + i * 0.06}>
                  <article
                    className={`team-card${hasLongBio ? " team-card--clickable" : ""}`}
                    onClick={openModal}
                    role={hasLongBio ? "button" : undefined}
                    tabIndex={hasLongBio ? 0 : undefined}
                    onKeyDown={(e) => { if (hasLongBio && e.key === "Enter") openModal(); }}
                    aria-label={hasLongBio ? `${m.name} — read full bio` : undefined}
                  >
                    <div className="team-card__avatar" aria-hidden="true">{m.name?.charAt(0)}</div>
                    <h3 className="team-card__name">{m.name}</h3>
                    <div className="team-card__role text-mono">{teamText(m.role, lang)}</div>
                    <p className="team-card__bio">{teamText(m.bio, lang)}</p>
                    {(m.email || m.phone || m.website) && (
                      <div className="team-card__links" onClick={(e) => e.stopPropagation()}>
                        {m.email && <a href={`mailto:${m.email}`}>{m.email}</a>}
                        {m.phone && <a href={`tel:${m.phone.replace(/\s+/g, "")}`}>{m.phone}</a>}
                        {m.website && (
                          <a href={m.website} target="_blank" rel="noreferrer noopener">
                            {m.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                          </a>
                        )}
                      </div>
                    )}
                    {hasLongBio && (
                      <span className="team-card__read-more text-mono" aria-hidden="true">
                        {lang === "en" ? "Read full bio →" : "Leer biografía completa →"}
                      </span>
                    )}
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
      {activeMember && (
        <TeamMemberModal member={activeMember} lang={lang} onClose={() => setActiveMember(null)} />
      )}
    </>
  );
}

function TeamMemberModal({ member, lang, onClose }) {
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

  const role = teamText(member.role, lang, "");
  const longBio = teamText(member.long_bio, lang, "");
  const paragraphs = longBio.split(/\n+/).filter(Boolean);

  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div className="team-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Close">×</button>
        <div className="team-modal__head">
          <div className="team-modal__avatar" aria-hidden="true">{member.name?.charAt(0)}</div>
          <div>
            <h2 className="team-modal__name">{member.name}</h2>
            {role && <div className="team-modal__role text-mono">{role}</div>}
          </div>
        </div>
        <div className="team-modal__body">
          {paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
        {(member.email || member.phone || member.website) && (
          <div className="team-modal__links">
            {member.email && <a href={`mailto:${member.email}`}>{member.email}</a>}
            {member.phone && <a href={`tel:${member.phone.replace(/\s+/g, "")}`}>{member.phone}</a>}
            {member.website && (
              <a href={member.website} target="_blank" rel="noreferrer noopener">
                {member.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
              </a>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

// ---------- Email capture popup ----------
export function EmailPopup({ lang, onClose, onSubmit }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const t = CONTENT.popup;
  const handle = async (e) => {
    e.preventDefault();
    if (!email || submitting) return;
    setSubmitting(true);
    setError("");
    try {
      await onSubmit(email);
      setDone(true);
      setTimeout(onClose, 1600);
    } catch (err) {
      setError(lang==="en" ? "Could not save your email. Please try again." : "No se ha podido guardar tu email. Inténtalo de nuevo.");
      console.warn("Email lead error:", err.message);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" style={{maxWidth:"720px", display:"grid", gridTemplateColumns:"1fr 1fr", overflow:"hidden", padding:0}} onClick={(e)=>e.stopPropagation()}>
        <div style={{background:"var(--ink)", padding:"60px 40px", color:"var(--cream)", display:"flex", flexDirection:"column", justifyContent:"space-between", minHeight:"480px"}}>
          <div>
            <div className="text-mono" style={{color:"var(--brass-soft)"}}>FREE GUIDE</div>
            <div style={{fontFamily:"var(--serif)", fontSize:"56px", lineHeight:1, letterSpacing:"-0.03em", marginTop:"24px"}}>5</div>
            <div style={{fontFamily:"var(--serif)", fontSize:"22px", lineHeight:1.2, marginTop:"8px"}}>
              {lang==="en"?"costly mistakes to avoid":"errores costosos que evitar"}
            </div>
          </div>
          <div style={{fontSize:"12px", color:"rgba(244,237,226,0.5)", fontFamily:"var(--mono)", letterSpacing:"0.15em", textTransform:"uppercase"}}>
            32 PAGES · PDF
          </div>
        </div>
        <div style={{padding:"50px 40px"}}>
          <button className="modal__close" onClick={onClose} aria-label="Close">×</button>
          <div className="text-mono text-muted">{lang==="en"?"BEFORE YOU GO":"ANTES DE IRTE"}</div>
          <h3 className="display-s" style={{marginTop:"16px"}}>{t.title[lang]}</h3>
          <p style={{color:"var(--ink-soft)", marginTop:"16px", fontSize:"15px"}}>{t.sub[lang]}</p>
          {done ? (
            <div style={{marginTop:"32px", padding:"20px", background:"var(--cream-deep)", borderRadius:"8px", fontSize:"14px"}}>
              ✓ {t.success[lang]}
            </div>
          ) : (
            <form onSubmit={handle} style={{marginTop:"32px"}}>
              <div className="field">
                <input type="email" placeholder={t.placeholder[lang]} value={email} onChange={(e)=>setEmail(e.target.value)} required />
              </div>
              <button type="submit" className="btn" style={{marginTop:"24px", width:"100%", justifyContent:"center"}} disabled={submitting}>
                {submitting ? (lang==="en"?"Sending...":"Enviando...") : t.cta[lang]} <span className="arrow">↗</span>
              </button>
              {error && <div style={{marginTop:"14px", color:"var(--accent-deep)", fontSize:"13px"}}>{error}</div>}
              <button type="button" onClick={onClose} style={{background:"none", border:0, color:"var(--muted)", marginTop:"16px", fontSize:"13px", textDecoration:"underline"}}>
                {t.decline[lang]}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
