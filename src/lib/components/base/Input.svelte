<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	/**
	 * Input component - A reusable text input following WCAG 2.2 accessibility guidelines
	 *
	 * @param value - Input value (bindable)
	 * @param label - Input label
	 * @param hint - Helper text shown below input
	 * @param error - Error message (shows input in error state)
	 * @param required - Mark field as required
	 * @param disabled - Disable input
	 * @param fullWidth - Make input full width
	 *
	 * @example
	 * ```svelte
	 * <Input bind:value={email} label="Email" type="email" required />
	 * ```
	 */
	interface Props extends HTMLInputAttributes {
		value?: string | number;
		label?: string;
		hint?: string;
		error?: string;
		required?: boolean;
		disabled?: boolean;
		fullWidth?: boolean;
	}

	let {
		value = $bindable(''),
		label,
		hint,
		error,
		required = false,
		disabled = false,
		fullWidth = true,
		id,
		class: className = '',
		...rest
	}: Props = $props();

	const inputId = $derived(id || `input-${Math.random().toString(36).slice(2, 9)}`);
	const hasError = $derived(!!error);
</script>

<div class="input-wrapper" class:input-wrapper--full-width={fullWidth}>
	{#if label}
		<label for={inputId} class="input-label">
			{label}
			{#if required}
				<span class="input-required" aria-label="required">*</span>
			{/if}
		</label>
	{/if}

	<input
		bind:value
		id={inputId}
		class="input {className}"
		class:input--error={hasError}
		{disabled}
		{required}
		aria-invalid={hasError}
		aria-describedby={hint || error ? `${inputId}-hint` : undefined}
		{...rest}
	/>

	{#if hint && !error}
		<p id="{inputId}-hint" class="input-hint">{hint}</p>
	{/if}

	{#if error}
		<p id="{inputId}-hint" class="input-error" role="alert">{error}</p>
	{/if}
</div>

<style>
	.input-wrapper {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.input-wrapper--full-width {
		width: 100%;
	}

	.input-label {
		display: block;
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-semibold);
		color: var(--color-text-primary);
	}

	.input-required {
		color: var(--color-error);
	}

	.input {
		width: 100%;
		padding: var(--space-sm) var(--space-md);
		font-family: var(--font-primary);
		font-size: var(--font-size-base);
		line-height: var(--line-height-normal);
		color: var(--color-text-primary);
		background: var(--color-bg-primary);
		border: var(--border-width) solid var(--color-border-primary);
		border-radius: var(--radius-md);
		transition: all var(--transition-fast);
	}

	.input:hover:not(:disabled) {
		border-color: var(--color-border-secondary);
	}

	.input:focus {
		outline: none;
		border-color: var(--color-border-focus);
		box-shadow: var(--shadow-focus);
	}

	.input:disabled {
		background: var(--color-bg-secondary);
		cursor: not-allowed;
		opacity: 0.6;
	}

	.input--error {
		border-color: var(--color-error);
	}

	.input--error:focus {
		box-shadow: 0 0 0 3px oklch(0.60 0.20 25 / 0.3);
	}

	.input-hint {
		font-size: var(--font-size-sm);
		color: var(--color-text-secondary);
		margin: 0;
	}

	.input-error {
		font-size: var(--font-size-sm);
		color: var(--color-error);
		font-weight: var(--font-weight-medium);
		margin: 0;
	}

	/* Support for different input types */
	.input[type='number']::-webkit-inner-spin-button,
	.input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	.input[type='number'] {
		-moz-appearance: textfield;
	}
</style>
