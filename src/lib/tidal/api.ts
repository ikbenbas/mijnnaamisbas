/**
 * Tidal API wrapper using @tidal-music/api
 * Provides methods to fetch user playlists, favorites, etc.
 */

import { createAPIClient } from '@tidal-music/api';
import { getCredentialsProvider } from './auth';
import type { TidalPlaylist, TidalArtist, TidalTrack, UserMusicTaste } from './types';

/**
 * Create a Tidal API client instance
 */
function getAPIClient() {
	const credentialsProvider = getCredentialsProvider();
	return createAPIClient(credentialsProvider);
}

/**
 * Get user's playlists
 */
export async function getUserPlaylists(): Promise<TidalPlaylist[]> {
	try {
		const api = getAPIClient();
		const response = await api.GET('/userCollections/{id}/relationships/playlists', {
			params: {
				path: { id: 'me' }
			}
		});

		const data = response.data?.data;
		if (Array.isArray(data)) {
			return data.map((playlist: any) => ({
				id: playlist.id,
				title: playlist.attributes?.name || 'Untitled',
				description: playlist.attributes?.description,
				numberOfTracks: playlist.attributes?.numberOfTracks,
				duration: playlist.attributes?.duration,
				image: playlist.attributes?.image
			}));
		}

		return [];
	} catch (error) {
		console.error('Error fetching playlists:', error);
		return [];
	}
}

/**
 * Get user's favorite artists
 */
export async function getFavoriteArtists(limit = 20): Promise<TidalArtist[]> {
	try {
		const api = getAPIClient();
		const response = await api.GET('/userCollections/{id}/relationships/artists', {
			params: {
				path: { id: 'me' }
				// Note: This endpoint uses cursor-based pagination, not limit
				// We'll fetch the first page of results
			}
		});

		const data = response.data?.data;
		if (Array.isArray(data)) {
			// Limit results client-side since API doesn't support limit param
			return data.slice(0, limit).map((artist: any) => ({
				id: artist.id,
				name: artist.attributes?.name || 'Unknown Artist',
				picture: artist.attributes?.picture
			}));
		}

		return [];
	} catch (error) {
		console.error('Error fetching favorite artists:', error);
		return [];
	}
}

/**
 * Get user's favorite tracks
 */
export async function getFavoriteTracks(limit = 20): Promise<TidalTrack[]> {
	try {
		const api = getAPIClient();
		const response = await api.GET('/userCollections/{id}/relationships/tracks', {
			params: {
				path: { id: 'me' }
				// Note: This endpoint uses cursor-based pagination, not limit
				// We'll fetch the first page of results
			}
		});

		const data = response.data?.data;
		if (Array.isArray(data)) {
			// Limit results client-side since API doesn't support limit param
			return data.slice(0, limit).map((track: any) => ({
				id: track.id,
				title: track.attributes?.title || 'Unknown Track',
				duration: track.attributes?.duration || 0
			}));
		}

		return [];
	} catch (error) {
		console.error('Error fetching favorite tracks:', error);
		return [];
	}
}

/**
 * Extract genres from playlists and tracks
 * This is a simplified version - in reality you'd need to fetch detailed track info
 */
function extractGenres(playlists: TidalPlaylist[]): string[] {
	const genres: string[] = [];

	// Extract genres from playlist descriptions if available
	playlists.forEach(playlist => {
		if (playlist.description) {
			const desc = playlist.description.toLowerCase();
			if (desc.includes('jazz')) genres.push('Jazz');
			if (desc.includes('rock')) genres.push('Rock');
			if (desc.includes('pop')) genres.push('Pop');
			if (desc.includes('electronic')) genres.push('Electronic');
			if (desc.includes('classical')) genres.push('Classical');
			if (desc.includes('hip hop') || desc.includes('rap')) genres.push('Hip Hop');
		}
	});

	// Return unique genres
	return [...new Set(genres)];
}

/**
 * Get a comprehensive view of user's music taste
 */
export async function getUserMusicTaste(): Promise<UserMusicTaste> {
	const [playlists, favoriteArtists, favoriteTracks] = await Promise.all([
		getUserPlaylists(),
		getFavoriteArtists(20),
		getFavoriteTracks(20)
	]);

	const topGenres = extractGenres(playlists);
	const totalTracks = playlists.reduce((sum, p) => sum + (p.numberOfTracks || 0), 0);

	return {
		playlists,
		favoriteArtists,
		favoriteTracks,
		topGenres,
		totalPlaylists: playlists.length,
		totalTracks
	};
}
