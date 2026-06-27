import { authenticate } from "../shopify.server";
import db from "../db.server";

// GDPR mandatory webhook — shop data erasure (sent 48 h after uninstall).
// Delete all data stored for this shop: sessions and banner settings.
export const action = async ({ request }) => {
  const { shop, topic } = await authenticate.webhook(request);

  console.log(`${topic} for ${shop}: deleting all shop data`);

  await Promise.all([
    db.session.deleteMany({ where: { shop } }),
    db.bannerSetting.deleteMany({ where: { shop } }),
  ]);

  return new Response(null, { status: 200 });
};
