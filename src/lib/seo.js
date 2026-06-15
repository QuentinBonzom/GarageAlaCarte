const viteSiteUrl =
  typeof import.meta !== "undefined" ? import.meta.env?.VITE_SITE_URL : "";
const nodeSiteUrl =
  typeof process !== "undefined" ? process.env?.VITE_SITE_URL : "";
export const SITE_URL = (
  viteSiteUrl ||
  nodeSiteUrl ||
  "https://garagealacarte.com"
).replace(/\/$/, "");

const BRAND = "Garage a la Carte";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;
export const CONTACT_EMAIL = "garagealacarte@gmail.com";
export const CONTACT_PHONE = "+1-917-353-4950";
const DEFAULT_LOCALE = {
  en: "en_US",
  fr: "es_ES",
};
export const SERVICES_SECTION_PATH = "/#services_intro";

export const SERVICE_AREA_PLACES = [
  "Orlando, FL",
  "Winter Park, FL",
  "Lake Nona, FL",
  "Windermere, FL",
  "Winter Garden, FL",
  "Kissimmee, FL",
  "Maitland, FL",
  "Doctor Phillips, FL",
  "Orange County, FL",
  "Central Florida",
  "Thornton Park, FL",
  "Colonialtown, FL",
  "Lake Eustis, FL",
  "Altamonte Springs, FL",
  "Longwood, FL",
  "Casselberry, FL",
  "Sanford, FL",
  "Apopka, FL",
  "Oviedo, FL",
  "Heathrow, FL",
];

export const PRIMARY_SEO_KEYWORDS = [
  "garage remodeling Orlando",
  "garage renovation Orlando",
  "custom garage design Orlando",
  "garage makeover Orlando",
  "garage organization Orlando",
  "garage storage solutions Orlando",
  "garage cabinets Orlando",
  "luxury garage design",
  "garage man cave",
  "garage transformation Orlando",
  "Orlando",
  "Orlando FL",
  "Central Florida",
  "Orange County",
  "home gym garage Orlando",
  "garage office conversion Orlando",
  "garage lounge design",
  "garage bar setup Orlando",
  "garage workshop organization",
  "3D garage design Orlando",
  "garage storage systems Orlando",
  "luxury garage renovation",
  "garage transformation ideas",
  "affordable garage remodel",
  "garage design consultation",
];

export const SERVICE_SEO = {
  blueprint: {
    path: SERVICES_SECTION_PATH,
    label: "Garage Design & Build Plan",
    title: {
      en: "Custom Garage Design Orlando | 3D Garage Plans",
      fr: "Plan de diseño de garaje en Orlando, FL | Planos 3D",
    },
    description: {
      en: "Custom garage design Orlando service with 3D garage plans, realistic views, luxury garage design direction, and expert space-planning guidance.",
      fr: "Planifica tu reforma de garaje en Orlando antes de construir con distribuciones a medida, planos 3D, vistas realistas y asesoramiento experto.",
    },
    keywords: [
      "custom garage design Orlando",
      "luxury garage design",
      "garage transformation Orlando",
    ],
    serviceType: "Garage design planning and 3D space planning",
  },
  delivery: {
    path: SERVICES_SECTION_PATH,
    label: "Design & Setup",
    title: {
      en: "Garage Organization Orlando | Storage Solutions & Cabinets",
      fr: "Diseño y setup de garaje en Orlando | Almacenamiento y materiales",
    },
    description: {
      en: "Garage organization Orlando service for custom layouts, garage storage solutions Orlando homeowners need, cabinet planning, sourcing, and setup guidance.",
      fr: "Pasa del diseño a la ejecución con planificación del espacio, selección de productos, coordinación de sourcing, almacenamiento y guía de instalación en Orlando.",
    },
    keywords: [
      "garage organization Orlando",
      "garage storage solutions Orlando",
      "garage cabinets Orlando",
      "custom garage design Orlando",
    ],
    serviceType:
      "Garage design, product sourcing, setup planning, and storage coordination",
  },
  transform: {
    path: SERVICES_SECTION_PATH,
    label: "Full Transformation",
    title: {
      en: "Garage Remodeling Orlando | Renovation & Transformation",
      fr: "Reforma y transformación completa de garaje en Orlando, FL",
    },
    description: {
      en: "Garage remodeling Orlando and garage renovation Orlando service for makeovers, garage man cave concepts, home gyms, offices, lounges, and full transformations.",
      fr: "Convierte tu garaje en Orlando en gimnasio, oficina, lounge, sala de ocio, zona de almacenamiento o espacio multiuso premium con una transformación completa.",
    },
    keywords: [
      "garage remodeling Orlando",
      "garage renovation Orlando",
      "garage makeover Orlando",
      "garage transformation Orlando",
      "garage man cave",
    ],
    serviceType: "Full garage remodeling, renovation, and transformation",
  },
  smart: {
    path: SERVICES_SECTION_PATH,
    label: "Smart Integration",
    title: {
      en: "Luxury Garage Design & Smart Integration Orlando",
      fr: "Integración smart para garajes en Orlando | HVAC, iluminación y multimedia",
    },
    description: {
      en: "Luxury garage design support for Orlando garage transformation projects with smart lighting, electrical planning, HVAC, ventilation, media, and integrated systems.",
      fr: "Mejora tu transformación de garaje en Orlando con iluminación inteligente, planificación eléctrica, HVAC, ventilación, multimedia, fontanería y sistemas integrados.",
    },
    keywords: [
      "luxury garage design",
      "garage transformation Orlando",
      "custom garage design Orlando",
    ],
    serviceType:
      "Smart garage systems, HVAC, lighting, electrical, media, and integrated technical planning",
  },
};

export const SEO_ROUTES = {
  home: {
    path: "/",
    title: {
      en: "Garage Remodeling Orlando, FL | Custom Garage Design",
      fr: "Diseño y reforma de garajes en Orlando, FL | Garage a la Carte",
    },
    description: {
      en: "Custom garage remodeling in Orlando, FL for home gyms, offices, lounges, storage, and premium garage transformations. Request a free design estimate.",
      fr: "Garage a la Carte diseña y reforma garajes en Orlando para crear gimnasios, oficinas, lounges, espacios de ocio, almacenamiento inteligente y estancias multiuso.",
    },
    keywords: PRIMARY_SEO_KEYWORDS,
  },
  projects: {
    path: "/projects/",
    title: {
      en: "Garage Makeover Orlando | Luxury Garage Design Ideas",
      fr: "Portfolio de reformas de garaje en Orlando, FL | Ideas antes y después",
    },
    description: {
      en: "Explore garage makeover Orlando projects, luxury garage design ideas, garage man cave concepts, storage upgrades, lounges, offices, and full transformations.",
      fr: "Descubre proyectos de transformación de garajes en Orlando: lounges, gimnasios, oficinas, salas de ocio, almacenamiento y espacios premium.",
    },
    keywords: [
      "garage makeover Orlando",
      "luxury garage design",
      "garage man cave",
      "garage transformation Orlando",
      "garage remodeling Orlando",
    ],
  },
  contact: {
    path: "/contact/",
    title: {
      en: "Free Garage Remodeling Estimate Orlando | Garage a la Carte",
      fr: "Presupuesto gratuito para reformar tu garaje en Orlando, FL",
    },
    description: {
      en: "Request a free estimate for garage remodeling in Orlando, garage organization, garage storage solutions, garage cabinets, or a full garage renovation.",
      fr: "Solicita un presupuesto gratuito para diseño, reforma, almacenamiento o transformación completa de garaje en Orlando y Central Florida.",
    },
    keywords: [
      "garage renovation Orlando",
      "garage organization Orlando",
      "garage storage solutions Orlando",
      "garage cabinets Orlando",
      "garage remodeling Orlando",
    ],
  },
  conditions: {
    path: "/conditions/",
    title: {
      en: "Project Conditions | Garage Remodels in Orlando, FL",
      fr: "Condiciones del proyecto | Reformas de garaje en Orlando, FL",
    },
    description: {
      en: "Review Garage a la Carte project conditions, estimates, delivery area, timelines, documentation, permits, and payment terms.",
      fr: "Consulta las condiciones del proyecto de Garage a la Carte: presupuestos, zona de servicio, plazos, documentación, permisos y pagos.",
    },
    keywords: [
      "garage remodeling Orlando",
      "garage renovation Orlando",
      "garage transformation Orlando",
    ],
  },
  admin: {
    path: "/admin/",
    title: {
      en: "Admin | Garage a la Carte",
      fr: "Admin | Garage a la Carte",
    },
    description: {
      en: "Garage a la Carte administration.",
      fr: "Administración Garage a la Carte.",
    },
    noindex: true,
  },
  blog: {
    path: "/blog/",
    title: {
      en: "Garage Remodeling Blog: Guides, Ideas & Tips | Orlando",
      fr: "Blog de Reforma de Garaje: Guías, Ideas y Consejos | Orlando",
    },
    description: {
      en: "Garage remodeling guides, transformation ideas, and storage solutions for Orlando homeowners. Expert tips on costs, design, permits, and organization.",
      fr: "Guías de reforma de garaje, ideas de transformación y soluciones de almacenamiento para propietarios de Orlando. Consejos sobre costos, diseño y organización.",
    },
    keywords: [
      "garage remodeling blog",
      "garage design tips Orlando",
      "garage transformation ideas",
      "garage storage solutions",
      "garage renovation guide",
    ],
  },
  blog_remodeling_guide: {
    path: "/blog/garage-remodeling-guide/",
    slug: "garage-remodeling-guide",
    isArticle: true,
    datePublished: "2026-06-15",
    title: {
      en: "Complete Garage Remodeling Guide for Orlando Homeowners",
      fr: "Guía completa de reforma de garaje para propietarios de Orlando",
    },
    description: {
      en: "Complete guide to garage remodeling in Orlando. Learn about costs, timeline, permits, and contractor tips for successful garage transformations.",
      fr: "Guía completa para reformar tu garaje en Orlando. Costos, plazos, permisos y consejos de contratistas para transformaciones de garaje exitosas.",
    },
    keywords: [
      "garage remodeling guide",
      "garage remodeling cost Orlando",
      "how much garage remodel Orlando",
      "garage renovation timeline",
      "garage remodel permits Orlando",
    ],
  },
  blog_transformation_ideas: {
    path: "/blog/garage-transformation-ideas/",
    slug: "garage-transformation-ideas",
    isArticle: true,
    datePublished: "2026-06-15",
    title: {
      en: "Garage Transformation Ideas: Man Cave, Home Gym, Office, Lounge",
      fr: "Ideas de transformación de garaje: cueva de hombre, gimnasio, oficina, lounge",
    },
    description: {
      en: "Explore 4 garage transformation ideas: man cave, home gym, office, and lounge. See designs, costs, and how to convert your garage into your favorite room.",
      fr: "Descubre 4 ideas de transformación de garaje: cueva de hombre, gimnasio, oficina y lounge. Diseños, costos y cómo convertir tu garaje.",
    },
    keywords: [
      "garage transformation ideas",
      "garage man cave",
      "home gym garage",
      "garage office conversion",
      "garage lounge design",
    ],
  },
  blog_storage_solutions: {
    path: "/blog/garage-storage-solutions/",
    slug: "garage-storage-solutions",
    isArticle: true,
    datePublished: "2026-06-15",
    title: {
      en: "Best Garage Storage Solutions & Organization Systems 2026",
      fr: "Mejores soluciones de almacenamiento de garaje y sistemas de organización 2026",
    },
    description: {
      en: "Comprehensive guide to garage storage solutions. Compare wall, ceiling, modular systems & custom storage. Find the best organization system for your garage.",
      fr: "Guía completa de soluciones de almacenamiento de garaje. Compara sistemas de pared, techo, modulares y almacenamiento personalizado para tu garaje.",
    },
    keywords: [
      "garage storage solutions",
      "best garage storage systems",
      "garage organization systems",
      "garage wall storage",
      "garage shelving systems Orlando",
    ],
  },
};

export function routeToPath(route) {
  return SEO_ROUTES[route]?.path || "/";
}

export function routeFromLocation(location) {
  const hashRoute = location.hash.replace("#", "").replace(/^\/+/, "");
  if (SEO_ROUTES[hashRoute]) return hashRoute;

  const path = location.pathname.replace(/\/+$/, "") || "/";
  const entry = Object.entries(SEO_ROUTES).find(
    ([, config]) => (config.path.replace(/\/+$/, "") || "/") === path,
  );
  return entry?.[0] || "home";
}

export function getPageSeo(route, lang) {
  const page = SEO_ROUTES[route] || SEO_ROUTES.home;
  const serviceConfig = page.serviceId ? SERVICE_SEO[page.serviceId] : null;
  return {
    ...page,
    route,
    lang,
    title: page.title[lang] || page.title.en,
    description: page.description[lang] || page.description.en,
    canonical: `${SITE_URL}${page.path}`,
    image: DEFAULT_IMAGE,
    locale: DEFAULT_LOCALE[lang] || DEFAULT_LOCALE.en,
    serviceName: serviceConfig?.label,
    serviceType: serviceConfig?.serviceType || page.serviceType,
    keywords: serviceConfig?.keywords || page.keywords || [],
  };
}

function setMeta(selector, attributes) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    document.head.appendChild(el);
  }
  Object.entries(attributes).forEach(([key, value]) => {
    el.setAttribute(key, value);
  });
}

function setLink(rel, href, extra = {}) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
  Object.entries(extra).forEach(([key, value]) => {
    el.setAttribute(key, value);
  });
}

function setJsonLd(id, data) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement("script");
    el.id = id;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export function buildBusinessJsonLd() {
  const serviceOffers = Object.entries(SERVICE_SEO).map(
    ([serviceId, service]) => ({
      "@type": "Offer",
      url: `${SITE_URL}${SERVICES_SECTION_PATH}`,
      itemOffered: {
        "@type": "Service",
        "@id": `${SITE_URL}/#service-${serviceId}`,
        name: service.label,
        serviceType: service.serviceType,
        areaServed: "Orlando, FL",
      },
    }),
  );

  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${SITE_URL}/#business`,
    name: BRAND,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/logo.png`,
    image: [DEFAULT_IMAGE, `${SITE_URL}/logo.png`],
    description:
      "Custom garage design, garage remodeling, 3D space planning, storage, and smart garage transformation services based in Orlando, Florida.",
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE,
    slogan: "American precision, European design.",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Orlando",
      addressRegion: "FL",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.5383,
      longitude: -81.3792,
    },
    areaServed: SERVICE_AREA_PLACES.map((name) => ({
      "@type": "Place",
      name,
    })),
    knowsAbout: [
      ...PRIMARY_SEO_KEYWORDS,
      "Garage remodeling",
      "Garage renovation",
      "Garage design",
      "3D garage plans",
      "Garage storage systems",
      "Home gym garage conversion",
      "Garage office conversion",
      "Garage lounge design",
      "Smart garage integration",
      "HVAC and electrical planning for garages",
      "Epoxy flooring garage",
      "Garage wall organization",
      "Garage lighting design",
      "Climate control garage",
      "Garage security systems",
      "Garage soundproofing",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Garage design and remodeling services in Orlando",
      itemListElement: serviceOffers,
    },
    makesOffer: serviceOffers,
    contactPoint: {
      "@type": "ContactPoint",
      email: CONTACT_EMAIL,
      telephone: CONTACT_PHONE,
      contactType: "customer service",
      areaServed: "US-FL",
      availableLanguage: ["English", "Spanish"],
    },
  };
}

// Bilingual FAQ (EN + ES). Used BOTH for the visible FAQ section and the
// FAQPage structured data, so the markup always matches on-page content
// (a Google requirement). The "fr" key stores Spanish on this site.
export const FAQ_ITEMS = [
  {
    q: {
      en: "How much does a garage remodel cost in Orlando?",
      fr: "¿Cuánto cuesta reformar un garaje en Orlando?",
    },
    a: {
      en: "Garage remodeling costs in Orlando typically range from $3,000 to $25,000+ depending on scope. Design-only projects start at $950, while full transformations with custom cabinetry, flooring, and smart systems cost more. We provide free estimates tailored to your specific project.",
      fr: "El coste de reformar un garaje en Orlando suele oscilar entre 3 000 $ y 25 000 $ o más, según el alcance. Los proyectos solo de diseño parten desde 950 $, mientras que las transformaciones completas con armarios a medida, suelo y sistemas inteligentes cuestan más. Ofrecemos presupuestos gratuitos adaptados a tu proyecto.",
    },
  },
  {
    q: {
      en: "What's the best garage storage system?",
      fr: "¿Cuál es el mejor sistema de almacenamiento para el garaje?",
    },
    a: {
      en: "The best garage storage system depends on your needs. Options include wall-mounted shelving, ceiling-mounted systems, modular cabinets, and vertical storage. We recommend a combination approach tailored to your lifestyle, tools, and space. Our team designs custom solutions that maximize usable space.",
      fr: "El mejor sistema depende de tus necesidades. Las opciones incluyen estanterías de pared, sistemas suspendidos del techo, armarios modulares y almacenamiento vertical. Recomendamos un enfoque combinado, adaptado a tu estilo de vida, tus herramientas y tu espacio. Nuestro equipo diseña soluciones a medida que maximizan el espacio útil.",
    },
  },
  {
    q: {
      en: "Can a garage be converted into a home gym or office?",
      fr: "¿Se puede convertir un garaje en gimnasio u oficina?",
    },
    a: {
      en: "Yes, garages make excellent home gyms, offices, or lounges. Proper climate control, lighting, flooring, and electrical planning are essential. Our design services ensure your converted garage is functional, comfortable, and aligned with your lifestyle needs.",
      fr: "Sí, los garajes son excelentes como gimnasios, oficinas o lounges. Son esenciales un buen control de la temperatura, iluminación, suelo y planificación eléctrica. Nuestro servicio de diseño garantiza que tu garaje convertido sea funcional, cómodo y acorde a tu estilo de vida.",
    },
  },
  {
    q: {
      en: "How long does a garage transformation take?",
      fr: "¿Cuánto tarda una transformación de garaje?",
    },
    a: {
      en: "Timeline varies by project. Design-only projects take 1-2 weeks. Installation timelines depend on scope, permits, and contractor availability. A typical full remodel takes 4-12 weeks. We provide detailed project schedules during your consultation.",
      fr: "El plazo varía según el proyecto. Los proyectos solo de diseño tardan de 1 a 2 semanas. Los plazos de instalación dependen del alcance, los permisos y la disponibilidad. Una reforma completa típica lleva de 4 a 12 semanas. Te entregamos un calendario detallado durante la consulta.",
    },
  },
  {
    q: {
      en: "Do you offer free garage design consultations?",
      fr: "¿Ofrecen consultas de diseño gratuitas?",
    },
    a: {
      en: "Yes, we offer free initial consultations to understand your vision and project goals. For detailed 3D designs and professional plans, we provide services starting at $950. Contact us for your free consultation.",
      fr: "Sí, ofrecemos consultas iniciales gratuitas para entender tu visión y tus objetivos. Para diseños 3D detallados y planos profesionales, ofrecemos servicios desde 950 $. Contáctanos para tu consulta gratuita.",
    },
  },
];

export const LOCAL_SEO_FAQ_ITEM = {
  q: {
    en: "Do you remodel garages in Orlando and nearby areas?",
    fr: "¿Reforman garajes en Orlando y zonas cercanas?",
  },
  a: {
    en: "Yes. Garage a la Carte designs and coordinates garage remodeling projects across Orlando and Central Florida, including Winter Park, Lake Nona, Windermere, Winter Garden, Kissimmee, Maitland, and Doctor Phillips. Projects can include 3D garage design, organization systems, cabinets, flooring, lighting, storage, and smart integrations.",
    fr: "Sí. Garage a la Carte diseña y coordina reformas de garaje en Orlando y Central Florida, incluyendo Winter Park, Lake Nona, Windermere, Winter Garden, Kissimmee, Maitland y Doctor Phillips. Los proyectos pueden incluir diseño 3D, organización, armarios, suelo, iluminación, almacenamiento e integraciones smart.",
  },
};

export function getVisibleFaqItems(items = FAQ_ITEMS) {
  const base = Array.isArray(items) && items.length ? items : FAQ_ITEMS;
  const hasLocalQuestion = base.some(
    (item) => item.q?.en === LOCAL_SEO_FAQ_ITEM.q.en,
  );
  return hasLocalQuestion ? base : [...base, LOCAL_SEO_FAQ_ITEM];
}

// Routes where the FAQ is visible on the page, the FAQPage schema is only
// emitted on these, to stay compliant with Google's structured-data guidelines.
export const FAQ_ROUTES = ["home", "contact"];

export function routeHasFaq(route) {
  return FAQ_ROUTES.includes(route);
}

export function buildFaqJsonLd(lang = "en", items = FAQ_ITEMS) {
  const list = getVisibleFaqItems(items);
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: list.map((item) => ({
      "@type": "Question",
      name: item.q[lang] || item.q.en,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a[lang] || item.a.en,
      },
    })),
  };
}

function getPageType(route) {
  if (route === "home") return "WebPage";
  if (route === "projects") return "CollectionPage";
  if (route === "contact") return "ContactPage";
  if (route === "blog") return "Blog";
  return "WebPage";
}

function buildArticleJsonLd(page) {
  if (!page.isArticle) return null;
  return {
    "@type": "BlogPosting",
    "@id": `${page.canonical}#article`,
    headline: page.title,
    description: page.description,
    image: page.image,
    keywords: page.keywords?.join(", "),
    inLanguage: page.lang === "fr" ? "es-ES" : "en-US",
    datePublished: page.datePublished,
    dateModified: page.dateModified || page.datePublished,
    mainEntityOfPage: { "@id": `${page.canonical}#webpage` },
    isPartOf: { "@id": `${SITE_URL}/blog/#webpage` },
    author: { "@id": `${SITE_URL}/#business` },
    publisher: { "@id": `${SITE_URL}/#business` },
  };
}

function buildServiceJsonLd(page) {
  if (!page.serviceId) return null;
  return {
    "@type": "Service",
    "@id": `${page.canonical}#service`,
    name: page.serviceName,
    serviceType: page.serviceType,
    description: page.description,
    keywords: page.keywords?.join(", "),
    url: page.canonical,
    provider: {
      "@id": `${SITE_URL}/#business`,
    },
    areaServed: SERVICE_AREA_PLACES.map((name) => ({
      "@type": "Place",
      name,
    })),
    offers: {
      "@type": "Offer",
      url: page.canonical,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      offeredBy: {
        "@id": `${SITE_URL}/#business`,
      },
    },
  };
}

export function buildPageJsonLd(page) {
  const breadcrumbs = [
    {
      "@type": "ListItem",
      position: 1,
      name: BRAND,
      item: `${SITE_URL}/`,
    },
  ];

  if (page.route !== "home") {
    breadcrumbs.push({
      "@type": "ListItem",
      position: 2,
      name: page.title,
      item: page.canonical,
    });
  }

  const graph = [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: BRAND,
      url: `${SITE_URL}/`,
      inLanguage: page.lang === "fr" ? "es-ES" : "en-US",
      publisher: {
        "@id": `${SITE_URL}/#business`,
      },
    },
    {
      "@type": getPageType(page.route),
      "@id": `${page.canonical}#webpage`,
      url: page.canonical,
      name: page.title,
      description: page.description,
      keywords: page.keywords?.join(", "),
      isPartOf: {
        "@id": `${SITE_URL}/#website`,
      },
      about: {
        "@id": `${SITE_URL}/#business`,
      },
      inLanguage: page.lang === "fr" ? "es-ES" : "en-US",
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: page.image,
      },
      ...(page.serviceId
        ? {
            mainEntity: {
              "@id": `${page.canonical}#service`,
            },
          }
        : {}),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs,
    },
  ];

  const serviceJsonLd = buildServiceJsonLd(page);
  if (serviceJsonLd) graph.push(serviceJsonLd);

  const articleJsonLd = buildArticleJsonLd(page);
  if (articleJsonLd) graph.push(articleJsonLd);

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export function applyPageSeo({ route, lang, faqItems }) {
  const page = getPageSeo(route, lang);
  document.documentElement.lang = lang === "fr" ? "es" : "en";
  document.title = page.title;

  setMeta('meta[name="description"]', {
    name: "description",
    content: page.description,
  });
  setMeta('meta[name="robots"]', {
    name: "robots",
    content: page.noindex
      ? "noindex, nofollow"
      : "index, follow, max-image-preview:large",
  });
  setMeta('meta[name="geo.region"]', { name: "geo.region", content: "US-FL" });
  setMeta('meta[name="geo.placename"]', {
    name: "geo.placename",
    content: "Orlando",
  });
  setMeta('meta[name="ICBM"]', { name: "ICBM", content: "28.5383, -81.3792" });

  setMeta('meta[property="og:type"]', {
    property: "og:type",
    content: page.isArticle ? "article" : "website",
  });
  if (page.isArticle) {
    setMeta('meta[property="article:published_time"]', {
      property: "article:published_time",
      content: page.datePublished || "",
    });
    setMeta('meta[property="article:modified_time"]', {
      property: "article:modified_time",
      content: page.dateModified || page.datePublished || "",
    });
  }
  setMeta('meta[property="og:site_name"]', {
    property: "og:site_name",
    content: BRAND,
  });
  setMeta('meta[property="og:title"]', {
    property: "og:title",
    content: page.title,
  });
  setMeta('meta[property="og:description"]', {
    property: "og:description",
    content: page.description,
  });
  setMeta('meta[property="og:url"]', {
    property: "og:url",
    content: page.canonical,
  });
  setMeta('meta[property="og:image"]', {
    property: "og:image",
    content: page.image,
  });
  setMeta('meta[property="og:image:width"]', {
    property: "og:image:width",
    content: "1200",
  });
  setMeta('meta[property="og:image:height"]', {
    property: "og:image:height",
    content: "630",
  });
  setMeta('meta[property="og:locale"]', {
    property: "og:locale",
    content: page.locale,
  });

  setMeta('meta[name="twitter:card"]', {
    name: "twitter:card",
    content: "summary_large_image",
  });
  setMeta('meta[name="twitter:title"]', {
    name: "twitter:title",
    content: page.title,
  });
  setMeta('meta[name="twitter:description"]', {
    name: "twitter:description",
    content: page.description,
  });
  setMeta('meta[name="twitter:image"]', {
    name: "twitter:image",
    content: page.image,
  });

  setLink("canonical", page.canonical);
  setJsonLd("seo-business-jsonld", buildBusinessJsonLd());
  // FAQ schema only on pages that actually display the FAQ (Google requirement).
  if (routeHasFaq(route)) {
    setJsonLd("seo-faq-jsonld", buildFaqJsonLd(lang, faqItems));
  } else {
    document.getElementById("seo-faq-jsonld")?.remove();
  }
  setJsonLd("seo-page-jsonld", buildPageJsonLd(page));
}
