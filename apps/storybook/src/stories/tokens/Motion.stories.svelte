<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import TokenGallery from '../../lib/TokenGallery.svelte';

	const { Story } = defineMeta({
		title: 'Tokens/Motion',
		component: TokenGallery,
		tags: ['autodocs']
	});

	const motions = ['--mnb-transition-fast', '--mnb-transition-base', '--mnb-transition-slow'];
</script>

<Story name="Durations" asChild>
	<ul>
		{#each motions as name (name)}
			<li>
				<span class="box" style:transition={`transform var(${name}), box-shadow var(${name})`}></span>
				<code>{name}</code>
			</li>
		{/each}
	</ul>
</Story>

<style>
	ul {
		display: grid;
		gap: var(--mnb-space-lg);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li {
		display: flex;
		align-items: center;
		gap: var(--mnb-space-md);
	}

	.box {
		width: var(--mnb-space-3xl);
		height: var(--mnb-space-xl);
		background: var(--mnb-color-black);
		box-shadow: var(--mnb-shadow-sm);
	}

	.box:hover {
		transform: translate(-1px, -1px);
		box-shadow: var(--mnb-shadow-md);
	}

	code {
		font-family: var(--mnb-font-primary);
		font-size: var(--mnb-font-size-sm);
	}

	@media (prefers-reduced-motion: reduce) {
		.box,
		.box:hover {
			transform: none;
			transition: none;
		}
	}
</style>
