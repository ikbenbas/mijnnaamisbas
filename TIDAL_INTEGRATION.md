# Tidal API Integration Plan

## Overview
Integrate Tidal API to read user's playlists and use Mistral AI to make intelligent suggestions based on their actual music taste.

## Current State
- ✅ Mistral AI generates generic playlist suggestions
- ❌ No connection to user's Tidal account
- ❌ No access to user's actual playlists/favorites

## Target State
- ✅ User can log in with their Tidal account
- ✅ App reads user's playlists and favorites
- ✅ Mistral AI analyzes user's taste and makes personalized suggestions
- ✅ Direct links to create playlists in Tidal

---

## Implementation Steps

### 1. Setup Tidal Developer Account
**Actions needed:**
1. Go to [developer.tidal.com](https://developer.tidal.com)
2. Create a developer account
3. Create a new application
4. Get your Client ID and Client Secret
5. Add redirect URI: `http://localhost:5173/tidal/callback` (for development)

### 2. Install Tidal SDK Packages
```bash
pnpm add @tidal-music/auth @tidal-music/api
```

### 3. Environment Variables
Add to `.env`:
```
TIDAL_CLIENT_ID=your_client_id
TIDAL_CLIENT_SECRET=your_client_secret
TIDAL_REDIRECT_URI=http://localhost:5173/tidal/callback
```

### 4. Architecture

#### Auth Flow (OAuth 2.0 with PKCE)
```
User clicks "Connect Tidal"
  ↓
App → initializeLogin()
  ↓
Redirect to login.tidal.com
  ↓
User logs in
  ↓
Redirect back to /tidal/callback?code=...
  ↓
App → finalizeLogin(code)
  ↓
Store tokens securely
  ↓
User authenticated β
```

#### API Calls Flow
```
User submits suggestion request
  ↓
Get credentials → credentialsProvider.getCredentials()
  ↓
Fetch user playlists → TidalAPI.getUserPlaylists()
  ↓
Extract: playlist names, artists, genres, tracks
  ↓
Format data for Mistral AI
  ↓
Enhanced prompt: "Based on user's 50 playlists including [Jazz Favorites, 80s Hits, ...]"
  ↓
Mistral generates personalized suggestions
  ↓
Return suggestions with context
```

---

## File Structure

```
src/
├── lib/
│   ├── tidal/
│   │   ├── auth.ts           # Tidal auth wrapper
│   │   ├── api.ts            # Tidal API calls
│   │   └── types.ts          # TypeScript types
│   └── ai/
│       └── mistral.ts        # Mistral AI integration
├── routes/
│   └── tidal/
│       ├── +page.svelte      # Main UI (enhanced)
│       ├── +page.server.ts   # Server actions (enhanced)
│       ├── callback/
│       │   └── +page.server.ts  # OAuth callback handler
│       └── login/
│           └── +page.server.ts  # Login initiator
```

---

## Key Features to Implement

### Phase 1: Authentication
- [ ] Tidal OAuth login flow
- [ ] Token storage in session/cookies
- [ ] Token refresh handling
- [ ] Logout functionality

### Phase 2: Data Fetching
- [ ] Fetch user's playlists
- [ ] Fetch user's favorite artists
- [ ] Fetch user's favorite tracks
- [ ] Cache data to reduce API calls

### Phase 3: AI Integration
- [ ] Analyze user's music taste
- [ ] Enhanced Mistral prompts with user data
- [ ] Context-aware suggestions
- [ ] Genre/mood extraction from user's library

### Phase 4: UI Enhancements
- [ ] "Connect Tidal" button
- [ ] Display auth status
- [ ] Show user's statistics (X playlists, Y tracks)
- [ ] Better suggestion cards with reasoning

---

## API Endpoints to Use

### Tidal API (via @tidal-music/api)
```typescript
// User's playlists
GET /v2/users/{userId}/playlists

// Playlist details
GET /v2/playlists/{playlistId}

// User's favorite artists
GET /v2/users/{userId}/favorites/artists

// User's favorite tracks
GET /v2/users/{userId}/favorites/tracks
```

### Example API Call
```typescript
import { createAPIClient } from '@tidal-music/api';
import { credentialsProvider } from '@tidal-music/auth';

const api = createAPIClient({ credentialsProvider });

// Get user playlists
const playlists = await api.GET('/v2/users/{userId}/playlists', {
  params: { path: { userId: 'me' } }
});

// Get playlist tracks
const tracks = await api.GET('/v2/playlists/{playlistId}', {
  params: { path: { playlistId: 'abc123' } }
});
```

---

## Enhanced Mistral Prompt Example

**Before (generic):**
```
You are a music expert. Suggest 5 Tidal playlist ideas for someone
who is in the mood for: relaxed (genre: jazz).
```

**After (personalized):**
```
You are a music expert analyzing a Tidal user's music library.

USER'S MUSIC PROFILE:
- Total playlists: 23
- Favorite artists: Miles Davis, John Coltrane, Herbie Hancock, ...
- Top genres: Jazz (45%), Electronic (23%), Classical (18%), ...
- Recently added: "Kind of Blue" by Miles Davis
- Playlist themes: Late Night Jazz, Focus Music, Sunday Morning, ...

REQUEST: Suggest 5 new playlist ideas for this user who wants: relaxed mood

Consider their existing taste and suggest playlists that complement
but don't duplicate their current collection.
```

---

## Security Considerations

### Token Storage

**Current Implementation (Development):**
- Uses in-memory storage on the server (`src/lib/tidal/storage.ts`)
- Tokens are stored in a Map and lost on server restart
- Simple SvelteKit cookie tracks if user is connected

**⚠️ Production Requirements:**

Since the Tidal Auth SDK requires localStorage (which doesn't exist in Node.js), we've implemented a custom `StorageAdapter`. For production, upgrade to:

1. **Redis Storage** (recommended for multi-server):
   - Distributed storage across server instances
   - Persistent token storage
   - Fast lookups
   - Example in `src/lib/tidal/storage.ts` comments

2. **Database Storage**:
   - Store encrypted tokens in PostgreSQL/MongoDB
   - Associate tokens with user accounts
   - Implement token rotation

3. **Encrypted Cookie Storage**:
   - Use SvelteKit's cookie encryption
   - Store tokens client-side securely
   - Requires careful security implementation

**Key Security Rules:**
- Never expose tokens in browser console/network tab
- Always use HTTPS in production
- Implement token rotation every 7 days
- Clear all storage on logout

### Best Practices
1. Use PKCE for OAuth flow (SDK does this automatically)
2. Implement CSRF protection
3. Refresh tokens before expiry
4. Clear tokens on logout
5. Handle token revocation gracefully

---

## Testing Strategy

### Manual Testing
1. Login flow works
2. Callback handles success/error
3. API calls return data
4. AI suggestions are personalized
5. Logout clears session

### Error Handling
- Network failures
- Auth failures (invalid credentials)
- Token expiry
- API rate limits
- User denies permissions

---

## Deployment Considerations

### Production Setup
1. Update redirect URI to production URL
2. Use environment-specific client IDs
3. Enable HTTPS (required for OAuth)
4. Set up error monitoring
5. Implement rate limiting

### Environment Variables
```bash
# Development
TIDAL_CLIENT_ID=dev_client_id
TIDAL_REDIRECT_URI=http://localhost:5173/tidal/callback

# Production
TIDAL_CLIENT_ID=prod_client_id
TIDAL_REDIRECT_URI=https://mijnnaamisbas.com/tidal/callback
```

---

## Next Steps

1. **Immediate**: Set up Tidal Developer account
2. **Phase 1**: Implement OAuth authentication (1-2 hours)
3. **Phase 2**: Fetch and display user playlists (1 hour)
4. **Phase 3**: Enhance Mistral AI integration (1 hour)
5. **Polish**: UI improvements and error handling (1 hour)

**Total estimated time: 4-6 hours**

---

## Resources

- [Tidal Developer Platform](https://developer.tidal.com/)
- [Tidal SDK GitHub](https://github.com/tidal-music/tidal-sdk-web)
- [Tidal API Reference](https://tidal-music.github.io/tidal-api-reference/)
- [OAuth 2.0 PKCE](https://oauth.net/2/pkce/)
- [Mistral AI Docs](https://docs.mistral.ai/)
