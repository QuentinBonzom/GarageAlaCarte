const viteSiteUrl = typeof import.meta !== "undefined" ? import.meta.env?.VITE_SITE_URL : "";
const nodeSiteUrl = typeof process !== "undefined" ? process.env?.VITE_SITE_URL : "";
export const SITE_URL = (viteSiteUrl || nodeSiteUrl || "https://garagealacarte.com").replace(/\/$/, "");

const BRAND = "Garage a la Carte";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.svg`;
const DEFAULT_LOCALE = {
  en: "en_US",
  fr: "es_ES",
};

export const SERVICE_AREA_PLACES = [
  "Orlando, FL",
  "Winter Park, FL",
  "Lake Nona, FL",
  "Windermere, FL",
  "Winter Garden, FL",
  "Kissimmee, FL",
  "Maitland, FL",
  "Doctor Phillips, FL",
  "Central Florida",
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
];

export const SERVICE_SEO = {
  blueprint: {
    route: "serviceBlueprint",
    path: "/services/garage-design-blueprint-orlando/",
    label: "Design Blueprint",
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
    route: "serviceSetup",
    path: "/services/garage-design-setup-orlando/",
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
    serviceType: "Garage design, product sourcing, setup planning, and storage coordination",
  },
  transform: {
    route: "serviceTransformation",
    path: "/services/full-garage-transformation-orlando/",
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
    route: "serviceSmart",
    path: "/services/smart-garage-integration-orlando/",
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
    serviceType: "Smart garage systems, HVAC, lighting, electrical, media, and integrated technical planning",
  },
};

export const SERVICE_ROUTE_BY_ID = Object.fromEntries(
  Object.entries(SERVICE_SEO).map(([serviceId, config]) => [serviceId, config.route]),
);

export const SEO_ROUTES = {
  home: {
    path: "/",
    title: {
      en: "Garage Remodeling Orlando | Custom Garage Design Orlando",
      fr: "Diseño y reforma de garajes en Orlando, FL | Garage a la Carte",
    },
    description: {
      en: "Garage remodeling Orlando, custom garage design Orlando, and garage transformation Orlando for home gyms, offices, lounges, storage, and premium rooms.",
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
      en: "Garage Renovation Orlando | Free Remodel Estimate",
      fr: "Presupuesto gratuito para reformar tu garaje en Orlando, FL",
    },
    description: {
      en: "Request a free estimate for garage renovation Orlando, garage organization Orlando, garage storage solutions Orlando, garage cabinets Orlando, or remodel.",
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
};

Object.entries(SERVICE_SEO).forEach(([serviceId, service]) => {
  SEO_ROUTES[service.route] = {
    path: service.path,
    title: service.title,
    description: service.description,
    serviceId,
    serviceType: service.serviceType,
  };
});

export function routeToPath(route) {
  return SEO_ROUTES[route]?.path || "/";
}

export function getServiceRouteForId(serviceId) {
  return SERVICE_ROUTE_BY_ID[serviceId] || "home";
}

export function getServicePathForId(serviceId) {
  return routeToPath(getServiceRouteForId(serviceId));
}

export function routeFromLocation(location) {
  const hashRoute = location.hash.replace("#", "").replace(/^\/+/, "");
  if (SEO_ROUTES[hashRoute]) return hashRoute;

  const path = location.pathname.replace(/\/+$/, "") || "/";
  const entry = Object.entries(SEO_ROUTES).find(([, config]) => (config.path.replace(/\/+$/, "") || "/") === path);
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
  const serviceOffers = Object.values(SERVICE_SEO).map((service) => ({
    "@type": "Offer",
    url: `${SITE_URL}${service.path}`,
    itemOffered: {
      "@type": "Service",
      "@id": `${SITE_URL}${service.path}#service`,
      name: service.label,
      serviceType: service.serviceType,
      areaServed: "Orlando, FL",
    },
  }));

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
    email: "hello@garagealacarte.com",
    telephone: "+1-407-555-0142",
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
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Garage design and remodeling services in Orlando",
      itemListElement: serviceOffers,
    },
    makesOffer: serviceOffers,
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@garagealacarte.com",
      telephone: "+1-407-555-0142",
      contactType: "customer service",
      areaServed: "US-FL",
      availableLanguage: ["English", "Spanish"],
    },
  };
}

function getPageType(route) {
  if (route === "home") return "WebPage";
  if (route === "projects") return "CollectionPage";
  if (route === "contact") return "ContactPage";
  return "WebPage";
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

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export function applyPageSeo({ route, lang }) {
  const page = getPageSeo(route, lang);
  document.documentElement.lang = lang === "fr" ? "es" : "en";
  document.title = page.title;

  setMeta('meta[name="description"]', { name: "description", content: page.description });
  setMeta('meta[name="robots"]', {
    name: "robots",
    content: page.noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large",
  });
  setMeta('meta[name="geo.region"]', { name: "geo.region", content: "US-FL" });
  setMeta('meta[name="geo.placename"]', { name: "geo.placename", content: "Orlando" });
  setMeta('meta[name="ICBM"]', { name: "ICBM", content: "28.5383, -81.3792" });

  setMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
  setMeta('meta[property="og:site_name"]', { property: "og:site_name", content: BRAND });
  setMeta('meta[property="og:title"]', { property: "og:title", content: page.title });
  setMeta('meta[property="og:description"]', { property: "og:description", content: page.description });
  setMeta('meta[property="og:url"]', { property: "og:url", content: page.canonical });
  setMeta('meta[property="og:image"]', { property: "og:image", content: page.image });
  setMeta('meta[property="og:image:width"]', { property: "og:image:width", content: "1200" });
  setMeta('meta[property="og:image:height"]', { property: "og:image:height", content: "630" });
  setMeta('meta[property="og:locale"]', { property: "og:locale", content: page.locale });

  setMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
  setMeta('meta[name="twitter:title"]', { name: "twitter:title", content: page.title });
  setMeta('meta[name="twitter:description"]', { name: "twitter:description", content: page.description });
  setMeta('meta[name="twitter:image"]', { name: "twitter:image", content: page.image });

  setLink("canonical", page.canonical);
  setJsonLd("seo-business-jsonld", buildBusinessJsonLd());
  setJsonLd("seo-page-jsonld", buildPageJsonLd(page));
}
