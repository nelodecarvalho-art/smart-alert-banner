# Smart Alert Banner — Material de Divulgação

Textos prontos para publicar após aprovação na Shopify App Store.
App Store URL: `https://apps.shopify.com/smart-alert-banner` (disponível após aprovação)

---

## 1. Reddit — r/shopify e r/ecommerce

### Título
```
I built a Shopify app that shows alert banners only to customers in a specific US state — free for 7 days
```

### Corpo do post
```
Hey r/shopify,

I run a small e-commerce side project and kept running into the same problem:
store-wide banners are noisy. If I'm offering free shipping to California customers,
why show that banner to someone in Texas?

So I built Smart Alert Banner — it detects your visitor's US state via IP and
shows a personalized banner only to people in the state you target. Everyone else
sees nothing.

What it does:
- Target any of the 50 US states + D.C.
- Customizable text, background color, and text color
- Optional live countdown timer (banner hides automatically when it expires)
- Installs via App Embeds — no code, no theme edits, under 2 minutes
- Real-time preview before going live

Some use cases I had in mind:
→ "Free 2-day shipping — California customers only"
→ "No sales tax this weekend — Florida shoppers!"
→ "Flash sale for Texas — 20% off, ends midnight"
→ Local pickup or inventory announcements

It's $9.99/month or $99.99/year (save 17%), with a 7-day free trial.

I'd love feedback from anyone who tries it — especially if you find edge cases
or want features I haven't thought of yet.

[Link to app on Shopify App Store]

Happy to answer questions about how it works technically too.
```

---

## 2. Shopify Community Forums

### Título
```
[New App] Smart Alert Banner — geo-targeted banners for any US state, no code needed
```

### Corpo do post
```
Hi Shopify Community!

I'm excited to share a new app I built: Smart Alert Banner.

THE PROBLEM
Most Shopify banner apps show the same message to every visitor. But if you're
running a state-specific promotion — free shipping to California, a tax holiday
in Florida, local pickup in Texas — you end up either cluttering your store for
everyone or missing the opportunity entirely.

THE SOLUTION
Smart Alert Banner automatically detects your visitor's US state and shows a
personalized banner only to customers in your target state. Everyone else
browses normally.

KEY FEATURES
✅ Target any of all 50 US states + Washington D.C.
⏰ Optional live countdown timer
🎨 Fully customizable text and colors
👁️ Real-time live preview before publishing
🛒 Installs via App Embeds — zero code, zero theme edits

HOW TO GET STARTED
1. Install from the Shopify App Store (link below)
2. Write your message and choose a target state
3. Enable via Online Store → Themes → App Embeds
4. Done — live in under 2 minutes

PRICING
Free 7-day trial. Then $9.99/month or $99.99/year (save 17%).

I'd love to hear feedback from the community — what use cases do you have
for geo-targeted messaging? Any features you'd find useful?

Support: nelodecarvalho@gmail.com

[Link to app]
```

---

## 3. IndieHackers

### Título
```
I built and launched a Shopify app that shows geo-targeted banners to US state visitors
```

### Corpo do post
```
Hey IH!

I just launched Smart Alert Banner on the Shopify App Store and wanted to share
the journey.

THE PROBLEM I SOLVED

I was helping a friend with their Shopify store. They wanted to offer free
shipping to customers in California — a real, specific promotion — but Shopify's
built-in announcement bar shows to everyone. Showing a "California-only" offer
to someone in Ohio is just noise.

I looked at existing apps. Most are either too complex (full popup builders with
10x the features I need) or don't do geo-targeting at all.

So I built a focused tool that does one thing well: detect the visitor's US state
and show a banner only if they're in the target state.

HOW I BUILT IT

Stack:
- React Router v7 (formerly Remix) — full-stack framework for Shopify apps
- Shopify App React Router adapter + Polaris design system
- Prisma + PostgreSQL for storing banner settings per shop
- Railway for hosting and database
- Shopify App Extensions (App Embed Blocks) for the storefront banner

The geo-detection runs on the client side using ipapi.co — no backend cost per
request, and it fails gracefully (shows banner anyway) if the API is down.

The trickiest part was the Shopify billing API. I'm using their subscription
billing with a 7-day trial, and getting the isTest flag right between dev stores
and production took some debugging.

WHAT IT DOES

- Target any of the 50 US states + D.C.
- Live countdown timer (banner hides when deadline passes)
- Customizable text, colors, state label
- Preview link to test from any location before going live
- Installs via App Embeds — merchants need zero coding knowledge

METRICS SO FAR

- Launched: today (2026-06-28)
- Installs: 0 (just went live!)
- Paying customers: 0
- Goal for month 1: 10 installs, 3 paying customers

PRICING

$9.99/month or $99.99/year (save 17%), 7-day free trial.

I paid $19 to register for Shopify App Store public distribution, which is the
main cost so far. Hosting on Railway is ~$5/month.

WHAT'S NEXT

- Gather feedback from first users
- Add support for Canadian provinces (next most requested feature I expect)
- Possibly add A/B testing for banner text

Would love feedback on pricing, positioning, or anything else. And if you run a
Shopify store, I'd love for you to try it!

[Link to app on Shopify App Store]
```

---

## 4. Twitter/X — sequência de 3 tweets

### Tweet 1 — O problema
```
Shopify store owners: you're showing the same banner to EVERYONE.

"Free shipping to California customers" shown to someone in Ohio is just noise.

There's a better way 🧵
```

### Tweet 2 — O app + features
```
I built Smart Alert Banner — it detects your visitor's US state and shows
a personalized banner only to people in your target state.

✅ All 50 US states
⏰ Live countdown timer
🎨 Custom text & colors
🛒 No code — installs in 2 min via App Embeds
👁️ Real-time preview

[screenshot: banner appearing on store for CA visitors]
```

### Tweet 3 — Call to action
```
Available on the Shopify App Store.

7-day free trial → $9.99/month or $99.99/year

Perfect for:
→ State-specific free shipping
→ Sales tax holiday alerts
→ Flash sales targeting a region
→ Local inventory announcements

[link to app]
```

---

## 5. Product Hunt

### Tagline
```
Geo-targeted alert banners for Shopify — shown only to the right US state
```

### Descrição curta
```
Smart Alert Banner shows personalized banners to Shopify visitors based on
their US state — automatically. Target any of the 50 states, add a live
countdown timer, customize colors and text. Installs in 2 minutes via App
Embeds. No code required. Free 7-day trial.
```

### Founder comment (primeiro comentário sugerido)
```
Hey Product Hunt! 👋

I'm Nelo, the maker of Smart Alert Banner.

I built this because I kept seeing the same problem: Shopify stores show
store-wide banners that are irrelevant to most visitors. If you're offering
free shipping to California customers, why show that to someone in Texas?

Smart Alert Banner solves this by detecting the visitor's US state via IP
and showing the banner only to customers in your target state. Everyone else
browses normally — no clutter, no irrelevant messages.

The setup takes under 2 minutes: install, write your message, pick a state,
enable it in App Embeds. Done.

I'd love to hear what you think — especially if you have ideas for features
you'd want. What state-specific campaigns would YOU run?

Happy to answer any questions about how it works!

— Nelo
nelodecarvalho@gmail.com
```

---

## Checklist de publicação

Aguardar URL pública do listing antes de publicar qualquer post.

- [ ] Shopify App Store aprovado → URL confirmada
- [ ] Reddit r/shopify — publicar com link real
- [ ] Reddit r/ecommerce — publicar com link real
- [ ] Shopify Community Forums — publicar com link real
- [ ] IndieHackers — publicar com link real
- [ ] Twitter/X — publicar sequência de 3 tweets (com screenshot real)
- [ ] Product Hunt — agendar launch (terças ou quartas, 12:01 AM PT)
