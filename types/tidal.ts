export interface TidalArtist {
    id: number
    name: string
    type: string
}

export interface TidalAlbum {
    id: number
    title: string
    cover: string | null
}

export interface TidalTrack {
    id: number
    title: string
    duration: number
    artists: TidalArtist[]
    album: TidalAlbum
}

export interface TidalPlaylist {
    uuid: string
    title: string
    description: string | null
    numberOfTracks: number
    created: string
    lastUpdated: string
    publicPlaylist: boolean
}

export interface TidalTokenResponse {
    access_token: string
    refresh_token: string
    token_type: string
    expires_in: number
    user: {
        userId: number
        countryCode: string
        email: string
        firstName: string
        lastName: string
    }
}

export interface TrackSuggestion {
    title: string
    artist: string
    album?: string
    reason?: string
}

export interface PlaylistSuggestion {
    name: string
    description: string
    reasoning: string
    tracks: TrackSuggestion[]
}
