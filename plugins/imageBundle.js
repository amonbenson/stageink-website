// Transforms a single `?lqip` image import into an object with all derived
// resources: { url, lqip, width, height }. The two sub-imports are handled
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

      const urlQuery = quality
        ? `?format=webp&quality=${quality}&imagetools`
        : `?format=webp&imagetools`;

      const { default: sharp } = await import("sharp");
      const { width, height } = await sharp(path).metadata();

      return [
        `import _url  from ${JSON.stringify(path + urlQuery)};`,
        `import _lqip from ${JSON.stringify(path + `?w=${lqipWidth}&format=webp&inline`)};`,
        `export default { url: _url, lqip: _lqip, width: ${width}, height: ${height} };`,
      ].join("\n");
    },
  };
}
