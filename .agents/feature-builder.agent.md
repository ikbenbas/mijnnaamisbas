---
name: feature-builder
description: End-to-end SvelteKit feature builder. Adds a route, query, service method, and page that follow project tokens and server-data rules. Use when creating a page, route, or feature.
---

# Feature Builder Agent

> **Cursor:** "Follow the feature-builder agent to add [feature]"

## When to use

- "Add a page for [feature]"
- "Build a [feature] route"
- "I need a form that saves [thing] to Hygraph"

## Required reading

1. That app's `.instructions.md`, then `.cursor/rules/00-project.mdc`, `routes.mdc`, `services.mdc`, and `components.mdc`
2. One similar route: `apps/bookmarks/src/routes/add/` for a form, `apps/espresso/src/routes/notes/[id]/` for a detail page
3. `packages/tokens/src/variables.css` before writing any CSS

## Phase 1: Planning

Confirm, when the answer is not already in the request:

- Read-only page, or a form that creates or updates?
- Which Hygraph model, or is the data local?
- Does it need a nav link?

List the files you will add or edit before writing them.

## Phase 2: Implementation (in order)

| Step | File | Notes |
| --- | --- | --- |
| 1 | `apps/<app>/src/lib/types/<domain>.ts` | Fields the page actually renders |
| 2 | `apps/<app>/src/lib/queries/<domain>.ts` | `gql` documents only. No fetching here |
| 3 | `apps/<app>/src/lib/services/api/<domain>.ts` | Strategy + default instance. Export from `services/index.ts` |
| 4 | `apps/<app>/src/routes/<feature>/+page.server.ts` | `load` and named actions. `error(404)` / `fail(400)` |
| 5 | `apps/<app>/src/routes/<feature>/+page.svelte` | `$props()`, tokens, components from `@mnb/ui` |
| 6 | `apps/<app>/src/routes/+layout.svelte` | Nav link, only for a new top-level section |
| 7 | `packages/auth/src/handle.ts` | CSP `connect-src`, only when a new host is called |

Reuse `MNBButton`, `MNBInput`, `MNBTextarea`, `MNBSelect`, `MNBForm`, `MNBCard`, and `MNBModal` from `@mnb/ui` before adding a component. A new shared control goes in `packages/ui/src/components/MNBName/` and is exported from `src/index.ts`. See `packages/ui/.instructions.md`.

## Phase 3: Validation

```bash
pnpm exec eslint --fix <changed-files...>
pnpm --filter @mnb/<app> check
```

Open the route in the browser: happy path, empty state, and a failed form submit.

## Do / Don't

- Ask when the Hygraph model or the action name is ambiguous
- Keep tokens and API clients in server files
- Match the `mnb-` root class and the brutalist `--mnb-*` tokens
- Do not call Hygraph from a `.svelte` file
- Do not invent a Tailwind setup or the old mint/pink palette
- Do not add a second component kit under an app. Shared controls go in `packages/ui`
