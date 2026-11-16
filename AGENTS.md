# stageink-website: Agent Guide

Static homepage of Stageink (Stagies Berlin e.V.), a musical theatre association in Berlin. Vue 3, Vite, vite-ssg, Tailwind v4, GSAP, Iconify. Plain JavaScript, no TypeScript, no tests.

Nested guides, read before working in their folder: `src/views/AGENTS.md` (views, routes), `src/views/home/AGENTS.md` (home view backgrounds, events), `plugins/AGENTS.md` (custom Vite plugins).

## Rules

- Never format by hand: `npm run lint:fix` (formatting, import order, Tailwind class order). Lint fails on any warning.
- Visitor-facing text is German; code, comments and docs are English.
- Comments explain why, never what. No emojis, arrows or decorative lines.
- No commented-out code. Exception: a feature switched off temporarily, with a comment saying when and how to switch it back on.
- Prefer early returns and extracted functions over nesting. Embed changes into existing code instead of bolting them on; after larger edits, re-read the whole file.
- Pushing to `main` deploys the preview. Production deploys are manual (`README.md`); never trigger them.

## Commands

```bash
npm run dev       # dev server, http://localhost:5173
npm run lint:fix
npm run build     # vite-ssg build into dist/
npm run preview   # serve dist/
```

Before finishing: `lint:fix` and `build`.

## Layout

- `src/views/<view>/`: one directory per view, with `Index.vue`, view-private components and a view-private `assets/`.
- `src/components/`: components used by more than one view.
- `src/content/`: mostly-text blocks (legal notices), kept apart from interactive components.
- `src/composables/`: shared reactive logic. `src/utils/`: plain functions without Vue.
- `src/assets/`: assets used by more than one view.
- `public/`: files copied unprocessed to fixed URLs (fonts referenced from `src/fonts.css`, favicons).
- `plugins/`: custom Vite plugins. `design/`: source PSD/AI files of bundled images, never imported.
- `src/main.css`: Tailwind entry, `@theme` tokens, element defaults, `aura` utilities.

An asset lives next to its only user: in `src/views/<view>/assets/` if one view uses it, in `src/assets/` once a second view does. Move it when that changes. `public/` only for files that need a stable, unhashed URL.

## Static Generation

`vite-ssg` pre-renders every route to HTML at build time.
- Code at setup or render time runs in Node: browser APIs (`window`, `document`, `Date.now()` comparisons) only in `onMounted` or later. The first client render must match the pre-rendered HTML.
- Route paths end in `/` (`/cfa/`), or relative URLs in the generated HTML break.
- The preview is served under `/stageink-website/` (`VITE_BASE`), production under `/`. Link internally with `RouterLink`/`RoundButton to`, never a hard-coded absolute href.

## Components

- `LqipImage`, `FlatCard`, `RoundButton` and `SectionContainer` are registered globally (`src/main.js`): use them without importing. Import every other component.
- Props use the object syntax with `type` and `default` or `required`, plus a short comment when the name does not explain the purpose.
- Lists (links, options, people) are arrays in `<script>` rendered with `v-for`, never written out in the template.
- Third-party embeds (Zeffy, Google Maps) load nothing until the visitor ticks the consent checkbox (`ZeffyDonationForm`, `GoogleMapsEmbed`). New embeds follow the same pattern.
- Respect `prefers-reduced-motion` in every animation (`useScrollTimeline` skips the timeline, CSS animations set `animation: none`).

## Styling

- Tailwind utilities in the template. `<style scoped>` only for what utilities cannot express (pseudo-elements of native elements, keyframes); such a block needs `@reference "../main.css";` (path relative to the file) to use theme values in `@apply`.
- Colors are `@theme` tokens in `src/main.css` (`--color-zeffy`). No hex values in components.
- Class names appear in full in the source so Tailwind finds them: store `"text-paypal"`, never `` `text-${name}` ``. The same holds for icon names (`plugins/AGENTS.md`).
- Arbitrary values (`[...]`) only for numbers off the spacing scale, such as values derived from image dimensions, with a comment.
- Running text is left-aligned; centering only for short UI elements (buttons, names on cards). Never justify.
- `!` (important) only to override inline styles set by third-party code (the Zeffy embed).
- `aura` draws a blurred glow as a `::before` at `-z-10` inside the nearest stacking context (`isolate`). Layers behind it sit at `-z-20`. Color and opacity: `aura-<color>/<opacity>`, size: `aura-spread-<n>`, hover-only: `aura-hover`.

## Images

Import images with `?lqip` and render them with `LqipImage` (an `<img>`, or a CSS background with `background`). The import yields an image bundle `{ url, lqip, width, height, srcset }`: a WebP plus a tiny blurred placeholder shown until it loads. Query options are documented in `plugins/imageBundle.js`.
- Large images add `widths` (`?lqip&widths=640;1280;1920`) so phones load a smaller version. As `<img>`, also pass the rendered width as `sizes` (`sizes="14rem"`). As a background, `LqipImage` measures the element (including device pixel ratio and `bg-cover`) and loads the smallest version that covers it, upgrading if it grows.
- `transparent` for images with alpha, so the placeholder does not show through once loaded.
- SVGs import as components with `?component` (vite-svg-loader).
- Videos are WebM in the view's `assets/`, converted with:
  `ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 33 -b:v 0 -deadline best -c:a libopus -b:a 96k output.webm`

## Keeping the Docs Current

Two audiences, almost no overlap:
- `README.md` is for people seeing the project for the first time: what it is, setup, deployment. Plain language, no em dashes, emojis or flowery wording.
- `AGENTS.md` files are for coding agents: conventions, structure and the traps that set this project apart from a generic Vue site. Skip what a competent agent already knows. Dense, one term per concept (view, asset, image bundle, aura).

The root guide holds what applies everywhere; a nested `AGENTS.md` holds what only applies inside its directory and starts with "Extends the root `AGENTS.md`." Put knowledge in the most specific guide and add a nested guide only when a directory has enough of its own. `AGENTS.md` is the only agent instruction format; never add `CLAUDE.md`.

Every change that affects documented behavior updates the docs in the same change. Describe the current state, never history. Keep files short: rephrase and merge existing text instead of appending, so a guide does not grow noticeably with each change. Never copy values from code that can drift; name the file or constant instead. When touching an area, check its docs against the code and fix whichever is wrong.
