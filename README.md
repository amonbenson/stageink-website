[![CI](https://github.com/amonbenson/stageink-website/actions/workflows/ci.yaml/badge.svg)](https://github.com/amonbenson/stageink-website/actions/workflows/ci.yaml)
[![Deploy to Production](https://github.com/amonbenson/stageink-website/actions/workflows/deploy-production.yml/badge.svg)](https://github.com/amonbenson/stageink-website/actions/workflows/deploy-production.yml)

# Stageink Website

Source code of [stageink.org](https://stageink.org), the website of Stageink (Stagies Berlin e.V.), a musical theatre association in Berlin.

The site is built with [Vue 3](https://vuejs.org), [Vite](https://vite.dev) and [Tailwind CSS](https://tailwindcss.com). [vite-ssg](https://github.com/antfu/vite-ssg) renders every page to static HTML at build time, so the result can be hosted on any plain web server.

## Getting Started

Install [Node.js](https://nodejs.org) (LTS version), then clone the repository and install the dependencies:

```bash
git clone git@github.com:amonbenson/stageink-website.git
cd stageink-website
npm install
```

Start the development server. It runs at [http://localhost:5173](http://localhost:5173) and reloads whenever you change the source code.

```bash
npm run dev
```

Before pushing, fix the formatting and make sure the site builds without errors:

```bash
npm run lint:fix
npm run build
```

## Project Structure

| Directory           | Contents                                                     |
| ------------------- | ------------------------------------------------------------ |
| `src/views/`        | One folder per page, with its own components and images     |
| `src/components/`   | Components shared by several pages                           |
| `src/content/`      | Longer text blocks, such as the legal notice                 |
| `src/assets/`       | Images shared by several pages, such as the logo             |
| `public/`           | Files served unchanged, such as fonts and favicons           |
| `plugins/`          | Custom Vite plugins for images and icons                     |
| `design/`           | Photoshop and Illustrator source files of the background art |
| `.github/workflows/`| Build, preview and deployment pipelines                      |

Coding conventions and implementation details are documented in the `AGENTS.md` files in the root directory and in some subdirectories.

## Deployment

### Preview

Every push to `main` builds the site and publishes it to [amonbenson.github.io/stageink-website](https://amonbenson.github.io/stageink-website/) within a minute or two.

### Production

Production deployments are started by hand, so nothing goes live by accident. Check that the preview works before deploying.

1. Open the [repository on GitHub](https://github.com/amonbenson/stageink-website).
2. Go to **Actions**, then **Deploy to Production**.
3. Click **Run workflow** with "Branch: main" selected.

The workflow builds the site and uploads it to [stageink.org](https://stageink.org) via SFTP. The server credentials (SSH key, username, host, target directory) are stored as [GitHub Actions secrets and variables](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions).
