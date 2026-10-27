<script module lang="ts">
	import { MNBButton, MNBButtonSizeEnum, MNBButtonVariantEnum } from '@mnb/ui';
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'Components/MNBButton',
		component: MNBButton,
		tags: ['autodocs'],
		argTypes: {
			variant: { control: 'select', options: Object.values(MNBButtonVariantEnum) },
			size: { control: 'select', options: Object.values(MNBButtonSizeEnum) }
		},
		args: {
			variant: 'primary',
			size: 'md'
		}
	});
</script>

<Story name="Primary">Save</Story>
<Story name="Default" args={{ variant: 'default' }}>Save</Story>
<Story name="Secondary" args={{ variant: 'secondary' }}>Cancel</Story>
<Story name="Ghost" args={{ variant: 'ghost' }}>Close</Story>
<Story name="Danger" args={{ variant: 'danger' }}>Delete</Story>
<Story name="Small" args={{ size: 'sm' }}>Add</Story>
<Story name="Large" args={{ size: 'lg' }}>Continue</Story>
<Story name="Loading" args={{ loading: true }}>Saving</Story>
<Story name="Full width" args={{ fullWidth: true }}>Sign in</Story>
<Story name="Link" args={{ href: 'https://example.com' }}>Example</Story>
