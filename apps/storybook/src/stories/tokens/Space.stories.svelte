<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import TokenGallery from '../../lib/TokenGallery.svelte';

	const { Story } = defineMeta({
		title: 'Tokens/Space',
		component: TokenGallery,
		tags: ['autodocs']
	});

	const spaces = [
		'--mnb-space-xs',
		'--mnb-space-sm',
		'--mnb-space-md',
		'--mnb-space-lg',
		'--mnb-space-xl',
		'--mnb-space-2xl',
		'--mnb-space-3xl'
	];
</script>

<Story name="Scale" asChild>
	<TokenGallery names={spaces} kind="space" />
</Story>
