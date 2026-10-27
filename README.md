# mijnnaamisbas

Personal site for Bas. Turborepo with three SvelteKit apps, Storybook, and shared packages.

| App | Package | Dev URL | What it is |
| --- | --- | --- | --- |
| Bookmarks | `@mnb/bookmarks` | http://localhost:5173 | Homepage, bookmark list, login |
| Espresso | `@mnb/espresso` | http://localhost:5174 | Coffee notes |
| Tidal | `@mnb/tidal` | http://localhost:5175 | Playlist suggestions |
| Storybook | `@mnb/storybook` | http://localhost:6006 | UI components and design tokens |

Shared packages: `@mnb/ui` (components and site frame), `@mnb/tokens`, `@mnb/auth`, `@mnb/hygraph`, `@mnb/mistral`, `@mnb/eslint-config`, `@mnb/typescript-config`.

## Features

- Homepage with bookmarks from Hygraph CMS
- Bookmarks management pages
- Auth/login page
- 🎵 Tidal Playlist Suggestions powered by Mistral AI (European AI)
- ☕ Coffee Notes tracker - track your espresso brewing experiments

## Setup

Install dependencies:

```bash
pnpm install
```

### Hygraph CMS Setup

See the detailed setup guide: **[HYGRAPH_SETUP.md](HYGRAPH_SETUP.md)**

Quick steps:
1. Create a free account at [Hygraph](https://hygraph.com)
2. Create a new project
3. Build the content models (Bookmark, BookmarkGroup, Tag, EspressoNote)
4. Get your API endpoint and create auth tokens
5. Add credentials to `.env` file

### Environment Variables

Create a `.env` file with:

```
HYGRAPH_ENDPOINT=https://YOUR_REGION.hygraph.com/v2/YOUR_PROJECT_ID/master
HYGRAPH_TOKEN=your_read_only_token
HYGRAPH_MUTATION_TOKEN=your_mutation_token
MISTRAL_API_KEY=your_mistral_api_key
```

## Development

```bash
pnpm dev
```

That starts the apps, including Storybook on port 6006. One app only: `pnpm --filter @mnb/espresso dev`.

## Build

```bash
pnpm build
pnpm preview
```

## Tidal Playlist Suggestions

Open http://localhost:5175 for AI-powered playlist suggestions using Mistral AI. The Tidal OAuth redirect in development is `http://localhost:5175/callback`.
