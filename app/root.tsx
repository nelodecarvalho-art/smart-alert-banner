import { Outlet, Meta, Links, Scripts, ScrollRestoration, useLoaderData } from "react-router";

export const loader = () => ({
  apiKey: process.env.SHOPIFY_API_KEY ?? "",
});

export default function Root() {
  const { apiKey } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        {apiKey && (
          <script
            src="https://cdn.shopify.com/shopifycloud/app-bridge.js"
            data-api-key={apiKey}
          />
        )}
      </head>
      <body style={{ margin: 0, padding: 0, background: "#f7f8fa" }}>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
