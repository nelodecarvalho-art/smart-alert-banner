import { Outlet, Meta, Links, Scripts, ScrollRestoration } from "react-router";

export const meta = () => [
  { title: "Smart Alert Banner - Shopify App" },
  { name: "description", content: "Gerencie banners inteligentes para sua loja Shopify" },
  { viewport: "width=device-width,initial-scale=1" },
];

export default function Root() {
  return (
    <html lang="pt-BR">
      <head>
        <Meta />
        <Links />
      </head>
      <body style={{ margin: 0, padding: 0, background: "#f0f2f5" }}>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}