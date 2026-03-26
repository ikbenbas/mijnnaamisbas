import { Mistral } from '@mistralai/mistralai';
import { env } from '$env/dynamic/private';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    return { suggestions: null, error: null };
};

export const actions: Actions = {
    suggest: async ({ request }) => {
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

        const client = new Mistral({ apiKey });

        const prompt = `You are a music expert. Suggest 5 Tidal playlist ideas for someone who is in the mood for: ${mood}${genre ? ` (genre: ${genre})` : ''}.

For each playlist, provide:
- A creative playlist name
- A brief description (1-2 sentences)
- 3-5 example artists that would fit

Format your response as a JSON array with objects containing: name, description, artists (array of strings).
Only respond with the JSON array, no other text.`;

        try {
            const response = await client.chat.complete({
                model: 'mistral-small-latest',
                messages: [{ role: 'user', content: prompt }],
                responseFormat: { type: 'json_object' },
            });

            const content = response.choices?.[0]?.message?.content ?? '[]';

            let suggestions;
            try {
                const parsed = JSON.parse(typeof content === 'string' ? content : JSON.stringify(content));
                suggestions = Array.isArray(parsed) ? parsed : (parsed.playlists ?? parsed.suggestions ?? []);
            } catch {
                suggestions = [];
            }

            return { suggestions, error: null };
        } catch (e) {
            console.error('Mistral API error:', e);
            return { suggestions: null, error: 'Failed to generate suggestions. Please try again.' };
        }
    },
};
