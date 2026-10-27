/**
 * TypeScript types for Tidal API responses
 */

export interface TidalPlaylist {
	id: string;
	title: string;
	description?: string;
	numberOfTracks?: number;
	duration?: number;
	image?: string;
	creator?: {
		id: string;
		name: string;
	};
}

export interface TidalTrack {
	id: string;
	title: string;
	duration: number;
	artists?: TidalArtist[];
	album?: TidalAlbum;
}

export interface TidalArtist {
	id: string;
	name: string;
	picture?: string;
}

export interface TidalAlbum {
	id: string;
	title: string;
	cover?: string;
}

export interface TidalUserProfile {
	userId: string;
	username?: string;
	firstName?: string;
	lastName?: string;
	email?: string;
}

export interface UserMusicTaste {
	playlists: TidalPlaylist[];
	favoriteArtists: TidalArtist[];
	favoriteTracks: TidalTrack[];
	topGenres: string[];
	totalPlaylists: number;
	totalTracks: number;
}
