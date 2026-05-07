/* =========================================================
   Content Store — bilingue FR/EN
   Édition possible via l'interface Admin (CMS)
   ========================================================= */

export const CONTENT = {
  brand: {
    name: "Garage à la Carte",
    tagline_en: "American precision, European design.",
    tagline_fr: "Précision américaine, design européen."
  },

  nav: {
    en: { home: "Home", projects: "Projects", contact: "Contact", admin: "Admin" },
    fr: { home: "Accueil", projects: "Réalisations", contact: "Contact", admin: "Admin" }
  },

  hero: {
    eyebrow: { en: "Orlando, FL · Est. 2024", fr: "Orlando, FL · Depuis 2024" },
    title: {
      en: ["Transform your garage", "into a space that", "works for your life."],
      fr: ["Transformez votre garage", "en un espace pensé", "pour votre vie."]
    },
    italic_word: { en: "works", fr: "pensé" },
    sub: {
      en: "Custom garage transformations for homeowners, real-estate professionals, and developers — from a clear plan to full execution.",
      fr: "Transformations de garage sur-mesure pour propriétaires, agents immobiliers et promoteurs — du plan détaillé à la réalisation complète."
    },
    primary_cta: { en: "Get my free estimate", fr: "Obtenir mon devis gratuit" },
    secondary_cta: { en: "Schedule a call", fr: "Planifier un appel" }
  },

  hero_caption: {
    label: { en: "Slide to reveal", fr: "Faire glisser" },
    before: { en: "Before", fr: "Avant" },
    after: { en: "After", fr: "Après" }
  },

  marquee_words: {
    en: ["Design", "Prepare", "Transform", "à la carte"],
    fr: ["Concevoir", "Préparer", "Transformer", "à la carte"]
  },

  visual_strip: {
    eyebrow: { en: "From plan to reality", fr: "Du plan à la réalité" },
    title: {
      en: "Designed in 3D. Built to live in.",
      fr: "Conçu en 3D. Construit pour être habité."
    },
    sub: {
      en: "Aymeric drafts every layout in precise 3D. Juliette dresses each space in materials, light, and atmosphere — so you see your future garage before we touch a wall.",
      fr: "Aymeric dessine chaque plan en 3D précis. Juliette habille l'espace de matières, lumières et atmosphères — pour que vous voyiez votre futur garage avant qu'un mur ne bouge."
    }
  },

  before_after: {
    eyebrow: { en: "Section 02 · Story", fr: "Section 02 · Le récit" },
    title: {
      en: "From cluttered space to designed living.",
      fr: "D'un espace encombré à un lieu de vie pensé."
    },
    before: {
      en: "Boxes, tools, wasted square footage. No clear purpose.",
      fr: "Cartons, outils, mètres carrés perdus. Aucun usage clair."
    },
    after: {
      en: "A clean, planned, functional garage designed around your lifestyle.",
      fr: "Un garage propre, pensé, fonctionnel — conçu autour de votre vie."
    }
  },

  services: {
    eyebrow: { en: "Section 03 · Services", fr: "Section 03 · Services" },
    title: {
      en: "Choose your level of support.",
      fr: "Choisissez votre niveau d'accompagnement."
    },
    sub: {
      en: "Avoid costly mistakes. Start with a plan — or go all the way. Upgrade anytime.",
      fr: "Évitez les erreurs coûteuses. Commencez par un plan — ou allez jusqu'au bout. Évoluez à tout moment."
    },
    items: [
      {
        id: "blueprint",
        num: "01",
        title: { en: "Design Blueprint", fr: "Plan & Design" },
        sub: { en: "Plan it right — build it your way.", fr: "Planifiez bien — construisez à votre façon." },
        description: {
          en: "Custom 3D floor plans and realistic visuals to help you confidently plan your project.",
          fr: "Plans 3D sur-mesure et visuels réalistes pour planifier votre projet en toute confiance."
        },
        price: { en: "from $950", fr: "à partir de 950 $" },
        led_by: ["Aymeric", "Juliette", "Guillaume"],
        includes: {
          en: ["1 optimized layout", "2 realistic 3D views", "1 round of minor adjustments", "Expert design guidance"],
          fr: ["1 agencement optimisé", "2 vues 3D réalistes", "1 série d'ajustements mineurs", "Conseil expert"]
        },
        not_included: { en: "No purchasing, delivery, or installation.", fr: "Pas d'achat, livraison ou installation." },
        on_site: { en: "On-site assessment from $1,350", fr: "Évaluation sur site à partir de 1 350 $" }
      },
      {
        id: "delivery",
        num: "02",
        title: { en: "Design + Setup", fr: "Design + Préparation" },
        sub: { en: "Plan it right — prepare it with confidence.", fr: "Planifiez bien — préparez en confiance." },
        description: {
          en: "We design it and prepare everything for you — products, materials, and a clear setup plan.",
          fr: "Nous concevons et préparons tout pour vous — produits, matériaux et plan d'installation."
        },
        price: { en: "from $1,500", fr: "à partir de 1 500 $" },
        badge: { en: "Most popular", fr: "Le plus choisi" },
        led_by: ["Aymeric", "Juliette", "Guillaume"],
        includes: {
          en: ["Custom layout + 2 realistic views", "Product selection guidance", "Sourcing coordination", "Setup planning for installation"],
          fr: ["Plan sur-mesure + 2 vues réalistes", "Sélection des produits", "Coordination du sourcing", "Plan d'installation"]
        },
        not_included: { en: "No final installation or contractor labor.", fr: "Pas d'installation finale ni de main-d'œuvre." },
        deposit: { en: "50% / 25% / 25%", fr: "50 % / 25 % / 25 %" }
      },
      {
        id: "transform",
        num: "03",
        title: { en: "Full Transformation", fr: "Transformation Complète" },
        sub: { en: "We handle everything — concept to completion.", fr: "Nous gérons tout — du concept à la livraison." },
        description: {
          en: "A turnkey solution: design, plan, source, manage, and deliver your full garage transformation.",
          fr: "Solution clé en main : conception, planification, sourcing, gestion et livraison complète."
        },
        price: { en: "from $2,750", fr: "à partir de 2 750 $" },
        led_by: ["Guillaume", "Aymeric", "Juliette"],
        includes: {
          en: ["Custom layout + 4–6 realistic views", "Full material & equipment selection", "Sourcing & logistics coordination", "Project management & oversight", "Final walkthrough"],
          fr: ["Plan sur-mesure + 4 à 6 vues réalistes", "Sélection complète matériaux & équipements", "Coordination sourcing & logistique", "Gestion de projet", "Visite finale"]
        },
        deposit: { en: "50% / 25% / 25%", fr: "50 % / 25 % / 25 %" }
      },
      {
        id: "smart",
        num: "04",
        title: { en: "Smart Integration", fr: "Intégration Smart" },
        sub: { en: "Make your garage fully functional.", fr: "Un garage 100 % fonctionnel." },
        description: {
          en: "Technical planning for plumbing, electrical, HVAC, lighting, media and smart features — designed in from day one.",
          fr: "Planification technique : plomberie, électricité, HVAC, éclairage, média et smart features — pensés dès le départ."
        },
        price: { en: "from $3,500", fr: "à partir de 3 500 $" },
        tag: { en: "Add-on", fr: "Add-on" },
        led_by: ["Guillaume", "Aymeric", "Juliette"],
        includes: {
          en: ["Technical integration aligned with design", "Plumbing, electrical, HVAC & ventilation", "Built-in storage, media & smart features", "Coordination with licensed pros", "Implementation-ready layouts"],
          fr: ["Intégration technique alignée au design", "Plomberie, électricité, HVAC, ventilation", "Rangements, média & smart features", "Coordination avec pros agréés", "Plans prêts à exécuter"]
        }
      }
    ]
  },

  why: {
    eyebrow: { en: "Section 04 · Why us", fr: "Section 04 · Pourquoi nous" },
    title: {
      en: "Most companies offer one fixed solution. We don't.",
      fr: "La plupart proposent une seule solution. Pas nous."
    },
    sub: {
      en: "With Garage à la Carte, you choose how far you want to go — from design only to full transformation. Your space. Your pace. Your level of support.",
      fr: "Chez Garage à la Carte, vous choisissez votre niveau d'engagement — du plan seul à la transformation complète. Votre espace. Votre rythme. Votre niveau d'accompagnement."
    },
    stats: [
      { num: 4, label: { en: "à la carte services", fr: "services à la carte" } },
      { num: 20, suffix: "mi", label: { en: "Orlando service area", fr: "rayon Orlando" } },
      { num: 100, suffix: "%", label: { en: "fee credited on contract", fr: "honoraires crédités au contrat" } }
    ]
  },

  team: {
    eyebrow: { en: "Section 05 · Who we are", fr: "Section 05 · L'équipe" },
    title: { en: "Built by experts. Designed around you.", fr: "Construit par des experts. Pensé autour de vous." },
    sub: {
      en: "Garage à la Carte is a collaboration of specialists who turn ideas into real, functional spaces.",
      fr: "Garage à la Carte est la rencontre de spécialistes qui transforment vos idées en espaces fonctionnels."
    },
    members: [
      {
        name: "Guillaume",
        role: { en: "Field & Execution Lead", fr: "Lead Terrain & Exécution" },
        bio: {
          en: "Based in Orlando, Guillaume brings real-world construction experience and ensures every project is grounded, feasible, and built right.",
          fr: "Basé à Orlando, Guillaume apporte une expérience terrain solide et garantit que chaque projet est faisable, ancré, et bien exécuté."
        }
      },
      {
        name: "Aymeric",
        role: { en: "Technical Design & Planning", fr: "Design Technique & Plans" },
        email: "aymeric.vanelle@gmail.com",
        phone: "+33 6 72 54 54 51",
        bio: {
          en: "Specialised in European space efficiency, custom layouts, and 3D planning. Aymeric turns ideas into precise, build-ready designs.",
          fr: "Spécialisé en efficacité spatiale européenne, plans sur-mesure et 3D. Aymeric transforme les idées en plans prêts à construire."
        }
      },
      {
        name: "Juliette",
        role: { en: "Visual Design & Atmosphere", fr: "Design Visuel & Atmosphère" },
        email: "juliette.bergougnoux@icloud.com",
        phone: "+33 7 44 81 52 22",
        bio: {
          en: "Combines American precision with European creativity and space-saving design — turning ideas into immersive visuals so you see your future space before it's built.",
          fr: "Allie précision américaine et créativité européenne. Juliette crée des visuels immersifs pour que vous voyiez votre espace avant même qu'il existe."
        }
      },
      {
        name: "Nelly",
        role: { en: "Coordinator", fr: "Coordinatrice" },
        email: "loucie@icloud.com",
        bio: {
          en: "Nelly keeps every project on track — coordinating schedules, suppliers, and your peace of mind from kickoff to handover.",
          fr: "Nelly garde chaque projet sur les rails — coordonne plannings, fournisseurs et votre tranquillité d'esprit, du lancement à la livraison."
        }
      }
    ]
  },

  audience: {
    eyebrow: { en: "Section 06 · Who we help", fr: "Section 06 · Qui nous aidons" },
    title: { en: "Built for homes, properties, and real-estate value.", fr: "Pensé pour les foyers, les biens, et la valeur immobilière." },
    items: [
      {
        title: { en: "Homeowners", fr: "Propriétaires" },
        text: { en: "Create a garage that fits your lifestyle and daily needs.", fr: "Créez un garage qui correspond à votre vie et à vos usages." }
      },
      {
        title: { en: "Real Estate Agents", fr: "Agents immobiliers" },
        text: { en: "Help buyers and sellers see the hidden potential of a garage.", fr: "Aidez acheteurs et vendeurs à voir le potentiel caché d'un garage." }
      },
      {
        title: { en: "Developers & Property Pros", fr: "Promoteurs & Pros" },
        text: { en: "Add functional, attractive value to residential properties.", fr: "Ajoutez une valeur fonctionnelle et désirable à vos biens." }
      }
    ]
  },

  process: {
    eyebrow: { en: "Section 07 · Process", fr: "Section 07 · Processus" },
    title: { en: "How it works.", fr: "Comment ça marche." },
    steps: [
      { num: "01", title: { en: "Tell us your vision", fr: "Dites-nous votre vision" }, text: { en: "We learn about your garage, needs, style, and goals.", fr: "On découvre votre garage, vos besoins, votre style." } },
      { num: "02", title: { en: "Choose your level", fr: "Choisissez votre formule" }, text: { en: "Design only, design + setup, full transformation, or smart integration.", fr: "Plan seul, design + setup, transformation complète ou intégration smart." } },
      { num: "03", title: { en: "Plan before spending", fr: "Planifiez avant de dépenser" }, text: { en: "We define layout, visuals, materials, and execution steps.", fr: "On définit plan, visuels, matériaux et étapes." } },
      { num: "04", title: { en: "Bring it to life", fr: "Donnez-lui vie" }, text: { en: "Build it yourself, request support, or let us manage everything.", fr: "Construisez vous-même, demandez du support ou laissez-nous tout gérer." } }
    ]
  },

  final_cta: {
    title: { en: "Ready to transform your garage?", fr: "Prêt à transformer votre garage ?" },
    sub: { en: "Start with a free estimate and see what your garage could become.", fr: "Commencez par un devis gratuit et découvrez ce que votre garage peut devenir." }
  },

  // ===== RÉALISATIONS =====
  projects_page: {
    eyebrow: { en: "Selected work", fr: "Sélection" },
    title: { en: "Our garages, redesigned.", fr: "Nos garages, repensés." },
    sub: {
      en: "Each space is a fully customised transformation. Click any project for the full story.",
      fr: "Chaque espace est une transformation sur-mesure. Cliquez pour lire l'histoire complète."
    }
  },
  projects: [
    {
      id: "social-hub",
      slug: "the-social-hub",
      name: { en: "The Social Hub", fr: "Le Social Hub" },
      tagline: { en: "Built for entertaining, relaxing, everyday enjoyment.", fr: "Conçu pour recevoir, se détendre, profiter au quotidien." },
      type: { en: "Entertainment / Bar", fr: "Divertissement / Bar" },
      size: { en: "2–3 car garage", fr: "Garage 2–3 voitures" },
      duration: { en: "8 weeks", fr: "8 semaines" },
      service: { en: "Full Transformation", fr: "Transformation Complète" },
      year: "2025",
      featured: true,
      large: true,
      description: {
        en: "A complete transformation that turns your garage into a social, functional, and high-impact living space — the centerpiece of your home, built for entertaining and everyday enjoyment.",
        fr: "Une transformation complète qui transforme votre garage en lieu social, fonctionnel et marquant — le cœur de la maison, fait pour recevoir et profiter au quotidien."
      },
      includes: {
        en: ["Wet bar", "Custom cabinetry", "Built-in appliances", "Decorative wood wall panels", "Pool table"],
        fr: ["Bar avec point d'eau", "Mobilier sur-mesure", "Appareils encastrés", "Panneaux muraux bois décoratifs", "Billard"]
      },
      why: {
        en: ["Dedicated space for entertaining and relaxing", "Comfort and functionality without expanding your home", "High-impact upgrade that increases property value"],
        fr: ["Un espace dédié à recevoir et se détendre", "Confort et fonctionnalité sans agrandir la maison", "Une plus-value forte sur votre bien"]
      },
      images: [
        { label: "Hero · Bar view", color: "#3a2c22" },
        { label: "Pool area", color: "#8b6f4e" },
        { label: "Wood panel detail", color: "#5a4334" },
        { label: "Lounge", color: "#1f1812" }
      ]
    },
    {
      id: "daily-living",
      slug: "the-daily-living-garage",
      name: { en: "The Living Garage", fr: "Le Garage à Vivre" },
      tagline: { en: "A multi-functional garage for work, fitness, and relaxation.", fr: "Un garage multi-fonctions : travail, sport, détente." },
      type: { en: "Multi-functional / Lifestyle", fr: "Multi-fonctions / Lifestyle" },
      size: { en: "2 car garage", fr: "Garage 2 voitures" },
      duration: { en: "6 weeks", fr: "6 semaines" },
      service: { en: "Full Transformation", fr: "Transformation Complète" },
      year: "2025",
      featured: true,
      description: {
        en: "A space designed to support your daily routine — from movement to focus to relaxation. A flexible, everyday living space without expanding your home.",
        fr: "Un espace pensé pour votre routine — du mouvement à la concentration jusqu'à la détente. Un lieu de vie flexible sans agrandir la maison."
      },
      includes: {
        en: ["Home fitness area (cardio, mirror, floor space)", "Lounge zone (sofa, TV, relaxation)", "Compact workspace / home office", "Coffee & utility corner with storage", "Integrated lighting and layout"],
        fr: ["Zone fitness (cardio, miroir, sol adapté)", "Lounge (canapé, TV, détente)", "Bureau compact", "Coin café & utilitaire avec rangement", "Éclairage et layout intégrés"]
      },
      why: {
        en: ["Combine multiple functions in one optimised space", "Improve daily comfort without expanding your home", "Practical, organised environment for work and lifestyle"],
        fr: ["Plusieurs fonctions dans un espace optimisé", "Confort au quotidien sans extension", "Environnement pratique et organisé"]
      },
      images: [
        { label: "Lounge zone", color: "#c4a575" },
        { label: "Fitness corner", color: "#3d322a" },
        { label: "Home office", color: "#7a6450" }
      ]
    },
    {
      id: "smart-living",
      slug: "smart-living-garage",
      name: { en: "Smart Living Garage", fr: "Smart Living Garage" },
      tagline: { en: "Utility, comfort, and style — designed for daily life.", fr: "Utilité, confort, style — pensé pour le quotidien." },
      type: { en: "Daily living / Utility", fr: "Vie quotidienne / Utilitaire" },
      size: { en: "2 car garage", fr: "Garage 2 voitures" },
      duration: { en: "5 weeks", fr: "5 semaines" },
      service: { en: "Design + Setup", fr: "Design + Setup" },
      year: "2025",
      featured: true,
      description: {
        en: "A complete transformation that turns your garage into a functional, comfortable extension of your home — designed to simplify your life and elevate your home.",
        fr: "Une transformation complète qui fait du garage une extension fonctionnelle et confortable — pour simplifier votre vie et valoriser votre maison."
      },
      includes: {
        en: ["Integrated laundry and utility area", "Comfortable lounge (TV, relaxation, daily use)", "Smart storage solutions", "Clean, functional environment ready for everyday living"],
        fr: ["Zone buanderie intégrée", "Lounge confortable (TV, détente)", "Rangements smart", "Environnement clean et prêt à vivre"]
      },
      why: {
        en: ["Free up space in the rest of your home", "Simplify daily routines, reduce clutter", "Improve comfort while increasing property value"],
        fr: ["Libérez de l'espace dans la maison", "Simplifiez vos routines, réduisez le désordre", "Confort + plus-value immobilière"]
      },
      images: [
        { label: "Hero · open view", color: "#a89378" },
        { label: "Laundry corner", color: "#4a3d33" },
        { label: "Lounge detail", color: "#d4bfa3" }
      ]
    }
  ],

  // ===== CONTACT =====
  contact: {
    eyebrow: { en: "Get in touch", fr: "Contact" },
    title: { en: "Let's design your garage.", fr: "Imaginons votre garage." },
    sub: {
      en: "Tell us about your space and your vision. We'll come back to you within 48 hours with a free estimate and clear next steps.",
      fr: "Parlez-nous de votre espace et de votre vision. Nous revenons vers vous sous 48h avec un devis gratuit et des étapes claires."
    },
    info_title: { en: "Direct line", fr: "Contact direct" },
    address: {
      en: "Orlando, FL · service area within 20 miles",
      fr: "Orlando, FL · zone de service 20 miles"
    },
    main_email: "hello@garagealacarte.com",
    main_phone: "+1 (407) 555-0142",
    form: {
      name: { en: "Your name", fr: "Votre nom" },
      email: { en: "Email", fr: "Email" },
      phone: { en: "Phone (optional)", fr: "Téléphone (optionnel)" },
      service: { en: "Service interested in", fr: "Service souhaité" },
      message: { en: "Tell us about your project", fr: "Parlez-nous de votre projet" },
      submit: { en: "Send my request", fr: "Envoyer ma demande" },
      consent: {
        en: "I have read and agree to the",
        fr: "J'ai lu et j'accepte les"
      },
      consent_link: { en: "project conditions", fr: "conditions du projet" }
    }
  },

  popup: {
    title: { en: "Before you go —", fr: "Avant de partir —" },
    sub: {
      en: "Get our free guide: 5 mistakes to avoid before transforming your garage.",
      fr: "Recevez notre guide gratuit : 5 erreurs à éviter avant de transformer votre garage."
    },
    placeholder: { en: "Your email", fr: "Votre email" },
    cta: { en: "Send me the guide", fr: "M'envoyer le guide" },
    decline: { en: "No thanks", fr: "Non merci" },
    success: { en: "Thanks — check your inbox.", fr: "Merci — surveillez votre boîte mail." }
  }
};
