import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Check, X, Loader2 } from "lucide-react";

export function BlogArticlesPanel({ onSave }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editDraft, setEditDraft] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const { loadBlogArticles } = await import("../data/adminRepository");
      const data = await loadBlogArticles();
      setArticles(data);
    } catch (error) {
      console.error("Failed to load articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (article) => {
    setEditingId(article.id);
    setEditDraft(article);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditDraft(null);
  };

  const saveEdit = async () => {
    if (!editDraft) return;
    try {
      setSaving(true);
      const { updateBlogArticle } = await import("../data/adminRepository");
      await updateBlogArticle(editDraft.id, editDraft);
      await loadArticles();
      setEditingId(null);
      setEditDraft(null);
      onSave?.();
    } catch (error) {
      console.error("Failed to save article:", error);
      alert(`Erreur: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const deleteArticle = async (id) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet article?")) return;
    try {
      const { deleteBlogArticle } = await import("../data/adminRepository");
      await deleteBlogArticle(id);
      await loadArticles();
    } catch (error) {
      console.error("Failed to delete article:", error);
      alert(`Erreur: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <Loader2 size={20} style={{ display: "inline", animation: "spin 1s linear infinite" }} />
        <p>Chargement des articles...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h3 style={{ marginTop: 0 }}>Articles de Blog</h3>

      {editingId ? (
        <ArticleEditor
          article={editDraft}
          onChange={setEditDraft}
          onSave={saveEdit}
          onCancel={cancelEdit}
          saving={saving}
        />
      ) : (
        <>
          <div style={{ marginBottom: "20px" }}>
            {articles.map((article) => (
              <div
                key={article.id}
                style={{
                  padding: "12px",
                  marginBottom: "10px",
                  border: "1px solid var(--stroke)",
                  borderRadius: "6px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontWeight: 500 }}>{article.title_en}</div>
                  <div style={{ fontSize: "12px", color: "var(--muted)" }}>
                    {article.slug} {article.is_active ? "✓ Publié" : "○ Brouillon"}
                  </div>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => startEdit(article)}
                    style={{
                      padding: "6px 12px",
                      background: "var(--accent)",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <Pencil size={14} /> Éditer
                  </button>
                  <button
                    onClick={() => deleteArticle(article.id)}
                    style={{
                      padding: "6px 12px",
                      background: "#f44336",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <Trash2 size={14} /> Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ArticleEditor({ article, onChange, onSave, onCancel, saving }) {
  const updateField = (field, value) => {
    onChange({ ...article, [field]: value });
  };

  // ---- Body sections (content_en / content_fr are parallel arrays of {heading, body}) ----
  const en = Array.isArray(article.content_en) ? article.content_en : [];
  const fr = Array.isArray(article.content_fr) ? article.content_fr : [];
  const sectionCount = Math.max(en.length, fr.length);
  const sec = (arr, i) => arr[i] || { heading: "", body: "" };
  // Editing one field of one language is a single-field update (safe).
  const setSection = (langKey, i, field, value) => {
    const key = langKey === "en" ? "content_en" : "content_fr";
    const arr = [...(article[key] || [])];
    while (arr.length < sectionCount) arr.push({ heading: "", body: "" });
    arr[i] = { ...sec(arr, i), [field]: value };
    updateField(key, arr);
  };
  // Structural changes touch BOTH arrays — do it in one onChange to avoid stale state.
  const padTo = (arr, n) => {
    const out = [...arr];
    while (out.length < n) out.push({ heading: "", body: "" });
    return out;
  };
  const addSection = () =>
    onChange({
      ...article,
      content_en: [...padTo(en, sectionCount), { heading: "", body: "" }],
      content_fr: [...padTo(fr, sectionCount), { heading: "", body: "" }],
    });
  const removeSection = (i) =>
    onChange({
      ...article,
      content_en: padTo(en, sectionCount).filter((_, idx) => idx !== i),
      content_fr: padTo(fr, sectionCount).filter((_, idx) => idx !== i),
    });
  const moveSection = (i, dir) => {
    const target = i + dir;
    if (target < 0 || target >= sectionCount) return;
    const swap = (arr) => {
      const a = padTo(arr, sectionCount);
      [a[i], a[target]] = [a[target], a[i]];
      return a;
    };
    onChange({ ...article, content_en: swap(en), content_fr: swap(fr) });
  };

  return (
    <div style={{ border: "1px solid var(--stroke)", borderRadius: "6px", padding: "16px" }}>
      <h4 style={{ marginTop: 0 }}>Édition d'article</h4>

      <div style={{ marginBottom: "12px" }}>
        <label style={{ display: "block", fontSize: "12px", fontWeight: 500, marginBottom: "4px" }}>
          Slug
        </label>
        <input
          type="text"
          value={article.slug}
          onChange={(e) => updateField("slug", e.target.value)}
          disabled
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid var(--stroke)",
            borderRadius: "4px",
            fontSize: "13px",
          }}
        />
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label style={{ display: "block", fontSize: "12px", fontWeight: 500, marginBottom: "4px" }}>
          Titre (English)
        </label>
        <input
          type="text"
          value={article.title_en}
          onChange={(e) => updateField("title_en", e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid var(--stroke)",
            borderRadius: "4px",
            fontSize: "13px",
          }}
        />
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label style={{ display: "block", fontSize: "12px", fontWeight: 500, marginBottom: "4px" }}>
          Título (Español)
        </label>
        <input
          type="text"
          value={article.title_fr}
          onChange={(e) => updateField("title_fr", e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid var(--stroke)",
            borderRadius: "4px",
            fontSize: "13px",
          }}
        />
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label style={{ display: "block", fontSize: "12px", fontWeight: 500, marginBottom: "4px" }}>
          Introduction (English)
        </label>
        <textarea
          value={article.intro_en}
          onChange={(e) => updateField("intro_en", e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid var(--stroke)",
            borderRadius: "4px",
            fontSize: "13px",
            minHeight: "60px",
            fontFamily: "var(--mono)",
          }}
        />
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label style={{ display: "block", fontSize: "12px", fontWeight: 500, marginBottom: "4px" }}>
          Introducción (Español)
        </label>
        <textarea
          value={article.intro_fr}
          onChange={(e) => updateField("intro_fr", e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid var(--stroke)",
            borderRadius: "4px",
            fontSize: "13px",
            minHeight: "60px",
            fontFamily: "var(--mono)",
          }}
        />
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label style={{ display: "block", fontSize: "12px", fontWeight: 500, marginBottom: "4px" }}>
          CTA (English)
        </label>
        <textarea
          value={article.cta_en}
          onChange={(e) => updateField("cta_en", e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid var(--stroke)",
            borderRadius: "4px",
            fontSize: "13px",
            minHeight: "40px",
            fontFamily: "var(--mono)",
          }}
        />
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label style={{ display: "block", fontSize: "12px", fontWeight: 500, marginBottom: "4px" }}>
          CTA Botón (English)
        </label>
        <input
          type="text"
          value={article.cta_button_en}
          onChange={(e) => updateField("cta_button_en", e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid var(--stroke)",
            borderRadius: "4px",
            fontSize: "13px",
          }}
        />
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label style={{ display: "block", fontSize: "12px", fontWeight: 500, marginBottom: "4px" }}>
          CTA (Español)
        </label>
        <textarea
          value={article.cta_fr || ""}
          onChange={(e) => updateField("cta_fr", e.target.value)}
          style={{ width: "100%", padding: "8px", border: "1px solid var(--stroke)", borderRadius: "4px", fontSize: "13px", minHeight: "40px", fontFamily: "var(--mono)" }}
        />
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label style={{ display: "block", fontSize: "12px", fontWeight: 500, marginBottom: "4px" }}>
          CTA Botón (Español)
        </label>
        <input
          type="text"
          value={article.cta_button_fr || ""}
          onChange={(e) => updateField("cta_button_fr", e.target.value)}
          style={{ width: "100%", padding: "8px", border: "1px solid var(--stroke)", borderRadius: "4px", fontSize: "13px" }}
        />
      </div>

      {/* ---- Body sections ---- */}
      <div style={{ marginTop: "20px", marginBottom: "12px", borderTop: "1px solid var(--stroke)", paddingTop: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <strong style={{ fontSize: "13px" }}>Contenu de l'article ({sectionCount} section{sectionCount > 1 ? "s" : ""})</strong>
          <button onClick={addSection} style={{ padding: "6px 12px", background: "var(--accent)", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>
            <Plus size={14} /> Section
          </button>
        </div>
        {Array.from({ length: sectionCount }).map((_, i) => (
          <div key={i} style={{ border: "1px solid var(--stroke)", borderRadius: "6px", padding: "12px", marginBottom: "12px", background: "rgba(0,0,0,0.02)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--muted)" }}>Section {i + 1}</span>
              <div style={{ display: "flex", gap: "6px" }}>
                <button onClick={() => moveSection(i, -1)} disabled={i === 0} title="Monter" style={{ padding: "4px 8px", border: "1px solid var(--stroke)", borderRadius: "4px", cursor: i === 0 ? "default" : "pointer", background: "white", opacity: i === 0 ? 0.4 : 1 }}>↑</button>
                <button onClick={() => moveSection(i, 1)} disabled={i === sectionCount - 1} title="Descendre" style={{ padding: "4px 8px", border: "1px solid var(--stroke)", borderRadius: "4px", cursor: i === sectionCount - 1 ? "default" : "pointer", background: "white", opacity: i === sectionCount - 1 ? 0.4 : 1 }}>↓</button>
                <button onClick={() => removeSection(i)} title="Supprimer" style={{ padding: "4px 8px", border: "none", borderRadius: "4px", cursor: "pointer", background: "#f44336", color: "white" }}><Trash2 size={13} /></button>
              </div>
            </div>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 500, marginBottom: "3px" }}>Titre (English)</label>
            <input value={sec(en, i).heading} onChange={(e) => setSection("en", i, "heading", e.target.value)} style={{ width: "100%", padding: "7px", border: "1px solid var(--stroke)", borderRadius: "4px", fontSize: "13px", marginBottom: "8px" }} />
            <label style={{ display: "block", fontSize: "11px", fontWeight: 500, marginBottom: "3px" }}>Texte (English) — séparez les paragraphes par une ligne vide</label>
            <textarea value={sec(en, i).body} onChange={(e) => setSection("en", i, "body", e.target.value)} style={{ width: "100%", padding: "7px", border: "1px solid var(--stroke)", borderRadius: "4px", fontSize: "13px", minHeight: "90px", marginBottom: "10px", fontFamily: "var(--mono)" }} />
            <label style={{ display: "block", fontSize: "11px", fontWeight: 500, marginBottom: "3px" }}>Título (Español)</label>
            <input value={sec(fr, i).heading} onChange={(e) => setSection("fr", i, "heading", e.target.value)} style={{ width: "100%", padding: "7px", border: "1px solid var(--stroke)", borderRadius: "4px", fontSize: "13px", marginBottom: "8px" }} />
            <label style={{ display: "block", fontSize: "11px", fontWeight: 500, marginBottom: "3px" }}>Texto (Español)</label>
            <textarea value={sec(fr, i).body} onChange={(e) => setSection("fr", i, "body", e.target.value)} style={{ width: "100%", padding: "7px", border: "1px solid var(--stroke)", borderRadius: "4px", fontSize: "13px", minHeight: "90px", fontFamily: "var(--mono)" }} />
          </div>
        ))}
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label style={{ display: "block", fontSize: "12px", fontWeight: 500, marginBottom: "4px" }}>
          Publié
        </label>
        <input
          type="checkbox"
          checked={article.is_active}
          onChange={(e) => updateField("is_active", e.target.checked)}
          style={{ width: "18px", height: "18px", cursor: "pointer" }}
        />
      </div>

      <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
        <button
          onClick={onSave}
          disabled={saving}
          style={{
            padding: "8px 16px",
            background: "var(--accent)",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          {saving ? <Loader2 size={14} /> : <Check size={14} />}
          Enregistrer
        </button>
        <button
          onClick={onCancel}
          style={{
            padding: "8px 16px",
            background: "var(--stroke)",
            color: "var(--text)",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <X size={14} /> Annuler
        </button>
      </div>
    </div>
  );
}
