# Smart Alert Banner

A Shopify embedded app that displays geo-targeted promotional banners to storefront visitors based on their US state. Built with React Router v7, Prisma, and the Shopify App Bridge.

---

## Features

- **Geo-targeting** — show a banner only to visitors from a specific US state (all 50 + D.C.)
- **Live preview** — see exactly how the banner will look before saving
- **Countdown timer** — optional deadline creates urgency on your banner
- **Custom colors** — full background/text color pickers
- **Dismissible** — visitors can close the banner; closed state persists per session
- **Billing** — built-in $9.99/month or $99.99/year subscription with a 7-day free trial

---

## Prerequisites

- [Node.js](https://nodejs.org/) ≥ 20.19 or ≥ 22.12
- [Shopify CLI](https://shopify.dev/docs/apps/tools/cli/getting-started)
- A Shopify Partner account and a development store

---

## Quick Start

### 1. Clone and install

```bash
git clone <your-repo-url>
cd smart-alert-banner
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` with your Shopify API credentials.

### 3. Set up the database

```bash
npm run setup
```

This runs `prisma generate && prisma migrate deploy`.

### 4. Start development

```bash
npm run dev
```

The Shopify CLI opens a tunnel, authenticates, and launches the app.

---

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start local development with Shopify CLI |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run setup` | Generate Prisma client + apply migrations |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run deploy` | Deploy app to Shopify |

---

## Project Structure

```
app/
  routes/
    _index.jsx            — Banner settings UI (admin)
    app.jsx               — Shopify App Bridge shell + nav
    app.additional.jsx    — "How it works" help page
    api.settings.jsx      — Authenticated API: load/save settings per shop
    api.banner.jsx        — Public API: storefront banner config (CORS-enabled)
    api.billing.jsx       — Billing: subscription status + checkout flow
    auth.$.jsx            — OAuth callback handler
    auth.login/route.jsx  — Manual login page
    webhooks.app.uninstalled.jsx   — Cleanup on uninstall
    webhooks.app.scopes_update.jsx — Scope sync webhook
  shopify.server.js       — Shopify app config, billing plans
  db.server.js            — Prisma client singleton

extensions/
  smart-banner/
    blocks/banner.liquid  — Theme App Extension block (geo-detection + countdown)
    locales/en.default.json

prisma/
  schema.prisma           — Session + BannerSetting models
  migrations/             — SQL migration history
```

---

## How it works

1. The merchant configures the banner text, target state, and colors via the admin UI.
2. Settings are saved per-shop in SQLite (or your production DB).
3. The **Theme App Extension** (`extensions/smart-banner/blocks/banner.liquid`) is added to the merchant's theme via Shopify's theme editor.
4. When a visitor loads the storefront, the Liquid block fetches banner config from `/api/banner?shop=<shop>`, then uses [ipapi.co](https://ipapi.co) to detect the visitor's US state. If the state matches, the banner is shown.

---

## Deployment

### Environment variables

Set these on your hosting provider in addition to `.env.example`:

| Variable | Required | Description |
|----------|----------|-------------|
| `SHOPIFY_API_KEY` | ✅ | From Shopify Partners |
| `SHOPIFY_API_SECRET` | ✅ | From Shopify Partners |
| `SHOPIFY_APP_URL` | ✅ | Your production URL |
| `DATABASE_URL` | ✅ | PostgreSQL/MySQL URL for production |
| `SCOPES` | ✅ | `read_themes` |
| `NODE_ENV` | ✅ | `production` |

### Recommended hosts

- [Google Cloud Run](https://shopify.dev/docs/apps/launch/deployment/deploy-to-google-cloud-run)
- [Fly.io](https://fly.io/docs/js/shopify/)
- [Render](https://render.com/docs/deploy-shopify-app)
- [Railway](https://railway.app)

### Production database

SQLite works for a single-instance deployment. For multi-instance or high-availability, switch the `datasource` in `prisma/schema.prisma` to PostgreSQL:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

---

## Billing

| Plan | Price | Trial |
|------|-------|-------|
| Monthly | $9.99 / month | 7 days free |
| Annual | $99.99 / year (save 17%) | 7 days free |

Plans are defined in `app/shopify.server.js`. Update `MONTHLY_PLAN` / `ANNUAL_PLAN` constants and the `billing` config block to change pricing.

---

## Customization

- **Banner text**: up to 200 characters, supports emoji
- **Colors**: any valid hex color
- **Countdown deadline**: ISO datetime string (stored as text, displayed in visitor's local timezone)
- **ipapi.co**: the free tier allows up to 30,000 requests/month. For higher traffic, consider a paid geolocation provider or Shopify's built-in `customer.default_address.province_code` for logged-in customers.

---

## Security notes

- Admin routes (`/api/settings`, `/api/billing`) require Shopify OAuth via `authenticate.admin`.
- The public storefront endpoint (`/api/banner`) returns only non-sensitive display data and is scoped by `shop` domain.
- All banner text is rendered with `textContent` (never `innerHTML`) in the Liquid block, preventing XSS.
- Color inputs are validated server-side against `/^#[0-9a-fA-F]{6}$/`.

---

## License

Private / proprietary. All rights reserved.
