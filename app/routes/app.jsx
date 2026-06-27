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
  const isResponse = error instanceof Response;
  // Extract Location header server-side (headers not available after serialization to client)
  const redirectTo = isResponse ? (error.headers?.get?.("Location") ?? null) : null;

  return (
    <>
      {boundary.error(error)}
      {/*
        When authenticate.admin throws a 302, React Router catches it in ErrorBoundary
        instead of following the redirect. We force the redirect here so OAuth can start.
        window.top ensures the top frame navigates (required for embedded apps).
      */}
      {redirectTo && (
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              var dest = ${JSON.stringify(redirectTo)};
              try { window.top.location.href = dest; }
              catch(e) { window.location.href = dest; }
            })();`,
          }}
        />
      )}
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
        {isResponse ? `Response ${error.status}` : String(error)}
        {redirectTo && ` → ${redirectTo.substring(0, 120)}`}
      </div>
    </>
  );
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
