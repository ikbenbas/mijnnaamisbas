<script module lang="ts">
	import { MNBCard, MNBCardPaddingEnum, MNBCardVariantEnum } from '@mnb/ui';
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'Components/MNBCard',
		component: MNBCard,
		tags: ['autodocs'],
		argTypes: {
			variant: { control: 'select', options: Object.values(MNBCardVariantEnum) },
			padding: { control: 'select', options: Object.values(MNBCardPaddingEnum) }
		},
		args: {
			variant: 'default',
			padding: 'md'
		}
	});
</script>

<Story name="Default">
	<h2>Ethiopia</h2>
	<p>Yirgacheffe, washed.</p>
</Story>

<Story name="Elevated" args={{ variant: 'elevated', hoverable: true }}>
	<h2>Notes</h2>
	<p>Hover lifts the card.</p>
</Story>

<Story name="With sections" asChild>
	<MNBCard variant="bordered">
		{#snippet header()}
			<h2>Origin</h2>
		{/snippet}
		Washed process, light roast.
		{#snippet footer()}
			Saved 15 March 2026
		{/snippet}
	</MNBCard>
</Story>
