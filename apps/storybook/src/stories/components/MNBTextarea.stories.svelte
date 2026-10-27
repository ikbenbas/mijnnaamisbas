<script module lang="ts">
	import { MNBTextarea } from '@mnb/ui';
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'Components/MNBTextarea',
		component: MNBTextarea,
		tags: ['autodocs'],
		args: {
			label: 'Notes & observations',
			placeholder: 'Describe taste, texture, extraction quality…',
			rows: 5,
			value: ''
		}
	});
</script>

<Story name="Default" />
<Story name="Filled" args={{ value: 'Weak and sour. Grind finer.' }} />
<Story name="Error" args={{ error: 'Notes must be at most 500 characters' }} />
