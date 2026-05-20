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
    },
    plan_image: "",
    mood_image: "",
    interior_image: ""
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
    homeowners_image: "/audience-homeowners.svg",
    agents_image: "/audience-agents.svg",
    developers_image: "/audience-developers.svg",
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
    title: { en: "Pick your room.", fr: "Choisissez votre pièce." },
    sub: {
      en: "We specialize in garage remodeling, makeovers, and custom storage solutions for homeowners, real estate agencies, developers, builders, and property managers across Orlando and the surrounding areas.",
      fr: "Nous sommes spécialisés dans la rénovation de garages, les transformations et les solutions de rangement sur-mesure pour les propriétaires, les agences immobilières, les promoteurs, les constructeurs et les gestionnaires de biens à Orlando et ses environs."
    },
    items: [
      {
        image: "/usecase-gym.svg",
        name: { en: "Home Gym", fr: "Salle de sport" },
        tagline: { en: "Train at home, every day.", fr: "S'entraîner chez soi, tous les jours." },
        bullets: {
          en: ["Mirrored wall", "Rubber flooring", "Smart storage"],
          fr: ["Mur miroir", "Sol caoutchouc", "Rangements smart"]
        }
      },
      {
        image: "/usecase-lounge.svg",
        name: { en: "Lounge & Bar", fr: "Lounge & Bar" },
        tagline: { en: "The room you actually use on Fridays.", fr: "La pièce que vous utilisez vraiment le vendredi." },
        bullets: {
          en: ["Wet bar", "Custom cabinetry", "Built-in screen"],
          fr: ["Bar avec point d'eau", "Mobilier sur-mesure", "Écran encastré"]
        }
      },
      {
        image: "/usecase-office.svg",
        name: { en: "Home Office", fr: "Bureau" },
        tagline: { en: "Quiet work, just outside the house.", fr: "Travailler au calme, juste à côté." },
        bullets: {
          en: ["Soundproofing", "Climate control", "Built-in desk"],
          fr: ["Isolation phonique", "Climatisation", "Bureau intégré"]
        }
      },
      {
        image: "/usecase-storage.svg",
        name: { en: "Smart Storage", fr: "Rangement Smart" },
        tagline: { en: "Everything in its place, finally.", fr: "Tout à sa place, enfin." },
        bullets: {
          en: ["Floor-to-ceiling cabinetry", "EV charging", "Sport gear racks"],
          fr: ["Rangements pleine hauteur", "Recharge VE", "Racks sport"]
        }
      }
    ]
  },

  // ===== TESTIMONIALS (Landing V2) =====
  testimonials_v2: {
    eyebrow: { en: "Real homeowners, real stories", fr: "De vrais clients, de vraies histoires" },
    title: {
      en: "Where Orlando homeowners fall in love with their garage.",
      fr: "Là où les propriétaires d'Orlando tombent amoureux de leur garage."
    },
    items: [
      {
        quote: {
          en: "We turned an unused two-car garage into our favorite room. The 3D plan made every decision easy.",
          fr: "Nous avons transformé un garage 2 voitures inutilisé en notre pièce préférée. Le plan 3D a rendu chaque décision simple."
        },
        name: "Sarah & Michael K.",
        city: "Winter Park, FL",
        rating: 5
      },
      {
        quote: {
          en: "Clear pricing, beautiful renders, flawless execution. Worth every penny.",
          fr: "Prix clairs, rendus magnifiques, exécution irréprochable. Chaque dollar bien dépensé."
        },
        name: "James R.",
        city: "Lake Nona, FL",
        rating: 5
      },
      {
        quote: {
          en: "They listened first, then designed. The lounge is now where we spend every Friday night.",
          fr: "Ils ont d'abord écouté, puis dessiné. Le lounge est devenu notre QG du vendredi soir."
        },
        name: "Priya S.",
        city: "Windermere, FL",
        rating: 5
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
      tagline: { en: "Utility, comfort, and style — designed for daily life.", fr: "Utilité, confort, style — pensé pour le quotidien." },
      type: { en: "Daily living / Utility", fr: "Vie quotidienne / Utilitaire" },
      size: { en: "2 car garage", fr: "Garage 2 voitures" },
      duration: { en: "5 weeks", fr: "5 semaines" },
      service: { en: "Full Transformation", fr: "Transformation Complète" },
      year: "2025",
      featured: true,
      description: {
        en: "A complete transformation that turns your garage into a functional, comfortable extension of your home — combining utility, comfort, and style.",
        fr: "Une transformation complète qui fait du garage une extension fonctionnelle et confortable de la maison — entre utilité, confort et style."
      },
      includes: {
        en: ["Integrated laundry and utility area", "Comfortable lounge space with TV, relaxation, and daily use", "Smart storage solutions to keep everything organized", "Clean, functional environment ready for everyday living"],
        fr: ["Zone buanderie et utilitaire intégrée", "Lounge confortable avec TV, détente et usage quotidien", "Rangements smart pour garder l'espace organisé", "Environnement propre, fonctionnel et prêt à vivre"]
      },
      why: {
        en: ["Free up space in the rest of your home", "Simplify your daily routines and reduce clutter", "Improve comfort while increasing your property value"],
        fr: ["Libérer de l'espace dans le reste de la maison", "Simplifier les routines quotidiennes et réduire le désordre", "Améliorer le confort tout en valorisant le bien"]
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
