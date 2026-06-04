import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import unusedImports from "eslint-plugin-unused-imports";

export default [
  // 1. Base Config
  js.configs.recommended,

  // 2. Custom Config para sa unused-imports at React
  {
    files: ["**/*.{js,jsx,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: pluginReact,
      "unused-imports": unusedImports,
    },
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      "no-unused-vars": "off",
      "unused-imports/no-unused-imports": "warn",
      "react/react-in-jsx-scope": "off", // Optional: kung gamit mo ay React 17+
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];