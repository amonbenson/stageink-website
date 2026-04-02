import { existsSync, readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, URL } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { imagetools } from "vite-imagetools";

import resourceHintsPlugin from "./design/resourceHints.js";

const resourceHints = resourceHintsPlugin({
  rules: [
    // Fonts are global — preloaded on every page.
    {
      test: /^assets\/fonts\/.*\.woff2$/,
      rel: "preload",
      as: "font",
      type: "font/woff2",
      crossorigin: "",
    },
  ],
  routes: [
    {
      // Home page: preload its own background images.
      match: /^\/$/,
      rules: [
        {
          test: /^assets\/backgroundSky.*\.webp$/,
          rel: "preload",
          as: "image",
          fetchpriority: "high",
        },
        {
          test: /^assets\/background(Wall|Bushes).*\.webp$/,
          rel: "preload",
          as: "image",
        },
        // Prefetch CFA assets so they are ready when the user navigates.
        {
          test: /^assets\/backgroundMap.*\.webp$/,
          rel: "prefetch",
          as: "image",
        },
        {
          test: /^assets\/cfaLogo.*\.webp$/,
          rel: "prefetch",
          as: "image",
        },
        {
          test: /^assets\/plane.*\.webp$/,
          rel: "prefetch",
          as: "image",
        },
      ],
    },
    {
      // CFA page: preload the map background above the fold at high priority.
      match: /^\/cfa/,
      rules: [
        {
          test: /^assets\/backgroundMap.*\.webp$/,
          rel: "preload",
          as: "image",
          fetchpriority: "high",
        },
      ],
    },
  ],
});

// Transforms a single `?lqip` image import into an object with all derived
// resources: { url, lqip, width, height }. The three sub-imports are handled
// by vite-imagetools, so this plugin must be registered before imagetools().
//
// A resolveId hook is required to claim the import before vite-imagetools can
// rewrite it to its own /@imagetools/... virtual module ID. The \0 prefix marks
// the resolved ID as a virtual module, which prevents all other plugins from
// interfering with it.
//
// Usage:  import logo from "./logo.png?lqip"
// Options (all optional):
//   lqipsize=<n>  Width in px of the LQIP placeholder (default: 50)
//   quality=<n>   WebP quality for the full-size image (default: imagetools default)
//
// Example:
//   import logo from "./logo.png?lqip&lqipsize=30&quality=80"
const BUNDLE_PREFIX = "\0lqip:";

function imageBundlePlugin() {
  return {
    name: "image-bundle",
    enforce: "pre",

    async resolveId(id, importer) {
      const [path, query] = id.split("?");
      if (!query) {
        return;
      }

      const params = new URLSearchParams(query);
      if (!params.has("lqip")) {
        return;
      }

      // Resolve the real file path, then re-attach our query under the \0 prefix
      // so no other plugin (including vite-imagetools) touches this module ID.
      const resolved = await this.resolve(path, importer, { skipSelf: true });
      if (!resolved) {
        return;
      }

      return BUNDLE_PREFIX + resolved.id + "?" + query;
    },

    load(id) {
      if (!id.startsWith(BUNDLE_PREFIX)) {
        return;
      }

      const realId = id.slice(BUNDLE_PREFIX.length);
      const [path, query] = realId.split("?");
      const params = new URLSearchParams(query);

      const lqipWidth = params.get("lqipsize") ?? "50";
      const quality = params.get("quality");

      const urlQuery = quality
        ? `?format=webp&quality=${quality}&imagetools`
        : `?format=webp&imagetools`;

      return [
        `import _url  from ${JSON.stringify(path + urlQuery)};`,
        `import _lqip from ${JSON.stringify(path + `?w=${lqipWidth}&format=webp&inline`)};`,
        `import _meta from ${JSON.stringify(path + "?as=metadata&imagetools")};`,
        `export default { url: _url, lqip: _lqip, width: _meta.width, height: _meta.height };`,
      ].join("\n");
    },
  };
}

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

export default defineConfig({
  base: process.env.VITE_BASE ?? "/",
  plugins: [
    vue(),
    tailwindcss(),
    imageBundlePlugin(),
    imagetools(),
    autoIconBundlePlugin(),
    resourceHints.vitePlugin,
  ],
  ssgOptions: {
    onPageRendered: resourceHints.onPageRendered,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
