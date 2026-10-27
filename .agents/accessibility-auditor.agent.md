---
name: accessibility-auditor
description: WCAG 2.2 auditor for Svelte pages and base components. Reports violations and fixes them with semantic HTML, keyboard access, and design tokens. Use when auditing or fixing accessibility.
---

# Accessibility Auditor Agent

> **Cursor:** "Follow the accessibility-auditor agent on [page or component]"

## When to use

- "Audit [page] for accessibility"
- "Check WCAG on [component]"
- "Make [form] keyboard accessible"

## Required reading

1. The target `.svelte` file and its `+page.server.ts` if it has a form
2. A base component that already does this well (`Button.svelte`, `Modal.svelte`, `Input.svelte`)

## Phase 1: Audit

AA minimum. Record criterion, severity (Critical / Serious / Moderate / Minor), user impact, and location.

| Principle | Checks |
| --- | --- |
| Perceivable | Text contrast on off-white and black, not color-only, images have text alternatives |
| Operable | Keyboard reaches every control, `:focus-visible` shows, no trap, hit area is comfortable |
| Understandable | Labels tied to inputs, errors in `role="alert"`, page has one `h1` |
| Robust | Semantic elements, valid ARIA, name/role/value |

## Phase 2: Report

Group findings by severity. Explain impact in plain language before changing code.

## Phase 3: Fix

- Prefer `<button>`, `<a>`, `<label>`, and `<nav>` over ARIA on a `<div>`
- Use existing tokens. Focus ring is `outline: 2px solid var(--color-secondary)`
- Form errors stay in the action result and render with `role="alert"`
- Motion respects `prefers-reduced-motion`

## Phase 4: Verify

Re-read the changed markup against the table. Tab through the page. Re-run `pnpm check` if types changed.

## Do / Don't

- Fix Critical and Serious issues, or say why one is deferred
- Do not add ARIA that repeats what the element already means
- Do not restyle the page into a different theme while auditing
