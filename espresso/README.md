# Espresso Notes

A SvelteKit app for logging and reviewing espresso shot experiments.  
Data is stored in **[Hygraph](https://hygraph.com)** — a GraphQL-native headless CMS with a free tier.

---

## Tech stack

| Layer    | Technology |
|----------|-----------|
| Frontend | [SvelteKit](https://kit.svelte.dev) + TypeScript |
| CMS      | [Hygraph](https://hygraph.com) (free tier, GraphQL) |
| HTTP     | [graphql-request](https://github.com/jasonkuhrt/graphql-request) |

---

## Content model in Hygraph

Create a model called **`EspressoNote`** with the following fields:

| Field name   | Type    | Required | Notes                               |
|-------------|---------|----------|-------------------------------------|
| `title`      | String  | ✅       | Short description of the experiment |
| `date`       | Date    | ✅       | Date of the shot                    |
| `bean`       | String  | ✅       | Bean name / origin                  |
| `roaster`    | String  | —        | Roastery name                       |
| `grindSize`  | Float   | —        | Machine-specific grind setting      |
| `dosage`     | Float   | ✅       | Input weight in grams               |
| `yield`      | Float   | ✅       | Output weight in grams              |
| `brewTime`   | Int     | ✅       | Extraction time in seconds          |
| `temperature`| Float   | —        | Water temperature in °C             |
| `pressure`   | Float   | —        | Pump pressure in bar                |
| `notes`      | String  | —        | Tasting notes / observations        |
| `rating`     | Int     | —        | 1–5 star rating                     |

---

## Getting started

### 1. Set up Hygraph (free tier)

1. Create a free account at <https://hygraph.com>
2. Create a new project (any region)
3. In the **Schema** editor, create the `EspressoNote` model with all fields above
4. In **Settings → API Access**, copy the **Content API** URL
5. Create a **Permanent Auth Token** with `MUTATION` and `QUERY` permissions
6. Enable the `PUBLIC` content stage to allow unauthenticated reads (or use the token for reads too)

### 2. Configure environment variables

```bash
cp .env.example .env
# Edit .env and fill in HYGRAPH_ENDPOINT and HYGRAPH_TOKEN
```

### 3. Install dependencies and run

```bash
npm install
npm run dev
```

The app is available at <http://localhost:5173>.

---

## Available routes

| Route         | Description           |
|--------------|-----------------------|
| `/`           | Home — recent shots   |
| `/notes`      | All experiments table |
| `/notes/new`  | Log a new experiment  |
| `/notes/[id]` | Single note detail    |

---

## Build for production

```bash
npm run build
npm run preview
```

To deploy, swap `@sveltejs/adapter-auto` in `svelte.config.js` for the adapter matching your host (Vercel, Netlify, Cloudflare Pages, Node, etc.).
