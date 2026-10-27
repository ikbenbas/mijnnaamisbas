<script lang="ts">
	import { onMount } from 'svelte';

	let { name }: { name: string } = $props();

	let value = $state('');

	onMount(() => {
		value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
	});
</script>

<code>{value}</code>

<style>
	code {
		font-family: var(--mnb-font-primary);
		font-size: var(--mnb-font-size-sm);
		color: var(--mnb-color-text-secondary);
	}
</style>
