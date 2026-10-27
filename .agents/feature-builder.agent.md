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

1. `.cursor/rules/00-project.mdc` plus `routes.mdc`, `services.mdc`, and `components.mdc`
2. One similar route: `src/routes/bookmarks/add/` for a form, `src/routes/espresso/notes/[id]/` for a detail page
3. `src/lib/styles/base/variables.css` before writing any CSS

## Phase 1: Planning

Confirm, when the answer is not already in the request:

- Read-only page, or a form that creates or updates?
- Which Hygraph model, or is the data local?
- Does it need a nav link?

List the files you will add or edit before writing them.

## Phase 2: Implementation (in order)

| Step | File | Notes |
| --- | --- | --- |
| 1 | `src/lib/types/<domain>.ts` | Fields the page actually renders |
| 2 | `src/lib/queries/<domain>.ts` | `gql` documents only. No fetching here |
| 3 | `src/lib/services/api/<domain>.ts` | Strategy + default instance. Export from `services/index.ts` |
| 4 | `src/routes/<feature>/+page.server.ts` | `load` and named actions. `error(404)` / `fail(400)` |
| 5 | `src/routes/<feature>/+page.svelte` | `$props()`, tokens, base components from `$lib` |
| 6 | `src/routes/+layout.svelte` | Nav link, only for a new top-level section |
| 7 | `src/hooks.server.ts` | CSP `connect-src`, only when a new host is called |

Reuse `Button`, `Input`, `Textarea`, `Select`, `Form`, `Card`, and `Modal` before adding a component. A new shared control goes in `base/`, with JSDoc, and is exported from `$lib`.

## Phase 3: Validation

```bash
pnpm exec eslint --fix <changed-files...>
pnpm check
```

Open the route in the browser: happy path, empty state, and a failed form submit.

## Do / Don't

- Ask when the Hygraph model or the action name is ambiguous
- Keep tokens and API clients in server files
- Match BEM and the brutalist tokens
- Do not call Hygraph from a `.svelte` file
- Do not invent a Tailwind setup or the old mint/pink palette
- Do not add files under `src/lib/components/ui/`
