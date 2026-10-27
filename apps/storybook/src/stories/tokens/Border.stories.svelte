<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import TokenGallery from '../../lib/TokenGallery.svelte';

	const { Story } = defineMeta({
		title: 'Tokens/Border',
		component: TokenGallery,
		tags: ['autodocs']
	});
</script>

<Story name="Width" asChild>
	<TokenGallery kind="line" names={['--mnb-border-width', '--mnb-border-width-thick']} />
</Story>

<Story name="Radius" asChild>
	<p class="note">Radius is 0. Corners stay sharp.</p>
	<TokenGallery kind="radius" names={['--mnb-radius']} />
</Story>

<style>
	.note {
		margin: 0 0 var(--mnb-space-md);
		color: var(--mnb-color-text-secondary);
	}
</style>
