[![CI](https://github.com/amonbenson/stageink-website/actions/workflows/ci.yaml/badge.svg)](https://github.com/amonbenson/stageink-website/actions/workflows/ci.yaml)
[![Deploy to Production](https://github.com/amonbenson/stageink-website/actions/workflows/deploy-production.yml/badge.svg)](https://github.com/amonbenson/stageink-website/actions/workflows/deploy-production.yml)

# StageInk — Musical Verein Berlin

**Preview (current main branch):** [amonbenson.github.io/stageink-website/](https://amonbenson.github.io/stageink-website/)<br>
**Production Website:** [stageink.org](https://stageink.org)

## Development

Install [Node.js](https://nodejs.org) (LTS version recommended). Then clone this repository:

```bash
git clone git@github.com:amonbenson/stageink-website.git
cd stageink-website
```

You can now install all dependencies and start the development server by running the following commands. The development server will run locally at `http://localhost:5173` and automatically reload whenever you make changes to the source code.

```bash
npm install
npm run dev
```

## Deploying to Preview

Push to the `main` branch. GitHub Actions will automatically build the site and publish it to GitHub Pages.

```bash
git push origin main
```

The updated preview is live at [amonbenson.github.io/stageink-website/](https://amonbenson.github.io/stageink-website/) within a minute or two.

## Deploying to Production

Production deployment is triggered manually to prevent accidental releases.

1. Open the [GitHub Repository](https://github.com/amonbenson/stageink-website)
1. Go to **Actions** → **Deploy to Production** on GitHub
2. Click **Run workflow** → **Run workflow** (with "Branch: main" selected)
3. The site is uploaded to [stageink.org](https://stageink.org) via SFTP

The server credentials (SSH key, username, host, target directory) are stored as
[GitHub Actions secrets and variables](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions).

## Tech Stack

[Vue 3](https://vuejs.org) · [Vite](https://vite.dev) · [Tailwind CSS v4](https://tailwindcss.com) · [vite-ssg](https://github.com/antfu/vite-ssg) (static generation) · [Iconify](https://iconify.design)
