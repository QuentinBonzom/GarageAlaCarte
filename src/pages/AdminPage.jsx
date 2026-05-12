import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { hydrateContentFromSupabase } from "../data/contentRepository";
import {
  createProject,
  createProjectImage,
  getAdminSession,
  loadAdminData,
  onAdminAuthChange,
  signInAdmin,
  signOutAdmin,
  updateCmsSection,
  createService,
  deleteService,
  updateContactChannel,
  updateContactSubmissionStatus,
  updateEmailLeadStatus,
  updateLegalDocument,
  updateLegalSection,
  updateProcessStep,
  updateProject,
  updateProjectImage,
  updateService,
  updateSiteSetting,
  updateTeamMember,
  uploadCmsImage,
  uploadProjectImageFile,
} from "../data/adminRepository";
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronRight,
  Code2,
  ExternalLink,
  Eye,
  EyeOff,
  FileText,
  Filter,
  FolderKanban,
  GripVertical,
  Image as ImageIcon,
  Inbox,
  Info,
  LayoutDashboard,
  ListOrdered,
  Loader2,
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  Pencil,
  Plus,
  RefreshCw,
  Scale,
  Settings,
  Trash2,
  Undo2,
  Upload,
  Users,
  Wrench,
  X,
  ZoomIn,
} from "lucide-react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Cropper from "react-easy-crop";

/* ==========================================================================
   Constants — preserved exactly from previous implementation
   ========================================================================== */

const EMPTY_ADMIN_DATA = {
  emailLeads: [],
  contactSubmissions: [],
  services: [],
  teamMembers: [],
  processSteps: [],
  projects: [],
  cmsSections: [],
  contactChannels: [],
  legalDocuments: [],
  legalSections: [],
  siteSettings: [],
  projectImages: [],
};

const STATUS_OPTIONS = ["new", "in_review", "replied", "archived", "spam"];
const LEAD_STATUS_OPTIONS = ["new", "subscribed", "exported", "unsubscribed", "archived"];
const PROJECT_STATUS_OPTIONS = ["live", "draft", "upcoming", "archived"];

const PAGE_LABELS = {
  global: "Global",
  home: "Accueil",
  projects: "Réalisations",
  contact: "Contact",
};

const SECTION_LABELS = {
  nav: "Navigation",
  hero: "Hero",
  hero_caption: "Légendes avant/après",
  marquee_words: "Bandeau mots",
  visual_strip: "Section 3D",
  before_after: "Avant / Après",
  services_intro: "Intro services",
  why: "Pourquoi nous",
  team_intro: "Intro équipe",
  audience: "Audiences",
  process_intro: "Intro process",
  final_cta: "CTA final",
  projects_page: "Page réalisations",
  contact_page: "Page contact",
  popup: "Popup email",
};

const FIELD_LABELS = {
  title: "Titre",
  subtitle: "Sous-titre",
  sub: "Texte secondaire",
  description: "Description",
  cta: "Bouton",
  primary_cta: "Bouton principal",
  secondary_cta: "Bouton secondaire",
  eyebrow: "Eyebrow",
  tagline: "Accroche",
  project_type: "Type de projet",
  size_label: "Taille",
  duration_label: "Durée",
  includes: "Inclus",
  value_points: "Points de valeur",
  why: "Pourquoi",
  name: "Nom",
  role: "Rôle",
  bio: "Bio",
  label: "Libellé",
  text: "Texte",
  body: "Texte",
  intro: "Introduction",
  form: "Formulaire",
  stats: "Statistiques",
  items: "Éléments",
  before_image: "Image avant",
  after_image: "Image après",
  image: "Image",
  featured_label: "Eyebrow projet phare",
  featured_title: "Titre projet phare",
  plan_image: "Image plan 3D (gauche)",
  mood_image: "Image ambiance / matières (haut droite)",
  interior_image: "Image vue intérieure 3D (bas droite)",
  homeowners_image: "Image carte 01 · Propriétaires",
  agents_image: "Image carte 02 · Agents immobiliers",
  developers_image: "Image carte 03 · Promoteurs",
};

const KNOWN_SECTION_DEFAULTS = {
  before_after: { before_image: "", after_image: "" },
  hero_caption: {
    image: "",
    featured_label: { en: "FEATURED PROJECT", fr: "PROJET PHARE" },
    featured_title: { en: "The Social Hub", fr: "The Social Hub" },
  },
  visual_strip: {
    plan_image: "",
    mood_image: "",
    interior_image: "",
  },
  audience: {
    homeowners_image: "",
    agents_image: "",
    developers_image: "",
  },
};

function isImageKey(key) {
  return /(^image$|_image$|image_url$|_url$)/i.test(key);
}

function withKnownDefaults(sectionKey, content) {
  const defaults = KNOWN_SECTION_DEFAULTS[sectionKey];
  if (!defaults || !isPlainObject(content)) return content;
  let result = content;
  for (const [key, value] of Object.entries(defaults)) {
    if (!(key in result)) {
      if (result === content) result = { ...content };
      result[key] = value;
    }
  }
  return result;
}

const CmsSectionContext = createContext({ sectionKey: null, commitImage: null });

const PROJECT_FIELDS = [
  "slug",
  "service_id",
  "name",
  "tagline",
  "project_type",
  "size_label",
  "duration_label",
  "year",
  "description",
  "includes",
  "value_points",
  "status",
  "is_featured",
  "is_large",
  "display_order",
];

const PROJECT_EDITABLE_FIELDS = [
  { key: "name", label: "Nom" },
  { key: "tagline", label: "Accroche" },
  { key: "project_type", label: "Type" },
  { key: "size_label", label: "Taille" },
  { key: "duration_label", label: "Durée" },
  { key: "description", label: "Description" },
  { key: "includes", label: "Inclus" },
  { key: "value_points", label: "Pourquoi ce projet compte" },
];

function buildNewServicePayload(existing = []) {
  const maxOrder = existing.reduce(
    (acc, item) => Math.max(acc, Number(item.display_order) || 0),
    0,
  );
  const nextNumber = String(existing.length + 1).padStart(2, "0");
  const slug = `service-${Date.now().toString(36)}`;
  return {
    slug,
    service_number: nextNumber,
    title: { en: "New service", fr: "Nouveau service" },
    subtitle: { en: "", fr: "" },
    description: { en: "", fr: "" },
    price_label: { en: "", fr: "" },
    includes: { en: [], fr: [] },
    display_order: maxOrder + 10,
    is_active: true,
  };
}

const SERVICE_FIELDS = [
  { key: "service_number", label: "Numéro" },
  { key: "slug", label: "Slug" },
  { key: "title", label: "Titre" },
  { key: "subtitle", label: "Sous-titre" },
  { key: "description", label: "Description" },
  { key: "price_label", label: "Prix" },
  { key: "badge_label", label: "Badge", fallback: { en: "", fr: "" }, optionalLocalized: true },
  { key: "tag_label", label: "Tag", fallback: { en: "", fr: "" }, optionalLocalized: true },
  { key: "includes", label: "Inclus" },
  { key: "not_included", label: "Non inclus", fallback: { en: "", fr: "" }, optionalLocalized: true },
  { key: "deposit_schedule", label: "Paiement", fallback: { en: "", fr: "" }, optionalLocalized: true },
  { key: "onsite_label", label: "Option sur site", fallback: { en: "", fr: "" }, optionalLocalized: true },
  { key: "display_order", label: "Ordre", type: "number" },
  { key: "is_active", label: "Visible", type: "checkbox" },
];

const TEAM_FIELDS = [
  { key: "name", label: "Nom" },
  { key: "role", label: "Rôle" },
  { key: "bio", label: "Bio" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Téléphone" },
  { key: "avatar_url", label: "Photo URL" },
  { key: "display_order", label: "Ordre", type: "number" },
  { key: "is_active", label: "Visible", type: "checkbox" },
];

const PROCESS_FIELDS = [
  { key: "step_number", label: "Numéro", type: "number" },
  { key: "title", label: "Titre" },
  { key: "description", label: "Description" },
  { key: "display_order", label: "Ordre", type: "number" },
  { key: "is_active", label: "Visible", type: "checkbox" },
];

const LEGAL_DOCUMENT_FIELDS = [
  { key: "title", label: "Titre" },
  { key: "intro", label: "Introduction" },
  { key: "is_active", label: "Visible", type: "checkbox" },
];

const LEGAL_SECTION_FIELDS = [
  { key: "section_number", label: "Numéro", type: "number" },
  { key: "title", label: "Titre" },
  { key: "body", label: "Texte" },
  { key: "display_order", label: "Ordre", type: "number" },
  { key: "is_active", label: "Visible", type: "checkbox" },
];

const CONTACT_CHANNEL_FIELDS = [
  { key: "channel_key", label: "Clé" },
  { key: "channel_type", label: "Type", type: "select", options: ["email", "phone", "address", "social", "service_area", "other"] },
  { key: "label", label: "Libellé" },
  { key: "value", label: "Valeur" },
  { key: "href", label: "Lien" },
  { key: "display_order", label: "Ordre", type: "number" },
  { key: "is_active", label: "Visible", type: "checkbox" },
];

const SITE_SETTING_FIELDS = [
  { key: "value", label: "Valeur" },
  { key: "description", label: "Description" },
];

const PAGE_ROUTE = { home: "home", projects: "projects", contact: "contact", global: "home" };

const MESSAGE_FILTERS = [
  { id: "all", label: "Tous" },
  { id: "new", label: "Nouveau" },
  { id: "in_review", label: "En revue" },
  { id: "replied", label: "Répondu" },
  { id: "archived", label: "Archivé" },
];

/* ==========================================================================
   Helpers — preserved exactly + a couple of new ones
   ========================================================================== */

function text(value, lang = "en", fallback = "—") {
  if (!value) return fallback;
  if (typeof value === "string") return value;
  return value[lang] || value.en || value.fr || fallback;
}

function formatDate(value) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function exportCsv(filename, rows) {
  const csv = rows
    .map((row) => row.map((cell) => `"${String(cell ?? "").replaceAll('"', '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function pageSort(key) {
  return ["global", "home", "projects", "contact"].indexOf(key) === -1
    ? 99
    : ["global", "home", "projects", "contact"].indexOf(key);
}

function humanize(key) {
  return String(key || "")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function clone(value) {
  return value == null ? value : JSON.parse(JSON.stringify(value));
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isLocalizedObject(value) {
  if (!isPlainObject(value)) return false;
  const keys = Object.keys(value);
  return keys.length > 0 && keys.every((key) => key === "en" || key === "fr") && ("en" in value || "fr" in value);
}

function pickFields(record, fields) {
  return fields.reduce((acc, field) => {
    acc[field.key || field] = clone(record[field.key || field]);
    return acc;
  }, {});
}

function normalizeNumericFields(draft, fields) {
  return fields.reduce((acc, field) => {
    const key = field.key || field;
    if (field.type === "number") {
      acc[key] = Number(draft[key] || 0);
    } else if (field.optionalLocalized && isEmptyLocalized(draft[key])) {
      acc[key] = null;
    } else {
      acc[key] = draft[key];
    }
    return acc;
  }, {});
}

function getRecordId(record) {
  return record.id || record.key;
}

function isEmptyLocalized(value) {
  return isLocalizedObject(value) && !String(value.en || "").trim() && !String(value.fr || "").trim();
}

function deepEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return a === b;
  if (typeof a !== typeof b) return false;
  if (typeof a !== "object") return a === b;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;
  return aKeys.every((key) => deepEqual(a[key], b[key]));
}

function startOfWeek() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - date.getDay());
  return date;
}

function isThisWeek(value) {
  if (!value) return false;
  return new Date(value) >= startOfWeek();
}

/* ==========================================================================
   Toast system
   ========================================================================== */

const ToastContext = createContext({ push: () => {}, dismiss: () => {} });
const useToast = () => useContext(ToastContext);

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const push = useCallback(
    (toast) => {
      const id = Math.random().toString(36).slice(2);
      const next = { id, type: "info", duration: 4000, ...toast };
      setToasts((current) => [...current, next]);
      if (next.duration > 0) setTimeout(() => dismiss(id), next.duration);
      return id;
    },
    [dismiss],
  );

  const value = useMemo(() => ({ push, dismiss }), [push, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

const TOAST_STYLES = {
  success: { bg: "#1f8a5a", icon: Check },
  error: { bg: "var(--accent-deep)", icon: AlertCircle },
  info: { bg: "var(--ink)", icon: Info },
};

function ToastViewport({ toasts, onDismiss }) {
  return (
    <div
      style={{
        position: "fixed",
        right: "20px",
        bottom: "20px",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        pointerEvents: "none",
      }}
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onDismiss }) {
  const cfg = TOAST_STYLES[toast.type] || TOAST_STYLES.info;
  const Icon = cfg.icon;
  return (
    <div
      style={{
        pointerEvents: "auto",
        background: cfg.bg,
        color: "var(--cream)",
        borderRadius: "12px",
        padding: "14px 16px",
        minWidth: "280px",
        maxWidth: "380px",
        boxShadow: "0 14px 40px rgba(10, 37, 64, 0.22)",
        display: "flex",
        gap: "12px",
        alignItems: "flex-start",
        animation: "toastIn 220ms cubic-bezier(.2,.7,.3,1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Icon size={18} style={{ flexShrink: 0, marginTop: "2px" }} />
      <div style={{ flex: 1, fontSize: "14px", lineHeight: 1.4 }}>
        {toast.title && <div style={{ fontWeight: 600, marginBottom: "2px" }}>{toast.title}</div>}
        {toast.message && <div style={{ opacity: 0.85 }}>{toast.message}</div>}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        style={{
          background: "transparent",
          border: 0,
          color: "var(--cream)",
          opacity: 0.7,
          padding: 0,
          display: "flex",
          cursor: "pointer",
        }}
        aria-label="Dismiss"
      >
        <X size={16} />
      </button>
      {toast.duration > 0 && (
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            height: "2px",
            background: "rgba(255,255,255,0.5)",
            width: "100%",
            transformOrigin: "left",
            animation: `toastBar ${toast.duration}ms linear forwards`,
          }}
        />
      )}
    </div>
  );
}

/* ==========================================================================
   Confirm dialog
   ========================================================================== */

const ConfirmContext = createContext({ confirm: async () => true });
const useConfirm = () => useContext(ConfirmContext);

function ConfirmProvider({ children }) {
  const [state, setState] = useState(null);
  const resolverRef = useRef(null);

  const confirm = useCallback((options) => {
    return new Promise((resolve) => {
      resolverRef.current = resolve;
      setState({
        title: "Vous avez des modifications non sauvegardées",
        message: "Voulez-vous vraiment quitter sans enregistrer ?",
        confirmLabel: "Abandonner",
        cancelLabel: "Continuer l'édition",
        tone: "danger",
        ...(options || {}),
      });
    });
  }, []);

  const close = (result) => {
    setState(null);
    if (resolverRef.current) {
      resolverRef.current(result);
      resolverRef.current = null;
    }
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      {state && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1100,
            background: "rgba(10, 37, 64, 0.55)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            animation: "fadeIn 180ms ease",
          }}
          onClick={() => close(false)}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            style={{
              background: "var(--paper)",
              borderRadius: "18px",
              padding: "28px",
              maxWidth: "440px",
              width: "100%",
              boxShadow: "0 30px 80px rgba(10, 37, 64, 0.3)",
            }}
          >
            <div style={{ fontFamily: "var(--serif)", fontSize: "22px", letterSpacing: "-0.02em", marginBottom: "8px" }}>
              {state.title}
            </div>
            <div style={{ color: "var(--ink-soft)", fontSize: "14px", lineHeight: 1.55 }}>{state.message}</div>
            <div style={{ display: "flex", gap: "10px", marginTop: "24px", justifyContent: "flex-end" }}>
              <button className="btn btn-ghost" onClick={() => close(false)}>
                {state.cancelLabel}
              </button>
              <button
                className="btn"
                onClick={() => close(true)}
                style={state.tone === "danger" ? { background: "var(--accent)" } : undefined}
              >
                {state.confirmLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
}

/* ==========================================================================
   Navigation guard — registers per-editor dirty state and gates tab changes
   ========================================================================== */

const NavGuardContext = createContext({
  register: () => () => {},
  hasDirty: () => false,
  requestNav: async () => true,
});

function NavGuardProvider({ children }) {
  const guards = useRef(new Set());
  const { confirm } = useConfirm();

  const register = useCallback((guard) => {
    guards.current.add(guard);
    return () => guards.current.delete(guard);
  }, []);

  const hasDirty = useCallback(() => {
    return [...guards.current].some((guard) => guard());
  }, []);

  const requestNav = useCallback(async () => {
    if (!hasDirty()) return true;
    return confirm();
  }, [confirm, hasDirty]);

  useEffect(() => {
    const handler = (event) => {
      if (hasDirty()) {
        event.preventDefault();
        event.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [hasDirty]);

  const value = useMemo(() => ({ register, hasDirty, requestNav }), [register, hasDirty, requestNav]);

  return <NavGuardContext.Provider value={value}>{children}</NavGuardContext.Provider>;
}

const useNavGuard = () => useContext(NavGuardContext);

/* ==========================================================================
   Editor hook — owns draft, dirty, undo history, save state machine
   ========================================================================== */

function useEditorState(initial) {
  const [draft, setDraft] = useState(() => clone(initial));
  const [history, setHistory] = useState([]);
  const [saveState, setSaveState] = useState({ status: "idle", error: "" });
  const initialRef = useRef(clone(initial));
  const guard = useNavGuard();

  useEffect(() => {
    initialRef.current = clone(initial);
    setDraft(clone(initial));
    setHistory([]);
    setSaveState({ status: "idle", error: "" });
  }, [initial]);

  const isDirty = useMemo(() => !deepEqual(draft, initialRef.current), [draft]);

  useEffect(() => {
    return guard.register(() => isDirty);
  }, [guard, isDirty]);

  useEffect(() => {
    if (saveState.status !== "success") return;
    const timer = setTimeout(() => setSaveState({ status: "idle", error: "" }), 1500);
    return () => clearTimeout(timer);
  }, [saveState.status]);

  const updateDraft = useCallback((updater) => {
    setDraft((current) => {
      const next = typeof updater === "function" ? updater(current) : updater;
      if (deepEqual(next, current)) return current;
      setHistory((prev) => [...prev.slice(-19), current]);
      return next;
    });
  }, []);

  const undo = useCallback(() => {
    setHistory((prev) => {
      if (!prev.length) return prev;
      const next = prev.slice(0, -1);
      const previous = prev[prev.length - 1];
      setDraft(previous);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setDraft(clone(initialRef.current));
    setHistory([]);
  }, []);

  const wrapSave = useCallback(
    async (saveFn) => {
      setSaveState({ status: "saving", error: "" });
      try {
        await saveFn();
        initialRef.current = clone(draft);
        setHistory([]);
        setSaveState({ status: "success", error: "" });
        return true;
      } catch (err) {
        setSaveState({ status: "error", error: err.message || "Erreur" });
        return false;
      }
    },
    [draft],
  );

  useEffect(() => {
    const handler = (event) => {
      const isUndo = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "z" && !event.shiftKey;
      if (!isUndo) return;
      const target = event.target;
      const editingText = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      if (editingText) return;
      if (history.length === 0) return;
      event.preventDefault();
      undo();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [history.length, undo]);

  return {
    draft,
    setDraft: updateDraft,
    isDirty,
    history,
    canUndo: history.length > 0,
    undo,
    reset,
    saveState,
    wrapSave,
  };
}

/* ==========================================================================
   Public component
   ========================================================================== */

export function AdminPage({ onNav }) {
  return (
    <ConfirmProvider>
      <ToastProvider>
        <NavGuardProvider>
          <AdminPageInner onNav={onNav} />
          <GlobalStyles />
        </NavGuardProvider>
      </ToastProvider>
    </ConfirmProvider>
  );
}

function GlobalStyles() {
  return (
    <style>{`
      @keyframes toastIn { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      @keyframes toastBar { from { transform: scaleX(1); } to { transform: scaleX(0); } }
      @keyframes spin { to { transform: rotate(360deg); } }
      @keyframes pulseAdmin { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      .admin-spin { animation: spin 0.9s linear infinite; }
      .admin-nav-button { transition: background 160ms ease, color 160ms ease; cursor: pointer; }
      .admin-nav-button:hover { background: var(--cream-deep); }
      .admin-nav-button[data-active="true"] { background: var(--ink); color: var(--cream); }
      .admin-nav-button[data-active="true"]:hover { background: var(--ink); }
      .admin-icon-btn { background: transparent; border: 0; padding: 6px; border-radius: 8px; color: var(--muted); display: inline-flex; cursor: pointer; transition: background 140ms ease, color 140ms ease; }
      .admin-icon-btn:hover:not(:disabled) { background: var(--cream-deep); color: var(--ink); }
      .admin-icon-btn:disabled { opacity: 0.35; cursor: default; }
      .admin-input { width: 100%; border: 1px solid var(--line); border-radius: 10px; padding: 10px 12px; background: var(--paper); color: var(--ink); font-family: var(--sans); font-size: 14px; box-sizing: border-box; }
      .admin-input:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px rgba(255, 94, 91, 0.16); }
      .admin-image-card .admin-image-overlay { opacity: 0; transition: opacity 160ms ease; }
      .admin-image-card:hover .admin-image-overlay { opacity: 1; }
      .admin-toggle-track { transition: background 160ms ease; }
      .admin-toggle-knob { transition: transform 200ms cubic-bezier(.2,.7,.3,1); }
      .admin-pulse-dot { animation: pulseAdmin 1.6s ease-in-out infinite; }
    `}</style>
  );
}

function AdminPageInner({ onNav }) {
  const [session, setSession] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [loadingData, setLoadingData] = useState(false);
  const [data, setData] = useState(EMPTY_ADMIN_DATA);
  const [tab, setTab] = useState("dashboard");
  const [error, setError] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const { push: pushToast } = useToast();
  const guard = useNavGuard();

  const refresh = useCallback(async () => {
    setLoadingData(true);
    setError("");
    try {
      setData(await loadAdminData());
      try {
        await hydrateContentFromSupabase();
      } catch (contentError) {
        console.warn("Site content refresh failed:", contentError.message);
      }
    } catch (err) {
      setError(err.message);
      pushToast({ type: "error", title: "Chargement impossible", message: err.message });
    } finally {
      setLoadingData(false);
    }
  }, [pushToast]);

  useEffect(() => {
    let mounted = true;

    getAdminSession()
      .then((nextSession) => {
        if (mounted) setSession(nextSession);
      })
      .catch((err) => {
        if (mounted) setError(err.message);
      })
      .finally(() => {
        if (mounted) setCheckingSession(false);
      });

    const unsubscribe = onAdminAuthChange((nextSession) => setSession(nextSession));
    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (session) refresh();
  }, [session, refresh]);

  const requestTab = useCallback(
    async (next) => {
      if (next === tab) return;
      const allow = await guard.requestNav();
      if (allow) setTab(next);
    },
    [tab, guard],
  );

  const signOut = useCallback(async () => {
    const allow = await guard.requestNav();
    if (!allow) return;
    await signOutAdmin();
    setSession(null);
    setData(EMPTY_ADMIN_DATA);
  }, [guard]);

  if (checkingSession) return <SplashScreen message="Vérification de la session admin..." />;
  if (!session) return <AdminLogin onSignedIn={setSession} />;

  const newMessageCount = data.contactSubmissions.filter((item) => item.status === "new").length;

  return (
    <div style={{ minHeight: "100vh", background: "var(--paper)", display: "flex" }}>
      <Sidebar
        tab={tab}
        onTab={requestTab}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((value) => !value)}
        session={session}
        onSignOut={signOut}
        onNavHome={() => onNav("home")}
        onRefresh={refresh}
        loadingData={loadingData}
        badges={{ messages: newMessageCount }}
      />
      <main
        style={{
          flex: 1,
          minWidth: 0,
          padding: "32px 40px 64px",
          maxHeight: "100vh",
          overflowY: "auto",
        }}
      >
        {error && <Notice tone="error" text={error} />}
        {tab === "dashboard" && (
          <Dashboard data={data} loadingData={loadingData} onTab={requestTab} />
        )}
        {tab === "pages" && <PagesAdmin data={data} onRefresh={refresh} />}
        {tab === "projects" && <ProjectsAdmin data={data} onRefresh={refresh} />}
        {tab === "services" && (
          <RecordCollectionAdmin
            title="Services"
            sub="Modifier, ajouter ou retirer les cartes services affichées sur l'accueil"
            records={data.services}
            fields={SERVICE_FIELDS}
            getLabel={(service) => text(service.title)}
            getMeta={(service) => service.slug}
            onSave={(id, payload) => updateService(id, payload)}
            onRefresh={refresh}
            onCreate={() => createService(buildNewServicePayload(data.services))}
            onDelete={(id) => deleteService(id)}
            createLabel="Ajouter un service"
            deleteConfirm="Supprimer ce service ? Cette action est définitive."
          />
        )}
        {tab === "team" && (
          <RecordCollectionAdmin
            title="Team"
            sub="Modifier les personnes affichées sur le site"
            records={data.teamMembers}
            fields={TEAM_FIELDS}
            getLabel={(member) => member.name}
            getMeta={(member) => text(member.role)}
            onSave={(id, payload) => updateTeamMember(id, payload)}
            onRefresh={refresh}
          />
        )}
        {tab === "process" && (
          <RecordCollectionAdmin
            title="Process"
            sub="Modifier les étapes affichées sur l'accueil"
            records={data.processSteps}
            fields={PROCESS_FIELDS}
            getLabel={(step) => text(step.title)}
            getMeta={(step) => `Step ${step.step_number}`}
            onSave={(id, payload) => updateProcessStep(id, payload)}
            onRefresh={refresh}
          />
        )}
        {tab === "messages" && <MessagesAdmin data={data} onRefresh={refresh} />}
        {tab === "emails" && <EmailsAdmin data={data} onRefresh={refresh} />}
        {tab === "legal" && <LegalAdmin data={data} onRefresh={refresh} />}
        {tab === "settings" && <SettingsAdmin data={data} onRefresh={refresh} />}
      </main>
    </div>
  );
}

/* ==========================================================================
   Sidebar
   ========================================================================== */

const NAV_GROUPS = [
  {
    title: "Système",
    items: [{ id: "dashboard", label: "Dashboard", icon: LayoutDashboard, badgeKey: "messages" }],
  },
  {
    title: "Contenu",
    items: [
      { id: "pages", label: "Pages", icon: FileText },
      { id: "projects", label: "Projets", icon: FolderKanban },
      { id: "services", label: "Services", icon: Wrench },
      { id: "team", label: "Équipe", icon: Users },
      { id: "process", label: "Process", icon: ListOrdered },
      { id: "legal", label: "Mentions légales", icon: Scale },
    ],
  },
  {
    title: "Données",
    items: [
      { id: "messages", label: "Messages", icon: MessageSquare, badgeKey: "messages" },
      { id: "emails", label: "Email leads", icon: Mail },
      { id: "settings", label: "Réglages", icon: Settings },
    ],
  },
];

function Sidebar({
  tab,
  onTab,
  collapsed,
  onToggleCollapse,
  session,
  onSignOut,
  onNavHome,
  onRefresh,
  loadingData,
  badges,
}) {
  const width = collapsed ? "76px" : "260px";
  return (
    <aside
      style={{
        width,
        flexShrink: 0,
        borderRight: "1px solid var(--line)",
        background: "var(--cream)",
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
        height: "100vh",
        transition: "width 180ms ease",
      }}
    >
      <div
        style={{
          padding: collapsed ? "20px 12px" : "22px 20px",
          borderBottom: "1px solid var(--line)",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          justifyContent: collapsed ? "center" : "space-between",
        }}
      >
        {!collapsed && (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg, var(--sunset) 0%, var(--accent) 60%, var(--aqua) 120%)",
                boxShadow: "0 6px 14px rgba(255, 94, 91, 0.32)",
                position: "relative",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  inset: "6px",
                  border: "1.5px solid var(--cream)",
                  borderRadius: "50%",
                }}
              />
            </span>
            <div>
              <div style={{ fontFamily: "var(--serif)", fontSize: "18px", letterSpacing: "-0.02em", lineHeight: 1 }}>
                Garage
              </div>
              <div className="text-mono text-muted" style={{ fontSize: "10px", marginTop: "3px" }}>
                Admin
              </div>
            </div>
          </div>
        )}
        <button onClick={onToggleCollapse} className="admin-icon-btn" aria-label="Toggle sidebar">
          <Menu size={16} />
        </button>
      </div>

      <nav style={{ flex: 1, overflowY: "auto", padding: "16px 12px" }}>
        {NAV_GROUPS.map((group) => (
          <div key={group.title} style={{ marginBottom: "18px" }}>
            {!collapsed && (
              <div
                className="text-mono text-muted"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.18em",
                  padding: "0 10px",
                  marginBottom: "6px",
                  textTransform: "uppercase",
                }}
              >
                {group.title}
              </div>
            )}
            {group.items.map((item) => (
              <SidebarButton
                key={item.id}
                item={item}
                active={tab === item.id}
                collapsed={collapsed}
                onClick={() => onTab(item.id)}
                badge={item.badgeKey ? badges[item.badgeKey] : 0}
              />
            ))}
          </div>
        ))}
      </nav>

      <div
        style={{
          padding: collapsed ? "12px 8px" : "14px 14px",
          borderTop: "1px solid var(--line)",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}
      >
        <SidebarSecondary
          collapsed={collapsed}
          icon={RefreshCw}
          label={loadingData ? "Actualisation..." : "Actualiser"}
          onClick={onRefresh}
          disabled={loadingData}
          spinning={loadingData}
        />
        <SidebarSecondary collapsed={collapsed} icon={ExternalLink} label="Voir le site" onClick={onNavHome} />
        {!collapsed ? (
          <div
            style={{
              marginTop: "8px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px",
              borderRadius: "10px",
              background: "var(--paper)",
              border: "1px solid var(--line)",
            }}
          >
            <span
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "var(--ink)",
                color: "var(--cream)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--mono)",
                fontSize: "12px",
                textTransform: "uppercase",
                flexShrink: 0,
              }}
            >
              {session?.user?.email?.[0] || "?"}
            </span>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {session?.user?.email || "Admin"}
              </div>
              <div className="text-mono text-muted" style={{ fontSize: "10px" }}>
                Connecté
              </div>
            </div>
            <button onClick={onSignOut} className="admin-icon-btn" aria-label="Sign out" title="Sign out">
              <LogOut size={14} />
            </button>
          </div>
        ) : (
          <SidebarSecondary collapsed icon={LogOut} label="Sign out" onClick={onSignOut} />
        )}
      </div>
    </aside>
  );
}

function SidebarButton({ item, active, collapsed, onClick, badge }) {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      className="admin-nav-button"
      data-active={active ? "true" : "false"}
      title={collapsed ? item.label : undefined}
      style={{
        position: "relative",
        width: "100%",
        textAlign: "left",
        background: "transparent",
        border: 0,
        padding: collapsed ? "10px" : "9px 10px",
        borderRadius: "10px",
        color: "var(--ink)",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        fontSize: "13px",
        fontFamily: "var(--sans)",
        marginBottom: "2px",
        justifyContent: collapsed ? "center" : "flex-start",
      }}
    >
      <Icon size={17} style={{ flexShrink: 0 }} />
      {!collapsed && (
        <>
          <span style={{ flex: 1 }}>{item.label}</span>
          {badge > 0 && (
            <span
              style={{
                background: active ? "var(--cream)" : "var(--accent)",
                color: active ? "var(--ink)" : "var(--cream)",
                fontFamily: "var(--mono)",
                fontSize: "10px",
                padding: "2px 7px",
                borderRadius: "100px",
                fontWeight: 600,
              }}
            >
              {badge}
            </span>
          )}
        </>
      )}
      {collapsed && badge > 0 && (
        <span
          style={{
            position: "absolute",
            top: 6,
            right: 6,
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "var(--accent)",
          }}
        />
      )}
    </button>
  );
}

function SidebarSecondary({ collapsed, icon: Icon, label, onClick, disabled, spinning }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="admin-nav-button"
      title={collapsed ? label : undefined}
      style={{
        width: "100%",
        background: "transparent",
        border: 0,
        padding: collapsed ? "10px" : "9px 10px",
        borderRadius: "10px",
        color: "var(--muted)",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        fontSize: "12px",
        fontFamily: "var(--sans)",
        textAlign: "left",
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? "default" : "pointer",
        justifyContent: collapsed ? "center" : "flex-start",
      }}
    >
      <Icon size={15} className={spinning ? "admin-spin" : undefined} style={{ flexShrink: 0 }} />
      {!collapsed && <span>{label}</span>}
    </button>
  );
}

/* ==========================================================================
   Splash & login
   ========================================================================== */

function SplashScreen({ message }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "var(--ink)",
        color: "var(--cream)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Loader2 size={18} className="admin-spin" />
        <span className="text-mono">{message}</span>
      </div>
    </div>
  );
}

function AdminLogin({ onSignedIn }) {
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      onSignedIn(await signInAdmin({ password }));
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "linear-gradient(135deg, #0a2540 0%, #16365b 60%, #ff5e5b 200%)",
      }}
    >
      <div
        style={{
          background: "var(--paper)",
          borderRadius: "24px",
          padding: "44px",
          maxWidth: "440px",
          width: "100%",
          boxShadow: "0 30px 80px rgba(10, 37, 64, 0.45)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
          <span
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, var(--sunset) 0%, var(--accent) 60%, var(--aqua) 120%)",
              boxShadow: "0 6px 18px rgba(255, 94, 91, 0.36)",
              position: "relative",
            }}
          >
            <span
              style={{
                position: "absolute",
                inset: "8px",
                border: "1.5px solid var(--cream)",
                borderRadius: "50%",
              }}
            />
          </span>
          <div>
            <div className="text-mono" style={{ color: "var(--accent)", fontSize: "10px" }}>
              ADMIN · ACCÈS PRIVÉ
            </div>
            <div style={{ fontFamily: "var(--serif)", fontSize: "24px", letterSpacing: "-0.02em" }}>
              Garage à la Carte
            </div>
          </div>
        </div>
        <p style={{ color: "var(--muted)", fontSize: "14px", marginBottom: "28px", lineHeight: 1.5 }}>
          L'accès utilise un compte Supabase admin configuré côté projet. Tu n'as qu'un mot de passe à saisir.
        </p>
        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div className="field">
            <label>Mot de passe admin</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoFocus
            />
          </div>
          {error && <Notice tone="error" text={error} />}
          <button type="submit" className="btn" style={{ justifyContent: "center" }} disabled={submitting}>
            {submitting ? "Connexion..." : "Entrer dans l'admin"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ==========================================================================
   Dashboard
   ========================================================================== */

function Dashboard({ data, loadingData, onTab }) {
  const newMessages = data.contactSubmissions.filter((item) => item.status === "new");
  const liveProjects = data.projects.filter((item) => item.status === "live");
  const activeServices = data.services.filter((item) => item.is_active !== false);
  const leadsThisWeek = data.emailLeads.filter((lead) => isThisWeek(lead.captured_at)).length;
  const newRequests = data.contactSubmissions.filter((item) => isThisWeek(item.submitted_at)).length;

  const recent = useMemo(() => {
    const messages = data.contactSubmissions.map((item) => ({
      type: "Contact",
      label: `${item.name} · ${item.service_slug}`,
      date: item.submitted_at,
      color: "var(--accent)",
      icon: MessageSquare,
    }));
    const leads = data.emailLeads.map((item) => ({
      type: "Email lead",
      label: item.email,
      date: item.captured_at,
      color: "var(--brass)",
      icon: Mail,
    }));
    return [...messages, ...leads]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 8);
  }, [data]);

  const quickActions = [
    { label: "Ajouter un projet", icon: Plus, target: "projects" },
    { label: "Voir les nouveaux messages", icon: MessageSquare, target: "messages" },
    { label: "Modifier la page d'accueil", icon: FileText, target: "pages" },
  ];

  return (
    <div>
      <PageHead title="Dashboard" sub="Données en direct depuis Supabase" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "14px",
          marginTop: "24px",
        }}
      >
        <KpiCard
          icon={Mail}
          label="Email leads"
          value={data.emailLeads.length}
          delta={leadsThisWeek > 0 ? `+${leadsThisWeek} cette semaine` : "—"}
          tint="var(--brass)"
        />
        <KpiCard
          icon={MessageSquare}
          label="Demandes contact"
          value={data.contactSubmissions.length}
          delta={newRequests > 0 ? `+${newRequests} cette semaine` : "—"}
          tint="var(--accent)"
        />
        <KpiCard icon={Inbox} label="Nouvelles" value={newMessages.length} delta="à traiter" tint="var(--accent-deep)" />
        <KpiCard icon={FolderKanban} label="Projets live" value={liveProjects.length} delta="visibles" tint="var(--palm)" />
        <KpiCard icon={Wrench} label="Services actifs" value={activeServices.length} delta="cartes accueil" tint="var(--aqua)" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "16px", marginTop: "24px" }}>
        <Panel title="Activité récente">
          {loadingData && !recent.length ? (
            <SkeletonList rows={4} />
          ) : recent.length ? (
            recent.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={`${item.type}-${item.date}-${item.label}`}
                  style={{
                    display: "flex",
                    gap: "14px",
                    padding: "12px 0",
                    borderBottom: "1px solid var(--line)",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "8px",
                      background: "var(--cream-deep)",
                      color: item.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={15} />
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "13px", fontWeight: 500 }}>{item.type}</div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "var(--muted)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.label}
                    </div>
                  </div>
                  <span className="text-mono text-muted" style={{ fontSize: "10px" }}>
                    {formatDate(item.date)}
                  </span>
                </div>
              );
            })
          ) : (
            <EmptyState text="Aucune activité pour l'instant." />
          )}
        </Panel>

        <Panel title="Actions rapides">
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  onClick={() => onTab(action.target)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "14px",
                    border: "1px solid var(--line)",
                    borderRadius: "12px",
                    background: "var(--paper)",
                    color: "var(--ink)",
                    fontSize: "13px",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "8px",
                      background: "var(--cream-deep)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={15} />
                  </span>
                  <span style={{ flex: 1 }}>{action.label}</span>
                  <ArrowUpRight size={14} style={{ color: "var(--muted)" }} />
                </button>
              );
            })}
          </div>
        </Panel>
      </div>
    </div>
  );
}

function KpiCard({ icon: Icon, label, value, delta, tint }) {
  return (
    <div
      style={{
        background: "var(--paper)",
        border: "1px solid var(--line)",
        borderRadius: "14px",
        padding: "18px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "10px",
          background: "var(--cream-deep)",
          color: tint,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "14px",
        }}
      >
        <Icon size={16} />
      </div>
      <div className="text-mono text-muted" style={{ fontSize: "10px" }}>
        {label}
      </div>
      <div
        style={{
          fontFamily: "var(--serif)",
          fontSize: "40px",
          letterSpacing: "-0.03em",
          lineHeight: 1,
          marginTop: "6px",
        }}
      >
        {value}
      </div>
      <div style={{ marginTop: "8px", fontSize: "11px", color: "var(--muted)" }}>{delta}</div>
    </div>
  );
}

function SkeletonList({ rows = 3 }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          style={{
            height: "44px",
            background:
              "linear-gradient(90deg, var(--cream-deep) 0%, var(--cream) 50%, var(--cream-deep) 100%)",
            borderRadius: "10px",
            animation: "pulseAdmin 1.6s ease-in-out infinite",
          }}
        />
      ))}
    </div>
  );
}

/* ==========================================================================
   Messages tab
   ========================================================================== */

function MessagesAdmin({ data, onRefresh }) {
  const messages = data.contactSubmissions;
  const [filter, setFilter] = useState("all");
  const [activeId, setActiveId] = useState(null);
  const [selected, setSelected] = useState(new Set());
  const [readLocal, setReadLocal] = useState(new Set());
  const { push: pushToast } = useToast();

  const filtered = useMemo(() => {
    if (filter === "all") return messages;
    return messages.filter((message) => message.status === filter);
  }, [filter, messages]);

  const counts = useMemo(() => {
    const result = { all: messages.length };
    STATUS_OPTIONS.forEach((status) => {
      result[status] = messages.filter((m) => m.status === status).length;
    });
    return result;
  }, [messages]);

  const active = useMemo(() => messages.find((m) => m.id === activeId) || null, [messages, activeId]);

  useEffect(() => {
    if (!active) return;
    if (active.status !== "new" || readLocal.has(active.id)) return;
    setReadLocal((current) => new Set(current).add(active.id));
    updateContactSubmissionStatus(active.id, "in_review")
      .then(onRefresh)
      .catch(() => {});
  }, [active, readLocal, onRefresh]);

  const changeStatus = async (id, status) => {
    try {
      await updateContactSubmissionStatus(id, status);
      pushToast({ type: "success", title: "Statut mis à jour", message: status });
      await onRefresh();
    } catch (err) {
      pushToast({ type: "error", title: "Échec de la mise à jour", message: err.message });
    }
  };

  const toggleSelect = (id) => {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const bulkAction = async (status) => {
    const ids = [...selected];
    if (!ids.length) return;
    try {
      await Promise.all(ids.map((id) => updateContactSubmissionStatus(id, status)));
      pushToast({ type: "success", title: `${ids.length} messages mis à jour`, message: status });
      setSelected(new Set());
      await onRefresh();
    } catch (err) {
      pushToast({ type: "error", title: "Action groupée échouée", message: err.message });
    }
  };

  return (
    <div>
      <PageHead title="Messages" sub={`${counts.new} nouveaux · ${counts.all} total`} />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          marginTop: "24px",
          padding: "10px",
          background: "var(--cream)",
          border: "1px solid var(--line)",
          borderRadius: "12px",
          alignItems: "center",
        }}
      >
        <Filter size={14} style={{ color: "var(--muted)", marginLeft: "6px", marginRight: "4px" }} />
        {MESSAGE_FILTERS.map((option) => {
          const count = counts[option.id] || 0;
          const isActive = filter === option.id;
          return (
            <button
              key={option.id}
              onClick={() => setFilter(option.id)}
              style={{
                background: isActive ? "var(--ink)" : "transparent",
                color: isActive ? "var(--cream)" : "var(--ink)",
                border: 0,
                borderRadius: "100px",
                padding: "8px 14px",
                fontSize: "12px",
                fontFamily: "var(--mono)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "pointer",
                display: "inline-flex",
                gap: "8px",
                alignItems: "center",
              }}
            >
              <span>{option.label}</span>
              <span
                style={{
                  background: isActive ? "rgba(255,255,255,0.2)" : "var(--cream-deep)",
                  color: isActive ? "var(--cream)" : "var(--muted)",
                  borderRadius: "100px",
                  padding: "1px 8px",
                  fontSize: "10px",
                }}
              >
                {count}
              </span>
            </button>
          );
        })}

        {selected.size > 0 && (
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              gap: "8px",
              alignItems: "center",
              fontSize: "12px",
              color: "var(--muted)",
            }}
          >
            <span>
              {selected.size} sélectionné{selected.size > 1 ? "s" : ""}
            </span>
            <button className="btn btn-ghost" style={{ padding: "8px 14px" }} onClick={() => bulkAction("replied")}>
              Marquer répondu
            </button>
            <button className="btn btn-ghost" style={{ padding: "8px 14px" }} onClick={() => bulkAction("archived")}>
              Archiver
            </button>
            <button className="btn btn-ghost" style={{ padding: "8px 14px" }} onClick={() => setSelected(new Set())}>
              Annuler
            </button>
          </div>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "16px", marginTop: "16px" }}>
        <Panel>
          {filtered.length ? (
            filtered.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "flex-start",
                  padding: "12px 6px",
                  borderBottom: "1px solid var(--line)",
                  background: active?.id === item.id ? "var(--cream-deep)" : "transparent",
                  borderRadius: active?.id === item.id ? "10px" : 0,
                }}
              >
                <input
                  type="checkbox"
                  checked={selected.has(item.id)}
                  onChange={() => toggleSelect(item.id)}
                  onClick={(event) => event.stopPropagation()}
                  style={{ marginTop: "4px" }}
                />
                <button
                  onClick={() => setActiveId(item.id)}
                  style={{
                    flex: 1,
                    background: "transparent",
                    border: 0,
                    textAlign: "left",
                    padding: 0,
                    cursor: "pointer",
                    color: "var(--ink)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    minWidth: 0,
                  }}
                >
                  <span style={{ display: "flex", justifyContent: "space-between", gap: "12px", alignItems: "center" }}>
                    <strong style={{ fontSize: "13px" }}>{item.name}</strong>
                    <StatusTag status={item.status} />
                  </span>
                  <span className="text-mono text-muted" style={{ fontSize: "10px" }}>
                    {item.service_slug} · {formatDate(item.submitted_at)}
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "var(--muted)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.message}
                  </span>
                </button>
              </div>
            ))
          ) : (
            <EmptyState text="Aucun message dans ce filtre." />
          )}
        </Panel>

        <Panel>
          {active ? (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "16px", alignItems: "flex-start" }}>
                <div>
                  <h2 style={smallTitleStyle}>{active.name}</h2>
                  <div className="text-mono text-muted" style={{ marginTop: "6px" }}>
                    {formatDate(active.submitted_at)}
                  </div>
                </div>
                <select
                  value={active.status}
                  onChange={(event) => changeStatus(active.id, event.target.value)}
                  style={selectStyle}
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                  margin: "24px 0",
                  padding: "20px 0",
                  borderTop: "1px solid var(--line)",
                  borderBottom: "1px solid var(--line)",
                }}
              >
                <Meta label="Email" value={<a href={`mailto:${active.email}`}>{active.email}</a>} />
                <Meta label="Téléphone" value={active.phone || "—"} />
                <Meta label="Service" value={active.service_slug} />
                <Meta label="Locale" value={active.locale} />
              </div>
              <p style={{ color: "var(--ink-soft)", lineHeight: 1.7 }}>{active.message}</p>
              <div style={{ marginTop: "24px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <a className="btn" href={`mailto:${active.email}`}>
                  Répondre par email
                </a>
                <button className="btn btn-ghost" onClick={() => changeStatus(active.id, "replied")}>
                  Marquer répondu
                </button>
                <button className="btn btn-ghost" onClick={() => changeStatus(active.id, "archived")}>
                  Archiver
                </button>
              </div>
            </div>
          ) : (
            <EmptyState text="Sélectionnez un message pour le consulter." />
          )}
        </Panel>
      </div>
    </div>
  );
}

function StatusTag({ status }) {
  const colors = {
    new: { bg: "var(--accent)", color: "var(--cream)" },
    in_review: { bg: "var(--sunset)", color: "var(--ink)" },
    replied: { bg: "var(--palm)", color: "var(--cream)" },
    archived: { bg: "var(--cream-deep)", color: "var(--muted)" },
    spam: { bg: "var(--ink-soft)", color: "var(--cream)" },
  };
  const palette = colors[status] || { bg: "var(--cream-deep)", color: "var(--muted)" };
  return (
    <span
      style={{
        background: palette.bg,
        color: palette.color,
        padding: "3px 8px",
        borderRadius: "100px",
        fontFamily: "var(--mono)",
        fontSize: "9px",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
      }}
    >
      {status}
    </span>
  );
}

/* ==========================================================================
   Email leads tab
   ========================================================================== */

function EmailsAdmin({ data, onRefresh }) {
  const leads = data.emailLeads;
  const { push: pushToast } = useToast();

  const exportLeads = () =>
    exportCsv("email-leads.csv", [
      ["email", "status", "source", "locale", "captured_at"],
      ...leads.map((lead) => [lead.email, lead.status, lead.source, lead.locale, lead.captured_at]),
    ]);

  const changeStatus = async (id, status) => {
    try {
      await updateEmailLeadStatus(id, status);
      pushToast({ type: "success", title: "Statut mis à jour" });
      await onRefresh();
    } catch (err) {
      pushToast({ type: "error", title: "Échec", message: err.message });
    }
  };

  return (
    <div>
      <PageHead title="Email leads" sub={`${leads.length} captures`} cta="Exporter en CSV" onCta={exportLeads} />
      <Panel style={{ marginTop: "24px" }}>
        <TableHeader columns="2fr 1fr 1fr 1fr 160px" labels={["Email", "Statut", "Source", "Locale", "Capturé"]} />
        {leads.length ? (
          leads.map((lead) => (
            <div
              key={lead.id}
              style={{
                ...tableRowStyle,
                gridTemplateColumns: "2fr 1fr 1fr 1fr 160px",
              }}
            >
              <span>{lead.email}</span>
              <select
                value={lead.status}
                onChange={(event) => changeStatus(lead.id, event.target.value)}
                style={selectStyle}
              >
                {LEAD_STATUS_OPTIONS.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
              <span>{lead.source}</span>
              <span className="text-mono text-muted">{lead.locale}</span>
              <span className="text-mono text-muted">{formatDate(lead.captured_at)}</span>
            </div>
          ))
        ) : (
          <EmptyState text="Aucun lead pour l'instant." />
        )}
      </Panel>
    </div>
  );
}

/* ==========================================================================
   Pages tab — iframe + inline CMS editor
   ========================================================================== */

function PagesAdmin({ data, onRefresh }) {
  const grouped = useMemo(() => {
    return data.cmsSections.reduce((acc, section) => {
      acc[section.page_key] ??= [];
      acc[section.page_key].push(section);
      return acc;
    }, {});
  }, [data.cmsSections]);
  const pageKeys = Object.keys(grouped).sort((a, b) => pageSort(a) - pageSort(b));
  const [pageKey, setPageKey] = useState(pageKeys[0] || "home");
  const pageSections = grouped[pageKey] || [];
  const [activeId, setActiveId] = useState(pageSections[0]?.id || "");
  const active = pageSections.find((section) => section.id === activeId) || pageSections[0];
  const iframeRef = useRef(null);
  const iframeRoute = PAGE_ROUTE[pageKey] || "home";

  useEffect(() => {
    if (pageKeys.length && !pageKeys.includes(pageKey)) setPageKey(pageKeys[0]);
  }, [pageKey, pageKeys]);

  useEffect(() => {
    if (pageSections.length && !pageSections.some((section) => section.id === activeId)) {
      setActiveId(pageSections[0].id);
    }
  }, [activeId, pageSections]);

  useEffect(() => {
    if (!active?.section_key) return;
    const send = () => {
      iframeRef.current?.contentWindow?.postMessage(
        { type: "admin_scroll_to", sectionKey: active.section_key },
        window.location.origin,
      );
    };
    const timer = setTimeout(send, 400);
    return () => clearTimeout(timer);
  }, [active?.section_key]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "30px", margin: 0, letterSpacing: "-0.025em" }}>Pages</h2>
          <p style={{ color: "var(--muted)", fontSize: "13px", marginTop: "4px" }}>Modifier les textes en visuel</p>
        </div>
        <div
          style={{
            display: "flex",
            gap: "4px",
            padding: "4px",
            border: "1px solid var(--line)",
            borderRadius: "100px",
          }}
        >
          {pageKeys.map((key) => (
            <button
              key={key}
              onClick={() => setPageKey(key)}
              style={{
                padding: "6px 14px",
                borderRadius: "100px",
                border: 0,
                cursor: "pointer",
                fontFamily: "var(--mono)",
                fontSize: "11px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                background: pageKey === key ? "var(--ink)" : "transparent",
                color: pageKey === key ? "var(--cream)" : "var(--muted)",
                transition: "background 0.15s, color 0.15s",
              }}
            >
              {PAGE_LABELS[key] || humanize(key)}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: "16px", height: "calc(100vh - 220px)", minHeight: "560px" }}>
        <div
          style={{
            width: "420px",
            flexShrink: 0,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <SectionsList sections={pageSections} activeId={active?.id} onSelect={setActiveId} />
          <Panel>
            {active ? (
              <CmsVisualEditor key={active.id} section={active} onRefresh={onRefresh} />
            ) : (
              <EmptyState text="Sélectionnez une section." />
            )}
          </Panel>
          {pageKey === "projects" && (
            <ProjectImagesPagePanel
              projects={data.projects}
              projectImages={data.projectImages}
              onRefresh={onRefresh}
            />
          )}
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
          <div
            style={{
              fontSize: "11px",
              fontFamily: "var(--mono)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <span>
              Aperçu — /{iframeRoute}
              {active ? ` · ${SECTION_LABELS[active.section_key] || active.section_key}` : ""}
            </span>
            <a
              href={`/#${iframeRoute}`}
              target="_blank"
              rel="noreferrer"
              style={{
                color: "var(--muted)",
                textDecoration: "none",
                display: "inline-flex",
                gap: "6px",
                alignItems: "center",
              }}
            >
              Ouvrir <ExternalLink size={11} />
            </a>
          </div>
          <div
            style={{
              flex: 1,
              borderRadius: "14px",
              overflow: "hidden",
              border: "1px solid var(--line)",
              background: "var(--cream-deep)",
            }}
          >
            <iframe
              ref={iframeRef}
              key={iframeRoute}
              src={`/#${iframeRoute}`}
              title={`Aperçu ${iframeRoute}`}
              style={{ width: "100%", height: "100%", border: 0 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionsList({ sections, activeId, onSelect }) {
  return (
    <Panel title="Sections">
      {sections.length ? (
        sections.map((section) => (
          <SectionListButton
            key={section.id}
            section={section}
            active={activeId === section.id}
            onClick={() => onSelect(section.id)}
          />
        ))
      ) : (
        <EmptyState text="Aucune section pour cette page." />
      )}
    </Panel>
  );
}

function SectionListButton({ section, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "10px",
        width: "100%",
        textAlign: "left",
        padding: "12px 14px",
        border: 0,
        borderRadius: "10px",
        background: active ? "var(--cream-deep)" : "transparent",
        color: "var(--ink)",
        cursor: "pointer",
        marginBottom: "2px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "2px", minWidth: 0 }}>
        <strong style={{ fontSize: "13px" }}>
          {SECTION_LABELS[section.section_key] || humanize(section.section_key)}
        </strong>
        <span className="text-mono text-muted" style={{ fontSize: "10px" }}>
          {section.is_active ? "visible" : "masqué"}
        </span>
      </div>
      <span
        title={section.is_active ? "Visible" : "Masqué"}
        style={{ color: section.is_active ? "var(--palm)" : "var(--muted)" }}
      >
        {section.is_active ? <Eye size={14} /> : <EyeOff size={14} />}
      </span>
    </button>
  );
}

function CmsVisualEditor({ section, onRefresh }) {
  const initialContent = useMemo(
    () => withKnownDefaults(section.section_key, section.content),
    [section.section_key, section.content],
  );
  const editor = useEditorState(initialContent);
  const [advanced, setAdvanced] = useState(false);
  const [jsonValue, setJsonValue] = useState(JSON.stringify(section.content, null, 2));
  const [jsonError, setJsonError] = useState("");
  const { push: pushToast } = useToast();

  useEffect(() => {
    setJsonValue(JSON.stringify(section.content, null, 2));
    setJsonError("");
    setAdvanced(false);
  }, [section.id]);

  const save = async () => {
    let content;
    if (advanced) {
      try {
        content = JSON.parse(jsonValue);
      } catch (err) {
        setJsonError(err.message);
        return;
      }
    } else {
      content = editor.draft;
    }
    const ok = await editor.wrapSave(async () => {
      await updateCmsSection(section.id, content);
      await onRefresh();
    });
    if (ok) pushToast({ type: "success", title: "Section enregistrée" });
    else pushToast({ type: "error", title: "Échec de l'enregistrement", message: editor.saveState.error });
  };

  return (
    <div>
      <EditorHeader
        title={SECTION_LABELS[section.section_key] || humanize(section.section_key)}
        meta={`${PAGE_LABELS[section.page_key] || section.page_key} · ${section.section_key}`}
        editor={editor}
        onSave={save}
      />
      {editor.isDirty && <DirtyBanner />}
      {!advanced ? (
        <CmsSectionContext.Provider
          value={{
            sectionKey: section.section_key,
            commitImage: async (fieldKey, value) => {
              const next = { ...editor.draft, [fieldKey]: value };
              await updateCmsSection(section.id, next);
              await onRefresh();
            },
          }}
        >
          <InlineFieldEditor value={editor.draft} onChange={editor.setDraft} root />
        </CmsSectionContext.Provider>
      ) : (
        <div>
          <textarea
            value={jsonValue}
            onChange={(event) => {
              setJsonValue(event.target.value);
              setJsonError("");
            }}
            style={jsonTextareaStyle}
            spellCheck="false"
          />
          {jsonError && <Notice tone="error" text={`JSON invalide: ${jsonError}`} />}
        </div>
      )}
      <AdvancedToggle advanced={advanced} onToggle={() => setAdvanced((v) => !v)} />
    </div>
  );
}

function ProjectImagesPagePanel({ projects, projectImages, onRefresh }) {
  const sortedProjects = useMemo(
    () => [...projects].sort((a, b) => Number(a.display_order || 0) - Number(b.display_order || 0)),
    [projects],
  );
  const [activeProjectId, setActiveProjectId] = useState(sortedProjects[0]?.id || "");
  const activeProject = sortedProjects.find((project) => project.id === activeProjectId) || sortedProjects[0];

  useEffect(() => {
    if (sortedProjects.length && !sortedProjects.some((project) => project.id === activeProjectId)) {
      setActiveProjectId(sortedProjects[0].id);
    }
  }, [activeProjectId, sortedProjects]);

  return (
    <Panel title="Photos des réalisations">
      {!sortedProjects.length ? (
        <EmptyState text="Aucun projet disponible." />
      ) : (
        <div style={{ display: "grid", gap: "16px" }}>
          <div style={{ display: "grid", gap: "6px" }}>
            {sortedProjects.map((project) => {
              const hero = projectImages
                .filter((image) => image.project_id === project.id)
                .sort((a, b) => Number(a.display_order || 0) - Number(b.display_order || 0))[0];
              return (
                <button
                  key={project.id}
                  onClick={() => setActiveProjectId(project.id)}
                  style={{
                    ...listButtonStyle,
                    display: "grid",
                    gridTemplateColumns: "56px 1fr",
                    alignItems: "center",
                    gap: "10px",
                    background: activeProject?.id === project.id ? "var(--cream-deep)" : "transparent",
                  }}
                >
                  <div
                    style={{
                      width: "56px",
                      aspectRatio: "4 / 3",
                      borderRadius: "8px",
                      overflow: "hidden",
                      background: hero?.placeholder_color || "var(--cream-deep)",
                      border: "1px solid var(--line)",
                    }}
                  >
                    {hero?.image_url ? (
                      <img
                        src={hero.image_url}
                        alt={hero.label || text(project.name)}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                    ) : (
                      <div style={{ display: "grid", placeItems: "center", height: "100%", color: "var(--muted)" }}>
                        <ImageIcon size={16} />
                      </div>
                    )}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <strong style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {text(project.name)}
                    </strong>
                    <span className="text-mono text-muted" style={{ fontSize: "10px" }}>
                      {project.status} · {projectImages.filter((image) => image.project_id === project.id).length} image(s)
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {activeProject && (
            <ProjectImagesOnlyEditor
              key={activeProject.id}
              project={activeProject}
              images={projectImages.filter((image) => image.project_id === activeProject.id)}
              onRefresh={onRefresh}
            />
          )}
        </div>
      )}
    </Panel>
  );
}

function ProjectImagesOnlyEditor({ project, images, onRefresh }) {
  const initial = useMemo(
    () => ({
      images: [...images].sort((a, b) => Number(a.display_order || 0) - Number(b.display_order || 0)),
    }),
    [images],
  );
  const editor = useEditorState(initial);
  const { push: pushToast } = useToast();

  const setImage = (id, key, value) => {
    editor.setDraft((current) => ({
      ...current,
      images: current.images.map((image) => (image.id === id ? { ...image, [key]: value } : image)),
    }));
  };

  const reorderImages = (fromId, toId) => {
    editor.setDraft((current) => {
      const fromIndex = current.images.findIndex((image) => image.id === fromId);
      const toIndex = current.images.findIndex((image) => image.id === toId);
      if (fromIndex < 0 || toIndex < 0) return current;
      return {
        ...current,
        images: arrayMove(current.images, fromIndex, toIndex).map((image, index) => ({
          ...image,
          display_order: (index + 1) * 10,
        })),
      };
    });
  };

  const save = async () => {
    const ok = await editor.wrapSave(async () => {
      await Promise.all(
        editor.draft.images.map((image) =>
          updateProjectImage(image.id, {
            image_url: image.image_url || null,
            alt_text: image.alt_text || null,
            label: image.label || null,
            placeholder_color: image.placeholder_color || null,
            kind: image.kind || "gallery",
            display_order: Number(image.display_order || 0),
          }),
        ),
      );
      await onRefresh();
    });
    if (ok) pushToast({ type: "success", title: "Photos enregistrées" });
    else pushToast({ type: "error", title: "Échec de l'enregistrement", message: editor.saveState.error });
  };

  const addImage = async () => {
    try {
      const nextOrder = Math.max(0, ...editor.draft.images.map((image) => Number(image.display_order || 0))) + 10;
      await createProjectImage(project.id, nextOrder);
      pushToast({ type: "success", title: "Image ajoutée" });
      await onRefresh();
    } catch (err) {
      pushToast({ type: "error", title: "Échec", message: err.message });
    }
  };

  const uploadImage = async (image, file) => {
    try {
      const uploaded = await uploadProjectImageFile({
        file,
        projectSlug: project.slug,
        imageId: image.id,
      });
      await updateProjectImage(image.id, {
        image_url: uploaded.url,
        label: image.label || file.name,
        alt_text: image.alt_text || null,
        placeholder_color: image.placeholder_color || null,
        kind: image.kind || "gallery",
        display_order: Number(image.display_order || 0),
      });
      pushToast({ type: "success", title: "Upload terminé" });
      await onRefresh();
    } catch (err) {
      pushToast({ type: "error", title: "Upload échoué", message: err.message });
    }
  };

  return (
    <div style={{ borderTop: "1px solid var(--line)", paddingTop: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px", marginBottom: "12px" }}>
        <div>
          <FieldLabel label={text(project.name)} large />
          <div className="text-mono text-muted" style={{ fontSize: "10px" }}>
            La première image sert de visuel principal sur la card.
          </div>
        </div>
        <button
          className="btn btn-ghost"
          onClick={addImage}
          style={{ padding: "9px 12px", display: "inline-flex", gap: "7px", flexShrink: 0 }}
        >
          <Plus size={13} /> Image
        </button>
      </div>

      {editor.isDirty && <DirtyBanner />}
      <ImageGrid
        images={editor.draft.images}
        onReorder={reorderImages}
        onSetField={setImage}
        onUpload={uploadImage}
      />
      <button
        className="btn"
        onClick={save}
        disabled={!editor.isDirty || editor.saveState.status === "saving"}
        style={{ marginTop: "14px", width: "100%", justifyContent: "center" }}
      >
        {editor.saveState.status === "saving" ? "Enregistrement..." : "Enregistrer les photos"}
      </button>
    </div>
  );
}

function AdvancedToggle({ advanced, onToggle }) {
  return (
    <button
      onClick={onToggle}
      style={{
        marginTop: "16px",
        background: "transparent",
        border: 0,
        color: "var(--muted)",
        fontSize: "11px",
        fontFamily: "var(--mono)",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        display: "inline-flex",
        gap: "6px",
        alignItems: "center",
        cursor: "pointer",
        padding: 0,
      }}
    >
      <Code2 size={12} />
      {advanced ? "Mode formulaire" : "Mode JSON avancé"}
    </button>
  );
}

/* ==========================================================================
   Inline field editor — recursive
   ========================================================================== */

function InlineFieldEditor({ label, value, onChange, root = false, depth = 0 }) {
  if (isLocalizedObject(value)) {
    return <LocalizedField label={label} value={value} onChange={onChange} />;
  }
  if (Array.isArray(value)) {
    return <ArrayField label={label} value={value} onChange={onChange} depth={depth} />;
  }
  if (isPlainObject(value)) {
    return <ObjectField label={label} value={value} onChange={onChange} root={root} depth={depth} />;
  }
  if (typeof value === "boolean") {
    return <ToggleField label={label} value={value} onChange={onChange} />;
  }
  if (typeof value === "number") {
    return <NumberField label={label} value={value} onChange={onChange} />;
  }
  return <StringField label={label} value={value ?? ""} onChange={onChange} />;
}

function ObjectField({ label, value, onChange, root, depth }) {
  return (
    <div>
      {!root && label && <FieldLabel label={label} large />}
      <div style={{ display: "grid", gap: "16px" }}>
        {Object.entries(value).map(([key, nextValue]) => {
          const label = FIELD_LABELS[key] || humanize(key);
          const setKey = (updated) => onChange({ ...value, [key]: updated });
          if (isImageKey(key) && (typeof nextValue === "string" || nextValue == null)) {
            return (
              <ImageField key={key} label={label} fieldKey={key} value={nextValue || ""} onChange={setKey} />
            );
          }
          return (
            <InlineFieldEditor
              key={key}
              label={label}
              value={nextValue}
              onChange={setKey}
              depth={depth + 1}
            />
          );
        })}
      </div>
    </div>
  );
}

function ImageField({ label, fieldKey, value, onChange }) {
  const { sectionKey, commitImage } = useContext(CmsSectionContext);
  const { push: pushToast } = useToast();
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;
    if (!sectionKey) {
      pushToast({ type: "error", title: "Upload impossible", message: "Section inconnue" });
      return;
    }
    setUploading(true);
    try {
      const { url } = await uploadCmsImage({ file, sectionKey, fieldKey });
      onChange(url);
      if (commitImage) {
        try {
          await commitImage(fieldKey, url);
          pushToast({ type: "success", title: "Image enregistrée" });
        } catch (saveErr) {
          pushToast({
            type: "error",
            title: "Upload OK mais sauvegarde échouée",
            message: saveErr.message,
          });
        }
      } else {
        pushToast({ type: "success", title: "Image uploadée — pensez à enregistrer" });
      }
    } catch (err) {
      pushToast({ type: "error", title: "Upload échoué", message: err.message });
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async () => {
    onChange("");
    if (commitImage) {
      try {
        await commitImage(fieldKey, "");
        pushToast({ type: "success", title: "Image retirée" });
      } catch (err) {
        pushToast({ type: "error", title: "Échec", message: err.message });
      }
    }
  };

  return (
    <div>
      {label && <FieldLabel label={label} />}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "120px 1fr",
          gap: "12px",
          alignItems: "stretch",
        }}
      >
        <div
          onClick={() => fileRef.current?.click()}
          style={{
            border: "1px solid var(--line)",
            borderRadius: "10px",
            background: "var(--cream-deep)",
            aspectRatio: "1",
            overflow: "hidden",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--muted)",
          }}
          title="Cliquer pour importer"
        >
          {value ? (
            <img
              src={value}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <ImageIcon size={24} />
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", minWidth: 0 }}>
          <input
            className="admin-input"
            value={value || ""}
            onChange={(event) => onChange(event.target.value)}
            placeholder="URL de l'image ou laisser vide"
          />
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              style={{ padding: "8px 14px", display: "inline-flex", gap: "6px" }}
            >
              {uploading ? (
                <Loader2 size={13} className="admin-spin" />
              ) : (
                <Upload size={13} />
              )}
              {uploading ? "Upload..." : "Importer"}
            </button>
            {value && (
              <button
                type="button"
                className="btn btn-ghost"
                onClick={handleRemove}
                style={{ padding: "8px 14px", display: "inline-flex", gap: "6px" }}
              >
                <Trash2 size={13} /> Retirer
              </button>
            )}
          </div>
        </div>
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        style={{ display: "none" }}
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) handleFile(file);
          event.target.value = "";
        }}
      />
    </div>
  );
}

function ArrayField({ label, value = [], onChange, depth }) {
  const [openIndex, setOpenIndex] = useState(null);

  const addItem = () => {
    const template = value[0];
    const next = [...value, isPlainObject(template) ? cloneEmpty(template) : Array.isArray(template) ? [] : ""];
    onChange(next);
    setOpenIndex(next.length - 1);
  };
  const updateItem = (index, nextValue) =>
    onChange(value.map((item, idx) => (idx === index ? nextValue : item)));
  const removeItem = (index) => onChange(value.filter((_, idx) => idx !== index));
  const moveItem = (from, to) => {
    if (to < 0 || to >= value.length) return;
    const next = [...value];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
  };

  return (
    <div>
      {label && <FieldLabel label={label} large />}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {value.map((item, index) => (
          <ArrayCard
            key={index}
            index={index}
            item={item}
            open={openIndex === index}
            onToggle={() => setOpenIndex((current) => (current === index ? null : index))}
            onChange={(nextValue) => updateItem(index, nextValue)}
            onRemove={() => removeItem(index)}
            onMoveUp={() => moveItem(index, index - 1)}
            onMoveDown={() => moveItem(index, index + 1)}
            isFirst={index === 0}
            isLast={index === value.length - 1}
            depth={depth}
          />
        ))}
        <button
          type="button"
          onClick={addItem}
          style={{
            justifySelf: "start",
            border: "1px dashed var(--line-strong)",
            borderRadius: "10px",
            padding: "10px 14px",
            background: "transparent",
            color: "var(--muted)",
            fontSize: "12px",
            fontFamily: "var(--mono)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            display: "inline-flex",
            gap: "8px",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <Plus size={13} />
          Ajouter un élément
        </button>
      </div>
    </div>
  );
}

function ArrayCard({
  index,
  item,
  open,
  onToggle,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
  depth,
}) {
  const summary = summarizeItem(item);
  return (
    <div
      style={{
        border: "1px solid var(--line)",
        borderRadius: "12px",
        background: "var(--paper)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "10px 12px",
          background: open ? "var(--cream-deep)" : "transparent",
          borderBottom: open ? "1px solid var(--line)" : 0,
        }}
      >
        <button
          onClick={onToggle}
          style={{
            background: "transparent",
            border: 0,
            display: "flex",
            alignItems: "center",
            gap: "6px",
            color: "var(--ink)",
            cursor: "pointer",
            padding: 0,
            flex: 1,
            textAlign: "left",
            minWidth: 0,
          }}
        >
          {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          <span className="text-mono" style={{ fontSize: "10px", color: "var(--muted)" }}>
            #{index + 1}
          </span>
          <span
            style={{
              fontSize: "13px",
              fontWeight: 500,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {summary}
          </span>
        </button>
        <button className="admin-icon-btn" onClick={onMoveUp} disabled={isFirst} title="Up">
          <ChevronDown size={14} style={{ transform: "rotate(180deg)" }} />
        </button>
        <button className="admin-icon-btn" onClick={onMoveDown} disabled={isLast} title="Down">
          <ChevronDown size={14} />
        </button>
        <button className="admin-icon-btn" onClick={onRemove} title="Remove">
          <Trash2 size={14} />
        </button>
      </div>
      {open && (
        <div style={{ padding: "14px" }}>
          <InlineFieldEditor value={item} onChange={onChange} depth={depth + 1} />
        </div>
      )}
    </div>
  );
}

function summarizeItem(item) {
  if (typeof item === "string") return item || "(vide)";
  if (typeof item === "number" || typeof item === "boolean") return String(item);
  if (isLocalizedObject(item)) return item.fr || item.en || "(vide)";
  if (isPlainObject(item)) {
    if (item.label) return text(item.label, "fr");
    if (item.title) return text(item.title, "fr");
    if (item.name) return text(item.name, "fr");
    if (item.text) return text(item.text, "fr");
    return "(détails)";
  }
  if (Array.isArray(item)) return `[${item.length} éléments]`;
  return "(vide)";
}

function cloneEmpty(template) {
  if (Array.isArray(template)) return [];
  if (!isPlainObject(template)) return "";
  return Object.fromEntries(
    Object.entries(template).map(([key, value]) => {
      if (isLocalizedObject(value)) return [key, { fr: "", en: "" }];
      if (Array.isArray(value)) return [key, []];
      if (isPlainObject(value)) return [key, cloneEmpty(value)];
      if (typeof value === "boolean") return [key, false];
      if (typeof value === "number") return [key, 0];
      return [key, ""];
    }),
  );
}

function LocalizedField({ label, value, onChange }) {
  const [lang, setLang] = useState("fr");
  const safe = value || { fr: "", en: "" };
  const current = safe[lang] ?? "";
  const totalLength = String(safe.fr || "").length + String(safe.en || "").length;
  const multiline = totalLength > 80 || String(current).includes("\n");

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          marginBottom: "8px",
        }}
      >
        {label ? <FieldLabel label={label} /> : <span />}
        <div
          style={{
            display: "inline-flex",
            border: "1px solid var(--line)",
            borderRadius: "100px",
            padding: "2px",
            background: "var(--cream-deep)",
          }}
        >
          {["fr", "en"].map((code) => (
            <button
              key={code}
              onClick={() => setLang(code)}
              style={{
                padding: "3px 10px",
                borderRadius: "100px",
                border: 0,
                fontFamily: "var(--mono)",
                fontSize: "10px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
                background: lang === code ? "var(--ink)" : "transparent",
                color: lang === code ? "var(--cream)" : "var(--muted)",
              }}
            >
              {code}
            </button>
          ))}
        </div>
      </div>
      {multiline ? (
        <AutoTextarea value={current} onChange={(next) => onChange({ ...safe, [lang]: next })} />
      ) : (
        <input
          className="admin-input"
          value={current}
          onChange={(event) => onChange({ ...safe, [lang]: event.target.value })}
        />
      )}
    </div>
  );
}

function StringField({ label, value, onChange }) {
  const multiline = String(value || "").length > 80 || String(value || "").includes("\n");
  return (
    <div>
      {label && <FieldLabel label={label} />}
      {multiline ? (
        <AutoTextarea value={value} onChange={onChange} />
      ) : (
        <input
          className="admin-input"
          value={value ?? ""}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </div>
  );
}

function NumberField({ label, value, onChange }) {
  return (
    <div>
      {label && <FieldLabel label={label} />}
      <input
        type="number"
        className="admin-input"
        value={value ?? 0}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </div>
  );
}

function ToggleField({ label, value, onChange }) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      <Toggle checked={Boolean(value)} onChange={onChange} />
      <span style={{ fontSize: "13px", color: "var(--ink-soft)" }}>{label}</span>
    </label>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <span
      onClick={() => onChange(!checked)}
      role="switch"
      aria-checked={checked}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === " " || event.key === "Enter") {
          event.preventDefault();
          onChange(!checked);
        }
      }}
      className="admin-toggle-track"
      style={{
        display: "inline-flex",
        width: "38px",
        height: "22px",
        borderRadius: "100px",
        background: checked ? "var(--palm)" : "var(--line-strong)",
        position: "relative",
        cursor: "pointer",
        flexShrink: 0,
      }}
    >
      <span
        className="admin-toggle-knob"
        style={{
          width: "18px",
          height: "18px",
          borderRadius: "50%",
          background: "var(--paper)",
          position: "absolute",
          top: "2px",
          left: "2px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
          transform: checked ? "translateX(16px)" : "translateX(0)",
        }}
      />
    </span>
  );
}

function FieldLabel({ label, large = false }) {
  return (
    <div
      style={{
        fontFamily: "var(--mono)",
        fontSize: large ? "12px" : "10px",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: large ? "var(--ink-soft)" : "var(--muted)",
        marginBottom: "6px",
        fontWeight: large ? 600 : 400,
      }}
    >
      {label}
    </div>
  );
}

function AutoTextarea({ value, onChange }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.height = "auto";
    ref.current.style.height = `${Math.min(ref.current.scrollHeight, 360)}px`;
  }, [value]);
  return (
    <textarea
      ref={ref}
      className="admin-input"
      value={value ?? ""}
      onChange={(event) => onChange(event.target.value)}
      style={{ minHeight: "84px", resize: "vertical", lineHeight: 1.55 }}
    />
  );
}

/* ==========================================================================
   Editor header / dirty banner / save button
   ========================================================================== */

function EditorHeader({ title, meta, editor, onSave }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "16px",
        alignItems: "flex-start",
        marginBottom: "20px",
        paddingBottom: "16px",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div style={{ minWidth: 0 }}>
        <h2 style={{ ...smallTitleStyle, display: "flex", alignItems: "center", gap: "10px" }}>
          {title}
          {editor?.isDirty && (
            <span
              className="admin-pulse-dot"
              title="Modifications non sauvegardées"
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "var(--sunset)",
                flexShrink: 0,
              }}
            />
          )}
        </h2>
        {meta && (
          <div className="text-mono text-muted" style={{ marginTop: "6px" }}>
            {meta}
          </div>
        )}
      </div>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        {editor?.canUndo && (
          <button
            className="btn btn-ghost"
            onClick={editor.undo}
            style={{ padding: "10px 14px", display: "inline-flex", gap: "8px" }}
          >
            <Undo2 size={13} /> Annuler
          </button>
        )}
        <SaveButton state={editor?.saveState || { status: "idle" }} onClick={onSave} />
      </div>
    </div>
  );
}

function SaveButton({ state, onClick }) {
  const status = state.status;
  const isSaving = status === "saving";
  const isSuccess = status === "success";
  const isError = status === "error";
  const label = isSaving
    ? "Enregistrement..."
    : isSuccess
      ? "Enregistré !"
      : isError
        ? "Erreur"
        : "Enregistrer";
  const Icon = isSaving ? Loader2 : isSuccess ? Check : isError ? X : null;

  return (
    <button
      className="btn"
      onClick={onClick}
      disabled={isSaving}
      style={{
        background: isSuccess ? "var(--palm)" : isError ? "var(--accent-deep)" : "var(--accent)",
        boxShadow: isSuccess
          ? "0 8px 20px rgba(42, 157, 143, 0.32)"
          : isError
            ? "0 8px 20px rgba(232, 71, 69, 0.36)"
            : undefined,
      }}
    >
      {Icon && <Icon size={14} className={isSaving ? "admin-spin" : undefined} />}
      {label}
    </button>
  );
}

function DirtyBanner() {
  return (
    <div
      style={{
        background: "rgba(255, 209, 102, 0.18)",
        border: "1px solid rgba(255, 209, 102, 0.45)",
        color: "#7a5a00",
        padding: "10px 14px",
        borderRadius: "10px",
        fontSize: "12px",
        marginBottom: "16px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <AlertCircle size={14} />
      Modifications non sauvegardées — pensez à enregistrer.
    </div>
  );
}

/* ==========================================================================
   Projects tab
   ========================================================================== */

function ProjectsAdmin({ data, onRefresh }) {
  const servicesById = useMemo(
    () => Object.fromEntries(data.services.map((service) => [service.id, service])),
    [data.services],
  );
  const [activeId, setActiveId] = useState(data.projects[0]?.id || "");
  const [creating, setCreating] = useState(false);
  const active = data.projects.find((project) => project.id === activeId) || data.projects[0];

  useEffect(() => {
    if (!activeId && data.projects[0]?.id) setActiveId(data.projects[0].id);
  }, [activeId, data.projects]);

  const onCreated = (project) => {
    setCreating(false);
    setActiveId(project.id);
  };

  return (
    <div>
      <PageHead
        title="Projets"
        sub="Modifier les réalisations affichées sur le site"
        cta="Nouveau projet"
        onCta={() => setCreating(true)}
      />
      {creating && (
        <NewProjectModal
          services={data.services}
          existingSlugs={data.projects.map((project) => project.slug)}
          onCancel={() => setCreating(false)}
          onCreated={onCreated}
          onRefresh={onRefresh}
        />
      )}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "320px 1fr",
          gap: "16px",
          marginTop: "24px",
          alignItems: "start",
        }}
      >
        <Panel title="Projets">
          {data.projects.length ? (
            data.projects.map((project) => (
              <button
                key={project.id}
                onClick={() => setActiveId(project.id)}
                style={{
                  ...listButtonStyle,
                  background: active?.id === project.id ? "var(--cream-deep)" : "transparent",
                }}
              >
                <strong>{text(project.name)}</strong>
                <span className="text-mono text-muted">
                  {project.status} · {text(servicesById[project.service_id]?.title)}
                </span>
              </button>
            ))
          ) : (
            <EmptyState text="Aucun projet en base." />
          )}
        </Panel>
        <Panel>
          {active ? (
            <ProjectEditor
              key={active.id}
              project={active}
              services={data.services}
              images={data.projectImages.filter((image) => image.project_id === active.id)}
              onRefresh={onRefresh}
            />
          ) : (
            <EmptyState text="Sélectionnez un projet." />
          )}
        </Panel>
      </div>
    </div>
  );
}

function NewProjectModal({ services, existingSlugs, onCancel, onCreated, onRefresh }) {
  const [slug, setSlug] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [status, setStatus] = useState("draft");
  const [nameFr, setNameFr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [taglineFr, setTaglineFr] = useState("");
  const [taglineEn, setTaglineEn] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { push: pushToast } = useToast();

  const slugTaken = slug && existingSlugs.includes(slug);
  const canSubmit =
    slug.trim() &&
    !slugTaken &&
    nameFr.trim() &&
    nameEn.trim() &&
    taglineFr.trim() &&
    taglineEn.trim();

  const submit = async (event) => {
    event.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setError("");
    try {
      const created = await createProject({
        slug: slug.trim(),
        service_id: serviceId || null,
        status,
        name: { fr: nameFr.trim(), en: nameEn.trim() },
        tagline: { fr: taglineFr.trim(), en: taglineEn.trim() },
        project_type: { fr: "", en: "" },
        size_label: { fr: "", en: "" },
        duration_label: { fr: "", en: "" },
        description: { fr: "", en: "" },
        includes: { fr: [], en: [] },
        value_points: { fr: [], en: [] },
        year: String(new Date().getFullYear()),
      });
      pushToast({ type: "success", title: "Projet créé", message: created.slug });
      await onRefresh();
      onCreated(created);
    } catch (err) {
      setError(err.message || "Création impossible");
      pushToast({ type: "error", title: "Création impossible", message: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1050,
        background: "rgba(10, 37, 64, 0.55)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        animation: "fadeIn 180ms ease",
      }}
      onClick={onCancel}
    >
      <form
        onSubmit={submit}
        onClick={(event) => event.stopPropagation()}
        style={{
          background: "var(--paper)",
          borderRadius: "18px",
          padding: "28px",
          maxWidth: "560px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 30px 80px rgba(10, 37, 64, 0.3)",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={smallTitleStyle}>Nouveau projet</h3>
          <button type="button" onClick={onCancel} className="admin-icon-btn">
            <X size={16} />
          </button>
        </div>
        <p style={{ color: "var(--muted)", fontSize: "13px", margin: 0 }}>
          Renseigne le minimum pour créer la fiche. Le reste se modifie ensuite dans l'éditeur.
        </p>

        <div>
          <FieldLabel label="Slug (URL)" />
          <input
            className="admin-input"
            value={slug}
            onChange={(event) =>
              setSlug(
                event.target.value
                  .toLowerCase()
                  .replace(/[^a-z0-9-]+/g, "-")
                  .replace(/^-+|-+$/g, ""),
              )
            }
            placeholder="garage-tropical"
            autoFocus
          />
          {slugTaken && (
            <div style={{ color: "var(--accent-deep)", fontSize: "12px", marginTop: "6px" }}>
              Ce slug est déjà utilisé.
            </div>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div>
            <FieldLabel label="Nom (FR)" />
            <input className="admin-input" value={nameFr} onChange={(event) => setNameFr(event.target.value)} />
          </div>
          <div>
            <FieldLabel label="Nom (EN)" />
            <input className="admin-input" value={nameEn} onChange={(event) => setNameEn(event.target.value)} />
          </div>
          <div>
            <FieldLabel label="Accroche (FR)" />
            <input
              className="admin-input"
              value={taglineFr}
              onChange={(event) => setTaglineFr(event.target.value)}
            />
          </div>
          <div>
            <FieldLabel label="Accroche (EN)" />
            <input
              className="admin-input"
              value={taglineEn}
              onChange={(event) => setTaglineEn(event.target.value)}
            />
          </div>
          <LabeledSelect
            label="Service"
            value={serviceId}
            options={[
              { value: "", label: "Aucun" },
              ...services.map((service) => ({ value: service.id, label: text(service.title) })),
            ]}
            onChange={setServiceId}
          />
          <LabeledSelect label="Statut" value={status} options={PROJECT_STATUS_OPTIONS} onChange={setStatus} />
        </div>

        {error && <Notice tone="error" text={error} />}

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "8px" }}>
          <button type="button" className="btn btn-ghost" onClick={onCancel} disabled={submitting}>
            Annuler
          </button>
          <button type="submit" className="btn" disabled={submitting || !canSubmit}>
            {submitting ? "Création..." : "Créer le projet"}
          </button>
        </div>
      </form>
    </div>
  );
}

function ProjectEditor({ project, services, images, onRefresh }) {
  const initial = useMemo(
    () => ({
      data: pickFields(project, PROJECT_FIELDS),
      images: clone(images),
    }),
    [project, images],
  );
  const editor = useEditorState(initial);
  const { push: pushToast } = useToast();

  const setField = (key, value) => {
    editor.setDraft((current) => ({ ...current, data: { ...current.data, [key]: value } }));
  };

  const setImage = (id, key, value) => {
    editor.setDraft((current) => ({
      ...current,
      images: current.images.map((image) => (image.id === id ? { ...image, [key]: value } : image)),
    }));
  };

  const reorderImages = (fromId, toId) => {
    editor.setDraft((current) => {
      const fromIndex = current.images.findIndex((image) => image.id === fromId);
      const toIndex = current.images.findIndex((image) => image.id === toId);
      if (fromIndex < 0 || toIndex < 0) return current;
      const next = arrayMove(current.images, fromIndex, toIndex).map((image, index) => ({
        ...image,
        display_order: (index + 1) * 10,
      }));
      return { ...current, images: next };
    });
  };

  const save = async () => {
    const ok = await editor.wrapSave(async () => {
      await updateProject(project.id, {
        ...editor.draft.data,
        service_id: editor.draft.data.service_id || null,
        display_order: Number(editor.draft.data.display_order || 0),
      });
      await Promise.all(
        editor.draft.images.map((image) =>
          updateProjectImage(image.id, {
            image_url: image.image_url || null,
            alt_text: image.alt_text || null,
            label: image.label || null,
            placeholder_color: image.placeholder_color || null,
            kind: image.kind || "gallery",
            display_order: Number(image.display_order || 0),
          }),
        ),
      );
      await onRefresh();
    });
    if (ok) pushToast({ type: "success", title: "Projet enregistré" });
    else pushToast({ type: "error", title: "Échec de l'enregistrement", message: editor.saveState.error });
  };

  const addImage = async () => {
    try {
      const nextOrder = Math.max(0, ...editor.draft.images.map((image) => Number(image.display_order || 0))) + 10;
      await createProjectImage(project.id, nextOrder);
      pushToast({ type: "success", title: "Image ajoutée" });
      await onRefresh();
    } catch (err) {
      pushToast({ type: "error", title: "Échec", message: err.message });
    }
  };

  const uploadImage = async (image, file) => {
    try {
      const uploaded = await uploadProjectImageFile({
        file,
        projectSlug: editor.draft.data.slug,
        imageId: image.id,
      });
      const nextLabel = image.label || file.name;
      await updateProjectImage(image.id, {
        image_url: uploaded.url,
        label: nextLabel,
        alt_text: image.alt_text || null,
        placeholder_color: image.placeholder_color || null,
        kind: image.kind || "gallery",
        display_order: Number(image.display_order || 0),
      });
      pushToast({ type: "success", title: "Upload terminé" });
      await onRefresh();
    } catch (err) {
      pushToast({ type: "error", title: "Upload échoué", message: err.message });
    }
  };

  return (
    <div>
      <EditorHeader title={text(project.name)} meta={project.slug} editor={editor} onSave={save} />
      {editor.isDirty && <DirtyBanner />}

      <div style={editorSectionStyle}>
        <FieldLabel label="Métadonnées" large />
        <div style={editorGridStyle}>
          <LabeledInput label="Slug" value={editor.draft.data.slug || ""} onChange={(v) => setField("slug", v)} />
          <LabeledInput label="Année" value={editor.draft.data.year || ""} onChange={(v) => setField("year", v)} />
          <LabeledSelect
            label="Statut"
            value={editor.draft.data.status}
            options={PROJECT_STATUS_OPTIONS}
            onChange={(v) => setField("status", v)}
          />
          <LabeledSelect
            label="Service"
            value={editor.draft.data.service_id || ""}
            options={[
              { value: "", label: "Aucun" },
              ...services.map((service) => ({ value: service.id, label: text(service.title) })),
            ]}
            onChange={(v) => setField("service_id", v)}
          />
          <LabeledInput
            label="Ordre d'affichage"
            type="number"
            value={editor.draft.data.display_order || 0}
            onChange={(v) => setField("display_order", Number(v))}
          />
          <ToggleField
            label="En vedette"
            value={editor.draft.data.is_featured}
            onChange={(v) => setField("is_featured", v)}
          />
          <ToggleField
            label="Grande tuile"
            value={editor.draft.data.is_large}
            onChange={(v) => setField("is_large", v)}
          />
        </div>
      </div>

      <div style={editorSectionStyle}>
        <FieldLabel label="Contenu localisé" large />
        <div style={{ display: "grid", gap: "20px" }}>
          {PROJECT_EDITABLE_FIELDS.map((field) => (
            <InlineFieldEditor
              key={field.key}
              label={field.label}
              value={editor.draft.data[field.key]}
              onChange={(value) => setField(field.key, value)}
            />
          ))}
        </div>
      </div>

      <div style={editorSectionStyle}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "14px",
          }}
        >
          <FieldLabel label="Images" large />
          <button
            className="btn btn-ghost"
            onClick={addImage}
            style={{ padding: "10px 14px", display: "inline-flex", gap: "8px" }}
          >
            <Plus size={13} /> Ajouter une image
          </button>
        </div>
        <ImageGrid
          images={editor.draft.images}
          onReorder={reorderImages}
          onSetField={setImage}
          onUpload={uploadImage}
        />
      </div>
    </div>
  );
}

function LabeledInput({ label, value, onChange, type = "text" }) {
  return (
    <div>
      <FieldLabel label={label} />
      <input
        type={type}
        className="admin-input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

function LabeledSelect({ label, value, options, onChange }) {
  const normalized = options.map((option) =>
    typeof option === "string" ? { value: option, label: option } : option,
  );
  return (
    <div>
      <FieldLabel label={label} />
      <select
        className="admin-input"
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
      >
        {normalized.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ==========================================================================
   Image grid (sortable) + Lightbox + Cropper
   ========================================================================== */

function ImageGrid({ images, onReorder, onSetField, onUpload }) {
  const [editingId, setEditingId] = useState(null);
  const [lightboxId, setLightboxId] = useState(null);
  const [cropContext, setCropContext] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  if (!images.length) return <EmptyState text="Aucune image pour ce projet." />;

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    onReorder(active.id, over.id);
  };

  const startCrop = (image, file) => {
    const reader = new FileReader();
    reader.onload = () => setCropContext({ image, src: reader.result, file });
    reader.readAsDataURL(file);
  };

  const finalizeCrop = async (blob) => {
    if (!cropContext) return;
    const baseName = (cropContext.file.name || "crop").replace(/\.[^.]+$/, "");
    const finalFile = new File([blob], `${baseName}.jpg`, {
      type: "image/jpeg",
    });
    await onUpload(cropContext.image, finalFile);
    setCropContext(null);
  };

  return (
    <>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={images.map((image) => image.id)} strategy={rectSortingStrategy}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: "12px",
            }}
          >
            {images.map((image) => (
              <SortableImageCard
                key={image.id}
                image={image}
                onPreview={() => setLightboxId(image.id)}
                onEdit={() => setEditingId(image.id)}
                onPickFile={(file) => startCrop(image, file)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {editingId && (
        <ImageEditDrawer
          image={images.find((img) => img.id === editingId)}
          onClose={() => setEditingId(null)}
          onSetField={onSetField}
        />
      )}
      {lightboxId && (
        <Lightbox
          image={images.find((img) => img.id === lightboxId)}
          onClose={() => setLightboxId(null)}
        />
      )}
      {cropContext && (
        <CropperModal
          src={cropContext.src}
          onCancel={() => setCropContext(null)}
          onConfirm={finalizeCrop}
        />
      )}
    </>
  );
}

function SortableImageCard({ image, onPreview, onEdit, onPickFile }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: image.id,
  });
  const fileRef = useRef(null);
  const placeholder =
    image.placeholder_color || "linear-gradient(135deg, var(--cream-deep), var(--brass-soft))";

  return (
    <div
      ref={setNodeRef}
      className="admin-image-card"
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        position: "relative",
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid var(--line)",
        background: image.image_url ? "var(--cream-deep)" : placeholder,
        aspectRatio: "1",
        opacity: isDragging ? 0.6 : 1,
        cursor: "default",
      }}
    >
      {image.image_url ? (
        <img
          src={image.image_url}
          alt={image.label || ""}
          style={{ width: "100%", height: "100%", objectFit: "cover", cursor: "zoom-in" }}
          onClick={onPreview}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--muted)",
            cursor: "pointer",
          }}
          onClick={() => fileRef.current?.click()}
        >
          <ImageIcon size={28} />
        </div>
      )}

      <div
        style={{
          position: "absolute",
          top: "8px",
          left: "8px",
          display: "flex",
          gap: "6px",
          alignItems: "center",
        }}
      >
        <span
          style={{
            background: "rgba(10, 37, 64, 0.78)",
            color: "var(--cream)",
            padding: "3px 8px",
            borderRadius: "100px",
            fontSize: "10px",
            fontFamily: "var(--mono)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {image.kind || "gallery"}
        </span>
        <span
          style={{
            background: "rgba(255, 248, 240, 0.92)",
            color: "var(--ink)",
            padding: "3px 8px",
            borderRadius: "100px",
            fontSize: "10px",
            fontFamily: "var(--mono)",
          }}
        >
          #{image.display_order || 0}
        </span>
      </div>

      <div
        className="admin-image-overlay"
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(10, 37, 64, 0) 30%, rgba(10, 37, 64, 0.78) 100%)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          padding: "10px",
          pointerEvents: "none",
        }}
      >
        <div style={{ display: "flex", gap: "6px", pointerEvents: "auto" }}>
          {image.image_url && (
            <button className="admin-icon-btn" style={overlayButtonStyle} onClick={onPreview} title="Aperçu">
              <ZoomIn size={14} />
            </button>
          )}
          <button
            className="admin-icon-btn"
            style={overlayButtonStyle}
            onClick={() => fileRef.current?.click()}
            title="Importer"
          >
            <Upload size={14} />
          </button>
          <button className="admin-icon-btn" style={overlayButtonStyle} onClick={onEdit} title="Modifier">
            <Pencil size={14} />
          </button>
        </div>
        <button
          className="admin-icon-btn"
          style={{ ...overlayButtonStyle, cursor: "grab", pointerEvents: "auto" }}
          {...attributes}
          {...listeners}
          title="Réordonner"
        >
          <GripVertical size={14} />
        </button>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        style={{ display: "none" }}
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) onPickFile(file);
          event.target.value = "";
        }}
      />
    </div>
  );
}

const overlayButtonStyle = {
  background: "rgba(255, 248, 240, 0.92)",
  color: "var(--ink)",
};

function ImageEditDrawer({ image, onClose, onSetField }) {
  if (!image) return null;
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 800,
        background: "rgba(10, 37, 64, 0.55)",
        backdropFilter: "blur(6px)",
        display: "flex",
        justifyContent: "flex-end",
        animation: "fadeIn 180ms ease",
      }}
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        style={{
          width: "min(440px, 100%)",
          background: "var(--paper)",
          height: "100%",
          padding: "24px",
          overflowY: "auto",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
          <h3 style={smallTitleStyle}>Modifier l'image</h3>
          <button onClick={onClose} className="admin-icon-btn">
            <X size={16} />
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <LabeledInput
            label="Libellé"
            value={image.label || ""}
            onChange={(v) => onSetField(image.id, "label", v)}
          />
          <LabeledInput
            label="Image URL"
            value={image.image_url || ""}
            onChange={(v) => onSetField(image.id, "image_url", v)}
          />
          <LabeledInput
            label="Couleur placeholder"
            value={image.placeholder_color || ""}
            onChange={(v) => onSetField(image.id, "placeholder_color", v)}
          />
          <LabeledSelect
            label="Type"
            value={image.kind || "gallery"}
            options={["hero", "before", "after", "gallery", "detail"]}
            onChange={(v) => onSetField(image.id, "kind", v)}
          />
          <LabeledInput
            label="Ordre"
            type="number"
            value={image.display_order || 0}
            onChange={(v) => onSetField(image.id, "display_order", Number(v))}
          />
          <div>
            <FieldLabel label="Texte alternatif" />
            <LocalizedField
              label=""
              value={image.alt_text || { fr: "", en: "" }}
              onChange={(value) => onSetField(image.id, "alt_text", value)}
            />
          </div>
          <Notice tone="info" text="Les changements seront appliqués lors du prochain enregistrement." />
        </div>
      </div>
    </div>
  );
}

function Lightbox({ image, onClose }) {
  useEffect(() => {
    const handler = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!image) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 900,
        background: "rgba(10, 37, 64, 0.92)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px",
        animation: "fadeIn 180ms ease",
      }}
    >
      <button
        onClick={onClose}
        className="admin-icon-btn"
        style={{ position: "absolute", top: "20px", right: "20px", color: "var(--cream)" }}
      >
        <X size={20} />
      </button>
      {image.image_url ? (
        <img
          src={image.image_url}
          alt={image.label || ""}
          style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: "12px" }}
          onClick={(event) => event.stopPropagation()}
        />
      ) : (
        <div style={{ color: "var(--cream)" }}>Aucune image</div>
      )}
    </div>
  );
}

function CropperModal({ src, onCancel, onConfirm }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(4 / 3);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [busy, setBusy] = useState(false);

  const handleConfirm = async () => {
    if (!croppedAreaPixels) return;
    setBusy(true);
    try {
      const blob = await getCroppedBlob(src, croppedAreaPixels);
      await onConfirm(blob);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 950,
        background: "rgba(10, 37, 64, 0.78)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "var(--paper)",
          borderRadius: "18px",
          maxWidth: "780px",
          width: "100%",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={smallTitleStyle}>Recadrer avant import</h3>
          <button className="admin-icon-btn" onClick={onCancel}>
            <X size={16} />
          </button>
        </div>
        <div
          style={{
            position: "relative",
            background: "var(--ink)",
            borderRadius: "12px",
            overflow: "hidden",
            height: "420px",
          }}
        >
          <Cropper
            image={src}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={(_, area) => setCroppedAreaPixels(area)}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "12px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", gap: "8px" }}>
            {[
              { ratio: 4 / 3, label: "4:3" },
              { ratio: 16 / 9, label: "16:9" },
              { ratio: 1, label: "1:1" },
              { ratio: 3 / 4, label: "3:4" },
            ].map((option) => (
              <button
                key={option.label}
                onClick={() => setAspect(option.ratio)}
                style={{
                  padding: "8px 12px",
                  border: "1px solid var(--line)",
                  borderRadius: "100px",
                  background: aspect === option.ratio ? "var(--ink)" : "transparent",
                  color: aspect === option.ratio ? "var(--cream)" : "var(--ink)",
                  fontFamily: "var(--mono)",
                  fontSize: "11px",
                  cursor: "pointer",
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <span className="text-mono text-muted" style={{ fontSize: "11px" }}>
              Zoom
            </span>
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(event) => setZoom(Number(event.target.value))}
            />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button className="btn btn-ghost" onClick={onCancel} disabled={busy}>
              Annuler
            </button>
            <button className="btn" onClick={handleConfirm} disabled={busy || !croppedAreaPixels}>
              {busy ? "Import..." : "Importer"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

async function getCroppedBlob(src, pixels) {
  const image = await loadImage(src);
  const canvas = document.createElement("canvas");
  canvas.width = pixels.width;
  canvas.height = pixels.height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(
    image,
    pixels.x,
    pixels.y,
    pixels.width,
    pixels.height,
    0,
    0,
    pixels.width,
    pixels.height,
  );
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Recadrage impossible"));
      },
      "image/jpeg",
      0.9,
    );
  });
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

/* ==========================================================================
   RecordCollection (services / team / process / legal / settings)
   ========================================================================== */

function RecordCollectionAdmin({
  title,
  sub,
  records,
  fields,
  getLabel,
  getMeta,
  onSave,
  onRefresh,
  onCreate,
  onDelete,
  createLabel = "Ajouter",
  deleteConfirm = "Supprimer cet enregistrement ?",
  embedded = false,
}) {
  const [activeId, setActiveId] = useState(records[0] ? getRecordId(records[0]) : "");
  const active = records.find((record) => getRecordId(record) === activeId) || records[0];
  const { push: pushToast } = useToast();
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (records.length && !records.some((record) => getRecordId(record) === activeId)) {
      setActiveId(getRecordId(records[0]));
    }
  }, [activeId, records]);

  const handleCreate = async () => {
    if (!onCreate) return;
    setCreating(true);
    try {
      const created = await onCreate();
      await onRefresh();
      if (created) setActiveId(getRecordId(created));
      pushToast({ type: "success", title: "Créé" });
    } catch (err) {
      pushToast({ type: "error", title: "Création échouée", message: err.message });
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async () => {
    if (!onDelete || !active) return;
    if (!window.confirm(deleteConfirm)) return;
    setDeleting(true);
    try {
      await onDelete(getRecordId(active));
      await onRefresh();
      pushToast({ type: "success", title: "Supprimé" });
    } catch (err) {
      pushToast({ type: "error", title: "Suppression échouée", message: err.message });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      {!embedded && <PageHead title={title} sub={sub} />}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "320px 1fr",
          gap: "16px",
          marginTop: embedded ? 0 : "24px",
          alignItems: "start",
        }}
      >
        <Panel title={title}>
          {onCreate && (
            <button
              type="button"
              className="btn btn-ghost"
              onClick={handleCreate}
              disabled={creating}
              style={{
                width: "100%",
                justifyContent: "center",
                padding: "10px 14px",
                marginBottom: "12px",
                display: "inline-flex",
                gap: "6px",
              }}
            >
              {creating ? <Loader2 size={13} className="admin-spin" /> : <Plus size={13} />}
              {creating ? "Création..." : createLabel}
            </button>
          )}
          {records.length ? (
            records.map((record) => (
              <button
                key={getRecordId(record)}
                onClick={() => setActiveId(getRecordId(record))}
                style={{
                  ...listButtonStyle,
                  background:
                    active && getRecordId(active) === getRecordId(record)
                      ? "var(--cream-deep)"
                      : "transparent",
                }}
              >
                <strong>{getLabel(record)}</strong>
                <span className="text-mono text-muted">{getMeta(record)}</span>
              </button>
            ))
          ) : (
            <EmptyState text="Aucun enregistrement." />
          )}
        </Panel>
        <Panel>
          {active ? (
            <RecordEditor
              key={getRecordId(active)}
              record={active}
              title={getLabel(active)}
              meta={getMeta(active)}
              fields={fields}
              onSave={onSave}
              onRefresh={onRefresh}
              onDelete={onDelete ? handleDelete : null}
              deleting={deleting}
            />
          ) : (
            <EmptyState text="Sélectionnez un enregistrement." />
          )}
        </Panel>
      </div>
    </div>
  );
}

function RecordEditor({ record, title, meta, fields, onSave, onRefresh, onDelete, deleting }) {
  const initial = useMemo(() => pickFields(record, fields), [record, fields]);
  const editor = useEditorState(initial);
  const { push: pushToast } = useToast();

  const setField = (key, value) => {
    editor.setDraft((current) => ({ ...current, [key]: value }));
  };

  const save = async () => {
    const ok = await editor.wrapSave(async () => {
      await onSave(getRecordId(record), normalizeNumericFields(editor.draft, fields));
      await onRefresh();
    });
    if (ok) pushToast({ type: "success", title: "Enregistré" });
    else pushToast({ type: "error", title: "Échec", message: editor.saveState.error });
  };

  return (
    <div>
      <EditorHeader title={title} meta={meta} editor={editor} onSave={save} />
      {editor.isDirty && <DirtyBanner />}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {fields.map((field) => (
          <RecordField
            key={field.key}
            field={field}
            value={editor.draft[field.key]}
            onChange={(value) => setField(field.key, value)}
          />
        ))}
      </div>
      {onDelete && (
        <div
          style={{
            marginTop: "32px",
            paddingTop: "20px",
            borderTop: "1px solid var(--line)",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button
            type="button"
            className="btn btn-ghost"
            onClick={onDelete}
            disabled={deleting}
            style={{
              padding: "10px 16px",
              display: "inline-flex",
              gap: "8px",
              color: "var(--danger, #b3261e)",
              borderColor: "var(--danger, #b3261e)",
            }}
          >
            {deleting ? <Loader2 size={13} className="admin-spin" /> : <Trash2 size={13} />}
            {deleting ? "Suppression..." : "Supprimer"}
          </button>
        </div>
      )}
    </div>
  );
}

function RecordField({ field, value, onChange }) {
  if (field.type === "select") {
    return <LabeledSelect label={field.label} value={value} options={field.options} onChange={onChange} />;
  }
  if (field.type === "checkbox") {
    return <ToggleField label={field.label} value={Boolean(value)} onChange={onChange} />;
  }
  if (field.type === "number") {
    return <NumberField label={field.label} value={value || 0} onChange={onChange} />;
  }
  return <InlineFieldEditor label={field.label} value={value ?? field.fallback} onChange={onChange} />;
}

/* ==========================================================================
   Legal & Settings
   ========================================================================== */

function LegalAdmin({ data, onRefresh }) {
  return (
    <div>
      <PageHead title="Mentions légales" sub="Modifier les conditions affichées sur la page Conditions" />
      <div style={{ display: "grid", gap: "20px", marginTop: "24px" }}>
        <RecordCollectionAdmin
          title="Document"
          sub=""
          records={data.legalDocuments}
          fields={LEGAL_DOCUMENT_FIELDS}
          getLabel={(document) => text(document.title)}
          getMeta={(document) => document.document_key}
          onSave={(id, payload) => updateLegalDocument(id, payload)}
          onRefresh={onRefresh}
          embedded
        />
        <RecordCollectionAdmin
          title="Sections"
          sub=""
          records={data.legalSections}
          fields={LEGAL_SECTION_FIELDS}
          getLabel={(section) => text(section.title)}
          getMeta={(section) => `§ ${String(section.section_number).padStart(2, "0")}`}
          onSave={(id, payload) => updateLegalSection(id, payload)}
          onRefresh={onRefresh}
          embedded
        />
      </div>
    </div>
  );
}

function SettingsAdmin({ data, onRefresh }) {
  return (
    <div>
      <PageHead title="Réglages" sub="Modifier les contacts et réglages globaux" />
      <div style={{ display: "grid", gap: "20px", marginTop: "24px" }}>
        <RecordCollectionAdmin
          title="Contact channels"
          sub=""
          records={data.contactChannels}
          fields={CONTACT_CHANNEL_FIELDS}
          getLabel={(channel) => text(channel.label)}
          getMeta={(channel) => channel.value}
          onSave={(id, payload) => updateContactChannel(id, payload)}
          onRefresh={onRefresh}
          embedded
        />
        <RecordCollectionAdmin
          title="Site settings"
          sub=""
          records={data.siteSettings}
          fields={SITE_SETTING_FIELDS}
          getLabel={(setting) => setting.key}
          getMeta={(setting) => setting.description || "Global setting"}
          onSave={(key, payload) => updateSiteSetting(key, payload)}
          onRefresh={onRefresh}
          embedded
        />
      </div>
    </div>
  );
}

/* ==========================================================================
   Generic primitives
   ========================================================================== */

function PageHead({ title, sub, cta, onCta }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        borderBottom: "1px solid var(--line)",
        paddingBottom: "20px",
        gap: "20px",
        flexWrap: "wrap",
      }}
    >
      <div>
        <h1
          style={{
            fontFamily: "var(--serif)",
            fontSize: "36px",
            letterSpacing: "-0.025em",
            margin: 0,
          }}
        >
          {title}
        </h1>
        {sub && <p style={{ color: "var(--muted)", marginTop: "8px", fontSize: "14px" }}>{sub}</p>}
      </div>
      {cta && (
        <button className="btn" onClick={onCta}>
          {cta}
        </button>
      )}
    </div>
  );
}

function Panel({ title, children, style = {} }) {
  return (
    <section
      style={{
        background: "var(--cream)",
        border: "1px solid var(--line)",
        borderRadius: "16px",
        padding: "20px",
        ...style,
      }}
    >
      {title && <h2 style={panelTitleStyle}>{title}</h2>}
      {children}
    </section>
  );
}

function Meta({ label, value }) {
  return (
    <div>
      <div className="text-mono text-muted">{label}</div>
      <div style={{ marginTop: "4px", fontSize: "14px" }}>{value}</div>
    </div>
  );
}

function TableHeader({ columns, labels }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: columns,
        gap: "16px",
        paddingBottom: "12px",
        borderBottom: "1px solid var(--line)",
        fontFamily: "var(--mono)",
        fontSize: "11px",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "var(--muted)",
      }}
    >
      {labels.map((label) => (
        <span key={label}>{label}</span>
      ))}
    </div>
  );
}

function Notice({ text, tone = "info" }) {
  return (
    <div
      style={{
        marginBottom: "12px",
        padding: "12px 14px",
        borderRadius: "10px",
        background: tone === "error" ? "rgba(255,94,91,0.12)" : "var(--cream-deep)",
        color: tone === "error" ? "var(--accent-deep)" : "var(--ink-soft)",
        fontSize: "13px",
      }}
    >
      {text}
    </div>
  );
}

function EmptyState({ text }) {
  return (
    <div
      style={{
        padding: "40px 20px",
        textAlign: "center",
        color: "var(--muted)",
        fontSize: "14px",
      }}
    >
      {text}
    </div>
  );
}

/* ==========================================================================
   Inline styles
   ========================================================================== */

const listButtonStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  width: "100%",
  textAlign: "left",
  padding: "12px 14px",
  border: 0,
  borderRadius: "10px",
  background: "transparent",
  color: "var(--ink)",
  cursor: "pointer",
  marginBottom: "2px",
};

const editorSectionStyle = {
  padding: "20px 0",
  borderBottom: "1px solid var(--line)",
};

const editorGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "16px",
  alignItems: "start",
};

const selectStyle = {
  border: "1px solid var(--line)",
  borderRadius: "8px",
  padding: "8px 10px",
  background: "var(--paper)",
  color: "var(--ink)",
  fontSize: "13px",
};

const smallTitleStyle = {
  fontFamily: "var(--serif)",
  fontSize: "26px",
  letterSpacing: "-0.02em",
  margin: 0,
};

const panelTitleStyle = {
  fontFamily: "var(--serif)",
  fontSize: "20px",
  letterSpacing: "-0.02em",
  margin: "0 0 14px",
};

const tableRowStyle = {
  display: "grid",
  gap: "16px",
  padding: "14px 0",
  borderBottom: "1px solid var(--line)",
  alignItems: "center",
  fontSize: "14px",
};

const jsonTextareaStyle = {
  width: "100%",
  minHeight: "420px",
  border: "1px solid var(--line)",
  borderRadius: "12px",
  padding: "16px",
  background: "var(--paper)",
  color: "var(--ink)",
  fontFamily: "var(--mono)",
  fontSize: "12px",
  lineHeight: 1.6,
};
