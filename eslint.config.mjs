import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      "eslint-plugin-react": pluginReact,
    },
    rules: {
      // Define rules here if needed
    },
  },
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "script" },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];
