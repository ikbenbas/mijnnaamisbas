import { Mistral } from '@mistralai/mistralai';
import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';
import { espressoNoteService } from '$lib/services';
import { error } from '@sveltejs/kit';
import type { EspressoSuggestionsResponse } from '$lib/types/espresso-suggestions';

export const load: PageServerLoad = async ({ params }) => {
	const note = await espressoNoteService.getById(params.id);

	if (!note) {
		throw error(404, 'Note not found');
	}

    const apiKey = env.MISTRAL_API_KEY ?? '';
    if (!apiKey) {
        throw error(404, 'Mistral API key not configured.');
    }

    const client = new Mistral({ apiKey });
    const response = await client.chat.complete({
		model: 'mistral-small-latest',
		messages: [{ role: 'user', content: `
You are an ${note.methodType || 'espresso'} coffee brewing expert. Analyze the following ${note.methodType || 'espresso'} extraction data and provide specific, actionable suggestions for improvement.

COFFEE DATA:
- Method type: ${note.methodType}
- Bean: ${note.bean}
- Roaster: ${note.roaster}
- Grind size: ${note.grindSize}
- Dosage: ${note.dosage}g
- Pressure: ${note.pressure} bar
- Temperature: ${note.temperature}°C
- Brew time: ${note.brewTime}s
- Yield: ${note.yield}g
- Tasting notes: ${note.notes}
- Rating: ${note.rating}/10

Machine: Profitec Go

REQUIRED JSON FORMAT:
{
  "suggestions": [
    {
      "parameter": "parameter_name",
      "current": current_value,
      "recommendation": "specific recommendation",
      "reason": "technical explanation"
    }
  ],
  "additional_tips": {
    "tip_category": "tip description"
  },
  "expected_outcome": "description of expected improvements"
}

GUIDELINES:
- Include suggestions for: grind_size, temperature, brew_time, yield, pressure, dosage
- Use snake_case for parameter names
- Current value should be a number, string, or "undefined"
- Provide specific numeric ranges in recommendations
- Keep explanations concise and technical
- Base suggestions on extraction theory and the rating provided
        `}],
		responseFormat: { type: 'json_object' }
	});

    const suggestionsData = response.choices?.[0]?.message?.content || null;

    let parsedSuggestions: EspressoSuggestionsResponse | null = null;
    if (suggestionsData) {
        try {
            parsedSuggestions = JSON.parse(suggestionsData) as EspressoSuggestionsResponse;
        } catch (e) {
            console.error('Failed to parse AI suggestions:', e);
        }
    }

    return {
        note,
        suggestions: parsedSuggestions
    };
};
