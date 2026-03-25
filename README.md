# mijnnaamisbas

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).


## Tidal Playlist Suggestions

Browse your Tidal playlists and get AI-powered playlist suggestions at `/tidal`.

### How it works

1. **Connect with Tidal** — OAuth 2.0 PKCE flow authenticates you with your Tidal account.
2. **Load playlists** — your playlists are fetched via the Tidal API.
3. **Select playlists** — pick the playlists you want to use as a taste profile, then load their tracks.
4. **Enter a prompt** — describe the playlist you want (e.g. *"post hardcore bands"*).
5. **Get suggestions** — GPT-4o analyses your taste and returns 10–15 track suggestions.

### Setup

Copy `.env.example` to `.env` and fill in:

| Variable | Description |
|---|---|
| `TIDAL_CLIENT_ID` | Your Tidal app client ID (from [developer.tidal.com](https://developer.tidal.com)) |
| `TIDAL_CLIENT_SECRET` | Your Tidal app client secret |
| `OPENAI_API_KEY` | Your OpenAI API key |

Register a Tidal app with *Authorization Code + PKCE* enabled and add your redirect URI
(e.g. `http://localhost:3000/tidal`).

> **Note**: The Tidal suggestion feature requires server mode (`nuxt dev` or `nuxt build && nuxt start`).

---

## TODO
- [ ] Implementatie GitHub's Flat Data https://octo.github.com/projects/flat-data
- [ ] Implementatie Keller's resources https://jochemkeller.nl/.netlify/functions/resources
