<script lang="ts">
	import { MNBCardPaddingEnum, MNBCardVariantEnum } from './MNBCard.enum';
	import type { MNBCardProps } from './MNBCard.type';

	let {
		variant = MNBCardVariantEnum.DEFAULT,
		padding = MNBCardPaddingEnum.MD,
		hoverable = false,
		clickable = false,
		children,
		header,
		footer,
		onclick,
		class: classes = ''
	}: MNBCardProps = $props();

	const baseClasses = $derived(
		[
			'mnb-card',
			variant,
			`padding-${padding}`,
			hoverable && 'is-hoverable',
			clickable && 'is-clickable',
			classes
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

{#snippet body()}
	{#if header}
		<div class="header">
			{@render header()}
		</div>
	{/if}

	<div class="content">
		{@render children()}
	</div>

	{#if footer}
		<div class="footer">
			{@render footer()}
		</div>
	{/if}
{/snippet}

{#if clickable}
	<button class={baseClasses} {onclick} type="button">
		{@render body()}
	</button>
{:else}
	<div class={baseClasses}>
		{@render body()}
	</div>
{/if}

<style lang="postcss">
	.mnb-card {
		background: var(--mnb-color-offwhite);
		border-radius: var(--mnb-radius);
		transition:
			transform var(--mnb-transition-fast),
			box-shadow var(--mnb-transition-fast);

		&.default,
		&.bordered,
		&.elevated {
			border: var(--mnb-border-width-thick) solid var(--mnb-color-black);
		}

		&.elevated {
			box-shadow: var(--mnb-shadow-md);
		}

		&.padding-none {
			padding: 0;

			.header,
			.content,
			.footer {
				padding: var(--mnb-space-lg);
			}
		}

		&.padding-sm {
			padding: var(--mnb-space-md);
		}

		&.padding-md {
			padding: var(--mnb-space-lg);
		}

		&.padding-lg {
			padding: var(--mnb-space-xl);
		}

		&.is-hoverable:hover {
			box-shadow: var(--mnb-shadow-lg);
			transform: translate(-2px, -2px);
		}

		&.is-clickable {
			cursor: pointer;

			&:focus-visible {
				outline: var(--mnb-border-width-thick) solid var(--mnb-color-black);
				outline-offset: var(--mnb-border-width-thick);
			}
		}
	}

	.header {
		padding-bottom: var(--mnb-space-md);
		border-bottom: var(--mnb-border-width) solid var(--mnb-color-border-secondary);
		margin-bottom: var(--mnb-space-md);
	}

	.footer {
		padding-top: var(--mnb-space-md);
		border-top: var(--mnb-border-width) solid var(--mnb-color-border-secondary);
		margin-top: var(--mnb-space-md);
	}

	@media (prefers-reduced-motion: reduce) {
		.mnb-card,
		.mnb-card.is-hoverable:hover {
			transform: none;
			transition: none;
		}
	}
</style>
