<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import TokenGallery from '../../lib/TokenGallery.svelte';

	const { Story } = defineMeta({
		title: 'Tokens/Color',
		component: TokenGallery,
		tags: ['autodocs']
	});

	const colors = [
		'--mnb-color-ink',
		'--mnb-color-black',
		'--mnb-color-white',
		'--mnb-color-offwhite',
		'--mnb-color-paper',
		'--mnb-color-bg-tertiary',
		'--mnb-color-primary-light',
		'--mnb-color-primary-hover',
		'--mnb-color-secondary',
		'--mnb-color-secondary-light',
		'--mnb-color-secondary-dark',
		'--mnb-color-secondary-hover',
		'--mnb-color-text-secondary',
		'--mnb-color-text-tertiary',
		'--mnb-color-success',
		'--mnb-color-error',
		'--mnb-color-error-light',
		'--mnb-color-rating',
		'--mnb-color-border-secondary',
		'--mnb-color-hero-mid',
		'--mnb-color-hero-end'
	];
</script>

<Story name="Palette" asChild>
	<TokenGallery names={colors} kind="color" />
</Story>

<Story name="Dot pattern" asChild>
	<div class="dots"></div>
</Story>

<style>
	.dots {
		height: var(--mnb-space-3xl);
		background-color: var(--mnb-color-offwhite);
		background-image: var(--mnb-pattern-dots);
		background-size: var(--mnb-pattern-dots-size);
		border: var(--mnb-border-width-thick) solid var(--mnb-color-black);
	}
</style>
