<script module lang="ts">
	import { MNBAlert } from '@mnb/ui';
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'Components/MNBAlert',
		component: MNBAlert,
		tags: ['autodocs']
	});
</script>

<Story name="Error">Rating must be at most 10.</Story>
