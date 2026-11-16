// Transforms a single `?lqip` image import into an object with all derived
// resources: { url, lqip, width, height, srcset }. The sub-imports are handled
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
//   widths=<a;b>  Also generate smaller versions with these widths in px. They
//                 are exported as `srcset: [{ url, width }]` (ascending, ending
//                 with the full-size image), so LqipImage only loads as many
//                 pixels as the screen needs. Without it, `srcset` is null.
//
// Examples:
//   import logo from "./logo.png?lqip&lqipsize=30&quality=80"
//   import photo from "./photo.png?lqip&widths=640;1280;1920"
const BUNDLE_PREFIX = "\0lqip:";

export default function imageBundlePlugin() {
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

    async load(id) {
      if (!id.startsWith(BUNDLE_PREFIX)) {
        return;
      }

      const realId = id.slice(BUNDLE_PREFIX.length);
      const [path, query] = realId.split("?");
      const params = new URLSearchParams(query);

      const lqipWidth = params.get("lqipsize") ?? "50";
      const quality = params.get("quality");

      const qualityParam = quality ? `&quality=${quality}` : "";
      const imageQuery = (resize = "") => `?${resize}format=webp${qualityParam}&imagetools`;

      const { default: sharp } = await import("sharp");
      const { width, height } = await sharp(path).metadata();

      // Only widths smaller than the original; the original itself is always last.
      const widths = (params.get("widths") ?? "")
        .split(";")
        .map(Number)
        .filter(w => w > 0 && w < width)
        .sort((a, b) => a - b);

      const srcset = widths.length
        ? `[${widths.map((w, i) => `{ url: _w${i}, width: ${w} }`).join(", ")}, { url: _url, width: ${width} }]`
        : "null";

      return [
        `import _url  from ${JSON.stringify(path + imageQuery())};`,
        `import _lqip from ${JSON.stringify(path + `?w=${lqipWidth}&format=webp&inline`)};`,
        ...widths.map((w, i) => `import _w${i} from ${JSON.stringify(path + imageQuery(`w=${w}&`))};`),
        `export default { url: _url, lqip: _lqip, width: ${width}, height: ${height}, srcset: ${srcset} };`,
      ].join("\n");
    },
  };
}
