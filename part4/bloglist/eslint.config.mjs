import globals from 'globals';
import js from '@eslint/js';
import stylisticJs from '@stylistic/eslint-plugin-js';

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { ...globals.node },
      ecmaVersion: 'latest',
    },
    plugins: {
      '@stylistic/js': stylisticJs,
    },
    rules: {
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'always'],
      'no-unused-vars': ['error', {
        'varsIgnorePattern': '^_',
        'argsIgnorePattern': '^_'
      }]
    }
  },
  {
    ignores: ['dist/**'],
  }
]


//import js from "@eslint/js";
//import globals from "globals";
//import pluginReact from "eslint-plugin-react";
//import { defineConfig } from "eslint/config";
//
//
//export default defineConfig([
//  { files: ["**/*.{js,mjs,cjs,jsx}"], plugins: { js }, extends: ["js/recommended"] },
//  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
//  { files: ["**/*.{js,mjs,cjs,jsx}"], languageOptions: { globals: globals.node } },
//  pluginReact.configs.flat.recommended,
//]);
