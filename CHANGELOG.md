# Smart Alert Banner — Changelog

## 1.0.0 — 2026-06-25

Initial production release.

### Features
- Geo-targeted banners for all 50 US states + D.C. via [ipapi.co](https://ipapi.co) detection
- Configurable banner text (up to 200 characters), background color, text color
- Optional countdown timer (datetime-local deadline)
- Toggle to show/hide state label on the banner
- Per-shop settings persisted in SQLite (Prisma)
- Shopify Billing API integration — monthly ($9.99) and annual ($99.99) plans with 7-day trial
- Theme App Extension (`extensions/smart-banner/blocks/banner.liquid`)
- Public storefront API endpoint (`/api/banner`) with CORS headers and 60s cache
- Session-based dismiss (banner does not reappear after close within the same browser session)
- WCAG 2.1 accessible markup — `role="alert"`, `aria-live`, `aria-label` on interactive elements
- XSS-safe: banner text rendered via `textContent`, color inputs validated server-side

### Architecture
- React Router v7 + Shopify App Bridge
- Remix-style loaders/actions with full TypeScript support via `react-router typegen`
- Prisma ORM (SQLite dev / PostgreSQL production)
- ESLint + Prettier configured
