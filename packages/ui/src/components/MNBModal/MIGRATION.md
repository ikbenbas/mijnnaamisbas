# Migration Guide: MNBModal

> **Package:** `@mnb/ui`
> **Introduced in:** v0.0.0

## v0.0.0

Import `MNBModal` from `@mnb/ui`. Root class is `mnb-modal`.

```diff
- <Modal />
+ <MNBModal />
```

- Replace the old component name in imports and markup.
- Do not target BEM hooks (`__`, `--`) from the previous `Modal` styles. Variant and state classes sit on the root (`primary`, `is-invalid`, `is-full`).
