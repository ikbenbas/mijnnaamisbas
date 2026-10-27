<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import TokenGallery from '../../lib/TokenGallery.svelte';

	const { Story } = defineMeta({
		title: 'Tokens/Layout',
		component: TokenGallery,
		tags: ['autodocs']
	});
</script>

<Story name="Widths" asChild>
	<TokenGallery
		kind="text"
		names={[
			'--mnb-max-width-sm',
			'--mnb-max-width-md',
			'--mnb-max-width-lg',
			'--mnb-max-width-xl',
			'--mnb-max-width-2xl',
			'--mnb-container-padding',
			'--mnb-nav-height'
		]}
	/>
</Story>

<Story name="Stacking" asChild>
	<TokenGallery
		kind="text"
		names={[
			'--mnb-z-dropdown',
			'--mnb-z-sticky',
			'--mnb-z-fixed',
			'--mnb-z-modal-backdrop',
			'--mnb-z-modal',
			'--mnb-z-popover',
			'--mnb-z-tooltip'
		]}
	/>
</Story>
