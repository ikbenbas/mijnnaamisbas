/**
 * Represents a single parameter suggestion from the AI
 */
export interface EspressoSuggestion {
	parameter: string;
	current: number | string | null;
	recommendation: string;
	reason: string;
}

/**
 * Additional tips that don't fit into specific parameters
 */
export interface AdditionalTips {
	[key: string]: string;
}

/**
 * Complete AI suggestions response for espresso improvements
 */
export interface EspressoSuggestionsResponse {
	suggestions: EspressoSuggestion[];
	additional_tips?: AdditionalTips;
	expected_outcome?: string;
}
