# @mnb/eslint-config

Shared ESLint configuration for this monorepo. This package provides modular ESLint configs that can be composed based on your project's needs.

## Available Configs

### Base Config (`@mnb/eslint-config/base`)

Core configuration for TypeScript projects. Includes:

- JavaScript recommended rules (@eslint/js)
- TypeScript recommended rules (typescript-eslint)
- Unicorn plugin for code quality
- Import plugin for module organization
- Custom rules for complexity, formatting, and best practices

**Use for:** Any TypeScript/JavaScript project in the monorepo

```js
import baseConfig from '@mnb/eslint-config/base'

export default [
  ...baseConfig,
  // Your overrides
]
```

### Svelte Config (`@mnb/eslint-config/svelte`)

Complete configuration for Svelte projects. Includes everything from base config plus:

- Svelte recommended rules (eslint-plugin-svelte)
- Svelte-specific parser configuration
- Additional ignore patterns for Svelte projects

**Use for:** Svelte/SvelteKit applications

```js
import svelteConfig from '@mnb/eslint-config/svelte'

export default [
  ...svelteConfig,
  // Your overrides
]
```

### Storybook Config (`@mnb/eslint-config/storybook`)

Storybook-specific linting rules. Can be combined with base or svelte configs.

**Use for:** Projects using Storybook

```js
import baseConfig from '@mnb/eslint-config/base'
import storybookConfig from '@mnb/eslint-config/storybook'

export default [...baseConfig, ...storybookConfig]
```

### Prettier Config (`@mnb/eslint-config/prettier`)

Disables ESLint rules that conflict with Prettier. **Always use as the last config** in your array.

**Use for:** All projects using Prettier

```js
import baseConfig from '@mnb/eslint-config/base'
import prettierConfig from '@mnb/eslint-config/prettier'

export default [
  ...baseConfig,
  prettierConfig, // Must be last!
]
```

## Rule Modules

The configs are built from modular rule files in `./rules/`:

- **base.mjs** - Core JavaScript/TypeScript rules (complexity, formatting, destructuring)
- **import.mjs** - Import ordering and organization
- **typescript.mjs** - TypeScript-specific overrides
- **unicorn.mjs** - Code quality rules from eslint-plugin-unicorn
- **svelte.mjs** - Svelte-specific rule overrides

## Usage Examples

### TypeScript Project

```js
// eslint.config.mjs
import baseConfig from '@mnb/eslint-config/base'
import prettierConfig from '@mnb/eslint-config/prettier'

export default [...baseConfig, prettierConfig]
```

### Svelte + Storybook Project

```js
// eslint.config.mjs
import svelteConfig from '@mnb/eslint-config/svelte'
import storybookConfig from '@mnb/eslint-config/storybook'
import prettierConfig from '@mnb/eslint-config/prettier'

export default [
  ...svelteConfig,
  ...storybookConfig,
  prettierConfig, // Always last
]
```

### Next.js Project

```js
// eslint.config.mjs
import baseConfig from '@mnb/eslint-config/base'
import prettierConfig from '@mnb/eslint-config/prettier'

export default [
  ...baseConfig,
  // Add Next.js specific rules here
  prettierConfig,
]
```

## Key Rules

### Code Complexity

- Max cyclomatic complexity: 10
- Max lines per function: Enforced with warnings
- Max statements: Enforced with warnings

### Import Organization

Imports are automatically organized in this order:

1. Built-in Node.js modules
2. External dependencies
3. Internal/absolute imports
4. Relative imports (sibling/parent)
5. Index imports

Alphabetically sorted within each group with blank lines between groups.

### TypeScript

- `any` type warnings (use sparingly)
- Strict type checking recommended

### Unicorn

- Filename case: kebab-case, PascalCase, or camelCase
- Array reduce allowed
- Null allowed

## Installation

This package is part of the monorepo and uses workspace protocol:

```json
{
  "devDependencies": {
    "@mnb/eslint-config": "workspace:*"
  }
}
```

## Extending Configs

You can override any rules in your project:

```js
import baseConfig from '@mnb/eslint-config/base'

export default [
  ...baseConfig,
  {
    rules: {
      'no-console': 'off', // Allow console in this project
      complexity: ['error', 15], // Increase complexity limit
    },
  },
]
```
