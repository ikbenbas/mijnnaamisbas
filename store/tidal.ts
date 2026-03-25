import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { TidalPlaylist, TidalTokenResponse, TidalTrack, PlaylistSuggestion } from '~/types/tidal'

export interface TidalState {
    connected: boolean
    accessToken: string | null
    userId: number | null
    countryCode: string
    userFirstName: string | null
    playlists: TidalPlaylist[]
    selectedPlaylistId: string | null
    tracks: TidalTrack[]
    suggestions: PlaylistSuggestion | null
    loadingPlaylists: boolean
    loadingTracks: boolean
    loadingSuggestions: boolean
    error: string | null
}

export const state = (): TidalState => ({
    connected: false,
    accessToken: null,
    userId: null,
    countryCode: 'US',
    userFirstName: null,
    playlists: [],
    selectedPlaylistId: null,
    tracks: [],
    suggestions: null,
    loadingPlaylists: false,
    loadingTracks: false,
    loadingSuggestions: false,
    error: null,
})

export const getters: GetterTree<TidalState, TidalState> = {
    selectedPlaylist(state): TidalPlaylist | null {
        return state.playlists.find((p) => p.uuid === state.selectedPlaylistId) ?? null
    },
    topArtists(state): Array<{ name: string; count: number }> {
        const counts: Record<string, number> = {}
        state.tracks.forEach((track) => {
            track.artists?.forEach((artist) => {
                counts[artist.name] = (counts[artist.name] || 0) + 1
            })
        })
        return Object.entries(counts)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 20)
    },
}

export const mutations: MutationTree<TidalState> = {
    setConnected(state, payload: { accessToken: string; token: TidalTokenResponse }) {
        state.connected = true
        state.accessToken = payload.accessToken
        state.userId = payload.token.user.userId
        state.countryCode = payload.token.user.countryCode || 'US'
        state.userFirstName = payload.token.user.firstName
        state.error = null
    },
    setPlaylists(state, playlists: TidalPlaylist[]) {
        state.playlists = playlists
    },
    setSelectedPlaylistId(state, id: string) {
        state.selectedPlaylistId = id
    },
    setTracks(state, tracks: TidalTrack[]) {
        state.tracks = tracks
    },
    appendTracks(state, tracks: TidalTrack[]) {
        const existing = new Set(state.tracks.map((t) => t.id))
        state.tracks = [...state.tracks, ...tracks.filter((t) => !existing.has(t.id))]
    },
    setSuggestions(state, suggestions: PlaylistSuggestion) {
        state.suggestions = suggestions
    },
    setLoadingPlaylists(state, loading: boolean) {
        state.loadingPlaylists = loading
    },
    setLoadingTracks(state, loading: boolean) {
        state.loadingTracks = loading
    },
    setLoadingSuggestions(state, loading: boolean) {
        state.loadingSuggestions = loading
    },
    setError(state, error: string | null) {
        state.error = error
    },
    reset(state) {
        state.connected = false
        state.accessToken = null
        state.userId = null
        state.userFirstName = null
        state.playlists = []
        state.selectedPlaylistId = null
        state.tracks = []
        state.suggestions = null
        state.error = null
    },
}

export const actions: ActionTree<TidalState, TidalState> = {
    /**
     * Finalise the OAuth PKCE flow: exchange the auth code for an access token.
     */
    async exchangeToken({ commit }, payload: { code: string; codeVerifier: string; redirectUri: string }) {
        commit('setError', null)
        try {
            const response = await fetch('/api/tidal/token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })
            const token: TidalTokenResponse = await response.json()

            if (!response.ok) {
                throw new Error((token as unknown as { error: string }).error || 'Token exchange failed')
            }

            commit('setConnected', { accessToken: token.access_token, token })
            return token
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Token exchange failed'
            commit('setError', message)
            throw error
        }
    },

    /**
     * Fetch the authenticated user's Tidal playlists.
     */
    async fetchPlaylists({ commit, state }) {
        if (!state.accessToken || !state.userId) return

        commit('setLoadingPlaylists', true)
        commit('setError', null)

        try {
            const params = new URLSearchParams({
                userId: String(state.userId),
                countryCode: state.countryCode,
            })
            const response = await fetch(`/api/tidal/playlists?${params}`, {
                headers: { Authorization: `Bearer ${state.accessToken}` },
            })
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch playlists')
            }

            commit('setPlaylists', data.items || [])
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to fetch playlists'
            commit('setError', message)
        } finally {
            commit('setLoadingPlaylists', false)
        }
    },

    /**
     * Fetch tracks for a specific playlist and append them to the store.
     */
    async fetchTracksForPlaylist({ commit, state }, playlistId: string) {
        if (!state.accessToken) return

        commit('setSelectedPlaylistId', playlistId)
        commit('setLoadingTracks', true)
        commit('setError', null)

        try {
            const params = new URLSearchParams({ countryCode: state.countryCode })
            const response = await fetch(`/api/tidal/playlists/${playlistId}/tracks?${params}`, {
                headers: { Authorization: `Bearer ${state.accessToken}` },
            })
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch tracks')
            }

            commit('appendTracks', data.items || [])
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to fetch tracks'
            commit('setError', message)
        } finally {
            commit('setLoadingTracks', false)
        }
    },

    /**
     * Load tracks from all playlists for a comprehensive taste profile.
     */
    async loadAllTracks({ dispatch, state }) {
        for (const playlist of state.playlists) {
            await dispatch('fetchTracksForPlaylist', playlist.uuid)
        }
    },

    /**
     * Generate AI playlist suggestions based on user taste and a text prompt.
     */
    async getSuggestions({ commit, state }, prompt: string) {
        commit('setLoadingSuggestions', true)
        commit('setError', null)

        try {
            const response = await fetch('/api/suggestions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt,
                    playlists: state.playlists,
                    tracks: state.tracks,
                }),
            })
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to get suggestions')
            }

            commit('setSuggestions', data)
            return data
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to get suggestions'
            commit('setError', message)
            throw error
        } finally {
            commit('setLoadingSuggestions', false)
        }
    },
}
