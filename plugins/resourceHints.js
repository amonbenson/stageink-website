import { readdirSync } from "node:fs";
import { join } from "node:path";

// Resource hints plugin for Vite + ViteSSG.
//
// Returns { vitePlugin, onPageRendered }:
//
//   vitePlugin     — a standard Vite plugin. Add it to the plugins array.
//                    Captures base and outDir from the resolved Vite config so
//                    that onPageRendered can scan the build output on disk.
//
//   onPageRendered — pass to ssgOptions.onPageRendered in defineConfig.
//                    Called once per rendered route; injects matching <link>
//                    tags just before </head> in the serialized HTML.
//
// Why we scan disk instead of using generateBundle:
//   ViteSSG internally calls vite.build() twice (client + SSR). Each call
//   re-evaluates vite.config.js and creates fresh plugin instances, so state
//   stored in generateBundle's closure is invisible to onPageRendered. Reading
//   from disk sidesteps this — the client build has always finished before
//   onPageRendered fires.
//
// ─── Options ──────────────────────────────────────────────────────────────
//
//   rules   Array<Rule>          Applied on every route.
//   routes  Array<RouteConfig>   Per-route rules, matched against route path.
//
// ─── Rule shape ───────────────────────────────────────────────────────────
//
//   test           RegExp    Matched against each output file path relative to
//                            the outDir, e.g. "assets/backgroundSky.a1b2c3.webp"
//   rel            string    "preload" | "prefetch"
//   as             string    "image" | "font" | "script" | "style" | …
//   type?          string    MIME type, e.g. "font/woff2"
//   crossorigin?   string    "" (anonymous) | "use-credentials"
//   fetchpriority? string    "high" | "low" | "auto"  (preload only)
//   sort?          function  (fileA, fileB) => number  — order matched files
//
// ─── RouteConfig shape ────────────────────────────────────────────────────
//
//   match   RegExp       Matched against the route path, e.g. /^\/$/
//   rules   Array<Rule>
//
// ─── Example ──────────────────────────────────────────────────────────────
//
//   const hints = resourceHintsPlugin({
//     rules: [
//       { test: /^assets\/fonts\/.*\.woff2$/, rel: "preload", as: "font",
//         type: "font/woff2", crossorigin: "" },
//     ],
//     routes: [
//       {
//         match: /^\/$/,
//         rules: [
//           { test: /^assets\/backgroundSky/, rel: "preload", as: "image",
//             fetchpriority: "high" },
//           { test: /^assets\/background/,   rel: "preload", as: "image" },
//         ],
//       },
//     ],
//   });
//
//   export default defineConfig({
//     plugins: [..., hints.vitePlugin],
//     ssgOptions: { onPageRendered: hints.onPageRendered },
//   });

export default function resourceHintsPlugin(options = {}) {
  let base = "/";
  let outDir = "dist";

  const globalRules = options.rules ?? [];
  const routeConfigs = options.routes ?? [];

  // Walk outDir recursively and collect all file paths relative to outDir.
  function scanOutputFiles() {
    const files = [];
    function walk(dir, prefix) {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
        if (entry.isDirectory()) {
          walk(join(dir, entry.name), rel);
        } else {
          files.push(rel);
        }
      }
    }

    walk(outDir, "");
    return files;
  }

  // Build a tag string from a rule + matched file.
  // Prefetch-image rules become invisible <img> elements (injected into <body>);
  // everything else becomes a <link> element (injected into <head>).
  function buildTag(rule, file) {
    const href = base.replace(/\/$/, "") + "/" + file.replace(/^\//, "");

    if (rule.rel === "prefetch" && rule.as === "image") {
      // <link rel="prefetch"> is unreliable across browsers; an invisible lazy
      // <img> achieves the same warm-cache effect more consistently.
      return `<img src="${href}" loading="lazy" fetchpriority="low" width="0" height="0" alt="" aria-hidden="true" style="display:none">`;
    }

    const parts = [`rel="${rule.rel}"`, `href="${href}"`];
    if (rule.as) {
      parts.push(`as="${rule.as}"`);
    }

    if (rule.type) {
      parts.push(`type="${rule.type}"`);
    }

    if (rule.crossorigin !== undefined) {
      parts.push(`crossorigin="${rule.crossorigin}"`);
    }

    if (rule.fetchpriority) {
      parts.push(`fetchpriority="${rule.fetchpriority}"`);
    }

    return `<link ${parts.join(" ")}>`;
  }

  // Apply a list of rules against the output files.
  // Each file is claimed by the first rule that matches it.
  function resolveTags(rules, outputFiles) {
    const claimed = new Set();
    const tags = [];

    for (const rule of rules) {
      let matches = outputFiles.filter(f => !claimed.has(f) && rule.test.test(f));
      if (rule.sort) {
        matches = matches.sort(rule.sort);
      }

      for (const file of matches) {
        claimed.add(file);
        tags.push(buildTag(rule, file));
      }
    }

    return tags;
  }

  const vitePlugin = {
    name: "resource-hints",

    configResolved(config) {
      base = config.base ?? "/";
      outDir = config.build?.outDir ?? "dist";
    },
  };

  function onPageRendered(route, html) {
    const routeConfig = routeConfigs.find(r => r.match.test(route));
    const rules = [...(routeConfig?.rules ?? []), ...globalRules];
    if (!rules.length) {
      return html;
    }

    const outputFiles = scanOutputFiles();
    const tags = resolveTags(rules, outputFiles);
    if (!tags.length) {
      return html;
    }

    const linkTags = tags.filter(t => t.startsWith("<link"));
    const imgTags = tags.filter(t => t.startsWith("<img"));

    if (linkTags.length) {
      html = html.replace("</head>", linkTags.join("\n") + "\n</head>");
    }

    if (imgTags.length) {
      html = html.replace("</body>", imgTags.join("\n") + "\n</body>");
    }

    return html;
  }

  return { vitePlugin, onPageRendered };
}
