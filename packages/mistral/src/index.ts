import { Mistral } from '@mistralai/mistralai';

export type MistralCompletion = { ok: true; content: string } | { ok: false; error: string };

const textContent = (raw: unknown) => (typeof raw === 'string' ? raw : JSON.stringify(raw));

const failureMessage = (error: unknown) => {
	const rateLimited =
		error !== null && typeof error === 'object' && 'statusCode' in error && error.statusCode === 429;

	return rateLimited
		? 'AI suggestions temporarily unavailable (rate limited). Try again shortly.'
		: 'Failed to generate suggestions. Please try again.';
};

/**
 * Ask Mistral for a JSON response.
 * The caller passes the API key so this package never reads `$env`.
 * @param prompt - Full user prompt, including the expected JSON shape
 * @param apiKey - Mistral API key from the app's private env
 */
export const completeJson = async (
	prompt: string,
	apiKey: string | undefined
): Promise<MistralCompletion> => {
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
		return { ok: true, content: textContent(raw) };
	} catch (error) {
		console.error('Mistral API error:', error);
		return { ok: false, error: failureMessage(error) };
	}
};
