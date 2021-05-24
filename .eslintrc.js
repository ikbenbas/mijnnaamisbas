module.exports = {
    extends: [
        '@bitfactory/eslint-config',
    ],
    overrides: [
        {
            files: ['**/*.ts', '**/*.tsx'],
            parser: '@typescript-eslint/parser',
            extends: [
                // Uses the recommended rules from the @typescript-eslint/eslint-plugin
                'plugin:@typescript-eslint/recommended',
            ],
            parserOptions: {
                ecmaFeatures: { jsx: true },
                ecmaVersion: 2018,
                sourceType: 'module',
            },
        },
        {
            files: ['**/*.vue'],
            parser: 'vue-eslint-parser',
            extends: [
                // Official eslint plugin for Vue.js
                'plugin:vue/recommended',
            ],
            parserOptions: {
                ecmaFeatures: { jsx: true },
                ecmaVersion: 2018,
                parser: '@typescript-eslint/parser',
                sourceType: 'module',
            },
            rules: {
                'vue/singleline-html-element-content-newline': 'off',
                'vue/html-indent': ['error', 4],
                'vue/padding-line-between-blocks': ['error', 'always'],
            },
        },
    ],
    ignorePatterns: [
        '**/coverage/*',
        '**/static/*',
        '**/public/*',
    ],
    env: {
        jest: true,
    },
    rules: {
        'vue/no-deprecated-destroyed-lifecycle': 0,
    },
};
