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
    eyebrow: {
      en: "Orlando, FL · Custom garage transformations",
      fr: "Orlando, FL · Transformations de garage sur-mesure"
    },
    title: {
      en: ["Your garage,", "reimagined."],
      fr: ["Votre garage,", "réinventé."]
    },
    italic_word: { en: "reimagined.", fr: "réinventé." },
    tagline: {
      en: "Unlock the Full Potential of Your Garage",
      fr: "Révélez tout le potentiel de votre garage"
    },
    sub: {
      en: "Custom garage transformations in Orlando.",
      fr: "Transformations de garage sur-mesure à Orlando."
    },
    primary_cta: { en: "Get my free estimate", fr: "Obtenir mon devis gratuit" },
    secondary_cta: { en: "See our work", fr: "Voir nos réalisations" }
  },

  hero_caption: {
    label: { en: "Featured project", fr: "Projet phare" },
    image: "",
    video_url: "/hero-video.mp4",
    featured_label: { en: "FEATURED PROJECT", fr: "PROJET PHARE" },
    featured_title: { en: "The Social Hub", fr: "The Social Hub" }
  },

  before_after: {
    eyebrow: { en: "Section 02 · Story", fr: "Section 02 · Le récit" },
    title: {
      en: "From cluttered garage to dream garage. See the transformation!",
      fr: "D'un garage encombré au garage de rêve. Découvrez la transformation !"
    },
    before: {
      en: "Boxes, tools, wasted square footage. No clear purpose.",
      fr: "Cartons, outils, mètres carrés perdus. Aucun usage clair."
    },
    after: {
      en: "A clean, planned, functional garage designed around your lifestyle.",
      fr: "Un garage propre, pensé, fonctionnel — conçu autour de votre vie."
    },
    statement: {
      en: "Experience American practicality and precision combined with European mood-visual design and advanced Color, Material & Finish (CMF) expertise for a stunning, functional space.",
      fr: "Découvrez la praticité et la précision américaines alliées au design visuel et à l'ambiance européens, ainsi qu'à une expertise avancée en Couleur, Matière & Finition (CMF), pour un espace fonctionnel et époustouflant."
    },
    before_image: "",
    after_image: ""
  },

  services: {
    eyebrow: { en: "Section 03 · Services", fr: "Section 03 · Services" },
    title: {
      en: "Explore Our Four Signature Services",
      fr: "Découvrez nos quatre services signature"
    },
    sub: {
      en: "Avoid costly mistakes. Start with a plan — or go all the way. Upgrade anytime.",
      fr: "Évitez les erreurs coûteuses. Commencez par un plan — ou allez jusqu'au bout. Évoluez à tout moment."
    },
    items: [
      {
        id: "blueprint",
        num: "01",
        title: { en: "Design Blueprint", fr: "Design Blueprint" },
        sub: { en: "Plan it right. Build it your way.", fr: "Planifiez bien. Construisez à votre façon." },
        tag: { en: "Ideal for getting started", fr: "Idéal pour démarrer" },
        description: {
          en: "You want to plan your garage with confidence before making decisions. See your future garage before you build anything — with a custom layout, two realistic views, and expert guidance to avoid costly mistakes. Most clients start here, then move forward once they see their design.",
          fr: "Vous voulez planifier votre garage en toute confiance avant de décider. Visualisez votre futur garage avant de construire — avec un agencement sur-mesure, deux vues réalistes et des conseils experts pour éviter les erreurs coûteuses. La plupart de nos clients commencent ici, puis poursuivent une fois leur design validé."
        },
        price: { en: "starts at $950", fr: "à partir de 950 $" },
        led_by: ["Aymeric", "Juliette", "Guillaume"],
        includes: {
          en: ["1 optimized layout", "2 realistic views", "1 round of minor adjustments", "Expert design guidance"],
          fr: ["1 agencement optimisé", "2 vues réalistes", "1 série d'ajustements mineurs", "Conseil expert"]
        },
        not_included: { en: "No product purchasing, no delivery, no installation.", fr: "Pas d'achat de produits, pas de livraison, pas d'installation." },
        on_site: { en: "Design Blueprint + On-Site Assessment starts at $1,350", fr: "Design Blueprint + évaluation sur site à partir de 1 350 $" },
        details: [
          {
            title: { en: "Choose your level", fr: "Choisissez votre niveau" },
            items: {
              en: ["Design Blueprint (Remote) starts at $950", "Design Blueprint + On-Site Assessment starts at $1,350"],
              fr: ["Design Blueprint à distance à partir de 950 $", "Design Blueprint + évaluation sur site à partir de 1 350 $"]
            }
          },
          {
            title: { en: "How it works", fr: "Comment ça marche" },
            items: {
              en: ["Free consultation to define your project", "Fixed price, no surprises", "Delivered digitally", "Every detail is captured remotely or on-site when needed"],
              fr: ["Consultation gratuite pour définir le projet", "Prix fixe, sans surprise", "Livraison digitale", "Chaque détail est relevé à distance ou sur site si nécessaire"]
            }
          },
          {
            title: { en: "Revisions", fr: "Révisions" },
            body: {
              en: "Requests for extra views, major changes, or a new direction after approval are quoted separately.",
              fr: "Les vues supplémentaires, changements majeurs ou nouvelles directions après validation sont chiffrés séparément."
            }
          },
          {
            title: { en: "Continue your project", fr: "Poursuivre votre projet" },
            body: {
              en: "Move forward anytime with setup support or a full transformation once your design is validated.",
              fr: "Vous pouvez poursuivre à tout moment avec l'accompagnement setup ou une transformation complète une fois le design validé."
            }
          },
          {
            title: { en: "Delivery area", fr: "Zone de service" },
            body: {
              en: "On-site visits are available throughout the Orlando area. Visits beyond our standard zone are quoted based on location.",
              fr: "Les visites sur site sont disponibles dans la région d'Orlando. Au-delà de la zone standard, elles sont chiffrées selon la localisation."
            }
          }
        ]
      },
      {
        id: "delivery",
        num: "02",
        title: { en: "Design & Setup", fr: "Design & Setup" },
        sub: { en: "Plan it right. Prepare it with confidence.", fr: "Planifiez bien. Préparez avec confiance." },
        description: {
          en: "You want more than a design — you want the right products, materials, and a clear setup plan. Move from vision to execution without the sourcing headache. Most clients move forward with full transformation once everything is planned and ready.",
          fr: "Vous voulez plus qu'un design — vous voulez les bons produits, les bons matériaux et un plan de mise en place clair. Passez de la vision à l'exécution sans la charge du sourcing. La plupart de nos clients enchaînent vers la transformation complète une fois tout planifié et prêt."
        },
        price: { en: "starts at $1,500", fr: "à partir de 1 500 $" },
        badge: { en: "Most popular", fr: "Le plus choisi" },
        led_by: ["Aymeric", "Juliette", "Guillaume"],
        includes: {
          en: ["1 optimized layout", "2 realistic views", "Product selection guidance", "Sourcing coordination", "Setup planning for installation", "1 round of minor adjustments"],
          fr: ["1 agencement optimisé", "2 vues réalistes", "Sélection des produits", "Coordination du sourcing", "Planification de l'installation", "1 série d'ajustements mineurs"]
        },
        not_included: { en: "No final installation or contractor labor unless upgraded to Full Transformation.", fr: "Pas d'installation finale ni de main-d'oeuvre entrepreneur sauf évolution vers Transformation Complète." },
        deposit: { en: "50% / 25% / 25%", fr: "50 % / 25 % / 25 %" },
        details: [
          {
            title: { en: "Service fee credit", fr: "Crédit des honoraires" },
            body: {
              en: "The service fee is fully credited when you move forward with a signed project contract.",
              fr: "Les honoraires sont entièrement crédités si vous poursuivez avec un contrat de projet signé."
            }
          },
          {
            title: { en: "How it works", fr: "Comment ça marche" },
            items: {
              en: ["Free consultation to define your project", "Clear scope before commitment", "Fixed starting price; final pricing depends on size, complexity, and sourcing needs", "Delivered digitally with setup guidance"],
              fr: ["Consultation gratuite pour définir votre projet", "Périmètre clair avant engagement", "Prix de départ fixe ; le prix final dépend de la taille, de la complexité et des besoins de sourcing", "Livraison digitale avec guide de setup"]
            }
          },
          {
            title: { en: "Deposit structure", fr: "Structure de paiement" },
            items: {
              en: ["50% to secure your project and begin design", "25% after design validation during materials and sourcing", "25% upon completion and final walkthrough"],
              fr: ["50 % pour sécuriser le projet et démarrer le design", "25 % après validation du design, pendant la phase matériaux et sourcing", "25 % à la fin, lors de la visite finale"]
            }
          },
          {
            title: { en: "Use of designs", fr: "Utilisation des designs" },
            body: {
              en: "Plans and visual designs remain the property of Garage à la Carte and are provided for your personal project use only. If you build independently or work with another contractor, a separate usage or release agreement may be required.",
              fr: "Les plans et visuels restent la propriété de Garage à la Carte et sont fournis uniquement pour votre projet personnel. Si vous construisez seul ou avec un autre entrepreneur, un accord d'utilisation ou de cession peut être requis."
            }
          },
          {
            title: { en: "Continue your project", fr: "Poursuivre votre projet" },
            body: {
              en: "Move forward anytime with full transformation. Everything is planned, selected, and ready for execution.",
              fr: "Vous pouvez passer à la transformation complète à tout moment. Tout est planifié, sélectionné et prêt pour l'exécution."
            }
          },
          {
            title: { en: "Delivery area", fr: "Zone de service" },
            body: {
              en: "Delivery and setup coordination are included within 20 miles of Orlando. Extended zones are available with a mileage fee, and statewide projects may be available upon request.",
              fr: "La coordination livraison et setup est incluse dans un rayon de 20 miles autour d'Orlando. Les zones étendues sont possibles avec frais kilométriques, et certains projets dans tout l'État peuvent être étudiés sur demande."
            }
          }
        ]
      },
      {
        id: "transform",
        num: "03",
        title: { en: "Full Transformation", fr: "Transformation Complète" },
        sub: { en: "From concept to completion — we handle everything.", fr: "Du concept à la livraison — nous gérons tout." },
        description: {
          en: "You want a complete, worry-free transformation — fully designed, fully managed, fully delivered. A turnkey solution where we design, plan, and coordinate your full garage transformation. Most clients enhance it with integrated upgrades — lighting, electrical, climate control, and smart features designed to work seamlessly together.",
          fr: "Vous voulez une transformation complète et sans souci — entièrement conçue, gérée et livrée. Une solution clé en main : nous concevons, planifions et coordonnons votre transformation. La plupart de nos clients la complètent avec des intégrations — éclairage, électricité, climatisation et smart features pensés pour fonctionner ensemble."
        },
        price: { en: "starts at $2,750", fr: "à partir de 2 750 $" },
        badge: { en: "Premium Experience", fr: "Expérience premium" },
        led_by: ["Guillaume", "Aymeric", "Juliette"],
        includes: {
          en: ["Custom optimized layout", "3D design with 4-6 realistic views", "Full space planning", "Complete material & equipment selection", "Sourcing and logistics coordination", "Project management and execution oversight", "Final walkthrough"],
          fr: ["Agencement optimisé sur-mesure", "Design 3D avec 4 à 6 vues réalistes", "Planification complète de l'espace", "Sélection complète matériaux & équipements", "Coordination sourcing & logistique", "Gestion de projet et suivi d'exécution", "Visite finale"]
        },
        deposit: { en: "50% / 25% / 25%", fr: "50 % / 25 % / 25 %" },
        details: [
          {
            title: { en: "Service fee credit", fr: "Crédit des honoraires" },
            body: {
              en: "The service fee is fully credited when you move forward with a signed project contract.",
              fr: "Les honoraires sont entièrement crédités si vous poursuivez avec un contrat de projet signé."
            }
          },
          {
            title: { en: "How it works", fr: "Comment ça marche" },
            items: {
              en: ["Dedicated consultation to define your vision", "Clear scope, budget, and timeline", "Structured phases from design to completion", "One expert guiding your project throughout"],
              fr: ["Consultation dédiée pour définir votre vision", "Périmètre, budget et calendrier clairs", "Phases structurées du design à la livraison", "Un expert qui guide votre projet tout au long du processus"]
            }
          },
          {
            title: { en: "Deposit structure", fr: "Structure de paiement" },
            items: {
              en: ["50% to secure your project and begin design", "25% after design validation during materials and sourcing", "25% upon completion and final walkthrough"],
              fr: ["50 % pour sécuriser le projet et démarrer le design", "25 % après validation du design, pendant la phase matériaux et sourcing", "25 % à la fin, lors de la visite finale"]
            }
          },
          {
            title: { en: "Project investment", fr: "Investissement projet" },
            body: {
              en: "Typical project investment depends on layout, finishes, and customization level. This investment elevates daily living and adds lasting value to your property.",
              fr: "L'investissement final dépend de l'agencement, des finitions et du niveau de personnalisation. Il améliore votre quotidien et ajoute une valeur durable à votre bien."
            }
          },
          {
            title: { en: "Use of designs", fr: "Utilisation des designs" },
            body: {
              en: "Plans and visual designs remain the property of Garage à la Carte and are provided for your personal project use only. If you build independently or work with another contractor, a separate usage or release agreement may be required.",
              fr: "Les plans et visuels restent la propriété de Garage à la Carte et sont fournis uniquement pour votre projet personnel. Si vous construisez seul ou avec un autre entrepreneur, un accord d'utilisation ou de cession peut être requis."
            }
          },
          {
            title: { en: "Continue your project", fr: "Poursuivre votre projet" },
            body: {
              en: "Upgrade your space with integrated systems such as plumbing, electrical, climate control, and smart features designed to work seamlessly together.",
              fr: "Améliorez votre espace avec des systèmes intégrés comme la plomberie, l'électricité, le contrôle climatique et les fonctions connectées, pensés pour fonctionner ensemble."
            }
          },
          {
            title: { en: "Delivery area", fr: "Zone de service" },
            body: {
              en: "Included within 20 miles of Orlando. Extended zones are available with a mileage fee, and statewide projects may be available upon request.",
              fr: "Inclus dans un rayon de 20 miles autour d'Orlando. Les zones étendues sont possibles avec frais kilométriques, et certains projets dans tout l'État peuvent être étudiés sur demande."
            }
          }
        ]
      },
      {
        id: "smart",
        num: "04",
        title: { en: "Smart Integration", fr: "Smart Integration" },
        sub: { en: "Designed for daily performance — not just visual appeal.", fr: "Pensé pour la performance au quotidien — pas seulement pour l'esthétique." },
        description: {
          en: "You want more than a beautiful space — you want a garage that works seamlessly every day. We integrate the systems that bring your space to life: technical planning for plumbing, electrical, HVAC, ventilation, media, smart features, and built-in systems — typically integrated within Design & Setup or Full Transformation.",
          fr: "Vous voulez plus qu'un bel espace — vous voulez un garage qui fonctionne parfaitement au quotidien. Nous intégrons les systèmes qui donnent vie à votre espace : plomberie, électricité, HVAC, ventilation, média, smart features et systèmes intégrés — typiquement combinés avec Design & Setup ou Transformation Complète."
        },
        price: { en: "starts at $3,500", fr: "à partir de 3 500 $" },
        tag: { en: "Add-on", fr: "Add-on" },
        led_by: ["Guillaume", "Aymeric", "Juliette"],
        includes: {
          en: ["Technical integration aligned with your design", "Planning of plumbing, electrical, HVAC, and ventilation", "Built-in storage, media setup, and smart features", "Coordination with qualified professionals", "Technical layouts prepared for implementation"],
          fr: ["Intégration technique alignée avec le design", "Planification plomberie, électricité, HVAC et ventilation", "Rangements intégrés, média et smart features", "Coordination avec des professionnels qualifiés", "Plans techniques prêts pour l'exécution"]
        },
        deposit: { en: "Included within your main project deposit structure.", fr: "Inclus dans la structure d'acompte du projet principal." },
        details: [
          {
            title: { en: "How it works", fr: "Comment ça marche" },
            items: {
              en: ["Systems are planned during the design phase", "Integration is coordinated before any work begins", "All components are designed to function seamlessly together"],
              fr: ["Les systèmes sont planifiés pendant la phase design", "L'intégration est coordonnée avant le démarrage des travaux", "Tous les composants sont pensés pour fonctionner ensemble"]
            }
          },
          {
            title: { en: "Investment", fr: "Investissement" },
            items: {
              en: ["Can be added as a standalone upgrade if needed", "Technical feasibility validated before implementation", "Clear scope and system requirements defined upfront", "Coordination planned prior to execution"],
              fr: ["Peut être ajouté comme upgrade autonome si nécessaire", "Faisabilité technique validée avant mise en oeuvre", "Périmètre et exigences systèmes définis à l'avance", "Coordination prévue avant l'exécution"]
            },
            body: {
              en: "Custom add-on based on your systems and integration needs. Typically included within Design & Setup or Full Transformation.",
              fr: "Add-on sur-mesure selon vos systèmes et besoins d'intégration. Généralement inclus dans Design & Setup ou Transformation Complète."
            }
          },
          {
            title: { en: "Service fee credit", fr: "Crédit des honoraires" },
            body: {
              en: "The service fee starts at $3,500 and is fully credited when you move forward with a signed project contract.",
              fr: "Les honoraires démarrent à 3 500 $ et sont entièrement crédités si vous poursuivez avec un contrat de projet signé."
            }
          },
          {
            title: { en: "Additional work", fr: "Travaux additionnels" },
            body: {
              en: "Any additional systems, upgrades, or scope changes are clearly defined and quoted separately.",
              fr: "Tout système supplémentaire, upgrade ou changement de périmètre est clairement défini et chiffré séparément."
            }
          },
          {
            title: { en: "Use of designs", fr: "Utilisation des plans" },
            body: {
              en: "Technical layouts and integration plans remain the property of Garage à la Carte and are provided for your personal project use only. If you work with another contractor, a separate usage or release agreement may be required.",
              fr: "Les plans techniques et plans d'intégration restent la propriété de Garage à la Carte et sont fournis uniquement pour votre projet personnel. Si vous travaillez avec un autre entrepreneur, un accord d'utilisation ou de cession peut être requis."
            }
          },
          {
            title: { en: "Permits & regulations", fr: "Permis & réglementation" },
            body: {
              en: "Some systems may require city or county permits depending on the scope. We guide you through requirements and coordinate with the appropriate professionals when needed.",
              fr: "Certains systèmes peuvent nécessiter des permis municipaux ou county selon le périmètre. Nous vous guidons sur les exigences et coordonnons avec les professionnels adaptés si nécessaire."
            }
          },
          {
            title: { en: "Delivery area", fr: "Zone de service" },
            body: {
              en: "Included within 20 miles of Orlando. Extended zones are available with a mileage fee, and statewide projects may be available upon request.",
              fr: "Inclus dans un rayon de 20 miles autour d'Orlando. Les zones étendues sont possibles avec frais kilométriques, et certains projets dans tout l'État peuvent être étudiés sur demande."
            }
          }
        ]
      }
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
        role: { en: "Garage Transformation & Build Lead", fr: "Lead Transformation & Construction de Garage" },
        website: "https://www.ecuafranceelectric.com/",
        bio: {
          en: "Based in Orlando, Guillaume brings real-world construction experience and ensures every project is grounded, feasible, and built right.",
          fr: "Basé à Orlando, Guillaume apporte une expérience terrain solide et garantit que chaque projet est faisable, ancré, et bien exécuté."
        }
      },
      {
        name: "Aymeric",
        role: { en: "3D Space Planning & Technical Design Lead", fr: "Lead Plans 3D & Design Technique" },
        email: "aymeric.vanelle@gmail.com",
        phone: "+33 6 72 54 54 51",
        bio: {
          en: "Specialised in European space efficiency, custom layouts, and 3D planning. Aymeric turns ideas into precise, build-ready designs.",
          fr: "Spécialisé en efficacité spatiale européenne, plans sur-mesure et 3D. Aymeric transforme les idées en plans prêts à construire."
        }
      },
      {
        name: "Juliette",
        role: { en: "Mood-Visual & Advanced Color, Material & Finish (CMF) Design Lead", fr: "Lead Design Mood-Visual & Couleur, Matière & Finition (CMF) avancée" },
        email: "juliette.bergougnoux@icloud.com",
        phone: "+33 7 44 81 52 22",
        bio: {
          en: "Combines American precision with European creativity and space-saving design — turning ideas into immersive visuals so you see your future space before it's built.",
          fr: "Allie précision américaine et créativité européenne. Juliette crée des visuels immersifs pour que vous voyiez votre espace avant même qu'il existe."
        },
        long_bio: {
          en: "I am Juliette Bergougnoux, an American-French designer born in New York City, with a creative background shaped by both American innovation and European design culture.\n\nI hold a Master's degree in Interior Transportation Design with a specialization in Color, Material & Finish (CMF), completed in Paris, France.\n\nMy experience includes collaborations with major automotive brands such as Citroën and Dacia, where I developed CMF concepts for transportation interiors, focusing on material selection, color integration, visual identity, and user experience.\n\nMy design approach combines functionality, atmosphere, and refined material storytelling to create spaces that feel both distinctive and purposeful.\n\nToday, I bring this expertise to Garage à la Carte alongside Aymeric and Guillaume, helping to design personalized garage environments that reflect each client's lifestyle through thoughtful space planning, materials, colors, and functionality.",
          fr: "Je suis Juliette Bergougnoux, designer américano-française née à New York, avec un parcours créatif façonné par l'innovation américaine et la culture du design européen.\n\nJe suis titulaire d'un Master en Interior Transportation Design avec une spécialisation en Couleur, Matière & Finition (CMF), obtenu à Paris.\n\nMon expérience inclut des collaborations avec de grandes marques automobiles comme Citroën et Dacia, où j'ai développé des concepts CMF pour les intérieurs de véhicules, en travaillant sur le choix des matériaux, l'intégration des couleurs, l'identité visuelle et l'expérience utilisateur.\n\nMon approche du design allie fonctionnalité, atmosphère et narration matérielle raffinée pour créer des espaces à la fois distinctifs et porteurs de sens.\n\nAujourd'hui, j'apporte cette expertise à Garage à la Carte aux côtés d'Aymeric et de Guillaume, pour concevoir des garages personnalisés qui reflètent le style de vie de chaque client à travers une pensée fine de l'espace, des matériaux, des couleurs et des fonctionnalités."
        }
      },
      {
        name: "Nelly",
        role: { en: "Project Coordination Lead", fr: "Lead Coordination de Projet" },
        email: "loucie@icloud.com",
        bio: {
          en: "Nelly keeps every project on track — coordinating schedules, suppliers, and your peace of mind from kickoff to handover.",
          fr: "Nelly garde chaque projet sur les rails — coordonne plannings, fournisseurs et votre tranquillité d'esprit, du lancement à la livraison."
        }
      }
    ]
  },

  process: {
    eyebrow: { en: "Section 07 · Process", fr: "Section 07 · Processus" },
    title: { en: "How it works.", fr: "Comment ça marche." },
    steps: [
      { num: "01", title: { en: "Tell us your vision", fr: "Dites-nous votre vision" }, text: { en: "Free 30-minute consultation.", fr: "Consultation gratuite de 30 minutes." } },
      { num: "02", title: { en: "Choose your level", fr: "Choisissez votre formule" }, text: { en: "Four à la carte tiers.", fr: "Quatre formules à la carte." } },
      { num: "03", title: { en: "Plan before spending", fr: "Planifiez avant de dépenser" }, text: { en: "See it in 3D first.", fr: "Voyez votre garage en 3D." } },
      { num: "04", title: { en: "Bring it to life", fr: "Donnez-lui vie" }, text: { en: "DIY, supported, or turnkey.", fr: "Vous-même, accompagné ou clé en main." } }
    ]
  },

  final_cta: {
    title: { en: "Ready to reimagine your garage?", fr: "Prêt à réinventer votre garage ?" },
    sub: { en: "Tell us about your space. We'll send a free estimate within 48 hours.", fr: "Parlez-nous de votre espace. Nous envoyons un devis gratuit sous 48h." }
  },

  // ===== USE CASES (Landing V2) — 4 cas d'usage visuels =====
  use_cases: {
    eyebrow: { en: "Transformations", fr: "Transformations" },
    title: {
      en: "Discover Your Dream Garage. Explore, Imagine, and Get Inspired!",
      fr: "Découvrez le garage de vos rêves. Explorez, imaginez et inspirez-vous !"
    },
    sub: {
      en: "We specialize in garage remodeling, makeovers, and custom storage solutions for homeowners, real estate agencies, developers, builders, and property managers across Orlando and the surrounding areas.",
      fr: "Nous sommes spécialisés dans la rénovation de garages, les transformations et les solutions de rangement sur-mesure pour les propriétaires, les agences immobilières, les promoteurs, les constructeurs et les gestionnaires de biens à Orlando et ses environs."
    },
    items: [
      {
        image: "",
        project_slug: "daily-living-garage",
        name: { en: "Daily Living Garage", fr: "Garage du Quotidien" },
        tagline: { en: "Multi-functional / Lifestyle", fr: "Multifonctionnel / Art de vivre" }
      },
      {
        image: "",
        project_slug: "the-social-hub",
        name: { en: "The Social Hub — Smart Living Garage", fr: "Le Social Hub — Smart Living Garage" },
        tagline: {
          en: "A Garage Designed for Entertainment and Lifestyle",
          fr: "Un garage conçu pour le divertissement et l'art de vivre"
        }
      },
      {
        image: "",
        project_slug: "the-daily-living-garage",
        name: { en: "The Daily Living Garage", fr: "Le Garage du Quotidien" },
        tagline: {
          en: "A Multi-Functional Garage for Work, Fitness, and Relaxation",
          fr: "Un garage multifonctionnel pour le travail, le fitness et la détente"
        }
      },
      {
        image: "",
        project_slug: "modern-automotive-lounge",
        name: { en: "Modern Automotive Lounge", fr: "Lounge Automobile Moderne" },
        tagline: {
          en: "A High-End Garage for Cars, Work, Entertainment, and Lifestyle",
          fr: "Un garage haut de gamme pour voitures, travail, divertissement et art de vivre"
        }
      }
    ]
  },

  // ===== RÉALISATIONS =====
  projects_page: {
    eyebrow: { en: "Selected work", fr: "Sélection" },
    title: { en: "Our garages, redesigned.", fr: "Nos garages, repensés." },
    sub: {
      en: "Custom transformations. Tap any project for the full story.",
      fr: "Transformations sur-mesure. Cliquez pour l'histoire complète."
    }
  },
  projects: [
    {
      id: "social-hub",
      slug: "the-social-hub",
      name: { en: "The Social Hub", fr: "Le Social Hub" },
      tagline: {
        en: "Turn your garage into the centerpiece of your home.",
        fr: "Transformez votre garage en pièce maîtresse de la maison."
      },
      type: { en: "Entertainment / Bar", fr: "Divertissement / Bar" },
      size: { en: "2–3 car garage", fr: "Garage 2–3 voitures" },
      duration: { en: "8 weeks", fr: "8 semaines" },
      service: { en: "Full Transformation", fr: "Transformation Complète" },
      year: "2025",
      featured: true,
      large: true,
      description: {
        en: "A complete transformation that turns your garage into a social, functional, and high-impact living space — built for entertaining, relaxing, and everyday enjoyment.",
        fr: "Une transformation complète qui transforme votre garage en lieu social, fonctionnel et marquant — pensé pour recevoir, se détendre et profiter au quotidien."
      },
      includes: {
        en: ["Wet bar", "Custom cabinetry", "Built-in appliances", "Decorative wood wall panels", "Pool table"],
        fr: ["Bar avec point d'eau", "Mobilier sur-mesure", "Appareils encastrés", "Panneaux muraux bois décoratifs", "Billard"]
      },
      why: {
        en: ["Dedicated space for entertaining and relaxing", "Comfort and functionality without expanding your home", "High-impact upgrade that increases property value", "A modern alternative to a traditional home addition"],
        fr: ["Un espace dédié à recevoir et se détendre", "Confort et fonctionnalité sans agrandir la maison", "Une plus-value forte sur votre bien", "Une alternative moderne à une extension traditionnelle"]
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
      name: { en: "The Daily Living Garage", fr: "Le Garage du Quotidien" },
      tagline: {
        en: "A multi-functional garage for work, fitness, and relaxation.",
        fr: "Un garage multi-fonctions pour travailler, bouger et se détendre."
      },
      type: { en: "Multi-functional / Lifestyle", fr: "Multi-fonctions / Lifestyle" },
      size: { en: "2 car garage", fr: "Garage 2 voitures" },
      duration: { en: "6 weeks", fr: "6 semaines" },
      service: { en: "Full Transformation", fr: "Transformation Complète" },
      year: "2025",
      featured: true,
      description: {
        en: "A complete transformation that turns your garage into a flexible, everyday living space designed to support your routine — from movement to focus to relaxation.",
        fr: "Une transformation complète qui fait du garage un espace de vie flexible, pensé pour accompagner votre routine — du mouvement à la concentration jusqu'à la détente."
      },
      includes: {
        en: ["Home fitness area with cardio equipment, floor space, and mirror", "Lounge zone with sofa, TV, and relaxation area", "Compact workspace or home office", "Coffee / utility corner with storage", "Integrated lighting and layout for daily use"],
        fr: ["Zone fitness avec cardio, espace au sol et miroir", "Lounge avec canapé, TV et espace détente", "Bureau compact ou home office", "Coin café / utilitaire avec rangement", "Éclairage et agencement intégrés pour le quotidien"]
      },
      why: {
        en: ["Combine multiple functions in one optimised space", "Improve daily comfort without expanding your home", "Create a practical, organised environment for work and lifestyle", "Increase your property value with a smart transformation"],
        fr: ["Plusieurs fonctions dans un espace optimisé", "Confort au quotidien sans extension", "Un environnement pratique et organisé pour le travail et le lifestyle", "Une transformation intelligente qui valorise le bien"]
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
      tagline: { en: "Where game day meets everyday.", fr: "L'esprit jour de match, au quotidien." },
      type: { en: "Sports bar / Lifestyle", fr: "Bar sportif / Lifestyle" },
      size: { en: "2 car garage", fr: "Garage 2 voitures" },
      duration: { en: "5 weeks", fr: "5 semaines" },
      service: { en: "Full Transformation", fr: "Transformation Complète" },
      year: "2025",
      featured: true,
      description: {
        en: "A full transformation that turns a standard two-car garage into an industrial-chic sports bar and lounge — without sacrificing everyday utility. A butcher-block bar faces a big-screen media wall framed by open shelving, glassware, and team memorabilia, while exposed brick, track lighting, and custom neon set a warm game-day mood. Deep leather seating and a bean bag shape the lounge, and a fully integrated laundry and wet-bar corner keeps the space genuinely practical for daily life.",
        fr: "Une transformation complète qui métamorphose un garage 2 voitures standard en bar sportif et lounge au style industriel — sans renoncer à l'utilité du quotidien. Un bar en bois massif fait face à un mur média grand écran encadré d'étagères ouvertes, de verrerie et de souvenirs sportifs, tandis que la brique apparente, l'éclairage sur rail et les néons sur-mesure installent une ambiance chaleureuse « jour de match ». Des assises en cuir et un pouf composent le lounge, et un coin buanderie et point d'eau entièrement intégré garde l'espace réellement pratique au quotidien."
      },
      includes: {
        en: ["Custom butcher-block bar with stool seating", "Big-screen media wall with open shelving and glassware", "Exposed brick feature wall and industrial track lighting", "Custom neon signage and framed racing-poster gallery", "Leather lounge seating with coffee table", "Fully integrated laundry and wet-bar utility corner"],
        fr: ["Bar sur-mesure en bois massif avec assises hautes", "Mur média grand écran avec étagères ouvertes et verrerie", "Mur en brique apparente et éclairage sur rail industriel", "Néons sur-mesure et galerie d'affiches de course encadrées", "Lounge en cuir avec table basse", "Coin buanderie et point d'eau entièrement intégré"]
      },
      why: {
        en: ["A dedicated space to host game days and unwind", "Entertaining and everyday utility combined in one room", "Frees up space inside the rest of your home", "A high-impact upgrade that adds lasting property value"],
        fr: ["Un espace dédié pour recevoir les soirs de match et se détendre", "Réception et utilité quotidienne réunies dans une seule pièce", "Libère de l'espace dans le reste de la maison", "Une transformation forte qui valorise durablement le bien"]
      },
      images: [
        { label: "Bar & media wall", color: "#3a2c22" },
        { label: "Lounge & laundry corner", color: "#4a3d33" },
        { label: "Lounge & racing wall", color: "#5a4334" }
      ]
    },
    {
      id: "modern-automotive-lounge",
      slug: "modern-automotive-lounge",
      name: { en: "Modern Automotive Lounge", fr: "Lounge Automobile Moderne" },
      tagline: { en: "A high-end garage for cars, work, entertainment, and lifestyle.", fr: "Un garage haut de gamme pour la voiture, le travail, le divertissement et l'art de vivre." },
      type: { en: "Automotive lounge / Multi-use", fr: "Lounge automobile / Multi-usage" },
      size: { en: "2 car garage", fr: "Garage 2 voitures" },
      duration: { en: "7 weeks", fr: "7 semaines" },
      service: { en: "Full Transformation", fr: "Transformation Complète" },
      year: "2025",
      featured: true,
      description: {
        en: "A high-end transformation that lets you keep the car and gain a true lifestyle space around it. One bay still holds the vehicle on a sleek dark floor, while the rest of the garage becomes a multi-use retreat: a dedicated home-office and gaming workstation with a custom PC, a cinematic big-screen lounge with a deep velvet sofa and fur rug, and a retro-styled coffee and beverage bar set against a graphic feature wall. Track lighting, warm accents, and curated décor tie work, play, and automotive passion together in one refined room.",
        fr: "Une transformation haut de gamme qui vous permet de garder la voiture tout en gagnant un véritable espace de vie autour d'elle. Une place accueille toujours le véhicule sur un sol sombre épuré, tandis que le reste du garage devient un lieu multi-usage : un poste home-office et gaming avec PC sur-mesure, un lounge home-cinéma avec canapé en velours et tapis en fourrure, et un coin café et bar au style rétro adossé à un mur graphique. Éclairage sur rail, touches chaleureuses et déco soignée réunissent travail, détente et passion automobile dans une seule pièce raffinée."
      },
      includes: {
        en: ["Dedicated car display bay with finished flooring", "Home-office and gaming workstation with custom PC", "Cinematic big-screen lounge with velvet sofa and fur rug", "Retro coffee and beverage bar with mini-fridge", "Graphic feature wall and curated styling", "Track lighting and warm ambient accents"],
        fr: ["Place dédiée à la voiture avec sol fini", "Poste home-office et gaming avec PC sur-mesure", "Lounge home-cinéma avec canapé velours et tapis fourrure", "Coin café et bar rétro avec mini-frigo", "Mur graphique et décoration soignée", "Éclairage sur rail et touches d'ambiance chaleureuses"]
      },
      why: {
        en: ["Keep your car and still gain a living space", "Work, game, and relax without leaving home", "A premium, multi-use upgrade for car lovers", "Adds standout character and value to your property"],
        fr: ["Gardez votre voiture tout en gagnant un espace de vie", "Travailler, jouer et se détendre sans quitter la maison", "Une transformation premium multi-usage pour passionnés", "Ajoute du caractère et de la valeur au bien"]
      },
      images: [
        { label: "Lounge & workspace · overview", color: "#2c2722" },
        { label: "Car bay & lounge", color: "#7a6450" },
        { label: "Retro coffee bar", color: "#b5703a" },
        { label: "Media lounge & sofa", color: "#3d322a" }
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
