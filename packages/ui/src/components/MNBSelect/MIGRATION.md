# Migration Guide: MNBSelect

> **Package:** `@mnb/ui`
> **Introduced in:** v0.0.0

## v0.0.0

Import `MNBSelect` from `@mnb/ui`. Root class is `mnb-select`.

```diff
- <Select />
+ <MNBSelect />
```

- Replace the old component name in imports and markup.
- Do not target BEM hooks (`__`, `--`) from the previous `Select` styles. Variant and state classes sit on the root (`primary`, `is-invalid`, `is-full`).
