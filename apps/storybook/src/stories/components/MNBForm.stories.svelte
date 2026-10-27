<script module lang="ts">
	import { MNBButton, MNBForm, MNBInput } from '@mnb/ui';
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'Components/MNBForm',
		component: MNBForm,
		tags: ['autodocs']
	});
</script>

<Story name="Sign in" asChild>
	<MNBForm onsubmit={() => {}}>
		<MNBInput label="Email" type="email" value="bas@example.com" />
		<MNBButton type="submit" variant="primary">Submit</MNBButton>
	</MNBForm>
</Story>
