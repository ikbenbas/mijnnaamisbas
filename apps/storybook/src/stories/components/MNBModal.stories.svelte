<script module lang="ts">
	import { MNBButton, MNBInput, MNBModal, MNBTextarea } from '@mnb/ui';
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'Components/MNBModal',
		component: MNBModal,
		tags: ['autodocs'],
		parameters: { layout: 'fullscreen' }
	});
</script>

<script lang="ts">
	let open = $state(true);
</script>

<Story name="Add bookmark" asChild>
	<div class="stage">
		<MNBButton variant="primary" onclick={() => (open = true)}>Open</MNBButton>
		<MNBModal bind:open title="Add Bookmark" onClose={() => (open = false)}>
			<MNBInput label="Link" placeholder="https://example.com" />
			<MNBTextarea label="Description (optional)" rows={3} />
			{#snippet actions()}
				<MNBButton variant="secondary" onclick={() => (open = false)}>Cancel</MNBButton>
				<MNBButton variant="primary">Add Bookmark</MNBButton>
			{/snippet}
		</MNBModal>
	</div>
</Story>

<style>
	.stage {
		min-height: 36rem;
		padding: var(--mnb-space-xl);
	}
</style>
