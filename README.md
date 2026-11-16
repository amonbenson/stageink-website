[![CI](https://github.com/amonbenson/stageink-website/actions/workflows/ci.yaml/badge.svg)](https://github.com/amonbenson/stageink-website/actions/workflows/ci.yaml)
[![Deploy to Production](https://github.com/amonbenson/stageink-website/actions/workflows/deploy-production.yml/badge.svg)](https://github.com/amonbenson/stageink-website/actions/workflows/deploy-production.yml)

# Stageink – Musicalverein Berlin

Source code for the [stageink.org](https://stageink.org) website. Stageink (Stagies Berlin e.V.) is a musical theatre association based in Berlin.

## Tech Stack

[Vue 3](https://vuejs.org) · [Vite](https://vite.dev) · [Tailwind CSS v4](https://tailwindcss.com) · [vite-ssg](https://github.com/antfu/vite-ssg) (static generation) · [GSAP](https://gsap.com) (animations) · [Iconify](https://iconify.design) · [vite-svg-loader](https://github.com/jpkleemans/vite-svg-loader) · [vite-imagetools](https://github.com/JonasKruckenberg/imagetools)

## Directory Layout

### src/

All application source code lives here. The most important subdirectories are:

- **`src/views/`** – One subdirectory per page/route (e.g. `home/`, `cfa/`). Each subdirectory contains the top-level view component (`Index.vue`), any components that are private to that page, and an `assets/` folder for images and other media used exclusively by that page. The routes are defined in `src/router/router.js`.
- **`src/components/`** – Reusable UI components shared across multiple views (e.g. `LqipImage.vue`, `SiteLogo.vue`). A component belongs here rather than in a view subdirectory if more than one page uses it.
- **`src/content/`** – Larger content blocks that contain mostly text or structured markup rather than interactive logic (e.g. `Haftungsausschluss.vue`). These are separated from `components/` to keep purely presentational content distinct from UI components.
- **`src/composables/`** – Vue composables: reusable stateful or reactive logic that is shared across components (e.g. `useScrollTimeline.js`).
- **`src/assets/`** – App-wide assets shared across multiple pages (e.g. `stageInkLogo.svg`).
- **`src/utils/`** – Plain JS utility functions with no Vue-specific logic (e.g. `shuffle.js`).

#### Asset management

Assets (images, fonts, etc.) are organised by where they are used:

| Location                   | Use when...                                             |
| -------------------------- | ------------------------------------------------------- |
| `src/assets/`              | The asset is shared across the app (e.g. the site logo) |
| `src/views/<view>/assets/` | The asset is only used by one specific page             |
| `public/`                  | The asset must not be bundled (see below)               |

Assets inside `src/` are **bundled by Vite** at build time: they are processed, optimised, fingerprinted (e.g. `logo.a3f2c1.png`), and inlined or copied into `dist/`. Referencing them from Vue files via `import` or relative paths is the normal workflow.

Assets inside `public/` are **copied to `dist/` as-is**, without any processing or fingerprinting. They are always available at a fixed URL (e.g. `/fonts/poppins-400-latin.woff2`). Use `public/` for assets that need a stable, predictable URL – such as fonts referenced from CSS `@font-face` rules, favicons, or files linked from outside the app.

### public/

Static assets that are served at a fixed path without bundling:

- **`public/fonts/`** – Poppins web font files (`.woff2`), referenced by URL from `src/fonts.css`
- **`public/favicon.*`** – Favicon in multiple formats

### .github/workflows/

GitHub Actions CI/CD pipelines:

- **`ci.yaml`** – Runs linting and builds the preview on every push and pull request to main.
- **`deploy-production.yml`** – Manually triggered workflow that uploads the built site to [stageink.org](https://stageink.org) via SFTP.

## Coding Conventions

`npm run lint:fix` enforces formatting, import order and Tailwind class order. The conventions below are not covered by the linter.

### Components

- **Globally registered base components** (`main.js`): `LqipImage`, `FlatCard`, `RoundButton` and `SectionContainer`. Use them without importing them. Import every other component explicitly.
- Props use the object syntax with `type` and `default` (or `required`), plus a short comment when the purpose isn't obvious from the name.
- Lists of data (links, options, people, …) live in `<script>` as arrays and are rendered with `v-for`. Don't write them inline in the template.
- Tailwind classes must appear in full in the source, so Tailwind can find them. Store e.g. `"text-paypal"` in data, never `` `text-${name}` ``.

### Styling

- Style with Tailwind utility classes in the template. Use a `<style scoped>` block only for things utilities can't express, such as pseudo-elements of native elements. Such a block needs `@reference "../main.css";` to use theme values and breakpoints in `@apply`.
- Colors are defined once as `@theme` tokens in `src/main.css` (e.g. `--color-zeffy`). Don't hard-code hex values in components.
- Use arbitrary values (`[…]`) only for numbers that can't be expressed on the spacing scale, such as values derived from an image's dimensions. Explain them in a comment.
- Use the `!` (important) suffix only to override inline styles set by third-party code (e.g. the Zeffy embed).
- `aura` glows are drawn with `z-index: -10` inside the nearest isolated stacking context (`isolate`). Background layers behind them must sit lower (`-z-20`).

### Comments and dead code

- Comments explain *why* something is done, not *what* the code does.
- Don't leave commented-out code. Git keeps the history. The only exception is a feature that is switched off temporarily: keep it in a comment that says when and how to switch it back on.

## Home Page

### Backgrounds

The home page (`src/views/home/Index.vue`) is one CSS grid with named areas: `logo`, `socials`, `events`, `about` (WIR) and `donate` (Spenden and Kontakt).

The three background images are grid items placed on these area lines, behind the content. Each image is therefore exactly as tall as the content it belongs to, and a growing element (such as the Zeffy form) only pushes the content below it down.

| Layer  | Phones                        | From `lg`                     | Behavior                                                                                   |
| ------ | ----------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------ |
| Sky    | `logo` – `socials`            | `logo` – `events`             | `bg-cover`, anchored to its bottom edge                                                    |
| Bushes | `events` – `donate`           | `about` – `donate`            | Full width, starts at the sky's bottom edge, repeats downwards (the image tiles seamlessly) |
| Wall   | `donate`                      | `donate`                      | Full width, fades into black where the visible part of the image ends                      |

The layout follows these rules:

1. The sky is on top and the **Heathers poster** is visible on first load. On phones the sky is a band of at least `SKY_MIN_HEIGHT`. The event cards start below it, on the bushes. From `lg`, the sky reaches behind all event cards. The sky's horizontal focus point (`75%` on phones, `35%` from `lg`) keeps the poster in the frame: below the social links on phones, and to the right of the event cards on wide screens.
2. The bushes start exactly at the sky's bottom edge. Neither edge is ever cropped.
3. The bushes repeat vertically, so the wall can start anywhere below the WIR section.
4. The wall starts right after the WIR section, with its posters visible. The Spenden content starts below the posters (`WALL_POSTER_FRACTION` of the wall image), but at most `WALL_POSTER_MAX_HEIGHT` down, so wide screens don't show a huge bare wall.

All tuning values are named constants at the top of `Index.vue`. Lengths that depend on an image are computed in `cqw` (percent of the page width, because `<main>` is a size container) from the image's own dimensions. Replacing an image therefore only needs these constants checked again:

- `SKY_TOP_CROP`: how far the sky layer reaches above the page, relative to the page width. `<main>` cuts this part off, which hides clouds and enlarges the image.
- `SKY_MIN_HEIGHT`: height of the sky band on phones.
- `WALL_POSTER_FRACTION` / `WALL_POSTER_MAX_HEIGHT`: where the Spenden content starts on the wall.

### Events

Upcoming events are shown as cards in the `events` area. A card hides itself once its last day is over (in the browser, so the pre-rendered HTML stays valid); remove it from the code with the next update.

A **one-time event** (concert, gig, karaoke night, …) has a single date:

```vue
<EventCard
  title="Musical Theatre Karaoke"
  :dates="[new Date(2026, 11, 18, 19, 0)]"
  :end="new Date(2026, 11, 18, 22, 0)"
  :venue="{ name: 'Wein Salon', address: 'Schreinerstr. 59, 10247 Berlin', url: 'https://…' }"
  :poster="musicalNightPoster"
  poster-alt="Plakat: Musical Theatre Karaoke im Wein Salon"
  :link="{ url: 'https://…', label: 'Tickets' }"
>
  <p>Description …</p>
</EventCard>
```

A **production** lists all shows. They are grouped by week via `ShowDates`:

```vue
<EventCard
  title="Come From Away"
  :dates="[new Date(2027, 5, 18, 19, 0), new Date(2027, 5, 19, 13, 30), …]"
  :venue="{ name: 'Centre Français', address: '13349 Berlin' }"
  project-page="/cfa/"
  :link="{ url: 'https://…', label: 'Tickets' }"
/>
```

Months in `new Date(…)` count from 0 (`11` = December). Everything except `title` and `dates` is optional; `kicker` adds a small line above the title (e.g. "Ausschnitte aus"). The poster links to `link.url`, and with a `label` a button is shown as well.

For anything that isn't an event (announcements, thank-you notes, …), use `<HeroCard>` with free content.

## Images

Import images with `?lqip` to get a tiny blurred placeholder (LQIP) that is shown until the real image has loaded (see `plugins/imageBundle.js` for all options). Render them with `<LqipImage>`, as an `<img>` or with `background` as a CSS background.

Large images should also get smaller versions with `widths`, so phones don't download the full-size file:

```js
import backgroundSky from "./assets/backgroundSky.png?lqip&widths=640;1280;1920;2560";
import poster from "./assets/poster.png?lqip&widths=320;480;640";
```

- **As `<img>`**, also pass the rendered width as `sizes` (e.g. `sizes="14rem"`). The browser picks the matching version.
- **As a background**, `LqipImage` measures the element after loading. It takes the screen's pixel density and `bg-cover` into account, loads the smallest version that is large enough, and switches to a larger one if the element grows.

## Development

Install [Node.js](https://nodejs.org) (LTS version recommended). Then clone this repository:

```bash
git clone git@github.com:amonbenson/stageink-website.git
cd stageink-website
```

You can now install all dependencies and start the development server by running the following commands. The development server will run locally at [http://localhost:5173](http://localhost:5173) and reload automatically whenever you make changes to the source code.

```bash
npm install
npm run dev
```

Before uploading, make sure that the website passes all linter checks and builds without any errors:

```bash
npm run lint:fix
npm run build
```

## Deployment

## Hosting

### Preview [amonbenson.github.io/stageink-website/](https://amonbenson.github.io/stageink-website/)

Push to the `main` branch. GitHub Actions will automatically build the site and publish it to GitHub Pages.

```bash
git push origin main
```

The updated preview is live at [amonbenson.github.io/stageink-website/](https://amonbenson.github.io/stageink-website/) within a minute or two.

### Production [stageink.org](https://stageink.org)

Production deployments must be triggered manually to prevent accidental releases. Always make sure that the preview works fine and the build succeeds without any errors before deploying to production.

1. Open the [GitHub Repository](https://github.com/amonbenson/stageink-website)
1. Go to **Actions** → **Deploy to Production** on GitHub
1. Click **Run workflow** → **Run workflow** (with "Branch: main" selected)
1. The site is uploaded to [stageink.org](https://stageink.org) via SFTP

The server credentials (SSH key, username, host, target directory) are stored as
[GitHub Actions secrets and variables](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions).

## Miscellaneous

### Video embedding

Videos have been converted to WebM format using the following FFmpeg command:

```bash
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 33 -b:v 0 -deadline best -c:a libopus -b:a 96k output.webm
```
