/**
 * Storybook ESLint Config
 *
 * Use this config to add Storybook linting rules.
 *
 * @example
 * ```js
 * import baseConfig from '@mnb/eslint-config/base';
 * import storybookConfig from '@mnb/eslint-config/storybook';
 *
 * export default [
 *   ...baseConfig,
 *   ...storybookConfig,
 * ];
 * ```
 */

import storybook from 'eslint-plugin-storybook'

export default [...storybook.configs['flat/recommended']]
