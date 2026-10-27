# AI Prompt Guidelines for Espresso Suggestions

## TypeScript Types

The AI response should conform to the following TypeScript interfaces:

```typescript
interface EspressoSuggestion {
	parameter: string;
	current: number | string | null;
	recommendation: string;
	reason: string;
}

interface AdditionalTips {
	[key: string]: string;
}

interface EspressoSuggestionsResponse {
	suggestions: EspressoSuggestion[];
	additional_tips?: AdditionalTips;
	expected_outcome?: string;
}
```

## Prompt Best Practices

### ✅ DO: Provide Clear Structure

```typescript
const prompt = `
You are an espresso brewing expert. Analyze the data and provide specific suggestions.

ESPRESSO DATA:
- Parameter: value
...

REQUIRED JSON FORMAT:
{
  "suggestions": [...],
  "additional_tips": {...},
  "expected_outcome": "..."
}

GUIDELINES:
- Use snake_case for parameter names
- Include specific numeric ranges
- Keep explanations concise
`;
```

### ✅ DO: Specify responseFormat

```typescript
const response = await client.chat.complete({
	model: 'mistral-small-latest',
	messages: [{ role: 'user', content: prompt }],
	responseFormat: { type: 'json_object' } // Critical for consistent JSON output
});
```

### ✅ DO: Include Example Output

Add an example in the prompt:

```
EXAMPLE OUTPUT:
{
  "suggestions": [
    {
      "parameter": "grind_size",
      "current": 2,
      "recommendation": "Decrease to 1-1.5 (finer)",
      "reason": "Increases extraction time"
    }
  ],
  "additional_tips": {
    "bean_freshness": "Check roast date"
  },
  "expected_outcome": "More balanced flavor"
}
```

### ❌ DON'T: Use Vague Prompts

```typescript
// Bad: Unclear output format
const prompt = `I made an espresso. How can I improve it?`;

// Good: Clear structure and expectations
const prompt = `Analyze this espresso and return JSON with suggestions array...`;
```

### ❌ DON'T: Forget Type Safety

```typescript
// Bad: No type checking
const suggestions = JSON.parse(response.content);

// Good: Type-safe parsing
const suggestions = JSON.parse(response.content) as EspressoSuggestionsResponse;
```

## Key Elements for Consistent Output

1. **Role Definition**: "You are an espresso brewing expert..."
2. **Data Structure**: Clear data presentation with labels
3. **Required Format**: Explicit JSON schema in the prompt
4. **Guidelines**: Specific rules (snake_case, numeric ranges, etc.)
5. **Response Format**: `responseFormat: { type: 'json_object' }`
6. **Example Output**: Show exactly what you expect

## Testing the Prompt

1. Test with various input scenarios (good/bad shots, missing data)
2. Verify JSON structure matches TypeScript types
3. Check for edge cases (null values, undefined parameters)
4. Validate array structure is consistent
5. Ensure additional_tips uses consistent key naming

## Error Handling

```typescript
try {
	const parsed = JSON.parse(response.content) as EspressoSuggestionsResponse;

	// Validate structure
	if (!Array.isArray(parsed.suggestions)) {
		throw new Error('Invalid suggestions format');
	}

	return parsed;
} catch (error) {
	console.error('Failed to parse AI response:', error);
	return null;
}
```
