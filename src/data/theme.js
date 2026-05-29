// Couleurs du site, éditables depuis l'admin (Réglages › Couleurs du site) et
// persistées dans site_settings (clé « theme », champ value.colors).
// Les clés sont les noms des variables CSS définies dans styles/global.css :root —
// elles sont appliquées telles quelles via documentElement.style.setProperty.

export const THEME_COLOR_GROUPS = [
  {
    label: "Fonds",
    fields: [
      { var: "--cream", label: "Fond principal" },
      { var: "--paper", label: "Cartes claires" },
      { var: "--cream-deep", label: "Beige (surfaces alternées)" },
    ],
  },
  {
    label: "Texte",
    fields: [
      { var: "--ink", label: "Texte principal" },
      { var: "--ink-soft", label: "Texte / sections sombres" },
      { var: "--muted", label: "Texte secondaire" },
    ],
  },
  {
    label: "Accent",
    fields: [
      { var: "--accent", label: "Accent (pêche)" },
      { var: "--accent-deep", label: "Accent foncé (survol)" },
      { var: "--terra-soft", label: "Accent clair (fonds doux)" },
    ],
  },
  {
    label: "Surfaces froides",
    fields: [
      { var: "--slate", label: "Slate" },
      { var: "--slate-soft", label: "Slate clair" },
      { var: "--slate-deep", label: "Slate foncé" },
    ],
  },
  {
    label: "Or / laiton",
    fields: [
      { var: "--brass", label: "Laiton" },
      { var: "--brass-soft", label: "Laiton clair" },
    ],
  },
  {
    label: "Couleurs héritées",
    fields: [
      { var: "--aqua", label: "Aqua" },
      { var: "--sunset", label: "Sunset" },
      { var: "--palm", label: "Palm" },
    ],
  },
  {
    label: "Bordures (avec transparence)",
    fields: [
      { var: "--line", label: "Ligne fine" },
      { var: "--line-strong", label: "Ligne marquée" },
    ],
  },
];

// Valeurs par défaut = palette de styles/global.css :root.
// Sert de repli quand la base ne contient pas encore de couleurs, et de cible
// pour le bouton « Réinitialiser » de l'éditeur.
export const DEFAULT_THEME_COLORS = {
  "--cream": "#F2EDE5",
  "--cream-deep": "#D8C7B3",
  "--paper": "#FAF6EE",
  "--ink": "#1F1F1F",
  "--ink-soft": "#3A2D27",
  "--muted": "#6b6157",
  "--line": "rgba(31, 31, 31, 0.10)",
  "--line-strong": "rgba(31, 31, 31, 0.22)",
  "--accent": "#F1B395",
  "--accent-deep": "#E89977",
  "--terra-soft": "#F8D7C3",
  "--slate": "#A9B6BF",
  "--slate-soft": "#C3CCD2",
  "--slate-deep": "#8A98A2",
  "--brass": "#c9a961",
  "--brass-soft": "#e0c994",
  "--aqua": "#5ec4d6",
  "--sunset": "#ffd166",
  "--palm": "#2a9d8f",
};

// Variables « alias » : pas éditables directement (pour ne pas surcharger l'UI),
// mais maintenues synchronisées sur leur couleur canonique afin que les anciennes
// règles CSS qui les utilisent (var(--terra), var(--bone)…) restent cohérentes.
export const COLOR_ALIASES = {
  "--accent": ["--terra"],
  "--accent-deep": ["--terra-deep"],
  "--cream-deep": ["--bone", "--sand"],
  "--brass": ["--gold"],
};

// Complète un mapping de couleurs canoniques avec ses alias dérivés.
export function expandThemeColors(colors) {
  if (!colors || typeof colors !== "object") return colors;
  const out = { ...colors };
  for (const [canonical, aliases] of Object.entries(COLOR_ALIASES)) {
    if (canonical in out && out[canonical]) {
      for (const alias of aliases) out[alias] = out[canonical];
    }
  }
  return out;
}

// Une valeur hex (#abc / #aabbcc) peut alimenter un <input type="color"> ;
// les autres (rgba, hsl…) ne sont éditables qu'en texte.
export function isHexColor(value) {
  return typeof value === "string" && /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value.trim());
}

// Applique un mapping { "--var": "valeur" } sur la racine du document.
export function applyThemeColors(colors) {
  if (!colors || typeof colors !== "object") return;
  const root = document.documentElement;
  for (const [name, value] of Object.entries(colors)) {
    if (name.startsWith("--") && typeof value === "string" && value.trim()) {
      root.style.setProperty(name, value);
    }
  }
}
