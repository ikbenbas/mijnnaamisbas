<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const note = $derived(data.note);
	const ratio = $derived(note.yield && note.dosage ? (note.yield / note.dosage).toFixed(1) : null);
</script>

<svelte:head>
	<title>{note.title} · Coffee Notes</title>
</svelte:head>

<div class="back"><a href="/espresso/notes">← All notes</a></div>

<article class="note">
	<header>
		<div class="title-row">
			<h1>{note.title}</h1>
			{#if note.rating}
				<span class="rating">{'★'.repeat(note.rating)}{'☆'.repeat(10 - note.rating)}</span>
			{/if}
		</div>
		<p class="date">{new Date(note.date).toLocaleDateString('nl-NL', { dateStyle: 'long' })}</p>
	</header>

	<section class="params">
		<h2>Parameters</h2>
		<div class="grid">
			<div class="param">
				<span class="label">Bean</span>
				<span class="value">{note.bean}</span>
			</div>
			{#if note.roaster}
				<div class="param">
					<span class="label">Roaster</span>
					<span class="value">{note.roaster}</span>
				</div>
			{/if}
			<div class="param">
				<span class="label">Dosage</span>
				<span class="value">{note.dosage} g</span>
			</div>
			<div class="param">
				<span class="label">Yield</span>
				<span class="value">{note.yield} g</span>
			</div>
			{#if ratio}
				<div class="param">
					<span class="label">Ratio</span>
					<span class="value">1:{ratio}</span>
				</div>
			{/if}
			<div class="param">
				<span class="label">Brew time</span>
				<span class="value">{note.brewTime} s</span>
			</div>
			{#if note.grindSize != null}
				<div class="param">
					<span class="label">Grind size</span>
					<span class="value">{note.grindSize}</span>
				</div>
			{/if}
			{#if note.temperature != null}
				<div class="param">
					<span class="label">Temperature</span>
					<span class="value">{note.temperature} °C</span>
				</div>
			{/if}
			{#if note.pressure != null}
				<div class="param">
					<span class="label">Pressure</span>
					<span class="value">{note.pressure} bar</span>
				</div>
			{/if}
		</div>
	</section>

	{#if note.notes}
		<section class="tasting">
			<h2>Tasting notes & observations</h2>
			<p>{note.notes}</p>
		</section>
	{/if}
</article>

<style>
	.back {
		margin-bottom: 1.5rem;
		font-size: 0.9rem;
	}

	.back a {
		color: var(--color-muted);
		text-decoration: none;
	}

	.back a:hover {
		text-decoration: underline;
	}

	.note {
		background: var(--color-card);
		border: 1.5px solid var(--color-border);
		border-radius: var(--radius);
		padding: 2rem;
	}

	header {
		margin-bottom: 1.75rem;
	}

	.title-row {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 0.4rem;
	}

	h1 {
		font-size: 1.7rem;
	}

	.rating {
		font-size: 1.2rem;
		color: var(--color-rating);
		letter-spacing: 2px;
	}

	.date {
		color: var(--color-muted);
		font-size: 0.9rem;
	}

	.params {
		margin-bottom: 1.75rem;
	}

	.params h2,
	.tasting h2 {
		font-size: 1rem;
		text-transform: uppercase;
		letter-spacing: 0.07em;
		color: var(--color-muted);
		margin-bottom: 1rem;
		border-bottom: 1px solid var(--color-border);
		padding-bottom: 0.4rem;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
		gap: 1rem;
	}

	.param {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.label {
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-muted);
	}

	.value {
		font-size: 1.05rem;
		font-weight: 600;
	}

	.tasting p {
		line-height: 1.6;
		white-space: pre-wrap;
	}
</style>
