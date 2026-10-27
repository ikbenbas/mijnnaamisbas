# Migration Guide: MNBSiteFrame

> **Package:** `@mnb/ui`
> **Introduced in:** v0.0.0

## v0.0.0

Import `MNBSiteFrame` from `@mnb/ui`. Root class is `mnb-site-frame`.

```diff
- <SiteFrame />
+ <MNBSiteFrame />
```

- Replace the old component name in imports and markup.
- Do not target BEM hooks (`__`, `--`) from the previous `SiteFrame` styles. Variant and state classes sit on the root (`primary`, `is-invalid`, `is-full`).
