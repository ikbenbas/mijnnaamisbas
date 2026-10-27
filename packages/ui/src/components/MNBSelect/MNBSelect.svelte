<script lang="ts">
	import type { MNBSelectProps } from './MNBSelect.type';
	import { formAria } from '../../helpers/formAria';

	let {
		value = $bindable(''),
		label,
		hint,
		error,
		required = false,
		disabled = false,
		children,
		id,
		class: classes = '',
		...props
	}: MNBSelectProps = $props();

	const generatedId = `mnb-select-${Math.random().toString(36).slice(2, 9)}`;
	const selectId = $derived(id || generatedId);
	const aria = $derived(formAria({ id: selectId, hint, error, required }));
	const baseClasses = $derived(['mnb-select', classes].filter(Boolean).join(' '));
</script>

<div class={baseClasses}>
	{#if label}
		<label for={selectId} class="label">
			{label}
			{#if required}
				<span class="required" aria-hidden="true">*</span>
			{/if}
		</label>
	{/if}

	<div class="field">
		<select
			bind:value
			id={selectId}
			class={['control', aria.invalid && 'is-invalid']}
			{disabled}
			required={aria.required}
			aria-invalid={aria.invalid}
			aria-describedby={aria.describedBy}
			{...props}
		>
			{@render children()}
		</select>
		<svg
			class="icon"
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
		<p id="{selectId}-hint" class="hint">{hint}</p>
	{/if}

	{#if error}
		<p id="{selectId}-hint" class="error" role="alert">{error}</p>
	{/if}
</div>

<style lang="postcss">
	.mnb-select {
		display: flex;
		flex-direction: column;
		gap: var(--mnb-space-xs);
		width: 100%;
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

	.field {
		position: relative;
		width: 100%;
	}

	.control {
		width: 100%;
		padding: var(--mnb-space-sm) var(--mnb-space-xl) var(--mnb-space-sm) var(--mnb-space-md);
		font-family: var(--mnb-font-primary);
		font-size: var(--mnb-font-size-base);
		line-height: var(--mnb-line-height-normal);
		color: var(--mnb-color-ink);
		background: var(--mnb-color-offwhite);
		border: var(--mnb-border-width) solid var(--mnb-color-black);
		border-radius: var(--mnb-radius);
		transition: border-color var(--mnb-transition-fast), box-shadow var(--mnb-transition-fast);
		appearance: none;
		cursor: pointer;

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

		&:disabled + .icon {
			opacity: 0.5;
		}
	}

	.icon {
		position: absolute;
		right: var(--mnb-space-md);
		top: 50%;
		transform: translateY(-50%);
		pointer-events: none;
		color: var(--mnb-color-text-secondary);
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
