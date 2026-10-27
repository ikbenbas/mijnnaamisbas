<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import TokenGallery from '../../lib/TokenGallery.svelte';

	const { Story } = defineMeta({
		title: 'Tokens/Shadow',
		component: TokenGallery,
		tags: ['autodocs']
	});
</script>

<Story name="Offsets" asChild>
	<TokenGallery
		kind="shadow"
		names={[
			'--mnb-shadow-sm',
			'--mnb-shadow-md',
			'--mnb-shadow-lg',
			'--mnb-shadow-xl',
			'--mnb-shadow-focus',
			'--mnb-shadow-error'
		]}
	/>
</Story>
