import { isSupabaseConfigured, supabase } from "../lib/supabase";

export const PROJECT_IMAGE_BUCKET = "project-images";

const STORAGE_OBJECT_PATTERN = /\/storage\/v1\/object\/(?:public|sign)\/(.+)$/;

export function getProjectImagePublicUrl(value, projectSlug = "") {
  const path = getProjectImageStoragePath(value, projectSlug);
  if (!path) return "";
  if (isExternalUrl(path)) return path;
  if (!isSupabaseConfigured || !supabase) return path;

  const { data } = supabase.storage.from(PROJECT_IMAGE_BUCKET).getPublicUrl(path);
  return data?.publicUrl || path;
}

export function getProjectImageStoragePath(value, projectSlug = "") {
  const raw = String(value || "").trim();
  if (!raw) return "";

  const storagePath = extractStoragePath(raw);
  if (storagePath) return withProjectFolder(storagePath, projectSlug);
  if (isExternalUrl(raw)) return raw;

  const path = raw.replace(/^\/+/, "");
  return withProjectFolder(stripBucketPrefix(path), projectSlug);
}

export function slugifyProjectImagePart(value) {
  return (
    String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9._-]+/g, "-")
      .replace(/^-+|-+$/g, "") || "file"
  );
}

function extractStoragePath(value) {
  try {
    const url = new URL(value);
    const match = url.pathname.match(STORAGE_OBJECT_PATTERN);
    if (!match) return "";

    const parts = decodeURIComponent(match[1]).split("/").filter(Boolean);
    if (!parts.length) return "";

    const [bucketOrFolder, ...rest] = parts;
    if (bucketOrFolder === PROJECT_IMAGE_BUCKET) return rest.join("/");

    return [bucketOrFolder, ...rest].join("/");
  } catch {
    return "";
  }
}

function withProjectFolder(path, projectSlug) {
  const cleanPath = stripBucketPrefix(path);
  if (!cleanPath || cleanPath.includes("/") || !projectSlug) return cleanPath;
  return `${slugifyProjectImagePart(projectSlug)}/${cleanPath}`;
}

function stripBucketPrefix(path) {
  const cleanPath = String(path || "").replace(/^\/+/, "");
  return cleanPath.startsWith(`${PROJECT_IMAGE_BUCKET}/`)
    ? cleanPath.slice(PROJECT_IMAGE_BUCKET.length + 1)
    : cleanPath;
}

function isExternalUrl(value) {
  return /^https?:\/\//i.test(value);
}
