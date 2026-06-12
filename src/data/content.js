/* =========================================================
   Content Store — bilingue ES/EN
   Édition possible via l'interface Admin (CMS)
   ========================================================= */

export const CONTENT = {
  brand: {
    name: "Garage a la Carte",
    tagline_en: "American precision, European design.",
    tagline_fr: "Precisión americana, diseño europeo."
  },

  nav: {
    en: { home: "Home", projects: "Projects", contact: "Contact", admin: "Admin" },
    fr: { home: "Inicio", projects: "Proyectos", contact: "Contacto", admin: "Admin" }
  },

  hero: {
    eyebrow: {
      en: "Orlando, FL · Custom garage transformations",
      fr: "Orlando, FL · Transformaciones de garaje a medida"
    },
    title: {
      en: ["Your garage,", "reimagined."],
      fr: ["Tu garaje,", "reinventado."]
    },
    italic_word: { en: "reimagined.", fr: "reinventado." },
    tagline: {
      en: "Unlock the Full Potential of Your Garage",
      fr: "Libera todo el potencial de tu garaje"
    },

    sub: {
      en: "Custom garage transformations in Orlando.",
      fr: "Transformaciones de garaje a medida en Orlando."
    },
    primary_cta: { en: "Get my free estimate", fr: "Obtener mi presupuesto gratuito" },
    secondary_cta: { en: "See our work", fr: "Ver nuestros proyectos" }
  },

  hero_caption: {
    label: { en: "Featured project", fr: "Proyecto destacado" },
    images: [],
    featured_label: { en: "FEATURED PROJECT", fr: "PROYECTO DESTACADO" },
    featured_title: { en: "The Social Hub", fr: "The Social Hub" }
  },

  before_after: {
    eyebrow: { en: "Section 02 · Story", fr: "Sección 02 · La historia" },
    title: {
      en: "From cluttered garage to dream garage. See the transformation!",
      fr: "De un garaje desordenado al garaje de tus sueños. ¡Descubre la transformación!"
    },
    before: {
      en: "Boxes, tools, wasted square footage. No clear purpose.",
      fr: "Cajas, herramientas, metros cuadrados desperdiciados. Sin un propósito claro."
    },
    after: {
      en: "A clean, planned, functional garage designed around your lifestyle.",
      fr: "Un garaje limpio, planificado y funcional, diseñado en torno a tu estilo de vida."
    },
    statement: {
      en: "Experience American practicality and precision combined with European mood-visual design and advanced Color, Material & Finish (CMF) expertise for a stunning, functional space.",
      fr: "Descubre la practicidad y precisión americanas combinadas con el diseño visual y la atmósfera europeos, junto a una experiencia avanzada en Color, Material y Acabado (CMF), para un espacio funcional e impresionante."
    },
    before_image: "",
    after_image: ""
  },

  services: {
    eyebrow: { en: "Section 03 · Services", fr: "Sección 03 · Servicios" },
    title: {
      en: "Explore Our Four Signature Services",
      fr: "Descubre nuestros cuatro servicios estrella"
    },
    sub: {
      en: "Avoid costly mistakes. Start with a plan — or go all the way. Upgrade anytime.",
      fr: "Evita errores costosos. Empieza con un plan — o ve hasta el final. Mejora cuando quieras."
    },
    items: [
      {
        id: "blueprint",
        num: "01",
        title: { en: "Garage Design & Build Plan", fr: "Garage Design & Build Plan" },
        sub: { en: "Plan It Right. Build It Your Way.", fr: "Hazlo bien desde el principio. Construye a tu manera." },
        tag: { en: "Ideal for getting started", fr: "Ideal para empezar" },
        description: {
          en: "You want to plan your garage with confidence before making decisions. See your future garage before you build anything — with a custom layout and 3D design, three realistic views, and expert guidance to avoid costly mistakes. Most clients start here, then move forward once they see their design.",
          fr: "Quieres planificar tu garaje con seguridad antes de tomar decisiones. Visualiza tu futuro garaje antes de construir nada — con una distribución a medida y diseño 3D, tres vistas realistas y asesoramiento experto para evitar errores costosos. La mayoría de los clientes empieza aquí y avanza una vez que ve su diseño."
        },
        price: { en: "starts at $950", fr: "desde 950 $" },
        led_by: ["Aymeric", "Juliette", "Guillaume"],
        includes: {
          en: ["Custom layouts and technical planning", "3 initial realistic views", "Expert design guidance from our team"],
          fr: ["Distribuciones a medida y planificación técnica", "3 vistas realistas iniciales", "Asesoramiento de diseño experto de nuestro equipo"]
        },
        not_included: { en: "No product purchasing, no delivery, no installation.", fr: "Sin compra de productos, sin entrega, sin instalación." },
        on_site: { en: "Garage Design & Build Plan + On-Site Assessment starts at $1,350", fr: "Garage Design & Build Plan + evaluación in situ desde 1 350 $" },
        details: [
          {
            title: { en: "Choose your level", fr: "Elige tu nivel" },
            items: {
              en: ["Garage Design & Build Plan (Remote) starts at $950", "Garage Design & Build Plan + On-Site Assessment starts at $1,350"],
              fr: ["Garage Design & Build Plan a distancia desde 950 $", "Garage Design & Build Plan + evaluación in situ desde 1 350 $"]
            }
          },
          {
            title: { en: "Design Review Period", fr: "Periodo de revisión del diseño" },
            body: {
              en: "After receiving your design package, you'll have up to 7 days to review the proposed concept with our team. During this review period, additional visual perspectives and minor design refinements may be provided as needed. Our goal is to ensure you have a clear vision of your future garage before any purchasing, delivery, or installation decisions are made. Some projects may require custom pricing depending on garage size, level of customization, requested visuals, revisions, or technical complexity.",
              fr: "Tras recibir tu paquete de diseño, dispondrás de hasta 7 días para revisar la propuesta con nuestro equipo. Durante este periodo de revisión se pueden aportar perspectivas visuales adicionales y pequeños ajustes de diseño, según sea necesario. Nuestro objetivo es que tengas una visión clara de tu futuro garaje antes de tomar cualquier decisión de compra, entrega o instalación. Algunos proyectos pueden requerir un precio personalizado según el tamaño del garaje, el nivel de personalización, las vistas solicitadas, las revisiones o la complejidad técnica."
            }
          },
          {
            title: { en: "How it works", fr: "Cómo funciona" },
            items: {
              en: ["Initial project discussion to understand your vision", "Custom design package with clear deliverables and fixed pricing", "Delivered digitally, with optional on-site assessment when needed"],
              fr: ["Conversación inicial para entender tu visión", "Paquete de diseño a medida con entregables claros y precio fijo", "Entrega digital, con evaluación in situ opcional cuando es necesario"]
            }
          },
          {
            title: { en: "Continue your project", fr: "Continúa tu proyecto" },
            body: {
              en: "Move forward at any time with setup or a full transformation.",
              fr: "Avanza en cualquier momento con el setup o una transformación completa."
            }
          },
          {
            title: { en: "Design Ownership", fr: "Propiedad del diseño" },
            body: {
              en: "All layouts, plans, and visual designs remain the property of Garage à la Carte and are provided for your personal project use. Independent use or third-party execution may require a separate usage agreement.",
              fr: "Todos los planos, diseños y visuales siguen siendo propiedad de Garage à la Carte y se proporcionan para uso personal de tu proyecto. El uso independiente o la ejecución por terceros puede requerir un acuerdo de uso por separado."
            }
          },
          {
            title: { en: "Delivery area", fr: "Zona de servicio" },
            body: {
              en: "On-site visits are available throughout the Orlando area. Visits beyond our standard zone are quoted based on location.",
              fr: "Las visitas in situ están disponibles en toda la zona de Orlando. Más allá de la zona estándar, se presupuestan según la ubicación."
            }
          }
        ]
      },
      {
        id: "delivery",
        num: "02",
        title: { en: "Design & Setup", fr: "Design & Setup" },
        sub: { en: "Plan It Right. Prepare It With Confidence.", fr: "Hazlo bien desde el principio. Prepáralo con confianza." },
        description: {
          en: "You want more than a design — you want the right products, materials, and a clear setup plan. Move from vision to execution without the sourcing headache. We take your project beyond design, ensuring every detail is addressed before purchasing, delivery, or installation begins. Most clients move forward with a full transformation once everything is planned and ready.",
          fr: "Quieres algo más que un diseño — quieres los productos adecuados, los materiales correctos y un plan de instalación claro. Pasa de la visión a la ejecución sin la carga del sourcing. Llevamos tu proyecto más allá del diseño, asegurándonos de que cada detalle esté resuelto antes de iniciar compras, entrega o instalación. La mayoría de los clientes pasa a la transformación completa una vez que todo está planificado y listo."
        },
        price: { en: "starts at $1,500", fr: "desde 1 500 $" },
        badge: { en: "Most popular", fr: "El más elegido" },
        led_by: ["Aymeric", "Juliette", "Guillaume"],
        includes: {
          en: ["Custom layouts and technical planning", "3 initial realistic views", "Product selection guidance", "Sourcing coordination", "Delivery and assembly of selected components", "Expert design guidance from our team"],
          fr: ["Distribuciones a medida y planificación técnica", "3 vistas realistas iniciales", "Asesoramiento en la selección de productos", "Coordinación del sourcing", "Entrega y montaje de los componentes seleccionados", "Asesoramiento de diseño experto de nuestro equipo"]
        },
        not_included: { en: "No final installation or contractor labor unless upgraded to Full Transformation.", fr: "Sin instalación final ni mano de obra del contratista, salvo al pasar a Transformación Completa." },
        deposit: { en: "50% / 50%", fr: "50 % / 50 %" },
        details: [
          {
            title: { en: "Service fee credit", fr: "Crédito de honorarios" },
            body: {
              en: "The service fee is fully credited when you move forward with a signed project contract.",
              fr: "Los honorarios se acreditan íntegramente si continúas con un contrato de proyecto firmado."
            }
          },
          {
            title: { en: "Design Review Period", fr: "Periodo de revisión del diseño" },
            body: {
              en: "After receiving your design package, you'll have up to 7 days to review the proposed concept with our team. During this review period, additional visual perspectives and minor design refinements may be provided as needed to help you confidently validate your project before moving forward. Our goal is to ensure every product, material, and design decision is fully aligned before purchasing, delivery, or installation begins.",
              fr: "Tras recibir tu paquete de diseño, dispondrás de hasta 7 días para revisar la propuesta con nuestro equipo. Durante este periodo de revisión se pueden aportar perspectivas visuales adicionales y pequeños ajustes de diseño, según sea necesario, para ayudarte a validar tu proyecto con total confianza antes de avanzar. Nuestro objetivo es que cada decisión de producto, material y diseño esté plenamente alineada antes de iniciar compras, entrega o instalación."
            }
          },
          {
            title: { en: "How it works", fr: "Cómo funciona" },
            items: {
              en: ["Free consultation to define your project", "Clear scope before commitment", "Fixed starting price — final pricing depends on size, complexity, and sourcing needs", "Design package delivered digitally", "Product sourcing, delivery, and assembly coordinated by our team"],
              fr: ["Consulta gratuita para definir tu proyecto", "Alcance claro antes del compromiso", "Precio inicial fijo — el precio final depende del tamaño, la complejidad y las necesidades de sourcing", "Paquete de diseño entregado digitalmente", "Sourcing de productos, entrega y montaje coordinados por nuestro equipo"]
            }
          },
          {
            title: { en: "Deposit structure", fr: "Estructura de pago" },
            body: {
              en: "This ensures your entire project is fully prepared before execution. After the 7-day review period and final approval, any major redesign, significant scope change, or change in project direction may require additional design services and will be quoted separately.",
              fr: "Así nos aseguramos de que todo tu proyecto esté completamente preparado antes de la ejecución. Tras los 7 días de revisión y la aprobación final, cualquier rediseño importante, cambio significativo de alcance o cambio de dirección del proyecto puede requerir servicios de diseño adicionales y se presupuestará por separado."
            },
            items: {
              en: ["50% to secure your project and begin design", "50% upon completion and final walkthrough"],
              fr: ["50 % para asegurar tu proyecto e iniciar el diseño", "50 % al finalizar, en la visita final"]
            }
          },
          {
            title: { en: "Design Ownership", fr: "Propiedad del diseño" },
            body: {
              en: "All layouts, plans, and visual designs remain the property of Garage à la Carte and are provided for your personal project use. Independent use or third-party execution may require a separate usage agreement.",
              fr: "Todos los planos, diseños y visuales siguen siendo propiedad de Garage à la Carte y se proporcionan para uso personal de tu proyecto. El uso independiente o la ejecución por terceros puede requerir un acuerdo de uso por separado."
            }
          },
          {
            title: { en: "Continue your project", fr: "Continúa tu proyecto" },
            body: {
              en: "Move forward anytime with Full Transformation.",
              fr: "Pasa a la transformación completa cuando quieras."
            }
          },
          {
            title: { en: "Delivery area", fr: "Zona de servicio" },
            body: {
              en: "On-site visits are available throughout the Orlando area. Visits beyond our standard zone are quoted based on location. Everything is prepared so you can move forward with confidence.",
              fr: "Las visitas in situ están disponibles en toda la zona de Orlando. Las visitas fuera de nuestra zona estándar se presupuestan según la ubicación. Todo queda preparado para que puedas avanzar con confianza."
            }
          }
        ]
      },
      {
        id: "transform",
        num: "03",
        title: { en: "Full Transformation", fr: "Transformación Completa" },
        sub: { en: "From Concept to Completion — We Handle Everything", fr: "Del concepto a la entrega — nos encargamos de todo" },
        description: {
          en: "Experience our most comprehensive service. You want a complete, worry-free transformation — fully designed, fully managed, fully delivered. A complete, turnkey solution where we design, plan, and coordinate your full garage transformation, handling scheduling and coordination so your project runs smoothly. Most clients enhance their transformation with integrated upgrades, such as lighting, electrical, climate control, and smart features, designed to work seamlessly together. We don't just design your garage — we manage the entire transformation, from initial concept to final walkthrough.",
          fr: "Vive nuestro servicio más completo. Quieres una transformación completa y sin preocupaciones — totalmente diseñada, gestionada y entregada. Una solución llave en mano donde diseñamos, planificamos y coordinamos toda la transformación de tu garaje, encargándonos de la planificación y la coordinación para que tu proyecto avance sin contratiempos. La mayoría de los clientes complementa su transformación con integraciones, como iluminación, electricidad, climatización y funciones inteligentes, pensadas para funcionar en conjunto. No solo diseñamos tu garaje — gestionamos toda la transformación, desde el concepto inicial hasta la visita final."
        },
        price: { en: "starts at $2,750", fr: "desde 2 750 $" },
        badge: { en: "Premium Experience", fr: "Experiencia premium" },
        led_by: ["Guillaume", "Aymeric", "Juliette"],
        includes: {
          en: ["Custom layouts and technical planning", "3 initial realistic views", "Full space planning (storage, living, utility, entertainment, and lifestyle zones)", "Complete material and equipment selection", "Sourcing and logistics coordination", "Complete transformation management from design to final walkthrough", "Final walkthrough of your completed space", "Expert design guidance from our team"],
          fr: ["Distribuciones a medida y planificación técnica", "3 vistas realistas iniciales", "Planificación completa del espacio (almacenamiento, estancia, servicios, ocio y zonas de estilo de vida)", "Selección completa de materiales y equipamiento", "Coordinación de sourcing y logística", "Gestión completa de la transformación, del diseño a la visita final", "Visita final de tu espacio terminado", "Asesoramiento de diseño experto de nuestro equipo"]
        },
        deposit: { en: "50% / 25% / 25%", fr: "50 % / 25 % / 25 %" },
        details: [
          {
            title: { en: "Service fee credit", fr: "Crédito de honorarios" },
            body: {
              en: "Fully credited toward your signed Full Transformation project contract.",
              fr: "Se acredita íntegramente sobre tu contrato de proyecto Full Transformation firmado."
            }
          },
          {
            title: { en: "Design Review Period", fr: "Periodo de revisión del diseño" },
            body: {
              en: "After receiving your design package, you'll have up to 7 days to review the proposed concept with our team. During this review period, additional visual perspectives and minor design refinements may be provided as needed to help you confidently validate your project before moving forward. Our goal is to ensure every design, material, and project decision is fully aligned before purchasing, scheduling, delivery, or installation begins. After the 7-day review period and final approval, any major redesign, significant scope change, or change in project direction may require additional design services and will be quoted separately.",
              fr: "Tras recibir tu paquete de diseño, dispondrás de hasta 7 días para revisar la propuesta con nuestro equipo. Durante este periodo de revisión se pueden aportar perspectivas visuales adicionales y pequeños ajustes de diseño, según sea necesario, para ayudarte a validar tu proyecto con total confianza antes de avanzar. Nuestro objetivo es que cada decisión de diseño, material y proyecto esté plenamente alineada antes de iniciar compras, planificación, entrega o instalación. Tras los 7 días de revisión y la aprobación final, cualquier rediseño importante, cambio significativo de alcance o cambio de dirección del proyecto puede requerir servicios de diseño adicionales y se presupuestará por separado."
            }
          },
          {
            title: { en: "How it works", fr: "Cómo funciona" },
            items: {
              en: ["Personalized project consultation to define your vision", "Clear scope, budget, and timeline", "Structured phases from design to completion", "One expert guiding your project throughout"],
              fr: ["Consulta personalizada del proyecto para definir tu visión", "Alcance, presupuesto y plazos claros", "Fases estructuradas del diseño a la entrega", "Un experto que acompaña tu proyecto durante todo el proceso"]
            }
          },
          {
            title: { en: "Deposit structure", fr: "Estructura de pago" },
            body: {
              en: "This ensures your entire project is fully prepared before execution.",
              fr: "Así nos aseguramos de que todo tu proyecto esté completamente preparado antes de la ejecución."
            },
            items: {
              en: ["50% to secure your project and begin design", "25% after design validation (materials & sourcing phase)", "25% upon completion and final walkthrough"],
              fr: ["50 % para asegurar tu proyecto e iniciar el diseño", "25 % tras la validación del diseño (fase de materiales y sourcing)", "25 % al finalizar, en la visita final"]
            }
          },
          {
            title: { en: "Project investment", fr: "Inversión del proyecto" },
            body: {
              en: "Final project investment varies depending on garage size, finishes, customization level, and integrated features.",
              fr: "La inversión final del proyecto varía según el tamaño del garaje, los acabados, el nivel de personalización y las funciones integradas."
            }
          },
          {
            title: { en: "Design Ownership", fr: "Propiedad del diseño" },
            body: {
              en: "All layouts, plans, and visual designs remain the property of Garage à la Carte and are provided for your personal project use. Independent use or third-party execution may require a separate usage agreement.",
              fr: "Todos los planos, diseños y visuales siguen siendo propiedad de Garage à la Carte y se proporcionan para uso personal de tu proyecto. El uso independiente o la ejecución por terceros puede requerir un acuerdo de uso por separado."
            }
          },
          {
            title: { en: "Continue your project", fr: "Continúa tu proyecto" },
            body: {
              en: "Ready to go further? Upgrade your space with integrated systems — plumbing, electrical, climate control, and smart features — designed to work seamlessly together. Transform your garage into a fully equipped, high-performance space.",
              fr: "¿Quieres ir más allá? Mejora tu espacio con sistemas integrados — fontanería, electricidad, climatización y funciones inteligentes — diseñados para funcionar en conjunto. Transforma tu garaje en un espacio totalmente equipado y de alto rendimiento."
            }
          },
          {
            title: { en: "Delivery area", fr: "Zona de servicio" },
            body: {
              en: "On-site visits are available throughout the Orlando area. Visits beyond our standard zone are quoted based on location.",
              fr: "Las visitas in situ están disponibles en toda la zona de Orlando. Las visitas fuera de nuestra zona estándar se presupuestan según la ubicación."
            }
          }
        ]
      },
      {
        id: "smart",
        num: "04",
        title: { en: "Smart Integration", fr: "Smart Integration" },
        sub: { en: "Designed for daily performance — not just visual appeal.", fr: "Pensado para el rendimiento diario — no solo para la estética." },
        description: {
          en: "You want more than a beautiful space — you want a garage that works seamlessly every day. We integrate the systems that bring your space to life: technical planning for plumbing, electrical, HVAC, ventilation, media, smart features, and built-in systems — typically integrated within Design & Setup or Full Transformation.",
          fr: "Quieres algo más que un espacio bonito — quieres un garaje que funcione perfectamente cada día. Integramos los sistemas que dan vida a tu espacio: fontanería, electricidad, HVAC, ventilación, multimedia, funciones inteligentes y sistemas integrados — generalmente combinados con Design & Setup o Transformación Completa."
        },
        price: { en: "starts at $3,500", fr: "desde 3 500 $" },
        tag: { en: "Add-on", fr: "Add-on" },
        led_by: ["Guillaume", "Aymeric", "Juliette"],
        includes: {
          en: ["Technical integration aligned with your design", "Planning of plumbing, electrical, HVAC, and ventilation", "Built-in storage, media setup, and smart features", "Coordination with qualified professionals", "Technical layouts prepared for implementation"],
          fr: ["Integración técnica alineada con el diseño", "Planificación de fontanería, electricidad, HVAC y ventilación", "Almacenamiento integrado, multimedia y funciones inteligentes", "Coordinación con profesionales cualificados", "Planos técnicos listos para la ejecución"]
        },
        deposit: { en: "Included within your main project deposit structure.", fr: "Incluido en la estructura de pago del proyecto principal." },
        details: [
          {
            title: { en: "How it works", fr: "Cómo funciona" },
            items: {
              en: ["Systems are planned during the design phase", "Integration is coordinated before any work begins", "All components are designed to function seamlessly together"],
              fr: ["Los sistemas se planifican durante la fase de diseño", "La integración se coordina antes de iniciar los trabajos", "Todos los componentes están pensados para funcionar en conjunto"]
            }
          },
          {
            title: { en: "Investment", fr: "Inversión" },
            items: {
              en: ["Can be added as a standalone upgrade if needed", "Technical feasibility validated before implementation", "Clear scope and system requirements defined upfront", "Coordination planned prior to execution"],
              fr: ["Puede añadirse como upgrade independiente si es necesario", "Viabilidad técnica validada antes de la ejecución", "Alcance y requisitos de los sistemas definidos por adelantado", "Coordinación prevista antes de la ejecución"]
            },
            body: {
              en: "Custom add-on based on your systems and integration needs. Typically included within Design & Setup or Full Transformation.",
              fr: "Add-on a medida según tus sistemas y necesidades de integración. Generalmente incluido en Design & Setup o Transformación Completa."
            }
          },
          {
            title: { en: "Service fee credit", fr: "Crédito de honorarios" },
            body: {
              en: "The service fee starts at $3,500 and is fully credited when you move forward with a signed project contract.",
              fr: "Los honorarios comienzan en 3 500 $ y se acreditan íntegramente si continúas con un contrato de proyecto firmado."
            }
          },
          {
            title: { en: "Additional work", fr: "Trabajos adicionales" },
            body: {
              en: "Any additional systems, upgrades, or scope changes are clearly defined and quoted separately.",
              fr: "Cualquier sistema adicional, upgrade o cambio de alcance se define claramente y se presupuesta por separado."
            }
          },
          {
            title: { en: "Use of designs", fr: "Uso de los planos" },
            body: {
              en: "Technical layouts and integration plans remain the property of Garage a la Carte and are provided for your personal project use only. If you work with another contractor, a separate usage or release agreement may be required.",
              fr: "Los planos técnicos y planos de integración son propiedad de Garage a la Carte y se entregan exclusivamente para tu proyecto personal. Si trabajas con otro contratista, puede requerirse un acuerdo de uso o cesión."
            }
          },
          {
            title: { en: "Permits & regulations", fr: "Permisos y normativa" },
            body: {
              en: "Some systems may require city or county permits depending on the scope. We guide you through requirements and coordinate with the appropriate professionals when needed.",
              fr: "Algunos sistemas pueden requerir permisos municipales o del condado según el alcance. Te guiamos sobre los requisitos y coordinamos con los profesionales adecuados cuando es necesario."
            }
          },
          {
            title: { en: "Delivery area", fr: "Zona de servicio" },
            body: {
              en: "On-site visits are available throughout the Orlando area. Visits beyond our standard zone are quoted based on location.",
              fr: "Las visitas in situ están disponibles en toda la zona de Orlando. Las visitas fuera de nuestra zona estándar se presupuestan según la ubicación."
            }
          }
        ]
      }
    ]
  },

  team: {
    eyebrow: { en: "Section 05 · Who we are", fr: "Sección 05 · El equipo" },
    title: { en: "Built by experts. Designed around you.", fr: "Construido por expertos. Diseñado en torno a ti." },
    sub: {
      en: "Garage a la Carte is a collaboration of specialists who turn ideas into real, functional spaces.",
      fr: "Garage a la Carte es la unión de especialistas que convierten las ideas en espacios funcionales reales."
    },
    members: [
      {
        name: "Guillaume",
        role: { en: "Garage Transformation & Build Lead", fr: "Responsable de Transformación y Construcción de Garaje" },
        phone: "+1 (917) 353-4950",
        email: "garagealacarte@gmail.com",
        website: "https://www.ecuafranceelectric.com/",
        bio: {
          en: "Based in Orlando, Guillaume brings real-world construction experience and ensures every project is grounded, feasible, and built right.",
          fr: "Con sede en Orlando, Guillaume aporta una sólida experiencia en obra y garantiza que cada proyecto sea realista, viable y bien ejecutado."
        }
      },
      {
        name: "Aymeric Vanelle",
        role: { en: "3D Space Planning & Technical Design Lead", fr: "Responsable de planificación espacial 3D y diseño técnico" },
        bio: {
          en: "Industrial designer specializing in 3D design and custom space planning, with a Paris-trained background in fine woodworking, industrial design, and applied arts.",
          fr: "Diseñador industrial especializado en diseño 3D y planificación de espacios a medida, con formación parisina en ebanistería fina, diseño industrial y artes aplicadas."
        },
        long_bio: {
          en: "I am Aymeric Vanelle, an industrial designer specializing in 3D design and custom space planning. My background includes fine woodworking, industrial design, and applied arts, all earned in Paris, France.\n\nMy experience spans high-end cabinetry, luxury residential projects, the French film industry, and the creation of luxury presentation boxes for watchmaking and cigar brands.\n\nThis background has shaped my approach, combining technical precision, craftsmanship, and meticulous attention to detail.\n\nAt Garage a la Carte, I contribute expertise in technical design and space optimization, transforming ideas into functional and well-planned environments. By creating detailed 3D floor plans and applying thoughtful space planning, I ensure every project is practical, efficient, and tailored to the client's specific needs.\n\nWorking with Juliette and Guillaume, we design smart, functional, and personalized garages that enhance everyday living and integrate naturally into each family's lifestyle.",
          fr: "Soy Aymeric Vanelle, diseñador industrial especializado en diseño 3D y planificación de espacios a medida. Mi formación incluye ebanistería fina, diseño industrial y artes aplicadas, todo ello en París, Francia.\n\nMi experiencia abarca mobiliario de alta gama, proyectos residenciales de lujo, la industria cinematográfica francesa y la creación de cajas de presentación de lujo para marcas de relojería y cigarros.\n\nEste recorrido ha dado forma a mi enfoque, combinando precisión técnica, artesanía y una atención minuciosa al detalle.\n\nEn Garage a la Carte, aporto experiencia en diseño técnico y optimización del espacio, transformando ideas en entornos funcionales y bien planificados. Mediante planos 3D detallados y una planificación espacial cuidada, me aseguro de que cada proyecto sea práctico, eficiente y adaptado a las necesidades específicas del cliente.\n\nJunto a Juliette y Guillaume, diseñamos garajes inteligentes, funcionales y personalizados que mejoran la vida diaria y se integran de forma natural en el estilo de vida de cada familia."
        }
      },
      {
        name: "Juliette",
        role: { en: "Mood-Visual & Advanced Color, Material & Finish (CMF) Design Lead", fr: "Responsable de Diseño Mood-Visual y Color, Material y Acabado (CMF) avanzado" },
        phone: "+1 (689) 217-4074",
        email: "garagealacarte@gmail.com",
        bio: {
          en: "Combines American precision with European creativity and space-saving design — turning ideas into immersive visuals so you see your future space before it's built.",
          fr: "Combina la precisión americana con la creatividad europea. Juliette crea imágenes inmersivas para que veas tu espacio antes incluso de que exista."
        },
        long_bio: {
          en: "I am Juliette Bergougnoux, an American-French designer born in New York City, with a creative background shaped by both American innovation and European design culture.\n\nI hold a Master's degree in Interior Transportation Design with a specialization in Color, Material & Finish (CMF), completed in Paris, France.\n\nMy experience includes collaborations with major automotive brands such as Citroën and Dacia, where I developed CMF concepts for transportation interiors, focusing on material selection, color integration, visual identity, and user experience.\n\nMy design approach combines functionality, atmosphere, and refined material storytelling to create spaces that feel both distinctive and purposeful.\n\nToday, I bring this expertise to Garage a la Carte alongside Aymeric and Guillaume, helping to design personalized garage environments that reflect each client's lifestyle through thoughtful space planning, materials, colors, and functionality.",
          fr: "Soy Juliette Bergougnoux, diseñadora franco-americana nacida en Nueva York, con un recorrido creativo moldeado por la innovación americana y la cultura del diseño europeo.\n\nSoy Máster en Interior Transportation Design con especialización en Color, Material y Acabado (CMF), obtenido en París.\n\nMi experiencia incluye colaboraciones con grandes marcas del automóvil como Citroën y Dacia, donde desarrollé conceptos CMF para interiores de vehículos, trabajando la selección de materiales, la integración del color, la identidad visual y la experiencia de usuario.\n\nMi enfoque del diseño combina funcionalidad, atmósfera y un relato cuidado de los materiales para crear espacios distintivos y llenos de sentido.\n\nHoy aporto esta experiencia a Garage a la Carte junto a Aymeric y Guillaume, diseñando garajes personalizados que reflejan el estilo de vida de cada cliente a través de una cuidada planificación del espacio, los materiales, los colores y la funcionalidad."
        }
      },
      {
        name: "Nelly",
        role: { en: "Project Coordination Lead", fr: "Responsable de Coordinación de Proyecto" },
        bio: {
          en: "Nelly keeps every project on track — coordinating schedules, suppliers, and your peace of mind from kickoff to handover.",
          fr: "Nelly mantiene cada proyecto en marcha — coordina agendas, proveedores y tu tranquilidad, desde el inicio hasta la entrega."
        }
      }
    ]
  },

  process: {
    eyebrow: { en: "Section 07 · Process", fr: "Sección 07 · Proceso" },
    title: { en: "How it works.", fr: "Cómo funciona." },
    steps: [
      { num: "01", title: { en: "Tell us your vision", fr: "Cuéntanos tu visión" }, text: { en: "Free 30-minute consultation.", fr: "Consulta gratuita de 30 minutos." } },
      { num: "02", title: { en: "Choose your level", fr: "Elige tu fórmula" }, text: { en: "Four à la carte tiers.", fr: "Cuatro fórmulas à la carte." } },
      { num: "03", title: { en: "Plan before spending", fr: "Planifica antes de gastar" }, text: { en: "See it in 3D first.", fr: "Visualiza tu garaje en 3D." } },
      { num: "04", title: { en: "Bring it to life", fr: "Dale vida" }, text: { en: "DIY, supported, or turnkey.", fr: "Tú mismo, acompañado o llave en mano." } }
    ]
  },

  final_cta: {
    title: { en: "Ready to reimagine your garage?", fr: "¿Listo para reinventar tu garaje?" },
    sub: { en: "Tell us about your space. We'll send a free estimate within 48 hours.", fr: "Cuéntanos sobre tu espacio. Te enviaremos un presupuesto gratuito en 48 h." }
  },

  // ===== USE CASES (Landing V2) — 4 cas d'usage visuels =====
  use_cases: {
    eyebrow: { en: "Transformations", fr: "Transformaciones" },
    title: {
      en: "Discover Your Dream Garage. Explore, Imagine, and Get Inspired!",
      fr: "Descubre el garaje de tus sueños. ¡Explora, imagina e inspírate!"
    },
    sub: {
      en: "We specialize in garage remodeling, makeovers, and custom storage solutions for homeowners, real estate agencies, developers, builders, and property managers across Orlando and the surrounding areas.",
      fr: "Estamos especializados en la reforma de garajes, transformaciones y soluciones de almacenamiento a medida para propietarios, agencias inmobiliarias, promotores, constructores y administradores de fincas en Orlando y alrededores."
    },
    items: [
      {
        image: "",
        project_slug: "daily-living-garage",
        name: { en: "Daily Living Garage", fr: "Garaje del Día a Día" },
        tagline: { en: "Multi-functional / Lifestyle", fr: "Multifuncional / Estilo de vida" }
      },
      {
        image: "",
        project_slug: "the-social-hub",
        name: { en: "The Social Hub — Smart Living Garage", fr: "The Social Hub — Smart Living Garage" },
        tagline: {
          en: "A Garage Designed for Entertainment and Lifestyle",
          fr: "Un garaje diseñado para el entretenimiento y el estilo de vida"
        }
      },
      {
        image: "",
        project_slug: "the-daily-living-garage",
        name: { en: "The Daily Living Garage", fr: "El Garaje del Día a Día" },
        tagline: {
          en: "A Multi-Functional Garage for Work, Fitness, and Relaxation",
          fr: "Un garaje multifuncional para el trabajo, el fitness y la relajación"
        }
      },
      {
        image: "",
        project_slug: "modern-automotive-lounge",
        name: { en: "The Hybrid Lifestyle Garage", fr: "El Garaje Híbrido Lifestyle" },
        tagline: {
          en: "A Garage Designed for Cars, Work & Entertainment",
          fr: "Un garaje diseñado para coches, trabajo y entretenimiento"
        }
      }
    ]

  },

  // ===== RÉALISATIONS =====
  projects_page: {
    eyebrow: { en: "Selected work", fr: "Selección" },
    title: { en: "Our garages, redesigned.", fr: "Nuestros garajes, repensados." },
    sub: {
      en: "Custom transformations. Tap any project for the full story.",
      fr: "Transformaciones a medida. Haz clic para conocer la historia completa."
    }
  },
  projects: [
    {
      id: "social-hub",
      slug: "the-social-hub",
      name: { en: "The Social Hub", fr: "El Social Hub" },
      tagline: {
        en: "A Garage Designed for Entertainment and Lifestyle",
        fr: "Un garaje diseñado para el entretenimiento y el estilo de vida"
      },
      type: { en: "Entertainment / Bar", fr: "Entretenimiento / Bar" },
      size: { en: "2–3 car garage", fr: "Garaje para 2–3 coches" },
      duration: { en: "8 weeks", fr: "8 semanas" },
      service: { en: "Full Transformation", fr: "Transformación Completa" },
      year: "2025",
      featured: true,
      large: true,
      description: {
        en: "A complete transformation that turns your garage into a social, functional, and high-impact living space. Turn your garage into the centerpiece of your home — built for entertaining, relaxing, and everyday enjoyment. A modern, time- and cost-saving alternative to traditional home additions — a value-packed solution that outshines conventional builds.",
        fr: "Una transformación completa que convierte tu garaje en un espacio social, funcional y de gran impacto. Convierte tu garaje en el corazón de tu casa — pensado para recibir, relajarse y disfrutar a diario. Una alternativa moderna que ahorra tiempo y dinero frente a una ampliación tradicional — una solución de gran valor que supera las ampliaciones convencionales."
      },
      includes: {
        en: ["Wet bar", "Custom cabinetry", "Built-in appliances", "Decorative wood wall panels", "Pool table"],
        fr: ["Bar con punto de agua", "Mobiliario a medida", "Electrodomésticos integrados", "Paneles de madera decorativos", "Mesa de billar"]
      },
      why: {
        en: ["Create a dedicated space for entertaining and relaxing", "Add comfort and functionality without expanding your home", "Increase your property value with a high-impact upgrade"],
        fr: ["Crea un espacio dedicado para recibir y relajarse", "Añade confort y funcionalidad sin ampliar tu casa", "Aumenta el valor de tu propiedad con una mejora de gran impacto"]
      },
      project_range: {
        en: "Depending on how far you want to go. Each garage is fully customized, and final pricing is based on your space, layout, and level of transformation.",
        fr: "Según hasta dónde quieras llegar. Cada garaje se personaliza por completo y el precio final depende de tu espacio, distribución y nivel de transformación."
      },
      closing_line: {
        en: "Start with a design — and turn your garage into a space built around your lifestyle.",
        fr: "Empieza por el diseño — y convierte tu garaje en un espacio diseñado en torno a tu estilo de vida."
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
      name: { en: "The Daily Living Garage", fr: "El Garaje del Día a Día" },
      tagline: {
        en: "A Multi-Functional Garage for Work, Fitness, and Relaxation",
        fr: "Un garaje multifuncional para el trabajo, el fitness y la relajación"
      },
      type: { en: "Multi-functional / Lifestyle", fr: "Multifuncional / Lifestyle" },
      size: { en: "2 car garage", fr: "Garaje para 2 coches" },
      duration: { en: "6 weeks", fr: "6 semanas" },
      service: { en: "Full Transformation", fr: "Transformación Completa" },
      year: "2025",
      featured: true,
      description: {
        en: "A complete transformation that turns your garage into a flexible, everyday living space designed to support your routine. A space designed to support your daily routine — from movement to focus to relaxation.",
        fr: "Una transformación completa que convierte tu garaje en un espacio de vida flexible y cotidiano, diseñado para acompañar tu rutina. Un espacio pensado para apoyar tu día a día — del movimiento a la concentración y la relajación."
      },
      includes: {
        en: ["Home fitness area (cardio equipment, floor space, mirror)", "Lounge zone (sofa, TV, relaxation area)", "Compact workspace or home office", "Coffee / utility corner with storage", "Integrated lighting and layout for daily use"],
        fr: ["Zona fitness (equipo de cardio, espacio libre, espejo)", "Lounge (sofá, TV, zona de descanso)", "Despacho compacto u home office", "Rincón de café / utilitario con almacenamiento", "Iluminación y distribución integradas para el uso diario"]
      },
      why: {
        en: ["Combine multiple functions in one optimized space", "Improve daily comfort without expanding your home", "Create a practical, organized environment for work and lifestyle", "Increase your property value with a smart transformation"],
        fr: ["Combina varias funciones en un espacio optimizado", "Mejora el confort diario sin ampliar tu casa", "Crea un entorno práctico y organizado para el trabajo y el lifestyle", "Aumenta el valor de tu propiedad con una transformación inteligente"]
      },
      project_range: {
        en: "Depending on how far you want to go. Each garage is fully customized, and final pricing is based on your space, layout, and level of transformation.",
        fr: "Según hasta dónde quieras llegar. Cada garaje se personaliza por completo y el precio final depende de tu espacio, distribución y nivel de transformación."
      },
      closing_line: {
        en: "Start with a design — and turn your garage into a space that truly supports your everyday life.",
        fr: "Empieza por el diseño — y convierte tu garaje en un espacio que realmente acompañe tu día a día."
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
      tagline: {
        en: "A Garage Designed for Daily Living",
        fr: "Un garaje diseñado para el día a día"
      },
      type: { en: "Sports bar / Lifestyle", fr: "Bar deportivo / Lifestyle" },
      size: { en: "2 car garage", fr: "Garaje para 2 coches" },
      duration: { en: "5 weeks", fr: "5 semanas" },
      service: { en: "Full Transformation", fr: "Transformación Completa" },
      year: "2025",
      featured: true,
      description: {
        en: "A complete transformation that turns your garage into a functional, comfortable extension of your home. A space that combines utility, comfort, and style — designed to simplify your daily life and elevate your home.",
        fr: "Una transformación completa que convierte tu garaje en una extensión funcional y cómoda de tu hogar. Un espacio que combina utilidad, confort y estilo, diseñado para simplificar tu día a día y realzar tu hogar."
      },
      includes: {
        en: ["Integrated laundry and utility area", "Comfortable lounge space (TV, relaxation, daily use)", "Smart storage solutions to keep everything organized", "A clean, functional environment ready for everyday living"],
        fr: ["Zona de lavandería y utilitarios integrada", "Espacio lounge cómodo (TV, relajación, uso diario)", "Soluciones de almacenamiento inteligentes para mantener todo organizado", "Un entorno limpio y funcional listo para la vida cotidiana"]
      },
      why: {
        en: ["Free up space in the rest of your home", "Simplify your daily routines and reduce clutter", "Improve comfort while increasing your property value"],
        fr: ["Libera espacio en el resto de tu casa", "Simplifica tu rutina diaria y reduce el desorden", "Mejora el confort y aumenta el valor de tu propiedad"]
      },
      project_range: {
        en: "Depending on how far you want to go. Each garage is fully customized, and final pricing is based on your space, layout, and level of transformation.",
        fr: "Según hasta dónde quieras llegar. Cada garaje se personaliza por completo y el precio final depende de tu espacio, distribución y nivel de transformación."
      },
      closing_line: {
        en: "Start with a design — and turn your garage into a space that truly works for your life.",
        fr: "Empieza por el diseño — y convierte tu garaje en un espacio que realmente funcione para tu vida."
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
      name: { en: "The Hybrid Lifestyle Garage", fr: "El Garaje Híbrido Lifestyle" },
      tagline: {
        en: "A Garage Designed for Cars, Work & Entertainment",
        fr: "Un garaje diseñado para coches, trabajo y entretenimiento"
      },
      type: { en: "Hybrid lifestyle / Multi-use", fr: "Estilo de vida híbrido / Multi-uso" },
      size: { en: "3 car garage", fr: "Garaje para 3 coches" },
      duration: { en: "7 weeks", fr: "7 semanas" },
      service: { en: "Full Transformation", fr: "Transformación Completa" },
      year: "2025",
      featured: true,
      description: {
        en: "Transform your garage into the ultimate hybrid lifestyle space — designed for the way you live. This complete transformation blends premium vehicle display, a productive workspace, entertainment, and comfort into one beautifully designed, fully integrated environment. A garage designed to showcase your passion, support your productivity, and elevate your everyday living.",
        fr: "Convierte tu garaje en el espacio de estilo de vida híbrido definitivo — diseñado para tu forma de vivir. Esta transformación completa combina una exposición premium del vehículo, un espacio de trabajo productivo, entretenimiento y confort en un único entorno bellamente diseñado y totalmente integrado. Un garaje pensado para mostrar tu pasión, apoyar tu productividad y elevar tu día a día."
      },
      includes: {
        en: ["Premium vehicle display area", "Lounge zone with sofa and oversized screen", "Modern workspace or gaming setup", "Beverage / coffee corner with storage", "Integrated lighting and upscale finishes", "Functional layout designed for everyday use"],
        fr: ["Zona de exposición premium del vehículo", "Espacio lounge con sofá y pantalla de gran tamaño", "Espacio de trabajo moderno o setup de gaming", "Rincón de café / bebidas con almacenamiento", "Iluminación integrada y acabados de alta gama", "Distribución funcional pensada para el uso diario"]
      },
      why: {
        en: ["Turn underused garage space into a lifestyle destination", "Combine cars, work, entertainment, and relaxation in one environment", "Create a clean, organized, high-end atmosphere", "Increase comfort, functionality, and property appeal", "Enjoy a garage designed to impress and be lived in"],
        fr: ["Convierte un espacio de garaje infrautilizado en un destino de estilo de vida", "Combina coches, trabajo, entretenimiento y relajación en un único entorno", "Crea una atmósfera limpia, organizada y de alta gama", "Aumenta el confort, la funcionalidad y el atractivo de tu propiedad", "Disfruta de un garaje diseñado para impresionar y para vivirlo"]
      },
      project_range: {
        en: "Typical Project Range (3-Car Garage). Depending on how far you want to go. Each garage is fully customized. Final pricing is based on your space, layout, and level of transformation (finishes, technology integration, and level of customization).",
        fr: "Rango típico del proyecto (garaje para 3 coches). Según hasta dónde quieras llegar. Cada garaje se personaliza por completo. El precio final depende de tu espacio, distribución y nivel de transformación (acabados, integración tecnológica y nivel de personalización)."
      },
      closing_line: {
        en: "Start with a design — and transform your garage into a space built for cars, work, and entertainment.",
        fr: "Empieza por el diseño — y transforma tu garaje en un espacio pensado para coches, trabajo y entretenimiento."
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
    eyebrow: { en: "Get in touch", fr: "Contacto" },
    title: { en: "Let's design your garage.", fr: "Diseñemos tu garaje." },
    sub: {
      en: "Tell us about your space and your vision. We'll come back to you within 48 hours with a free estimate and clear next steps.",
      fr: "Cuéntanos sobre tu espacio y tu visión. Te responderemos en 48 h con un presupuesto gratuito y los próximos pasos claros."
    },
    info_title: { en: "Direct line", fr: "Contacto directo" },
    address: {
      en: "Orlando, FL · on-site visits across the Orlando area",
      fr: "Orlando, FL · visitas in situ en toda la zona de Orlando"
    },
    main_email: "garagealacarte@gmail.com",
    main_phone: "+1 (917) 353-4950",
    form: {
      name: { en: "Your name", fr: "Tu nombre" },
      email: { en: "Email", fr: "Email" },
      phone: { en: "Phone (optional)", fr: "Teléfono (opcional)" },
      service: { en: "Service interested in", fr: "Servicio de interés" },
      message: { en: "Tell us about your project", fr: "Cuéntanos sobre tu proyecto" },
      submit: { en: "Send my request", fr: "Enviar mi solicitud" },
      consent: {
        en: "I have read and agreed to the",
        fr: "He leído y acepto las"
      },
      consent_link: { en: "project conditions", fr: "condiciones del proyecto" }
    }
  },

  popup: {
    title: { en: "Before you go —", fr: "Antes de irte —" },
    sub: {
      en: "Get our free guide: 5 mistakes to avoid before transforming your garage.",
      fr: "Recibe nuestra guía gratuita: 5 errores que evitar antes de transformar tu garaje."
    },
    placeholder: { en: "Your email", fr: "Tu email" },
    cta: { en: "Send me the guide", fr: "Enviarme la guía" },
    decline: { en: "No thanks", fr: "No, gracias" },
    success: { en: "Thanks — check your inbox.", fr: "Gracias — revisa tu bandeja de entrada." }
  }
};
