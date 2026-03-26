<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form?: ActionData } = $props();

	const today = new Date().toISOString().slice(0, 10);
	const methodType = 'espresso'; // Default method type for new notes

	function formatMethodType(value: string): string {
		return value
			.toLowerCase()
			.replace(/_/g, ' ')
			.replace(/\b\w/g, (c) => c.toUpperCase());
	}
</script>

<svelte:head>
	<title>New note · Coffee Notes</title>
</svelte:head>

<div class="back"><a href="/espresso/notes">← All notes</a></div>
<h1>New experiment</h1>

{#if form?.error}
	<p class="error" role="alert">{form.error}</p>
{/if}

<form method="POST" use:enhance class="note-form">
	<fieldset>
		<legend>General</legend>
		<div class="row">
			<div class="field">
				<label for="title">Title <span class="req">*</span></label>
				<input id="title" name="title" type="text" required placeholder="e.g. First pull with new grinder" />
			</div>
			<div class="field">
				<label for="date">Date <span class="req">*</span></label>
				<input id="date" name="date" type="date" required value={today} />
			</div>
		</div>
		<div class="row">
			<div class="field">
				<label for="bean">Coffee bean / origin <span class="req">*</span></label>
				<input id="bean" name="bean" type="text" required placeholder="e.g. Ethiopia Yirgacheffe" />
			</div>
			<div class="field">
				<label for="roaster">Roaster</label>
				<input id="roaster" name="roaster" type="text" placeholder="e.g. Mok" />
			</div>
		</div>
	</fieldset>

	<fieldset>
		<legend>Brew method</legend>
		<div class="field">
			<label for="methodType">Method type <span class="req">*</span></label>
			<select id="methodType" name="methodType" required value={methodType}>
				<option value="" disabled selected>Select a method…</option>
				{#each data.methodTypes as method (method)}
					<option value={method}>{formatMethodType(method)}</option>
				{/each}
			</select>
		</div>
	</fieldset>

	<fieldset>
		<legend>Shot parameters</legend>
		<div class="row row-4">
			<div class="field">
				<label for="dosage">Dosage (g) <span class="req">*</span></label>
				<input id="dosage" name="dosage" type="number" step="0.1" min="0" required placeholder="18" />
			</div>
			<div class="field">
				<label for="yield">Yield (g) <span class="req">*</span></label>
				<input id="yield" name="yield" type="number" step="0.1" min="0" required placeholder="36" />
			</div>
			<div class="field">
				<label for="brewTime">Brew time <span class="req">*</span></label>
				<input id="brewTime" name="brewTime" type="number" min="0" required placeholder="28" />
			</div>
			<div class="field">
				<label for="grindSize">Grind size</label>
				<input id="grindSize" name="grindSize" type="number" step="0.1" min="0" placeholder="e.g. 2.0" />
				<span class="hint">Machine-specific unit</span>
			</div>
		</div>
		<div class="row row-2">
			<div class="field">
				<label for="temperature">Temperature (°C)</label>
				<input id="temperature" name="temperature" type="number" step="0.5" min="0" max="110" placeholder="93" />
			</div>
			<div class="field">
				<label for="pressure">Pressure (bar)</label>
				<input id="pressure" name="pressure" type="number" step="0.5" min="0" max="20" placeholder="9" />
			</div>
		</div>
	</fieldset>

	<fieldset>
		<legend>Tasting</legend>
		<div class="field">
			<label for="notes">Notes & observations</label>
			<textarea id="notes" name="notes" rows="5" placeholder="Describe taste, texture, extraction quality…"></textarea>
		</div>
		<div class="field rating-field">
			<label for="rating">Rating (1–10)</label>
			<input id="rating" name="rating" type="number" min="1" max="10" step="1" placeholder="8" />
		</div>
	</fieldset>

	<div class="form-actions">
		<a href="/espresso/notes" class="btn btn-secondary">Cancel</a>
		<button type="submit" class="btn btn-primary">Save note</button>
	</div>
</form>

<style>
	h1 {
		font-size: 1.6rem;
		margin-bottom: 1.5rem;
	}

	.back {
		margin-bottom: 1rem;
		font-size: 0.9rem;
	}

	.back a {
		color: var(--color-muted);
		text-decoration: none;
	}

	.back a:hover {
		text-decoration: underline;
	}

	.note-form {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	fieldset {
		border: 1.5px solid var(--color-border);
		border-radius: var(--radius);
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
		color: var(--color-muted);
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

	.req {
		color: var(--color-error);
	}

	.form-actions {
		display: flex;
		justify-content: flex-end;
		gap: 0.75rem;
	}
</style>
