<script module lang="ts">
	import { MNBBackLink } from '@mnb/ui';
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'Components/MNBBackLink',
		component: MNBBackLink,
		tags: ['autodocs'],
		args: { href: '#notes' }
	});
</script>

<Story name="All notes">All notes</Story>
