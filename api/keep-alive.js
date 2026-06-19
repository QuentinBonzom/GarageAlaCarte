// Vercel Serverless Function — pinged daily by a Vercel Cron (see vercel.json).
// Makes a tiny Supabase request so the free-tier project is never paused for
// inactivity, regardless of how much visitor traffic the site gets.
export default async function handler(req, res) {
  const url = (process.env.VITE_SUPABASE_URL || "").trim().replace(/\/$/, "");
  const key = (process.env.VITE_SUPABASE_PUBLISHABLE_KEY || "").trim();

  if (!url || !key) {
    res.status(500).json({ ok: false, error: "Supabase env vars not configured" });
    return;
  }

  try {
    // Lightweight read against a public table — enough to register activity.
    const response = await fetch(`${url}/rest/v1/faq_items?select=id&limit=1`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
    });
    res.status(200).json({
      ok: response.ok,
      status: response.status,
      pingedAt: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({ ok: false, error: String(error?.message || error) });
  }
}
