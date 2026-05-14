import React, { useState, useEffect, useRef } from "react";
import { CONTENT } from "../data/content";
import { routeToPath } from "../lib/seo";

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
               onClick={(e)=>{e.preventDefault();onNav(l.id);}}>{l.label}</a>
          ))}
        </nav>
        <div className="header__right">
          <div className="lang-switch">
            <button className={lang==="en"?"on":""} onClick={()=>onLang("en")}>EN</button>
            <button className={lang==="fr"?"on":""} onClick={()=>onLang("fr")}>FR</button>
          </div>
          <button className="btn" onClick={()=>onNav("contact")}>
            {lang==="en"?"Free estimate":"Devis gratuit"} <span className="arrow">↗</span>
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
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <div className="header__mobile-actions">
              <div className="lang-switch">
                <button className={lang==="en"?"on":""} onClick={()=>onLang("en")}>EN</button>
                <button className={lang==="fr"?"on":""} onClick={()=>onLang("fr")}>FR</button>
              </div>
              <button className="btn" onClick={()=>go("contact")}>
                {lang==="en"?"Free estimate":"Devis gratuit"} <span className="arrow">↗</span>
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
  return (
    <footer className="footer">
      <div className="row" style={{gap:"60px"}}>
        <div className="col" style={{flex:"1.5"}}>
          <div style={{fontFamily:"var(--serif)", fontSize:"40px", lineHeight:1.05, letterSpacing:"-0.03em", marginBottom:"20px"}}>
            Garage <em style={{fontStyle:"italic", color:"var(--brass-soft)"}}>à la</em><br/>Carte
          </div>
          <p style={{color:"rgba(244,237,226,0.6)", fontSize:"14px", maxWidth:"32ch"}}>
            {lang==="en"
              ? "American precision. European design. Custom garage transformations in the Orlando area."
              : "Précision américaine. Design européen. Transformations de garage sur-mesure dans la région d'Orlando."}
          </p>
        </div>
        <div className="col">
          <h4>{lang==="en"?"Navigate":"Navigation"}</h4>
          <a href={routeToPath("home")} onClick={(e)=>{e.preventDefault();onNav("home");}}>{t.home}</a>
          <a href={routeToPath("projects")} onClick={(e)=>{e.preventDefault();onNav("projects");}}>{t.projects}</a>
          <a href={routeToPath("contact")} onClick={(e)=>{e.preventDefault();onNav("contact");}}>{t.contact}</a>
        </div>
        <div className="col">
          <h4>{lang==="en"?"Services":"Services"}</h4>
          <a href={routeToPath("home")} onClick={(e)=>{e.preventDefault();onNav("home");}}>Design Blueprint</a>
          <a href={routeToPath("home")} onClick={(e)=>{e.preventDefault();onNav("home");}}>Design + Setup</a>
          <a href={routeToPath("home")} onClick={(e)=>{e.preventDefault();onNav("home");}}>Full Transformation</a>
          <a href={routeToPath("home")} onClick={(e)=>{e.preventDefault();onNav("home");}}>Smart Integration</a>
        </div>
        <div className="col">
          <h4>{lang==="en"?"Contact":"Contact"}</h4>
          <a href="mailto:hello@garagealacarte.com">hello@garagealacarte.com</a>
          <a href="tel:+14075550142">+1 (407) 555-0142</a>
          <div style={{color:"rgba(244,237,226,0.6)", fontSize:"14px", marginTop:"8px"}}>Orlando, FL · USA</div>
        </div>
        <div className="col">
          <h4>{lang==="en"?"Legal":"Mentions"}</h4>
          <a href={routeToPath("conditions")} onClick={(e)=>{e.preventDefault();onNav("conditions");}}>{lang==="en"?"Project conditions":"Conditions de projet"}</a>
          <a href={routeToPath("admin")} onClick={(e)=>{e.preventDefault();onNav("admin");}}>Admin</a>
        </div>
      </div>

      <div className="footer__big">
        <div className="footer__big-inner">
          <span>Garage à la Carte</span><span style={{color:"var(--brass)"}}> · </span>
          <span style={{fontStyle:"italic"}}>Designed & Built</span><span style={{color:"var(--brass)"}}> · </span>
          <span>Orlando FL</span><span style={{color:"var(--brass)"}}> · </span>
          <span>Garage à la Carte</span><span style={{color:"var(--brass)"}}> · </span>
          <span style={{fontStyle:"italic"}}>Designed & Built</span><span style={{color:"var(--brass)"}}> · </span>
          <span>Orlando FL</span><span style={{color:"var(--brass)"}}> · </span>
        </div>
      </div>

      <div style={{display:"flex", justifyContent:"space-between", fontFamily:"var(--mono)", fontSize:"11px", letterSpacing:"0.1em", color:"rgba(244,237,226,0.4)", textTransform:"uppercase"}}>
        <span>© 2026 Garage à la Carte. All rights reserved.</span>
        <a href="https://webcodestudio.fr" target="_blank" rel="noreferrer noopener" style={{color:"rgba(244,237,226,0.55)"}}>
          Designed by WebCode Studio
        </a>
      </div>
    </footer>
  );
};

// ---------- Animated counter ----------
export function Counter({ to, suffix="", duration=1600 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let started = false;
    const io = new IntersectionObserver((es) => es.forEach((e)=>{
      if (e.isIntersecting && !started) {
        started = true;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min(1, (now-start)/duration);
          const eased = 1 - Math.pow(1-p, 3);
          setVal(Math.round(to * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
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
export function Reveal({ children, delay=0, as="div", style={}, className="" }) {
  const ref = useReveal();
  const Tag = as;
  return <Tag ref={ref} className={`reveal ${className}`} style={{transitionDelay:`${delay}s`, ...style}}>{children}</Tag>;
};

// ---------- Marquee ----------
export function Marquee({ words }) {
  const items = [...words, ...words, ...words];
  return (
    <div className="marquee">
      <div className="marquee__inner">
        {items.map((w, i) => (
          <React.Fragment key={i}>
            <span><em>{w}</em></span>
            <span className="dot"></span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
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
