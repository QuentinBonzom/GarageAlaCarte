import { lazy, Suspense, useEffect, useState } from "react";
import {
  EmailPopup,
  Footer,
  Header,
} from "../components/common";
import {
  createEmailLead,
  hydrateContentFromSupabase,
} from "../data/contentRepository";
import { CONTENT } from "../data/content";
import { applyThemeColors, expandThemeColors } from "../data/theme";
import { isCmsEditMode, enableCmsInlineEdit } from "../lib/cmsEdit";
import { applyPageSeo, routeFromLocation, routeToPath } from "../lib/seo";
import {
  TweakColor,
  TweakRadio,
  TweakSection,
  TweakSlider,
  TweaksPanel,
  useTweaks,
} from "../components/tweaks";
import { ConditionsPage, ContactPage } from "../pages/ContactPage";
import { HomePage } from "../pages/HomePage";
import { ProjectsPage } from "../pages/ProjectsPage";

const AdminPage = lazy(() => import("../pages/AdminPage"));

const TWEAK_DEFAULTS = {
  accentColor: "#F1B395",

  density: 1,
  cardStyle: "soft",
};

function getInitialRoute() {
  return routeFromLocation(window.location);
}

export function App() {
  const [route, setRoute] = useState(getInitialRoute);
  const [lang, setLang] = useState(() => localStorage.getItem("galc_lang") || "en");
  const [popupShown, setPopupShown] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [contentVersion, setContentVersion] = useState(0);
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    let cancelled = false;

    hydrateContentFromSupabase()
      .then(() => {
        if (!cancelled) setContentVersion((version) => version + 1);
      })
      .catch((error) => {
        console.warn("Supabase content fallback:", error.message);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--accent", tweaks.accentColor);
    document.documentElement.style.setProperty("--density", tweaks.density);
    document.body.dataset.card = tweaks.cardStyle;
  }, [tweaks]);

  // Couleurs personnalisées depuis l'admin (site_settings › theme.colors).
  // Appliquées après l'hydratation Supabase, elles écrasent les valeurs par
  // défaut de :root et l'accent du panneau Tweaks (dev only).
  useEffect(() => {
    applyThemeColors(expandThemeColors(CONTENT.theme?.colors));
  }, [contentVersion]);

  // Édition in-context : uniquement dans l'aperçu de l'admin (iframe + ?cms=edit).
  useEffect(() => {
    if (!isCmsEditMode()) return undefined;
    enableCmsInlineEdit();
    const onChanged = () => setContentVersion((version) => version + 1);
    window.addEventListener("cms:changed", onChanged);
    return () => window.removeEventListener("cms:changed", onChanged);
  }, []);

  // Le runtime d'édition a besoin de connaître la langue courante au moment du commit.
  useEffect(() => {
    document.body.dataset.cmsLang = lang;
  }, [lang]);

  useEffect(() => {
    localStorage.setItem("galc_lang", lang);
  }, [lang]);

  useEffect(() => {
    const handleRouteChange = () => setRoute(getInitialRoute());
    window.addEventListener("popstate", handleRouteChange);
    window.addEventListener("hashchange", handleRouteChange);
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
      window.removeEventListener("hashchange", handleRouteChange);
    };
  }, []);

  useEffect(() => {
    applyPageSeo({ route, lang });
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [route, lang, contentVersion]);

  useEffect(() => {
    const handleAdminMessage = (event) => {
      const type = event.data?.type;
      if (type === "admin_scroll_to") {
        const el = document.getElementById(event.data.sectionKey);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (type === "cms_reload") {
        // Après une édition d'enregistrement (service, projet…) persistée par
        // l'admin : on recharge le contenu depuis Supabase pour refléter la valeur.
        hydrateContentFromSupabase()
          .then(() => setContentVersion((version) => version + 1))
          .catch(() => {});
      }
    };
    window.addEventListener("message", handleAdminMessage);
    return () => window.removeEventListener("message", handleAdminMessage);
  }, []);

  useEffect(() => {
    if (popupShown || localStorage.getItem("galc_popup_seen")) return undefined;

    const timer = window.setTimeout(() => {
      setShowPopup(true);
      setPopupShown(true);
    }, 2500);

    return () => window.clearTimeout(timer);
  }, [popupShown]);

  const onNav = (nextRoute) => {
    setRoute(nextRoute);
    const nextPath = routeToPath(nextRoute);
    if (window.location.pathname !== nextPath || window.location.hash) {
      window.history.pushState({}, "", nextPath);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    localStorage.setItem("galc_popup_seen", "1");
  };

  const submitEmail = async (email) => {
    await createEmailLead({ email, locale: lang });
  };

  return (
    <>
      {route !== "admin" && (
        <Header route={route} onNav={onNav} lang={lang} onLang={setLang} />
      )}

      <main>
        {route === "home" && <HomePage lang={lang} onNav={onNav} />}
        {route === "projects" && <ProjectsPage lang={lang} onNav={onNav} />}
        {route === "contact" && <ContactPage lang={lang} onNav={onNav} />}
        {route === "conditions" && <ConditionsPage lang={lang} />}
        {route === "admin" && (
          <Suspense fallback={<div style={{ padding: 80, textAlign: "center", color: "var(--muted)" }}>Loading admin…</div>}>
            <AdminPage lang={lang} onNav={onNav} />
          </Suspense>
        )}
      </main>

      {route !== "admin" && <Footer onNav={onNav} lang={lang} />}

      {showPopup && (
        <EmailPopup lang={lang} onClose={closePopup} onSubmit={submitEmail} />
      )}

      {import.meta.env.DEV && route !== "admin" && (
        <TweaksPanel title="Tweaks">
          <TweakSection label="Brand" />
          <TweakColor
            label="Accent color"
            value={tweaks.accentColor}
            onChange={(value) => setTweak("accentColor", value)}
          />
          <TweakSection label="Layout" />
          <TweakSlider
            label="Density"
            value={tweaks.density}
            min={0.7}
            max={1.3}
            step={0.05}
            onChange={(value) => setTweak("density", value)}
          />
          <TweakRadio
            label="Card style"
            value={tweaks.cardStyle}
            options={[
              { value: "soft", label: "Soft" },
              { value: "sharp", label: "Sharp" },
              { value: "outline", label: "Outline" },
            ]}
            onChange={(value) => setTweak("cardStyle", value)}
          />
        </TweaksPanel>
      )}
    </>
  );
}
