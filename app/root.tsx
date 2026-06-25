import { Outlet, Meta, Links, Scripts, ScrollRestoration } from "react-router";

export const meta = () => [
  { title: "Smart Alert Banner" },
  { name: "description", content: "Show geo-targeted banners to boost conversions on your Shopify store" },
  { viewport: "width=device-width,initial-scale=1" },
];

export default function Root() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body style={{ margin: 0, padding: 0, background: "#f7f8fa" }}>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}