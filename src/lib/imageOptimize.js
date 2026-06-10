// Compression/redimensionnement des images côté navigateur AVANT upload Supabase.
// Le plan gratuit Supabase n'offre pas de transformation à la volée : on réduit
// donc le poids à la source. Redimensionne au plus grand côté `maxDimension` et
// réencode en WebP (fallback JPEG) à la qualité `quality`.

function readAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

let webpSupport;
function supportsWebp() {
  if (webpSupport === undefined) {
    const canvas = document.createElement("canvas");
    webpSupport = canvas.toDataURL("image/webp").startsWith("data:image/webp");
  }
  return webpSupport;
}

export async function compressImageFile(file, { maxDimension = 2000, quality = 0.82 } = {}) {
  // On ne touche pas aux non-images ni aux formats à ne pas rasteriser
  // (SVG vectoriel, GIF potentiellement animé).
  if (!file || !file.type?.startsWith("image/")) return file;
  if (file.type === "image/svg+xml" || file.type === "image/gif") return file;

  try {
    const img = await loadImage(await readAsDataURL(file));
    const { width, height } = img;
    if (!width || !height) return file;

    const scale = Math.min(1, maxDimension / Math.max(width, height));
    const targetW = Math.round(width * scale);
    const targetH = Math.round(height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(img, 0, 0, targetW, targetH);

    const outType = supportsWebp() ? "image/webp" : "image/jpeg";
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, outType, quality));

    // Si la compression n'apporte rien (image déjà petite/optimisée), on garde l'original.
    if (!blob || blob.size >= file.size) return file;

    const ext = outType === "image/webp" ? "webp" : "jpg";
    const newName = (file.name || "image").replace(/\.[^.]+$/, "") + `.${ext}`;
    return new File([blob], newName, { type: outType, lastModified: Date.now() });
  } catch {
    // En cas d'échec (CORS, mémoire, format exotique), on retombe sur l'original.
    return file;
  }
}
