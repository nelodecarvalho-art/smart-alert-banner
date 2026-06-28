export async function loader() {
  return new Response(null, { status: 200 });
}

export default function Privacy() {
  const s = {
    page:    { maxWidth: 780, margin: "0 auto", padding: "48px 24px", fontFamily: "'Inter', system-ui, sans-serif", color: "#222", lineHeight: 1.7 },
    h1:      { fontSize: "2rem", fontWeight: 700, marginBottom: 8, color: "#111" },
    updated: { color: "#888", fontSize: "0.9rem", marginBottom: 40 },
    h2:      { fontSize: "1.2rem", fontWeight: 600, marginTop: 36, marginBottom: 10, color: "#111", borderBottom: "1px solid #eee", paddingBottom: 6 },
    p:       { marginBottom: 14 },
    ul:      { paddingLeft: 22, marginBottom: 14 },
    a:       { color: "#ff6b00" },
  };

  return (
    <div style={s.page}>
      <h1 style={s.h1}>Privacy Policy — Smart Alert Banner</h1>
      <p style={s.updated}>Last updated: June 28, 2026</p>

      <p style={s.p}>
        Smart Alert Banner ("App", "we", "us") is a Shopify application developed by NeloTech.
        This Privacy Policy explains how we collect, use, and protect information when you install
        and use our App through the Shopify platform.
      </p>

      <h2 style={s.h2}>1. Information We Collect</h2>
      <p style={s.p}><strong>From merchants (store owners):</strong></p>
      <ul style={s.ul}>
        <li>Your Shopify store domain (e.g., yourstore.myshopify.com)</li>
        <li>Banner configuration you set: text, target US state, colors, active status, and optional countdown deadline</li>
        <li>Shopify OAuth session tokens required to authenticate your account</li>
      </ul>
      <p style={s.p}><strong>We do NOT collect:</strong></p>
      <ul style={s.ul}>
        <li>Customer personal data (names, emails, addresses, payment information)</li>
        <li>IP addresses or location data from your store visitors</li>
        <li>Browsing history or behavioral data</li>
      </ul>

      <h2 style={s.h2}>2. How We Use Information</h2>
      <ul style={s.ul}>
        <li>To authenticate your Shopify account and provide access to the App dashboard</li>
        <li>To store and retrieve your banner settings so the banner displays correctly on your storefront</li>
        <li>To serve your banner configuration to your storefront via a public API endpoint</li>
      </ul>
      <p style={s.p}>
        We do not use your data for marketing, advertising, or any purpose unrelated to providing the App's core functionality.
      </p>

      <h2 style={s.h2}>3. Third-Party Services</h2>
      <p style={s.p}>
        The banner on your storefront uses <strong>ipapi.co</strong> for client-side IP geolocation.
        This request is made directly from your visitor's browser to ipapi.co — we never receive or store
        your visitors' IP addresses or location data. Please review{" "}
        <a href="https://ipapi.co/privacy/" style={s.a} target="_blank" rel="noreferrer">ipapi.co's Privacy Policy</a>{" "}
        for details on how they handle visitor data.
      </p>
      <p style={s.p}>
        We use <strong>Railway</strong> for application hosting and <strong>PostgreSQL</strong> for data storage.
        Data is stored within Railway's infrastructure. See{" "}
        <a href="https://railway.com/privacy" style={s.a} target="_blank" rel="noreferrer">Railway's Privacy Policy</a>.
      </p>

      <h2 style={s.h2}>4. Data Sharing and Disclosure</h2>
      <p style={s.p}>
        We do not sell, trade, or rent your personal information to third parties.
        We may disclose information only in the following circumstances:
      </p>
      <ul style={s.ul}>
        <li>When required by law, regulation, or legal process</li>
        <li>To protect the rights, property, or safety of NeloTech, our users, or others</li>
      </ul>

      <h2 style={s.h2}>5. Data Retention</h2>
      <p style={s.p}>
        Your merchant data (store domain, banner settings, session tokens) is retained for as long as
        the App is installed on your store.
      </p>
      <p style={s.p}>
        When you uninstall the App, we process the <code>shop/redact</code> webhook from Shopify and
        permanently delete all data associated with your store within 48 hours.
      </p>

      <h2 style={s.h2}>6. Your Rights</h2>
      <p style={s.p}>You have the right to:</p>
      <ul style={s.ul}>
        <li><strong>Access</strong> — request a copy of the data we hold about your store</li>
        <li><strong>Correction</strong> — request correction of inaccurate data</li>
        <li><strong>Deletion</strong> — request deletion of your data by uninstalling the App or contacting us directly</li>
        <li><strong>Portability</strong> — request your banner settings in a portable format</li>
      </ul>
      <p style={s.p}>
        To exercise any of these rights, contact us at{" "}
        <a href="mailto:nelodecarvalho@gmail.com" style={s.a}>nelodecarvalho@gmail.com</a>.
      </p>

      <h2 style={s.h2}>7. GDPR Compliance</h2>
      <p style={s.p}>
        If you are located in the European Economic Area (EEA), you have rights under the General Data
        Protection Regulation (GDPR). The legal basis for processing your data is the performance of our
        contract with you (providing the App service). We do not store personal data of your store's
        customers; geo-detection is performed entirely client-side and no customer data passes through our servers.
      </p>
      <p style={s.p}>
        We honor all Shopify mandatory GDPR webhooks: customer data requests, customer data erasure,
        and shop data erasure.
      </p>

      <h2 style={s.h2}>8. CCPA Compliance</h2>
      <p style={s.p}>
        If you are a California resident, you have rights under the California Consumer Privacy Act (CCPA).
        We do not sell personal information. You may request disclosure or deletion of your data by
        contacting us at the email below.
      </p>

      <h2 style={s.h2}>9. Security</h2>
      <p style={s.p}>
        We implement industry-standard security measures including HTTPS encryption for all data in
        transit and secure PostgreSQL storage with access controls. Shopify OAuth tokens are stored
        securely and used only to authenticate API requests on your behalf.
      </p>

      <h2 style={s.h2}>10. Changes to This Policy</h2>
      <p style={s.p}>
        We may update this Privacy Policy from time to time. We will notify you of significant changes
        by updating the "Last updated" date above. Continued use of the App after changes constitutes
        acceptance of the updated policy.
      </p>

      <h2 style={s.h2}>11. Contact Us</h2>
      <p style={s.p}>
        If you have questions about this Privacy Policy or wish to exercise your data rights, contact us at:
      </p>
      <ul style={s.ul}>
        <li>Email: <a href="mailto:nelodecarvalho@gmail.com" style={s.a}>nelodecarvalho@gmail.com</a></li>
        <li>Developer: NeloTech</li>
      </ul>
    </div>
  );
}
