import { authenticate } from "../shopify.server";

export const PLAN_MONTHLY = "Smart Alert Banner - Monthly";
export const PLAN_ANNUAL  = "Smart Alert Banner - Annual";

// billing.request() has return type Promise<never> — it throws a redirect
// ("exit-iframe") response meant for a full top-level navigation, not a
// fetch()/XHR call. This route is therefore a GET loader, reached via
// window.top.location.href, so the browser follows the redirect normally.
export async function loader({ request }) {
  const { billing, session } = await authenticate.admin(request);

  const url = new URL(request.url);
  const planName = url.searchParams.get("plan") === "annual" ? PLAN_ANNUAL : PLAN_MONTHLY;
  const isTest = process.env.BILLING_TEST_MODE === "true" || process.env.NODE_ENV !== "production";

  return billing.request({
    plan: planName,
    isTest,
    returnUrl: `https://${session.shop}/admin/apps/${process.env.SHOPIFY_API_KEY}`,
  });
}
