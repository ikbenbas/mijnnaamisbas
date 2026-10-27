# Migration Guide: MNBTextarea

> **Package:** `@mnb/ui`
> **Introduced in:** v0.0.0

## v0.0.0

Import `MNBTextarea` from `@mnb/ui`. Root class is `mnb-textarea`.

```diff
- <Textarea />
+ <MNBTextarea />
```

- Replace the old component name in imports and markup.
- Do not target BEM hooks (`__`, `--`) from the previous `Textarea` styles. Variant and state classes sit on the root (`primary`, `is-invalid`, `is-full`).
