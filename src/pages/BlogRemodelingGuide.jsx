import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function BlogRemodelingGuide({ lang = "en", onNav }) {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchArticle();
  }, []);

  const fetchArticle = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_articles")
        .select("*")
        .eq("slug", "garage-remodeling-guide")
        .eq("is_active", true)
        .single();

      if (error) throw error;
      setArticle(data);
    } catch (err) {
      console.error("Error fetching article:", err);
      setArticle(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ padding: "80px 20px", textAlign: "center" }}>Loading...</div>;
  }

  if (!article) {
    return <div style={{ padding: "80px 20px", textAlign: "center" }}>Article not found</div>;
  }

  const isSpanish = lang === "fr";
  const title = isSpanish ? article.title_fr || article.title_en : article.title_en;
  const intro = isSpanish ? article.intro_fr || article.intro_en : article.intro_en;
  const sections = isSpanish ? article.content_fr || article.content_en : article.content_en;
  const cta = isSpanish ? article.cta_fr || article.cta_en : article.cta_en;
  const ctaButton = isSpanish ? article.cta_button_fr || article.cta_button_en : article.cta_button_en;

  return (
    <article className="blog-article">
      <div className="blog-article__header">
        <h1>{title}</h1>
        <p className="blog-article__intro">{intro}</p>
      </div>

      <div className="blog-article__content">
        {sections && sections.map((section, idx) => (
          <section key={idx} className="blog-article__section">
            <h2>{section.heading}</h2>
            <p>{section.body.split("\n\n").map((para, i) => <div key={i}>{para}</div>)}</p>
          </section>
        ))}
      </div>

      <div className="blog-article__cta">
        <p>{cta}</p>
        <a href="/#contact" className="btn btn--primary">{ctaButton}</a>
      </div>
    </article>
  );
}
