# Migration Guide: MNBBackLink

> **Package:** `@mnb/ui`
> **Introduced in:** v0.0.0

## v0.0.0

Import `MNBBackLink` from `@mnb/ui`. Root class is `mnb-back`.

```diff
- <BackLink />
+ <MNBBackLink />
```

- Replace the old component name in imports and markup.
- Do not target BEM hooks (`__`, `--`) from the previous `BackLink` styles. Variant and state classes sit on the root (`primary`, `is-invalid`, `is-full`).
