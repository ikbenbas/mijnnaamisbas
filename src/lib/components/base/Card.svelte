<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * Card component - A reusable container with consistent styling
	 *
	 * @param variant - Card style variant (default, bordered, elevated)
	 * @param padding - Padding size (none, sm, md, lg)
	 * @param hoverable - Add hover effect
	 * @param clickable - Make card clickable (shows pointer cursor)
	 * @param children - Card content
	 * @param header - Optional header slot
	 * @param footer - Optional footer slot
	 *
	 * @example
	 * ```svelte
	 * <Card variant="elevated" hoverable>
	 *   <h3>Card Title</h3>
	 *   <p>Card content goes here</p>
	 * </Card>
	 * ```
	 */
	interface Props {
		variant?: 'default' | 'bordered' | 'elevated';
		padding?: 'none' | 'sm' | 'md' | 'lg';
		hoverable?: boolean;
		clickable?: boolean;
		children: Snippet;
		header?: Snippet;
		footer?: Snippet;
		onclick?: () => void;
		class?: string;
	}

	let {
		variant = 'default',
		padding = 'md',
		hoverable = false,
		clickable = false,
		children,
		header,
		footer,
		onclick,
		class: className = ''
	}: Props = $props();

	const classes = $derived(
		[
			'card',
			`card--${variant}`,
			`card--padding-${padding}`,
			hoverable && 'card--hoverable',
			clickable && 'card--clickable',
			className
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

{#if clickable}
	<button
		class={classes}
		onclick={onclick}
		type="button"
		onkeydown={(e) => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				onclick?.();
			}
		}}
	>
		{#if header}
			<div class="card__header">
				{@render header()}
			</div>
		{/if}

		<div class="card__content">
			{@render children()}
		</div>

		{#if footer}
			<div class="card__footer">
				{@render footer()}
			</div>
		{/if}
	</button>
{:else}
	<div class={classes}>
		{#if header}
			<div class="card__header">
				{@render header()}
			</div>
		{/if}

		<div class="card__content">
			{@render children()}
		</div>

		{#if footer}
			<div class="card__footer">
				{@render footer()}
			</div>
		{/if}
	</div>
{/if}

<style>
	.card {
		background: var(--color-bg-primary);
		border-radius: var(--radius-lg);
		transition: all var(--transition-fast);
	}

	/* Variants */
	.card--default {
		background: var(--color-bg-primary);
	}

	.card--bordered {
		border: var(--border-width) solid var(--color-border-primary);
	}

	.card--elevated {
		box-shadow: var(--shadow-md);
	}

	/* Padding */
	.card--padding-none {
		padding: 0;
	}

	.card--padding-sm {
		padding: var(--space-md);
	}

	.card--padding-md {
		padding: var(--space-lg);
	}

	.card--padding-lg {
		padding: var(--space-xl);
	}

	/* Interactive states */
	.card--hoverable:hover {
		box-shadow: var(--shadow-lg);
		transform: translateY(-2px);
	}

	.card--clickable {
		cursor: pointer;
	}

	.card--clickable:focus-visible {
		outline: 2px solid var(--color-border-focus);
		outline-offset: 2px;
	}

	/* Card sections */
	.card__header {
		padding-bottom: var(--space-md);
		border-bottom: var(--border-width) solid var(--color-border-secondary);
		margin-bottom: var(--space-md);
	}

	.card__content {
		/* Content inherits padding from card */
	}

	.card__footer {
		padding-top: var(--space-md);
		border-top: var(--border-width) solid var(--color-border-secondary);
		margin-top: var(--space-md);
	}

	/* Remove padding from sections when card has no padding */
	.card--padding-none .card__header,
	.card--padding-none .card__content,
	.card--padding-none .card__footer {
		padding: var(--space-lg);
	}
</style>
