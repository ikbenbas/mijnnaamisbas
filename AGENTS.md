# mijnnaamisbas — Agent Instructions

Personal site as a Turborepo. Three SvelteKit apps, a Storybook app, and shared packages under `@mnb`.

## How context loads

| What | Where | When |
| --- | --- | --- |
| Global rules | `.cursor/rules/00-project.mdc` | Every conversation |
| Scoped rules | `.cursor/rules/*.mdc` | When editing matching files |
| Package notes | `**/.instructions.md` | Before changing that app or package |
| Workflow agents | `.agents/*.agent.md` | When the task matches the table below |
| Skills | `.cursor/skills/*/SKILL.md` | When the task matches the skill description |

## Source of truth

Follow the code and these rules. These docs are stale and disagree with the app:

- `DESIGN_SYSTEM.md` still describes a mint/pink OKLCH theme. The live tokens are brutalist mono in `packages/tokens/src/variables.css`.
- `.github/copilot-instructions.md` still mentions Tailwind, a blocks system, and Yup. None of those are in the project.
- `TIDAL_*.md` still mentions `/tidal/callback` on port 5173. The Tidal app callback is `http://localhost:5175/callback`.

## Before coding

1. Read the `.instructions.md` in the app or package you will change.
2. Read the scoped rule for those files.
3. Read one similar route in that app, and for UI one component in `packages/ui/src/components/`.
4. For an end-to-end workflow, read the matching agent and follow its phases.

## Before finishing code changes

```bash
pnpm exec eslint --fix <changed-files...>
pnpm --filter @mnb/<app> check
```

## Workflow agents

| Agent | File | Use when |
| --- | --- | --- |
| feature-builder | [.agents/feature-builder.agent.md](.agents/feature-builder.agent.md) | Adding a page, route, or feature (query, service, load, UI) |
| accessibility-auditor | [.agents/accessibility-auditor.agent.md](.agents/accessibility-auditor.agent.md) | WCAG 2.2 audits and accessibility fixes |
| debug-triage | [.agents/debug-triage.agent.md](.agents/debug-triage.agent.md) | Diagnosing check, lint, load, or runtime errors |

## Layout

| Path | What belongs there | Notes |
| --- | --- | --- |
| `apps/bookmarks` | Homepage (`/`), list (`/list`), add (`/add`), login. Port 5173 | `.instructions.md` |
| `apps/espresso` | Coffee notes. `/`, `/notes`, `/notes/new`, `/notes/[id]`. Port 5174 | `.instructions.md` |
| `apps/tidal` | Suggestions and OAuth (`/login`, `/callback`, `/logout`). Port 5175 | `.instructions.md` |
| `apps/storybook` | Component and token stories. Port 6006 | `.instructions.md` |
| `packages/ui` | `MNB*` components and `MNBSiteFrame`. Import from `@mnb/ui` | `.instructions.md` |
| `packages/tokens` | CSS variables and global CSS | `.instructions.md` |
| `packages/auth` | Login form, `@mnb/auth/login`, `@mnb/auth/handle` | `.instructions.md` |
| `packages/hygraph` | `createHygraphClients(env)` | `.instructions.md` |
| `packages/mistral` | `completeJson(prompt, apiKey)` | `.instructions.md` |
| `packages/eslint-config` | `@mnb/eslint-config` base, svelte, storybook, prettier, and turbo configs | |
| `packages/typescript-config` | Shared `base.json` for non-SvelteKit packages | |

Domain services stay in the app that owns the data (`apps/<app>/src/lib/services`). Do not import `$env` inside a package.
