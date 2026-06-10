import { authenticate, MONTHLY_PLAN, ANNUAL_PLAN } from "../shopify.server";

// Planos disponíveis — exportados para uso em shopify.server.js
export const PLAN_MONTHLY = "Smart Alert Banner - Monthly";
export const PLAN_ANNUAL  = "Smart Alert Banner - Annual";

// GET — verifica se a loja tem assinatura ativa
export async function loader({ request }) {
  const { billing } = await authenticate.admin(request);

  const billingCheck = await billing.require({
    plans: [PLAN_MONTHLY, PLAN_ANNUAL],
    isTest: process.env.NODE_ENV !== "production",
    onFailure: () => null,
  }).catch(() => null);

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

// POST — inicia o fluxo de assinatura
export async function action({ request }) {
  const { billing, session } = await authenticate.admin(request);

  let body;
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const planName = body.plan === "annual" ? PLAN_ANNUAL : PLAN_MONTHLY;
  const isTest   = process.env.NODE_ENV !== "production";

  let price, interval, trialDays;

  if (planName === PLAN_ANNUAL) {
    price      = 99.99;
    interval   = "ANNUAL";
    trialDays  = 7;
  } else {
    price      = 9.99;
    interval   = "EVERY_30_DAYS";
    trialDays  = 7;
  }

  const subscription = await billing.request({
    plan: planName,
    isTest,
    trialDays,
    lineItems: [
      {
        interval,
        amount: price,
        currencyCode: "USD",
      },
    ],
    returnUrl: `https://${session.shop}/admin/apps/${process.env.SHOPIFY_API_KEY}`,
  });

  return Response.json({ confirmationUrl: subscription.confirmationUrl });
}
