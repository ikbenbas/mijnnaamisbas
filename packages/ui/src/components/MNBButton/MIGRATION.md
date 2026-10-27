# Migration Guide: MNBButton

> **Package:** `@mnb/ui`
> **Introduced in:** v0.0.0

## v0.0.0

Import `MNBButton` from `@mnb/ui`. Root class is `mnb-button`.

```diff
- <Button />
+ <MNBButton />
```

- Replace the old component name in imports and markup.
- Do not target BEM hooks (`__`, `--`) from the previous `Button` styles. Variant and state classes sit on the root (`primary`, `is-invalid`, `is-full`).
