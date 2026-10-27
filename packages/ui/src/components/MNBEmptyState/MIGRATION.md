# Migration Guide: MNBEmptyState

> **Package:** `@mnb/ui`
> **Introduced in:** v0.0.0

## v0.0.0

Import `MNBEmptyState` from `@mnb/ui`. Root class is `mnb-empty`.

```diff
- <EmptyState />
+ <MNBEmptyState />
```

- Replace the old component name in imports and markup.
- Do not target BEM hooks (`__`, `--`) from the previous `EmptyState` styles. Variant and state classes sit on the root (`primary`, `is-invalid`, `is-full`).
