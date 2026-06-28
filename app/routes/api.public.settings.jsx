import db from "../db.server";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// In-memory rate limiter: 100 req/min per IP.
// For multi-instance deployments, replace with Redis.
const rlMap = new Map();
const RL_WINDOW = 60_000;
const RL_MAX = 100;

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rlMap.get(ip);
  if (!entry || now > entry.reset) {
    rlMap.set(ip, { count: 1, reset: now + RL_WINDOW });
    return null;
  }
  if (entry.count >= RL_MAX) {
    return Math.ceil((entry.reset - now) / 1000);
  }
  entry.count++;
  return null;
}

// Purge stale entries every 10 minutes to prevent memory growth.
setInterval(() => {
  const now = Date.now();
  for (const [key, val] of rlMap) {
    if (now > val.reset) rlMap.delete(key);
  }
}, 600_000);

export async function loader({ request }) {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  const retryAfter = checkRateLimit(ip);
  if (retryAfter !== null) {
    return new Response(JSON.stringify({ error: "Too many requests" }), {
      status: 429,
      headers: { ...CORS, "Retry-After": String(retryAfter), "Content-Type": "application/json" },
    });
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
