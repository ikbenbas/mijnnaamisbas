<script module lang="ts">
	import { MNBButton, MNBEmptyState } from '@mnb/ui';
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'Components/MNBEmptyState',
		component: MNBEmptyState,
		tags: ['autodocs'],
		args: { message: 'No bookmarks yet.' }
	});
</script>

<Story name="Message only" />

<Story name="With action" asChild>
	<MNBEmptyState message="No notes yet.">
		{#snippet actions()}
			<MNBButton variant="primary">Add your first experiment</MNBButton>
		{/snippet}
	</MNBEmptyState>
</Story>
