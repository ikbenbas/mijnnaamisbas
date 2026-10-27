/**
 * Base JavaScript/TypeScript Rules
 *
 * Core rules focusing on code quality, complexity management, and consistency.
 * These rules help maintain readable and maintainable code across the codebase.
 */
export default {
  rules: {
    // Enforce consistent array element formatting
    // Arrays should have each element on a new line, destructuring with 2+ items
    'array-element-newline': [
      'error',
      {
        ArrayExpression: 'always',
        ArrayPattern: { minItems: 2 },
      },
    ],

    // Limit cyclomatic complexity to keep functions simple and testable
    complexity: ['error', 10],

    // Warn about large files (helps maintain modularity)
    'max-lines': [
      'warn',
      {
        skipBlankLines: true,
        skipComments: true,
      },
    ],

    // Warn about long functions (helps maintain Single Responsibility Principle)
    'max-lines-per-function': [
      'warn',
      {
        skipBlankLines: true,
        skipComments: true,
      },
    ],

    // Warn about functions with too many statements
    'max-statements': 'warn',

    // Prevent duplicate imports from the same module
    'no-duplicate-imports': [
      'error',
      {
        includeExports: true,
      },
    ],

    // Disallow ++ and -- except in for loop afterthoughts
    'no-plusplus': [
      'error',
      {
        allowForLoopAfterthoughts: true,
      },
    ],

    // Require separate variable declarations (not `let a = 1, b = 2`)
    'one-var': ['error', 'never'],

    // Prefer destructuring for objects (not arrays, as it can hurt readability)
    'prefer-destructuring': [
      'error',
      {
        array: false,
        object: true,
      },
    ],

    // Sort import members alphabetically
    // Note: Import declaration order is handled by eslint-plugin-import-x
    'sort-imports': [
      'error',
      {
        /*
         * We don't want to sort import lines, use eslint-plugin-import-x instead
         * See the import-x/order rule in import.mjs for import declaration sorting
         */
        allowSeparatedGroups: true,
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],

    // Sort object keys alphabetically (commented out - can be too strict)
    // 'sort-keys': [
    //   'warn',
    //   'asc',
    //   { caseSensitive: true, minKeys: 2, natural: true },
    // ],
  },
}
