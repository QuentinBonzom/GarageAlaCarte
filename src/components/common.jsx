import React, { useState, useEffect, useRef } from "react";
import { CONTENT } from "../data/content";
import { routeToPath } from "../lib/seo";
import { cmsAttr } from "../lib/cmsEdit";

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
  return (
    <>
      <header className="header">
        <a href={routeToPath("home")} className="header__logo header__logo--badge" onClick={(e)=>{e.preventDefault();go("home");}} aria-label="Garage à la Carte">
          <img src="/logo.png" alt="Garage à la Carte" />
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
            <button data-cms-allow className={lang==="fr"?"on":""} onClick={()=>onLang("fr")}>FR</button>
          </div>
          <button className="btn" onClick={()=>onNav("contact")}>
            <span {...cmsAttr("nav", "{lang}.cta")}>{t.cta || (lang==="en"?"Free estimate":"Devis gratuit")}</span> <span className="arrow">↗</span>
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
                <button data-cms-allow className={lang==="fr"?"on":""} onClick={()=>onLang("fr")}>FR</button>
              </div>
              <button className="btn" onClick={()=>go("contact")}>
                <span {...cmsAttr("nav", "{lang}.cta")}>{t.cta || (lang==="en"?"Free estimate":"Devis gratuit")}</span> <span className="arrow">↗</span>
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
  return (
    <footer className="footer-v2">
      <div className="footer-v2__grid">
        <div className="footer-v2__brand">
          <div className="footer-v2__wordmark">
            Garage <em>à la</em><br/>Carte
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
                <strong>Transformations de garage sur-mesure</strong>
                <span>Orlando et ses environs, Floride.</span>
                <span>
                  Découvrez la praticité et la précision américaines associées à un
                  design d'inspiration européenne et à une expertise avancée
                  Couleur, Matière &amp; Finition (CMF) — pour créer des espaces
                  fonctionnels et époustouflants conçus autour de votre style de vie.
                </span>
                <em>Inclusif et accueillant.</em>
              </>
            )}
          </div>

        </div>
        <div className="footer-v2__col">
          <h4>{lang==="en"?"Navigate":"Navigation"}</h4>
          <a href={routeToPath("home")} onClick={(e)=>{e.preventDefault();onNav("home");}}>{t.home}</a>
          <a href={routeToPath("projects")} onClick={(e)=>{e.preventDefault();onNav("projects");}}>{t.projects}</a>
          <a href={routeToPath("contact")} onClick={(e)=>{e.preventDefault();onNav("contact");}}>{t.contact}</a>
        </div>
        <div className="footer-v2__col">
          <h4>{lang==="en"?"Services":"Services"}</h4>
          <a href={routeToPath("home")} onClick={(e)=>{e.preventDefault();onNav("home");}}>Design Blueprint</a>
          <a href={routeToPath("home")} onClick={(e)=>{e.preventDefault();onNav("home");}}>Design + Setup</a>
          <a href={routeToPath("home")} onClick={(e)=>{e.preventDefault();onNav("home");}}>Full Transformation</a>
          <a href={routeToPath("home")} onClick={(e)=>{e.preventDefault();onNav("home");}}>Smart Integration</a>
        </div>
        <div className="footer-v2__col">
          <h4>{lang==="en"?"Contact":"Contact"}</h4>
          <a href={`mailto:${email}`}>{email}</a>
          <a href={`tel:${phone.replace(/[^+\d]/g, "")}`}>{phone}</a>
          <div className="footer-v2__address">{address}</div>
        </div>
        <div className="footer-v2__col">
          <h4>{lang==="en"?"Legal":"Mentions"}</h4>
          <a href={routeToPath("conditions")} onClick={(e)=>{e.preventDefault();onNav("conditions");}}>{lang==="en"?"Project conditions":"Conditions de projet"}</a>
          <a href={routeToPath("admin")} onClick={(e)=>{e.preventDefault();onNav("admin");}}>Admin</a>
        </div>
      </div>

      <div className="footer-v2__bottom">
        <span>© 2025 Garage à la Carte. All rights reserved.</span>

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
      {label && <div className="img-ph__label">{label}</div>}
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
      setError(lang==="en" ? "Could not save your email. Please try again." : "Impossible d'enregistrer votre email. Réessayez.");
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
              {lang==="en"?"costly mistakes to avoid":"erreurs coûteuses à éviter"}
            </div>
          </div>
          <div style={{fontSize:"12px", color:"rgba(244,237,226,0.5)", fontFamily:"var(--mono)", letterSpacing:"0.15em", textTransform:"uppercase"}}>
            32 PAGES · PDF
          </div>
        </div>
        <div style={{padding:"50px 40px"}}>
          <button className="modal__close" onClick={onClose} aria-label="Close">×</button>
          <div className="text-mono text-muted">{lang==="en"?"BEFORE YOU GO":"AVANT DE PARTIR"}</div>
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
                {submitting ? (lang==="en"?"Sending...":"Envoi...") : t.cta[lang]} <span className="arrow">↗</span>
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
