#!/usr/bin/env node
// Gera 3 screenshots 1280×720px para o App Store da Shopify
// Baseados na UI real do smart-alert-banner

import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '..', 'public');

const W = 1280;
const H = 720;

// ─── helpers ───────────────────────────────────────────────────────────────

function rect(x, y, w, h, fill, rx = 0, extra = '') {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" rx="${rx}" ${extra}/>`;
}

function text(x, y, content, fontSize, fill, anchor = 'start', weight = 400, extra = '') {
  return `<text x="${x}" y="${y}" font-family="'Inter','Helvetica Neue',Arial,sans-serif"
    font-size="${fontSize}" font-weight="${weight}" fill="${fill}"
    text-anchor="${anchor}" ${extra}>${content}</text>`;
}

function label(x, y, content) {
  return `<text x="${x}" y="${y}" font-family="'Inter','Helvetica Neue',Arial,sans-serif"
    font-size="10" font-weight="600" fill="#888" text-anchor="start"
    letter-spacing="0.8" style="text-transform:uppercase">${content}</text>`;
}

function inputBox(x, y, w, value, fill = '#fff') {
  return `
    ${rect(x, y, w, 36, fill, 6, 'stroke="#e0e0e0" stroke-width="1.5"')}
    ${text(x + 12, y + 23, value, 13, '#333')}`;
}

function badge(x, y, label2, color, textColor = '#fff') {
  return `
    ${rect(x, y, 70, 22, color, 11)}
    ${text(x + 35, y + 15, label2, 11, textColor, 'middle', 600)}`;
}

function shopifySidebar() {
  return `
    <!-- Shopify Admin sidebar -->
    ${rect(0, 0, 220, H, '#1a1a2e')}
    ${text(20, 38, '◀ Admin', 13, '#ffffff80')}
    <!-- Nav items -->
    ${rect(0, 60, 220, 1, '#ffffff15')}
    ${['Home', 'Orders', 'Products', 'Customers', 'Analytics'].map((item, i) =>
      text(20, 100 + i * 44, item, 13, '#ffffff60')
    ).join('')}
    ${rect(0, 300, 220, 1, '#ffffff15')}
    ${rect(8, 316, 204, 36, '#2563EB20', 8)}
    ${text(20, 339, '◆ Smart Alert Banner', 13, '#93C5FD', 'start', 600)}
    ${['Online Store', 'Themes', 'Blog posts'].map((item, i) =>
      text(20, 390 + i * 44, item, 13, '#ffffff50')
    ).join('')}
  `;
}

function topBar(title) {
  return `
    ${rect(220, 0, W - 220, 52, '#f6f7f8')}
    ${rect(220, 52, W - 220, 1, '#e0e0e0')}
    ${text(240, 32, title, 15, '#333', 'start', 600)}
    <!-- Shop name badge -->
    ${rect(W - 180, 12, 160, 28, '#fff', 6, 'stroke="#e0e0e0" stroke-width="1"')}
    ${text(W - 100, 30, 'myshop.myshopify.com', 10, '#666', 'middle')}
  `;
}

// ─── Screenshot 1: Dashboard — Banner Settings ─────────────────────────────

function screenshot1() {
  const cx = 240; // content x start
  const cw = W - cx - 20; // content width

  const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    ${rect(0, 0, W, H, '#f6f7f8')}
    ${shopifySidebar()}
    ${topBar('Smart Alert Banner')}

    <!-- CONTENT AREA -->
    <!-- Header -->
    ${text(W / 2 + 110, 100, 'Smart Alert Banner', 26, '#ff6b00', 'middle', 700)}
    ${text(W / 2 + 110, 122, 'Show geo-targeted banners to boost conversions across all 50 US states', 13, '#888', 'middle')}

    <!-- Billing trial banner -->
    ${rect(cx, 136, cw, 58, '#fff8e1', 10, 'stroke="#ffcc02" stroke-width="1.5"')}
    ${text(cx + 16, 157, '⚡', 20, '#F59E0B')}
    ${text(cx + 46, 155, 'Start your free 7-day trial', 13, '#333', 'start', 700)}
    ${text(cx + 46, 172, 'Activate a plan to publish your banner to real customers.', 12, '#666')}
    <!-- Plan buttons -->
    ${rect(cx + cw - 268, 148, 118, 30, '#fff', 7, 'stroke="#ff6b00" stroke-width="2"')}
    ${text(cx + cw - 209, 167, '$9.99/month', 12, '#ff6b00', 'middle', 600)}
    ${rect(cx + cw - 142, 148, 122, 30, '#ff6b00', 7)}
    ${text(cx + cw - 81, 167, '$99.99/year — Save 17%', 11, '#fff', 'middle', 600)}

    <!-- Settings card -->
    ${rect(cx, 208, cw, 366, '#fff', 12, 'filter="url(#card-shadow)"')}
    ${text(cx + 20, 238, '⚙️ Banner Settings', 14, '#222', 'start', 600)}
    ${rect(cx + 20, 246, cw - 40, 1, '#f0f0f0')}

    <!-- Active toggle -->
    ${rect(cx + 20, 258, 18, 18, '#ff6b00', 4)}
    ${text(cx + 20 + 10, 271, '✓', 12, '#fff', 'middle', 700)}
    ${text(cx + 46, 271, 'Banner active — visible on your storefront', 13, '#444')}

    <!-- Banner text field -->
    ${label(cx + 20, 308, 'Banner text')}
    ${inputBox(cx + 20, 314, cw - 40, '🎉 Free shipping for customers in your state!')}
    ${text(cx + 20, 366, '46/200 characters', 10, '#aaa')}

    <!-- Row: Target state + Deadline -->
    ${label(cx + 20, 388, 'Target state')}
    ${inputBox(cx + 20, 394, (cw - 40) / 2 - 8, 'California (CA)')}
    ${label(cx + 20 + (cw - 40) / 2, 388, 'Countdown deadline (optional)')}
    ${inputBox(cx + 20 + (cw - 40) / 2 + 8, 394, (cw - 40) / 2 - 8, '2026-07-15T23:59')}

    <!-- Row: BG Color + Text color + Show state -->
    ${label(cx + 20, 456, 'Background color')}
    ${rect(cx + 20, 462, 40, 36, '#ff6b00', 6, 'stroke="#e0e0e0" stroke-width="1"')}
    ${inputBox(cx + 68, 462, 100, '#ff6b00')}

    ${label(cx + 200, 456, 'Text color')}
    ${rect(cx + 200, 462, 40, 36, '#ffffff', 6, 'stroke="#e0e0e0" stroke-width="1"')}
    ${inputBox(cx + 248, 462, 100, '#ffffff')}

    ${rect(cx + 20 + (cw - 40) / 2 + 8, 472, 16, 16, '#ff6b00', 3)}
    ${text(cx + 20 + (cw - 40) / 2 + 8 + 8, 483, '✓', 10, '#fff', 'middle', 700)}
    ${text(cx + 20 + (cw - 40) / 2 + 32, 483, 'Show state label on banner', 12, '#444')}

    <!-- Save button -->
    ${rect(cx + 20, 524, cw - 40, 38, '#ff6b00', 8)}
    ${text(W / 2 + 110, 547, '💾 Save settings', 14, '#fff', 'middle', 600)}

    <!-- Caption overlay -->
    ${rect(0, H - 48, W, 48, '#1a1a2e')}
    ${text(W / 2, H - 18, 'Configure your geo-targeted banner in seconds — text, colors, state, and countdown all in one place', 13, '#93C5FD', 'middle')}

    <defs>
      <filter id="card-shadow" x="-5%" y="-5%" width="110%" height="120%">
        <feDropShadow dx="0" dy="4" stdDeviation="10" flood-color="#00000014"/>
      </filter>
    </defs>
  </svg>`;

  return svg;
}

// ─── Screenshot 2: Banner on a real storefront ─────────────────────────────

function screenshot2() {
  const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="card-shadow2" x="-5%" y="-5%" width="110%" height="120%">
        <feDropShadow dx="0" dy="6" stdDeviation="14" flood-color="#00000020"/>
      </filter>
    </defs>

    <!-- Background: gradient blue-dark (represents the context) -->
    ${rect(0, 0, W, H, '#0f172a')}

    <!-- Decorative grid lines -->
    ${Array.from({ length: 8 }, (_, i) =>
      `<line x1="${i * 180}" y1="0" x2="${i * 180}" y2="${H}" stroke="#ffffff05" stroke-width="1"/>`
    ).join('')}
    ${Array.from({ length: 5 }, (_, i) =>
      `<line x1="0" y1="${i * 160}" x2="${W}" y2="${i * 160}" stroke="#ffffff05" stroke-width="1"/>`
    ).join('')}

    <!-- Browser chrome -->
    ${rect(60, 50, W - 120, H - 140, '#fff', 14, 'filter="url(#card-shadow2)"')}
    <!-- Browser top bar -->
    ${rect(60, 50, W - 120, 44, '#f1f3f4', 14)}
    ${rect(60, 80, W - 120, 14, '#f1f3f4')}
    <!-- Traffic lights -->
    <circle cx="90" cy="72" r="6" fill="#ff5f57"/>
    <circle cx="108" cy="72" r="6" fill="#ffbd2e"/>
    <circle cx="126" cy="72" r="6" fill="#28ca41"/>
    <!-- URL bar -->
    ${rect(150, 58, W - 350, 28, '#fff', 14, 'stroke="#ddd" stroke-width="1"')}
    <circle cx="165" cy="72" r="6" fill="#4CAF50" opacity="0.7"/>
    ${text(176, 77, 'myshop.myshopify.com', 12, '#555')}
    <!-- Reload icon -->
    ${text(W - 225, 77, '↻', 16, '#888')}

    <!-- ALERT BANNER — fixed at top of store content -->
    ${rect(60, 94, W - 120, 46, '#ff6b00')}
    ${text(W / 2, 122, '🎉 Free shipping for customers in your state!', 15, '#fff', 'middle', 600)}
    ${text(W / 2 + 220, 122, '📍 CA only', 12, '#ffffffcc', 'start')}
    ${text(W - 120 + 60 - 30, 122, '✕', 16, '#ffffffaa', 'middle')}

    <!-- Store content: nav bar -->
    ${rect(60, 140, W - 120, 50, '#fff')}
    ${rect(60, 189, W - 120, 1, '#eee')}
    ${text(140, 170, 'MyShop', 18, '#222', 'start', 700)}
    ${['Collections', 'Products', 'About', 'Contact'].map((item, i) =>
      text(340 + i * 120, 170, item, 13, '#555')
    ).join('')}
    ${rect(W - 200, 155, 60, 28, '#ff6b00', 6)}
    ${text(W - 170, 174, 'Cart (2)', 11, '#fff', 'middle', 600)}

    <!-- Hero section -->
    ${rect(60, 190, W - 120, 180, '#f8f9fa')}
    ${text(W / 2, 270, 'Summer Collection 2026', 28, '#222', 'middle', 700)}
    ${text(W / 2, 298, 'Exclusive styles for this season', 14, '#777', 'middle')}
    ${rect(W / 2 - 70, 312, 140, 36, '#ff6b00', 8)}
    ${text(W / 2, 334, 'Shop Now', 13, '#fff', 'middle', 600)}

    <!-- Product grid skeleton -->
    ${rect(60, 380, W - 120, 204, '#fff')}
    ${[0, 1, 2, 3].map(i => `
      ${rect(80 + i * 280, 390, 260, 140, '#f5f5f5', 8)}
      ${rect(80 + i * 280, 542, 140, 14, '#e8e8e8', 4)}
      ${rect(80 + i * 280, 562, 80, 12, '#f0f0f0', 4)}
    `).join('')}

    <!-- Geo tag callout -->
    ${rect(60, 94, 180, 46, '#cc5500')}
    ${text(150, 108, '📍 Geo-targeted', 11, '#fff', 'middle', 700)}
    ${text(150, 124, '→ California visitors only', 10, '#ffcc99', 'middle')}

    <!-- Caption overlay -->
    ${rect(0, H - 48, W, 48, '#1e3a8a')}
    ${text(W / 2, H - 18, 'The banner appears automatically at the top of your store — only for visitors from the targeted US state', 13, '#93C5FD', 'middle')}
  </svg>`;

  return svg;
}

// ─── Screenshot 3: Live Preview + Countdown ────────────────────────────────

function screenshot3() {
  const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="card-shadow3">
        <feDropShadow dx="0" dy="4" stdDeviation="10" flood-color="#00000014"/>
      </filter>
      <linearGradient id="previewBg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1a1a2e"/>
        <stop offset="100%" stop-color="#16213e"/>
      </linearGradient>
    </defs>

    ${rect(0, 0, W, H, '#f6f7f8')}
    ${shopifySidebar()}
    ${topBar('Smart Alert Banner')}

    <!-- Left column: Live Preview card -->
    ${rect(240, 64, 500, 400, '#fff', 12, 'filter="url(#card-shadow3)"')}
    ${text(260, 93, '👁️ Live Preview', 14, '#222', 'start', 600)}
    ${rect(260, 100, 460, 1, '#f0f0f0')}

    <!-- Dark preview area -->
    ${rect(260, 112, 460, 200, 'url(#previewBg)', 10)}
    ${text(490, 138, 'BANNER PREVIEW', 9, '#ffffff60', 'middle', 600)}

    <!-- Animated banner demo inside preview -->
    ${rect(260, 148, 460, 52, '#ff6b00', 0)}
    ${text(490, 169, '🎉 Free shipping for customers in your state!', 13, '#fff', 'middle', 600)}
    ${text(490, 186, '📍 CA only   ⏰  2d 14h 33m 07s', 11, '#ffffffcc', 'middle')}
    ${text(700, 174, '✕', 14, '#ffffffaa', 'middle')}

    ${text(490, 268, 'This banner will only appear to visitors from CA', 11, '#ffffff50', 'middle')}

    <!-- Countdown highlight box -->
    ${rect(285, 290, 410, 60, '#ffffff08', 8, 'stroke="#ffffff15" stroke-width="1"')}
    ${text(490, 312, '⏰  Countdown active', 12, '#93C5FD', 'middle', 600)}
    ${text(490, 332, 'Banner hides automatically when the deadline passes', 11, '#ffffff60', 'middle')}

    <!-- Preview URL hint -->
    ${text(260, 338, 'Preview URL', 10, '#888', 'start')}
    ${rect(260, 344, 460, 32, '#f8f9fa', 6, 'stroke="#e0e0e0" stroke-width="1"')}
    ${text(272, 364, 'myshop.myshopify.com?smart_banner_preview=1', 11, '#555')}

    <!-- Right column: Installation + Geo info -->
    ${rect(752, 64, 508, 192, '#fff', 12, 'filter="url(#card-shadow3)"')}
    ${text(772, 93, '🛒 How to activate on your store', 14, '#222', 'start', 600)}
    ${rect(772, 100, 468, 1, '#f0f0f0')}
    ${[
      '① Go to Online Store → Themes in Shopify Admin',
      '② Click Customize on your active theme',
      '③ Select App Embeds (puzzle-piece icon on the left)',
      '④ Toggle on Smart Alert Banner and Save',
    ].map((step, i) =>
      text(772, 122 + i * 30, step, 12, i === 0 ? '#333' : '#555', 'start', i === 0 ? 600 : 400)
    ).join('')}

    <!-- Geo targeting card -->
    ${rect(752, 268, 508, 196, '#fff', 12, 'filter="url(#card-shadow3)"')}
    ${text(772, 297, '🌎 Geo-targeting — All 50 US States', 14, '#222', 'start', 600)}
    ${rect(772, 304, 468, 1, '#f0f0f0')}

    <!-- State badges grid -->
    ${['CA', 'TX', 'FL', 'NY', 'WA', 'IL', 'OH', 'GA'].map((state, i) => `
      ${rect(772 + (i % 4) * 114, 316 + Math.floor(i / 4) * 36, 104, 26, i === 0 ? '#ff6b00' : '#f0f0f0', 8)}
      ${text(772 + (i % 4) * 114 + 52, 334 + Math.floor(i / 4) * 36, state, 12, i === 0 ? '#fff' : '#555', 'middle', 600)}
    `).join('')}

    ${text(772, 406, '+ 42 more states supported out of the box', 12, '#2563EB', 'start')}
    ${text(772, 426, 'Visitor location detected automatically via IP — no setup required', 12, '#888', 'start')}
    ${text(772, 450, 'Works on all Shopify themes with App Embed Blocks', 12, '#aaa', 'start')}

    <!-- Caption overlay -->
    ${rect(0, H - 48, W, 48, '#1a1a2e')}
    ${text(W / 2, H - 18, 'Real-time preview with live countdown · Target all 50 US states · Auto geo-detection via IP · No code needed', 13, '#93C5FD', 'middle')}
  </svg>`;

  return svg;
}

// ─── Generate all ────────────────────────────────────────────────────────────

const screenshots = [
  { name: 'screenshot-1-dashboard.png',   fn: screenshot1, title: '1 — Dashboard & Settings' },
  { name: 'screenshot-2-banner-store.png', fn: screenshot2, title: '2 — Banner on Storefront' },
  { name: 'screenshot-3-preview.png',      fn: screenshot3, title: '3 — Live Preview & Geo-Targeting' },
];

for (const s of screenshots) {
  const svg = s.fn();
  const out = join(OUT_DIR, s.name);
  const info = await sharp(Buffer.from(svg)).png().toFile(out);
  console.log(`✅ ${s.title}: ${out.split('\\').pop()} — ${info.width}×${info.height}px, ${(info.size / 1024).toFixed(1)} KB`);
}

console.log('\n✨ Todos os screenshots gerados em public/');
