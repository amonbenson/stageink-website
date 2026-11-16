# Plugins: Agent Guide

Extends the root `AGENTS.md`.

Custom Vite plugins, registered in `vite.config.js`. Order matters: `imageBundlePlugin()` must come before `imagetools()`.

- `imageBundle.js` turns a `?lqip` import into an image bundle. Its `resolveId` claims the import under a `\0lqip:` virtual ID before vite-imagetools rewrites it; `load` reads dimensions with `sharp` and re-imports the file through imagetools for the full image, the placeholder and each `widths` version. Query options are documented at the top of the file; keep that comment in sync.
- `autoIconBundle.js` provides `virtual:auto-icons` (imported in `src/main.js`), which registers only the icons used, so `<Icon icon="...">` works offline and during pre-rendering. It scans `src/` for quoted `"prefix:name"` strings whose prefix has an installed `@iconify-json/<prefix>` package. Icon names must therefore appear in full as string literals. New icon sets: install `@iconify-json/<prefix>` as a dev dependency.
