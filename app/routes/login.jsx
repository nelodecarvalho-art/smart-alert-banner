import { login } from "../shopify.server";

// Standalone install/login route — starts OAuth without requiring Shopify HMAC.
// Usage: /login?shop=yourstore.myshopify.com
export const loader = async ({ request }) => {
  return login(request);
};

export default function Login() {
  return null;
}
