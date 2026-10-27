# Migration Guide: MNBCard

> **Package:** `@mnb/ui`
> **Introduced in:** v0.0.0

## v0.0.0

Import `MNBCard` from `@mnb/ui`. Root class is `mnb-card`.

```diff
- <Card />
+ <MNBCard />
```

- Replace the old component name in imports and markup.
- Do not target BEM hooks (`__`, `--`) from the previous `Card` styles. Variant and state classes sit on the root (`primary`, `is-invalid`, `is-full`).
