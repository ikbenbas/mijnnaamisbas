<script lang="ts">
	import type { MNBFormProps } from './MNBForm.type';

	let { children, onsubmit, class: classes = '', ...props }: MNBFormProps = $props();

	const baseClasses = $derived(['mnb-form', classes].filter(Boolean).join(' '));
</script>

<form
	class={baseClasses}
	onsubmit={(event) => {
		event.preventDefault();
		onsubmit?.(event);
	}}
	{...props}
>
	{@render children()}
</form>

<style lang="postcss">
	.mnb-form {
		display: flex;
		flex-direction: column;
		gap: var(--mnb-space-lg);
		width: 100%;
	}
</style>
