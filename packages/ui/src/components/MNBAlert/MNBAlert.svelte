<script lang="ts">
	import type { MNBAlertProps } from './MNBAlert.type';

	let { children, id, class: classes = '' }: MNBAlertProps = $props();

	const baseClasses = $derived(['mnb-alert', classes].filter(Boolean).join(' '));
</script>

<div {id} class={baseClasses} role="alert">
	{@render children()}
</div>

<style lang="postcss">
	.mnb-alert {
		background: var(--mnb-color-error-light);
		border: var(--mnb-border-width-thick) solid var(--mnb-color-black);
		color: var(--mnb-color-error);
		padding: var(--mnb-space-md);
		margin-bottom: var(--mnb-space-lg);
	}
</style>
