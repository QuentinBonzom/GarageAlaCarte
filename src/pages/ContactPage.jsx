import { useState } from "react";
import { CONTENT } from "../data/content";
import { createContactSubmission } from "../data/contentRepository";
import { Reveal } from "../components/common";

export function ContactPage({ lang, onNav }) {
  const C = CONTENT.contact;
  const [form, setForm] = useState({ name:"", email:"", phone:"", service:"blueprint", message:"", consent:false });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!form.consent || submitting) return;
    setSubmitting(true);
    setError("");
    try {
      await createContactSubmission({ form, locale: lang });
      setSent(true);
      setForm({ name:"", email:"", phone:"", service:"blueprint", message:"", consent:false });
    } catch (error) {
      console.warn("Contact submission error:", error.message);
      setError(lang==="en" ? "Could not send your request. Please try again." : "Impossible d'envoyer votre demande. Réessayez.");
    } finally {
      setSubmitting(false);
    }
  };

  const team = CONTENT.team.members;

  const promises = [
    { num: "48h", label: lang === "en" ? "average reply time" : "délai de réponse moyen" },
    { num: "100%", label: lang === "en" ? "free estimate" : "devis gratuit" },
    { num: "0", label: lang === "en" ? "obligation, ever" : "engagement, jamais" }
  ];

  return (
    <div className="page contact-page">
      {/* ── Hero ─────────────────────────────────── */}
      <section id="contact_page" className="section contact-hero">
        <div className="container">
          <div className="contact-hero__top">
            <div className="eyebrow">{C.eyebrow[lang]}</div>
            <div className="text-mono text-muted">{lang === "en" ? "Reply within 48h" : "Réponse sous 48h"}</div>
          </div>
          <Reveal as="h1" className="display-l contact-hero__title">{C.title[lang]}</Reveal>
          <Reveal delay={0.1}>
            <p className="lead contact-hero__lead">{C.sub[lang]}</p>
          </Reveal>
          <Reveal delay={0.18}>
            <ul className="contact-hero__promises" aria-label="Our promises">
              {promises.map((p) => (
                <li key={p.label}>
                  <span className="contact-hero__promise-num">{p.num}</span>
                  <span className="contact-hero__promise-label">{p.label}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── Form + Direct line ───────────────────── */}
      <section className="section contact-main">
        <div className="container">
          <div className="contact-grid">
            {/* FORM */}
            <Reveal>
              <div className="contact-form-card">
                <div className="contact-form-card__head">
                  <div className="text-mono text-muted">{lang === "en" ? "01 · Project brief" : "01 · Votre projet"}</div>
                  <h2 className="display-s" style={{marginTop: "8px"}}>{lang === "en" ? "Tell us about your space." : "Parlez-nous de votre espace."}</h2>
                </div>

                {sent ? (
                  <div className="contact-form-card__sent">
                    <div className="contact-form-card__check" aria-hidden>✓</div>
                    <h3 className="display-s">{lang === "en" ? "Message received." : "Message reçu."}</h3>
                    <p className="lead">{lang === "en" ? "We'll come back to you within 48 hours." : "Nous revenons vers vous sous 48h."}</p>
                    <button className="btn" onClick={() => setSent(false)}>
                      {lang === "en" ? "Send another" : "Envoyer un autre"} <span className="arrow">↗</span>
                    </button>
                  </div>
                ) : (
                  <form onSubmit={submit} className="contact-form">
                    <div className="contact-form__row">
                      <div className="field">
                        <label>{C.form.name[lang]}</label>
                        <input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required />
                      </div>
                      <div className="field">
                        <label>{C.form.email[lang]}</label>
                        <input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} required />
                      </div>
                    </div>
                    <div className="contact-form__row">
                      <div className="field">
                        <label>{C.form.phone[lang]}</label>
                        <input value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} />
                      </div>
                      <div className="field">
                        <label>{C.form.service[lang]}</label>
                        <select value={form.service} onChange={(e) => setForm({...form, service: e.target.value})}>
                          <option value="blueprint">Design Blueprint</option>
                          <option value="delivery">Design & Setup</option>
                          <option value="transform">Full Transformation</option>
                          <option value="smart">Smart Integration</option>
                          <option value="not-sure">{lang === "en" ? "Not sure yet" : "Pas encore sûr"}</option>
                        </select>
                      </div>
                    </div>
                    <div className="field">
                      <label>{C.form.message[lang]}</label>
                      <textarea
                        value={form.message}
                        onChange={(e) => setForm({...form, message: e.target.value})}
                        placeholder={lang === "en" ? "Size, goals, timeline, anything we should know…" : "Surface, objectifs, calendrier, tout ce qui peut nous aider…"}
                        required
                      />
                    </div>
                    <label className="checkbox">
                      <input type="checkbox" checked={form.consent} onChange={(e) => setForm({...form, consent: e.target.checked})} required />
                      <span>{C.form.consent[lang]}{" "}
                        <a onClick={(e) => { e.preventDefault(); onNav("conditions"); }} style={{textDecoration: "underline", cursor: "pointer"}}>{C.form.consent_link[lang]}</a>.
                      </span>
                    </label>
                    <div className="contact-form__submit">
                      <button type="submit" className="btn" disabled={!form.consent || submitting}>
                        {submitting ? (lang === "en" ? "Sending..." : "Envoi...") : C.form.submit[lang]} <span className="arrow">↗</span>
                      </button>
                      <span className="contact-form__hint text-mono text-muted">
                        {lang === "en" ? "We reply in person, not from a bot." : "Une vraie personne vous répond."}
                      </span>
                    </div>
                    {error && <div className="contact-form__error">{error}</div>}
                  </form>
                )}
              </div>
            </Reveal>

<<<<<<< Updated upstream
            {/* DIRECT LINE + Why us */}
            <Reveal delay={0.15}>
              <aside className="contact-sidebar">
                <div className="contact-info-card">
                  <div className="contact-info-card__eyebrow text-mono">{C.info_title[lang]}</div>
                  <a className="contact-info-card__contact" href={`mailto:${C.main_email}`}>{C.main_email}</a>
                  <a className="contact-info-card__contact contact-info-card__contact--brass" href={`tel:${C.main_phone}`}>{C.main_phone}</a>
                  <div className="contact-info-card__divider"></div>
                  <p className="contact-info-card__address">{C.address[lang]}</p>
                </div>

                <div className="contact-trust-card">
                  <div className="text-mono text-muted">{lang === "en" ? "WHAT TO EXPECT" : "À QUOI S'ATTENDRE"}</div>
                  <ol className="contact-trust-card__steps">
                    <li>
                      <span className="contact-trust-card__num">01</span>
                      <div>
                        <strong>{lang === "en" ? "We listen first." : "On vous écoute d'abord."}</strong>
                        <p>{lang === "en" ? "A short call to understand your space, needs, and budget." : "Un échange rapide pour comprendre votre espace, vos besoins et votre budget."}</p>
                      </div>
                    </li>
                    <li>
                      <span className="contact-trust-card__num">02</span>
                      <div>
                        <strong>{lang === "en" ? "Free, tailored estimate." : "Devis gratuit et sur-mesure."}</strong>
                        <p>{lang === "en" ? "Clear scope and pricing — no surprises, no pressure." : "Périmètre et prix clairs — pas de surprise, pas de pression."}</p>
                      </div>
                    </li>
                    <li>
                      <span className="contact-trust-card__num">03</span>
                      <div>
                        <strong>{lang === "en" ? "You choose what's next." : "Vous décidez de la suite."}</strong>
                        <p>{lang === "en" ? "Design only, full transformation, or anywhere between." : "Plan seul, transformation complète, ou n'importe quoi entre les deux."}</p>
                      </div>
                    </li>
                  </ol>
                </div>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Team ─────────────────────────────────── */}
      <section className="section contact-team-section">
        <div className="container">
          <div className="contact-team-section__head">
            <div className="eyebrow">{lang === "en" ? "The team" : "L'équipe"}</div>
            <Reveal as="h2" className="display-l contact-team-section__title">
              {lang === "en" ? "Real people behind every project." : "De vraies personnes derrière chaque projet."}
            </Reveal>
          </div>
          <div className="contact-team-grid">
            {team.map((m, i) => {
              const initial = (m.name || "?").trim().charAt(0).toUpperCase();
              return (
                <Reveal key={m.name}>
                  <article className={`contact-team-card contact-team-card--v${(i % 4) + 1}`}>
                    <div className="contact-team-card__top">
                      <span className="contact-team-card__role-chip">{m.role[lang]}</span>
                      <div className="contact-team-card__avatar" aria-hidden>{initial}</div>
                    </div>
                    <div className="contact-team-card__name">{m.name}</div>
                    <div className="contact-team-card__contacts">
                      {m.email && (
                        <a className="contact-team-card__row" href={`mailto:${m.email}`}>
                          <svg className="contact-team-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                            <rect x="3" y="5" width="18" height="14" rx="2"/>
                            <path d="m3 7 9 6 9-6"/>
                          </svg>
                          <span>{m.email}</span>
                        </a>
                      )}
                      {m.phone && (
                        <a className="contact-team-card__row contact-team-card__row--muted" href={`tel:${m.phone.replace(/\s+/g, "")}`}>
                          <svg className="contact-team-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z"/>
                          </svg>
                          <span>{m.phone}</span>
                        </a>
                      )}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
=======
              <ul className="contact-v2-trust">
                <li>{lang === "en" ? "Reply within 48 hours" : "Réponse sous 48h"}</li>
                <li>{lang === "en" ? "No commitment, no pressure" : "Sans engagement, sans pression"}</li>
              </ul>
            </aside>
          </Reveal>
>>>>>>> Stashed changes
        </div>
      </section>
    </div>
  );
};

// ===== CONDITIONS PAGE =====
export function ConditionsPage({ lang }) {
  const legal = CONTENT.legal?.project_conditions;
  const fallbackSections = [
    { num:"01", title: lang==="en"?"Free Estimate":"Devis Gratuit",
      body: lang==="en"
        ? "We begin with a consultation to understand your space, your goals, and the level of service that best fits your project. Your estimate is an initial evaluation and may evolve based on final selections, site conditions, and project details. Estimates are typically valid for a limited period due to potential changes in material costs and availability."
        : "Nous commençons par une consultation pour comprendre votre espace, vos objectifs et le niveau de service adapté. Le devis est une évaluation initiale qui peut évoluer selon les choix finaux, conditions du site et détails du projet. Les devis sont valables pour une durée limitée en raison de variations potentielles des coûts et de la disponibilité des matériaux." },
    { num:"02", title: lang==="en"?"Project Validation":"Validation du Projet",
      body: lang==="en"
        ? "A project is considered ready once the following are clearly defined: selected service level, confirmed layout and design direction, estimated budget and main components. Once validated, we move into planning and execution."
        : "Un projet est prêt lorsque les éléments suivants sont définis : niveau de service choisi, plan et direction de design confirmés, budget estimatif et composants principaux. Une fois validé, nous passons à la planification et à l'exécution." },
    { num:"03", title: lang==="en"?"Scope of Work & Service Levels":"Périmètre & Niveaux de Service",
      body: lang==="en"
        ? "Each service includes only what is clearly defined within the selected level: Design Blueprint (planning & visual design), Design + Delivery (design, sourcing & preparation), Full Transformation (full coordination & execution), Smart Integration (technical systems & upgrades). Any request outside the selected service is handled as a project adjustment."
        : "Chaque service inclut uniquement ce qui est clairement défini : Design Blueprint (planning et design), Design + Setup (design, sourcing et préparation), Transformation Complète (coordination et exécution), Smart Integration (systèmes techniques). Toute demande hors périmètre est traitée comme un ajustement." },
    { num:"04", title: lang==="en"?"Design Visuals & Approval":"Visuels & Approbation",
      body: lang==="en"
        ? "Our 3D visuals represent the overall design intent, layout, and atmosphere. As every garage is unique, small variations may occur in the final result due to materials, lighting, or product availability. Before moving forward, you'll review and approve your design — this is your opportunity to make sure everything feels right."
        : "Nos visuels 3D représentent l'intention de design, le plan et l'atmosphère. Comme chaque garage est unique, de petites variations peuvent survenir selon les matériaux, l'éclairage ou la disponibilité. Avant de continuer, vous validez votre design — c'est votre moment pour vérifier chaque détail." },
    { num:"05", title: lang==="en"?"Client Responsibilities":"Responsabilités du Client",
      body: lang==="en"
        ? "You agree to provide accurate information about your space and needs, review and approve designs in a timely manner, ensure access to the property, and obtain any required approvals (HOA, building management). The garage must be fully prepared before delivery: personal items removed, workspace cleared, access unobstructed."
        : "Vous vous engagez à fournir des informations précises, valider les designs rapidement, assurer l'accès à la propriété et obtenir les autorisations nécessaires (HOA, syndic). Le garage doit être préparé avant la livraison : objets personnels retirés, espace dégagé, accès libre." },
    { num:"06", title: lang==="en"?"Site Documentation":"Documentation du Site",
      body: lang==="en"
        ? "We may take photos or short videos during on-site visits for internal use only. They are never used for marketing without your prior approval."
        : "Nous pouvons prendre des photos ou vidéos lors des visites pour usage interne uniquement. Elles ne sont jamais utilisées en marketing sans votre accord." },
    { num:"07", title: lang==="en"?"Permits & Licensed Trades":"Permis & Pros Agréés",
      body: lang==="en"
        ? "Some projects may require permits depending on the scope and local regulations. The client is responsible unless otherwise included. We coordinate with qualified, licensed professionals when required."
        : "Certains projets peuvent nécessiter des permis selon le périmètre et la réglementation locale. Le client en est responsable sauf indication contraire. Nous coordonnons avec des professionnels agréés." },
    { num:"08", title: lang==="en"?"Timeline & Payment":"Délais & Paiement",
      body: lang==="en"
        ? "Timelines are estimated and may be influenced by material availability, supplier delays, weather, permits, and site readiness. A deposit is required to secure your project — typically: initial deposit, progress payments, final balance prior to completion. No work begins without confirmed payment."
        : "Les délais sont estimatifs et peuvent dépendre de la disponibilité des matériaux, fournisseurs, météo, permis et préparation du site. Un acompte est requis pour sécuriser le projet — typiquement : acompte, paiements intermédiaires, solde avant livraison. Aucun travail ne démarre sans paiement confirmé." },
    { num:"09", title: lang==="en"?"Adjustments & Cancellation":"Ajustements & Annulation",
      body: lang==="en"
        ? "Any change after approval is a project adjustment and may impact pricing and timeline. Custom work and orders may not be canceled once initiated; work completed up to cancellation remains payable."
        : "Tout changement après validation est un ajustement et peut impacter prix et délais. Les travaux et commandes personnalisés ne peuvent pas être annulés une fois lancés ; le travail réalisé reste dû." },
    { num:"10", title: lang==="en"?"Warranty & Portfolio Use":"Garantie & Portfolio",
      body: lang==="en"
        ? "Manufacturer warranties apply to products. Installation warranty applies when installation is handled by our team or partners. We may use project photos for portfolio purposes unless you request otherwise in writing."
        : "Les garanties fabricant s'appliquent aux produits. La garantie d'installation s'applique quand celle-ci est gérée par notre équipe. Nous pouvons utiliser les photos pour notre portfolio sauf demande écrite contraire." },
    { num:"11", title: lang==="en"?"Delivery Area":"Zone de Service",
      body: lang==="en"
        ? "Services are included within a standard local service area (typically within 20 miles of Orlando). Projects outside this area are available upon request and may include additional fees."
        : "Les services sont inclus dans une zone standard (généralement 20 miles autour d'Orlando). Les projets hors zone sont possibles sur demande, avec frais supplémentaires." }
  ];
  const sections = legal?.sections?.length
    ? legal.sections.map((section) => ({
        num: section.num,
        title: section.title[lang],
        body: section.body[lang],
      }))
    : fallbackSections;
  const pageTitle = legal?.title?.[lang] || (lang==="en" ? "Website Project Details & Conditions." : "Conditions et engagements du projet.");
  const pageIntro = legal?.intro?.[lang] || (
    lang==="en"
      ? "We set clear expectations from day one, plan carefully, and guide your project from idea to completion. By engaging with Garage à la Carte, you agree to these guidelines unless otherwise defined in a written agreement."
      : "Nous fixons des attentes claires dès le départ et accompagnons votre projet de l'idée à la livraison. En vous engageant avec Garage à la Carte, vous acceptez ces conditions sauf accord écrit contraire."
  );

  return (
    <div className="page">
      <section className="section" style={{paddingTop:"60px", paddingBottom:"40px"}}>
        <div className="container">
          <div className="eyebrow">{lang==="en"?"Legal · Project conditions":"Conditions de projet"}</div>
          <Reveal as="h1" className="display-l" style={{marginTop:"32px", maxWidth:"22ch"}}>
            {pageTitle}
          </Reveal>
          <Reveal delay={0.15}>
            <p className="lead" style={{marginTop:"32px", maxWidth:"60ch"}}>
              {pageIntro}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{paddingTop:"40px"}}>
        <div className="container conditions-grid" style={{display:"grid", gridTemplateColumns:"260px 1fr", gap:"60px", alignItems:"start"}}>
          <aside className="conditions-aside" style={{position:"sticky", top:"110px"}}>
            <div className="text-mono text-muted" style={{marginBottom:"16px"}}>{lang==="en"?"INDEX":"INDEX"}</div>
            <ul style={{listStyle:"none", padding:0, margin:0}}>
              {sections.map(s => (
                <li key={s.num} style={{padding:"8px 0", borderBottom:"1px solid var(--line)"}}>
                  <a href={`#sec-${s.num}`} style={{display:"flex", gap:"12px", fontSize:"13px", color:"var(--ink-soft)"}} onClick={(e)=>{e.preventDefault(); document.getElementById(`sec-${s.num}`)?.scrollIntoView({behavior:"smooth", block:"start"});}}>
                    <span style={{color:"var(--accent)", fontFamily:"var(--mono)"}}>{s.num}</span>
                    <span>{s.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </aside>
          <div>
            {sections.map(s => (
              <Reveal key={s.num}>
                <div id={`sec-${s.num}`} style={{padding:"40px 0", borderBottom:"1px solid var(--line)", scrollMarginTop:"110px"}}>
                  <div style={{display:"flex", gap:"24px", alignItems:"baseline", marginBottom:"16px"}}>
                    <span style={{fontFamily:"var(--mono)", fontSize:"12px", color:"var(--accent)", letterSpacing:"0.1em"}}>§ {s.num}</span>
                    <h3 style={{fontFamily:"var(--serif)", fontSize:"32px", letterSpacing:"-0.02em"}}>{s.title}</h3>
                  </div>
                  <p style={{color:"var(--ink-soft)", fontSize:"16px", lineHeight:1.7, maxWidth:"68ch"}}>{s.body}</p>
                </div>
              </Reveal>
            ))}
            <div style={{marginTop:"60px", padding:"40px", background:"var(--cream-deep)", borderRadius:"16px"}}>
              <div className="text-mono text-muted">{lang==="en"?"OUR COMMITMENT":"NOTRE ENGAGEMENT"}</div>
              <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(180px, 1fr))", gap:"16px", marginTop:"24px"}}>
                {(lang==="en" ? ["Clear communication", "Thoughtful design", "Reliable coordination", "Aligned results"] : ["Communication claire", "Design réfléchi", "Coordination fiable", "Résultats alignés"]).map(c => (
                  <div key={c} style={{fontFamily:"var(--serif)", fontSize:"22px", letterSpacing:"-0.01em"}}>{c}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
