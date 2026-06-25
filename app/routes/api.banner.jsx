import db from "../db.server";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
  "Cache-Control": "public, max-age=60, stale-while-revalidate=30",
};

// Public endpoint called by the storefront banner script (no admin auth).
// ?shop=example.myshopify.com is injected server-side by Liquid so it cannot
// be spoofed by the page visitor (only forged by someone who already controls
// the theme, which implies store access anyway).
export async function loader({ request }) {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  const shop = new URL(request.url).searchParams.get("shop");

  if (!shop) {
    return new Response(
      JSON.stringify({ error: "Missing shop parameter" }),
      { status: 400, headers: CORS_HEADERS }
    );
  }

  const settings = await db.bannerSetting.findFirst({ where: { shop } });

  if (!settings || !settings.isActive) {
    return new Response(
      JSON.stringify({ isActive: false }),
      { status: 200, headers: CORS_HEADERS }
    );
  }

  return new Response(
    JSON.stringify({
      bannerText:      settings.bannerText,
      targetState:     settings.targetState,
      showState:       settings.showState,
      backgroundColor: settings.backgroundColor,
      textColor:       settings.textColor,
      isActive:        settings.isActive,
      deadline:        settings.deadline ?? null,
    }),
    { status: 200, headers: CORS_HEADERS }
  );
}
