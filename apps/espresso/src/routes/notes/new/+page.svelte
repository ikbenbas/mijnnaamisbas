<script lang="ts">
	import { MNBAlert, MNBBackLink, MNBButton, MNBInput, MNBPageHeader, MNBSelect, MNBTextarea } from '@mnb/ui';

	import type { ActionData, PageData } from './$types';

	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';

	let { data, form }: { data: PageData; form?: ActionData } = $props();

	const today = new Date().toISOString().slice(0, 10);

	function formatMethodType(value: string): string {
		return value
			.toLowerCase()
			.replaceAll('_', ' ')
			.replaceAll(/\b\w/g, (c) => c.toUpperCase());
	}
</script>

<svelte:head>
	<title>New note · Coffee Notes</title>
</svelte:head>

<MNBBackLink href={resolve('/notes')}>All notes</MNBBackLink>
<MNBPageHeader title="New experiment" />

{#if form?.error}
	<MNBAlert>{form.error}</MNBAlert>
{/if}

<form method="POST" action="?/create" use:enhance class="note-form">
	<fieldset>
		<legend>General</legend>
		<div class="row">
			<MNBInput id="title" name="title" label="Title" required value={form?.title ?? ''} placeholder="e.g. First pull with new grinder" />
			<MNBInput id="date" name="date" type="date" label="Date" required value={form?.date || today} />
		</div>
		<div class="row">
			<MNBInput id="bean" name="bean" label="Coffee bean / origin" required value={form?.bean ?? ''} placeholder="e.g. Ethiopia Yirgacheffe" />
			<MNBInput id="roaster" name="roaster" label="Roaster" value={form?.roaster ?? ''} placeholder="e.g. Mok" />
		</div>
	</fieldset>

	<fieldset>
		<legend>Brew method</legend>
		<MNBSelect id="methodType" name="methodType" label="Method type" required value={form?.methodType || 'espresso'}>
			<option value="" disabled>Select a method…</option>
			{#each data.methodTypes as method (method)}
				<option value={method}>{formatMethodType(method)}</option>
			{/each}
		</MNBSelect>
	</fieldset>

	<fieldset>
		<legend>Shot parameters</legend>
		<div class="row row-4">
			<MNBInput id="dosage" name="dosage" type="number" step="0.1" min="0" label="Dosage (g)" required value={form?.dosage ?? ''} placeholder="18" />
			<MNBInput id="yield" name="yield" type="number" step="0.1" min="0" label="Yield (g)" required value={form?.yield ?? ''} placeholder="36" />
			<MNBInput id="brewTime" name="brewTime" type="number" min="0" label="Brew time" required value={form?.brewTime ?? ''} placeholder="28" />
			<MNBInput id="grindSize" name="grindSize" type="number" step="0.1" min="0" label="Grind size" hint="Machine-specific unit" value={form?.grindSize ?? ''} placeholder="e.g. 2.0" />
		</div>
		<div class="row row-2">
			<MNBInput id="temperature" name="temperature" type="number" step="0.5" min="0" max="110" label="Temperature (°C)" value={form?.temperature ?? ''} placeholder="93" />
			<MNBInput id="pressure" name="pressure" type="number" step="0.5" min="0" max="20" label="Pressure (bar)" value={form?.pressure ?? ''} placeholder="9" />
		</div>
	</fieldset>

	<fieldset>
		<legend>Tasting</legend>
		<MNBTextarea id="notes" name="notes" label="Notes & observations" rows={5} value={form?.notes ?? ''} placeholder="Describe taste, texture, extraction quality…" />
		<div class="rating-field">
			<MNBInput id="rating" name="rating" type="number" min="1" max="10" step="1" label="Rating (1–10)" value={form?.rating ?? ''} placeholder="8" />
		</div>
	</fieldset>

	<div class="form-actions">
		<MNBButton href={resolve('/notes')} variant="secondary">Cancel</MNBButton>
		<MNBButton type="submit" variant="primary">Save note</MNBButton>
	</div>
</form>

<style>
	.note-form {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	fieldset {
		border: 1.5px solid var(--mnb-color-black);
		border-radius: var(--mnb-radius);
		padding: 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	legend {
		font-weight: 700;
		font-size: 0.85rem;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--mnb-color-text-secondary);
		padding: 0 0.5rem;
	}

	.row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	.row-4 {
		grid-template-columns: repeat(4, 1fr);
	}

	.row-2 {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (max-width: 600px) {
		.row,
		.row-4,
		.row-2 {
			grid-template-columns: 1fr;
		}
	}

	.rating-field {
		max-width: 150px;
	}

	.form-actions {
		display: flex;
		justify-content: flex-end;
		gap: 0.75rem;
	}
</style>
