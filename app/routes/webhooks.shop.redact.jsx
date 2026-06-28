import { authenticate } from "../shopify.server";
import db from "../db.server";

export const action = async ({ request }) => {
  const { shop, topic } = await authenticate.webhook(request);
  console.log(`Received ${topic} webhook for ${shop}`);

  // Delete all shop data: sessions and banner settings.
  await db.session.deleteMany({ where: { shop } });
  await db.bannerSetting.deleteMany({ where: { shop } });

  return new Response();
};
