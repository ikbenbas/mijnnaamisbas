---
name: add-feature
description: Adds a SvelteKit page or feature to a mijnnaamisbas app using server loads, the app service layer, @mnb/ui, and design tokens. Use when the user asks to add a page, route, form, Hygraph model UI, or new site section.
---

# Add a feature

Follow [.agents/feature-builder.agent.md](../../../.agents/feature-builder.agent.md) phase by phase.

## Checklist

- [ ] Types, then GraphQL in `apps/<app>/src/lib/queries/`, then a strategy in `apps/<app>/src/lib/services/api/`
- [ ] `load` and actions live in `+page.server.ts`. The page never calls Hygraph, Mistral, or TIDAL
- [ ] Invalid forms `fail(400)` with the submitted fields
- [ ] UI uses `MNB*` components from `@mnb/ui` and `--mnb-*` tokens from `packages/tokens`
- [ ] New top-level section is linked from that app's `+layout.svelte`. New host is added to CSP in `packages/auth`
- [ ] `pnpm exec eslint --fix` on touched files, then `pnpm --filter @mnb/<app> check`
