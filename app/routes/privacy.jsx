export const meta = () => [
  { title: "Privacy Policy — Smart Alert Banner" },
];

export default function PrivacyPolicy() {
  const S = {
    page:    { maxWidth: 760, margin: "0 auto", padding: "40px 20px", fontFamily: "'Inter', system-ui, sans-serif", color: "#222" },
    h1:      { fontSize: "1.8rem", fontWeight: 700, marginBottom: 8 },
    updated: { color: "#888", fontSize: "0.9rem", marginBottom: 36 },
    h2:      { fontSize: "1.1rem", fontWeight: 600, marginTop: 32, marginBottom: 10 },
    p:       { lineHeight: 1.7, marginBottom: 12, color: "#444" },
    ul:      { paddingLeft: 22, marginBottom: 12 },
    li:      { lineHeight: 1.7, color: "#444", marginBottom: 4 },
    a:       { color: "#ff6b00" },
  };

  return (
    <div style={S.page}>
      <h1 style={S.h1}>Privacy Policy</h1>
      <p style={S.updated}>Last updated: June 2026</p>

      <p style={S.p}>
        Smart Alert Banner ("the App") is developed and operated by NeloTech.
        This Privacy Policy explains what data the App collects, how it is used,
        and your rights as a merchant or end user.
      </p>

      <h2 style={S.h2}>1. Data We Collect</h2>
      <p style={S.p}>
        <strong>Merchant data (Shopify store owners):</strong>
      </p>
      <ul style={S.ul}>
        <li style={S.li}>
          <strong>OAuth session tokens</strong> — issued by Shopify during app installation.
          Stored in our database to maintain your authenticated session.
        </li>
        <li style={S.li}>
          <strong>Banner settings</strong> — the text, colors, enabled states, and countdown
          dates you configure inside the App. Stored per shop in our database.
        </li>
        <li style={S.li}>
          <strong>Shop domain</strong> — your <code>.myshopify.com</code> domain, used to
          associate your settings with your store.
        </li>
      </ul>

      <p style={S.p}>
        <strong>End-customer data (your store visitors):</strong>
      </p>
      <ul style={S.ul}>
        <li style={S.li}>
          The App does <strong>not</strong> collect, store, or process any personally identifiable
          information (PII) from your store visitors.
        </li>
        <li style={S.li}>
          Geolocation (US state detection) is performed entirely client-side using the
          visitor's IP address via <a href="https://ipapi.co" target="_blank" rel="noreferrer" style={S.a}>ipapi.co</a>.
          This request is made directly from the visitor's browser to ipapi.co and is governed by
          their <a href="https://ipapi.co/privacy/" target="_blank" rel="noreferrer" style={S.a}>Privacy Policy</a>.
          We do not receive or store any IP addresses or location data.
        </li>
      </ul>

      <h2 style={S.h2}>2. How We Use Your Data</h2>
      <ul style={S.ul}>
        <li style={S.li}>To display your configured banners to your store visitors.</li>
        <li style={S.li}>To maintain your authenticated session with the App.</li>
        <li style={S.li}>We do not sell, rent, or share your data with third parties.</li>
      </ul>

      <h2 style={S.h2}>3. Data Retention</h2>
      <p style={S.p}>
        Your banner settings and session data are retained as long as the App is installed
        on your store. When you uninstall the App, all associated data is automatically
        deleted within 48 hours in accordance with Shopify's GDPR requirements.
      </p>

      <h2 style={S.h2}>4. Third-Party Services</h2>
      <ul style={S.ul}>
        <li style={S.li}><strong>Shopify</strong> — the App operates within the Shopify platform and is subject to <a href="https://www.shopify.com/legal/privacy" target="_blank" rel="noreferrer" style={S.a}>Shopify's Privacy Policy</a>.</li>
        <li style={S.li}><strong>Render</strong> — the App is hosted on <a href="https://render.com" target="_blank" rel="noreferrer" style={S.a}>Render.com</a>. Data is stored in a PostgreSQL database on Render's infrastructure.</li>
        <li style={S.li}><strong>ipapi.co</strong> — used client-side for IP geolocation. No data is sent to or stored by us from this service.</li>
      </ul>

      <h2 style={S.h2}>5. GDPR &amp; Your Rights</h2>
      <p style={S.p}>
        If you are a merchant operating in the EU or a jurisdiction covered by GDPR, you have
        the right to:
      </p>
      <ul style={S.ul}>
        <li style={S.li}>Request a copy of the data we hold about your store.</li>
        <li style={S.li}>Request deletion of your store's data.</li>
      </ul>
      <p style={S.p}>
        To exercise these rights, contact us at{" "}
        <a href="mailto:nelodecarvalho@gmail.com" style={S.a}>nelodecarvalho@gmail.com</a>.
        We process Shopify's mandatory GDPR webhooks automatically on uninstall.
      </p>

      <h2 style={S.h2}>6. Changes to This Policy</h2>
      <p style={S.p}>
        We may update this Privacy Policy from time to time. The latest version will always
        be available at this URL. Continued use of the App after changes constitutes
        acceptance of the updated policy.
      </p>

      <h2 style={S.h2}>7. Contact</h2>
      <p style={S.p}>
        Questions about this Privacy Policy? Contact us at{" "}
        <a href="mailto:nelodecarvalho@gmail.com" style={S.a}>nelodecarvalho@gmail.com</a>.
      </p>
    </div>
  );
}
