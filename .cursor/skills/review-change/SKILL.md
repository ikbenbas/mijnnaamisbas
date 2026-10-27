---
name: review-change
description: Reviews mijnnaamisbas changes against Svelte 5, service-layer, design-token, and accessibility conventions. Use when the user asks for a code review, a PR review, or whether a change matches project style.
---

# Review a change

Read the diff and the scoped rules in `.cursor/rules/`. Report only issues that are real in this codebase.

## Look for

- Data fetching or secrets inside a `.svelte` file, or a route calling Hygraph directly instead of a service
- `export let`, missing `$props()`, or a `.svelte` file importing `@mnb/hygraph`, `@mnb/mistral`, or `$lib/tidal`
- Hex colors, soft shadows, or Tailwind classes. Tokens live in `packages/tokens/src/variables.css`
- A new shared control under an app instead of `packages/ui`
- In-app links that skip `resolve()`, or a form that drops submitted values on `fail()`
- Clickable `<div>`s, inputs without labels, errors without `role="alert"`
- A new external host missing from CSP in `packages/auth/src/handle.ts`
- A package that imports `$env` instead of taking the secret as an argument

## Response

- **Must fix** — breaks the data boundary, secrets, or accessibility
- **Should fix** — wrong tokens, naming, or a duplicated component
- **Note** — optional, only if it affects the next reader

Skip praise and skip style nits that the existing file already does on purpose (tabs, `mnb-` class names, JSDoc on services).
