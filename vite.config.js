import { existsSync, readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, URL } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { imagetools } from "vite-imagetools";

// Scans source files for icon strings (e.g. "simple-icons:instagram"), then
// generates a virtual module that registers only those icons at runtime.
// Any @iconify-json/* package you install becomes eligible automatically.
function autoIconBundlePlugin() {
  const VIRTUAL_ID = "virtual:auto-icons";
  const RESOLVED_ID = "\0virtual:auto-icons";

  // Matches any quoted string of the form "prefix:icon-name"
  const ICON_RE = /["']([a-z][a-z0-9-]*:[a-z][a-z0-9-]+)["']/g;

  const knownPrefixes = new Map(); // prefix -> icons.json path | false
  const collectedIcons = new Map(); // "prefix:name" -> icon data

  function resolvePrefix(prefix) {
    if (knownPrefixes.has(prefix)) {
      return knownPrefixes.get(prefix);
    }

    const jsonPath = resolve(`node_modules/@iconify-json/${prefix}/icons.json`);
    const result = existsSync(jsonPath) ? jsonPath : false;
    knownPrefixes.set(prefix, result);
    return result;
  }

  function collectFromContent(content) {
    let changed = false;
    let match;
    ICON_RE.lastIndex = 0;
    while ((match = ICON_RE.exec(content)) !== null) {
      const iconId = match[1];
      if (collectedIcons.has(iconId)) {
        continue;
      }

      const [prefix, name] = iconId.split(":");
      const jsonPath = resolvePrefix(prefix);
      if (!jsonPath) {
        continue;
      }

      const collection = JSON.parse(readFileSync(jsonPath, "utf-8"));
      const icon = collection.icons[name];
      if (!icon) {
        continue;
      }

      collectedIcons.set(iconId, {
        body: icon.body,
        width: icon.width ?? collection.width ?? 24,
        height: icon.height ?? collection.height ?? 24,
      });
      changed = true;
    }

    return changed;
  }

  function* walkSrc(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = resolve(dir, entry.name);
      if (entry.isDirectory()) {
        yield* walkSrc(full);
      } else if (/\.(vue|js|ts)$/.test(entry.name)) {
        yield full;
      }
    }
  }

  function generateModule() {
    const lines = ["import { addIcon } from '@iconify/vue';"];
    for (const [id, data] of collectedIcons) {
      lines.push(`addIcon(${JSON.stringify(id)}, ${JSON.stringify(data)});`);
    }

    return lines.join("\n");
  }

  let viteServer;

  return {
    name: "auto-icon-bundle",

    buildStart() {
      collectedIcons.clear();
      for (const file of walkSrc("src")) {
        collectFromContent(readFileSync(file, "utf-8"));
      }
    },

    resolveId(id) {
      if (id === VIRTUAL_ID) {
        return RESOLVED_ID;
      }
    },

    load(id) {
      if (id === RESOLVED_ID) {
        return generateModule();
      }
    },

    configureServer(server) {
      viteServer = server;
    },

    async handleHotUpdate({ file, read }) {
      if (!/\.(vue|js|ts)$/.test(file) || file.includes("node_modules")) {
        return;
      }

      const changed = collectFromContent(await read());
      if (changed && viteServer) {
        const mod = viteServer.moduleGraph.getModuleById(RESOLVED_ID);
        if (mod) {
          viteServer.moduleGraph.invalidateModule(mod);
          return [mod];
        }
      }
    },
  };
}

// Inject <link rel="preload"> for background images so the browser fetches
// them during HTML parsing rather than waiting for JS to run.
function preloadBackgroundsPlugin() {
  return {
    name: "preload-backgrounds",
    transformIndexHtml: {
      order: "post",
      handler(_html, ctx) {
        if (!ctx?.bundle) {
          return [];
        }

        return Object.keys(ctx.bundle)
          .filter(k => /^assets\/background.*\.webp$/.test(k))
          // Sky is above the fold — give it higher fetch priority
          .sort((a, b) => (a.includes("Sky") ? -1 : b.includes("Sky") ? 1 : 0))
          .map((k, i) => ({
            tag: "link",
            attrs: {
              rel: "preload",
              as: "image",
              href: `/${k}`,
              fetchpriority: i === 0 ? "high" : "low",
            },
            injectTo: "head",
          }));
      },
    },
  };
}

export default defineConfig({
  base: process.env.VITE_BASE ?? "/",
  plugins: [
    vue(),
    tailwindcss(),
    imagetools(),
    autoIconBundlePlugin(),
    preloadBackgroundsPlugin(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
