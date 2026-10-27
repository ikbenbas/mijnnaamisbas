/**
 * Wires hint and error text to a field.
 * A visible `<label for>` supplies the accessible name. This helper does not set `aria-label`.
 */
export const formAria = ({
	id,
	hint,
	error,
	required = false
}: {
	id: string;
	hint?: string;
	error?: string;
	required?: boolean;
}) => ({
	describedBy: hint || error ? `${id}-hint` : undefined,
	invalid: Boolean(error),
	required
});
