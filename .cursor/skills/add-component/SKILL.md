---
name: add-component
description: Adds a shared Svelte 5 component to @mnb/ui with the MNB prefix, mnb- tokens, and an index export. Use when the user asks for a shared component, a design-system control, or to move repeated markup into the component library.
---

# Add a shared component

Follow `packages/ui/.instructions.md`. Study `packages/ui/src/components/MNBButton/` first.

## Checklist

- [ ] `packages/ui/src/components/MNBName/` with `MNBName.svelte`, `MNBName.type.ts`, and `MIGRATION.md`
- [ ] `MNBName.enum.ts` when a prop is a closed set
- [ ] `$props()`, `$derived` class string, root class `mnb-*`, no BEM
- [ ] Tokens only (`var(--mnb-…)`). Focus uses `:focus-visible`. Errors use `role="alert"`
- [ ] No `$env`, Hygraph, Mistral, or TIDAL. Callers pass data and already-resolved `href`s
- [ ] Exported from `packages/ui/src/index.ts`
- [ ] Story in `apps/storybook/src/stories/components/MNBName.stories.svelte`
- [ ] `pnpm exec eslint --fix` on the new files and `pnpm --filter @mnb/bookmarks check`
