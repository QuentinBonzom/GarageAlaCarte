-- =====================================================================
-- Garage a la Carte — Migration FR (français) → ES (espagnol)
-- =====================================================================
-- Ce script met à jour les valeurs espagnoles stockées sous la clé `fr`
-- dans les colonnes JSONB. Les valeurs `en` (anglais) et la structure des
-- autres champs sont préservées — y compris les éventuelles éditions Admin/CMS.
-- Exception volontaire : le profil public d'Aymeric est actualisé avec son
-- nom complet, son rôle, sa bio courte et sa bio longue EN/ES.
--
-- Exécution : à lancer une seule fois contre la base Supabase.
-- =====================================================================

begin;

-- ----------------------------------------------------------------------
-- Helper : merge profond entre deux JSONB (objets et arrays gérés).
-- La source écrase la cible feuille par feuille. Pour les arrays, le
-- merge est positionnel (index par index), ce qui fonctionne tant que
-- l'ordre des items n'a pas été modifié dans l'admin.
-- ----------------------------------------------------------------------
create or replace function pg_temp.jsonb_deep_merge(target jsonb, source jsonb)
returns jsonb
language plpgsql
immutable
as $func$
declare
  result jsonb;
  k text;
  v jsonb;
  i int;
begin
  if target is null then return source; end if;
  if source is null then return target; end if;

  if jsonb_typeof(target) <> jsonb_typeof(source) then
    return source;
  end if;

  if jsonb_typeof(target) = 'object' then
    result := target;
    for k, v in select key, value from jsonb_each(source) loop
      if jsonb_typeof(v) in ('object', 'array') and result ? k then
        result := jsonb_set(result, array[k], pg_temp.jsonb_deep_merge(result -> k, v));
      else
        result := jsonb_set(result, array[k], v, true);
      end if;
    end loop;
    return result;
  end if;

  if jsonb_typeof(target) = 'array' then
    result := target;
    for i in 0..jsonb_array_length(source) - 1 loop
      if i < jsonb_array_length(target) then
        result := jsonb_set(
          result,
          array[i::text],
          pg_temp.jsonb_deep_merge(result -> i, source -> i)
        );
      else
        result := result || jsonb_build_array(source -> i);
      end if;
    end loop;
    return result;
  end if;

  return source;
end;
$func$;

alter table public.team_members
add column if not exists long_bio jsonb;

-- =====================================================================
-- site_settings.brand.tagline.fr
-- =====================================================================
update public.site_settings
set value = pg_temp.jsonb_deep_merge(
  value,
  jsonb_build_object('tagline', jsonb_build_object('fr', 'Precisión americana, diseño europeo.'))
)
where key = 'brand';

-- =====================================================================
-- cms_sections.content (par section_key)
-- =====================================================================

-- nav
update public.cms_sections
set content = pg_temp.jsonb_deep_merge(content, jsonb_build_object(
  'fr', jsonb_build_object(
    'home', 'Inicio',
    'projects', 'Proyectos',
    'contact', 'Contacto',
    'admin', 'Admin'
  )
))
where section_key = 'nav';

-- hero
update public.cms_sections
set content = pg_temp.jsonb_deep_merge(content, jsonb_build_object(
  'eyebrow', jsonb_build_object('fr', 'Orlando, FL · Transformaciones de garaje a medida'),
  'title', jsonb_build_object('fr', jsonb_build_array('Tu garaje,', 'reinventado.')),
  'italic_word', jsonb_build_object('fr', 'reinventado.'),
  'tagline', jsonb_build_object('fr', 'Libera todo el potencial de tu garaje'),
  'sub', jsonb_build_object('fr', 'Transformaciones de garaje a medida en Orlando.'),
  'primary_cta', jsonb_build_object('fr', 'Obtener mi presupuesto gratuito'),
  'secondary_cta', jsonb_build_object('fr', 'Ver nuestros proyectos')
))
where section_key = 'hero';

-- hero_caption
update public.cms_sections
set content = pg_temp.jsonb_deep_merge(content, jsonb_build_object(
  'label', jsonb_build_object('fr', 'Proyecto destacado'),
  'featured_label', jsonb_build_object('fr', 'PROYECTO DESTACADO')
))
where section_key = 'hero_caption';

-- before_after
update public.cms_sections
set content = pg_temp.jsonb_deep_merge(content, jsonb_build_object(
  'eyebrow', jsonb_build_object('fr', 'La transformación'),
  'title', jsonb_build_object('fr', 'De un garaje desordenado al garaje de tus sueños. ¡Descubre la transformación!'),
  'before', jsonb_build_object('fr', 'Cajas, herramientas, metros cuadrados desperdiciados. Sin un propósito claro.'),
  'after', jsonb_build_object('fr', 'Un garaje limpio, planificado y funcional, diseñado en torno a tu estilo de vida.'),
  'statement', jsonb_build_object('fr', 'Descubre la practicidad y precisión americanas combinadas con el diseño visual y la atmósfera europeos, junto a una experiencia avanzada en Color, Material y Acabado (CMF), para un espacio funcional e impresionante.')
))
where section_key = 'before_after';

-- services_intro
update public.cms_sections
set content = pg_temp.jsonb_deep_merge(content, jsonb_build_object(
  'eyebrow', jsonb_build_object('fr', 'Tarifas'),
  'title', jsonb_build_object('fr', 'Descubre nuestros cuatro servicios estrella'),
  'sub', jsonb_build_object('fr', 'Empieza con un plan. Ve hasta el final. Mejora cuando quieras.')
))
where section_key = 'services_intro';

-- final_cta
update public.cms_sections
set content = pg_temp.jsonb_deep_merge(content, jsonb_build_object(
  'title', jsonb_build_object('fr', '¿Listo para reinventar tu garaje?'),
  'sub', jsonb_build_object('fr', 'Cuéntanos sobre tu espacio. Te enviaremos un presupuesto gratuito en 48 h.')
))
where section_key = 'final_cta';

-- use_cases
update public.cms_sections
set content = pg_temp.jsonb_deep_merge(content, jsonb_build_object(
  'eyebrow', jsonb_build_object('fr', 'Transformaciones'),
  'title', jsonb_build_object('fr', 'Descubre el garaje de tus sueños. ¡Explora, imagina e inspírate!'),
  'sub', jsonb_build_object('fr', 'Estamos especializados en la reforma de garajes, transformaciones y soluciones de almacenamiento a medida para propietarios, agencias inmobiliarias, promotores, constructores y administradores de fincas en Orlando y alrededores.'),
  'items', jsonb_build_array(
    jsonb_build_object(
      'name', jsonb_build_object('fr', 'Garaje del Día a Día'),
      'tagline', jsonb_build_object('fr', 'Multifuncional / Estilo de vida')
    ),
    jsonb_build_object(
      'name', jsonb_build_object('fr', 'The Social Hub — Smart Living Garage'),
      'tagline', jsonb_build_object('fr', 'Un garaje diseñado para el entretenimiento y el estilo de vida')
    ),
    jsonb_build_object(
      'name', jsonb_build_object('fr', 'El Garaje del Día a Día'),
      'tagline', jsonb_build_object('fr', 'Un garaje multifuncional para el trabajo, el fitness y la relajación')
    ),
    jsonb_build_object(
      'name', jsonb_build_object('fr', 'Lounge Automovilístico Moderno'),
      'tagline', jsonb_build_object('fr', 'Un garaje de alta gama para coches, trabajo, entretenimiento y estilo de vida')
    )
  )
))
where section_key = 'use_cases';

-- projects_page
update public.cms_sections
set content = pg_temp.jsonb_deep_merge(content, jsonb_build_object(
  'eyebrow', jsonb_build_object('fr', 'Selección'),
  'title', jsonb_build_object('fr', 'Nuestros garajes, repensados.'),
  'sub', jsonb_build_object('fr', 'Transformaciones a medida. Haz clic para conocer la historia completa.')
))
where section_key = 'projects_page';

-- contact_page
update public.cms_sections
set content = pg_temp.jsonb_deep_merge(content, jsonb_build_object(
  'eyebrow', jsonb_build_object('fr', 'Contacto'),
  'title', jsonb_build_object('fr', 'Diseñemos tu garaje.'),
  'sub', jsonb_build_object('fr', 'Cuéntanos sobre tu espacio y tu visión. Te responderemos en 48 h con un presupuesto gratuito y los próximos pasos claros.'),
  'info_title', jsonb_build_object('fr', 'Contacto directo'),
  'form', jsonb_build_object(
    'name', jsonb_build_object('fr', 'Tu nombre'),
    'email', jsonb_build_object('fr', 'Email'),
    'phone', jsonb_build_object('fr', 'Teléfono (opcional)'),
    'service', jsonb_build_object('fr', 'Servicio de interés'),
    'message', jsonb_build_object('fr', 'Cuéntanos sobre tu proyecto'),
    'submit', jsonb_build_object('fr', 'Enviar mi solicitud'),
    'consent', jsonb_build_object('fr', 'He leído y acepto las'),
    'consent_link', jsonb_build_object('fr', 'condiciones del proyecto')
  )
))
where section_key = 'contact_page';

-- popup
update public.cms_sections
set content = pg_temp.jsonb_deep_merge(content, jsonb_build_object(
  'title', jsonb_build_object('fr', 'Antes de irte —'),
  'sub', jsonb_build_object('fr', 'Recibe nuestra guía gratuita: 5 errores que evitar antes de transformar tu garaje.'),
  'placeholder', jsonb_build_object('fr', 'Tu email'),
  'cta', jsonb_build_object('fr', 'Enviarme la guía'),
  'decline', jsonb_build_object('fr', 'No, gracias'),
  'success', jsonb_build_object('fr', 'Gracias — revisa tu bandeja de entrada.')
))
where section_key = 'popup';

-- =====================================================================
-- contact_channels.label
-- =====================================================================
update public.contact_channels
set label = pg_temp.jsonb_deep_merge(label, jsonb_build_object('fr', 'Teléfono'))
where channel_key = 'main_phone';

update public.contact_channels
set label = pg_temp.jsonb_deep_merge(label, jsonb_build_object('fr', 'Dirección'))
where channel_key = 'address';

-- =====================================================================
-- team_members
-- =====================================================================
update public.team_members
set role = pg_temp.jsonb_deep_merge(role, jsonb_build_object('fr', 'Responsable de Transformación y Construcción de Garaje')),
    bio  = pg_temp.jsonb_deep_merge(bio,  jsonb_build_object('fr', 'Con sede en Orlando, Guillaume aporta una sólida experiencia en obra y garantiza que cada proyecto sea realista, viable y bien ejecutado.'))
where slug = 'guillaume';

update public.team_members
set name = 'Aymeric Vanelle',
    role = pg_temp.jsonb_deep_merge(role, jsonb_build_object(
      'en', '3D Space Planning & Technical Design Lead',
      'fr', 'Responsable de planificación espacial 3D y diseño técnico'
    )),
    bio  = pg_temp.jsonb_deep_merge(bio, jsonb_build_object(
      'en', 'Industrial designer specializing in 3D design and custom space planning, with a Paris-trained background in fine woodworking, industrial design, and applied arts.',
      'fr', 'Diseñador industrial especializado en diseño 3D y planificación de espacios a medida, con formación parisina en ebanistería fina, diseño industrial y artes aplicadas.'
    )),
    long_bio = pg_temp.jsonb_deep_merge(long_bio, jsonb_build_object(
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
    ))
where slug = 'aymeric';

update public.team_members
set role = pg_temp.jsonb_deep_merge(role, jsonb_build_object('fr', 'Responsable de Diseño Mood-Visual y Color, Material y Acabado (CMF) avanzado')),
    bio  = pg_temp.jsonb_deep_merge(bio,  jsonb_build_object('fr', 'Combina la precisión americana con la creatividad europea. Juliette crea imágenes inmersivas para que veas tu espacio antes incluso de que exista.'))
where slug = 'juliette';

update public.team_members
set role = pg_temp.jsonb_deep_merge(role, jsonb_build_object('fr', 'Responsable de Coordinación de Proyecto')),
    bio  = pg_temp.jsonb_deep_merge(bio,  jsonb_build_object('fr', 'Nelly mantiene cada proyecto en marcha — coordina agendas, proveedores y tu tranquilidad, desde el inicio hasta la entrega.'))
where slug = 'nelly';

-- =====================================================================
-- services
-- =====================================================================

-- blueprint
update public.services set
  title           = pg_temp.jsonb_deep_merge(title,           jsonb_build_object('fr', 'Design Blueprint')),
  subtitle        = pg_temp.jsonb_deep_merge(subtitle,        jsonb_build_object('fr', 'Planifica bien. Construye a tu manera.')),
  description     = pg_temp.jsonb_deep_merge(description,     jsonb_build_object('fr', 'Quieres planificar tu garaje con seguridad antes de tomar decisiones. Visualiza tu futuro garaje antes de construir nada — con una distribución a medida, dos vistas realistas y asesoramiento experto para evitar errores costosos. La mayoría de nuestros clientes empieza aquí y avanza una vez validado el diseño.')),
  price_label     = pg_temp.jsonb_deep_merge(price_label,     jsonb_build_object('fr', 'desde 950 $')),
  tag_label       = pg_temp.jsonb_deep_merge(tag_label,       jsonb_build_object('fr', 'Ideal para empezar')),
  includes        = pg_temp.jsonb_deep_merge(includes,        jsonb_build_object('fr', jsonb_build_array('1 distribución optimizada', '2 vistas realistas', '1 ronda de ajustes menores', 'Asesoramiento experto'))),
  not_included    = pg_temp.jsonb_deep_merge(not_included,    jsonb_build_object('fr', 'Sin compra de productos, sin entrega, sin instalación.')),
  onsite_label    = pg_temp.jsonb_deep_merge(onsite_label,    jsonb_build_object('fr', 'Design Blueprint + evaluación in situ desde 1 350 $')),
  detail_sections = pg_temp.jsonb_deep_merge(detail_sections, $$[
    {"title":{"fr":"Elige tu nivel"},"items":{"fr":["Design Blueprint a distancia desde 950 $","Design Blueprint + evaluación in situ desde 1 350 $"]}},
    {"title":{"fr":"Cómo funciona"},"items":{"fr":["Consulta gratuita para definir el proyecto","Precio fijo, sin sorpresas","Entrega digital","Cada detalle se captura a distancia o in situ si es necesario"]}},
    {"title":{"fr":"Revisiones"},"body":{"fr":"Las vistas adicionales, los cambios mayores o un nuevo enfoque tras la aprobación se presupuestan por separado."}},
    {"title":{"fr":"Continúa tu proyecto"},"body":{"fr":"Puedes continuar cuando quieras con el acompañamiento setup o una transformación completa una vez validado el diseño."}},
    {"title":{"fr":"Zona de servicio"},"body":{"fr":"Las visitas in situ están disponibles en toda la zona de Orlando. Más allá de la zona estándar, se presupuestan según la ubicación."}}
  ]$$::jsonb)
where slug = 'blueprint';

-- delivery
update public.services set
  title           = pg_temp.jsonb_deep_merge(title,           jsonb_build_object('fr', 'Design & Setup')),
  subtitle        = pg_temp.jsonb_deep_merge(subtitle,        jsonb_build_object('fr', 'Planifica bien. Prepáralo con confianza.')),
  description     = pg_temp.jsonb_deep_merge(description,     jsonb_build_object('fr', 'Quieres algo más que un diseño — quieres los productos adecuados, los materiales correctos y un plan claro de instalación. Pasa de la visión a la ejecución sin la carga del sourcing. La mayoría de nuestros clientes pasa a la transformación completa una vez todo está planificado y listo.')),
  price_label     = pg_temp.jsonb_deep_merge(price_label,     jsonb_build_object('fr', 'desde 1 500 $')),
  badge_label     = pg_temp.jsonb_deep_merge(badge_label,     jsonb_build_object('fr', 'El más elegido')),
  includes        = pg_temp.jsonb_deep_merge(includes,        jsonb_build_object('fr', jsonb_build_array('1 distribución optimizada', '2 vistas realistas', 'Selección de productos', 'Coordinación del sourcing', 'Planificación de la instalación', '1 ronda de ajustes menores'))),
  not_included    = pg_temp.jsonb_deep_merge(not_included,    jsonb_build_object('fr', 'Sin instalación final ni mano de obra del contratista, salvo al pasar a Transformación Completa.')),
  deposit_schedule= pg_temp.jsonb_deep_merge(deposit_schedule,jsonb_build_object('fr', '50 % / 25 % / 25 %')),
  detail_sections = pg_temp.jsonb_deep_merge(detail_sections, $$[
    {"title":{"fr":"Crédito de honorarios"},"body":{"fr":"Los honorarios se acreditan íntegramente si continúas con un contrato de proyecto firmado."}},
    {"title":{"fr":"Cómo funciona"},"items":{"fr":["Consulta gratuita para definir tu proyecto","Alcance claro antes del compromiso","Precio inicial fijo; el precio final depende del tamaño, la complejidad y las necesidades de sourcing","Entrega digital con guía de instalación"]}},
    {"title":{"fr":"Estructura de pago"},"items":{"fr":["50 % para asegurar el proyecto e iniciar el diseño","25 % tras la validación del diseño, durante la fase de materiales y sourcing","25 % al finalizar, en la visita final"]}},
    {"title":{"fr":"Uso de los diseños"},"body":{"fr":"Los planos y diseños visuales son propiedad de Garage a la Carte y se entregan exclusivamente para tu proyecto personal. Si construyes por tu cuenta o con otro contratista, puede requerirse un acuerdo de uso o cesión."}},
    {"title":{"fr":"Continúa tu proyecto"},"body":{"fr":"Puedes pasar a la transformación completa cuando quieras. Todo está planificado, seleccionado y listo para ejecutarse."}},
    {"title":{"fr":"Zona de servicio"},"body":{"fr":"La coordinación de entrega e instalación está incluida en un radio de 20 millas alrededor de Orlando. Las zonas ampliadas son posibles con gastos kilométricos, y ciertos proyectos en todo el estado pueden estudiarse bajo petición."}}
  ]$$::jsonb)
where slug = 'delivery';

-- transform
update public.services set
  title           = pg_temp.jsonb_deep_merge(title,           jsonb_build_object('fr', 'Transformación Completa')),
  subtitle        = pg_temp.jsonb_deep_merge(subtitle,        jsonb_build_object('fr', 'Del concepto a la entrega — nos encargamos de todo.')),
  description     = pg_temp.jsonb_deep_merge(description,     jsonb_build_object('fr', 'Quieres una transformación completa y sin preocupaciones — totalmente diseñada, gestionada y entregada. Una solución llave en mano: diseñamos, planificamos y coordinamos toda tu transformación. La mayoría de nuestros clientes la completa con integraciones — iluminación, electricidad, climatización y funciones inteligentes pensadas para funcionar en conjunto.')),
  price_label     = pg_temp.jsonb_deep_merge(price_label,     jsonb_build_object('fr', 'desde 2 750 $')),
  badge_label     = pg_temp.jsonb_deep_merge(badge_label,     jsonb_build_object('fr', 'Experiencia premium')),
  includes        = pg_temp.jsonb_deep_merge(includes,        jsonb_build_object('fr', jsonb_build_array('Distribución optimizada a medida', 'Diseño 3D con 4 a 6 vistas realistas', 'Planificación completa del espacio', 'Selección completa de materiales y equipamiento', 'Coordinación de sourcing y logística', 'Gestión del proyecto y supervisión de la ejecución', 'Visita final'))),
  deposit_schedule= pg_temp.jsonb_deep_merge(deposit_schedule,jsonb_build_object('fr', '50 % / 25 % / 25 %')),
  detail_sections = pg_temp.jsonb_deep_merge(detail_sections, $$[
    {"title":{"fr":"Crédito de honorarios"},"body":{"fr":"Los honorarios se acreditan íntegramente si continúas con un contrato de proyecto firmado."}},
    {"title":{"fr":"Cómo funciona"},"items":{"fr":["Consulta dedicada para definir tu visión","Alcance, presupuesto y plazos claros","Fases estructuradas del diseño a la entrega","Un experto que acompaña tu proyecto durante todo el proceso"]}},
    {"title":{"fr":"Estructura de pago"},"items":{"fr":["50 % para asegurar el proyecto e iniciar el diseño","25 % tras la validación del diseño, durante la fase de materiales y sourcing","25 % al finalizar, en la visita final"]}},
    {"title":{"fr":"Inversión del proyecto"},"body":{"fr":"La inversión final depende de la distribución, los acabados y el nivel de personalización. Esta inversión mejora la vida diaria y aporta un valor duradero a tu propiedad."}},
    {"title":{"fr":"Uso de los diseños"},"body":{"fr":"Los planos y diseños visuales son propiedad de Garage a la Carte y se entregan exclusivamente para tu proyecto personal. Si construyes por tu cuenta o con otro contratista, puede requerirse un acuerdo de uso o cesión."}},
    {"title":{"fr":"Continúa tu proyecto"},"body":{"fr":"Mejora tu espacio con sistemas integrados como fontanería, electricidad, climatización y funciones inteligentes, pensados para funcionar en conjunto."}},
    {"title":{"fr":"Zona de servicio"},"body":{"fr":"Incluido en un radio de 20 millas alrededor de Orlando. Las zonas ampliadas son posibles con gastos kilométricos, y ciertos proyectos en todo el estado pueden estudiarse bajo petición."}}
  ]$$::jsonb)
where slug = 'transform';

-- smart
update public.services set
  title           = pg_temp.jsonb_deep_merge(title,           jsonb_build_object('fr', 'Smart Integration')),
  subtitle        = pg_temp.jsonb_deep_merge(subtitle,        jsonb_build_object('fr', 'Pensado para el rendimiento diario — no solo para la estética.')),
  description     = pg_temp.jsonb_deep_merge(description,     jsonb_build_object('fr', 'Quieres algo más que un espacio bonito — quieres un garaje que funcione perfectamente cada día. Integramos los sistemas que dan vida a tu espacio: fontanería, electricidad, HVAC, ventilación, multimedia, funciones inteligentes y sistemas integrados — generalmente combinados con Design & Setup o Transformación Completa.')),
  price_label     = pg_temp.jsonb_deep_merge(price_label,     jsonb_build_object('fr', 'desde 3 500 $')),
  tag_label       = pg_temp.jsonb_deep_merge(tag_label,       jsonb_build_object('fr', 'Add-on')),
  includes        = pg_temp.jsonb_deep_merge(includes,        jsonb_build_object('fr', jsonb_build_array('Integración técnica alineada con el diseño', 'Planificación de fontanería, electricidad, HVAC y ventilación', 'Almacenamiento integrado, multimedia y funciones inteligentes', 'Coordinación con profesionales cualificados', 'Planos técnicos listos para la ejecución'))),
  deposit_schedule= pg_temp.jsonb_deep_merge(deposit_schedule,jsonb_build_object('fr', 'Incluido en la estructura de pago del proyecto principal.')),
  detail_sections = pg_temp.jsonb_deep_merge(detail_sections, $$[
    {"title":{"fr":"Cómo funciona"},"items":{"fr":["Los sistemas se planifican durante la fase de diseño","La integración se coordina antes de iniciar los trabajos","Todos los componentes están pensados para funcionar en conjunto"]}},
    {"title":{"fr":"Inversión"},"body":{"fr":"Add-on a medida según tus sistemas y necesidades de integración. Generalmente incluido en Design & Setup o Transformación Completa."},"items":{"fr":["Puede añadirse como upgrade independiente si es necesario","Viabilidad técnica validada antes de la ejecución","Alcance y requisitos de los sistemas definidos por adelantado","Coordinación prevista antes de la ejecución"]}},
    {"title":{"fr":"Crédito de honorarios"},"body":{"fr":"Los honorarios comienzan en 3 500 $ y se acreditan íntegramente si continúas con un contrato de proyecto firmado."}},
    {"title":{"fr":"Trabajos adicionales"},"body":{"fr":"Cualquier sistema adicional, upgrade o cambio de alcance se define claramente y se presupuesta por separado."}},
    {"title":{"fr":"Uso de los planos"},"body":{"fr":"Los planos técnicos y planos de integración son propiedad de Garage a la Carte y se entregan exclusivamente para tu proyecto personal. Si trabajas con otro contratista, puede requerirse un acuerdo de uso o cesión."}},
    {"title":{"fr":"Permisos y normativa"},"body":{"fr":"Algunos sistemas pueden requerir permisos municipales o del condado según el alcance. Te guiamos sobre los requisitos y coordinamos con los profesionales adecuados cuando es necesario."}},
    {"title":{"fr":"Zona de servicio"},"body":{"fr":"Incluido en un radio de 20 millas alrededor de Orlando. Las zonas ampliadas son posibles con gastos kilométricos, y ciertos proyectos en todo el estado pueden estudiarse bajo petición."}}
  ]$$::jsonb)
where slug = 'smart';

-- =====================================================================
-- process_steps
-- =====================================================================
update public.process_steps set
  title       = pg_temp.jsonb_deep_merge(title,       jsonb_build_object('fr', 'Cuéntanos tu visión')),
  description = pg_temp.jsonb_deep_merge(description, jsonb_build_object('fr', 'Consulta gratuita de 30 minutos.'))
where step_number = 1;

update public.process_steps set
  title       = pg_temp.jsonb_deep_merge(title,       jsonb_build_object('fr', 'Elige tu fórmula')),
  description = pg_temp.jsonb_deep_merge(description, jsonb_build_object('fr', 'Cuatro fórmulas à la carte.'))
where step_number = 2;

update public.process_steps set
  title       = pg_temp.jsonb_deep_merge(title,       jsonb_build_object('fr', 'Planifica antes de gastar')),
  description = pg_temp.jsonb_deep_merge(description, jsonb_build_object('fr', 'Visualiza tu garaje en 3D.'))
where step_number = 3;

update public.process_steps set
  title       = pg_temp.jsonb_deep_merge(title,       jsonb_build_object('fr', 'Dale vida')),
  description = pg_temp.jsonb_deep_merge(description, jsonb_build_object('fr', 'Tú mismo, acompañado o llave en mano.'))
where step_number = 4;

-- =====================================================================
-- projects
-- =====================================================================

-- the-social-hub
update public.projects set
  name           = pg_temp.jsonb_deep_merge(name,           jsonb_build_object('fr', 'El Social Hub')),
  tagline        = pg_temp.jsonb_deep_merge(tagline,        jsonb_build_object('fr', 'Convierte tu garaje en el corazón de la casa.')),
  project_type   = pg_temp.jsonb_deep_merge(project_type,   jsonb_build_object('fr', 'Entretenimiento / Bar')),
  size_label     = pg_temp.jsonb_deep_merge(size_label,     jsonb_build_object('fr', 'Garaje para 2–3 coches')),
  duration_label = pg_temp.jsonb_deep_merge(duration_label, jsonb_build_object('fr', '8 semanas')),
  description    = pg_temp.jsonb_deep_merge(description,    jsonb_build_object('fr', 'Una transformación completa que convierte tu garaje en un espacio social, funcional y de gran impacto — pensado para recibir, relajarse y disfrutar a diario.')),
  includes       = pg_temp.jsonb_deep_merge(includes,       jsonb_build_object('fr', jsonb_build_array('Bar con punto de agua', 'Mobiliario a medida', 'Electrodomésticos integrados', 'Paneles de madera decorativos', 'Mesa de billar'))),
  value_points   = pg_temp.jsonb_deep_merge(value_points,   jsonb_build_object('fr', jsonb_build_array('Un espacio dedicado para recibir y relajarse', 'Confort y funcionalidad sin ampliar la casa', 'Una fuerte revalorización de tu propiedad', 'Una alternativa moderna a una ampliación tradicional')))
where slug = 'the-social-hub';

-- the-daily-living-garage
update public.projects set
  name           = pg_temp.jsonb_deep_merge(name,           jsonb_build_object('fr', 'El Garaje del Día a Día')),
  tagline        = pg_temp.jsonb_deep_merge(tagline,        jsonb_build_object('fr', 'Un garaje multifuncional para trabajar, moverse y relajarse.')),
  project_type   = pg_temp.jsonb_deep_merge(project_type,   jsonb_build_object('fr', 'Multifuncional / Lifestyle')),
  size_label     = pg_temp.jsonb_deep_merge(size_label,     jsonb_build_object('fr', 'Garaje para 2 coches')),
  duration_label = pg_temp.jsonb_deep_merge(duration_label, jsonb_build_object('fr', '6 semanas')),
  description    = pg_temp.jsonb_deep_merge(description,    jsonb_build_object('fr', 'Una transformación completa que convierte el garaje en un espacio de vida flexible, pensado para acompañar tu rutina — del movimiento a la concentración y la relajación.')),
  includes       = pg_temp.jsonb_deep_merge(includes,       jsonb_build_object('fr', jsonb_build_array('Zona fitness con cardio, espacio libre y espejo', 'Lounge con sofá, TV y zona de descanso', 'Despacho compacto u home office', 'Rincón de café/utilitario con almacenamiento', 'Iluminación y distribución integradas para el día a día'))),
  value_points   = pg_temp.jsonb_deep_merge(value_points,   jsonb_build_object('fr', jsonb_build_array('Varias funciones en un espacio optimizado', 'Confort diario sin ampliación', 'Un entorno práctico y organizado para el trabajo y el lifestyle', 'Una transformación inteligente que revaloriza el inmueble')))
where slug = 'the-daily-living-garage';

-- smart-living-garage
update public.projects set
  name           = pg_temp.jsonb_deep_merge(name,           jsonb_build_object('fr', 'Smart Living Garage')),
  tagline        = pg_temp.jsonb_deep_merge(tagline,        jsonb_build_object('fr', 'El espíritu de día de partido, cada día.')),
  project_type   = pg_temp.jsonb_deep_merge(project_type,   jsonb_build_object('fr', 'Bar deportivo / Lifestyle')),
  size_label     = pg_temp.jsonb_deep_merge(size_label,     jsonb_build_object('fr', 'Garaje para 2 coches')),
  duration_label = pg_temp.jsonb_deep_merge(duration_label, jsonb_build_object('fr', '5 semanas')),
  description    = pg_temp.jsonb_deep_merge(description,    jsonb_build_object('fr', 'Una transformación completa que convierte un garaje estándar para 2 coches en un bar deportivo y lounge de estilo industrial — sin renunciar a la utilidad diaria. Una barra de madera maciza se enfrenta a una pared multimedia de gran pantalla, enmarcada por estanterías abiertas, cristalería y recuerdos deportivos, mientras que el ladrillo visto, la iluminación sobre raíl y los neones a medida crean un ambiente cálido de «día de partido». Asientos profundos de cuero y un puff forman el lounge, y un rincón de lavandería y punto de agua totalmente integrado mantiene el espacio realmente práctico para el día a día.')),
  includes       = pg_temp.jsonb_deep_merge(includes,       jsonb_build_object('fr', jsonb_build_array('Barra a medida en madera maciza con taburetes altos', 'Pared multimedia de gran pantalla con estanterías abiertas y cristalería', 'Pared de ladrillo visto e iluminación sobre raíl industrial', 'Neones a medida y galería de carteles de carreras enmarcados', 'Lounge de cuero con mesa baja', 'Rincón de lavandería y punto de agua totalmente integrado'))),
  value_points   = pg_temp.jsonb_deep_merge(value_points,   jsonb_build_object('fr', jsonb_build_array('Un espacio dedicado para los días de partido y la relajación', 'Recepción y utilidad cotidiana reunidas en una sola estancia', 'Libera espacio en el resto de la casa', 'Una transformación de gran impacto que revaloriza la propiedad de forma duradera')))
where slug = 'smart-living-garage';

-- modern-automotive-lounge
update public.projects set
  name           = pg_temp.jsonb_deep_merge(name,           jsonb_build_object('fr', 'Lounge Automovilístico Moderno')),
  tagline        = pg_temp.jsonb_deep_merge(tagline,        jsonb_build_object('fr', 'Un garaje de alta gama para el coche, el trabajo, el entretenimiento y el estilo de vida.')),
  project_type   = pg_temp.jsonb_deep_merge(project_type,   jsonb_build_object('fr', 'Lounge automovilístico / Multi-uso')),
  size_label     = pg_temp.jsonb_deep_merge(size_label,     jsonb_build_object('fr', 'Garaje para 2 coches')),
  duration_label = pg_temp.jsonb_deep_merge(duration_label, jsonb_build_object('fr', '7 semanas')),
  description    = pg_temp.jsonb_deep_merge(description,    jsonb_build_object('fr', 'Una transformación de alta gama que te permite conservar el coche y ganar un verdadero espacio de vida a su alrededor. Una plaza sigue albergando el vehículo sobre un suelo oscuro y depurado, mientras que el resto del garaje se convierte en un lugar multi-uso: un puesto de home office y gaming con PC a medida, un lounge tipo home cinema con sofá de terciopelo y alfombra de pelo, y un rincón de café y bar de estilo retro frente a una pared gráfica. Iluminación sobre raíl, toques cálidos y una decoración cuidada unen trabajo, descanso y pasión por el automóvil en una misma estancia refinada.')),
  includes       = pg_temp.jsonb_deep_merge(includes,       jsonb_build_object('fr', jsonb_build_array('Plaza dedicada al coche con suelo acabado', 'Puesto de home office y gaming con PC a medida', 'Lounge tipo home cinema con sofá de terciopelo y alfombra de pelo', 'Rincón de café y bar retro con minifrigorífico', 'Pared gráfica y decoración cuidada', 'Iluminación sobre raíl y toques cálidos de ambiente'))),
  value_points   = pg_temp.jsonb_deep_merge(value_points,   jsonb_build_object('fr', jsonb_build_array('Conserva tu coche y gana un espacio de vida', 'Trabaja, juega y relájate sin salir de casa', 'Una transformación premium multi-uso para apasionados', 'Aporta carácter y valor a la propiedad')))
where slug = 'modern-automotive-lounge';

-- =====================================================================
-- legal_documents
-- =====================================================================
update public.legal_documents set
  title = pg_temp.jsonb_deep_merge(title, jsonb_build_object('fr', 'Condiciones y compromisos del proyecto.')),
  intro = pg_temp.jsonb_deep_merge(intro, jsonb_build_object('fr', 'Definimos expectativas claras desde el primer día y acompañamos tu proyecto desde la idea hasta la entrega. Al trabajar con Garage a la Carte, aceptas estas condiciones salvo acuerdo escrito en sentido contrario.'))
where document_key = 'project_conditions';

-- =====================================================================
-- legal_sections (par section_number, document = project_conditions)
-- =====================================================================
with doc as (select id from public.legal_documents where document_key = 'project_conditions')
update public.legal_sections ls set
  title = pg_temp.jsonb_deep_merge(ls.title, jsonb_build_object('fr', 'Presupuesto Gratuito')),
  body  = pg_temp.jsonb_deep_merge(ls.body,  jsonb_build_object('fr', 'Empezamos con una consulta para entender tu espacio, tus objetivos y el nivel de servicio que mejor se adapta a tu proyecto. El presupuesto es una evaluación inicial que puede evolucionar según las elecciones finales, las condiciones del sitio y los detalles del proyecto. Los presupuestos suelen ser válidos durante un periodo limitado debido a posibles variaciones en los costes y la disponibilidad de los materiales.'))
from doc where ls.document_id = doc.id and ls.section_number = 1;

with doc as (select id from public.legal_documents where document_key = 'project_conditions')
update public.legal_sections ls set
  title = pg_temp.jsonb_deep_merge(ls.title, jsonb_build_object('fr', 'Validación del Proyecto')),
  body  = pg_temp.jsonb_deep_merge(ls.body,  jsonb_build_object('fr', 'Un proyecto está listo cuando los siguientes elementos están claramente definidos: nivel de servicio elegido, distribución y dirección de diseño confirmadas, presupuesto estimado y componentes principales. Una vez validado, pasamos a la planificación y la ejecución.'))
from doc where ls.document_id = doc.id and ls.section_number = 2;

with doc as (select id from public.legal_documents where document_key = 'project_conditions')
update public.legal_sections ls set
  title = pg_temp.jsonb_deep_merge(ls.title, jsonb_build_object('fr', 'Alcance y Niveles de Servicio')),
  body  = pg_temp.jsonb_deep_merge(ls.body,  jsonb_build_object('fr', 'Cada servicio incluye únicamente lo que está claramente definido en el nivel elegido: Design Blueprint, Design + Setup, Transformación Completa o Smart Integration. Cualquier solicitud fuera del alcance se trata como un ajuste de proyecto.'))
from doc where ls.document_id = doc.id and ls.section_number = 3;

with doc as (select id from public.legal_documents where document_key = 'project_conditions')
update public.legal_sections ls set
  title = pg_temp.jsonb_deep_merge(ls.title, jsonb_build_object('fr', 'Visuales y Aprobación')),
  body  = pg_temp.jsonb_deep_merge(ls.body,  jsonb_build_object('fr', 'Nuestras imágenes 3D representan la intención de diseño, la distribución y la atmósfera. Pueden producirse pequeñas variaciones según los materiales, la iluminación o la disponibilidad. Antes de avanzar, revisas y validas tu diseño.'))
from doc where ls.document_id = doc.id and ls.section_number = 4;

with doc as (select id from public.legal_documents where document_key = 'project_conditions')
update public.legal_sections ls set
  title = pg_temp.jsonb_deep_merge(ls.title, jsonb_build_object('fr', 'Responsabilidades del Cliente')),
  body  = pg_temp.jsonb_deep_merge(ls.body,  jsonb_build_object('fr', 'Te comprometes a facilitar información precisa, validar los diseños con rapidez, garantizar el acceso a la propiedad y obtener las autorizaciones necesarias. El garaje debe estar preparado antes de la entrega.'))
from doc where ls.document_id = doc.id and ls.section_number = 5;

with doc as (select id from public.legal_documents where document_key = 'project_conditions')
update public.legal_sections ls set
  title = pg_temp.jsonb_deep_merge(ls.title, jsonb_build_object('fr', 'Documentación del Sitio')),
  body  = pg_temp.jsonb_deep_merge(ls.body,  jsonb_build_object('fr', 'Podemos tomar fotos o vídeos cortos durante las visitas, únicamente para uso interno. Nunca se utilizan con fines de marketing sin tu autorización previa.'))
from doc where ls.document_id = doc.id and ls.section_number = 6;

with doc as (select id from public.legal_documents where document_key = 'project_conditions')
update public.legal_sections ls set
  title = pg_temp.jsonb_deep_merge(ls.title, jsonb_build_object('fr', 'Permisos y Profesionales Acreditados')),
  body  = pg_temp.jsonb_deep_merge(ls.body,  jsonb_build_object('fr', 'Algunos proyectos pueden requerir permisos según el alcance y la normativa local. El cliente es responsable salvo que se indique lo contrario. Coordinamos con profesionales cualificados y acreditados cuando es necesario.'))
from doc where ls.document_id = doc.id and ls.section_number = 7;

with doc as (select id from public.legal_documents where document_key = 'project_conditions')
update public.legal_sections ls set
  title = pg_temp.jsonb_deep_merge(ls.title, jsonb_build_object('fr', 'Plazos y Pagos')),
  body  = pg_temp.jsonb_deep_merge(ls.body,  jsonb_build_object('fr', 'Los plazos son estimativos y pueden verse afectados por la disponibilidad de materiales, los proveedores, la meteorología, los permisos y la preparación del sitio. Se requiere un anticipo para asegurar el proyecto. Ningún trabajo se inicia sin pago confirmado.'))
from doc where ls.document_id = doc.id and ls.section_number = 8;

with doc as (select id from public.legal_documents where document_key = 'project_conditions')
update public.legal_sections ls set
  title = pg_temp.jsonb_deep_merge(ls.title, jsonb_build_object('fr', 'Ajustes y Cancelación')),
  body  = pg_temp.jsonb_deep_merge(ls.body,  jsonb_build_object('fr', 'Cualquier cambio tras la validación es un ajuste y puede afectar al precio y a los plazos. Los trabajos y pedidos personalizados no pueden cancelarse una vez iniciados; el trabajo realizado hasta la cancelación sigue siendo facturable.'))
from doc where ls.document_id = doc.id and ls.section_number = 9;

with doc as (select id from public.legal_documents where document_key = 'project_conditions')
update public.legal_sections ls set
  title = pg_temp.jsonb_deep_merge(ls.title, jsonb_build_object('fr', 'Garantía y Portfolio')),
  body  = pg_temp.jsonb_deep_merge(ls.body,  jsonb_build_object('fr', 'Las garantías del fabricante se aplican a los productos. La garantía de instalación se aplica cuando esta es gestionada por nuestro equipo o socios. Podemos usar las fotos del proyecto para nuestro portfolio salvo solicitud escrita en sentido contrario.'))
from doc where ls.document_id = doc.id and ls.section_number = 10;

with doc as (select id from public.legal_documents where document_key = 'project_conditions')
update public.legal_sections ls set
  title = pg_temp.jsonb_deep_merge(ls.title, jsonb_build_object('fr', 'Zona de Servicio')),
  body  = pg_temp.jsonb_deep_merge(ls.body,  jsonb_build_object('fr', 'Los servicios se incluyen dentro de una zona estándar, habitualmente 20 millas alrededor de Orlando. Los proyectos fuera de zona son posibles bajo petición, con gastos adicionales.'))
from doc where ls.document_id = doc.id and ls.section_number = 11;

commit;
