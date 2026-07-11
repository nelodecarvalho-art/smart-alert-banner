import "@shopify/shopify-app-react-router/adapters/node";
import {
  ApiVersion,
  AppDistribution,
  BillingInterval,
  shopifyApp,
} from "@shopify/shopify-app-react-router/server";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
import prisma from "./db.server";

export const MONTHLY_PLAN = "Smart Alert Banner - Monthly";
export const ANNUAL_PLAN = "Smart Alert Banner - Annual";

const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
  apiVersion: ApiVersion.October25,
  scopes: process.env.SCOPES?.split(","),
  appUrl: process.env.SHOPIFY_APP_URL || "",
  authPathPrefix: "/auth",
  sessionStorage: new PrismaSessionStorage(prisma),
  distribution: AppDistribution.AppStore,
  billing: {
    // Plans must be either a one-time purchase (interval: OneTime) or a
    // subscription with a `lineItems` array — a flat amount/currencyCode/
    // interval shape is rejected by billing.request() at runtime with
    // "Invalid billing configuration for plan ...".
    [MONTHLY_PLAN]: {
      lineItems: [
        { amount: 9.99, currencyCode: "USD", interval: BillingInterval.Every30Days },
      ],
      trialDays: 7,
    },
    [ANNUAL_PLAN]: {
      lineItems: [
        { amount: 99.99, currencyCode: "USD", interval: BillingInterval.Annual },
      ],
      trialDays: 7,
    },
  },
  future: {},
  ...(process.env.SHOP_CUSTOM_DOMAIN
    ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] }
    : {}),
});

export default shopify;
export const apiVersion = ApiVersion.October25;
export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
export const authenticate = shopify.authenticate;
export const unauthenticated = shopify.unauthenticated;
export const login = shopify.login;
export const registerWebhooks = shopify.registerWebhooks;
export const sessionStorage = shopify.sessionStorage;
