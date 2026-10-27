<script module lang="ts">
	import { MNBSelect } from '@mnb/ui';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import type { ComponentProps } from 'svelte';

	type SelectArgs = ComponentProps<typeof MNBSelect>;

	const { Story } = defineMeta({
		title: 'Components/MNBSelect',
		component: MNBSelect,
		tags: ['autodocs'],
		args: {
			label: 'Method type',
			value: 'espresso'
		}
	});
</script>

{#snippet template({ children, ...args }: SelectArgs)}
	<MNBSelect {...args}>
		{#if children}{@render children()}{/if}
		<option value="" disabled>Select a method…</option>
		<option value="espresso">Espresso</option>
		<option value="kalita">Kalita</option>
		<option value="chemex">Chemex</option>
	</MNBSelect>
{/snippet}

<Story name="Default" {template} />
<Story name="Hint" args={{ hint: 'Machine-specific unit' }} {template} />
<Story name="Error" args={{ error: 'Method type is required', value: '' }} {template} />
<Story name="Disabled" args={{ disabled: true }} {template} />
