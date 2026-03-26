<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	/**
	 * Button component - A reusable button following WCAG 2.2 accessibility guidelines
	 *
	 * @param variant - Button style variant (default, primary, secondary, ghost, danger)
	 * @param size - Button size (sm, md, lg)
	 * @param fullWidth - Make button full width
	 * @param disabled - Disable button
	 * @param loading - Show loading state
	 * @param children - Button content
	 * @param onclick - Click handler
	 * @param type - Button type (button, submit, reset)
	 *
	 * @example
	 * ```svelte
	 * <Button variant="primary" onclick={handleClick}>
	 *   Click me
	 * </Button>
	 * ```
	 */
	interface Props extends HTMLButtonAttributes {
		variant?: 'default' | 'primary' | 'secondary' | 'ghost' | 'danger';
		size?: 'sm' | 'md' | 'lg';
		fullWidth?: boolean;
		disabled?: boolean;
		loading?: boolean;
		children: Snippet;
		onclick?: (event: MouseEvent) => void;
		type?: 'button' | 'submit' | 'reset';
	}

	let {
		variant = 'default',
		size = 'md',
		fullWidth = false,
		disabled = false,
		loading = false,
		children,
		onclick,
		type = 'button',
		class: className = '',
		...rest
	}: Props = $props();

	const classes = $derived(
		[
			'btn',
			`btn--${variant}`,
			`btn--${size}`,
			fullWidth && 'btn--full-width',
			loading && 'btn--loading',
			className
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

<button
	class={classes}
	{type}
	disabled={disabled || loading}
	onclick={onclick}
	aria-busy={loading}
	{...rest}
>
	{#if loading}
		<span class="btn__spinner" aria-hidden="true"></span>
	{/if}
	<span class="btn__content" class:btn__content--loading={loading}>
		{@render children()}
	</span>
</button>

<style>
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-sm);
		font-family: var(--font-primary);
		font-weight: var(--font-weight-semibold);
		line-height: 1;
		border: none;
		border-radius: var(--radius-md);
		cursor: pointer;
		transition: all var(--transition-fast);
		text-decoration: none;
		white-space: nowrap;
		user-select: none;
		position: relative;
	}

	.btn:focus-visible {
		outline: 2px solid var(--color-border-focus);
		outline-offset: 2px;
	}

	.btn:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	/* Sizes */
	.btn--sm {
		padding: var(--space-xs) var(--space-md);
		font-size: var(--font-size-sm);
	}

	.btn--md {
		padding: var(--space-sm) var(--space-lg);
		font-size: var(--font-size-base);
	}

	.btn--lg {
		padding: var(--space-md) var(--space-xl);
		font-size: var(--font-size-lg);
	}

	.btn--full-width {
		width: 100%;
	}

	/* Variants */
	.btn--default {
		background: var(--color-bg-secondary);
		color: var(--color-text-primary);
		border: var(--border-width) solid var(--color-border-primary);
	}

	.btn--default:hover:not(:disabled) {
		background: var(--color-bg-tertiary);
	}

	.btn--primary {
		background: var(--gradient-primary);
		color: var(--color-text-inverse);
		box-shadow: var(--shadow-sm);
	}

	.btn--primary:hover:not(:disabled) {
		background: var(--gradient-primary-hover);
		box-shadow: var(--shadow-md);
		transform: translateY(-1px);
	}

	.btn--secondary {
		background: transparent;
		color: var(--color-primary);
		border: var(--border-width-thick) solid var(--color-primary);
	}

	.btn--secondary:hover:not(:disabled) {
		background: var(--color-primary-light);
	}

	.btn--ghost {
		background: transparent;
		color: var(--color-text-primary);
	}

	.btn--ghost:hover:not(:disabled) {
		background: var(--color-bg-secondary);
	}

	.btn--danger {
		background: var(--color-error);
		color: var(--color-text-inverse);
	}

	.btn--danger:hover:not(:disabled) {
		opacity: 0.9;
	}

	/* Loading state */
	.btn--loading {
		cursor: wait;
	}

	.btn__content--loading {
		opacity: 0;
	}

	.btn__spinner {
		position: absolute;
		width: 1em;
		height: 1em;
		border: 2px solid transparent;
		border-top-color: currentColor;
		border-radius: 50%;
		animation: spin 0.6s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
