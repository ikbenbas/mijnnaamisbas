<template>
    <div class="tidal">
        <div class="tidal__header">
            <h1 class="tidal__title">
                Tidal Playlist Suggestions
            </h1>
            <p class="tidal__subtitle">
                Connect your Tidal account and get AI-powered playlist suggestions based on your taste.
            </p>
        </div>

        <!-- Error message -->
        <div
            v-if="error"
            class="tidal__error"
        >
            {{ error }}
        </div>

        <!-- Step 1: Connect to Tidal -->
        <section
            v-if="!connected"
            class="tidal__section"
        >
            <h2 class="tidal__section-title">
                Step 1: Connect to Tidal
            </h2>
            <p>
                Authorise this app to read your Tidal playlists.
                You will be redirected to Tidal's login page.
            </p>
            <button
                class="tidal__button tidal__button--primary"
                :disabled="!tidalClientId"
                @click="connectTidal"
            >
                Connect with Tidal
            </button>
            <p
                v-if="!tidalClientId"
                class="tidal__hint"
            >
                Set <code>TIDAL_CLIENT_ID</code> in your environment to enable Tidal login.
            </p>
        </section>

        <!-- Connected state -->
        <template v-else>
            <div class="tidal__connected-bar">
                <span>Connected as <strong>{{ userFirstName }}</strong></span>
                <button
                    class="tidal__button tidal__button--secondary"
                    @click="disconnect"
                >
                    Disconnect
                </button>
            </div>

            <!-- Step 2: Load Playlists -->
            <section class="tidal__section">
                <h2 class="tidal__section-title">
                    Step 2: Your Playlists
                </h2>

                <button
                    class="tidal__button tidal__button--primary"
                    :disabled="loadingPlaylists"
                    @click="loadPlaylists"
                >
                    {{ loadingPlaylists ? 'Loading…' : 'Load playlists' }}
                </button>

                <ul
                    v-if="playlists.length"
                    class="tidal__playlist-list"
                >
                    <li
                        v-for="playlist in playlists"
                        :key="playlist.uuid"
                        class="tidal__playlist-item"
                        :class="{ 'tidal__playlist-item--selected': selectedPlaylistIds.includes(playlist.uuid) }"
                        @click="togglePlaylist(playlist.uuid)"
                    >
                        <span class="tidal__playlist-name">{{ playlist.title }}</span>
                        <span class="tidal__playlist-count">{{ playlist.numberOfTracks }} tracks</span>
                    </li>
                </ul>

                <div
                    v-if="playlists.length && !tracksLoaded"
                    class="tidal__load-tracks"
                >
                    <button
                        class="tidal__button tidal__button--secondary"
                        :disabled="loadingTracks || !selectedPlaylistIds.length"
                        @click="loadSelectedTracks"
                    >
                        {{ loadingTracks ? 'Loading tracks…' : 'Load tracks from selected playlists' }}
                    </button>
                    <p
                        v-if="!selectedPlaylistIds.length"
                        class="tidal__hint"
                    >
                        Select one or more playlists above.
                    </p>
                </div>

                <div
                    v-if="topArtists.length"
                    class="tidal__taste-profile"
                >
                    <h3 class="tidal__section-subtitle">
                        Your taste profile
                    </h3>
                    <p class="tidal__hint">
                        Based on {{ tracks.length }} tracks across your selected playlists.
                    </p>
                    <ul class="tidal__artist-list">
                        <li
                            v-for="artist in topArtists"
                            :key="artist.name"
                            class="tidal__artist-item"
                        >
                            <span class="tidal__artist-name">{{ artist.name }}</span>
                            <span class="tidal__artist-count">{{ artist.count }}×</span>
                        </li>
                    </ul>
                </div>
            </section>

            <!-- Step 3: Get Suggestions -->
            <section
                v-if="tracksLoaded"
                class="tidal__section"
            >
                <h2 class="tidal__section-title">
                    Step 3: Get Suggestions
                </h2>
                <p>
                    Describe the playlist you want — for example
                    <em>"post hardcore bands"</em>, <em>"chill lo-fi for studying"</em>, or
                    <em>"90s alternative rock"</em>.
                </p>

                <div class="tidal__prompt-row">
                    <input
                        v-model="prompt"
                        class="tidal__prompt-input"
                        type="text"
                        placeholder="e.g. post hardcore bands"
                        @keyup.enter="getSuggestions"
                    >
                    <button
                        class="tidal__button tidal__button--primary"
                        :disabled="loadingSuggestions || !prompt.trim()"
                        @click="getSuggestions"
                    >
                        {{ loadingSuggestions ? 'Thinking…' : 'Suggest' }}
                    </button>
                </div>
            </section>

            <!-- Suggestions result -->
            <section
                v-if="suggestions"
                class="tidal__section tidal__suggestions"
            >
                <h2 class="tidal__suggestions-name">
                    {{ suggestions.name }}
                </h2>
                <p class="tidal__suggestions-description">
                    {{ suggestions.description }}
                </p>
                <p class="tidal__suggestions-reasoning">
                    <em>{{ suggestions.reasoning }}</em>
                </p>

                <ol class="tidal__track-list">
                    <li
                        v-for="(track, index) in suggestions.tracks"
                        :key="index"
                        class="tidal__track-item"
                    >
                        <span class="tidal__track-number">{{ index + 1 }}.</span>
                        <div class="tidal__track-info">
                            <span class="tidal__track-title">{{ track.title }}</span>
                            <span class="tidal__track-artist">{{ track.artist }}</span>
                            <span
                                v-if="track.album"
                                class="tidal__track-album"
                            >{{ track.album }}</span>
                            <span
                                v-if="track.reason"
                                class="tidal__track-reason"
                            >{{ track.reason }}</span>
                        </div>
                    </li>
                </ol>
            </section>
        </template>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapGetters } from 'vuex'

const PKCE_VERIFIER_KEY = 'tidal_pkce_verifier'
const TIDAL_AUTH_URL = 'https://login.tidal.com/oauth2/authorize'

async function generatePKCE(): Promise<{ verifier: string; challenge: string }> {
    const array = new Uint8Array(64)
    crypto.getRandomValues(array)
    const verifier = btoa(String.fromCharCode(...array))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '')

    const encoded = new TextEncoder().encode(verifier)
    const hashBuffer = await crypto.subtle.digest('SHA-256', encoded)
    const hashArray = new Uint8Array(hashBuffer)
    const challenge = btoa(String.fromCharCode(...hashArray))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '')

    return { verifier, challenge }
}

export default Vue.extend({
    name: 'TidalPage',

    data() {
        return {
            prompt: '',
            selectedPlaylistIds: [] as string[],
        }
    },

    computed: {
        ...mapState('tidal', [
            'connected',
            'userFirstName',
            'playlists',
            'tracks',
            'suggestions',
            'loadingPlaylists',
            'loadingTracks',
            'loadingSuggestions',
            'error',
        ]),
        ...mapGetters('tidal', ['topArtists']),

        tidalClientId(): string {
            return (this.$config as { tidalClientId?: string }).tidalClientId || ''
        },

        tidalRedirectUri(): string {
            if (process.client) {
                return `${window.location.origin}/tidal`
            }
            return ''
        },

        tracksLoaded(): boolean {
            return this.tracks.length > 0
        },
    },

    async mounted() {
        // Handle OAuth callback — check for ?code= in URL
        if (process.client) {
            const params = new URLSearchParams(window.location.search)
            const code = params.get('code')

            if (code) {
                const codeVerifier = sessionStorage.getItem(PKCE_VERIFIER_KEY)
                sessionStorage.removeItem(PKCE_VERIFIER_KEY)

                if (codeVerifier) {
                    try {
                        await this.$store.dispatch('tidal/exchangeToken', {
                            code,
                            codeVerifier,
                            redirectUri: this.tidalRedirectUri,
                        })
                        // Clean the URL after successful exchange
                        window.history.replaceState({}, document.title, '/tidal')
                    } catch {
                        // Error is already stored in the Vuex state
                    }
                }
            }
        }
    },

    methods: {
        async connectTidal() {
            const { verifier, challenge } = await generatePKCE()
            sessionStorage.setItem(PKCE_VERIFIER_KEY, verifier)

            const params = new URLSearchParams({
                response_type: 'code',
                client_id: this.tidalClientId,
                redirect_uri: this.tidalRedirectUri,
                scope: 'r_usr',
                code_challenge: challenge,
                code_challenge_method: 'S256',
            })

            window.location.href = `${TIDAL_AUTH_URL}?${params}`
        },

        disconnect() {
            this.$store.commit('tidal/reset')
        },

        async loadPlaylists() {
            await this.$store.dispatch('tidal/fetchPlaylists')
        },

        togglePlaylist(id: string) {
            const index = this.selectedPlaylistIds.indexOf(id)
            if (index === -1) {
                this.selectedPlaylistIds.push(id)
            } else {
                this.selectedPlaylistIds.splice(index, 1)
            }
        },

        async loadSelectedTracks() {
            for (const id of this.selectedPlaylistIds) {
                await this.$store.dispatch('tidal/fetchTracksForPlaylist', id)
            }
        },

        async getSuggestions() {
            if (!this.prompt.trim()) return
            await this.$store.dispatch('tidal/getSuggestions', this.prompt.trim())
        },
    },
})
</script>

<style>
.tidal {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
}

.tidal__header {
    margin-bottom: 2rem;
}

.tidal__title {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

.tidal__subtitle {
    color: #666;
}

.tidal__error {
    background: #fee2e2;
    color: #b91c1c;
    padding: 1rem;
    border-radius: 0.5rem;
    margin-bottom: 1.5rem;
}

.tidal__section {
    margin-bottom: 2.5rem;
}

.tidal__section-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
}

.tidal__section-subtitle {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.tidal__hint {
    font-size: 0.875rem;
    color: #888;
    margin-top: 0.5rem;
}

.tidal__button {
    display: inline-block;
    padding: 0.625rem 1.25rem;
    border: none;
    border-radius: 0.375rem;
    font-size: 1rem;
    cursor: pointer;
    transition: opacity 0.15s;
}

.tidal__button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.tidal__button--primary {
    background: #1db954;
    color: #fff;
}

.tidal__button--primary:hover:not(:disabled) {
    opacity: 0.85;
}

.tidal__button--secondary {
    background: #e5e7eb;
    color: #374151;
}

.tidal__button--secondary:hover:not(:disabled) {
    background: #d1d5db;
}

.tidal__connected-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    margin-bottom: 2rem;
}

.tidal__playlist-list {
    list-style: none;
    padding: 0;
    margin: 1rem 0;
    display: grid;
    gap: 0.5rem;
}

.tidal__playlist-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: background 0.1s;
}

.tidal__playlist-item:hover {
    background: #f9fafb;
}

.tidal__playlist-item--selected {
    border-color: #1db954;
    background: #f0fdf4;
}

.tidal__playlist-name {
    font-weight: 500;
}

.tidal__playlist-count {
    font-size: 0.875rem;
    color: #6b7280;
}

.tidal__load-tracks {
    margin-top: 1rem;
}

.tidal__taste-profile {
    margin-top: 1.5rem;
    padding: 1rem;
    background: #f9fafb;
    border-radius: 0.5rem;
}

.tidal__artist-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
}

.tidal__artist-item {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    background: #fff;
    border: 1px solid #e5e7eb;
    padding: 0.25rem 0.625rem;
    border-radius: 999px;
    font-size: 0.875rem;
}

.tidal__artist-count {
    color: #6b7280;
    font-size: 0.75rem;
}

.tidal__prompt-row {
    display: flex;
    gap: 0.75rem;
    margin-top: 1rem;
}

.tidal__prompt-input {
    flex: 1;
    padding: 0.625rem 0.875rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-size: 1rem;
    outline: none;
}

.tidal__prompt-input:focus {
    border-color: #1db954;
    box-shadow: 0 0 0 2px rgba(29, 185, 84, 0.2);
}

.tidal__suggestions {
    padding: 1.5rem;
    background: #f9fafb;
    border-radius: 0.75rem;
    border: 1px solid #e5e7eb;
}

.tidal__suggestions-name {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

.tidal__suggestions-description {
    color: #374151;
    margin-bottom: 0.5rem;
}

.tidal__suggestions-reasoning {
    color: #6b7280;
    font-size: 0.875rem;
    margin-bottom: 1.5rem;
}

.tidal__track-list {
    list-style: none;
    padding: 0;
    display: grid;
    gap: 0.75rem;
}

.tidal__track-item {
    display: flex;
    gap: 1rem;
    padding: 0.75rem;
    background: #fff;
    border-radius: 0.5rem;
    border: 1px solid #e5e7eb;
}

.tidal__track-number {
    color: #9ca3af;
    min-width: 1.5rem;
    font-variant-numeric: tabular-nums;
}

.tidal__track-info {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
}

.tidal__track-title {
    font-weight: 600;
}

.tidal__track-artist {
    color: #374151;
    font-size: 0.875rem;
}

.tidal__track-album {
    color: #6b7280;
    font-size: 0.8125rem;
}

.tidal__track-reason {
    color: #9ca3af;
    font-size: 0.75rem;
    font-style: italic;
    margin-top: 0.25rem;
}
</style>
