import { authenticate } from "../shopify.server";

export const PLAN_MONTHLY = "Smart Alert Banner - Monthly";
export const PLAN_ANNUAL  = "Smart Alert Banner - Annual";

export async function loader({ request }) {
  const { billing } = await authenticate.admin(request);

  try {
    const billingCheck = await billing.require({
      plans: [PLAN_MONTHLY, PLAN_ANNUAL],
      isTest: process.env.BILLING_TEST_MODE === "true" || process.env.NODE_ENV !== "production",
    });

    const activeSub = billingCheck?.appSubscriptions?.[0];
    return Response.json({
      hasSubscription: !!activeSub,
      plan: activeSub?.name ?? null,
      status: activeSub?.status ?? null,
    });
  } catch {
    return Response.json({ hasSubscription: false, plan: null });
  }
}

export async function action({ request }) {
  const { billing, session } = await authenticate.admin(request);

  let body = {};
  try {
    body = await request.json();
  } catch {}

  const planName = body.plan === "annual" ? PLAN_ANNUAL : PLAN_MONTHLY;
  const isTest = process.env.BILLING_TEST_MODE === "true" || process.env.NODE_ENV !== "production";

  const subscription = await billing.request({
    plan: planName,
    isTest,
    returnUrl: `https://${session.shop}/admin/apps/${process.env.SHOPIFY_API_KEY}`,
  });

  return Response.json({ confirmationUrl: subscription.confirmationUrl });
}
