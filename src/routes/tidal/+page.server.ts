import { Mistral } from '@mistralai/mistralai';
import { env } from '$env/dynamic/private';
import type { Actions, PageServerLoad } from './$types';
import { isAuthenticated, getUserMusicTaste } from '$lib/tidal';
import type { UserMusicTaste } from '$lib/tidal';

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
		} catch (err) {
			console.error('Error checking Tidal auth:', err);
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

export const actions: Actions = {
	suggest: async ({ request, cookies }) => {
		const formData = await request.formData();
		const mood = formData.get('mood')?.toString().trim() ?? '';
		const genre = formData.get('genre')?.toString().trim() ?? '';

		if (!mood && !genre) {
			return { suggestions: null, error: 'Please provide a mood or genre.' };
		}

		const apiKey = env.MISTRAL_API_KEY ?? '';
		if (!apiKey) {
			return { suggestions: null, error: 'Mistral API key not configured.' };
		}

		// Check if user is authenticated with Tidal
		const tidalConnected = cookies.get('tidal_connected') === 'true';
		let userTaste: UserMusicTaste | null = null;

		if (tidalConnected) {
			try {
				const authenticated = await isAuthenticated();
				if (authenticated) {
					userTaste = await getUserMusicTaste();
				}
			} catch (err) {
				console.error('Error fetching user taste:', err);
			}
		}

		const client = new Mistral({ apiKey });

		// Build enhanced prompt with user data
		let prompt = '';

		if (userTaste && userTaste.totalPlaylists > 0) {
			// Personalized prompt with user's actual music taste
			const playlistNames = userTaste.playlists.slice(0, 10).map(p => p.title).join(', ');
			const artistNames = userTaste.favoriteArtists.slice(0, 10).map(a => a.name).join(', ');
			const genres = userTaste.topGenres.join(', ');

			prompt = `You are a music expert analyzing a Tidal user's music library.

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
		} else {
			// Generic prompt for users not connected to Tidal
			prompt = `You are a music expert. Suggest 5 Tidal playlist ideas for someone who is in the mood for: ${mood}${genre ? ` (genre: ${genre})` : ''}.

For each playlist, provide:
- A creative playlist name in Dutch
- A brief description (1-2 sentences)
- 10-15 example artists that would fit

Format your response as a JSON array with objects containing: name, description, artists (array of strings).
Only respond with the JSON array, no other text.`;
		}
console.log(prompt)
		try {
			const response = await client.chat.complete({
				model: 'mistral-small-latest',
				messages: [{ role: 'user', content: prompt }],
				responseFormat: { type: 'json_object' }
			});

			const content = response.choices?.[0]?.message?.content ?? '[]';

			let suggestions;
			try {
				const parsed = JSON.parse(typeof content === 'string' ? content : JSON.stringify(content));
				suggestions = Array.isArray(parsed)
					? parsed
					: parsed.playlists ?? parsed.suggestions ?? [];
			} catch {
				suggestions = [];
			}

			return { suggestions, error: null, personalized: userTaste !== null };
		} catch (e) {
			console.error('Mistral API error:', e);
			return { suggestions: null, error: 'Failed to generate suggestions. Please try again.' };
		}
	}
};
