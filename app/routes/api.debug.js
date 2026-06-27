import prisma from "../db.server";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop") ?? "";

  const results = { ts: new Date().toISOString(), shop };

  // Env vars (non-secret)
  results.env = {
    SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY ?? "MISSING",
    SHOPIFY_APP_URL: process.env.SHOPIFY_APP_URL ?? "MISSING",
    NODE_ENV: process.env.NODE_ENV ?? "MISSING",
    SCOPES: process.env.SCOPES ?? "MISSING",
    DATABASE_URL_SET: !!process.env.DATABASE_URL,
    SHOPIFY_API_SECRET_SET: !!process.env.SHOPIFY_API_SECRET,
  };

  // DB connectivity + session count
  try {
    const [sessionCount, bannerCount] = await Promise.all([
      prisma.session.count(),
      prisma.bannerSetting.count(),
    ]);
    results.db = { ok: true, sessionCount, bannerCount };

    if (shop) {
      const session = await prisma.session.findFirst({
        where: { shop },
        select: { id: true, shop: true, isOnline: true, expires: true, accessToken: true },
      });
      results.sessionForShop = session
        ? {
            found: true,
            id: session.id,
            isOnline: session.isOnline,
            expires: session.expires,
            hasAccessToken: !!session.accessToken,
          }
        : { found: false };
    }
  } catch (e) {
    results.db = { ok: false, error: String(e) };
  }

  return Response.json(results);
};
