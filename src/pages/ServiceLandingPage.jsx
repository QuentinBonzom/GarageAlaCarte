import { CONTENT } from "../data/content";
import { Reveal } from "../components/common";
import {
  PRIMARY_SEO_KEYWORDS,
  SERVICE_AREA_PLACES,
  SERVICE_SEO,
  getServiceRouteForId,
  routeToPath,
} from "../lib/seo";

function text(value, lang, fallback = "") {
  if (!value) return fallback;
  if (typeof value === "string") return value;
  return value[lang] || value.en || value.fr || fallback;
}

function list(value, lang) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  const picked = value[lang] ?? value.en ?? value.fr;
  if (Array.isArray(picked)) return picked;
  return picked ? [picked] : [];
}

function findService(route) {
  const entry = Object.entries(SERVICE_SEO).find(([, config]) => config.route === route);
  if (!entry) return {};
  const [serviceId, seo] = entry;
  const service = CONTENT.services?.items?.find((item) => item.id === serviceId);
  return { serviceId, seo, service };
}

export function ServiceLandingPage({ route, lang, onNav }) {
  const { serviceId, seo, service } = findService(route);
  const serviceTitle = text(service?.title, lang, seo?.label || "Garage service");
  const serviceSubtitle = text(service?.sub, lang, "");
  const serviceDescription = text(service?.description, lang, seo?.description?.[lang] || seo?.description?.en || "");
  const includes = list(service?.includes, lang);
  const details = service?.details || [];
  const otherServices = (CONTENT.services?.items || []).filter((item) => item.id !== serviceId);
  const keywordFocus = seo?.keywords || PRIMARY_SEO_KEYWORDS;

  const go = (target) => {
    onNav?.(target);
  };

  return (
    <div className="page service-page">
      <section className="service-page__hero">
        <div className="service-page__hero-inner">
          <Reveal as="div" className="service-page__eyebrow">
            {lang === "en" ? "Garage services in Orlando, FL" : "Servicios de garaje en Orlando, FL"}
          </Reveal>
          <Reveal as="h1" className="service-page__title">
            {lang === "en" ? `${serviceTitle} in Orlando, Florida` : `${serviceTitle} en Orlando, Florida`}
          </Reveal>
          {serviceSubtitle && (
            <Reveal as="p" className="service-page__subtitle" delay={0.06}>
              {serviceSubtitle}
            </Reveal>
          )}
          <Reveal as="p" className="service-page__lead" delay={0.1}>
            {serviceDescription}
          </Reveal>
          <Reveal className="service-page__actions" delay={0.16}>
            <a
              className="btn"
              href={routeToPath("contact")}
              onClick={(event) => {
                event.preventDefault();
                go("contact");
              }}
            >
              {lang === "en" ? "Request a free estimate" : "Solicitar presupuesto gratuito"} <span className="arrow">↗</span>
            </a>
            <a
              className="btn btn-ghost"
              href={routeToPath("projects")}
              onClick={(event) => {
                event.preventDefault();
                go("projects");
              }}
            >
              {lang === "en" ? "View Orlando projects" : "Ver proyectos en Orlando"}
            </a>
          </Reveal>
        </div>
      </section>

      <section className="service-page__body">
        <div className="service-page__grid">
          <Reveal as="article" className="service-page__panel">
            <div className="service-page__panel-kicker">
              {lang === "en" ? "Local focus" : "Enfoque local"}
            </div>
            <h2>
              {lang === "en"
                ? "Built for Orlando garages and Central Florida homes."
                : "Pensado para garajes de Orlando y viviendas de Central Florida."}
            </h2>
            <p>
              {lang === "en"
                ? "We plan garage remodeling, custom storage, home gym garage conversions, garage offices, entertainment lounges, automotive spaces, and smart garage integrations for homeowners around Orlando."
                : "Planificamos reformas de garaje, almacenamiento a medida, gimnasios en garaje, oficinas, lounges de ocio, espacios automovilísticos e integraciones smart para propietarios en Orlando."}
            </p>
          </Reveal>
          <Reveal as="aside" className="service-page__summary" delay={0.08}>
            <div className="service-page__summary-label">{lang === "en" ? "Service" : "Servicio"}</div>
            <div className="service-page__summary-title">{serviceTitle}</div>
            {service?.price && <div className="service-page__price">{text(service.price, lang)}</div>}
            {service?.deposit && (
              <p className="service-page__summary-note">{text(service.deposit, lang)}</p>
            )}
          </Reveal>
        </div>

        {lang === "en" && keywordFocus.length > 0 && (
          <Reveal as="section" className="service-page__section service-page__keywords" delay={0.09}>
            <div className="service-page__section-head">
              <div className="service-page__panel-kicker">Project goals</div>
              <h2>Common Orlando searches this service supports.</h2>
            </div>
            <div className="service-page__areas-list">
              {keywordFocus.map((keyword) => <span key={keyword}>{keyword}</span>)}
            </div>
          </Reveal>
        )}

        {includes.length > 0 && (
          <Reveal as="section" className="service-page__section" delay={0.1}>
            <div className="service-page__section-head">
              <div className="service-page__panel-kicker">{lang === "en" ? "What you get" : "Lo que incluye"}</div>
              <h2>{lang === "en" ? "A clear plan before you spend." : "Un plan claro antes de invertir."}</h2>
            </div>
            <ul className="service-page__includes">
              {includes.map((item, index) => (
                <li key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        {details.length > 0 && (
          <Reveal as="section" className="service-page__details" delay={0.12}>
            {details.slice(0, 4).map((detail, index) => {
              const title = text(detail.title, lang, "");
              const body = text(detail.body, lang, "");
              const items = list(detail.items, lang);
              return (
                <article key={`${title}-${index}`} className="service-page__detail">
                  {title && <h3>{title}</h3>}
                  {body && <p>{body}</p>}
                  {items.length > 0 && (
                    <ul>
                      {items.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  )}
                </article>
              );
            })}
          </Reveal>
        )}

        <Reveal as="section" className="service-page__section service-page__areas" delay={0.14}>
          <div className="service-page__section-head">
            <div className="service-page__panel-kicker">{lang === "en" ? "Service area" : "Zona de servicio"}</div>
            <h2>{lang === "en" ? "Garage design and remodeling across Orlando." : "Diseño y reforma de garajes en Orlando."}</h2>
          </div>
          <div className="service-page__areas-list">
            {SERVICE_AREA_PLACES.map((place) => <span key={place}>{place}</span>)}
          </div>
        </Reveal>

        <Reveal as="section" className="service-page__section service-page__related" delay={0.16}>
          <div className="service-page__section-head">
            <div className="service-page__panel-kicker">{lang === "en" ? "Related services" : "Servicios relacionados"}</div>
            <h2>{lang === "en" ? "Explore the full garage transformation path." : "Explora el recorrido completo de transformación."}</h2>
          </div>
          <div className="service-page__related-grid">
            {otherServices.map((item) => {
              const target = getServiceRouteForId(item.id);
              return (
                <a
                  key={item.id}
                  href={routeToPath(target)}
                  onClick={(event) => {
                    event.preventDefault();
                    go(target);
                  }}
                >
                  <span>{text(item.title, lang)}</span>
                  <small>{text(item.sub, lang)}</small>
                </a>
              );
            })}
          </div>
        </Reveal>
      </section>
    </div>
  );
}
