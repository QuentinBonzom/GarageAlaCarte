import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { compressImageFile } from "../lib/imageOptimize";
import {
  PROJECT_IMAGE_BUCKET,
  getProjectImagePublicUrl,
  getProjectImageStoragePath,
  slugifyProjectImagePart,
} from "./projectImageUrls";

const adminEmail =
  import.meta.env.VITE_SUPABASE_ADMIN_EMAIL || "admin@garagealacarte.com";

function requireSupabase() {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase is not configured.");
  }
}

function unwrap(label, result) {
  if (result.error) {
    throw new Error(`${label}: ${result.error.message}`);
  }
  return result.data ?? [];
}

export async function getAdminSession() {
  requireSupabase();
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

export function onAdminAuthChange(callback) {
  if (!isSupabaseConfigured) return () => {};
  const { data } = supabase.auth.onAuthStateChange((_event, session) =>
    callback(session),
  );
  return () => data.subscription.unsubscribe();
}

export async function signInAdmin({ password }) {
  requireSupabase();
  if (!adminEmail) {
    throw new Error("Admin email is not configured.");
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: adminEmail,
    password,
  });
  if (error) throw error;
  return data.session;
}

export async function signOutAdmin() {
  requireSupabase();
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function loadAdminData() {
  requireSupabase();

  const [
    emailLeads,
    contactSubmissions,
    services,
    teamMembers,
    processSteps,
    projects,
    cmsSections,
    contactChannels,
    legalDocuments,
    legalSections,
    siteSettings,
    projectImages,
    crmContacts,
    crmActivities,
    crmDeals,
  ] = await Promise.all([
    supabase
      .from("email_leads")
      .select("*")
      .order("captured_at", { ascending: false }),
    supabase
      .from("contact_submissions")
      .select("*")
      .order("submitted_at", { ascending: false }),
    supabase.from("services").select("*").order("display_order"),
    supabase.from("team_members").select("*").order("display_order"),
    supabase.from("process_steps").select("*").order("display_order"),
    supabase.from("projects").select("*").order("display_order"),
    supabase
      .from("cms_sections")
      .select("*")
      .order("page_key")
      .order("display_order"),
    supabase.from("contact_channels").select("*").order("display_order"),
    supabase.from("legal_documents").select("*").order("document_key"),
    supabase.from("legal_sections").select("*").order("display_order"),
    supabase.from("site_settings").select("*").order("key"),
    supabase.from("project_images").select("*").order("display_order"),
    supabase
      .from("crm_contacts")
      .select("*")
      .order("last_activity_at", { ascending: false }),
    supabase
      .from("crm_activities")
      .select("*")
      .order("created_at", { ascending: false }),
    supabase
      .from("crm_deals")
      .select("*")
      .order("created_at", { ascending: false }),
  ]);

  const projectRows = unwrap("projects", projects);
  const projectSlugsById = Object.fromEntries(
    projectRows.map((project) => [project.id, project.slug]),
  );

  return {
    emailLeads: unwrap("email_leads", emailLeads),
    contactSubmissions: unwrap("contact_submissions", contactSubmissions),
    services: unwrap("services", services),
    teamMembers: unwrap("team_members", teamMembers),
    processSteps: unwrap("process_steps", processSteps),
    projects: projectRows,
    cmsSections: unwrap("cms_sections", cmsSections),
    contactChannels: unwrap("contact_channels", contactChannels),
    legalDocuments: unwrap("legal_documents", legalDocuments),
    legalSections: unwrap("legal_sections", legalSections),
    siteSettings: unwrap("site_settings", siteSettings),
    projectImages: unwrap("project_images", projectImages).map((image) => ({
      ...image,
      image_url:
        getProjectImagePublicUrl(
          image.image_url,
          projectSlugsById[image.project_id],
        ) || image.image_url,
    })),
    crmContacts: unwrap("crm_contacts", crmContacts),
    crmActivities: unwrap("crm_activities", crmActivities),
    crmDeals: unwrap("crm_deals", crmDeals),
  };
}

export async function createCrmDeal(payload) {
  requireSupabase();
  const { data, error } = await supabase
    .from("crm_deals")
    .insert(payload)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateCrmDeal(id, payload) {
  requireSupabase();
  const { error } = await supabase
    .from("crm_deals")
    .update(payload)
    .eq("id", id);
  if (error) throw error;
}

export async function deleteCrmDeal(id) {
  requireSupabase();
  const { error } = await supabase.from("crm_deals").delete().eq("id", id);
  if (error) throw error;
}

export async function updateCrmContact(id, payload) {
  requireSupabase();
  const { error } = await supabase
    .from("crm_contacts")
    .update(payload)
    .eq("id", id);
  if (error) throw error;
}

export async function addCrmActivity(contactId, { type, body, author }) {
  requireSupabase();
  const { error } = await supabase
    .from("crm_activities")
    .insert({ contact_id: contactId, type, body, author });
  if (error) throw error;
  // Bump the contact's last activity so it floats to the top of the list.
  await supabase
    .from("crm_contacts")
    .update({ last_activity_at: new Date().toISOString() })
    .eq("id", contactId);
}

export async function deleteCrmActivity(id) {
  requireSupabase();
  const { error } = await supabase.from("crm_activities").delete().eq("id", id);
  if (error) throw error;
}

export async function updateContactSubmissionStatus(id, status) {
  requireSupabase();
  const { error } = await supabase
    .from("contact_submissions")
    .update({ status })
    .eq("id", id);
  if (error) throw error;
}

export async function updateEmailLeadStatus(id, status) {
  requireSupabase();
  const { error } = await supabase
    .from("email_leads")
    .update({ status })
    .eq("id", id);
  if (error) throw error;
}

export async function updateCmsSection(id, content) {
  requireSupabase();
  const { error } = await supabase
    .from("cms_sections")
    .update({ content })
    .eq("id", id);
  if (error) throw error;
}

export async function createProject(payload) {
  requireSupabase();
  const { data, error } = await supabase
    .from("projects")
    .insert(payload)
    .select("*")
    .single();
  if (error) throw error;
  return data;
}

export async function updateProject(id, payload) {
  requireSupabase();
  const { error } = await supabase
    .from("projects")
    .update(payload)
    .eq("id", id);
  if (error) throw error;
}

export async function updateProjectStatus(id, status) {
  await updateProject(id, { status });
}

export async function updateProjectImage(id, payload) {
  requireSupabase();
  const { error } = await supabase
    .from("project_images")
    .update(payload)
    .eq("id", id);
  if (error) throw error;
}

export async function deleteProjectImage(id, imageUrl = "", projectSlug = "") {
  requireSupabase();
  // Best-effort removal of the stored file (ignore failures — orphan cleanup is not critical).
  const path = getProjectImageStoragePath(imageUrl, projectSlug);
  if (path && !/^https?:\/\//i.test(path)) {
    try {
      await supabase.storage.from(PROJECT_IMAGE_BUCKET).remove([path]);
    } catch {
      /* ignore */
    }
  }
  const { error } = await supabase.from("project_images").delete().eq("id", id);
  if (error) throw error;
}

export async function createProjectImage(projectId, displayOrder = 0) {
  requireSupabase();
  const { data, error } = await supabase
    .from("project_images")
    .insert({
      project_id: projectId,
      label: "New image",
      kind: "gallery",
      display_order: displayOrder,
    })
    .select("*")
    .single();
  if (error) throw error;
  return data;
}

export async function uploadProjectImageFile({ file, projectSlug, imageId }) {
  requireSupabase();
  file = await compressImageFile(file);
  const safeProject = slugifyProjectImagePart(projectSlug || "project");
  const ext = (file.name || "").split(".").pop().toLowerCase();
  const safeName =
    slugifyProjectImagePart((file.name || "image").replace(/\.[^.]+$/, "")) +
    (ext ? `.${ext}` : "");
  const path = `${safeProject}/${imageId}-${Date.now()}-${safeName}`;

  const { error } = await supabase.storage
    .from(PROJECT_IMAGE_BUCKET)
    .upload(path, file, {
      cacheControl: "31536000",
      contentType: file.type || "image/jpeg",
      upsert: true,
    });

  if (error) {
    const code = error.statusCode || error.status || "";
    const hint =
      code === "404" || error.message?.includes("Bucket")
        ? " — Vérifiez que le bucket 'project-images' existe dans Supabase Storage."
        : code === "403" || error.message?.includes("policy")
          ? " — Vérifiez les politiques RLS du bucket Supabase."
          : "";
    throw new Error(
      `Upload échoué${code ? ` (${code})` : ""}: ${error.message}${hint}`,
    );
  }

  return {
    path,
    url: getProjectImagePublicUrl(path, safeProject),
  };
}

export async function uploadCmsImage({ file, sectionKey, fieldKey }) {
  requireSupabase();
  file = await compressImageFile(file);
  const safeSection = slugifyProjectImagePart(sectionKey || "section");
  const safeField = slugifyProjectImagePart(fieldKey || "image");
  const ext = (file.name || "").split(".").pop().toLowerCase();
  const safeName =
    slugifyProjectImagePart((file.name || "image").replace(/\.[^.]+$/, "")) +
    (ext ? `.${ext}` : "");
  const path = `cms/${safeSection}/${safeField}-${Date.now()}-${safeName}`;

  const { error } = await supabase.storage
    .from(PROJECT_IMAGE_BUCKET)
    .upload(path, file, {
      cacheControl: "31536000",
      contentType: file.type || "image/jpeg",
      upsert: true,
    });

  if (error) {
    const code = error.statusCode || error.status || "";
    const hint =
      code === "404" || error.message?.includes("Bucket")
        ? " — Vérifiez que le bucket 'project-images' existe dans Supabase Storage."
        : code === "403" || error.message?.includes("policy")
          ? " — Vérifiez les politiques RLS du bucket Supabase."
          : "";
    throw new Error(
      `Upload échoué${code ? ` (${code})` : ""}: ${error.message}${hint}`,
    );
  }

  return {
    path,
    url: getProjectImagePublicUrl(path, "cms"),
  };
}

export async function uploadServiceImageFile({ file, serviceSlug, index = 0 }) {
  requireSupabase();
  file = await compressImageFile(file);
  const safeService = slugifyProjectImagePart(serviceSlug || "service");
  const ext = (file.name || "").split(".").pop().toLowerCase();
  const safeName =
    slugifyProjectImagePart((file.name || "image").replace(/\.[^.]+$/, "")) +
    (ext ? `.${ext}` : "");
  const path = `services/${safeService}/${index}-${Date.now()}-${safeName}`;

  const { error } = await supabase.storage
    .from(PROJECT_IMAGE_BUCKET)
    .upload(path, file, {
      cacheControl: "31536000",
      contentType: file.type || "image/jpeg",
      upsert: true,
    });

  if (error) {
    const code = error.statusCode || error.status || "";
    const hint =
      code === "404" || error.message?.includes("Bucket")
        ? " — Vérifiez que le bucket 'project-images' existe dans Supabase Storage."
        : code === "403" || error.message?.includes("policy")
          ? " — Vérifiez les politiques RLS du bucket Supabase."
          : "";
    throw new Error(
      `Upload échoué${code ? ` (${code})` : ""}: ${error.message}${hint}`,
    );
  }

  return {
    path,
    url: getProjectImagePublicUrl(path),
  };
}

export async function updateService(id, payload) {
  requireSupabase();
  const { error } = await supabase
    .from("services")
    .update(payload)
    .eq("id", id);
  if (error) throw error;
}

export async function createService(payload) {
  requireSupabase();
  const { data, error } = await supabase
    .from("services")
    .insert(payload)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteService(id) {
  requireSupabase();
  const { error } = await supabase.from("services").delete().eq("id", id);
  if (error) throw error;
}

export async function updateTeamMember(id, payload) {
  requireSupabase();
  const { error } = await supabase
    .from("team_members")
    .update(payload)
    .eq("id", id);
  if (error) throw error;
}

export async function updateProcessStep(id, payload) {
  requireSupabase();
  const { error } = await supabase
    .from("process_steps")
    .update(payload)
    .eq("id", id);
  if (error) throw error;
}

export async function updateContactChannel(id, payload) {
  requireSupabase();
  const { error } = await supabase
    .from("contact_channels")
    .update(payload)
    .eq("id", id);
  if (error) throw error;
}

export async function updateSiteSetting(key, payload) {
  requireSupabase();
  const { error } = await supabase
    .from("site_settings")
    .update(payload)
    .eq("key", key);
  if (error) throw error;
}

export async function updateLegalDocument(id, payload) {
  requireSupabase();
  const { error } = await supabase
    .from("legal_documents")
    .update(payload)
    .eq("id", id);
  if (error) throw error;
}

export async function updateLegalSection(id, payload) {
  requireSupabase();
  const { error } = await supabase
    .from("legal_sections")
    .update(payload)
    .eq("id", id);
  if (error) throw error;
}

// =====================================================
// Blog Articles CMS
// =====================================================

export async function loadBlogArticles() {
  requireSupabase();
  const { data, error } = await supabase
    .from("blog_articles")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function updateBlogArticle(id, payload) {
  requireSupabase();
  const { error } = await supabase
    .from("blog_articles")
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;
}

export async function createBlogArticle(payload) {
  requireSupabase();
  const { data, error } = await supabase
    .from("blog_articles")
    .insert([{ ...payload, created_at: new Date().toISOString() }])
    .select();
  if (error) throw error;
  return data?.[0];
}

export async function deleteBlogArticle(id) {
  requireSupabase();
  const { error } = await supabase.from("blog_articles").delete().eq("id", id);
  if (error) throw error;
}

export async function loadFaqItems() {
  requireSupabase();
  const { data, error } = await supabase
    .from("faq_items")
    .select("*")
    .order("display_order", { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function updateFaqItem(id, payload) {
  requireSupabase();
  const { error } = await supabase
    .from("faq_items")
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;
}

export async function createFaqItem(payload) {
  requireSupabase();
  const { data, error } = await supabase
    .from("faq_items")
    .insert([payload])
    .select();
  if (error) throw error;
  return data?.[0];
}

export async function deleteFaqItem(id) {
  requireSupabase();
  const { error } = await supabase.from("faq_items").delete().eq("id", id);
  if (error) throw error;
}
