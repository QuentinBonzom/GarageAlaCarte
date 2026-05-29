// Édition « in-context » : dans l'aperçu de l'admin, on clique sur un texte du
// site pour le modifier sur place. Activé uniquement quand la page est affichée
// dans une iframe avec le flag ?cms=edit (donc jamais pour un visiteur public).
//
// Flux : clic → contentEditable → (Entrée/blur) commit :
//   1. mise à jour locale de CONTENT + event « cms:changed » (re-render immédiat de l'aperçu) ;
//   2. postMessage « cms_inline_edit » vers l'admin parent, qui persiste en base.

import { CONTENT } from "../data/content";
import { THEME_COLOR_GROUPS } from "../data/theme";

// Clé de section CMS (en base) → clé correspondante dans l'objet CONTENT rendu.
// Doit rester cohérent avec mergeCmsSections() dans contentRepository.js.
export const SECTION_TO_CONTENT_KEY = {
  nav: "nav",
  hero: "hero",
  hero_caption: "hero_caption",
  use_cases: "use_cases",
  before_after: "before_after",
  final_cta: "final_cta",
  services_intro: "services",
  contact_page: "contact",
};

// Attributs à poser sur un élément de texte éditable d'une SECTION CMS.
// fieldType : "text" (chaîne localisée) ou "lines" (tableau de lignes, ex. titre hero).
export function cmsAttr(sectionKey, field, fieldType = "text") {
  const attrs = { "data-cms": `${sectionKey}:${field}` };
  if (fieldType !== "text") attrs["data-cms-type"] = fieldType;
  return attrs;
}

// Attributs pour un texte éditable issu d'un ENREGISTREMENT (table dédiée :
// service, projet, membre d'équipe…). `id` est l'identifiant utilisé côté admin
// pour retrouver la ligne (ex. le slug du service), `field` la colonne en base.
export function cmsRecordAttr(recordType, id, field, fieldType = "text") {
  const attrs = { "data-cms-record": `${recordType}:${id}:${field}` };
  if (fieldType !== "text") attrs["data-cms-type"] = fieldType;
  return attrs;
}

export function isCmsEditMode() {
  try {
    return (
      window.self !== window.top &&
      new URLSearchParams(window.location.search).get("cms") === "edit"
    );
  } catch {
    return false;
  }
}

// Transforme le texte saisi en valeur stockée selon le type de champ.
export function parseCmsValue(fieldType, value) {
  if (fieldType === "lines") {
    return value
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
  }
  return value;
}

// Écrit une valeur localisée au bout d'un chemin (ex. "title", "form.name",
// "items.2.name"), de façon immuable : on clone chaque niveau traversé, on
// préserve les frères et l'autre langue. Les segments numériques = index de tableau.
// Le chemin peut contenir le jeton {lang} (ex. nav en « langue d'abord » :
// "{lang}.home" → content.en.home = valeur simple). Sans jeton, la feuille est
// un objet localisé et on écrit content[...][lang].
export function setLocalizedAtPath(root, path, lang, value, fieldType = "text") {
  const langFirst = String(path).includes("{lang}");
  const segments = String(path).replace(/\{lang\}/g, lang).split(".");
  const parsed = parseCmsValue(fieldType, value);

  const apply = (node, idx) => {
    const key = segments[idx];
    const container =
      node && typeof node === "object" ? node : /^\d+$/.test(key) ? [] : {};
    const last = idx === segments.length - 1;
    let nextValue;
    if (last) {
      if (langFirst) {
        nextValue = parsed; // la langue est déjà un segment du chemin
      } else {
        const cur = container[key];
        const base = cur && typeof cur === "object" && !Array.isArray(cur) ? cur : {};
        nextValue = { ...base, [lang]: parsed };
      }
    } else {
      nextValue = apply(container[key], idx + 1);
    }

    if (Array.isArray(container)) {
      const clone = container.slice();
      clone[Number(key)] = nextValue;
      return clone;
    }
    return { ...container, [key]: nextValue };
  };

  return apply(root, 0);
}

const EDIT_CSS = `
[data-cms]{cursor:text;outline:1px dashed transparent;outline-offset:3px;border-radius:3px;transition:outline-color .12s,background-color .12s;}
[data-cms]:hover{outline-color:var(--accent,#F1B395);background-color:rgba(241,179,149,.12);}
[data-cms].cms-editing{outline:2px solid var(--accent,#F1B395);background-color:rgba(241,179,149,.18);cursor:text;}
`;

let installed = false;

export function enableCmsInlineEdit() {
  if (installed) return;
  installed = true;

  const style = document.createElement("style");
  style.textContent = EDIT_CSS;
  document.head.appendChild(style);

  let editingEl = null;
  let originalText = "";
  let cancelled = false;

  const parseRef = (el) => {
    const fieldType = el.getAttribute("data-cms-type") || "text";
    const record = el.getAttribute("data-cms-record");
    if (record) {
      const [recordType, id, field] = record.split(":");
      return { kind: "record", recordType, id, field, fieldType };
    }
    const [sectionKey, field] = (el.getAttribute("data-cms") || "").split(":");
    return { kind: "section", sectionKey, field, fieldType };
  };

  const post = (msg) => {
    try {
      window.parent.postMessage(msg, window.location.origin);
    } catch {
      /* ignore */
    }
  };

  const selectAll = (el) => {
    const range = document.createRange();
    range.selectNodeContents(el);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  };

  const startEdit = (el) => {
    if (editingEl) finishEdit();
    editingEl = el;
    originalText = el.innerText;
    cancelled = false;
    el.setAttribute("contenteditable", "true");
    el.classList.add("cms-editing");
    el.focus();
    selectAll(el);
    post({ type: "cms_inline_focus", ...parseRef(el) });
  };

  const finishEdit = () => {
    if (!editingEl) return;
    const el = editingEl;
    editingEl = null;
    el.removeAttribute("contenteditable");
    el.classList.remove("cms-editing");

    if (cancelled) {
      el.innerText = originalText;
      return;
    }
    const value = el.innerText.replace(/ /g, " ").trim();
    if (value === originalText.trim() || !value) return;

    const ref = parseRef(el);
    const lang = document.body.dataset.cmsLang || "en";

    if (ref.kind === "record") {
      // Enregistrement (service, projet…) : pas de modèle local générique →
      // l'admin persiste puis demande un rafraîchissement de l'aperçu.
      post({
        type: "cms_record_edit",
        recordType: ref.recordType,
        id: ref.id,
        field: ref.field,
        fieldType: ref.fieldType,
        lang,
        value,
      });
      return;
    }

    // Section CMS — 1) mise à jour locale immédiate de l'aperçu
    const contentKey = SECTION_TO_CONTENT_KEY[ref.sectionKey];
    if (contentKey && CONTENT[contentKey] && ref.field) {
      CONTENT[contentKey] = setLocalizedAtPath(
        CONTENT[contentKey],
        ref.field,
        lang,
        value,
        ref.fieldType,
      );
      window.dispatchEvent(new CustomEvent("cms:changed"));
    }

    // 2) persistance via l'admin parent
    post({
      type: "cms_inline_edit",
      sectionKey: ref.sectionKey,
      field: ref.field,
      fieldType: ref.fieldType,
      lang,
      value,
    });
  };

  // Au démarrage d'une édition à l'intérieur d'un bouton/lien, on empêche
  // l'élément interactif de capter le focus (sinon la barre d'espace l'activerait
  // au lieu d'écrire). Le focus est ensuite posé sur le texte éditable.
  const EDITABLE = "[data-cms], [data-cms-record]";

  document.addEventListener(
    "mousedown",
    (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const el = target.closest(EDITABLE);
      if (el && el !== editingEl && el.closest("button, a")) {
        e.preventDefault();
      }
    },
    true,
  );

  document.addEventListener(
    "click",
    (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const el = target.closest(EDITABLE);
      if (el) {
        e.preventDefault();
        e.stopPropagation();
        if (el !== editingEl) startEdit(el);
        return;
      }
      // En mode édition, les boutons et liens sont neutralisés (pas de
      // navigation), SAUF ceux marqués data-cms-allow (ex. ouvrir/fermer une
      // popup, qu'on doit pouvoir utiliser pour éditer son contenu).
      const activatable = target.closest("button, a");
      if (activatable && !activatable.closest("[data-cms-allow]")) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    true,
  );

  document.addEventListener(
    "keydown",
    (e) => {
      if (editingEl) {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          editingEl.blur();
        } else if (e.key === "Escape") {
          e.preventDefault();
          cancelled = true;
          editingEl.blur();
        }
        // Les autres touches (dont Espace) écrivent normalement dans le texte.
        return;
      }
      // Hors édition : on désactive l'activation clavier des boutons/liens
      // (sauf data-cms-allow).
      const node = e.target;
      if (
        node instanceof Element &&
        (node.tagName === "BUTTON" || node.tagName === "A") &&
        !node.closest("[data-cms-allow]") &&
        (e.key === "Enter" || e.key === " " || e.key === "Spacebar")
      ) {
        e.preventDefault();
      }
    },
    true,
  );

  document.addEventListener(
    "focusout",
    (e) => {
      if (editingEl && e.target === editingEl) finishEdit();
    },
    true,
  );
}

/* ==========================================================================
   Mode « Couleurs » : dans l'aperçu de l'admin (?cms=colors), on clique un
   élément pour repérer quelles variables de couleur le pilotent (fond, texte,
   bordure), par correspondance avec les valeurs actuellement appliquées.
   ========================================================================== */

export function isCmsColorMode() {
  try {
    return (
      window.self !== window.top &&
      new URLSearchParams(window.location.search).get("cms") === "colors"
    );
  } catch {
    return false;
  }
}

const THEME_VARS = THEME_COLOR_GROUPS.flatMap((group) => group.fields.map((f) => f.var));

// Normalise n'importe quelle couleur CSS en chaîne « rgb(...) » comparable.
function normalizeColor(input) {
  if (!input) return null;
  const probe = document.createElement("span");
  probe.style.display = "none";
  probe.style.color = String(input).trim();
  document.body.appendChild(probe);
  const out = getComputedStyle(probe).color;
  probe.remove();
  return out || null;
}

function describeElement(el) {
  const tag = el.tagName.toLowerCase();
  const cls =
    typeof el.className === "string" && el.className.trim()
      ? "." + el.className.trim().split(/\s+/)[0]
      : "";
  return tag + cls;
}

// Repère les variables de thème en jeu sur l'élément cliqué.
// On remonte la hiérarchie pour les fonds : cliquer sur le libellé d'un bouton
// (fond transparent) doit quand même proposer le fond du bouton / de la section.
function inspectElementColors(el) {
  const root = getComputedStyle(document.documentElement);
  const valueToVar = {};
  for (const v of THEME_VARS) {
    const norm = normalizeColor(root.getPropertyValue(v));
    if (norm && !(norm in valueToVar)) valueToVar[norm] = v;
  }

  const matches = [];
  const seen = new Set();
  const add = (label, value) => {
    const norm = normalizeColor(value);
    if (!norm || norm === "rgba(0, 0, 0, 0)") return;
    const variable = valueToVar[norm];
    if (variable && !seen.has(variable)) {
      seen.add(variable);
      matches.push({ label, var: variable });
    }
  };

  const cs0 = getComputedStyle(el);
  add("Texte", cs0.color);
  if (cs0.borderTopStyle !== "none" && parseFloat(cs0.borderTopWidth) > 0) {
    add("Bordure", cs0.borderTopColor);
  }

  // Fonds, du plus proche (bouton) au plus large (section, page).
  let node = el;
  let depth = 0;
  while (node && node !== document.documentElement && depth < 6) {
    add("Fond", getComputedStyle(node).backgroundColor);
    node = node.parentElement;
    depth += 1;
  }

  return matches;
}

let colorPickInstalled = false;

export function enableCmsColorPick() {
  if (colorPickInstalled) return;
  colorPickInstalled = true;

  const post = (msg) => {
    try {
      window.parent.postMessage(msg, window.location.origin);
    } catch {
      /* ignore */
    }
  };

  // Surlignage de l'élément survolé.
  document.addEventListener(
    "mouseover",
    (e) => {
      const el = e.target;
      if (!(el instanceof HTMLElement)) return;
      el.style.outline = "2px solid var(--accent, #F1B395)";
      el.style.outlineOffset = "-2px";
    },
    true,
  );
  document.addEventListener(
    "mouseout",
    (e) => {
      const el = e.target;
      if (el instanceof HTMLElement) {
        el.style.outline = "";
        el.style.outlineOffset = "";
      }
    },
    true,
  );

  document.addEventListener(
    "click",
    (e) => {
      const el = e.target;
      if (!(el instanceof Element)) return;
      e.preventDefault();
      e.stopPropagation();
      post({
        type: "cms_color_pick",
        label: describeElement(el),
        matches: inspectElementColors(el),
      });
    },
    true,
  );

  // Signale à l'admin qu'on est prêt à recevoir l'aperçu live (couleurs + tailles).
  post({ type: "cms_color_ready" });
}
