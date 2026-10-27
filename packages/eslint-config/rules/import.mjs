/**
 * Import/Module Organization Rules
 *
 * Enforces consistent import ordering and organization.
 * Uses eslint-plugin-import-x (ESLint 10–compatible fork of eslint-plugin-import).
 * Imports are automatically sorted and grouped for better readability.
 */
export default {
  rules: {
    // Enforce a consistent order for import statements
    'import-x/order': [
      'error',
      {
        groups: [
          // Built-in imports (come from NodeJS native) go first
          'builtin',
          // External imports (from node_modules)
          'external',
          // Absolute imports (internal packages/paths)
          'internal',
          // Relative imports, the sibling and parent types can be mingled together
          ['sibling', 'parent'],
          // Index imports (e.g., './index')
          'index',
          // Unknown
          'unknown',
        ],
        // Add blank lines between import groups for better readability
        'newlines-between': 'always',
        // Sort imports alphabetically within each group
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
}
