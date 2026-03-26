# mijnnaamisbas

Personal website for Bas, built with SvelteKit 2 and Svelte 5.

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

## Build

```bash
pnpm build
pnpm preview
```

## Tidal Playlist Suggestions

Visit `/tidal` to get AI-powered playlist suggestions using Mistral AI, the European AI alternative to OpenAI.
