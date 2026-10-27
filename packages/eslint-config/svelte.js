/**
 * Svelte ESLint Config
 *
 * Use this config for Svelte projects.
 * Extends the base config and adds Svelte-specific rules.
 *
 * @example
 * ```js
 * import svelteConfig from '@mnb/eslint-config/svelte';
 *
 * export default [
 *   ...svelteConfig,
 *   // Your project-specific overrides
 * ];
 * ```
 */

import svelte from 'eslint-plugin-svelte'
import ts from 'typescript-eslint'

import baseConfig from './base.js'
import eslintRulesSvelte from './rules/svelte.mjs'

/**
 * @type {import("eslint").Linter.Config[]}
 * */
const config = [
  // Extend base configuration (includes JS, TS, Unicorn, Import rules)
  ...baseConfig,
  // Add Svelte recommended rules
  ...svelte.configs['flat/recommended'],
  // Apply custom Svelte rule overrides
  eslintRulesSvelte,
  {
    // Configure parser for Svelte files
    files: ['**/*.svelte', '**/*.svelte.ts'],
    languageOptions: {
      parserOptions: {
        parser: ts.parser,
      },
    },
  },
  {
    // Add Svelte-specific ignore patterns (base ignores are already included)
    ignores: [
      '.svelte-kit/',
      'test-results/',
      'playwright-report/',
      'vite.config.ts.*',
      '**/*/directus-types.d.ts',
      '**/*/custom-types.d.ts',
      '**/*/mocks/',
    ],
  },
]

export default config
