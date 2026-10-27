/**
 * Base ESLint Config
 *
 * Core configuration for TypeScript projects in the monorepo.
 * Includes recommended rules for JavaScript, TypeScript, imports, and code quality.
 *
 * @example
 * ```js
 * import baseConfig from '@mnb/eslint-config/base';
 *
 * export default [
 *   ...baseConfig,
 *   // Your project-specific overrides
 * ];
 * ```
 */

import js from '@eslint/js'
import { importX } from 'eslint-plugin-import-x'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import globals from 'globals'
import tseslint from 'typescript-eslint'

import eslintRulesBase from './rules/base.mjs'
import eslintRulesImport from './rules/import.mjs'
import eslintRulesTypescript from './rules/typescript.mjs'
import eslintRulesUnicorn from './rules/unicorn.mjs'

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
const config = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginUnicorn.configs['recommended'],
  // Custom rule overrides
  eslintRulesBase,
  eslintRulesImport,
  eslintRulesUnicorn,
  eslintRulesTypescript,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    plugins: {
      'import-x': importX,
    },
  },
  {
    ignores: [
      '.git/',
      '.vscode/',
      'build/',
      'dist/',
      'node_modules/',
      'coverage/',
    ],
  },
]

export default config
