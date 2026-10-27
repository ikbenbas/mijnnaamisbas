/**
 * Turborepo-Specific Rules
 *
 * Rules for Turborepo monorepo management.
 * Ensures proper environment variable handling in monorepo workspaces.
 */
export default {
  rules: {
    // Warn when environment variables are used without being declared in turbo.json
    // This helps prevent runtime errors from missing environment variables
    'turbo/no-undeclared-env-vars': 'warn',
  },
}
