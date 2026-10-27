<script module lang="ts">
	import { MNBInput } from '@mnb/ui';
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'Components/MNBInput',
		component: MNBInput,
		tags: ['autodocs'],
		args: {
			label: 'Link',
			placeholder: 'https://example.com',
			value: ''
		}
	});
</script>

<Story name="Default" />
<Story name="Hint" args={{ hint: "If left empty, we'll use the website's domain name" }} />
<Story name="Error" args={{ error: 'Invalid URL format. Please use http:// or https://', value: 'ftp://example.com' }} />
<Story name="Disabled" args={{ disabled: true, value: 'https://example.com' }} />
