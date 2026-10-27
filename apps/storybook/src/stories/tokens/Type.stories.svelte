<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import TokenGallery from '../../lib/TokenGallery.svelte';

	const { Story } = defineMeta({
		title: 'Tokens/Type',
		component: TokenGallery,
		tags: ['autodocs']
	});
</script>

<Story name="Families" asChild>
	<TokenGallery
		kind="font"
		names={['--mnb-font-display', '--mnb-font-primary', '--mnb-font-handjet']}
	/>
</Story>

<Story name="Sizes" asChild>
	<TokenGallery
		kind="size"
		names={[
			'--mnb-font-size-xs',
			'--mnb-font-size-sm',
			'--mnb-font-size-base',
			'--mnb-font-size-lg',
			'--mnb-font-size-xl',
			'--mnb-font-size-2xl',
			'--mnb-font-size-3xl',
			'--mnb-font-size-4xl',
			'--mnb-font-size-5xl'
		]}
	/>
</Story>

<Story name="Weight, line height, tracking" asChild>
	<TokenGallery
		kind="text"
		names={[
			'--mnb-font-weight-normal',
			'--mnb-font-weight-medium',
			'--mnb-font-weight-bold',
			'--mnb-line-height-tight',
			'--mnb-line-height-normal',
			'--mnb-line-height-relaxed',
			'--mnb-letter-spacing-tight',
			'--mnb-letter-spacing-normal',
			'--mnb-letter-spacing-wide',
			'--mnb-letter-spacing-marquee'
		]}
	/>
</Story>
