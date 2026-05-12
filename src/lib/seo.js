const viteSiteUrl = typeof import.meta !== "undefined" ? import.meta.env?.VITE_SITE_URL : "";
const nodeSiteUrl = typeof process !== "undefined" ? process.env?.VITE_SITE_URL : "";
export const SITE_URL = (viteSiteUrl || nodeSiteUrl || "https://garagealacarte.com").replace(/\/$/, "");

const BRAND = "Garage à la Carte";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.svg`;
const DEFAULT_LOCALE = {
  en: "en_US",
  fr: "fr_FR",
};

export const SEO_ROUTES = {
  home: {
    path: "/",
    title: {
      en: "Garage à la Carte | Custom Garage Transformations in Orlando, FL",
      fr: "Garage à la Carte | Transformation de garage sur-mesure à Orlando",
    },
    description: {
      en: "Garage à la Carte designs and transforms garages into home gyms, lounges, offices, entertainment spaces, and smart storage in Orlando, Florida.",
      fr: "Garage à la Carte conçoit et transforme les garages en salles de sport, lounges, bureaux, espaces de vie et rangements intelligents à Orlando, Floride.",
    },
  },
  projects: {
    path: "/projects/",
    title: {
      en: "Garage Transformation Portfolio | Garage à la Carte Orlando",
      fr: "Réalisations de garages transformés | Garage à la Carte Orlando",
    },
    description: {
      en: "Explore custom garage transformation projects in the Orlando area, from social hubs and daily living garages to premium entertainment suites.",
      fr: "Découvrez nos transformations de garages dans la région d'Orlando : espaces de vie, social hubs et suites de divertissement premium.",
    },
  },
  contact: {
    path: "/contact/",
    title: {
      en: "Free Garage Transformation Estimate in Orlando | Garage à la Carte",
      fr: "Devis gratuit pour transformer votre garage à Orlando | Garage à la Carte",
    },
    description: {
      en: "Request a free estimate for a custom garage design or full garage transformation in Orlando, FL and nearby Central Florida communities.",
      fr: "Demandez un devis gratuit pour un design ou une transformation complète de garage à Orlando et dans la région de Central Florida.",
    },
  },
  conditions: {
    path: "/conditions/",
    title: {
      en: "Project Conditions | Garage à la Carte Orlando",
      fr: "Conditions de projet | Garage à la Carte Orlando",
    },
    description: {
      en: "Review Garage à la Carte project conditions, estimates, delivery area, timelines, documentation, permits, and payment terms.",
      fr: "Consultez les conditions de projet Garage à la Carte : devis, zone de service, délais, documentation, permis et paiements.",
    },
  },
  admin: {
    path: "/admin/",
    title: {
      en: "Admin | Garage à la Carte",
      fr: "Admin | Garage à la Carte",
    },
    description: {
      en: "Garage à la Carte administration.",
      fr: "Administration Garage à la Carte.",
    },
    noindex: true,
  },
};

export function routeToPath(route) {
  return SEO_ROUTES[route]?.path || "/";
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
  return {
    ...page,
    route,
    lang,
    title: page.title[lang] || page.title.en,
    description: page.description[lang] || page.description.en,
    canonical: `${SITE_URL}${page.path}`,
    image: DEFAULT_IMAGE,
    locale: DEFAULT_LOCALE[lang] || DEFAULT_LOCALE.en,
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
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${SITE_URL}/#business`,
    name: BRAND,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/logo.png`,
    image: DEFAULT_IMAGE,
    description:
      "Custom garage design and transformation services based in Orlando, Florida.",
    email: "hello@garagealacarte.com",
    telephone: "+1-407-555-0142",
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
    areaServed: [
      "Orlando, FL",
      "Winter Park, FL",
      "Lake Nona, FL",
      "Windermere, FL",
      "Winter Garden, FL",
      "Kissimmee, FL",
      "Central Florida",
    ],
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Garage Design Blueprint",
          serviceType: "Garage design planning",
          areaServed: "Orlando, FL",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Garage Design and Setup",
          serviceType: "Garage design and installation support",
          areaServed: "Orlando, FL",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Full Garage Transformation",
          serviceType: "Garage remodeling and transformation",
          areaServed: "Orlando, FL",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Smart Garage Integration",
          serviceType: "Smart home and garage technology integration",
          areaServed: "Orlando, FL",
        },
      },
    ],
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

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: BRAND,
        url: `${SITE_URL}/`,
        inLanguage: page.lang === "fr" ? "fr-FR" : "en-US",
        publisher: {
          "@id": `${SITE_URL}/#business`,
        },
      },
      {
        "@type": "WebPage",
        "@id": `${page.canonical}#webpage`,
        url: page.canonical,
        name: page.title,
        description: page.description,
        isPartOf: {
          "@id": `${SITE_URL}/#website`,
        },
        about: {
          "@id": `${SITE_URL}/#business`,
        },
        inLanguage: page.lang === "fr" ? "fr-FR" : "en-US",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs,
      },
    ],
  };
}

export function applyPageSeo({ route, lang }) {
  const page = getPageSeo(route, lang);
  document.documentElement.lang = lang === "fr" ? "fr" : "en";
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
