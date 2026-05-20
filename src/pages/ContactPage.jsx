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

  return (
    <div className="page contact-v2">
      {/* Hero — minimal premium pattern */}
      <section className="contact-v2-head">
        <div className="contact-v2-head__inner">
          <Reveal as="div" className="contact-v2-head__eyebrow">
            {text(C.eyebrow, lang, lang === "en" ? "Get in touch" : "Contact")}
          </Reveal>
          <Reveal as="h1" className="contact-v2-head__title">
            {text(C.title, lang, lang === "en" ? "Let's design your garage." : "Imaginons votre garage.")}
          </Reveal>
          {C.sub && (
            <Reveal as="p" className="contact-v2-head__sub" delay={0.1}>
              {text(C.sub, lang)}
            </Reveal>
          )}
        </div>
      </section>

      {/* Form + Direct line */}
      <section className="contact-v2-main">
        <div className="contact-v2-grid">
          <Reveal>
            <div className="contact-form-card">
              <div className="contact-form-card__head">
                <div className="text-mono text-muted">{lang === "en" ? "Project brief" : "Votre projet"}</div>
                <h2 className="contact-v2-form-title">{lang === "en" ? "Tell us about your space." : "Parlez-nous de votre espace."}</h2>
              </div>

              {sent ? (
                <div className="contact-form-card__sent">
                  <div className="contact-form-card__check" aria-hidden>✓</div>
                  <h3 className="contact-v2-form-title">{lang === "en" ? "Message received." : "Message reçu."}</h3>
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
                      {lang === "en" ? "A real person replies — never a bot." : "Une vraie personne vous répond."}
                    </span>
                  </div>
                  {error && <div className="contact-form__error">{error}</div>}
                </form>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <aside className="contact-v2-sidebar">
              <div className="contact-info-card">
                <div className="contact-info-card__eyebrow text-mono">{text(C.info_title, lang, lang === "en" ? "Direct line" : "Contact direct")}</div>
                <a className="contact-info-card__contact" href={`mailto:${C.main_email}`}>{C.main_email}</a>
                <a className="contact-info-card__contact contact-info-card__contact--brass" href={`tel:${C.main_phone}`}>{C.main_phone}</a>
                <div className="contact-info-card__divider"></div>
                <p className="contact-info-card__address">{text(C.address, lang, "Orlando, FL · USA")}</p>
              </div>

              <ul className="contact-v2-trust">
                <li>{lang === "en" ? "Reply within 48 hours" : "Réponse sous 48h"}</li>
                <li>{lang === "en" ? "No commitment, no pressure" : "Sans engagement, sans pression"}</li>
              </ul>
            </aside>
          </Reveal>
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
    <div className="page conditions-v2">
      <section className="conditions-v2-head">
        <div className="conditions-v2-head__inner">
          <Reveal as="div" className="conditions-v2-head__eyebrow">
            {lang==="en" ? "Legal · Project conditions" : "Conditions de projet"}
          </Reveal>
          <Reveal as="h1" className="conditions-v2-head__title">
            {pageTitle}
          </Reveal>
          <Reveal delay={0.1}>
            <p className="conditions-v2-head__sub">{pageIntro}</p>
          </Reveal>
        </div>
      </section>

      <section className="conditions-v2-main">
        <div className="conditions-v2-grid">
          <aside className="conditions-v2-aside">
            <div className="conditions-v2-aside__label">{lang==="en"?"Index":"Index"}</div>
            <ul className="conditions-v2-aside__list">
              {sections.map(s => (
                <li key={s.num}>
                  <a href={`#sec-${s.num}`} onClick={(e)=>{e.preventDefault(); document.getElementById(`sec-${s.num}`)?.scrollIntoView({behavior:"smooth", block:"start"});}}>
                    <span className="conditions-v2-aside__num">{s.num}</span>
                    <span>{s.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </aside>
          <div className="conditions-v2-body">
            {sections.map(s => (
              <Reveal key={s.num}>
                <article id={`sec-${s.num}`} className="conditions-v2-section">
                  <div className="conditions-v2-section__top">
                    <span className="conditions-v2-section__num">§ {s.num}</span>
                    <h2 className="conditions-v2-section__title">{s.title}</h2>
                  </div>
                  <p className="conditions-v2-section__body">{s.body}</p>
                </article>
              </Reveal>
            ))}
            <div className="conditions-v2-commit">
              <div className="conditions-v2-commit__label">{lang==="en"?"Our commitment":"Notre engagement"}</div>
              <div className="conditions-v2-commit__grid">
                {(lang==="en"
                  ? ["Clear communication", "Thoughtful design", "Reliable coordination", "Aligned results"]
                  : ["Communication claire", "Design réfléchi", "Coordination fiable", "Résultats alignés"]
                ).map(c => (
                  <div key={c} className="conditions-v2-commit__item">{c}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

function text(value, lang, fallback = "") {
  if (!value) return fallback;
  if (typeof value === "string") return value;
  return value[lang] || value.en || value.fr || fallback;
}
