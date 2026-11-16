# Views: Agent Guide

Extends the root `AGENTS.md`.

- A view is a directory with `Index.vue` as its top-level component, registered in `src/router/router.js` (path with trailing slash). `App.vue` renders the view plus the shared footer (`src/content/Haftungsausschluss.vue`).
- Components only one view uses stay in its directory, imported relatively (`./EventCard.vue`). Once a second view needs one, move it to `src/components/` (same for assets).
- Every view is one `<main>` and links back home through `SiteLogo`.
- Each view has its own art direction: full-page background images with `LqipImage background`, content on translucent cards (`FlatCard`, `HeroCard`) inside `SectionContainer`. View-specific colors are prefixed tokens in `src/main.css` (`--color-cfa-*`).

## cfa

Project page of the "Come From Away" production. Profile photos import with a plain imagetools query (`?w=500&format=webp&imagetools`), not `?lqip`, since `CastCard` renders a bare `<img>`. Cast and band are shuffled in `onMounted`, so the pre-rendered HTML keeps the source order.
