<script lang="ts">
	import type { MNBInputProps } from './MNBInput.type';
	import { formAria } from '../../helpers/formAria';

	let {
		value = $bindable(''),
		label,
		hint,
		error,
		required = false,
		disabled = false,
		fullWidth = true,
		id,
		class: classes = '',
		...props
	}: MNBInputProps = $props();

	const generatedId = `mnb-input-${Math.random().toString(36).slice(2, 9)}`;
	const inputId = $derived(id || generatedId);
	const aria = $derived(formAria({ id: inputId, hint, error, required }));
	const baseClasses = $derived(['mnb-input', fullWidth && 'is-full', classes].filter(Boolean).join(' '));
</script>

<div class={baseClasses}>
	{#if label}
		<label for={inputId} class="label">
			{label}
			{#if required}
				<span class="required" aria-hidden="true">*</span>
			{/if}
		</label>
	{/if}

	<input
		bind:value
		id={inputId}
		class={['control', aria.invalid && 'is-invalid']}
		{disabled}
		required={aria.required}
		aria-invalid={aria.invalid}
		aria-describedby={aria.describedBy}
		{...props}
	/>

	{#if hint && !error}
		<p id="{inputId}-hint" class="hint">{hint}</p>
	{/if}

	{#if error}
		<p id="{inputId}-hint" class="error" role="alert">{error}</p>
	{/if}
</div>

<style lang="postcss">
	.mnb-input {
		display: flex;
		flex-direction: column;
		gap: var(--mnb-space-xs);

		&.is-full {
			width: 100%;
		}
	}

	.label {
		display: block;
		font-size: var(--mnb-font-size-sm);
		font-weight: var(--mnb-font-weight-bold);
		color: var(--mnb-color-ink);
	}

	.required {
		color: var(--mnb-color-error);
	}

	.control {
		width: 100%;
		padding: var(--mnb-space-sm) var(--mnb-space-md);
		font-family: var(--mnb-font-primary);
		font-size: var(--mnb-font-size-base);
		line-height: var(--mnb-line-height-normal);
		color: var(--mnb-color-ink);
		background: var(--mnb-color-offwhite);
		border: var(--mnb-border-width-thick) solid var(--mnb-color-black);
		border-radius: var(--mnb-radius);
		transition:
			border-color var(--mnb-transition-fast),
			box-shadow var(--mnb-transition-fast);

		&:hover:not(:disabled) {
			border-color: var(--mnb-color-border-secondary);
		}

		&:focus {
			outline: none;
			border-color: var(--mnb-color-black);
			box-shadow: var(--mnb-shadow-focus);
		}

		&:focus-visible {
			outline: var(--mnb-border-width-thick) solid var(--mnb-color-secondary);
			outline-offset: var(--mnb-border-width-thick);
		}

		&:disabled {
			background: var(--mnb-color-paper);
			cursor: not-allowed;
			opacity: 0.6;
		}

		&.is-invalid {
			border-color: var(--mnb-color-error);

			&:focus {
				box-shadow: var(--mnb-shadow-error);
			}
		}

		&[type='number'] {
			appearance: textfield;
			-moz-appearance: textfield;

			&::-webkit-inner-spin-button,
			&::-webkit-outer-spin-button {
				-webkit-appearance: none;
				margin: 0;
			}
		}
	}

	.hint {
		font-size: var(--mnb-font-size-sm);
		color: var(--mnb-color-text-secondary);
		margin: 0;
	}

	.error {
		font-size: var(--mnb-font-size-sm);
		color: var(--mnb-color-error);
		font-weight: var(--mnb-font-weight-medium);
		margin: 0;
	}
</style>
