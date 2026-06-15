import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Check, X, Loader2 } from "lucide-react";

const inputStyle = {
  width: "100%",
  padding: "8px",
  border: "1px solid var(--stroke)",
  borderRadius: "4px",
  fontSize: "13px",
};
const labelStyle = {
  display: "block",
  fontSize: "12px",
  fontWeight: 500,
  marginBottom: "4px",
};
const btn = (bg) => ({
  padding: "8px 16px",
  background: bg,
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "4px",
});

const EMPTY = {
  question_en: "",
  question_fr: "",
  answer_en: "",
  answer_fr: "",
  is_active: true,
  display_order: 0,
};

export function FaqPanel({ onSave }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      setLoading(true);
      const { loadFaqItems } = await import("../data/adminRepository");
      setItems(await loadFaqItems());
    } catch (error) {
      console.error("Failed to load FAQ:", error);
    } finally {
      setLoading(false);
    }
  };

  const startNew = () => {
    const maxOrder = items.reduce((m, i) => Math.max(m, Number(i.display_order) || 0), 0);
    setDraft({ ...EMPTY, display_order: maxOrder + 10 });
  };

  const save = async () => {
    if (!draft) return;
    if (!draft.question_en.trim() || !draft.answer_en.trim()) {
      alert("La question et la réponse en anglais sont obligatoires.");
      return;
    }
    try {
      setSaving(true);
      const repo = await import("../data/adminRepository");
      if (draft.id) await repo.updateFaqItem(draft.id, draft);
      else await repo.createFaqItem(draft);
      await load();
      setDraft(null);
      onSave?.();
    } catch (error) {
      console.error("Failed to save FAQ item:", error);
      alert(`Erreur: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!confirm("Supprimer cette question ?")) return;
    try {
      const { deleteFaqItem } = await import("../data/adminRepository");
      await deleteFaqItem(id);
      await load();
      onSave?.();
    } catch (error) {
      console.error("Failed to delete FAQ item:", error);
      alert(`Erreur: ${error.message}`);
    }
  };

  const setField = (field, value) => setDraft((d) => ({ ...d, [field]: value }));

  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <Loader2 size={20} style={{ display: "inline", animation: "spin 1s linear infinite" }} />
        <p>Chargement de la FAQ…</p>
      </div>
    );
  }

  if (draft) {
    return (
      <div style={{ padding: "20px" }}>
        <h3 style={{ marginTop: 0 }}>{draft.id ? "Éditer la question" : "Nouvelle question"}</h3>
        <div style={{ border: "1px solid var(--stroke)", borderRadius: "6px", padding: "16px" }}>
          <div style={{ marginBottom: "12px" }}>
            <label style={labelStyle}>Question (English)</label>
            <input style={inputStyle} value={draft.question_en} onChange={(e) => setField("question_en", e.target.value)} />
          </div>
          <div style={{ marginBottom: "12px" }}>
            <label style={labelStyle}>Pregunta (Español)</label>
            <input style={inputStyle} value={draft.question_fr || ""} onChange={(e) => setField("question_fr", e.target.value)} />
          </div>
          <div style={{ marginBottom: "12px" }}>
            <label style={labelStyle}>Answer (English)</label>
            <textarea style={{ ...inputStyle, minHeight: "90px" }} value={draft.answer_en} onChange={(e) => setField("answer_en", e.target.value)} />
          </div>
          <div style={{ marginBottom: "12px" }}>
            <label style={labelStyle}>Respuesta (Español)</label>
            <textarea style={{ ...inputStyle, minHeight: "90px" }} value={draft.answer_fr || ""} onChange={(e) => setField("answer_fr", e.target.value)} />
          </div>
          <div style={{ display: "flex", gap: "16px", marginBottom: "12px" }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Ordre d'affichage</label>
              <input type="number" style={inputStyle} value={draft.display_order} onChange={(e) => setField("display_order", Number(e.target.value))} />
            </div>
            <div>
              <label style={labelStyle}>Visible</label>
              <input type="checkbox" checked={draft.is_active} onChange={(e) => setField("is_active", e.target.checked)} style={{ width: "18px", height: "18px", cursor: "pointer" }} />
            </div>
          </div>
          <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
            <button onClick={save} disabled={saving} style={btn("var(--accent)")}>
              {saving ? <Loader2 size={14} /> : <Check size={14} />} Enregistrer
            </button>
            <button onClick={() => setDraft(null)} style={{ ...btn("var(--stroke)"), color: "var(--text)" }}>
              <X size={14} /> Annuler
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h3 style={{ margin: 0 }}>FAQ (accueil + contact)</h3>
        <button onClick={startNew} style={btn("var(--accent)")}>
          <Plus size={14} /> Ajouter une question
        </button>
      </div>
      <p style={{ fontSize: "12px", color: "var(--muted)", marginTop: 0 }}>
        Ces questions alimentent la FAQ visible (accueil + contact) ET les données structurées. Redéployez après modification.
      </p>
      {items.length === 0 && (
        <p style={{ fontSize: "13px", color: "var(--muted)" }}>
          Aucune question. Exécutez d'abord la migration <code>create_faq_items_table.sql</code> dans Supabase.
        </p>
      )}
      {items.map((item) => (
        <div
          key={item.id}
          style={{
            padding: "12px",
            marginBottom: "10px",
            border: "1px solid var(--stroke)",
            borderRadius: "6px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 500 }}>{item.question_en}</div>
            <div style={{ fontSize: "12px", color: "var(--muted)" }}>
              #{item.display_order} {item.is_active ? "✓ Visible" : "○ Masquée"}
            </div>
          </div>
          <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
            <button onClick={() => setDraft(item)} style={btn("var(--accent)")}>
              <Pencil size={14} /> Éditer
            </button>
            <button onClick={() => remove(item.id)} style={btn("#f44336")}>
              <Trash2 size={14} /> Supprimer
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
