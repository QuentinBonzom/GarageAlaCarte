import { CONTENT } from "./content";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { getProjectImagePublicUrl } from "./projectImageUrls";

const byOrder = (a, b) => (a.display_order ?? 0) - (b.display_order ?? 0);
const padStep = (value) => String(value).padStart(2, "0");
const localizedText = (value, fallback = "") => value ?? { en: fallback, fr: fallback };
const localizedList = (value) => value ?? { en: [], fr: [] };

function assertNoError(label, result) {
  if (result.error) {
    throw new Error(`${label}: ${result.error.message}`);
  }
  return result.data ?? [];
}

function mergeCmsSections(nextContent, sections) {
  const sectionMap = Object.fromEntries(sections.map((section) => [section.section_key, section.content]));

  if (sectionMap.nav) nextContent.nav = sectionMap.nav;
  if (sectionMap.hero) nextContent.hero = sectionMap.hero;
  if (sectionMap.hero_caption) nextContent.hero_caption = sectionMap.hero_caption;
  if (sectionMap.marquee_words) nextContent.marquee_words = sectionMap.marquee_words;
  if (sectionMap.visual_strip) nextContent.visual_strip = sectionMap.visual_strip;
  if (sectionMap.before_after) nextContent.before_after = sectionMap.before_after;
  if (sectionMap.why) nextContent.why = sectionMap.why;
  if (sectionMap.audience) nextContent.audience = sectionMap.audience;
  if (sectionMap.final_cta) nextContent.final_cta = sectionMap.final_cta;
  if (sectionMap.use_cases) nextContent.use_cases = sectionMap.use_cases;
  if (sectionMap.testimonials_v2) nextContent.testimonials_v2 = sectionMap.testimonials_v2;
  if (sectionMap.projects_page) nextContent.projects_page = sectionMap.projects_page;
  if (sectionMap.popup) nextContent.popup = sectionMap.popup;

  if (sectionMap.services_intro) {
    nextContent.services = {
      ...nextContent.services,
      ...sectionMap.services_intro,
      items: nextContent.services.items,
    };
  }

  if (sectionMap.team_intro) {
    nextContent.team = {
      ...nextContent.team,
      ...sectionMap.team_intro,
      members: nextContent.team.members,
    };
  }

  if (sectionMap.process_intro) {
    nextContent.process = {
      ...nextContent.process,
      ...sectionMap.process_intro,
      steps: nextContent.process.steps,
    };
  }

  if (sectionMap.contact_page) {
    nextContent.contact = {
      ...nextContent.contact,
      ...sectionMap.contact_page,
    };
  }
}

function mergeContactChannels(nextContent, channels) {
  for (const channel of channels) {
    if (channel.channel_key === "main_email") {
      nextContent.contact.main_email = channel.value;
    }
    if (channel.channel_key === "main_phone") {
      nextContent.contact.main_phone = channel.value;
    }
    if (channel.channel_key === "address") {
      nextContent.contact.address = { en: channel.value, fr: channel.value };
    }
  }
}

function mapServices(services, serviceTeams) {
  const fallbackServicesBySlug = Object.fromEntries(CONTENT.services.items.map((service) => [service.id, service]));
  const teamsByServiceId = serviceTeams.reduce((acc, row) => {
    const serviceId = row.service_id;
    const name = row.team_members?.name;
    if (!serviceId || !name) return acc;
    acc[serviceId] ??= [];
    acc[serviceId].push({ name, order: row.display_order ?? 0 });
    return acc;
  }, {});

  return services.sort(byOrder).map((service) => {
    const fallback = fallbackServicesBySlug[service.slug] ?? {};
    const detailSections = Array.isArray(service.detail_sections) && service.detail_sections.length
      ? service.detail_sections
      : fallback.details ?? [];

    return {
      id: service.slug,
      num: service.service_number,
      title: service.title,
      sub: service.subtitle,
      description: service.description,
      price: service.price_label,
      badge: service.badge_label,
      tag: service.tag_label,
      led_by: (teamsByServiceId[service.id] ?? [])
        .sort((a, b) => a.order - b.order)
        .map((member) => member.name),
      includes: service.includes,
      not_included: service.not_included,
      deposit: service.deposit_schedule,
      on_site: service.onsite_label,
      details: detailSections,
    };
  });
}

function mapTeamMembers(members) {
  return members.sort(byOrder).map((member) => ({
    name: member.name,
    role: member.role,
    bio: member.bio,
    email: member.email,
    phone: member.phone,
  }));
}

function mapProcessSteps(steps) {
  return steps.sort(byOrder).map((step) => ({
    num: padStep(step.step_number),
    title: step.title,
    text: step.description,
  }));
}

function mapProjects(projects, images, servicesById) {
  const imagesByProjectId = images.reduce((acc, image) => {
    acc[image.project_id] ??= [];
    acc[image.project_id].push(image);
    return acc;
  }, {});

  return projects.sort(byOrder).map((project) => {
    const projectImages = (imagesByProjectId[project.id] ?? [])
      .sort(byOrder)
      .map((image) => ({
        label: image.label || image.alt_text?.en || null,
        alt: image.alt_text || null,
        color: image.placeholder_color || "#70675d",
        url: getProjectImagePublicUrl(image.image_url, project.slug) || null,
      }));

    return {
      id: project.slug,
      slug: project.slug,
      placeholder: project.status === "upcoming",
      name: localizedText(project.name, "Untitled project"),
      tagline: localizedText(project.tagline),
      type: localizedText(project.project_type),
      size: localizedText(project.size_label),
      duration: localizedText(project.duration_label),
      service: servicesById[project.service_id]?.title ?? project.project_type ?? { en: "Project", fr: "Projet" },
      year: project.year,
      featured: project.is_featured,
      large: project.is_large,
      description: localizedText(project.description),
      includes: localizedList(project.includes),
      why: localizedList(project.value_points),
      images: projectImages,
    };
  });
}

function mergeLegal(nextContent, documents, sections) {
  const document = documents.find((item) => item.document_key === "project_conditions");
  if (!document) return;

  const documentSections = sections
    .filter((section) => section.document_id === document.id)
    .sort(byOrder)
    .map((section) => ({
      num: padStep(section.section_number),
      title: section.title,
      body: section.body,
    }));

  nextContent.legal = {
    project_conditions: {
      title: document.title,
      intro: document.intro,
      sections: documentSections,
    },
  };
}

export async function hydrateContentFromSupabase() {
  if (!isSupabaseConfigured) return CONTENT;

  const [
    cmsSectionsResult,
    contactChannelsResult,
    teamMembersResult,
    servicesResult,
    serviceTeamsResult,
    processStepsResult,
    projectsResult,
    projectImagesResult,
    legalDocumentsResult,
    legalSectionsResult,
  ] = await Promise.all([
    supabase.from("cms_sections").select("*").eq("is_active", true).order("display_order"),
    supabase.from("contact_channels").select("*").eq("is_active", true).order("display_order"),
    supabase.from("team_members").select("*").eq("is_active", true).order("display_order"),
    supabase.from("services").select("*").eq("is_active", true).order("display_order"),
    supabase.from("service_team_members").select("service_id, display_order, team_members(name)").order("display_order"),
    supabase.from("process_steps").select("*").eq("is_active", true).order("display_order"),
    supabase.from("projects").select("*").eq("status", "live").order("display_order"),
    supabase.from("project_images").select("*").order("display_order"),
    supabase.from("legal_documents").select("*").eq("is_active", true),
    supabase.from("legal_sections").select("*").eq("is_active", true).order("display_order"),
  ]);

  const cmsSections = assertNoError("cms_sections", cmsSectionsResult);
  const contactChannels = assertNoError("contact_channels", contactChannelsResult);
  const teamMembers = assertNoError("team_members", teamMembersResult);
  const services = assertNoError("services", servicesResult);
  const serviceTeams = assertNoError("service_team_members", serviceTeamsResult);
  const processSteps = assertNoError("process_steps", processStepsResult);
  const projects = assertNoError("projects", projectsResult);
  const projectImages = assertNoError("project_images", projectImagesResult);
  const legalDocuments = assertNoError("legal_documents", legalDocumentsResult);
  const legalSections = assertNoError("legal_sections", legalSectionsResult);

  const servicesById = Object.fromEntries(services.map((service) => [service.id, service]));
  const nextContent = JSON.parse(JSON.stringify(CONTENT));

  mergeCmsSections(nextContent, cmsSections);
  mergeContactChannels(nextContent, contactChannels);
  if (services.length) nextContent.services.items = mapServices(services, serviceTeams);
  if (teamMembers.length) nextContent.team.members = mapTeamMembers(teamMembers);
  if (processSteps.length) nextContent.process.steps = mapProcessSteps(processSteps);
  if (projects.length) nextContent.projects = mapProjects(projects, projectImages, servicesById);
  mergeLegal(nextContent, legalDocuments, legalSections);

  Object.keys(CONTENT).forEach((key) => delete CONTENT[key]);
  Object.assign(CONTENT, nextContent);

  return CONTENT;
}

export async function createEmailLead({ email, locale }) {
  if (!isSupabaseConfigured) throw new Error("Supabase is not configured");

  const { error } = await supabase.from("email_leads").insert({
    email,
    locale,
    source: "Exit popup",
  });

  if (error) throw error;
  return true;
}

export async function createContactSubmission({ form, locale }) {
  if (!isSupabaseConfigured) throw new Error("Supabase is not configured");

  const { error } = await supabase.from("contact_submissions").insert({
    name: form.name,
    email: form.email,
    phone: form.phone || null,
    service_slug: form.service,
    message: form.message,
    locale,
    source: "contact_form",
    consent_accepted: form.consent,
  });

  if (error) throw error;
  return true;
}
