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

  return (
    <div className="page">
      <section id="contact_page" className="section" style={{paddingTop:"60px", paddingBottom:"40px"}}>
        <div className="container">
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:"40px"}}>
            <div className="eyebrow">{C.eyebrow[lang]}</div>
            <div className="text-mono text-muted">{lang==="en"?"Reply within 48h":"Réponse sous 48h"}</div>
          </div>
          <Reveal as="h1" className="display-xl" style={{maxWidth:"14ch"}}>{C.title[lang]}</Reveal>
          <Reveal delay={0.15}>
            <p className="lead" style={{marginTop:"32px"}}>{C.sub[lang]}</p>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{paddingTop:"40px"}}>
        <div className="container">
          <div className="contact-grid" style={{display:"grid", gridTemplateColumns:"1.4fr 1fr", gap:"60px", alignItems:"flex-start"}}>
            {/* FORM */}
            <Reveal>
              <div className="contact-form-card" style={{background:"var(--paper)", borderRadius:"24px", padding:"60px", border:"1px solid var(--line)"}}>
                {sent ? (
                  <div style={{textAlign:"center", padding:"60px 0"}}>
                    <div style={{fontFamily:"var(--serif)", fontSize:"80px"}}>✓</div>
                    <h3 className="display-s" style={{marginTop:"16px"}}>{lang==="en"?"Message received.":"Message reçu."}</h3>
                    <p className="lead" style={{marginTop:"16px", margin:"16px auto 0"}}>{lang==="en"?"We'll come back to you within 48 hours.":"Nous revenons vers vous sous 48h."}</p>
                    <button className="btn" style={{marginTop:"32px"}} onClick={()=>setSent(false)}>{lang==="en"?"Send another":"Envoyer un autre"}</button>
                  </div>
                ) : (
                  <form onSubmit={submit} style={{display:"flex", flexDirection:"column", gap:"32px"}}>
                    <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"32px"}}>
                      <div className="field">
                        <label>{C.form.name[lang]}</label>
                        <input value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} required />
                      </div>
                      <div className="field">
                        <label>{C.form.email[lang]}</label>
                        <input type="email" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} required />
                      </div>
                    </div>
                    <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"32px"}}>
                      <div className="field">
                        <label>{C.form.phone[lang]}</label>
                        <input value={form.phone} onChange={(e)=>setForm({...form, phone:e.target.value})} />
                      </div>
                      <div className="field">
                        <label>{C.form.service[lang]}</label>
                        <select value={form.service} onChange={(e)=>setForm({...form, service:e.target.value})}>
                          <option value="blueprint">Design Blueprint</option>
                          <option value="delivery">Design & Setup</option>
                          <option value="transform">Full Transformation</option>
                          <option value="smart">Smart Integration</option>
                          <option value="not-sure">{lang==="en"?"Not sure yet":"Pas encore sûr"}</option>
                        </select>
                      </div>
                    </div>
                    <div className="field">
                      <label>{C.form.message[lang]}</label>
                      <textarea value={form.message} onChange={(e)=>setForm({...form, message:e.target.value})} required />
                    </div>
                    <label className="checkbox">
                      <input type="checkbox" checked={form.consent} onChange={(e)=>setForm({...form, consent:e.target.checked})} required />
                      <span>{C.form.consent[lang]}{" "}
                        <a onClick={(e)=>{e.preventDefault(); onNav("conditions");}} style={{textDecoration:"underline", cursor:"pointer"}}>{C.form.consent_link[lang]}</a>
                        .
                      </span>
                    </label>
                    <button type="submit" className="btn" style={{alignSelf:"flex-start"}} disabled={!form.consent || submitting}>
                      {submitting ? (lang==="en"?"Sending...":"Envoi...") : C.form.submit[lang]} <span className="arrow">↗</span>
                    </button>
                    {error && <div style={{color:"var(--accent-deep)", fontSize:"14px"}}>{error}</div>}
                  </form>
                )}
              </div>
            </Reveal>

            {/* INFO */}
            <Reveal delay={0.15}>
              <div className="contact-info-card" style={{background:"var(--ink)", color:"var(--cream)", borderRadius:"24px", padding:"40px"}}>
                <div className="text-mono" style={{color:"var(--brass-soft)"}}>{C.info_title[lang]}</div>
                <a className="contact-info-card__contact" href={`mailto:${C.main_email}`} style={{display:"block", fontFamily:"var(--serif)", fontSize:"28px", marginTop:"16px", letterSpacing:"-0.02em", wordBreak:"break-word"}}>{C.main_email}</a>
                <a className="contact-info-card__contact" href={`tel:${C.main_phone}`} style={{display:"block", fontFamily:"var(--serif)", fontSize:"28px", marginTop:"4px", letterSpacing:"-0.02em", color:"var(--brass-soft)"}}>{C.main_phone}</a>
                <p style={{color:"rgba(244,237,226,0.6)", fontSize:"14px", marginTop:"24px", paddingTop:"24px", borderTop:"1px solid rgba(244,237,226,0.15)"}}>{C.address[lang]}</p>
              </div>

              <div style={{marginTop:"24px"}}>
                <div className="text-mono text-muted" style={{marginBottom:"20px"}}>{lang==="en"?"THE TEAM":"L'ÉQUIPE"}</div>
                <div className="contact-team-list">
                  {team.map(m => (
                    <div key={m.name} className="contact-team-card">
                      <div className="contact-team-card__head">
                        <div className="contact-team-card__name">{m.name}</div>
                        <div className="contact-team-card__role text-mono text-muted">{m.role[lang]}</div>
                      </div>
                      <div className="contact-team-card__contacts">
                        {m.email && <a className="contact-team-card__email" href={`mailto:${m.email}`}>{m.email}</a>}
                        {m.phone && <span className="contact-team-card__phone">{m.phone}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
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
