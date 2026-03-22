import stylistic from "@stylistic/eslint-plugin";
import { globalIgnores } from "eslint/config";
import betterTailwindcss from "eslint-plugin-better-tailwindcss";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import pluginVue from "eslint-plugin-vue";

export default [
  {
    name: "app/files-to-lint",
    files: ["**/*.{js,mjs,vue}"],
  },
  globalIgnores(["**/dist/**", "**/dist-ssr/**", "**/coverage/**", "**/public/**"]),

  ...pluginVue.configs["flat/recommended"],

  // disable legacy core rules that conflict with stylistic
  stylistic.configs["disable-legacy"],

  // basic stylistic formatting
  stylistic.configs.customize({
    indent: 2,
    quotes: "double",
    semi: true,
    jsx: false,
    commaDangle: "always-multiline",
  }),

  {
    name: "app/stylistic-overrides",
    rules: {
      "@stylistic/brace-style": ["error", "1tbs"],
      "@stylistic/padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "multiline-block-like", next: "*" },
      ],
      "@stylistic/no-trailing-spaces": "error",
      "@stylistic/eol-last": ["error", "always"],
    },
  },

  {
    name: "app/import-sorting",
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },

  {
    name: "app/tailwind",
    plugins: {
      "better-tailwindcss": betterTailwindcss,
    },
    settings: {
      "better-tailwindcss": {
        entryPoint: "src/style.css",
      },
    },
    rules: {
      "better-tailwindcss/enforce-consistent-class-order": "warn",
      "better-tailwindcss/no-unnecessary-whitespace": "warn",
      "better-tailwindcss/no-duplicate-classes": "warn",
    },
  },

  {
    name: "app/overrides",
    rules: {
      "no-console": "warn",
      "no-unused-vars": ["error", {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      }],
      "curly": ["error", "all"],
      "vue/block-order": ["error", { order: ["script", "template", "style"] }],
    },
  },
];
