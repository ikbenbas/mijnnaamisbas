<script lang="ts">
	import type { MNBEmptyStateProps } from './MNBEmptyState.type';

	let { message, actions, class: classes = '' }: MNBEmptyStateProps = $props();

	const baseClasses = $derived(['mnb-empty', classes].filter(Boolean).join(' '));
</script>

<div class={baseClasses}>
	<p class="message">{message}</p>
	{#if actions}
		<div class="actions">
			{@render actions()}
		</div>
	{/if}
</div>

<style lang="postcss">
	.mnb-empty {
		text-align: center;
		padding: var(--mnb-space-3xl) var(--mnb-space-xl);
		background: var(--mnb-color-offwhite);
		border: var(--mnb-border-width-thick) solid var(--mnb-color-black);
		box-shadow: var(--mnb-shadow-sm);
	}

	.message {
		color: var(--mnb-color-text-secondary);
		margin: 0;
		font-size: var(--mnb-font-size-lg);
	}

	.actions {
		margin-top: var(--mnb-space-lg);
	}
</style>
