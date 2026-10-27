/**
 * Turbo ESLint Config
 *
 * Configuration for Turborepo-specific linting rules.
 * Use this in addition to base config for packages/apps that use Turborepo features.
 *
 * @example
 * ```js
 * import baseConfig from '@mnb/eslint-config/base';
 * import turboConfig from '@mnb/eslint-config/turbo';
 *
 * export default [
 *   ...baseConfig,
 *   ...turboConfig,
 * ];
 * ```
 */

import turboPlugin from 'eslint-plugin-turbo'

/**
 * Turborepo-specific ESLint configuration.
 *
 * @type {import("eslint").Linter.Config[]}
 */
const config = [
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      'turbo/no-undeclared-env-vars': 'warn',
    },
  },
]

export default config
