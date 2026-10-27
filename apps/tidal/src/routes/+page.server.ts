import { completeJson } from '@mnb/mistral';
import { fail } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';

import { env } from '$env/dynamic/private';
import { type UserMusicTaste, getUserMusicTaste, isAuthenticated } from '$lib/tidal';

export const load: PageServerLoad = async ({ cookies, url }) => {
	const tidalConnected = cookies.get('tidal_connected') === 'true';
	const connected = url.searchParams.get('connected');
	const error = url.searchParams.get('error');

	let authenticated = false;
	let userTaste: UserMusicTaste | null = null;

	if (tidalConnected) {
		try {
			authenticated = await isAuthenticated();
			if (authenticated) {
				// Fetch user's music taste
				userTaste = await getUserMusicTaste();
			}
		} catch (error_) {
			console.error('Error checking Tidal auth:', error_);
			authenticated = false;
		}
	}

	return {
		authenticated,
		userTaste,
		justConnected: connected === 'true',
		error: error || null,
		suggestions: null
	};
};

const loadTaste = async (cookies: { get: (name: string) => string | undefined }) => {
	if (cookies.get('tidal_connected') !== 'true') return null;

	try {
		const authenticated = await isAuthenticated();
		return authenticated ? await getUserMusicTaste() : null;
	} catch (error) {
		console.error('Error fetching user taste:', error);
		return null;
	}
};

const personalizedPrompt = (userTaste: UserMusicTaste, mood: string, genre: string) => {
	const playlistNames = userTaste.playlists.slice(0, 10).map(p => p.title).join(', ');
	const artistNames = userTaste.favoriteArtists.slice(0, 10).map(a => a.name).join(', ');
	const genres = userTaste.topGenres.join(', ');

	return `You are a music expert analyzing a Tidal user's music library.

USER'S MUSIC PROFILE:
- Total playlists: ${userTaste.totalPlaylists}
- Total tracks: ${userTaste.totalTracks}
${artistNames ? `- Favorite artists: ${artistNames}` : ''}
${playlistNames ? `- Playlist examples: ${playlistNames}` : ''}
${genres ? `- Top genres: ${genres}` : ''}

REQUEST: The user wants artist and song suggestions for: ${mood}${genre ? ` (genre: ${genre})` : ''}

Based on their existing music taste, suggest 5 new playlist ideas that:
1. Complement (no duplicates) their current collection
2. Match the requested mood/genre
3. Introduce them to new artists similar to their favorites

For each playlist, provide:
- A creative playlist name in Dutch
- A brief description (1-2 sentences)
- 10-15 example artists that would fit (mix of familiar and new)

Format your response as a JSON array with objects containing: name, description, artists (array of strings).
Only respond with the JSON array, no other text.`;
};

const promptFor = (userTaste: UserMusicTaste | null, mood: string, genre: string) =>
	userTaste && userTaste.totalPlaylists > 0
		? personalizedPrompt(userTaste, mood, genre)
		: genericPrompt(mood, genre);

const suggestionsFrom = (content: string) => {
	try {
		const parsed = JSON.parse(content);
		if (Array.isArray(parsed)) return parsed;
		return parsed.playlists ?? parsed.suggestions ?? [];
	} catch {
		return [];
	}
};

const field = (formData: FormData, name: string) => formData.get(name)?.toString().trim() ?? '';

const genericPrompt = (mood: string, genre: string) =>
	`You are a music expert. Suggest 5 Tidal playlist ideas for someone who is in the mood for: ${mood}${genre ? ` (genre: ${genre})` : ''}.

For each playlist, provide:
- A creative playlist name in Dutch
- A brief description (1-2 sentences)
- 10-15 example artists that would fit

Format your response as a JSON array with objects containing: name, description, artists (array of strings).
Only respond with the JSON array, no other text.`;

export const actions: Actions = {
	suggest: async ({ request, cookies }) => {
		const formData = await request.formData();
		const mood = field(formData, 'mood');
		const genre = field(formData, 'genre');

		if (!mood && !genre) {
			return fail(400, {
				mood,
				genre,
				suggestions: null,
				error: 'Please provide a mood or genre.'
			});
		}

		const userTaste = await loadTaste(cookies);
		const completion = await completeJson(promptFor(userTaste, mood, genre), env.MISTRAL_API_KEY);
		if (!completion.ok) {
			return fail(502, { mood, genre, suggestions: null, error: completion.error });
		}

		return {
			suggestions: suggestionsFrom(completion.content),
			mood,
			genre,
			error: null,
			personalized: userTaste !== null
		};
	}
};
