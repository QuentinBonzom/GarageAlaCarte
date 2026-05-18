-- Garage à la Carte seed data
-- Run after database/schema.sql.

insert into public.site_settings (key, value, description)
values
  ('brand', jsonb_build_object(
    'name', 'Garage à la Carte',
    'tagline', jsonb_build_object(
      'en', 'American precision, European design.',
      'fr', 'Précision américaine, design européen.'
    )
  ), 'Brand identity used by the header, footer, and metadata.'),
  ('default_locale', '"en"'::jsonb, 'Default public language.'),
  ('service_area', jsonb_build_object('city', 'Orlando', 'state', 'FL', 'radius_miles', 20), 'Default service area.'),
  ('theme', jsonb_build_object('accentColor', '#ff5e5b', 'density', 1, 'cardStyle', 'soft'), 'UI defaults for the React app.')
on conflict (key) do update
set value = excluded.value,
    description = excluded.description,
    updated_at = now();

insert into public.cms_sections (page_key, section_key, content, display_order, is_active)
values
  ('global', 'nav', jsonb_build_object(
    'en', jsonb_build_object('home', 'Home', 'projects', 'Projects', 'contact', 'Contact', 'admin', 'Admin'),
    'fr', jsonb_build_object('home', 'Accueil', 'projects', 'Réalisations', 'contact', 'Contact', 'admin', 'Admin')
  ), 10, true),
  ('home', 'hero', jsonb_build_object(
    'eyebrow', jsonb_build_object('en', 'Orlando, FL · Est. 2024', 'fr', 'Orlando, FL · Depuis 2024'),
    'title', jsonb_build_object(
      'en', jsonb_build_array('Transform your garage', 'into a space that', 'works for your life.'),
      'fr', jsonb_build_array('Transformez votre garage', 'en un espace pensé', 'pour votre vie.')
    ),
<<<<<<< Updated upstream
    'italic_word', jsonb_build_object('en', 'works', 'fr', 'pensé'),
=======
    'italic_word', jsonb_build_object('en', 'reimagined.', 'fr', 'réinventé.'),
    'tagline', jsonb_build_object(
      'en', 'Unlock the Full Potential of Your Garage',
      'fr', 'Révélez tout le potentiel de votre garage'
    ),
>>>>>>> Stashed changes
    'sub', jsonb_build_object(
      'en', 'Custom garage transformations for homeowners, real-estate professionals, and developers — from a clear plan to full execution.',
      'fr', 'Transformations de garage sur-mesure pour propriétaires, agents immobiliers et promoteurs — du plan détaillé à la réalisation complète.'
    ),
    'primary_cta', jsonb_build_object('en', 'Get my free estimate', 'fr', 'Obtenir mon devis gratuit'),
    'secondary_cta', jsonb_build_object('en', 'Schedule a call', 'fr', 'Planifier un appel')
  ), 20, true),
  ('home', 'hero_caption', jsonb_build_object(
    'label', jsonb_build_object('en', 'Featured project', 'fr', 'Projet phare'),
    'image', '',
    'video_url', '/hero-video.mp4',
    'featured_label', jsonb_build_object('en', 'FEATURED PROJECT', 'fr', 'PROJET PHARE'),
    'featured_title', jsonb_build_object('en', 'The Social Hub', 'fr', 'The Social Hub')
  ), 30, true),
  ('home', 'marquee_words', jsonb_build_object(
    'en', jsonb_build_array('Design', 'Prepare', 'Transform', 'à la carte'),
    'fr', jsonb_build_array('Concevoir', 'Préparer', 'Transformer', 'à la carte')
  ), 40, true),
  ('home', 'visual_strip', jsonb_build_object(
    'eyebrow', jsonb_build_object('en', 'From plan to reality', 'fr', 'Du plan à la réalité'),
    'title', jsonb_build_object('en', 'Designed in 3D. Built to live in.', 'fr', 'Conçu en 3D. Construit pour être habité.'),
    'sub', jsonb_build_object(
      'en', 'Aymeric drafts every layout in precise 3D. Juliette dresses each space in materials, light, and atmosphere — so you see your future garage before we touch a wall.',
      'fr', 'Aymeric dessine chaque plan en 3D précis. Juliette habille l''espace de matières, lumières et atmosphères — pour que vous voyiez votre futur garage avant qu''un mur ne bouge.'
    ),
    'plan_image', '',
    'mood_image', '',
    'interior_image', ''
  ), 50, true),
  ('home', 'before_after', jsonb_build_object(
    'eyebrow', jsonb_build_object('en', 'Section 02 · Story', 'fr', 'Section 02 · Le récit'),
    'title', jsonb_build_object('en', 'From cluttered space to designed living.', 'fr', 'D''un espace encombré à un lieu de vie pensé.'),
    'before', jsonb_build_object('en', 'Boxes, tools, wasted square footage. No clear purpose.', 'fr', 'Cartons, outils, mètres carrés perdus. Aucun usage clair.'),
    'after', jsonb_build_object('en', 'A clean, planned, functional garage designed around your lifestyle.', 'fr', 'Un garage propre, pensé, fonctionnel — conçu autour de votre vie.'),
    'statement', jsonb_build_object(
      'en', 'Experience American practicality and precision combined with European mood-visual design and advanced Color, Material & Finish (CMF) expertise for a stunning, functional space.',
      'fr', 'Découvrez la praticité et la précision américaines alliées au design visuel et à l''ambiance européens, ainsi qu''à une expertise avancée en Couleur, Matière & Finition (CMF), pour un espace fonctionnel et époustouflant.'
    )
  ), 60, true),
  ('home', 'services_intro', jsonb_build_object(
    'eyebrow', jsonb_build_object('en', 'Section 03 · Services', 'fr', 'Section 03 · Services'),
    'title', jsonb_build_object('en', 'Choose your level of support.', 'fr', 'Choisissez votre niveau d''accompagnement.'),
    'sub', jsonb_build_object('en', 'Avoid costly mistakes. Start with a plan — or go all the way. Upgrade anytime.', 'fr', 'Évitez les erreurs coûteuses. Commencez par un plan — ou allez jusqu''au bout. Évoluez à tout moment.')
  ), 70, true),
  ('home', 'why', jsonb_build_object(
    'eyebrow', jsonb_build_object('en', 'Section 04 · Why us', 'fr', 'Section 04 · Pourquoi nous'),
    'title', jsonb_build_object('en', 'Most companies offer one fixed solution. We don''t.', 'fr', 'La plupart proposent une seule solution. Pas nous.'),
    'sub', jsonb_build_object(
      'en', 'With Garage à la Carte, you choose how far you want to go — from design only to full transformation. Your space. Your pace. Your level of support.',
      'fr', 'Chez Garage à la Carte, vous choisissez votre niveau d''engagement — du plan seul à la transformation complète. Votre espace. Votre rythme. Votre niveau d''accompagnement.'
    ),
    'stats', jsonb_build_array(
      jsonb_build_object('num', 4, 'label', jsonb_build_object('en', 'à la carte services', 'fr', 'services à la carte')),
      jsonb_build_object('num', 20, 'suffix', 'mi', 'label', jsonb_build_object('en', 'Orlando service area', 'fr', 'rayon Orlando')),
      jsonb_build_object('num', 100, 'suffix', '%', 'label', jsonb_build_object('en', 'fee credited on contract', 'fr', 'honoraires crédités au contrat'))
    )
  ), 80, true),
  ('home', 'team_intro', jsonb_build_object(
    'eyebrow', jsonb_build_object('en', 'Section 05 · Who we are', 'fr', 'Section 05 · L''équipe'),
    'title', jsonb_build_object('en', 'Built by experts. Designed around you.', 'fr', 'Construit par des experts. Pensé autour de vous.'),
    'sub', jsonb_build_object('en', 'Garage à la Carte is a collaboration of specialists who turn ideas into real, functional spaces.', 'fr', 'Garage à la Carte est la rencontre de spécialistes qui transforment vos idées en espaces fonctionnels.')
  ), 90, true),
  ('home', 'audience', jsonb_build_object(
    'eyebrow', jsonb_build_object('en', 'Section 06 · Who we help', 'fr', 'Section 06 · Qui nous aidons'),
    'title', jsonb_build_object('en', 'Built for homes, properties, and real-estate value.', 'fr', 'Pensé pour les foyers, les biens, et la valeur immobilière.'),
    'homeowners_image', '/audience-homeowners.svg',
    'agents_image', '/audience-agents.svg',
    'developers_image', '/audience-developers.svg',
    'items', jsonb_build_array(
      jsonb_build_object('title', jsonb_build_object('en', 'Homeowners', 'fr', 'Propriétaires'), 'text', jsonb_build_object('en', 'Create a garage that fits your lifestyle and daily needs.', 'fr', 'Créez un garage qui correspond à votre vie et à vos usages.')),
      jsonb_build_object('title', jsonb_build_object('en', 'Real Estate Agents', 'fr', 'Agents immobiliers'), 'text', jsonb_build_object('en', 'Help buyers and sellers see the hidden potential of a garage.', 'fr', 'Aidez acheteurs et vendeurs à voir le potentiel caché d''un garage.')),
      jsonb_build_object('title', jsonb_build_object('en', 'Developers & Property Pros', 'fr', 'Promoteurs & Pros'), 'text', jsonb_build_object('en', 'Add functional, attractive value to residential properties.', 'fr', 'Ajoutez une valeur fonctionnelle et désirable à vos biens.'))
    )
  ), 100, true),
  ('home', 'process_intro', jsonb_build_object(
    'eyebrow', jsonb_build_object('en', 'Section 07 · Process', 'fr', 'Section 07 · Processus'),
    'title', jsonb_build_object('en', 'How it works.', 'fr', 'Comment ça marche.')
  ), 110, true),
  ('home', 'final_cta', jsonb_build_object(
    'title', jsonb_build_object('en', 'Ready to transform your garage?', 'fr', 'Prêt à transformer votre garage ?'),
    'sub', jsonb_build_object('en', 'Start with a free estimate and see what your garage could become.', 'fr', 'Commencez par un devis gratuit et découvrez ce que votre garage peut devenir.')
  ), 120, true),
<<<<<<< Updated upstream
=======
  ('home', 'use_cases', jsonb_build_object(
    'eyebrow', jsonb_build_object('en', 'Transformations', 'fr', 'Transformations'),
    'title', jsonb_build_object('en', 'Pick your room.', 'fr', 'Choisissez votre pièce.'),
    'sub', jsonb_build_object(
      'en', 'We specialize in garage remodeling, makeovers, and custom storage solutions for homeowners, real estate agencies, developers, builders, and property managers across Orlando and the surrounding areas.',
      'fr', 'Nous sommes spécialisés dans la rénovation de garages, les transformations et les solutions de rangement sur-mesure pour les propriétaires, les agences immobilières, les promoteurs, les constructeurs et les gestionnaires de biens à Orlando et ses environs.'
    ),
    'items', jsonb_build_array(
      jsonb_build_object(
        'image', '/usecase-gym.svg',
        'name', jsonb_build_object('en', 'Home Gym', 'fr', 'Salle de sport'),
        'tagline', jsonb_build_object('en', 'Train at home, every day.', 'fr', 'S''entraîner chez soi, tous les jours.'),
        'bullets', jsonb_build_object(
          'en', jsonb_build_array('Mirrored wall', 'Rubber flooring', 'Smart storage'),
          'fr', jsonb_build_array('Mur miroir', 'Sol caoutchouc', 'Rangements smart')
        )
      ),
      jsonb_build_object(
        'image', '/usecase-lounge.svg',
        'name', jsonb_build_object('en', 'Lounge & Bar', 'fr', 'Lounge & Bar'),
        'tagline', jsonb_build_object('en', 'The room you actually use on Fridays.', 'fr', 'La pièce que vous utilisez vraiment le vendredi.'),
        'bullets', jsonb_build_object(
          'en', jsonb_build_array('Wet bar', 'Custom cabinetry', 'Built-in screen'),
          'fr', jsonb_build_array('Bar avec point d''eau', 'Mobilier sur-mesure', 'Écran encastré')
        )
      ),
      jsonb_build_object(
        'image', '/usecase-office.svg',
        'name', jsonb_build_object('en', 'Home Office', 'fr', 'Bureau'),
        'tagline', jsonb_build_object('en', 'Quiet work, just outside the house.', 'fr', 'Travailler au calme, juste à côté.'),
        'bullets', jsonb_build_object(
          'en', jsonb_build_array('Soundproofing', 'Climate control', 'Built-in desk'),
          'fr', jsonb_build_array('Isolation phonique', 'Climatisation', 'Bureau intégré')
        )
      ),
      jsonb_build_object(
        'image', '/usecase-storage.svg',
        'name', jsonb_build_object('en', 'Smart Storage', 'fr', 'Rangement Smart'),
        'tagline', jsonb_build_object('en', 'Everything in its place, finally.', 'fr', 'Tout à sa place, enfin.'),
        'bullets', jsonb_build_object(
          'en', jsonb_build_array('Floor-to-ceiling cabinetry', 'EV charging', 'Sport gear racks'),
          'fr', jsonb_build_array('Rangements pleine hauteur', 'Recharge VE', 'Racks sport')
        )
      )
    )
  ), 123, true),
>>>>>>> Stashed changes
  ('projects', 'projects_page', jsonb_build_object(
    'eyebrow', jsonb_build_object('en', 'Selected work', 'fr', 'Sélection'),
    'title', jsonb_build_object('en', 'Our garages, redesigned.', 'fr', 'Nos garages, repensés.'),
    'sub', jsonb_build_object('en', 'Each space is a fully customised transformation. Click any project for the full story.', 'fr', 'Chaque espace est une transformation sur-mesure. Cliquez pour lire l''histoire complète.')
  ), 10, true),
  ('contact', 'contact_page', jsonb_build_object(
    'eyebrow', jsonb_build_object('en', 'Get in touch', 'fr', 'Contact'),
    'title', jsonb_build_object('en', 'Let''s design your garage.', 'fr', 'Imaginons votre garage.'),
    'sub', jsonb_build_object('en', 'Tell us about your space and your vision. We''ll come back to you within 48 hours with a free estimate and clear next steps.', 'fr', 'Parlez-nous de votre espace et de votre vision. Nous revenons vers vous sous 48h avec un devis gratuit et des étapes claires.'),
    'info_title', jsonb_build_object('en', 'Direct line', 'fr', 'Contact direct'),
    'form', jsonb_build_object(
      'name', jsonb_build_object('en', 'Your name', 'fr', 'Votre nom'),
      'email', jsonb_build_object('en', 'Email', 'fr', 'Email'),
      'phone', jsonb_build_object('en', 'Phone (optional)', 'fr', 'Téléphone (optionnel)'),
      'service', jsonb_build_object('en', 'Service interested in', 'fr', 'Service souhaité'),
      'message', jsonb_build_object('en', 'Tell us about your project', 'fr', 'Parlez-nous de votre projet'),
      'submit', jsonb_build_object('en', 'Send my request', 'fr', 'Envoyer ma demande'),
      'consent', jsonb_build_object('en', 'I have read and agree to the', 'fr', 'J''ai lu et j''accepte les'),
      'consent_link', jsonb_build_object('en', 'project conditions', 'fr', 'conditions du projet')
    )
  ), 10, true),
  ('global', 'popup', jsonb_build_object(
    'title', jsonb_build_object('en', 'Before you go —', 'fr', 'Avant de partir —'),
    'sub', jsonb_build_object('en', 'Get our free guide: 5 mistakes to avoid before transforming your garage.', 'fr', 'Recevez notre guide gratuit : 5 erreurs à éviter avant de transformer votre garage.'),
    'placeholder', jsonb_build_object('en', 'Your email', 'fr', 'Votre email'),
    'cta', jsonb_build_object('en', 'Send me the guide', 'fr', 'M''envoyer le guide'),
    'decline', jsonb_build_object('en', 'No thanks', 'fr', 'Non merci'),
    'success', jsonb_build_object('en', 'Thanks — check your inbox.', 'fr', 'Merci — surveillez votre boîte mail.')
  ), 20, true)
on conflict (section_key) do update
set page_key = excluded.page_key,
    content = excluded.content,
    display_order = excluded.display_order,
    is_active = excluded.is_active,
    updated_at = now();

insert into public.contact_channels (channel_key, channel_type, label, value, href, display_order, is_active)
values
  ('main_email', 'email', jsonb_build_object('en', 'Email', 'fr', 'Email'), 'hello@garagealacarte.com', 'mailto:hello@garagealacarte.com', 10, true),
  ('main_phone', 'phone', jsonb_build_object('en', 'Phone', 'fr', 'Téléphone'), '+1 (407) 555-0142', 'tel:+14075550142', 20, true),
  ('address', 'address', jsonb_build_object('en', 'Address', 'fr', 'Adresse'), 'Orlando, FL · service area within 20 miles', null, 30, true)
on conflict (channel_key) do update
set channel_type = excluded.channel_type,
    label = excluded.label,
    value = excluded.value,
    href = excluded.href,
    display_order = excluded.display_order,
    is_active = excluded.is_active,
    updated_at = now();

insert into public.team_members (slug, name, role, bio, email, phone, display_order, is_active)
values
  ('guillaume', 'Guillaume',
    jsonb_build_object('en', 'Field & Execution Lead', 'fr', 'Lead Terrain & Exécution'),
    jsonb_build_object('en', 'Based in Orlando, Guillaume brings real-world construction experience and ensures every project is grounded, feasible, and built right.', 'fr', 'Basé à Orlando, Guillaume apporte une expérience terrain solide et garantit que chaque projet est faisable, ancré, et bien exécuté.'),
    null, null, 10, true),
  ('aymeric', 'Aymeric',
    jsonb_build_object('en', 'Technical Design & Planning', 'fr', 'Design Technique & Plans'),
    jsonb_build_object('en', 'Specialised in European space efficiency, custom layouts, and 3D planning. Aymeric turns ideas into precise, build-ready designs.', 'fr', 'Spécialisé en efficacité spatiale européenne, plans sur-mesure et 3D. Aymeric transforme les idées en plans prêts à construire.'),
    'aymeric.vanelle@gmail.com', '+33 6 72 54 54 51', 20, true),
  ('juliette', 'Juliette',
    jsonb_build_object('en', 'Visual Design & Atmosphere', 'fr', 'Design Visuel & Atmosphère'),
    jsonb_build_object('en', 'Combines American precision with European creativity and space-saving design — turning ideas into immersive visuals so you see your future space before it''s built.', 'fr', 'Allie précision américaine et créativité européenne. Juliette crée des visuels immersifs pour que vous voyiez votre espace avant même qu''il existe.'),
    'juliette.bergougnoux@icloud.com', '+33 7 44 81 52 22', 30, true),
  ('nelly', 'Nelly',
    jsonb_build_object('en', 'Coordinator', 'fr', 'Coordinatrice'),
    jsonb_build_object('en', 'Nelly keeps every project on track — coordinating schedules, suppliers, and your peace of mind from kickoff to handover.', 'fr', 'Nelly garde chaque projet sur les rails — coordonne plannings, fournisseurs et votre tranquillité d''esprit, du lancement à la livraison.'),
    'loucie@icloud.com', null, 40, true)
on conflict (slug) do update
set name = excluded.name,
    role = excluded.role,
    bio = excluded.bio,
    email = excluded.email,
    phone = excluded.phone,
    display_order = excluded.display_order,
    is_active = excluded.is_active,
    updated_at = now();

-- Only the 4 canonical services should exist on the homepage
delete from public.services
where slug not in ('blueprint', 'delivery', 'transform', 'smart');

insert into public.services (
  slug, service_number, title, subtitle, description, price_label, badge_label,
  tag_label, includes, not_included, deposit_schedule, onsite_label, detail_sections, display_order, is_active
)
values
  ('blueprint', '01',
    jsonb_build_object('en', 'Design Blueprint', 'fr', 'Design Blueprint'),
    jsonb_build_object('en', 'Plan it right. Build it your way.', 'fr', 'Planifiez bien. Construisez à votre façon.'),
    jsonb_build_object('en', 'You want to plan your garage with confidence before making decisions. See your future garage before you build anything — with a custom layout, two realistic views, and expert guidance to avoid costly mistakes. Most clients start here, then move forward once they see their design.', 'fr', 'Vous voulez planifier votre garage en toute confiance avant de décider. Visualisez votre futur garage avant de construire — avec un agencement sur-mesure, deux vues réalistes et des conseils experts pour éviter les erreurs coûteuses. La plupart de nos clients commencent ici, puis poursuivent une fois leur design validé.'),
    jsonb_build_object('en', 'starts at $950', 'fr', 'à partir de 950 $'),
    null,
    jsonb_build_object('en', 'Ideal for getting started', 'fr', 'Idéal pour démarrer'),
    jsonb_build_object('en', jsonb_build_array('1 optimized layout', '2 realistic views', '1 round of minor adjustments', 'Expert design guidance'), 'fr', jsonb_build_array('1 agencement optimisé', '2 vues réalistes', '1 série d''ajustements mineurs', 'Conseil expert')),
    jsonb_build_object('en', 'No product purchasing, no delivery, no installation.', 'fr', 'Pas d''achat de produits, pas de livraison, pas d''installation.'),
    null,
    jsonb_build_object('en', 'Design Blueprint + On-Site Assessment starts at $1,350', 'fr', 'Design Blueprint + évaluation sur site à partir de 1 350 $'),
    $$[
      {"title":{"en":"Choose your level","fr":"Choisissez votre niveau"},"items":{"en":["Design Blueprint (Remote) starts at $950","Design Blueprint + On-Site Assessment starts at $1,350"],"fr":["Design Blueprint à distance à partir de 950 $","Design Blueprint + évaluation sur site à partir de 1 350 $"]}},
      {"title":{"en":"How it works","fr":"Comment ça marche"},"items":{"en":["Free consultation to define your project","Fixed price, no surprises","Delivered digitally","Every detail is captured remotely or on-site when needed"],"fr":["Consultation gratuite pour définir le projet","Prix fixe, sans surprise","Livraison digitale","Chaque détail est relevé à distance ou sur site si nécessaire"]}},
      {"title":{"en":"Revisions","fr":"Révisions"},"body":{"en":"Requests for extra views, major changes, or a new direction after approval are quoted separately.","fr":"Les vues supplémentaires, changements majeurs ou nouvelles directions après validation sont chiffrés séparément."}},
      {"title":{"en":"Continue your project","fr":"Poursuivre votre projet"},"body":{"en":"Move forward anytime with setup support or a full transformation once your design is validated.","fr":"Vous pouvez poursuivre à tout moment avec l'accompagnement setup ou une transformation complète une fois le design validé."}},
      {"title":{"en":"Delivery area","fr":"Zone de service"},"body":{"en":"On-site visits are available throughout the Orlando area. Visits beyond our standard zone are quoted based on location.","fr":"Les visites sur site sont disponibles dans la région d'Orlando. Au-delà de la zone standard, elles sont chiffrées selon la localisation."}}
    ]$$::jsonb,
    10, true),
  ('delivery', '02',
    jsonb_build_object('en', 'Design & Setup', 'fr', 'Design & Setup'),
    jsonb_build_object('en', 'Plan it right. Prepare it with confidence.', 'fr', 'Planifiez bien. Préparez avec confiance.'),
    jsonb_build_object('en', 'You want more than a design — you want the right products, materials, and a clear setup plan. Move from vision to execution without the sourcing headache. Most clients move forward with full transformation once everything is planned and ready.', 'fr', 'Vous voulez plus qu''un design — vous voulez les bons produits, les bons matériaux et un plan de mise en place clair. Passez de la vision à l''exécution sans la charge du sourcing. La plupart de nos clients enchaînent vers la transformation complète une fois tout planifié et prêt.'),
    jsonb_build_object('en', 'starts at $1,500', 'fr', 'à partir de 1 500 $'),
    jsonb_build_object('en', 'Most popular', 'fr', 'Le plus choisi'), null,
    jsonb_build_object('en', jsonb_build_array('1 optimized layout', '2 realistic views', 'Product selection guidance', 'Sourcing coordination', 'Setup planning for installation', '1 round of minor adjustments'), 'fr', jsonb_build_array('1 agencement optimisé', '2 vues réalistes', 'Sélection des produits', 'Coordination du sourcing', 'Planification de l''installation', '1 série d''ajustements mineurs')),
    jsonb_build_object('en', 'No final installation or contractor labor unless upgraded to Full Transformation.', 'fr', 'Pas d''installation finale ni de main-d''oeuvre entrepreneur sauf évolution vers Transformation Complète.'),
    jsonb_build_object('en', '50% / 25% / 25%', 'fr', '50 % / 25 % / 25 %'),
    null,
    $$[
      {"title":{"en":"Service fee credit","fr":"Crédit des honoraires"},"body":{"en":"The service fee is fully credited when you move forward with a signed project contract.","fr":"Les honoraires sont entièrement crédités si vous poursuivez avec un contrat de projet signé."}},
      {"title":{"en":"How it works","fr":"Comment ça marche"},"items":{"en":["Free consultation to define your project","Clear scope before commitment","Fixed starting price; final pricing depends on size, complexity, and sourcing needs","Delivered digitally with setup guidance"],"fr":["Consultation gratuite pour définir votre projet","Périmètre clair avant engagement","Prix de départ fixe ; le prix final dépend de la taille, de la complexité et des besoins de sourcing","Livraison digitale avec guide de setup"]}},
      {"title":{"en":"Deposit structure","fr":"Structure de paiement"},"items":{"en":["50% to secure your project and begin design","25% after design validation during materials and sourcing","25% upon completion and final walkthrough"],"fr":["50 % pour sécuriser le projet et démarrer le design","25 % après validation du design, pendant la phase matériaux et sourcing","25 % à la fin, lors de la visite finale"]}},
      {"title":{"en":"Use of designs","fr":"Utilisation des designs"},"body":{"en":"Plans and visual designs remain the property of Garage à la Carte and are provided for your personal project use only. If you build independently or work with another contractor, a separate usage or release agreement may be required.","fr":"Les plans et visuels restent la propriété de Garage à la Carte et sont fournis uniquement pour votre projet personnel. Si vous construisez seul ou avec un autre entrepreneur, un accord d'utilisation ou de cession peut être requis."}},
      {"title":{"en":"Continue your project","fr":"Poursuivre votre projet"},"body":{"en":"Move forward anytime with full transformation. Everything is planned, selected, and ready for execution.","fr":"Vous pouvez passer à la transformation complète à tout moment. Tout est planifié, sélectionné et prêt pour l'exécution."}},
      {"title":{"en":"Delivery area","fr":"Zone de service"},"body":{"en":"Delivery and setup coordination are included within 20 miles of Orlando. Extended zones are available with a mileage fee, and statewide projects may be available upon request.","fr":"La coordination livraison et setup est incluse dans un rayon de 20 miles autour d'Orlando. Les zones étendues sont possibles avec frais kilométriques, et certains projets dans tout l'État peuvent être étudiés sur demande."}}
    ]$$::jsonb,
    20, true),
  ('transform', '03',
    jsonb_build_object('en', 'Full Transformation', 'fr', 'Transformation Complète'),
    jsonb_build_object('en', 'From concept to completion — we handle everything.', 'fr', 'Du concept à la livraison — nous gérons tout.'),
    jsonb_build_object('en', 'You want a complete, worry-free transformation — fully designed, fully managed, fully delivered. A turnkey solution where we design, plan, and coordinate your full garage transformation. Most clients enhance it with integrated upgrades — lighting, electrical, climate control, and smart features designed to work seamlessly together.', 'fr', 'Vous voulez une transformation complète et sans souci — entièrement conçue, gérée et livrée. Une solution clé en main : nous concevons, planifions et coordonnons votre transformation. La plupart de nos clients la complètent avec des intégrations — éclairage, électricité, climatisation et smart features pensés pour fonctionner ensemble.'),
    jsonb_build_object('en', 'starts at $2,750', 'fr', 'à partir de 2 750 $'),
    jsonb_build_object('en', 'Premium Experience', 'fr', 'Expérience premium'), null,
    jsonb_build_object('en', jsonb_build_array('Custom optimized layout', '3D design with 4-6 realistic views', 'Full space planning', 'Complete material & equipment selection', 'Sourcing and logistics coordination', 'Project management and execution oversight', 'Final walkthrough'), 'fr', jsonb_build_array('Agencement optimisé sur-mesure', 'Design 3D avec 4 à 6 vues réalistes', 'Planification complète de l''espace', 'Sélection complète matériaux & équipements', 'Coordination sourcing & logistique', 'Gestion de projet et suivi d''exécution', 'Visite finale')),
    null,
    jsonb_build_object('en', '50% / 25% / 25%', 'fr', '50 % / 25 % / 25 %'),
    null,
    $$[
      {"title":{"en":"Service fee credit","fr":"Crédit des honoraires"},"body":{"en":"The service fee is fully credited when you move forward with a signed project contract.","fr":"Les honoraires sont entièrement crédités si vous poursuivez avec un contrat de projet signé."}},
      {"title":{"en":"How it works","fr":"Comment ça marche"},"items":{"en":["Dedicated consultation to define your vision","Clear scope, budget, and timeline","Structured phases from design to completion","One expert guiding your project throughout"],"fr":["Consultation dédiée pour définir votre vision","Périmètre, budget et calendrier clairs","Phases structurées du design à la livraison","Un expert qui guide votre projet tout au long du processus"]}},
      {"title":{"en":"Deposit structure","fr":"Structure de paiement"},"items":{"en":["50% to secure your project and begin design","25% after design validation during materials and sourcing","25% upon completion and final walkthrough"],"fr":["50 % pour sécuriser le projet et démarrer le design","25 % après validation du design, pendant la phase matériaux et sourcing","25 % à la fin, lors de la visite finale"]}},
      {"title":{"en":"Project investment","fr":"Investissement projet"},"body":{"en":"Typical project investment depends on layout, finishes, and customization level. This investment elevates daily living and adds lasting value to your property.","fr":"L'investissement final dépend de l'agencement, des finitions et du niveau de personnalisation. Il améliore votre quotidien et ajoute une valeur durable à votre bien."}},
      {"title":{"en":"Use of designs","fr":"Utilisation des designs"},"body":{"en":"Plans and visual designs remain the property of Garage à la Carte and are provided for your personal project use only. If you build independently or work with another contractor, a separate usage or release agreement may be required.","fr":"Les plans et visuels restent la propriété de Garage à la Carte et sont fournis uniquement pour votre projet personnel. Si vous construisez seul ou avec un autre entrepreneur, un accord d'utilisation ou de cession peut être requis."}},
      {"title":{"en":"Continue your project","fr":"Poursuivre votre projet"},"body":{"en":"Upgrade your space with integrated systems such as plumbing, electrical, climate control, and smart features designed to work seamlessly together.","fr":"Améliorez votre espace avec des systèmes intégrés comme la plomberie, l'électricité, le contrôle climatique et les fonctions connectées, pensés pour fonctionner ensemble."}},
      {"title":{"en":"Delivery area","fr":"Zone de service"},"body":{"en":"Included within 20 miles of Orlando. Extended zones are available with a mileage fee, and statewide projects may be available upon request.","fr":"Inclus dans un rayon de 20 miles autour d'Orlando. Les zones étendues sont possibles avec frais kilométriques, et certains projets dans tout l'État peuvent être étudiés sur demande."}}
    ]$$::jsonb,
    30, true),
  ('smart', '04',
    jsonb_build_object('en', 'Smart Integration', 'fr', 'Smart Integration'),
    jsonb_build_object('en', 'Designed for daily performance — not just visual appeal.', 'fr', 'Pensé pour la performance au quotidien — pas seulement pour l''esthétique.'),
    jsonb_build_object('en', 'You want more than a beautiful space — you want a garage that works seamlessly every day. We integrate the systems that bring your space to life: technical planning for plumbing, electrical, HVAC, ventilation, media, smart features, and built-in systems — typically integrated within Design & Setup or Full Transformation.', 'fr', 'Vous voulez plus qu''un bel espace — vous voulez un garage qui fonctionne parfaitement au quotidien. Nous intégrons les systèmes qui donnent vie à votre espace : plomberie, électricité, HVAC, ventilation, média, smart features et systèmes intégrés — typiquement combinés avec Design & Setup ou Transformation Complète.'),
    jsonb_build_object('en', 'starts at $3,500', 'fr', 'à partir de 3 500 $'),
    null, jsonb_build_object('en', 'Add-on', 'fr', 'Add-on'),
    jsonb_build_object('en', jsonb_build_array('Technical integration aligned with your design', 'Planning of plumbing, electrical, HVAC, and ventilation', 'Built-in storage, media setup, and smart features', 'Coordination with qualified professionals', 'Technical layouts prepared for implementation'), 'fr', jsonb_build_array('Intégration technique alignée avec le design', 'Planification plomberie, électricité, HVAC et ventilation', 'Rangements intégrés, média et smart features', 'Coordination avec des professionnels qualifiés', 'Plans techniques prêts pour l''exécution')),
    null,
    jsonb_build_object('en', 'Included within your main project deposit structure.', 'fr', 'Inclus dans la structure d''acompte du projet principal.'),
    null,
    $$[
      {"title":{"en":"How it works","fr":"Comment ça marche"},"items":{"en":["Systems are planned during the design phase","Integration is coordinated before any work begins","All components are designed to function seamlessly together"],"fr":["Les systèmes sont planifiés pendant la phase design","L'intégration est coordonnée avant le démarrage des travaux","Tous les composants sont pensés pour fonctionner ensemble"]}},
      {"title":{"en":"Investment","fr":"Investissement"},"body":{"en":"Custom add-on based on your systems and integration needs. Typically included within Design & Setup or Full Transformation.","fr":"Add-on sur-mesure selon vos systèmes et besoins d'intégration. Généralement inclus dans Design & Setup ou Transformation Complète."},"items":{"en":["Can be added as a standalone upgrade if needed","Technical feasibility validated before implementation","Clear scope and system requirements defined upfront","Coordination planned prior to execution"],"fr":["Peut être ajouté comme upgrade autonome si nécessaire","Faisabilité technique validée avant mise en oeuvre","Périmètre et exigences systèmes définis à l'avance","Coordination prévue avant l'exécution"]}},
      {"title":{"en":"Service fee credit","fr":"Crédit des honoraires"},"body":{"en":"The service fee starts at $3,500 and is fully credited when you move forward with a signed project contract.","fr":"Les honoraires démarrent à 3 500 $ et sont entièrement crédités si vous poursuivez avec un contrat de projet signé."}},
      {"title":{"en":"Additional work","fr":"Travaux additionnels"},"body":{"en":"Any additional systems, upgrades, or scope changes are clearly defined and quoted separately.","fr":"Tout système supplémentaire, upgrade ou changement de périmètre est clairement défini et chiffré séparément."}},
      {"title":{"en":"Use of designs","fr":"Utilisation des plans"},"body":{"en":"Technical layouts and integration plans remain the property of Garage à la Carte and are provided for your personal project use only. If you work with another contractor, a separate usage or release agreement may be required.","fr":"Les plans techniques et plans d'intégration restent la propriété de Garage à la Carte et sont fournis uniquement pour votre projet personnel. Si vous travaillez avec un autre entrepreneur, un accord d'utilisation ou de cession peut être requis."}},
      {"title":{"en":"Permits & regulations","fr":"Permis & réglementation"},"body":{"en":"Some systems may require city or county permits depending on the scope. We guide you through requirements and coordinate with the appropriate professionals when needed.","fr":"Certains systèmes peuvent nécessiter des permis municipaux ou county selon le périmètre. Nous vous guidons sur les exigences et coordonnons avec les professionnels adaptés si nécessaire."}},
      {"title":{"en":"Delivery area","fr":"Zone de service"},"body":{"en":"Included within 20 miles of Orlando. Extended zones are available with a mileage fee, and statewide projects may be available upon request.","fr":"Inclus dans un rayon de 20 miles autour d'Orlando. Les zones étendues sont possibles avec frais kilométriques, et certains projets dans tout l'État peuvent être étudiés sur demande."}}
    ]$$::jsonb,
    40, true)
on conflict (slug) do update
set service_number = excluded.service_number,
    title = excluded.title,
    subtitle = excluded.subtitle,
    description = excluded.description,
    price_label = excluded.price_label,
    badge_label = excluded.badge_label,
    tag_label = excluded.tag_label,
    includes = excluded.includes,
    not_included = excluded.not_included,
    deposit_schedule = excluded.deposit_schedule,
    onsite_label = excluded.onsite_label,
    detail_sections = excluded.detail_sections,
    display_order = excluded.display_order,
    is_active = excluded.is_active,
    updated_at = now();

delete from public.service_team_members
where service_id in (select id from public.services where slug in ('blueprint', 'delivery', 'transform', 'smart'));

insert into public.service_team_members (service_id, team_member_id, display_order)
select s.id, t.id, x.display_order
from (
  values
    ('blueprint', 'aymeric', 10), ('blueprint', 'juliette', 20), ('blueprint', 'guillaume', 30),
    ('delivery', 'aymeric', 10), ('delivery', 'juliette', 20), ('delivery', 'guillaume', 30),
    ('transform', 'guillaume', 10), ('transform', 'aymeric', 20), ('transform', 'juliette', 30),
    ('smart', 'guillaume', 10), ('smart', 'aymeric', 20), ('smart', 'juliette', 30)
) as x(service_slug, team_slug, display_order)
join public.services s on s.slug = x.service_slug
join public.team_members t on t.slug = x.team_slug;

delete from public.process_steps
where step_number in (1, 2, 3, 4);

insert into public.process_steps (step_number, title, description, display_order, is_active)
values
  (1, jsonb_build_object('en', 'Tell us your vision', 'fr', 'Dites-nous votre vision'), jsonb_build_object('en', 'We learn about your garage, needs, style, and goals.', 'fr', 'On découvre votre garage, vos besoins, votre style.'), 10, true),
  (2, jsonb_build_object('en', 'Choose your level', 'fr', 'Choisissez votre formule'), jsonb_build_object('en', 'Design only, design + setup, full transformation, or smart integration.', 'fr', 'Plan seul, design + setup, transformation complète ou intégration smart.'), 20, true),
  (3, jsonb_build_object('en', 'Plan before spending', 'fr', 'Planifiez avant de dépenser'), jsonb_build_object('en', 'We define layout, visuals, materials, and execution steps.', 'fr', 'On définit plan, visuels, matériaux et étapes.'), 30, true),
  (4, jsonb_build_object('en', 'Bring it to life', 'fr', 'Donnez-lui vie'), jsonb_build_object('en', 'Build it yourself, request support, or let us manage everything.', 'fr', 'Construisez vous-même, demandez du support ou laissez-nous tout gérer.'), 40, true);

-- Keep only the three portfolio projects currently used on the website.
delete from public.projects
where slug not in ('the-social-hub', 'the-daily-living-garage', 'smart-living-garage');

insert into public.projects (
  slug, service_id, name, tagline, project_type, size_label, duration_label, year,
  description, includes, value_points, status, is_featured, is_large, display_order
)
values
  ('the-social-hub', (select id from public.services where slug = 'transform'),
    jsonb_build_object('en', 'The Social Hub', 'fr', 'Le Social Hub'),
    jsonb_build_object('en', 'Turn your garage into the centerpiece of your home.', 'fr', 'Transformez votre garage en pièce maîtresse de la maison.'),
    jsonb_build_object('en', 'Entertainment / Bar', 'fr', 'Divertissement / Bar'),
    jsonb_build_object('en', '2–3 car garage', 'fr', 'Garage 2–3 voitures'),
    jsonb_build_object('en', '8 weeks', 'fr', '8 semaines'),
    '2025',
    jsonb_build_object('en', 'A complete transformation that turns your garage into a social, functional, and high-impact living space — built for entertaining, relaxing, and everyday enjoyment.', 'fr', 'Une transformation complète qui transforme votre garage en lieu social, fonctionnel et marquant — pensé pour recevoir, se détendre et profiter au quotidien.'),
    jsonb_build_object('en', jsonb_build_array('Wet bar', 'Custom cabinetry', 'Built-in appliances', 'Decorative wood wall panels', 'Pool table'), 'fr', jsonb_build_array('Bar avec point d''eau', 'Mobilier sur-mesure', 'Appareils encastrés', 'Panneaux muraux bois décoratifs', 'Billard')),
    jsonb_build_object('en', jsonb_build_array('Dedicated space for entertaining and relaxing', 'Comfort and functionality without expanding your home', 'High-impact upgrade that increases property value', 'A modern alternative to a traditional home addition'), 'fr', jsonb_build_array('Un espace dédié à recevoir et se détendre', 'Confort et fonctionnalité sans agrandir la maison', 'Une plus-value forte sur votre bien', 'Une alternative moderne à une extension traditionnelle')),
    'live', true, true, 10),
  ('the-daily-living-garage', (select id from public.services where slug = 'transform'),
    jsonb_build_object('en', 'The Daily Living Garage', 'fr', 'Le Garage du Quotidien'),
    jsonb_build_object('en', 'A multi-functional garage for work, fitness, and relaxation.', 'fr', 'Un garage multi-fonctions pour travailler, bouger et se détendre.'),
    jsonb_build_object('en', 'Multi-functional / Lifestyle', 'fr', 'Multi-fonctions / Lifestyle'),
    jsonb_build_object('en', '2 car garage', 'fr', 'Garage 2 voitures'),
    jsonb_build_object('en', '6 weeks', 'fr', '6 semaines'),
    '2025',
    jsonb_build_object('en', 'A complete transformation that turns your garage into a flexible, everyday living space designed to support your routine — from movement to focus to relaxation.', 'fr', 'Une transformation complète qui fait du garage un espace de vie flexible, pensé pour accompagner votre routine — du mouvement à la concentration jusqu''à la détente.'),
    jsonb_build_object('en', jsonb_build_array('Home fitness area with cardio equipment, floor space, and mirror', 'Lounge zone with sofa, TV, and relaxation area', 'Compact workspace or home office', 'Coffee / utility corner with storage', 'Integrated lighting and layout for daily use'), 'fr', jsonb_build_array('Zone fitness avec cardio, espace au sol et miroir', 'Lounge avec canapé, TV et espace détente', 'Bureau compact ou home office', 'Coin café / utilitaire avec rangement', 'Éclairage et agencement intégrés pour le quotidien')),
    jsonb_build_object('en', jsonb_build_array('Combine multiple functions in one optimised space', 'Improve daily comfort without expanding your home', 'Create a practical, organised environment for work and lifestyle', 'Increase your property value with a smart transformation'), 'fr', jsonb_build_array('Plusieurs fonctions dans un espace optimisé', 'Confort au quotidien sans extension', 'Un environnement pratique et organisé pour le travail et le lifestyle', 'Une transformation intelligente qui valorise le bien')),
    'live', true, false, 20),
  ('smart-living-garage', (select id from public.services where slug = 'transform'),
    jsonb_build_object('en', 'Smart Living Garage', 'fr', 'Smart Living Garage'),
    jsonb_build_object('en', 'Utility, comfort, and style — designed for daily life.', 'fr', 'Utilité, confort, style — pensé pour le quotidien.'),
    jsonb_build_object('en', 'Daily living / Utility', 'fr', 'Vie quotidienne / Utilitaire'),
    jsonb_build_object('en', '2 car garage', 'fr', 'Garage 2 voitures'),
    jsonb_build_object('en', '5 weeks', 'fr', '5 semaines'),
    '2025',
    jsonb_build_object('en', 'A complete transformation that turns your garage into a functional, comfortable extension of your home — combining utility, comfort, and style.', 'fr', 'Une transformation complète qui fait du garage une extension fonctionnelle et confortable de la maison — entre utilité, confort et style.'),
    jsonb_build_object('en', jsonb_build_array('Integrated laundry and utility area', 'Comfortable lounge space with TV, relaxation, and daily use', 'Smart storage solutions to keep everything organized', 'Clean, functional environment ready for everyday living'), 'fr', jsonb_build_array('Zone buanderie et utilitaire intégrée', 'Lounge confortable avec TV, détente et usage quotidien', 'Rangements smart pour garder l''espace organisé', 'Environnement propre, fonctionnel et prêt à vivre')),
    jsonb_build_object('en', jsonb_build_array('Free up space in the rest of your home', 'Simplify your daily routines and reduce clutter', 'Improve comfort while increasing your property value'), 'fr', jsonb_build_array('Libérer de l''espace dans le reste de la maison', 'Simplifier les routines quotidiennes et réduire le désordre', 'Améliorer le confort tout en valorisant le bien')),
    'live', true, false, 30)
on conflict (slug) do update
set service_id = excluded.service_id,
    name = excluded.name,
    tagline = excluded.tagline,
    project_type = excluded.project_type,
    size_label = excluded.size_label,
    duration_label = excluded.duration_label,
    year = excluded.year,
    description = excluded.description,
    includes = excluded.includes,
    value_points = excluded.value_points,
    status = excluded.status,
    is_featured = excluded.is_featured,
    is_large = excluded.is_large,
    display_order = excluded.display_order,
    updated_at = now();

insert into public.project_images (project_id, label, placeholder_color, kind, display_order)
select p.id, x.label, x.placeholder_color, x.kind, x.display_order
from (
  values
    ('the-social-hub', 'Hero · Bar view', '#3a2c22', 'hero', 10),
    ('the-social-hub', 'Pool area', '#8b6f4e', 'gallery', 20),
    ('the-social-hub', 'Wood panel detail', '#5a4334', 'detail', 30),
    ('the-social-hub', 'Lounge', '#1f1812', 'gallery', 40),
    ('the-daily-living-garage', 'Lounge zone', '#c4a575', 'hero', 10),
    ('the-daily-living-garage', 'Fitness corner', '#3d322a', 'gallery', 20),
    ('the-daily-living-garage', 'Home office', '#7a6450', 'gallery', 30),
    ('smart-living-garage', 'Hero · open view', '#a89378', 'hero', 10),
    ('smart-living-garage', 'Laundry corner', '#4a3d33', 'gallery', 20),
    ('smart-living-garage', 'Lounge detail', '#d4bfa3', 'detail', 30)
) as x(project_slug, label, placeholder_color, kind, display_order)
join public.projects p on p.slug = x.project_slug
on conflict (project_id, display_order) do update
set label = excluded.label,
    placeholder_color = excluded.placeholder_color,
    kind = excluded.kind,
    updated_at = now();

insert into public.legal_documents (document_key, title, intro, is_active)
values (
  'project_conditions',
  jsonb_build_object('en', 'Website Project Details & Conditions.', 'fr', 'Conditions et engagements du projet.'),
  jsonb_build_object(
    'en', 'We set clear expectations from day one, plan carefully, and guide your project from idea to completion. By engaging with Garage à la Carte, you agree to these guidelines unless otherwise defined in a written agreement.',
    'fr', 'Nous fixons des attentes claires dès le départ et accompagnons votre projet de l''idée à la livraison. En vous engageant avec Garage à la Carte, vous acceptez ces conditions sauf accord écrit contraire.'
  ),
  true
)
on conflict (document_key) do update
set title = excluded.title,
    intro = excluded.intro,
    is_active = excluded.is_active,
    updated_at = now();

insert into public.legal_sections (document_id, section_number, title, body, display_order, is_active)
select d.id, x.section_number, x.title, x.body, x.display_order, true
from public.legal_documents d
join (
  values
    (1, jsonb_build_object('en', 'Free Estimate', 'fr', 'Devis Gratuit'), jsonb_build_object('en', 'We begin with a consultation to understand your space, your goals, and the level of service that best fits your project. Your estimate is an initial evaluation and may evolve based on final selections, site conditions, and project details. Estimates are typically valid for a limited period due to potential changes in material costs and availability.', 'fr', 'Nous commençons par une consultation pour comprendre votre espace, vos objectifs et le niveau de service adapté. Le devis est une évaluation initiale qui peut évoluer selon les choix finaux, conditions du site et détails du projet. Les devis sont valables pour une durée limitée en raison de variations potentielles des coûts et de la disponibilité des matériaux.'), 10),
    (2, jsonb_build_object('en', 'Project Validation', 'fr', 'Validation du Projet'), jsonb_build_object('en', 'A project is considered ready once the following are clearly defined: selected service level, confirmed layout and design direction, estimated budget and main components. Once validated, we move into planning and execution.', 'fr', 'Un projet est prêt lorsque les éléments suivants sont définis : niveau de service choisi, plan et direction de design confirmés, budget estimatif et composants principaux. Une fois validé, nous passons à la planification et à l''exécution.'), 20),
    (3, jsonb_build_object('en', 'Scope of Work & Service Levels', 'fr', 'Périmètre & Niveaux de Service'), jsonb_build_object('en', 'Each service includes only what is clearly defined within the selected level: Design Blueprint, Design + Setup, Full Transformation, or Smart Integration. Any request outside the selected service is handled as a project adjustment.', 'fr', 'Chaque service inclut uniquement ce qui est clairement défini : Design Blueprint, Design + Setup, Transformation Complète ou Smart Integration. Toute demande hors périmètre est traitée comme un ajustement.'), 30),
    (4, jsonb_build_object('en', 'Design Visuals & Approval', 'fr', 'Visuels & Approbation'), jsonb_build_object('en', 'Our 3D visuals represent the overall design intent, layout, and atmosphere. Small variations may occur in the final result due to materials, lighting, or product availability. Before moving forward, you review and approve your design.', 'fr', 'Nos visuels 3D représentent l''intention de design, le plan et l''atmosphère. De petites variations peuvent survenir selon les matériaux, l''éclairage ou la disponibilité. Avant de continuer, vous validez votre design.'), 40),
    (5, jsonb_build_object('en', 'Client Responsibilities', 'fr', 'Responsabilités du Client'), jsonb_build_object('en', 'You agree to provide accurate information about your space and needs, review and approve designs in a timely manner, ensure access to the property, and obtain any required approvals. The garage must be prepared before delivery.', 'fr', 'Vous vous engagez à fournir des informations précises, valider les designs rapidement, assurer l''accès à la propriété et obtenir les autorisations nécessaires. Le garage doit être préparé avant la livraison.'), 50),
    (6, jsonb_build_object('en', 'Site Documentation', 'fr', 'Documentation du Site'), jsonb_build_object('en', 'We may take photos or short videos during on-site visits for internal use only. They are never used for marketing without your prior approval.', 'fr', 'Nous pouvons prendre des photos ou vidéos lors des visites pour usage interne uniquement. Elles ne sont jamais utilisées en marketing sans votre accord.'), 60),
    (7, jsonb_build_object('en', 'Permits & Licensed Trades', 'fr', 'Permis & Pros Agréés'), jsonb_build_object('en', 'Some projects may require permits depending on the scope and local regulations. The client is responsible unless otherwise included. We coordinate with qualified, licensed professionals when required.', 'fr', 'Certains projets peuvent nécessiter des permis selon le périmètre et la réglementation locale. Le client en est responsable sauf indication contraire. Nous coordonnons avec des professionnels agréés.'), 70),
    (8, jsonb_build_object('en', 'Timeline & Payment', 'fr', 'Délais & Paiement'), jsonb_build_object('en', 'Timelines are estimated and may be influenced by material availability, supplier delays, weather, permits, and site readiness. A deposit is required to secure your project. No work begins without confirmed payment.', 'fr', 'Les délais sont estimatifs et peuvent dépendre de la disponibilité des matériaux, fournisseurs, météo, permis et préparation du site. Un acompte est requis pour sécuriser le projet. Aucun travail ne démarre sans paiement confirmé.'), 80),
    (9, jsonb_build_object('en', 'Adjustments & Cancellation', 'fr', 'Ajustements & Annulation'), jsonb_build_object('en', 'Any change after approval is a project adjustment and may impact pricing and timeline. Custom work and orders may not be canceled once initiated; work completed up to cancellation remains payable.', 'fr', 'Tout changement après validation est un ajustement et peut impacter prix et délais. Les travaux et commandes personnalisés ne peuvent pas être annulés une fois lancés ; le travail réalisé reste dû.'), 90),
    (10, jsonb_build_object('en', 'Warranty & Portfolio Use', 'fr', 'Garantie & Portfolio'), jsonb_build_object('en', 'Manufacturer warranties apply to products. Installation warranty applies when installation is handled by our team or partners. We may use project photos for portfolio purposes unless you request otherwise in writing.', 'fr', 'Les garanties fabricant s''appliquent aux produits. La garantie d''installation s''applique quand celle-ci est gérée par notre équipe. Nous pouvons utiliser les photos pour notre portfolio sauf demande écrite contraire.'), 100),
    (11, jsonb_build_object('en', 'Delivery Area', 'fr', 'Zone de Service'), jsonb_build_object('en', 'Services are included within a standard local service area, typically within 20 miles of Orlando. Projects outside this area are available upon request and may include additional fees.', 'fr', 'Les services sont inclus dans une zone standard, généralement 20 miles autour d''Orlando. Les projets hors zone sont possibles sur demande, avec frais supplémentaires.'), 110)
) as x(section_number, title, body, display_order) on true
where d.document_key = 'project_conditions'
on conflict (document_id, section_number) do update
set title = excluded.title,
    body = excluded.body,
    display_order = excluded.display_order,
    is_active = excluded.is_active,
    updated_at = now();
