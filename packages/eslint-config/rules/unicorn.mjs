/**
 * Unicorn Plugin Rules
 *
 * Customizations for eslint-plugin-unicorn.
 * The base config applies recommended rules; these are selective overrides.
 *
 * Many unicorn v76 recommended rules are disabled here — they conflict with
 * Svelte runes, Storybook CSF (`args`), and existing library conventions.
 * Re-enable selectively when ready to adopt them package-wide.
 */
export default {
  rules: {
    // Disable abbreviation prevention (allow common abbreviations like 'props', 'ref', etc.)
    'unicorn/prevent-abbreviations': 0,

    // Allow multiple filename case styles (kebab-case, PascalCase, camelCase)
    // This accommodates components (PascalCase) and utility files (kebab-case)
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          kebabCase: true,
          pascalCase: true,
          camelCase: true,
        },
      },
    ],

    // Allow Array.reduce() - it's a powerful and readable pattern when used correctly
    'unicorn/no-array-reduce': 0,

    // Allow null - we need it for compatibility and explicit "no value" semantics
    'unicorn/no-null': 0,

    // Alias for no-array-reduce
    'unicorn/no-reduce': 0,

    // --- unicorn v76+ recommended rules held back ---
    'unicorn/name-replacements': 0, // `args`, `Props` are idiomatic in Storybook/Svelte
    'unicorn/no-top-level-assignment-in-function': 0, // Svelte runes assign from handlers
    'unicorn/single-line-block-comment-style': 0,
    'unicorn/no-incorrect-template-string-interpolation': 0, // Storybook CSF templates
    'unicorn/no-unnecessary-global-this': 0,
    'unicorn/consistent-boolean-name': 0,
    'unicorn/prefer-ternary': 0,
    'unicorn/prefer-early-return': 0,
    'unicorn/prefer-scoped-selector': 0,
    'unicorn/prefer-simple-condition-first': 0,
    'unicorn/prefer-object-define-properties': 0,
    'unicorn/prefer-dom-node-html-methods': 0,
    'unicorn/no-unsafe-string-replacement': 0,
    'unicorn/consistent-function-scoping': 0,
    'unicorn/prefer-combined-guards': 0,
    'unicorn/require-css-escape': 0,
    'unicorn/prefer-number-coercion': 0,
    'unicorn/prefer-else-if': 0,
    'unicorn/prefer-add-event-listener-options': 0,
    'unicorn/no-declarations-before-early-exit': 0,
    'unicorn/prefer-url-href': 0,
    'unicorn/prefer-observer-apis': 0,
    'unicorn/prefer-modern-dom-apis': 0,
    'unicorn/prefer-minimal-ternary': 0,
    'unicorn/prefer-logical-operator-over-ternary': 0,
    'unicorn/prefer-includes-over-repeated-comparisons': 0,
    'unicorn/prefer-continue': 0,
    'unicorn/no-useless-else': 0,
    'unicorn/no-useless-coercion': 0,
    'unicorn/no-global-object-property-assignment': 0,
    'unicorn/consistent-compound-words': 0,
    'unicorn/consistent-class-member-order': 0,
    'unicorn/no-computed-property-existence-check': 0,
    'unicorn/operator-assignment': 0,
    'unicorn/no-top-level-side-effects': 0,
  },
}
