# Migration Guide: MNBInput

> **Package:** `@mnb/ui`
> **Introduced in:** v0.0.0

## v0.0.0

Import `MNBInput` from `@mnb/ui`. Root class is `mnb-input`.

```diff
- <Input />
+ <MNBInput />
```

- Replace the old component name in imports and markup.
- Do not target BEM hooks (`__`, `--`) from the previous `Input` styles. Variant and state classes sit on the root (`primary`, `is-invalid`, `is-full`).
