---
name: add-feature
description: Adds a SvelteKit page or feature to mijnnaamisbas using server loads, the service layer, base components, and design tokens. Use when the user asks to add a page, route, form, Hygraph model UI, or new site section.
---

# Add a feature

Follow [.agents/feature-builder.agent.md](../../../.agents/feature-builder.agent.md) phase by phase.

## Checklist

- [ ] Types, then GraphQL in `src/lib/queries/`, then a strategy in `src/lib/services/api/`
- [ ] `load` and actions live in `+page.server.ts`. The page never calls Hygraph, Mistral, or TIDAL
- [ ] Invalid forms `fail(400)` with the submitted fields
- [ ] UI uses `$lib` base components and tokens from `variables.css`. BEM on shared components
- [ ] New top-level section is linked from `+layout.svelte`. New host is added to CSP
- [ ] `pnpm exec eslint --fix` on touched files, then `pnpm check`
