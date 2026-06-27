import { Outlet, useLoaderData, useRouteError } from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { AppProvider } from "@shopify/shopify-app-react-router/react";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  // eslint-disable-next-line no-undef
  return { apiKey: process.env.SHOPIFY_API_KEY || "" };
};

export default function App() {
  const { apiKey } = useLoaderData();

  return (
    <AppProvider embedded apiKey={apiKey}>
      <s-app-nav>
        <s-link href="/app">Settings</s-link>
        <s-link href="/app/additional">How it works</s-link>
      </s-app-nav>
      <Outlet />
    </AppProvider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  // Render boundary.error for Shopify's auth redirect responses (they carry auth headers)
  // but also show debug info so we can diagnose blank-screen issues.
  const isResponse = error instanceof Response;
  return (
    <>
      {boundary.error(error)}
      {/* Temp debug overlay — remove after auth is confirmed working */}
      <div
        style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          background: "#1a1a2e", color: "#f0f0f0", padding: "12px 16px",
          fontSize: "12px", fontFamily: "monospace", zIndex: 9999,
          borderTop: "2px solid #ff6b00",
        }}
      >
        <strong style={{ color: "#ff6b00" }}>AUTH DEBUG</strong>
        {" | "}
        {isResponse
          ? `Response ${error.status} ${error.statusText}`
          : String(error)}
      </div>
    </>
  );
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
