import { authenticate } from "../shopify.server";

// GDPR mandatory webhook — customer data erasure request.
// This app stores no customer PII (only shop-level BannerSetting and Session).
// We acknowledge the request; there is no customer data to erase.
export const action = async ({ request }) => {
  const { shop, payload, topic } = await authenticate.webhook(request);

  console.log(
    `${topic} for ${shop}: customer ${payload?.customer?.id ?? "unknown"} — no customer PII stored`
  );

  return new Response(null, { status: 200 });
};
