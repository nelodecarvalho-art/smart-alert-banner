export default function HelpPage() {
  const S = {
    page:    { maxWidth: 760, margin: "0 auto", padding: "24px 16px", fontFamily: "'Inter', system-ui, sans-serif" },
    heading: { fontSize: "1.6rem", fontWeight: 700, color: "#ff6b00", marginBottom: 8 },
    sub:     { color: "#555", fontSize: "0.95rem", marginBottom: 32 },
    card:    { background: "#fff", borderRadius: 12, padding: "22px 26px", marginBottom: 20, boxShadow: "0 3px 18px rgba(0,0,0,0.07)" },
    h3:      { fontSize: "1rem", fontWeight: 600, color: "#222", marginBottom: 10 },
    p:       { color: "#555", fontSize: "0.92rem", lineHeight: 1.65, margin: "0 0 10px" },
    ol:      { paddingLeft: 20, margin: 0 },
    li:      { color: "#555", fontSize: "0.92rem", lineHeight: 1.8 },
    code:    { background: "#f3f4f6", borderRadius: 4, padding: "2px 6px", fontFamily: "monospace", fontSize: "0.88rem" },
  };

  return (
    <div style={S.page}>
      <h1 style={S.heading}>How Smart Alert Banner Works</h1>
      <p style={S.sub}>A quick guide to setting up and using geo-targeted banners on your store.</p>

      <div style={S.card}>
        <h2 style={S.h3}>1. Enable the Theme App Extension</h2>
        <p style={S.p}>
          Go to your Shopify Admin → <strong>Online Store → Themes → Customize</strong>.
          In the theme editor, look for <strong>App Embeds</strong> in the left sidebar and enable
          <strong> Smart Alert Banner</strong>. Save your theme.
        </p>
      </div>

      <div style={S.card}>
        <h2 style={S.h3}>2. Configure your banner</h2>
        <p style={S.p}>
          On the <a href="/app" style={{ color: "#ff6b00" }}>Settings page</a>, choose:
        </p>
        <ol style={S.ol}>
          <li style={S.li}><strong>Banner text</strong> — up to 200 characters</li>
          <li style={S.li}><strong>Target state</strong> — any of the 50 US states or D.C.</li>
          <li style={S.li}><strong>Colors</strong> — background and text color</li>
          <li style={S.li}><strong>Countdown deadline</strong> — adds a live timer to create urgency (optional)</li>
        </ol>
      </div>

      <div style={S.card}>
        <h2 style={S.h3}>3. How geo-detection works</h2>
        <p style={S.p}>
          When a visitor loads your store, the banner script calls the{" "}
          <a href="https://ipapi.co" target="_blank" rel="noreferrer" style={{ color: "#ff6b00" }}>
            ipapi.co
          </a>{" "}
          free geolocation API to detect their US state.
          If the detected state matches your target state, the banner is displayed.
          If geolocation is unavailable, the banner is shown as a fallback.
        </p>
      </div>

      <div style={S.card}>
        <h2 style={S.h3}>4. Dismiss behaviour</h2>
        <p style={S.p}>
          Visitors can close the banner by clicking the <code style={S.code}>✕</code> button.
          The dismissed state is stored in <code style={S.code}>sessionStorage</code>, so
          the banner does not reappear during the same browser session.
        </p>
      </div>

      <div style={S.card}>
        <h2 style={S.h3}>Need help?</h2>
        <p style={S.p}>
          Email us at{" "}
          <a href="mailto:nelodecarvalho@gmail.com" style={{ color: "#ff6b00" }}>
            nelodecarvalho@gmail.com
          </a>
          . We respond within one business day.
        </p>
      </div>
    </div>
  );
}
