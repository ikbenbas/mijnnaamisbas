import { Mistral } from '@mistralai/mistralai';
import { env } from '$env/dynamic/private';

export type MistralCompletion = { ok: true; content: string } | { ok: false; error: string };

/**
 * Ask Mistral for a JSON response.
 * Server-only: reads MISTRAL_API_KEY from the private env.
 * @param prompt - Full user prompt, including the expected JSON shape
 */
export const completeJson = async (prompt: string): Promise<MistralCompletion> => {
	const apiKey = env.MISTRAL_API_KEY ?? '';
	if (!apiKey) {
		return { ok: false, error: 'Mistral API key not configured.' };
	}

	try {
		const client = new Mistral({ apiKey });
		const response = await client.chat.complete({
			model: 'mistral-small-latest',
			messages: [{ role: 'user', content: prompt }],
			responseFormat: { type: 'json_object' }
		});
		const raw = response.choices?.[0]?.message?.content ?? '';
		const content = typeof raw === 'string' ? raw : JSON.stringify(raw);
		return { ok: true, content };
	} catch (error) {
		console.error('Mistral API error:', error);
		const rateLimited =
			error !== null && typeof error === 'object' && 'statusCode' in error && error.statusCode === 429;

		return {
			ok: false,
			error: rateLimited
				? 'AI suggestions temporarily unavailable (rate limited). Try again shortly.'
				: 'Failed to generate suggestions. Please try again.'
		};
	}
};
