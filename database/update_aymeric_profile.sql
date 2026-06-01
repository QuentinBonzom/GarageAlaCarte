-- =====================================================================
-- Garage a la Carte — Update Aymeric profile only
-- =====================================================================
-- Updates only the public team profile for Aymeric.
-- Note: Spanish content is stored under the existing `fr` JSON key.
-- =====================================================================

begin;

alter table public.team_members
add column if not exists long_bio jsonb;

update public.team_members
set
  name = 'Aymeric Vanelle',
  role = coalesce(role, '{}'::jsonb) || jsonb_build_object(
    'en', '3D Space Planning & Technical Design Lead',
    'fr', 'Responsable de planificación espacial 3D y diseño técnico'
  ),
  bio = coalesce(bio, '{}'::jsonb) || jsonb_build_object(
    'en', 'Industrial designer specializing in 3D design and custom space planning, with a Paris-trained background in fine woodworking, industrial design, and applied arts.',
    'fr', 'Diseñador industrial especializado en diseño 3D y planificación de espacios a medida, con formación parisina en ebanistería fina, diseño industrial y artes aplicadas.'
  ),
  long_bio = coalesce(long_bio, '{}'::jsonb) || jsonb_build_object(
    'en', $$I am Aymeric Vanelle, an industrial designer specializing in 3D design and custom space planning. My background includes fine woodworking, industrial design, and applied arts, all earned in Paris, France.

My experience spans high-end cabinetry, luxury residential projects, the French film industry, and the creation of luxury presentation boxes for watchmaking and cigar brands.

This background has shaped my approach, combining technical precision, craftsmanship, and meticulous attention to detail.

At Garage a la Carte, I contribute expertise in technical design and space optimization, transforming ideas into functional and well-planned environments. By creating detailed 3D floor plans and applying thoughtful space planning, I ensure every project is practical, efficient, and tailored to the client's specific needs.

Working with Juliette and Guillaume, we design smart, functional, and personalized garages that enhance everyday living and integrate naturally into each family's lifestyle.$$,
    'fr', $$Soy Aymeric Vanelle, diseñador industrial especializado en diseño 3D y planificación de espacios a medida. Mi formación incluye ebanistería fina, diseño industrial y artes aplicadas, todo ello en París, Francia.

Mi experiencia abarca mobiliario de alta gama, proyectos residenciales de lujo, la industria cinematográfica francesa y la creación de cajas de presentación de lujo para marcas de relojería y cigarros.

Este recorrido ha dado forma a mi enfoque, combinando precisión técnica, artesanía y una atención minuciosa al detalle.

En Garage a la Carte, aporto experiencia en diseño técnico y optimización del espacio, transformando ideas en entornos funcionales y bien planificados. Mediante planos 3D detallados y una planificación espacial cuidada, me aseguro de que cada proyecto sea práctico, eficiente y adaptado a las necesidades específicas del cliente.

Junto a Juliette y Guillaume, diseñamos garajes inteligentes, funcionales y personalizados que mejoran la vida diaria y se integran de forma natural en el estilo de vida de cada familia.$$
  )
where slug = 'aymeric';

commit;
