<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children, onsubmit }: { children: Snippet; onsubmit?: () => void } = $props();
</script>

<form
	class="form"
	onsubmit={(e) => {
		e.preventDefault();
		onsubmit?.();
	}}
>
	{@render children()}
</form>

<style>
	.form {
		display: grid;
		gap: 16px 0;
	}
</style>
