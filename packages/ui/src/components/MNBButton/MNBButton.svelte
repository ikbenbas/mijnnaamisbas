<script lang="ts">
	import { MNBButtonSizeEnum, MNBButtonVariantEnum } from './MNBButton.enum';
	import type { MNBButtonProps } from './MNBButton.type';

	let {
		href,
		variant = MNBButtonVariantEnum.DEFAULT,
		size = MNBButtonSizeEnum.MD,
		fullWidth = false,
		disabled = false,
		loading = false,
		children,
		onclick,
		type = 'button',
		class: classes = '',
		...props
	}: MNBButtonProps = $props();

	const baseClasses = $derived(
		['mnb-button', variant, size, fullWidth && 'is-full', loading && 'loading', classes]
			.filter(Boolean)
			.join(' ')
	);

	const busy = $derived(disabled || loading);
</script>

{#snippet content()}
	{#if loading}
		<span class="spinner" aria-hidden="true"></span>
	{/if}
	<span class="label" class:loading>
		{@render children()}
	</span>
{/snippet}

{#if href}
	<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- caller passes resolve() -->
	<a
		{href}
		class={baseClasses}
		aria-disabled={busy}
		aria-busy={loading}
		onclick={(event) => {
			if (busy) event.preventDefault();
			onclick?.(event);
		}}
	>
		{@render content()}
	</a>
{:else}
	<button class={baseClasses} {type} disabled={busy} {onclick} aria-busy={loading} {...props}>
		{@render content()}
	</button>
{/if}

<style lang="postcss">
	.mnb-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--mnb-space-sm);
		padding: var(--mnb-space-sm) var(--mnb-space-lg);
		font-family: var(--mnb-font-display);
		font-size: var(--mnb-font-size-sm);
		font-weight: var(--mnb-font-weight-normal);
		line-height: var(--mnb-line-height-tight);
		letter-spacing: var(--mnb-letter-spacing-wide);
		text-decoration: none;
		text-transform: uppercase;
		white-space: nowrap;
		user-select: none;
		position: relative;
		border: var(--mnb-border-width-thick) solid var(--mnb-color-black);
		border-radius: var(--mnb-radius);
		cursor: pointer;
		transition:
			transform var(--mnb-transition-fast),
			box-shadow var(--mnb-transition-fast),
			background var(--mnb-transition-fast);

		&:focus-visible {
			outline: var(--mnb-border-width-thick) solid var(--mnb-color-secondary);
			outline-offset: var(--mnb-border-width-thick);
		}

		&:disabled {
			cursor: not-allowed;
			opacity: 0.5;
		}

		&.sm {
			padding: var(--mnb-space-xs) var(--mnb-space-md);
			font-size: var(--mnb-font-size-xs);
		}

		&.lg {
			padding: var(--mnb-space-md) var(--mnb-space-xl);
			font-size: var(--mnb-font-size-base);
		}

		&.is-full {
			width: 100%;
		}

		&.default,
		&.secondary {
			background: var(--mnb-color-offwhite);
			color: var(--mnb-color-ink);
			box-shadow: var(--mnb-shadow-sm);

			&:hover:not(:disabled) {
				background: var(--mnb-color-white);
				transform: translate(-1px, -1px);
				box-shadow: var(--mnb-shadow-md);
			}
		}

		&.primary {
			background: var(--mnb-color-black);
			color: var(--mnb-color-offwhite);
			box-shadow: var(--mnb-shadow-sm);

			&:hover:not(:disabled) {
				background: var(--mnb-color-primary-light);
				box-shadow: var(--mnb-shadow-md);
				transform: translate(-1px, -1px);
			}
		}

		&.ghost {
			background: transparent;
			color: var(--mnb-color-ink);
			border-color: transparent;
			box-shadow: none;

			&:hover:not(:disabled) {
				background: var(--mnb-color-paper);
				border-color: var(--mnb-color-black);
			}
		}

		&.danger {
			background: var(--mnb-color-error);
			color: var(--mnb-color-offwhite);
			border-color: var(--mnb-color-black);
			box-shadow: var(--mnb-shadow-sm);

			&:hover:not(:disabled) {
				transform: translate(-1px, -1px);
				box-shadow: var(--mnb-shadow-md);
			}
		}

		&.loading {
			cursor: wait;
		}
	}

	.label.loading {
		opacity: 0;
	}

	.spinner {
		position: absolute;
		width: 1em;
		height: 1em;
		border: var(--mnb-border-width-thick) solid transparent;
		border-top-color: currentColor;
		border-radius: 50%;
		animation: spin 0.6s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.mnb-button,
		.mnb-button:hover {
			transform: none;
			transition: none;
		}

		.spinner {
			animation: none;
		}
	}
</style>
