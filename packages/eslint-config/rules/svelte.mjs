/**
 * Svelte-specific ESLint rules
 * These rules configure svelte-plugin behavior
 */
export default {
  files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
  rules: {
    // Warn on usage of @html tags to prevent XSS vulnerabilities
    // Encourages safer alternatives for injecting HTML
    'svelte/no-at-html-tags': ['warn'],
    // Warn when using navigation without resolve function
    // Helps ensure proper data loading before navigation
    'svelte/no-navigation-without-resolve': ['warn'],
    // `$bindable()` / rune props often look unused until later mutation
    'no-useless-assignment': 'off',
  },
}
