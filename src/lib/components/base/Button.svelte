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
		font-family: var(--font-display);
		font-weight: var(--font-weight-normal);
		line-height: 1;
		border: var(--border-width-thick) solid var(--color-border-primary);
		border-radius: 0;
		cursor: pointer;
		transition: transform var(--transition-fast), box-shadow var(--transition-fast), background var(--transition-fast);
		text-decoration: none;
		text-transform: uppercase;
		letter-spacing: 0.03em;
		white-space: nowrap;
		user-select: none;
		position: relative;
	}

	.btn:focus-visible {
		outline: 2px solid var(--color-secondary);
		outline-offset: 2px;
	}

	.btn:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	/* Sizes */
	.btn--sm {
		padding: var(--space-xs) var(--space-md);
		font-size: var(--font-size-xs);
	}

	.btn--md {
		padding: 0.7rem 1.15rem;
		font-size: var(--font-size-sm);
	}

	.btn--lg {
		padding: var(--space-md) var(--space-xl);
		font-size: var(--font-size-base);
	}

	.btn--full-width {
		width: 100%;
	}

	/* Variants */
	.btn--default {
		background: var(--color-offwhite);
		color: var(--color-text-primary);
		box-shadow: var(--shadow-sm);
	}

	.btn--default:hover:not(:disabled) {
		background: var(--color-white);
		transform: translate(-1px, -1px);
		box-shadow: var(--shadow-md);
	}

	.btn--primary {
		background: var(--color-black);
		color: var(--color-offwhite);
		box-shadow: var(--shadow-sm);
	}

	.btn--primary:hover:not(:disabled) {
		background: var(--color-primary-light);
		box-shadow: var(--shadow-md);
		transform: translate(-1px, -1px);
	}

	.btn--secondary {
		background: var(--color-offwhite);
		color: var(--color-text-primary);
		box-shadow: var(--shadow-sm);
	}

	.btn--secondary:hover:not(:disabled) {
		background: var(--color-white);
		transform: translate(-1px, -1px);
		box-shadow: var(--shadow-md);
	}

	.btn--ghost {
		background: transparent;
		color: var(--color-text-primary);
		border-color: transparent;
		box-shadow: none;
	}

	.btn--ghost:hover:not(:disabled) {
		background: var(--color-bg-secondary);
		border-color: var(--color-border-primary);
	}

	.btn--danger {
		background: var(--color-error);
		color: var(--color-text-inverse);
		border-color: var(--color-black);
		box-shadow: var(--shadow-sm);
	}

	.btn--danger:hover:not(:disabled) {
		transform: translate(-1px, -1px);
		box-shadow: var(--shadow-md);
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
