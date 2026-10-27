---
name: debug-triage
description: Debug specialist for this Turborepo. Traces check, lint, load, env, and port failures to a root cause. Use for build errors, form failures, or hydration and data bugs.
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
| `HYGRAPH_ENDPOINT is not set` while `.env` exists | `kit.env.dir` must be `../..` in that app's `svelte.config.js`. Vite `envDir` alone does not fill `$env` |
| Cannot find module `@mnb/...` | The app's `package.json` is missing that `workspace:*` dependency |
| `pnpm dev` exits because one app failed | `--strictPort`. A busy port (5173 is often another local project) stops Bookmarks, Espresso, and Tidal together |
| Empty list, no throw | `executeQuery` returns `null` and the service turns that into `[]`. The GraphQL error is in the server log |
| Form redisplays empty | Action did not return the submitted fields in `fail()` |
| `no-navigation-without-resolve` on a cross-app link | Absolute URL from `appUrls()`. `resolve()` is only for routes inside the current app |
| Blocked request in the browser | Host missing from CSP `connect-src` in `packages/auth/src/handle.ts` |
| Svelte rune or export error | Svelte 5 syntax. Props come from `$props()`, not `export let` |

Trace the root cause. A null from `executeQuery` is often a query/schema mismatch, not a UI bug.

## Phase 3: Fix

Smallest change that fixes the cause. Follow the scoped rule for that file. Do not refactor neighboring features in the same pass.

## Phase 4: Validate

Re-run the command that failed (`pnpm --filter @mnb/<app> check`, `pnpm exec eslint`, or the same form submit). Say what the cause was and what you ran.

## Do / Don't

- Explain why the error happened
- Do not silence it with an empty `catch` or a type assertion
- Do not change tokens, copy, or unrelated routes while debugging
