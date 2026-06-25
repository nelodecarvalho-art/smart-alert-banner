import { authenticate, MONTHLY_PLAN, ANNUAL_PLAN } from "../shopify.server";

// GET — check whether this shop has an active subscription
export async function loader({ request }) {
  const { billing } = await authenticate.admin(request);

  const billingCheck = await billing
    .require({
      plans: [MONTHLY_PLAN, ANNUAL_PLAN],
      isTest: process.env.NODE_ENV !== "production",
      onFailure: () => null,
    })
    .catch(() => null);

  if (!billingCheck) {
    return Response.json({ hasSubscription: false, plan: null });
  }

  const activeSub = billingCheck.appSubscriptions?.[0];
  return Response.json({
    hasSubscription: true,
    plan: activeSub?.name ?? null,
    status: activeSub?.status ?? null,
  });
}

// POST — start a new subscription flow
export async function action({ request }) {
  const { billing, session } = await authenticate.admin(request);

  let body;
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const planName = body.plan === "annual" ? ANNUAL_PLAN : MONTHLY_PLAN;
  const isTest   = process.env.NODE_ENV !== "production";

  const price     = planName === ANNUAL_PLAN ? 99.99 : 9.99;
  const interval  = planName === ANNUAL_PLAN ? "ANNUAL" : "EVERY_30_DAYS";
  const trialDays = 7;

  const subscription = await billing.request({
    plan: planName,
    isTest,
    trialDays,
    lineItems: [{ interval, amount: price, currencyCode: "USD" }],
    returnUrl: `https://${session.shop}/admin/apps/${process.env.SHOPIFY_API_KEY}`,
  });

  return Response.json({ confirmationUrl: subscription.confirmationUrl });
}
