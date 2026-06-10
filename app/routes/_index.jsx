import { useState, useEffect } from "react";
import { useLoaderData } from "react-router";
import { authenticate } from "../shopify.server";

// Loader — carrega settings e status de billing
export async function loader({ request }) {
  const { billing } = await authenticate.admin(request);

  const billingCheck = await billing.require({
    plans: ["Smart Alert Banner - Monthly", "Smart Alert Banner - Annual"],
    isTest: process.env.NODE_ENV !== "production",
    onFailure: () => null,
  }).catch(() => null);

  return {
    hasBilling: !!billingCheck,
    appUrl: process.env.SHOPIFY_APP_URL || "",
  };
}

const ALL_US_STATES = [
  { value: "AL", label: "Alabama (AL)" },
  { value: "AK", label: "Alaska (AK)" },
  { value: "AZ", label: "Arizona (AZ)" },
  { value: "AR", label: "Arkansas (AR)" },
  { value: "CA", label: "California (CA)" },
  { value: "CO", label: "Colorado (CO)" },
  { value: "CT", label: "Connecticut (CT)" },
  { value: "DE", label: "Delaware (DE)" },
  { value: "FL", label: "Florida (FL)" },
  { value: "GA", label: "Georgia (GA)" },
  { value: "HI", label: "Hawaii (HI)" },
  { value: "ID", label: "Idaho (ID)" },
  { value: "IL", label: "Illinois (IL)" },
  { value: "IN", label: "Indiana (IN)" },
  { value: "IA", label: "Iowa (IA)" },
  { value: "KS", label: "Kansas (KS)" },
  { value: "KY", label: "Kentucky (KY)" },
  { value: "LA", label: "Louisiana (LA)" },
  { value: "ME", label: "Maine (ME)" },
  { value: "MD", label: "Maryland (MD)" },
  { value: "MA", label: "Massachusetts (MA)" },
  { value: "MI", label: "Michigan (MI)" },
  { value: "MN", label: "Minnesota (MN)" },
  { value: "MS", label: "Mississippi (MS)" },
  { value: "MO", label: "Missouri (MO)" },
  { value: "MT", label: "Montana (MT)" },
  { value: "NE", label: "Nebraska (NE)" },
  { value: "NV", label: "Nevada (NV)" },
  { value: "NH", label: "New Hampshire (NH)" },
  { value: "NJ", label: "New Jersey (NJ)" },
  { value: "NM", label: "New Mexico (NM)" },
  { value: "NY", label: "New York (NY)" },
  { value: "NC", label: "North Carolina (NC)" },
  { value: "ND", label: "North Dakota (ND)" },
  { value: "OH", label: "Ohio (OH)" },
  { value: "OK", label: "Oklahoma (OK)" },
  { value: "OR", label: "Oregon (OR)" },
  { value: "PA", label: "Pennsylvania (PA)" },
  { value: "RI", label: "Rhode Island (RI)" },
  { value: "SC", label: "South Carolina (SC)" },
  { value: "SD", label: "South Dakota (SD)" },
  { value: "TN", label: "Tennessee (TN)" },
  { value: "TX", label: "Texas (TX)" },
  { value: "UT", label: "Utah (UT)" },
  { value: "VT", label: "Vermont (VT)" },
  { value: "VA", label: "Virginia (VA)" },
  { value: "WA", label: "Washington (WA)" },
  { value: "WV", label: "West Virginia (WV)" },
  { value: "WI", label: "Wisconsin (WI)" },
  { value: "WY", label: "Wyoming (WY)" },
  { value: "DC", label: "Washington D.C. (DC)" },
];

const S = {
  page: { maxWidth: 860, margin: "0 auto", padding: "24px 16px", fontFamily: "'Inter', system-ui, sans-serif" },
  header: { textAlign: "center", marginBottom: 36 },
  title: { fontSize: "2rem", fontWeight: 700, color: "#ff6b00", margin: 0 },
  subtitle: { color: "#666", fontSize: "1rem", marginTop: 6 },
  card: { background: "#fff", borderRadius: 14, padding: "24px 28px", marginBottom: 24, boxShadow: "0 4px 24px rgba(0,0,0,0.08)" },
  cardTitle: { fontSize: "1.1rem", fontWeight: 600, color: "#222", marginBottom: 20, paddingBottom: 10, borderBottom: "1px solid #f0f0f0" },
  formRow: { display: "flex", gap: 16, flexWrap: "wrap" },
  formGroup: { flex: 1, minWidth: 220, marginBottom: 18 },
  label: { display: "block", marginBottom: 6, fontWeight: 500, fontSize: "0.85rem", color: "#444", textTransform: "uppercase", letterSpacing: "0.4px" },
  input: { width: "100%", padding: "10px 14px", border: "1.5px solid #e0e0e0", borderRadius: 8, fontSize: "0.95rem", outline: "none", boxSizing: "border-box", transition: "border-color .2s" },
  select: { width: "100%", padding: "10px 14px", border: "1.5px solid #e0e0e0", borderRadius: 8, fontSize: "0.95rem", background: "#fff", cursor: "pointer", boxSizing: "border-box" },
  toggleRow: { display: "flex", alignItems: "center", gap: 10, marginBottom: 18 },
  toggleLabel: { fontSize: "0.9rem", color: "#444" },
  btnPrimary: { background: "#ff6b00", color: "#fff", border: "none", padding: "12px 28px", borderRadius: 8, fontSize: "0.95rem", fontWeight: 600, cursor: "pointer", width: "100%" },
  btnSecondary: { background: "#fff", color: "#ff6b00", border: "2px solid #ff6b00", padding: "10px 24px", borderRadius: 8, fontSize: "0.9rem", fontWeight: 600, cursor: "pointer" },
  preview: { background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)", borderRadius: 14, padding: "28px", textAlign: "center" },
  previewLabel: { color: "rgba(255,255,255,0.6)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 14 },
  bannerDemo: { borderRadius: 10, padding: "16px 40px", fontSize: "1rem", fontWeight: 600, position: "relative" },
  alertOk: { background: "#e6f7ee", color: "#1a7a4a", border: "1px solid #b7e5cc", padding: "12px 16px", borderRadius: 8, marginBottom: 16, fontSize: "0.9rem" },
  alertErr: { background: "#fff0f0", color: "#c0392b", border: "1px solid #fbb", padding: "12px 16px", borderRadius: 8, marginBottom: 16, fontSize: "0.9rem" },
  billingBanner: { background: "#fff8e1", border: "1.5px solid #ffcc02", borderRadius: 10, padding: "16px 20px", marginBottom: 24, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" },
  planCard: { flex: 1, minWidth: 200, background: "#fff", border: "1.5px solid #e0e0e0", borderRadius: 10, padding: "20px", textAlign: "center", cursor: "pointer" },
  planCardActive: { borderColor: "#ff6b00", background: "#fff8f4" },
  planPrice: { fontSize: "1.8rem", fontWeight: 700, color: "#ff6b00" },
  planPer: { fontSize: "0.8rem", color: "#888" },
};

export default function Index() {
  const { hasBilling } = useLoaderData();

  const [settings, setSettings] = useState({
    bannerText: "🎉 Free shipping for customers in your state!",
    targetState: "CA",
    showState: true,
    backgroundColor: "#ff6b00",
    textColor: "#ffffff",
    isActive: true,
    deadline: "",
  });

  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [success, setSuccess]   = useState(false);
  const [error, setError]       = useState(null);
  const [subLoading, setSubLoading] = useState(false);

  // Carregar configurações salvas
  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data && !data.error) setSettings((prev) => ({ ...prev, ...data }));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (field, value) =>
    setSettings((prev) => ({ ...prev, [field]: value }));

  const save = async () => {
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      const r = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await r.json();
      if (!r.ok || data.error) throw new Error(data.error || "Server error");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (e) {
      setError(e.message || "Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const startSubscription = async (plan) => {
    setSubLoading(true);
    try {
      const r = await fetch("/api/billing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await r.json();
      if (data.confirmationUrl) window.top.location.href = data.confirmationUrl;
    } catch {
      setError("Failed to start subscription. Please try again.");
    } finally {
      setSubLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ ...S.page, textAlign: "center", paddingTop: 80 }}>
        <p style={{ color: "#888" }}>Loading your settings…</p>
      </div>
    );
  }

  return (
    <div style={S.page}>
      {/* Header */}
      <div style={S.header}>
        <h1 style={S.title}>Smart Alert Banner</h1>
        <p style={S.subtitle}>Show geo-targeted banners to boost conversions across all 50 US states</p>
      </div>

      {/* Alerts */}
      {success && <div style={S.alertOk}>✅ Settings saved successfully! Your banner is now live.</div>}
      {error   && <div style={S.alertErr}>❌ {error}</div>}

      {/* Billing warning */}
      {!hasBilling && (
        <div style={S.billingBanner}>
          <span style={{ fontSize: "1.5rem" }}>⚡</span>
          <div style={{ flex: 1 }}>
            <strong>Start your free 7-day trial</strong>
            <p style={{ margin: "4px 0 0", color: "#666", fontSize: "0.88rem" }}>
              Activate a plan to publish your banner to real customers.
            </p>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button style={S.btnSecondary} onClick={() => startSubscription("monthly")} disabled={subLoading}>
              {subLoading ? "Loading…" : "$9.99/month"}
            </button>
            <button style={S.btnPrimary} onClick={() => startSubscription("annual")} disabled={subLoading}>
              {subLoading ? "Loading…" : "$99.99/year — Save 17%"}
            </button>
          </div>
        </div>
      )}

      {/* Banner settings */}
      <div style={S.card}>
        <p style={S.cardTitle}>⚙️ Banner Settings</p>

        {/* Active toggle */}
        <div style={S.toggleRow}>
          <input
            type="checkbox"
            id="isActive"
            checked={settings.isActive}
            onChange={(e) => handleChange("isActive", e.target.checked)}
            style={{ width: 18, height: 18, cursor: "pointer", accentColor: "#ff6b00" }}
          />
          <label htmlFor="isActive" style={S.toggleLabel}>
            Banner active — visible on your storefront
          </label>
        </div>

        {/* Banner text */}
        <div style={S.formGroup}>
          <label style={S.label}>Banner text</label>
          <input
            style={S.input}
            type="text"
            value={settings.bannerText}
            onChange={(e) => handleChange("bannerText", e.target.value)}
            placeholder="🎉 Free shipping for customers in California!"
            maxLength={200}
          />
          <span style={{ fontSize: "0.78rem", color: "#999" }}>{settings.bannerText.length}/200 characters</span>
        </div>

        <div style={S.formRow}>
          {/* Target state — all 50 states */}
          <div style={S.formGroup}>
            <label style={S.label}>Target state</label>
            <select
              style={S.select}
              value={settings.targetState}
              onChange={(e) => handleChange("targetState", e.target.value)}
            >
              {ALL_US_STATES.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          {/* Deadline */}
          <div style={S.formGroup}>
            <label style={S.label}>Countdown deadline (optional)</label>
            <input
              style={S.input}
              type="datetime-local"
              value={settings.deadline || ""}
              onChange={(e) => handleChange("deadline", e.target.value)}
            />
          </div>
        </div>

        <div style={S.formRow}>
          {/* Background color */}
          <div style={{ ...S.formGroup, maxWidth: 200 }}>
            <label style={S.label}>Background color</label>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <input
                type="color"
                value={settings.backgroundColor}
                onChange={(e) => handleChange("backgroundColor", e.target.value)}
                style={{ width: 42, height: 42, border: "none", cursor: "pointer", borderRadius: 8, padding: 2 }}
              />
              <input
                style={{ ...S.input, width: 110 }}
                type="text"
                value={settings.backgroundColor}
                onChange={(e) => handleChange("backgroundColor", e.target.value)}
                maxLength={7}
              />
            </div>
          </div>

          {/* Text color */}
          <div style={{ ...S.formGroup, maxWidth: 200 }}>
            <label style={S.label}>Text color</label>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <input
                type="color"
                value={settings.textColor}
                onChange={(e) => handleChange("textColor", e.target.value)}
                style={{ width: 42, height: 42, border: "none", cursor: "pointer", borderRadius: 8, padding: 2 }}
              />
              <input
                style={{ ...S.input, width: 110 }}
                type="text"
                value={settings.textColor}
                onChange={(e) => handleChange("textColor", e.target.value)}
                maxLength={7}
              />
            </div>
          </div>

          {/* Show state label */}
          <div style={{ ...S.formGroup, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
            <div style={S.toggleRow}>
              <input
                type="checkbox"
                id="showState"
                checked={settings.showState}
                onChange={(e) => handleChange("showState", e.target.checked)}
                style={{ width: 18, height: 18, cursor: "pointer", accentColor: "#ff6b00" }}
              />
              <label htmlFor="showState" style={S.toggleLabel}>Show state label on banner</label>
            </div>
          </div>
        </div>

        <button style={S.btnPrimary} onClick={save} disabled={saving}>
          {saving ? "Saving…" : "💾 Save settings"}
        </button>
      </div>

      {/* Live preview */}
      <div style={S.card}>
        <p style={S.cardTitle}>👁️ Live Preview</p>
        <div style={S.preview}>
          <p style={S.previewLabel}>Banner preview</p>
          <div
            style={{
              ...S.bannerDemo,
              background: settings.backgroundColor,
              color: settings.textColor,
            }}
          >
            {settings.bannerText || "Your banner text here"}
            {settings.showState && (
              <span style={{ display: "block", fontSize: "0.8rem", opacity: 0.9, marginTop: 4 }}>
                📍 {settings.targetState} only — Offer ends soon ⏰ 2h 30m
              </span>
            )}
            <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", opacity: 0.7, fontSize: 14 }}>✕</span>
          </div>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.78rem", marginTop: 12 }}>
            This banner will only appear to visitors from {settings.targetState}
          </p>
        </div>
      </div>
    </div>
  );
}
