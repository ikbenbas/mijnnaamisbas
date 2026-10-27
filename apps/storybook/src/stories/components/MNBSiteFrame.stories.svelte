<script module lang="ts">
	import { MNBSiteFrame } from '@mnb/ui';
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const links = {
		home: '#',
		bookmarks: '#bookmarks',
		espresso: '#espresso',
		tidal: '#tidal'
	};

	const { Story } = defineMeta({
		title: 'Components/MNBSiteFrame',
		component: MNBSiteFrame,
		tags: ['autodocs'],
		parameters: { layout: 'fullscreen' }
	});
</script>

<Story name="Bookmarks" asChild>
	<MNBSiteFrame active="bookmarks" {links}>
		<div class="page">
			<h1>Bookmarks</h1>
			<p>The frame wraps every app. This story only fills the main area.</p>
		</div>
	</MNBSiteFrame>
</Story>

<style>
	.page {
		padding: var(--mnb-space-xl);
	}
</style>
