---
name: debug-triage
description: Debug specialist for this SvelteKit app. Traces check, lint, load, and runtime failures to a root cause. Use for build errors, form failures, or Hydration and data bugs.
---

# Debug Triage Agent

> **Cursor:** "Follow the debug-triage agent — [paste the error]"

## When to use

- `pnpm check` or ESLint failures
- A load function throwing, or a form action returning the wrong `fail`
- Hydration mismatches, missing env vars, CSP blocking a request

## Phase 1: Collect

1. Read the full error
2. Open the file and the service it calls
3. Check recent edits to that route only

## Phase 2: Diagnose

| Error | Look here first |
| --- | --- |
| Type error in a page | `PageData` / `ActionData` from `./$types` out of date, or a field missing on the service result |
| `HYGRAPH_ENDPOINT is not set` | Private env read on the server. Never `PUBLIC_` for tokens |
| Empty list, no throw | `executeQuery` returns `null` and the service turns that into `[]`. The GraphQL error is in the server log |
| Form redisplays empty | Action did not return the submitted fields in `fail()` |
| Blocked request in the browser | Host missing from CSP `connect-src` in `src/hooks.server.ts` |
| Svelte rune or export error | Svelte 5 syntax. Props come from `$props()`, not `export let` |

Trace the root cause. A null from `executeQuery` is often a query/schema mismatch, not a UI bug.

## Phase 3: Fix

Smallest change that fixes the cause. Follow the scoped rule for that file. Do not refactor neighboring features in the same pass.

## Phase 4: Validate

Re-run the command that failed (`pnpm check`, `pnpm exec eslint`, or the same form submit). Say what the cause was and what you ran.

## Do / Don't

- Explain why the error happened
- Do not silence it with an empty `catch` or a type assertion
- Do not change tokens, copy, or unrelated routes while debugging
