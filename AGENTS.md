# mijnnaamisbas — Agent Instructions

Personal SvelteKit site. One app, not a monorepo.

## How context loads

| What | Where | When |
| --- | --- | --- |
| Global rules | `.cursor/rules/00-project.mdc` | Every conversation |
| Scoped rules | `.cursor/rules/*.mdc` | When editing matching files |
| Workflow agents | `.agents/*.agent.md` | When the task matches the table below |
| Skills | `.cursor/skills/*/SKILL.md` | When the task matches the skill description |

## Source of truth

Follow the code and these rules. These docs are stale and disagree with the app:

- `DESIGN_SYSTEM.md` and `src/lib/components/base/README.md` still describe a mint/pink OKLCH theme. The live tokens are brutalist mono in `src/lib/styles/base/variables.css`.
- `.github/copilot-instructions.md` still mentions Tailwind, a blocks system, and Yup. None of those are in the project.

## Before coding

1. Read the scoped rule for the files you will touch.
2. Read one similar route and, for UI, one component in `src/lib/components/base/`.
3. For an end-to-end workflow, read the matching agent and follow its phases.

## Before finishing code changes

```bash
pnpm exec eslint --fix <changed-files...>
pnpm check
```

## Workflow agents

| Agent | File | Use when |
| --- | --- | --- |
| feature-builder | [.agents/feature-builder.agent.md](.agents/feature-builder.agent.md) | Adding a page, route, or feature (query, service, load, UI) |
| accessibility-auditor | [.agents/accessibility-auditor.agent.md](.agents/accessibility-auditor.agent.md) | WCAG 2.2 audits and accessibility fixes |
| debug-triage | [.agents/debug-triage.agent.md](.agents/debug-triage.agent.md) | Diagnosing check, lint, load, or runtime errors |

## Layout

| Path | What belongs there |
| --- | --- |
| `src/routes/` | Pages, `load`, and form actions |
| `src/lib/components/base/` | Shared UI. Export new components from `$lib` and `base/index.ts` |
| `src/lib/queries/` | GraphQL documents |
| `src/lib/services/` | Hygraph strategies, validation, slug helpers |
| `src/lib/types/` | Domain types |
| `src/lib/styles/` | Tokens and global CSS |
| `src/lib/config/Constants.ts` | Limits, pagination, feature flags, breakpoints |
| `src/lib/tidal/` | TIDAL client, kept on the server |
