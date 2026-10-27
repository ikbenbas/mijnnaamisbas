import type { PageServerLoad } from './$types';
import { espressoNoteService, completeJson } from '$lib/services';
import { error } from '@sveltejs/kit';
import type { EspressoSuggestionsResponse } from '$lib/types/espresso-suggestions';

export const load: PageServerLoad = async ({ params }) => {
	const note = await espressoNoteService.getById(params.id);

	if (!note) {
		throw error(404, 'Note not found');
	}

	try {
		const completion = await completeJson(`
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
        `);

		if (!completion.ok) {
			return { note, suggestions: null, suggestionsError: completion.error };
		}

		let parsedSuggestions: EspressoSuggestionsResponse | null = null;
		try {
			parsedSuggestions = JSON.parse(completion.content) as EspressoSuggestionsResponse;
		} catch (parseError) {
			console.error('Failed to parse AI suggestions:', parseError);
		}

		return {
			note,
			suggestions: parsedSuggestions,
			suggestionsError: null
		};
	} catch (e) {
		console.error('Mistral API error:', e);
		return {
			note,
			suggestions: null,
			suggestionsError: 'Failed to generate AI suggestions. Please try again.'
		};
	}
};
