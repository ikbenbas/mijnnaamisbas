import { state, mutations, getters } from '@/store/tidal'

describe('tidal store', () => {
    let storeState

    beforeEach(() => {
        storeState = state()
    })

    describe('state', () => {
        test('has expected initial state', () => {
            expect(storeState.connected).toBe(false)
            expect(storeState.accessToken).toBeNull()
            expect(storeState.userId).toBeNull()
            expect(storeState.playlists).toEqual([])
            expect(storeState.tracks).toEqual([])
            expect(storeState.suggestions).toBeNull()
            expect(storeState.loadingPlaylists).toBe(false)
            expect(storeState.loadingSuggestions).toBe(false)
            expect(storeState.error).toBeNull()
        })
    })

    describe('mutations', () => {
        test('setConnected updates auth state', () => {
            const token = {
                access_token: 'test-token',
                refresh_token: 'refresh',
                token_type: 'Bearer',
                expires_in: 3600,
                user: {
                    userId: 42,
                    countryCode: 'NL',
                    email: 'test@example.com',
                    firstName: 'Bas',
                    lastName: 'van Wouwen',
                },
            }

            mutations.setConnected(storeState, { accessToken: token.access_token, token })

            expect(storeState.connected).toBe(true)
            expect(storeState.accessToken).toBe('test-token')
            expect(storeState.userId).toBe(42)
            expect(storeState.countryCode).toBe('NL')
            expect(storeState.userFirstName).toBe('Bas')
        })

        test('setPlaylists replaces playlists array', () => {
            const playlists = [
                { uuid: 'abc', title: 'My Mix', numberOfTracks: 10 },
            ]
            mutations.setPlaylists(storeState, playlists)
            expect(storeState.playlists).toEqual(playlists)
        })

        test('appendTracks deduplicates by track id', () => {
            const tracksA = [
                { id: 1, title: 'Track 1', artists: [], album: {} },
                { id: 2, title: 'Track 2', artists: [], album: {} },
            ]
            const tracksB = [
                { id: 2, title: 'Track 2', artists: [], album: {} },
                { id: 3, title: 'Track 3', artists: [], album: {} },
            ]

            mutations.appendTracks(storeState, tracksA)
            mutations.appendTracks(storeState, tracksB)

            expect(storeState.tracks).toHaveLength(3)
            expect(storeState.tracks.map((t) => t.id)).toEqual([1, 2, 3])
        })

        test('setSuggestions stores suggestion object', () => {
            const suggestion = {
                name: 'Post Hardcore Essentials',
                description: 'Heavy and melodic post hardcore',
                reasoning: 'Based on your taste',
                tracks: [],
            }
            mutations.setSuggestions(storeState, suggestion)
            expect(storeState.suggestions).toEqual(suggestion)
        })

        test('setError stores error message', () => {
            mutations.setError(storeState, 'Something went wrong')
            expect(storeState.error).toBe('Something went wrong')
        })

        test('reset clears all state', () => {
            storeState.connected = true
            storeState.accessToken = 'token'
            storeState.playlists = [{ uuid: 'x' }]
            storeState.tracks = [{ id: 1 }]
            storeState.suggestions = { name: 'Test' }

            mutations.reset(storeState)

            expect(storeState.connected).toBe(false)
            expect(storeState.accessToken).toBeNull()
            expect(storeState.playlists).toEqual([])
            expect(storeState.tracks).toEqual([])
            expect(storeState.suggestions).toBeNull()
        })
    })

    describe('getters', () => {
        test('selectedPlaylist returns playlist matching selectedPlaylistId', () => {
            storeState.playlists = [
                { uuid: 'aaa', title: 'Playlist A' },
                { uuid: 'bbb', title: 'Playlist B' },
            ]
            storeState.selectedPlaylistId = 'bbb'

            const result = getters.selectedPlaylist(storeState)
            expect(result).toEqual({ uuid: 'bbb', title: 'Playlist B' })
        })

        test('selectedPlaylist returns null when no match', () => {
            storeState.playlists = [{ uuid: 'aaa', title: 'Playlist A' }]
            storeState.selectedPlaylistId = 'zzz'

            const result = getters.selectedPlaylist(storeState)
            expect(result).toBeNull()
        })

        test('topArtists counts and sorts artists from tracks', () => {
            storeState.tracks = [
                { id: 1, artists: [{ name: 'Band A' }, { name: 'Band B' }] },
                { id: 2, artists: [{ name: 'Band A' }] },
                { id: 3, artists: [{ name: 'Band C' }] },
            ]

            const result = getters.topArtists(storeState)
            expect(result[0]).toEqual({ name: 'Band A', count: 2 })
            expect(result.length).toBeLessThanOrEqual(20)
        })
    })
})
