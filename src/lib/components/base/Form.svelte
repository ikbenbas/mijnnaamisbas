<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * Form component - A reusable form wrapper
	 *
	 * @param children - Form content
	 * @param onsubmit - Submit handler
	 * @param novalidate - Disable HTML5 validation
	 *
	 * @example
	 * ```svelte
	 * <Form onsubmit={handleSubmit}>
	 *   <Input bind:value={name} label="Name" />
	 *   <Button type="submit">Submit</Button>
	 * </Form>
	 * ```
	 */
	let {
		children,
		onsubmit
	}: {
		children: Snippet;
		onsubmit?: (event: SubmitEvent) => void;
		novalidate?: boolean;
	} = $props();
</script>

<form
	class="form"
	onsubmit={(e) => {
		e.preventDefault();
		onsubmit?.(e);
	}}
>
	{@render children()}
</form>

<style>
	.form {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
		width: 100%;
	}
</style>
