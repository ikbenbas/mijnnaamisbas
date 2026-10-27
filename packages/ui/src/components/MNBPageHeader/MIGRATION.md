# Migration Guide: MNBPageHeader

> **Package:** `@mnb/ui`
> **Introduced in:** v0.0.0

## v0.0.0

Import `MNBPageHeader` from `@mnb/ui`. Root class is `mnb-page-header`.

```diff
- <PageHeader />
+ <MNBPageHeader />
```

- Replace the old component name in imports and markup.
- Do not target BEM hooks (`__`, `--`) from the previous `PageHeader` styles. Variant and state classes sit on the root (`primary`, `is-invalid`, `is-full`).
