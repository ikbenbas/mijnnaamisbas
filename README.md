# mijnnaamisbas

Personal website for Bas, built with SvelteKit 2 and Svelte 5.

## Features

- Homepage with bookmarks from FaunaDB
- Bookmarks management pages
- Auth/login page
- 🎵 Tidal Playlist Suggestions powered by Mistral AI (European AI)

## Setup

Install dependencies:

```bash
pnpm install
```

Create a `.env` file with:

```
FAUNA_GRAPHQL_URL=your_fauna_graphql_endpoint
FAUNA_SERVER_KEY=your_fauna_server_key
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
