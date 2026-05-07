import { useEffect, useMemo, useRef, useState } from "react";
import { hydrateContentFromSupabase } from "../data/contentRepository";
import {
  createProjectImage,
  getAdminSession,
  loadAdminData,
  onAdminAuthChange,
  signInAdmin,
  signOutAdmin,
  updateCmsSection,
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
  uploadProjectImageFile,
} from "../data/adminRepository";

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

export function AdminPage({ onNav }) {
  const [session, setSession] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [loadingData, setLoadingData] = useState(false);
  const [data, setData] = useState(EMPTY_ADMIN_DATA);
  const [tab, setTab] = useState("dashboard");
  const [error, setError] = useState("");

  const refresh = async () => {
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
    } finally {
      setLoadingData(false);
    }
  };

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
  }, [session]);

  if (checkingSession) return <AdminShell message="Checking admin session..." />;
  if (!session) return <AdminLogin onSignedIn={setSession} />;

  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "pages", label: "Pages" },
    { id: "projects", label: "Projects" },
    { id: "services", label: "Services" },
    { id: "team", label: "Team" },
    { id: "process", label: "Process" },
    { id: "legal", label: "Legal" },
    { id: "settings", label: "Settings" },
    { id: "messages", label: "Messages" },
    { id: "emails", label: "Email leads" },
  ];

  const signOut = async () => {
    await signOutAdmin();
    setSession(null);
    setData(EMPTY_ADMIN_DATA);
  };

  return (
    <div style={{ paddingTop: "88px", minHeight: "100vh", background: "var(--paper)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", minHeight: "calc(100vh - 88px)" }}>
        <aside style={{ borderRight: "1px solid var(--line)", padding: "32px 20px", background: "var(--cream)" }}>
          <div className="text-mono text-muted" style={{ marginBottom: "24px" }}>ADMIN · SUPABASE</div>
          <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {tabs.map((item) => (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                style={{
                  textAlign: "left",
                  padding: "12px 14px",
                  borderRadius: "8px",
                  background: tab === item.id ? "var(--ink)" : "transparent",
                  color: tab === item.id ? "var(--cream)" : "var(--ink)",
                  border: 0,
                  fontSize: "14px",
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div style={{ marginTop: "32px", paddingTop: "20px", borderTop: "1px solid var(--line)", display: "flex", flexDirection: "column", gap: "8px" }}>
            <button onClick={refresh} className="btn btn-ghost" style={{ justifyContent: "center", padding: "12px 16px" }} disabled={loadingData}>
              {loadingData ? "Refreshing..." : "Refresh data"}
            </button>
            <button onClick={() => onNav("home")} style={sidebarLinkStyle}>View site</button>
            <button onClick={signOut} style={sidebarLinkStyle}>Sign out</button>
          </div>
        </aside>

        <main style={{ padding: "40px 60px" }}>
          {error && <Notice tone="error" text={error} />}
          {loadingData && <Notice text="Loading Supabase data..." />}

          {tab === "dashboard" && <Dashboard data={data} />}
          {tab === "pages" && <PagesAdmin data={data} onRefresh={refresh} />}
          {tab === "projects" && <ProjectsAdmin data={data} onRefresh={refresh} />}
          {tab === "services" && (
            <RecordCollectionAdmin
              title="Services"
              sub="Modifier les cartes services affichées sur l'accueil"
              records={data.services}
              fields={SERVICE_FIELDS}
              getLabel={(service) => text(service.title)}
              getMeta={(service) => service.slug}
              onSave={(id, payload) => updateService(id, payload)}
              onRefresh={refresh}
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
    </div>
  );
}

function AdminShell({ message }) {
  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "var(--ink)", color: "var(--cream)" }}>
      <div className="text-mono">{message}</div>
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
    <div style={{ paddingTop: "88px", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--ink)" }}>
      <div style={{ background: "var(--paper)", borderRadius: "24px", padding: "56px", maxWidth: "480px", width: "100%" }}>
        <div className="text-mono" style={{ color: "var(--accent)" }}>ADMIN · ACCÈS PRIVÉ</div>
        <h2 className="display-m" style={{ marginTop: "16px" }}>Mot de passe</h2>
        <p style={{ color: "var(--muted)", marginTop: "12px", fontSize: "14px" }}>
          L'accès utilise un compte Supabase admin configuré côté projet. Tu n'as qu'un mot de passe à saisir.
        </p>
        <form onSubmit={submit} style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "22px" }}>
          <div className="field">
            <label>Mot de passe admin</label>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required autoFocus />
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

function Dashboard({ data }) {
  const newMessages = data.contactSubmissions.filter((item) => item.status === "new");
  const liveProjects = data.projects.filter((item) => item.status === "live");
  const recent = useMemo(() => {
    const messages = data.contactSubmissions.map((item) => ({
      type: "Contact",
      label: `${item.name} · ${item.service_slug}`,
      date: item.submitted_at,
      color: "var(--accent)",
    }));
    const leads = data.emailLeads.map((item) => ({
      type: "Email lead",
      label: item.email,
      date: item.captured_at,
      color: "var(--brass)",
    }));
    return [...messages, ...leads]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 8);
  }, [data]);

  const stats = [
    { label: "Email leads", value: data.emailLeads.length },
    { label: "Contact requests", value: data.contactSubmissions.length },
    { label: "New requests", value: newMessages.length },
    { label: "Live projects", value: liveProjects.length },
    { label: "Services", value: data.services.length },
  ];

  return (
    <div>
      <PageHead title="Dashboard" sub="Live data from Supabase" />
      <div style={statGridStyle}>
        {stats.map((item) => <StatCard key={item.label} {...item} />)}
      </div>
      <Panel title="Recent activity" style={{ marginTop: "24px" }}>
        {recent.length ? recent.map((item) => (
          <div key={`${item.type}-${item.date}-${item.label}`} style={rowStyle}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: item.color }} />
            <span style={{ flex: 1 }}><strong>{item.type}</strong> · {item.label}</span>
            <span className="text-mono text-muted">{formatDate(item.date)}</span>
          </div>
        )) : <EmptyState text="No activity yet." />}
      </Panel>
    </div>
  );
}

function MessagesAdmin({ data, onRefresh }) {
  const [active, setActive] = useState(null);
  const messages = data.contactSubmissions;

  const changeStatus = async (id, status) => {
    await updateContactSubmissionStatus(id, status);
    await onRefresh();
    setActive((current) => current && { ...current, status });
  };

  return (
    <div>
      <PageHead title="Messages" sub={`${messages.filter((item) => item.status === "new").length} new · ${messages.length} total`} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "16px", marginTop: "28px" }}>
        <Panel>
          {messages.length ? messages.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item)}
              style={{
                ...listButtonStyle,
                background: active?.id === item.id ? "var(--cream-deep)" : "transparent",
              }}
            >
              <span style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}>
                <strong>{item.name}</strong>
                <span className="tag">{item.status}</span>
              </span>
              <span className="text-mono text-muted">{item.service_slug}</span>
              <span style={truncateStyle}>{item.message}</span>
            </button>
          )) : <EmptyState text="No contact request yet." />}
        </Panel>
        <Panel>
          {active ? (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "16px", alignItems: "start" }}>
                <div>
                  <h2 style={smallTitleStyle}>{active.name}</h2>
                  <div className="text-mono text-muted">{formatDate(active.submitted_at)}</div>
                </div>
                <select value={active.status} onChange={(event) => changeStatus(active.id, event.target.value)} style={selectStyle}>
                  {STATUS_OPTIONS.map((status) => <option key={status}>{status}</option>)}
                </select>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", margin: "28px 0", padding: "20px 0", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
                <Meta label="Email" value={<a href={`mailto:${active.email}`}>{active.email}</a>} />
                <Meta label="Phone" value={active.phone || "—"} />
                <Meta label="Service" value={active.service_slug} />
                <Meta label="Locale" value={active.locale} />
              </div>
              <p style={{ color: "var(--ink-soft)", lineHeight: 1.7 }}>{active.message}</p>
              <div style={{ marginTop: "28px", display: "flex", gap: "12px" }}>
                <a className="btn" href={`mailto:${active.email}`}>Reply by email</a>
                <button className="btn btn-ghost" onClick={() => changeStatus(active.id, "replied")}>Mark replied</button>
                <button className="btn btn-ghost" onClick={() => changeStatus(active.id, "archived")}>Archive</button>
              </div>
            </div>
          ) : <EmptyState text="Select a message to inspect it." />}
        </Panel>
      </div>
    </div>
  );
}

function EmailsAdmin({ data, onRefresh }) {
  const leads = data.emailLeads;
  const exportLeads = () => exportCsv("email-leads.csv", [
    ["email", "status", "source", "locale", "captured_at"],
    ...leads.map((lead) => [lead.email, lead.status, lead.source, lead.locale, lead.captured_at]),
  ]);

  const changeStatus = async (id, status) => {
    await updateEmailLeadStatus(id, status);
    await onRefresh();
  };

  return (
    <div>
      <PageHead title="Email leads" sub={`${leads.length} captured`} cta="Export CSV" onCta={exportLeads} />
      <Panel style={{ marginTop: "28px" }}>
        <TableHeader columns="2fr 1fr 1fr 1fr 160px" labels={["Email", "Status", "Source", "Locale", "Captured"]} />
        {leads.length ? leads.map((lead) => (
          <div key={lead.id} style={{ ...tableRowStyle, gridTemplateColumns: "2fr 1fr 1fr 1fr 160px" }}>
            <span>{lead.email}</span>
            <select value={lead.status} onChange={(event) => changeStatus(lead.id, event.target.value)} style={selectStyle}>
              {LEAD_STATUS_OPTIONS.map((status) => <option key={status}>{status}</option>)}
            </select>
            <span>{lead.source}</span>
            <span className="text-mono text-muted">{lead.locale}</span>
            <span className="text-mono text-muted">{formatDate(lead.captured_at)}</span>
          </div>
        )) : <EmptyState text="No email lead yet." />}
      </Panel>
    </div>
  );
}

const PAGE_ROUTE = { home: "home", projects: "projects", contact: "contact", global: "home" };

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
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "28px", margin: 0 }}>Pages</h2>
          <p style={{ color: "var(--muted)", fontSize: "13px", marginTop: "4px" }}>Modifier les textes directement sur la page</p>
        </div>
        <div style={{ display: "flex", gap: "4px", padding: "4px", border: "1px solid var(--line)", borderRadius: "100px" }}>
          {pageKeys.map((key) => (
            <button
              key={key}
              onClick={() => setPageKey(key)}
              style={{
                padding: "6px 16px", borderRadius: "100px", border: 0, cursor: "pointer",
                fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase",
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

      <div style={{ display: "flex", gap: "20px", height: "calc(100vh - 270px)", minHeight: "500px" }}>
        {/* Left: section list + editor — scrolls independently */}
        <div style={{ width: "360px", flexShrink: 0, overflowY: "auto", display: "flex", flexDirection: "column", gap: "12px" }}>
          <Panel title="Sections">
            {pageSections.length ? pageSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveId(section.id)}
                style={{ ...listButtonStyle, background: active?.id === section.id ? "var(--cream-deep)" : "transparent" }}
              >
                <strong>{SECTION_LABELS[section.section_key] || humanize(section.section_key)}</strong>
                <span className="text-mono text-muted">{section.is_active ? "visible" : "masqué"}</span>
              </button>
            )) : <EmptyState text="Aucune section pour cette page." />}
          </Panel>
          <Panel>
            {active ? <CmsVisualEditor section={active} onRefresh={onRefresh} /> : <EmptyState text="Sélectionnez une section." />}
          </Panel>
        </div>

        {/* Right: live page preview — fixed height, user can scroll inside iframe */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
          <div style={{ fontSize: "11px", fontFamily: "var(--mono)", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "8px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
            <span>Aperçu — /{iframeRoute}{active ? ` · ${SECTION_LABELS[active.section_key] || active.section_key}` : ""}</span>
            <a href={`/#${iframeRoute}`} target="_blank" rel="noreferrer" style={{ color: "var(--muted)", textDecoration: "none" }}>Ouvrir ↗</a>
          </div>
          <div style={{ flex: 1, borderRadius: "12px", overflow: "hidden", border: "1px solid var(--line)", background: "var(--cream-deep)" }}>
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

function CmsVisualEditor({ section, onRefresh }) {
  const [draft, setDraft] = useState(() => clone(section.content));
  const [advanced, setAdvanced] = useState(false);
  const [jsonValue, setJsonValue] = useState(JSON.stringify(section.content, null, 2));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setDraft(clone(section.content));
    setJsonValue(JSON.stringify(section.content, null, 2));
    setError("");
    setAdvanced(false);
  }, [section.id, section.content]);

  const save = async () => {
    setSaving(true);
    setError("");
    try {
      const content = advanced ? JSON.parse(jsonValue) : draft;
      await updateCmsSection(section.id, content);
      await onRefresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <EditorHeader
        title={SECTION_LABELS[section.section_key] || humanize(section.section_key)}
        meta={`${PAGE_LABELS[section.page_key] || section.page_key} · ${section.section_key}`}
        saving={saving}
        onSave={save}
      />
      {error && <Notice tone="error" text={error} />}
      {!advanced ? (
        <JsonFieldEditor value={draft} onChange={setDraft} root />
      ) : (
        <textarea value={jsonValue} onChange={(event) => setJsonValue(event.target.value)} style={jsonTextareaStyle} spellCheck="false" />
      )}
      <div style={{ marginTop: "16px", display: "flex", gap: "12px", alignItems: "center" }}>
        <button className="btn btn-ghost" onClick={() => setDraft(clone(section.content))}>Annuler les changements</button>
        <button className="btn btn-ghost" onClick={() => setAdvanced((value) => !value)}>
          {advanced ? "Revenir au formulaire" : "Mode avancé JSON"}
        </button>
      </div>
    </div>
  );
}

function ProjectsAdmin({ data, onRefresh }) {
  const servicesById = useMemo(
    () => Object.fromEntries(data.services.map((service) => [service.id, service])),
    [data.services],
  );
  const [activeId, setActiveId] = useState(data.projects[0]?.id || "");
  const active = data.projects.find((project) => project.id === activeId) || data.projects[0];

  useEffect(() => {
    if (!activeId && data.projects[0]?.id) setActiveId(data.projects[0].id);
  }, [activeId, data.projects]);

  return (
    <div>
      <PageHead title="Projects" sub="Modifier les réalisations affichées sur le site" />
      <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: "16px", marginTop: "28px", alignItems: "start" }}>
        <Panel title="Projects">
          {data.projects.length ? data.projects.map((project) => (
            <button key={project.id} onClick={() => setActiveId(project.id)} style={{ ...listButtonStyle, background: active?.id === project.id ? "var(--cream-deep)" : "transparent" }}>
              <strong>{text(project.name)}</strong>
              <span className="text-mono text-muted">{project.status} · {text(servicesById[project.service_id]?.title)}</span>
            </button>
          )) : <EmptyState text="No project in database." />}
        </Panel>
        <Panel>
          {active ? (
            <ProjectEditor
              project={active}
              services={data.services}
              images={data.projectImages.filter((image) => image.project_id === active.id)}
              onRefresh={onRefresh}
            />
          ) : <EmptyState text="Select a project." />}
        </Panel>
      </div>
    </div>
  );
}

function ProjectEditor({ project, services, images, onRefresh }) {
  const [draft, setDraft] = useState(() => pickFields(project, PROJECT_FIELDS));
  const [imageDrafts, setImageDrafts] = useState(() => clone(images));
  const [saving, setSaving] = useState(false);
  const [uploadingImageId, setUploadingImageId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setDraft(pickFields(project, PROJECT_FIELDS));
    setImageDrafts(clone(images));
    setError("");
  }, [project.id, images]);

  const save = async () => {
    setSaving(true);
    setError("");
    try {
      await updateProject(project.id, {
        ...draft,
        service_id: draft.service_id || null,
        display_order: Number(draft.display_order || 0),
      });
      await Promise.all(imageDrafts.map((image) => updateProjectImage(image.id, {
        image_url: image.image_url || null,
        alt_text: image.alt_text || null,
        label: image.label || null,
        placeholder_color: image.placeholder_color || null,
        kind: image.kind || "gallery",
        display_order: Number(image.display_order || 0),
      })));
      await onRefresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const setField = (key, value) => setDraft((current) => ({ ...current, [key]: value }));
  const setImage = (id, key, value) => {
    setImageDrafts((current) => current.map((image) => image.id === id ? { ...image, [key]: value } : image));
  };
  const addImage = async () => {
    setSaving(true);
    setError("");
    try {
      const nextOrder = Math.max(0, ...imageDrafts.map((image) => Number(image.display_order || 0))) + 10;
      await createProjectImage(project.id, nextOrder);
      await onRefresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };
  const uploadImage = async (image, file) => {
    if (!file) return;
    setUploadingImageId(image.id);
    setError("");
    try {
      const uploaded = await uploadProjectImageFile({
        file,
        projectSlug: draft.slug,
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
      setImageDrafts((current) => current.map((item) => item.id === image.id ? { ...item, image_url: uploaded.url, label: nextLabel } : item));
      await onRefresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setUploadingImageId("");
    }
  };

  return (
    <div>
      <EditorHeader title={text(project.name)} meta={project.slug} saving={saving} onSave={save} />
      {error && <Notice tone="error" text={error} />}
      <div style={editorSectionStyle}>
        <div style={editorGridStyle}>
          <TextControl label="Slug" value={draft.slug} onChange={(value) => setField("slug", value)} />
          <TextControl label="Year" value={draft.year || ""} onChange={(value) => setField("year", value)} />
          <SelectControl label="Status" value={draft.status} options={PROJECT_STATUS_OPTIONS} onChange={(value) => setField("status", value)} />
          <SelectControl
            label="Service"
            value={draft.service_id || ""}
            options={[{ value: "", label: "No service" }, ...services.map((service) => ({ value: service.id, label: text(service.title) }))]}
            onChange={(value) => setField("service_id", value)}
          />
          <NumberControl label="Display order" value={draft.display_order || 0} onChange={(value) => setField("display_order", value)} />
          <CheckboxControl label="Featured" checked={draft.is_featured} onChange={(value) => setField("is_featured", value)} />
          <CheckboxControl label="Large tile" checked={draft.is_large} onChange={(value) => setField("is_large", value)} />
        </div>
      </div>
      {PROJECT_EDITABLE_FIELDS.map((field) => (
        <div key={field.key} style={editorSectionStyle}>
          <JsonFieldEditor label={field.label} value={draft[field.key]} onChange={(value) => setField(field.key, value)} />
        </div>
      ))}
      <div style={editorSectionStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "16px", alignItems: "center", marginBottom: "16px" }}>
          <h3 style={{ ...formSectionTitleStyle, margin: 0 }}>Images</h3>
          <button className="btn btn-ghost" onClick={addImage} disabled={saving}>Ajouter une image</button>
        </div>
        {imageDrafts.length ? imageDrafts.map((image) => (
          <div key={image.id} style={nestedCardStyle}>
            {image.image_url && (
              <div style={{ marginBottom: "16px", borderRadius: "10px", overflow: "hidden", border: "1px solid var(--line)", background: "var(--cream-deep)" }}>
                <img src={image.image_url} alt={image.label || ""} style={{ display: "block", width: "100%", maxHeight: "260px", objectFit: "cover" }} />
              </div>
            )}
            <div style={editorGridStyle}>
              <TextControl label="Label" value={image.label || ""} onChange={(value) => setImage(image.id, "label", value)} />
              <TextControl label="Image URL" value={image.image_url || ""} onChange={(value) => setImage(image.id, "image_url", value)} />
              <TextControl label="Placeholder color" value={image.placeholder_color || ""} onChange={(value) => setImage(image.id, "placeholder_color", value)} />
              <SelectControl label="Type" value={image.kind} options={["hero", "before", "after", "gallery", "detail"]} onChange={(value) => setImage(image.id, "kind", value)} />
              <NumberControl label="Order" value={image.display_order || 0} onChange={(value) => setImage(image.id, "display_order", value)} />
            </div>
            <FileUploadControl
              label="Importer depuis mon ordinateur"
              uploading={uploadingImageId === image.id}
              onChange={(file) => uploadImage(image, file)}
            />
            <JsonFieldEditor label="Alt text" value={image.alt_text || { en: "", fr: "" }} onChange={(value) => setImage(image.id, "alt_text", value)} />
          </div>
        )) : <EmptyState text="No image record for this project." />}
      </div>
    </div>
  );
}

function RecordCollectionAdmin({ title, sub, records, fields, getLabel, getMeta, onSave, onRefresh, embedded = false }) {
  const [activeId, setActiveId] = useState(records[0]?.id || records[0]?.key || "");
  const active = records.find((record) => getRecordId(record) === activeId) || records[0];

  useEffect(() => {
    if (records.length && !records.some((record) => getRecordId(record) === activeId)) {
      setActiveId(getRecordId(records[0]));
    }
  }, [activeId, records]);

  return (
    <div>
      {!embedded && <PageHead title={title} sub={sub} />}
      <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: "16px", marginTop: embedded ? 0 : "28px", alignItems: "start" }}>
        <Panel title={title}>
          {records.length ? records.map((record) => (
            <button key={getRecordId(record)} onClick={() => setActiveId(getRecordId(record))} style={{ ...listButtonStyle, background: active && getRecordId(active) === getRecordId(record) ? "var(--cream-deep)" : "transparent" }}>
              <strong>{getLabel(record)}</strong>
              <span className="text-mono text-muted">{getMeta(record)}</span>
            </button>
          )) : <EmptyState text="No record yet." />}
        </Panel>
        <Panel>
          {active ? (
            <RecordEditor
              record={active}
              title={getLabel(active)}
              meta={getMeta(active)}
              fields={fields}
              onSave={onSave}
              onRefresh={onRefresh}
            />
          ) : <EmptyState text="Select a record." />}
        </Panel>
      </div>
    </div>
  );
}

function RecordEditor({ record, title, meta, fields, onSave, onRefresh }) {
  const [draft, setDraft] = useState(() => pickFields(record, fields));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setDraft(pickFields(record, fields));
    setError("");
  }, [record, fields]);

  const save = async () => {
    setSaving(true);
    setError("");
    try {
      await onSave(getRecordId(record), normalizeNumericFields(draft, fields));
      await onRefresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <EditorHeader title={title} meta={meta} saving={saving} onSave={save} />
      {error && <Notice tone="error" text={error} />}
      {fields.map((field) => (
        <div key={field.key} style={editorSectionStyle}>
          {field.type === "select" ? (
            <SelectControl label={field.label} value={draft[field.key]} options={field.options} onChange={(value) => setDraft((current) => ({ ...current, [field.key]: value }))} />
          ) : field.type === "checkbox" ? (
            <CheckboxControl label={field.label} checked={Boolean(draft[field.key])} onChange={(value) => setDraft((current) => ({ ...current, [field.key]: value }))} />
          ) : field.type === "number" ? (
            <NumberControl label={field.label} value={draft[field.key] || 0} onChange={(value) => setDraft((current) => ({ ...current, [field.key]: value }))} />
          ) : (
            <JsonFieldEditor label={field.label} value={draft[field.key] ?? field.fallback} onChange={(value) => setDraft((current) => ({ ...current, [field.key]: value }))} />
          )}
        </div>
      ))}
    </div>
  );
}

function LegalAdmin({ data, onRefresh }) {
  return (
    <div>
      <PageHead title="Legal" sub="Modifier les conditions affichées sur la page Conditions" />
      <div style={{ display: "grid", gap: "24px", marginTop: "28px" }}>
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
      <PageHead title="Settings" sub="Modifier les contacts et réglages globaux" />
      <div style={{ display: "grid", gap: "24px", marginTop: "28px" }}>
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

function EditorHeader({ title, meta, saving, onSave }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: "24px", alignItems: "flex-start", marginBottom: "24px", paddingBottom: "20px", borderBottom: "1px solid var(--line)" }}>
      <div>
        <h2 style={smallTitleStyle}>{title}</h2>
        <div className="text-mono text-muted" style={{ marginTop: "8px" }}>{meta}</div>
      </div>
      <button className="btn" onClick={onSave} disabled={saving}>{saving ? "Enregistrement..." : "Enregistrer"}</button>
    </div>
  );
}

function JsonFieldEditor({ label, value, onChange, root = false }) {
  if (isLocalizedObject(value)) {
    return <LocalizedEditor label={label} value={value} onChange={onChange} />;
  }

  if (Array.isArray(value)) {
    return <ArrayEditor label={label} value={value} onChange={onChange} />;
  }

  if (isPlainObject(value)) {
    return (
      <div>
        {!root && label && <h3 style={formSectionTitleStyle}>{label}</h3>}
        <div style={{ display: "grid", gap: "18px" }}>
          {Object.entries(value).map(([key, nextValue]) => (
            <JsonFieldEditor
              key={key}
              label={FIELD_LABELS[key] || humanize(key)}
              value={nextValue}
              onChange={(updated) => onChange({ ...value, [key]: updated })}
            />
          ))}
        </div>
      </div>
    );
  }

  if (typeof value === "boolean") {
    return <CheckboxControl label={label} checked={value} onChange={onChange} />;
  }

  if (typeof value === "number") {
    return <NumberControl label={label} value={value} onChange={onChange} />;
  }

  return <TextControl label={label} value={value ?? ""} onChange={onChange} multiline={String(value ?? "").length > 80} />;
}

function LocalizedEditor({ label, value, onChange }) {
  return (
    <div>
      {label && <h3 style={formSectionTitleStyle}>{label}</h3>}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        {["fr", "en"].map((lang) => (
          <div key={lang} style={nestedCardStyle}>
            <div className="text-mono text-muted" style={{ marginBottom: "10px" }}>{lang.toUpperCase()}</div>
            <JsonFieldEditor
              value={value?.[lang] ?? ""}
              onChange={(nextValue) => onChange({ ...(value || {}), [lang]: nextValue })}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function ArrayEditor({ label, value = [], onChange }) {
  const addItem = () => {
    const template = value[0];
    onChange([...value, isPlainObject(template) ? clone(template) : ""]);
  };
  const updateItem = (index, nextValue) => onChange(value.map((item, itemIndex) => itemIndex === index ? nextValue : item));
  const removeItem = (index) => onChange(value.filter((_, itemIndex) => itemIndex !== index));

  return (
    <div>
      {label && <h3 style={formSectionTitleStyle}>{label}</h3>}
      <div style={{ display: "grid", gap: "12px" }}>
        {value.map((item, index) => (
          <div key={index} style={nestedCardStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <span className="text-mono text-muted">Item {index + 1}</span>
              <button type="button" className="btn btn-ghost" style={{ padding: "8px 12px" }} onClick={() => removeItem(index)}>Remove</button>
            </div>
            <JsonFieldEditor value={item} onChange={(nextValue) => updateItem(index, nextValue)} />
          </div>
        ))}
        <button type="button" className="btn btn-ghost" style={{ justifySelf: "start" }} onClick={addItem}>Add item</button>
      </div>
    </div>
  );
}

function TextControl({ label, value, onChange, multiline = false }) {
  return (
    <label style={controlLabelStyle}>
      {label && <span>{label}</span>}
      {multiline ? (
        <textarea value={value} onChange={(event) => onChange(event.target.value)} style={adminTextareaStyle} />
      ) : (
        <input value={value} onChange={(event) => onChange(event.target.value)} style={adminInputStyle} />
      )}
    </label>
  );
}

function NumberControl({ label, value, onChange }) {
  return (
    <label style={controlLabelStyle}>
      {label && <span>{label}</span>}
      <input type="number" value={value} onChange={(event) => onChange(Number(event.target.value))} style={adminInputStyle} />
    </label>
  );
}

function SelectControl({ label, value, options, onChange }) {
  const normalized = options.map((option) => typeof option === "string" ? { value: option, label: option } : option);
  return (
    <label style={controlLabelStyle}>
      {label && <span>{label}</span>}
      <select value={value ?? ""} onChange={(event) => onChange(event.target.value)} style={selectStyle}>
        {normalized.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  );
}

function CheckboxControl({ label, checked, onChange }) {
  return (
    <label className="checkbox" style={{ alignItems: "center" }}>
      <input type="checkbox" checked={Boolean(checked)} onChange={(event) => onChange(event.target.checked)} />
      <span>{label}</span>
    </label>
  );
}

function FileUploadControl({ label, uploading, onChange }) {
  return (
    <label style={{ ...controlLabelStyle, marginTop: "16px", marginBottom: "16px" }}>
      <span>{label}</span>
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        disabled={uploading}
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) onChange(file);
          event.target.value = "";
        }}
        style={adminInputStyle}
      />
      {uploading && <span style={{ color: "var(--accent)", textTransform: "none", letterSpacing: 0 }}>Upload en cours...</span>}
    </label>
  );
}

function PageHead({ title, sub, cta, onCta }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px solid var(--line)", paddingBottom: "24px", gap: "24px" }}>
      <div>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: "40px", letterSpacing: "-0.03em", margin: 0 }}>{title}</h1>
        <p style={{ color: "var(--muted)", marginTop: "8px", fontSize: "14px" }}>{sub}</p>
      </div>
      {cta && <button className="btn" onClick={onCta}>{cta}</button>}
    </div>
  );
}

function Panel({ title, children, style = {} }) {
  return (
    <section style={{ background: "var(--cream)", border: "1px solid var(--line)", borderRadius: "16px", padding: "24px", ...style }}>
      {title && <h2 style={panelTitleStyle}>{title}</h2>}
      {children}
    </section>
  );
}

function StatCard({ label, value }) {
  return (
    <Panel>
      <div className="text-mono text-muted">{label}</div>
      <div style={{ fontFamily: "var(--serif)", fontSize: "56px", letterSpacing: "-0.03em", lineHeight: 1, marginTop: "8px" }}>{value}</div>
    </Panel>
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
    <div style={{ display: "grid", gridTemplateColumns: columns, gap: "16px", paddingBottom: "12px", borderBottom: "1px solid var(--line)", fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }}>
      {labels.map((label) => <span key={label}>{label}</span>)}
    </div>
  );
}

function Notice({ text, tone = "info" }) {
  return (
    <div style={{ marginBottom: "16px", padding: "14px 16px", borderRadius: "10px", background: tone === "error" ? "rgba(255,94,91,0.12)" : "var(--cream-deep)", color: tone === "error" ? "var(--accent-deep)" : "var(--ink-soft)", fontSize: "14px" }}>
      {text}
    </div>
  );
}

function EmptyState({ text }) {
  return <div style={{ padding: "40px 20px", textAlign: "center", color: "var(--muted)", fontSize: "14px" }}>{text}</div>;
}

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
};

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

const sidebarLinkStyle = {
  textAlign: "left",
  padding: "8px",
  border: 0,
  background: "transparent",
  color: "var(--muted)",
  fontSize: "13px",
};

const statGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "16px",
  marginTop: "28px",
};

const rowStyle = {
  display: "flex",
  gap: "14px",
  padding: "12px 0",
  borderBottom: "1px solid var(--line)",
  alignItems: "center",
};

const listButtonStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  width: "100%",
  textAlign: "left",
  padding: "16px",
  border: 0,
  borderBottom: "1px solid var(--line)",
  background: "transparent",
  color: "var(--ink)",
};

const truncateStyle = {
  color: "var(--muted)",
  fontSize: "13px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const editorSectionStyle = {
  padding: "22px 0",
  borderBottom: "1px solid var(--line)",
};

const editorGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "16px",
  alignItems: "start",
};

const formSectionTitleStyle = {
  fontFamily: "var(--serif)",
  fontSize: "22px",
  letterSpacing: "-0.02em",
  margin: "0 0 12px",
};

const nestedCardStyle = {
  border: "1px solid var(--line)",
  borderRadius: "12px",
  padding: "16px",
  background: "var(--paper)",
};

const controlLabelStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  color: "var(--muted)",
  fontSize: "12px",
  fontFamily: "var(--mono)",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
};

const adminInputStyle = {
  border: "1px solid var(--line)",
  borderRadius: "8px",
  padding: "11px 12px",
  background: "var(--paper)",
  color: "var(--ink)",
  fontFamily: "var(--sans)",
  fontSize: "14px",
  letterSpacing: 0,
  textTransform: "none",
};

const adminTextareaStyle = {
  ...adminInputStyle,
  minHeight: "120px",
  resize: "vertical",
  lineHeight: 1.5,
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
  fontSize: "32px",
  letterSpacing: "-0.02em",
  margin: 0,
};

const cardTitleStyle = {
  fontFamily: "var(--serif)",
  fontSize: "24px",
  letterSpacing: "-0.02em",
  margin: 0,
};

const panelTitleStyle = {
  fontFamily: "var(--serif)",
  fontSize: "24px",
  letterSpacing: "-0.02em",
  margin: "0 0 18px",
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
  minHeight: "520px",
  border: "1px solid var(--line)",
  borderRadius: "12px",
  padding: "16px",
  background: "var(--paper)",
  color: "var(--ink)",
  fontFamily: "var(--mono)",
  fontSize: "12px",
  lineHeight: 1.6,
};
