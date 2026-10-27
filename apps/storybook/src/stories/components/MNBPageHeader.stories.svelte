<script module lang="ts">
	import { MNBButton, MNBPageHeader } from '@mnb/ui';
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'Components/MNBPageHeader',
		component: MNBPageHeader,
		tags: ['autodocs'],
		args: {
			title: 'Bookmarks',
			lede: ''
		}
	});
</script>

<Story name="Title" />

<Story name="With lede" args={{ title: 'Tidal playlist suggestions', lede: 'Powered by Mistral AI — European AI' }} />

<Story name="With action" asChild>
	<MNBPageHeader title="All experiments">
		{#snippet actions()}
			<MNBButton variant="primary">+ New note</MNBButton>
		{/snippet}
	</MNBPageHeader>
</Story>
