import { useEffect, useState } from "react";
import { CONTENT } from "../data/content";
import { createContactSubmission } from "../data/contentRepository";
import { Reveal, FaqSection } from "../components/common";
import { cmsAttr } from "../lib/cmsEdit";

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
      setError(lang==="en" ? "Could not send your request. Please try again." : "No se ha podido enviar tu solicitud. Inténtalo de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page contact-v2">
      {/* Hero, minimal premium pattern */}
      <section className="contact-v2-head">
        <div className="contact-v2-head__inner">
          <Reveal as="h1" className="contact-v2-head__title" {...cmsAttr("contact_page", "title")}>
            {text(C.title, lang, lang === "en" ? "Let's design your garage." : "Diseñemos tu garaje.")}
          </Reveal>
          {C.sub && (
            <Reveal as="p" className="contact-v2-head__sub" delay={0.1} {...cmsAttr("contact_page", "sub")}>

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
                <div className="text-mono text-muted" {...cmsAttr("contact_page", "form.brief")}>{text(C.form.brief, lang, lang === "en" ? "Project brief" : "Tu proyecto")}</div>
                <h2 className="contact-v2-form-title" {...cmsAttr("contact_page", "form.heading")}>{text(C.form.heading, lang, lang === "en" ? "Tell us about your space." : "Cuéntanos sobre tu espacio.")}</h2>
              </div>

              {sent ? (
                <div className="contact-form-card__sent">
                  <div className="contact-form-card__check" aria-hidden>✓</div>
                  <h3 className="contact-v2-form-title" {...cmsAttr("contact_page", "form.sent_title")}>{text(C.form.sent_title, lang, lang === "en" ? "Message received." : "Mensaje recibido.")}</h3>
                  <p className="lead" {...cmsAttr("contact_page", "form.sent_text")}>{text(C.form.sent_text, lang, lang === "en" ? "We'll come back to you within 48 hours." : "Te responderemos en 48 h.")}</p>
                  <button className="btn" onClick={() => setSent(false)}>
                    <span {...cmsAttr("contact_page", "form.sent_again")}>{text(C.form.sent_again, lang, lang === "en" ? "Send another" : "Enviar otro")}</span> <span className="arrow">↗</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="contact-form">
                  <div className="contact-form__row">
                    <div className="field">
                      <label {...cmsAttr("contact_page", "form.name")}>{C.form.name[lang]}</label>
                      <input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required />
                    </div>
                    <div className="field">
                      <label {...cmsAttr("contact_page", "form.email")}>{C.form.email[lang]}</label>

                      <input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} required />
                    </div>
                  </div>
                  <div className="contact-form__row">
                    <div className="field">
                      <label {...cmsAttr("contact_page", "form.phone")}>{C.form.phone[lang]}</label>
                      <input value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} />
                    </div>
                    <div className="field">
                      <label {...cmsAttr("contact_page", "form.service")}>{C.form.service[lang]}</label>

                      <select value={form.service} onChange={(e) => setForm({...form, service: e.target.value})}>
                        <option value="blueprint">Garage Design & Build Plan</option>
                        <option value="delivery">Design & Setup</option>
                        <option value="transform">Full Transformation</option>
                        <option value="smart">Smart Integration</option>
                        <option value="not-sure">{text(C.form.service_not_sure, lang, lang === "en" ? "Not sure yet" : "Aún no estoy seguro")}</option>
                      </select>
                    </div>
                  </div>
                  <div className="field">
                    <label {...cmsAttr("contact_page", "form.message")}>{C.form.message[lang]}</label>

                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({...form, message: e.target.value})}
                      placeholder={text(C.form.message_placeholder, lang, lang === "en" ? "Size, goals, timeline, anything we should know…" : "Superficie, objetivos, plazos, todo lo que nos pueda ayudar…")}
                      required
                    />
                  </div>
                  <label className="checkbox">
                    <input type="checkbox" checked={form.consent} onChange={(e) => setForm({...form, consent: e.target.checked})} required />
                    <span><span {...cmsAttr("contact_page", "form.consent")}>{C.form.consent[lang]}</span>{" "}
                      <a onClick={(e) => { e.preventDefault(); onNav("conditions"); }} style={{textDecoration: "underline", cursor: "pointer"}} {...cmsAttr("contact_page", "form.consent_link")}>{C.form.consent_link[lang]}</a>.

                    </span>
                  </label>
                  <div className="contact-form__submit">
                    <button type="submit" className="btn" disabled={!form.consent || submitting}>
                      {submitting ? (lang === "en" ? "Sending..." : "Enviando...") : <span {...cmsAttr("contact_page", "form.submit")}>{C.form.submit[lang]}</span>} <span className="arrow">↗</span>

                    </button>
                    <span className="contact-form__hint text-mono text-muted" {...cmsAttr("contact_page", "form.hint")}>
                      {text(C.form.hint, lang, lang === "en" ? "A real person replies, never a bot." : "Te responde una persona real, nunca un bot.")}
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
                <div className="contact-info-card__eyebrow text-mono" {...cmsAttr("contact_page", "info_title")}>{text(C.info_title, lang, lang === "en" ? "Direct line" : "Contacto directo")}</div>
                <a className="contact-info-card__contact" href={`mailto:${C.main_email}`}>{C.main_email}</a>
                {(() => {
                  const phones = (CONTENT.team?.members || []).filter((m) => m.phone);
                  if (phones.length === 0 && C.main_phone) {
                    return (
                      <a className="contact-info-card__contact contact-info-card__contact--brass" href={`tel:${C.main_phone}`}>{C.main_phone}</a>
                    );
                  }
                  return phones.map((m) => (
                    <a
                      key={m.name}
                      className="contact-info-card__contact contact-info-card__contact--brass"
                      href={`tel:${String(m.phone).replace(/[^+\d]/g, "")}`}
                    >
                      <span className="contact-info-card__contact-name">{String(m.name).split(" ")[0]}</span>
                      {m.phone}
                    </a>
                  ));
                })()}
                <div className="contact-info-card__divider"></div>
                <p className="contact-info-card__address">{text(C.address, lang, "Orlando, FL · USA")}</p>
              </div>

              <ul className="contact-v2-trust">
                <li>{lang === "en" ? "Respond within 48 hours" : "Respuesta en 48 h"}</li>
                <li>{lang === "en" ? "No obligation, no pressure" : "Sin compromiso, sin presión"}</li>
              </ul>
            </aside>
          </Reveal>
        </div>
      </section>

      <FaqSection lang={lang} />

    </div>
  );
};

// ===== CONDITIONS PAGE =====
export function ConditionsPage({ lang }) {
  const legal = CONTENT.legal?.project_conditions;
  const fallbackSections = [
    { num:"01", title: lang==="en"?"Free Estimate":"Presupuesto Gratuito",
      body: lang==="en"
        ? "We begin with a consultation to understand your space, your goals, and the level of service that best fits your project. Your estimate is an initial evaluation and may evolve based on final selections, site conditions, and project details. Estimates are typically valid for a limited period due to potential changes in material costs and availability."
        : "Empezamos con una consulta para entender tu espacio, tus objetivos y el nivel de servicio que mejor se adapta a tu proyecto. El presupuesto es una evaluación inicial que puede evolucionar según las elecciones finales, las condiciones del sitio y los detalles del proyecto. Los presupuestos suelen ser válidos durante un periodo limitado debido a posibles variaciones en los costes y la disponibilidad de los materiales." },
    { num:"02", title: lang==="en"?"Project Validation":"Validación del Proyecto",
      body: lang==="en"
        ? "A project is considered ready once the following are clearly defined: selected service level, confirmed layout and design direction, estimated budget and main components. Once validated, we move into planning and execution."
        : "Un proyecto está listo cuando los siguientes elementos están claramente definidos: nivel de servicio elegido, distribución y dirección de diseño confirmadas, presupuesto estimado y componentes principales. Una vez validado, pasamos a la planificación y la ejecución." },
    { num:"03", title: lang==="en"?"Scope of Work & Service Levels":"Alcance y Niveles de Servicio",
      body: lang==="en"
        ? "Each service includes only what is clearly defined within the selected level: Garage Design & Build Plan (planning & visual design), Design & Setup (design, sourcing & preparation), Full Transformation (full coordination & execution), Smart Integration (technical systems & upgrades). Any request outside the selected service is handled as a project adjustment."
        : "Cada servicio incluye únicamente lo que está claramente definido en el nivel elegido: Garage Design & Build Plan (planificación y diseño), Design & Setup (diseño, sourcing y preparación), Transformación Completa (coordinación y ejecución), Smart Integration (sistemas técnicos). Cualquier solicitud fuera del alcance se trata como un ajuste de proyecto." },
    { num:"04", title: lang==="en"?"Design Visuals & Approval":"Visuales y Aprobación",
      body: lang==="en"
        ? "Our 3D visuals represent the overall design intent, layout, and atmosphere. As every garage is unique, small variations may occur in the final result due to materials, lighting, or product availability. Before moving forward, you'll review and approve your design, this is your opportunity to make sure everything feels right."
        : "Nuestras imágenes 3D representan la intención de diseño, la distribución y la atmósfera. Como cada garaje es único, pueden producirse pequeñas variaciones según los materiales, la iluminación o la disponibilidad. Antes de avanzar, revisas y validas tu diseño, es tu momento para asegurarte de que todo encaja." },
    { num:"05", title: lang==="en"?"Client Responsibilities":"Responsabilidades del Cliente",
      body: lang==="en"
        ? "You agree to provide accurate information about your space and needs, review and approve designs in a timely manner, ensure access to the property, and obtain any required approvals (HOA, building management). The garage must be fully prepared before delivery: personal items removed, workspace cleared, access unobstructed."
        : "Te comprometes a facilitar información precisa, validar los diseños con rapidez, garantizar el acceso a la propiedad y obtener las autorizaciones necesarias (HOA, administrador de la finca). El garaje debe estar totalmente preparado antes de la entrega: objetos personales retirados, espacio despejado, accesos libres." },
    { num:"06", title: lang==="en"?"Site Documentation":"Documentación del Sitio",
      body: lang==="en"
        ? "We may take photos or short videos during on-site visits for internal use only. They are never used for marketing without your prior approval."
        : "Podemos tomar fotos o vídeos cortos durante las visitas, únicamente para uso interno. Nunca se utilizan con fines de marketing sin tu autorización previa." },
    { num:"07", title: lang==="en"?"Permits & Licensed Trades":"Permisos y Profesionales Acreditados",
      body: lang==="en"
        ? "Some projects may require permits depending on the scope and local regulations. The client is responsible unless otherwise included. We coordinate with qualified, licensed professionals when required."
        : "Algunos proyectos pueden requerir permisos según el alcance y la normativa local. El cliente es responsable salvo que se indique lo contrario. Coordinamos con profesionales cualificados y acreditados cuando es necesario." },
    { num:"08", title: lang==="en"?"Timeline & Payment":"Plazos y Pagos",
      body: lang==="en"
        ? "Timelines are estimated and may be influenced by material availability, supplier delays, weather, permits, and site readiness. A deposit is required to secure your project, typically: initial deposit, progress payments, final balance prior to completion. No work begins without confirmed payment."
        : "Los plazos son estimativos y pueden verse afectados por la disponibilidad de materiales, los proveedores, la meteorología, los permisos y la preparación del sitio. Se requiere un anticipo para asegurar el proyecto, habitualmente: anticipo inicial, pagos intermedios y saldo final antes de la entrega. Ningún trabajo se inicia sin pago confirmado." },
    { num:"09", title: lang==="en"?"Adjustments & Cancellation":"Ajustes y Cancelación",
      body: lang==="en"
        ? "Any change after approval is a project adjustment and may impact pricing and timeline. Custom work and orders may not be canceled once initiated; work completed up to cancellation remains payable."
        : "Cualquier cambio tras la validación es un ajuste y puede afectar al precio y a los plazos. Los trabajos y pedidos personalizados no pueden cancelarse una vez iniciados; el trabajo realizado hasta la cancelación sigue siendo facturable." },
    { num:"10", title: lang==="en"?"Warranty & Portfolio Use":"Garantía y Portfolio",
      body: lang==="en"
        ? "Manufacturer warranties apply to products. Installation warranty applies when installation is handled by our team or partners. We may use project photos for portfolio purposes unless you request otherwise in writing."
        : "Las garantías del fabricante se aplican a los productos. La garantía de instalación se aplica cuando esta es gestionada por nuestro equipo o socios. Podemos usar las fotos del proyecto para nuestro portfolio salvo solicitud escrita en sentido contrario." },
    { num:"11", title: lang==="en"?"Delivery Area":"Zona de Servicio",
      body: lang==="en"
        ? "On-site visits are available throughout the Orlando area. Visits beyond our standard zone are quoted based on location."
        : "Las visitas in situ están disponibles en toda la zona de Orlando. Las visitas fuera de nuestra zona estándar se presupuestan según la ubicación." }
  ];
  const sections = legal?.sections?.length
    ? legal.sections.map((section) => ({
        num: section.num,
        title: section.title[lang],
        body: section.body[lang],
      }))
    : fallbackSections;
  const pageTitle = legal?.title?.[lang] || (lang==="en" ? "Website Project Details & Conditions." : "Condiciones y compromisos del proyecto.");
  const pageIntro = legal?.intro?.[lang] || (
    lang==="en"
      ? "We set clear expectations from day one, plan carefully, and guide your project from idea to completion. By engaging with Garage a la Carte, you agree to these guidelines unless otherwise defined in a written agreement."
      : "Definimos expectativas claras desde el primer día y acompañamos tu proyecto desde la idea hasta la entrega. Al trabajar con Garage a la Carte, aceptas estas condiciones salvo acuerdo escrito en sentido contrario."
  );

  return (
    <div className="page conditions-v2">
      <section className="conditions-v2-head">
        <div className="conditions-v2-head__inner">
          <Reveal as="div" className="conditions-v2-head__eyebrow">
            {lang==="en" ? "Legal · Project conditions" : "Condiciones del proyecto"}
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
            <div className="conditions-v2-aside__label">{lang==="en"?"Index":"Índice"}</div>
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
              <div className="conditions-v2-commit__label">{lang==="en"?"Our commitment":"Nuestro compromiso"}</div>
              <div className="conditions-v2-commit__grid">
                {(lang==="en"
                  ? ["Clear communication", "Thoughtful design", "Reliable coordination", "Aligned results"]
                  : ["Comunicación clara", "Diseño cuidado", "Coordinación fiable", "Resultados alineados"]
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
