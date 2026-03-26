<script lang="ts">
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	/**
	 * Textarea component - A reusable textarea following WCAG 2.2 accessibility guidelines
	 *
	 * @param value - Textarea value (bindable)
	 * @param label - Textarea label
	 * @param hint - Helper text shown below textarea
	 * @param error - Error message (shows textarea in error state)
	 * @param required - Mark field as required
	 * @param disabled - Disable textarea
	 * @param rows - Number of visible text lines
	 *
	 * @example
	 * ```svelte
	 * <Textarea bind:value={description} label="Description" rows={5} />
	 * ```
	 */
	interface Props extends HTMLTextareaAttributes {
		value?: string;
		label?: string;
		hint?: string;
		error?: string;
		required?: boolean;
		disabled?: boolean;
		rows?: number;
	}

	let {
		value = $bindable(''),
		label,
		hint,
		error,
		required = false,
		disabled = false,
		rows = 4,
		id,
		class: className = '',
		...rest
	}: Props = $props();

	const textareaId = $derived(id || `textarea-${Math.random().toString(36).slice(2, 9)}`);
	const hasError = $derived(!!error);
</script>

<div class="textarea-wrapper">
	{#if label}
		<label for={textareaId} class="textarea-label">
			{label}
			{#if required}
				<span class="textarea-required" aria-label="required">*</span>
			{/if}
		</label>
	{/if}

	<textarea
		bind:value
		id={textareaId}
		class="textarea {className}"
		class:textarea--error={hasError}
		{disabled}
		{required}
		{rows}
		aria-invalid={hasError}
		aria-describedby={hint || error ? `${textareaId}-hint` : undefined}
		{...rest}
	></textarea>

	{#if hint && !error}
		<p id="{textareaId}-hint" class="textarea-hint">{hint}</p>
	{/if}

	{#if error}
		<p id="{textareaId}-hint" class="textarea-error" role="alert">{error}</p>
	{/if}
</div>

<style>
	.textarea-wrapper {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		width: 100%;
	}

	.textarea-label {
		display: block;
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-semibold);
		color: var(--color-text-primary);
	}

	.textarea-required {
		color: var(--color-error);
	}

	.textarea {
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
		resize: vertical;
	}

	.textarea:hover:not(:disabled) {
		border-color: var(--color-border-secondary);
	}

	.textarea:focus {
		outline: none;
		border-color: var(--color-border-focus);
		box-shadow: var(--shadow-focus);
	}

	.textarea:disabled {
		background: var(--color-bg-secondary);
		cursor: not-allowed;
		opacity: 0.6;
	}

	.textarea--error {
		border-color: var(--color-error);
	}

	.textarea--error:focus {
		box-shadow: 0 0 0 3px oklch(0.60 0.20 25 / 0.3);
	}

	.textarea-hint {
		font-size: var(--font-size-sm);
		color: var(--color-text-secondary);
		margin: 0;
	}

	.textarea-error {
		font-size: var(--font-size-sm);
		color: var(--color-error);
		font-weight: var(--font-weight-medium);
		margin: 0;
	}
</style>
