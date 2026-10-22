# VESPER — Contemporary Perfumery

A fictional niche fragrance maison and functional storefront concept by PFxamd. Modern Maison art direction with 28 original product and editorial photographs served from the VESPER Cloudflare R2 library.

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

## Photography library

`media.mjs` maps 18 fragrance photographs, 3 Discovery Set photographs and 7 editorial photographs to verified R2 URLs under `pfxamd/concepts/vesper/`. Journal images are shared between cards and articles. Photography fills the existing panel dimensions without changing the storefront layout.

The 13 completion originals and their SHA-256 manifest are preserved in `.github/media-originals/completion/`, excluded by GitHub Pages Jekyll and absent from the `dist/` build. Earlier originals remain in `assets/`. Upload and verify new files before changing their media mappings; never store R2 credentials in this repository.

## Shared PFx cores

PFx shared cores were evaluated before implementation. This site intentionally does not install a dark-mode engine, animation runtime or styling framework: its single light art direction and simple interactions need no such dependency. Use version-pinned cores if a concrete need arises rather than copying functionality without justification.