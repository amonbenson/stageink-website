[![CI](https://github.com/amonbenson/stageink-website/actions/workflows/ci.yaml/badge.svg)](https://github.com/amonbenson/stageink-website/actions/workflows/ci.yaml)
[![Deploy to Production](https://github.com/amonbenson/stageink-website/actions/workflows/deploy-production.yml/badge.svg)](https://github.com/amonbenson/stageink-website/actions/workflows/deploy-production.yml)

# StageInk — Musical Verein Berlin

Source code for the [stageink.org](https://stageink.org) website. StageInk (Stagies Berlin e.V.) is a musical theatre association based in Berlin.

## Tech Stack

[Vue 3](https://vuejs.org) · [Vite](https://vite.dev) · [Tailwind CSS v4](https://tailwindcss.com) · [vite-ssg](https://github.com/antfu/vite-ssg) (static generation) · [Iconify](https://iconify.design)

## Directory Layout

### src/

All application source code lives here. The most important subdirectories are:

- **`src/views/`** — One subdirectory per page/route (e.g. `home/`, `cfa/`). Each subdirectory contains the top-level view component (`Index.vue`), any components that are private to that page, and an `assets/` folder for images and other media used exclusively by that page. The routes are defined in `src/router/router.js`.
- **`src/components/`** — Reusable UI components shared across multiple views (e.g. `BackgroundSection.vue`, `SiteLogo.vue`). A component belongs here rather than in a view subdirectory if more than one page uses it.
- **`src/content/`** — Larger content blocks that contain mostly text or structured markup rather than interactive logic (e.g. `Haftungsausschluss.vue`). These are separated from `components/` to keep purely presentational content distinct from UI components.
- **`src/composables/`** — Vue composables: reusable stateful or reactive logic that is shared across components (e.g. `useScrollTimeline.js`).

#### Asset management

Assets (images, fonts, etc.) are organised by where they are used:

| Location | Use when... |
|---|---|
| `src/views/<view>/assets/` | The asset is only used by one specific page |
| `src/components/` (alongside the component) | The asset is tightly coupled to a single shared component |
| `public/` | The asset must not be bundled (see below) |

Assets inside `src/` are **bundled by Vite** at build time: they are processed, optimised, fingerprinted (e.g. `logo.a3f2c1.png`), and inlined or copied into `dist/`. Referencing them from Vue files via `import` or relative paths is the normal workflow.

Assets inside `public/` are **copied to `dist/` as-is**, without any processing or fingerprinting. They are always available at a fixed URL (e.g. `/fonts/poppins-400-latin.woff2`). Use `public/` for assets that need a stable, predictable URL — such as fonts referenced from CSS `@font-face` rules, favicons, or files linked from outside the app.

### public/

Static assets that are served at a fixed path without bundling:

- **`public/fonts/`** — Poppins web font files (`.woff2`), referenced by URL from `src/fonts.css`
- **`public/images/`** — Site-wide images that need a stable URL
- **`public/favicon.*`** — Favicon in multiple formats

### .github/workflows/

GitHub Actions CI/CD pipelines:

- **`ci.yaml`** — Runs linting and builds the preview on every push and pull request to main.
- **`deploy-production.yml`** — Manually triggered workflow that uploads the built site to [stageink.org](https://stageink.org) via SFTP.

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
2. Click **Run workflow** → **Run workflow** (with "Branch: main" selected)
3. The site is uploaded to [stageink.org](https://stageink.org) via SFTP

The server credentials (SSH key, username, host, target directory) are stored as
[GitHub Actions secrets and variables](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions).
