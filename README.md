# VESPER — Contemporary Perfumery

A fictional niche fragrance maison and functional, image-free storefront concept by PFxamd. Modern Maison art direction: mineral color panels reserve every product and editorial image until original photography is supplied.

## Experience

- Editorial landing page and six distinct eau de parfums, each with 15 / 50 / 100 ml variants.
- Product details, scent notes, pairing suggestions and a six-vial Discovery Set.
- Shop with scent-family filters, search and sorting.
- Wishlist, shopping bag, quantities, delivery estimates and promotion preview.
- Four-step interactive Scent Finder quiz.
- Guest preview checkout, browser-local receipt/order history and local profile.
- Journal, Maison story, shipping/help and legal information.
- Responsive desktop/mobile layout, keyboard support and reduced-motion styles.

### Important commercial limitation

**VESPER is currently a portfolio concept, not an operating retailer.** Checkout does **not** charge money, authenticate a user, store an order on a server or dispatch products. The browser-local preview flow deliberately labels this clearly. Account, order history and newsletter information live **only on the visitor's device**. Do not advertise or represent the site as accepting real orders. Adding real sales requires a secure server-side order/inventory service, verified merchant account, payment provider, regional tax/shipping/refund policies and legally compliant customer-data processing.

## Run locally

Requires Node.js 20+; zero npm dependencies.

```sh
npm run dev
npm run check
```

Open `http://127.0.0.1:4173`.

## Deployment

`npm run build` generates `dist/`. Configure Cloudflare Pages/Workers static assets to publish that directory (build command `npm run build`, output `dist`). A plain static host can also serve the repository root. No Node server or environment variables are needed at runtime. Hash-based internal routes (`/#/shop`, `/#/finder`, etc.) do not require server rewrite configuration.

## Replacing the color panels with original images

Product and editorial placeholders are rendered by `visual()` and section-specific field styles in `app.mjs` / `styles.css`. Preserve the product metadata in `catalog.mjs`; swap placeholder markup for `<picture>` or `<img>` using locally optimized AVIF/WebP assets, meaningful `alt` text and appropriate aspect ratios. The storefront currently does not fetch or embed images.

## Shared PFx cores

PFx shared cores were evaluated before implementation. This site intentionally does not install a dark-mode engine, animation runtime or styling framework: its single light art direction and simple interactions need no such dependency. Use version-pinned cores if a concrete need arises rather than copying functionality without justification.