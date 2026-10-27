/**
 * TypeScript-Specific Rules
 *
 * Overrides and customizations for TypeScript-specific linting.
 * Focuses on type safety while allowing pragmatic exceptions.
 */
export default {
  rules: {
    // Warn when using 'any' type (prefer specific types)
    // Allow in rest args where type inference is difficult
    '@typescript-eslint/no-explicit-any': [
      'warn',
      {
        ignoreRestArgs: true,
      },
    ],
  },
}
