<script lang="ts">
	import type { HTMLSelectAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	/**
	 * Select component - A reusable select dropdown following WCAG 2.2 accessibility guidelines
	 *
	 * @param value - Selected value (bindable)
	 * @param label - Select label
	 * @param hint - Helper text shown below select
	 * @param error - Error message (shows select in error state)
	 * @param required - Mark field as required
	 * @param disabled - Disable select
	 * @param children - Option elements
	 *
	 * @example
	 * ```svelte
	 * <Select bind:value={country} label="Country">
	 *   <option value="">Select a country</option>
	 *   <option value="nl">Netherlands</option>
	 *   <option value="be">Belgium</option>
	 * </Select>
	 * ```
	 */
	interface Props extends HTMLSelectAttributes {
		value?: string | number;
		label?: string;
		hint?: string;
		error?: string;
		required?: boolean;
		disabled?: boolean;
		children: Snippet;
	}

	let {
		value = $bindable(''),
		label,
		hint,
		error,
		required = false,
		disabled = false,
		children,
		id,
		class: className = '',
		...rest
	}: Props = $props();

	const selectId = $derived(id || `select-${Math.random().toString(36).slice(2, 9)}`);
	const hasError = $derived(!!error);
</script>

<div class="select-wrapper">
	{#if label}
		<label for={selectId} class="select-label">
			{label}
			{#if required}
				<span class="select-required" aria-label="required">*</span>
			{/if}
		</label>
	{/if}

	<div class="select-container">
		<select
			bind:value
			id={selectId}
			class="select {className}"
			class:select--error={hasError}
			{disabled}
			{required}
			aria-invalid={hasError}
			aria-describedby={hint || error ? `${selectId}-hint` : undefined}
			{...rest}
		>
			{@render children()}
		</select>
		<svg
			class="select-icon"
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
		>
			<polyline points="6 9 12 15 18 9"></polyline>
		</svg>
	</div>

	{#if hint && !error}
		<p id="{selectId}-hint" class="select-hint">{hint}</p>
	{/if}

	{#if error}
		<p id="{selectId}-hint" class="select-error" role="alert">{error}</p>
	{/if}
</div>

<style>
	.select-wrapper {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		width: 100%;
	}

	.select-label {
		display: block;
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-semibold);
		color: var(--color-text-primary);
	}

	.select-required {
		color: var(--color-error);
	}

	.select-container {
		position: relative;
		width: 100%;
	}

	.select {
		width: 100%;
		padding: var(--space-sm) var(--space-xl) var(--space-sm) var(--space-md);
		font-family: var(--font-primary);
		font-size: var(--font-size-base);
		line-height: var(--line-height-normal);
		color: var(--color-text-primary);
		background: var(--color-bg-primary);
		border: var(--border-width) solid var(--color-border-primary);
		border-radius: var(--radius-md);
		transition: all var(--transition-fast);
		appearance: none;
		cursor: pointer;
	}

	.select:hover:not(:disabled) {
		border-color: var(--color-border-secondary);
	}

	.select:focus {
		outline: none;
		border-color: var(--color-border-focus);
		box-shadow: var(--shadow-focus);
	}

	.select:disabled {
		background: var(--color-bg-secondary);
		cursor: not-allowed;
		opacity: 0.6;
	}

	.select--error {
		border-color: var(--color-error);
	}

	.select--error:focus {
		box-shadow: 0 0 0 3px oklch(0.60 0.20 25 / 0.3);
	}

	.select-icon {
		position: absolute;
		right: var(--space-md);
		top: 50%;
		transform: translateY(-50%);
		pointer-events: none;
		color: var(--color-text-secondary);
	}

	.select:disabled + .select-icon {
		opacity: 0.5;
	}

	.select-hint {
		font-size: var(--font-size-sm);
		color: var(--color-text-secondary);
		margin: 0;
	}

	.select-error {
		font-size: var(--font-size-sm);
		color: var(--color-error);
		font-weight: var(--font-weight-medium);
		margin: 0;
	}
</style>
