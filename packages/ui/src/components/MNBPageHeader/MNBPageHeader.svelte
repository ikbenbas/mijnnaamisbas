<script lang="ts">
	import type { MNBPageHeaderProps } from './MNBPageHeader.type';

	let { title, lede, actions, class: classes = '' }: MNBPageHeaderProps = $props();

	const baseClasses = $derived(['mnb-page-header', classes].filter(Boolean).join(' '));
</script>

<header class={baseClasses}>
	<div class="copy">
		<h1 class="title">{title}</h1>
		{#if lede}
			<p class="lede">{lede}</p>
		{/if}
	</div>
	{#if actions}
		<div class="actions">
			{@render actions()}
		</div>
	{/if}
</header>

<style lang="postcss">
	.mnb-page-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: var(--mnb-space-md);
		margin-bottom: var(--mnb-space-xl);
	}

	.title {
		margin: 0;
		color: var(--mnb-color-ink);
		font-size: var(--mnb-font-size-4xl);
	}

	.lede {
		margin: var(--mnb-space-sm) 0 0;
		color: var(--mnb-color-text-secondary);
		font-size: var(--mnb-font-size-sm);
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--mnb-space-sm);
	}

	@media (max-width: 768px) {
		.title {
			font-size: var(--mnb-font-size-2xl);
		}
	}
</style>
