import { authenticate, MONTHLY_PLAN, ANNUAL_PLAN } from "../shopify.server";
import db from "../db.server";

const HEX_COLOR_RE = /^#[0-9a-fA-F]{6}$/;

function sanitizeColor(value, fallback) {
  return HEX_COLOR_RE.test(value ?? "") ? value : fallback;
}

// GET — load saved settings for this shop
export async function loader({ request }) {
  const { session } = await authenticate.admin(request);
  const { shop } = session;

  const settings = await db.bannerSetting.findFirst({ where: { shop } });

  if (!settings) {
    return Response.json({
      bannerText: "🎉 Free shipping for customers in your state!",
      targetState: "CA",
      showState: true,
      backgroundColor: "#ff6b00",
      textColor: "#ffffff",
      isActive: true,
      deadline: "",
    });
  }

  return Response.json(settings);
}

// POST — save or update settings for this shop
export async function action({ request }) {
  const { session, billing } = await authenticate.admin(request);
  const { shop } = session;

  const billingCheck = await billing
    .require({
      plans: [MONTHLY_PLAN, ANNUAL_PLAN],
      isTest: process.env.NODE_ENV !== "production",
      onFailure: () => null,
    })
    .catch(() => null);
  const hasBilling = !!billingCheck;

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { bannerText, targetState, showState, backgroundColor, textColor, isActive, deadline } =
    body ?? {};

  if (!bannerText || String(bannerText).trim() === "") {
    return Response.json({ error: "Banner text is required" }, { status: 400 });
  }
  if (String(bannerText).trim().length > 200) {
    return Response.json({ error: "Banner text must be 200 characters or fewer" }, { status: 400 });
  }
  if (!targetState || String(targetState).trim() === "") {
    return Response.json({ error: "Target state is required" }, { status: 400 });
  }

  const data = {
    bannerText:      String(bannerText).trim(),
    targetState:     String(targetState).trim().toUpperCase(),
    showState:       showState ?? true,
    backgroundColor: sanitizeColor(backgroundColor, "#ff6b00"),
    textColor:       sanitizeColor(textColor, "#ffffff"),
    isActive:        isActive ?? true,
    deadline:        hasBilling ? (deadline || null) : null,
  };

  const existing = await db.bannerSetting.findFirst({ where: { shop } });

  const saved = existing
    ? await db.bannerSetting.update({ where: { id: existing.id }, data })
    : await db.bannerSetting.create({ data: { shop, ...data } });

  return Response.json({ success: true, settings: saved });
}
