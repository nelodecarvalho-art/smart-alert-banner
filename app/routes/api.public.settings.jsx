import db from "../db.server";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function loader({ request }) {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS });
  }

  const shop = new URL(request.url).searchParams.get("shop");

  if (!shop) {
    return Response.json({ isActive: false }, { headers: CORS });
  }

  const settings = await db.bannerSetting.findFirst({
    where: { shop },
    select: {
      bannerText: true,
      targetState: true,
      showState: true,
      backgroundColor: true,
      textColor: true,
      isActive: true,
      deadline: true,
    },
  });

  if (!settings || !settings.isActive) {
    return Response.json({ isActive: false }, { headers: CORS });
  }

  return Response.json(settings, { headers: CORS });
}
