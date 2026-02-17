import pluginVue from "eslint-plugin-vue";

export default [
  ...pluginVue.configs["flat/recommended"],
  {
    rules: {
      "indent": ["error", 2],
      "quotes": ["error", "double"],
      "semi": ["error", "always"],
      "comma-dangle": ["error", "always-multiline"],
      "no-console": "warn",
      "vue/block-order": ["error", {
        order: ["script", "template", "style"],
      }],
      "no-unused-vars": "error",
    },
  },
];
