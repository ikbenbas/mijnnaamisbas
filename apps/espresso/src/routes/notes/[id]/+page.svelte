<script lang="ts">
	import { MNBAlert, MNBBackLink } from '@mnb/ui';

	import type { PageData } from './$types';

	import { resolve } from '$app/paths';
	import type { EspressoSuggestionsResponse } from '$lib/types/espresso-suggestions';

	let {
		data
	}: {
		data: PageData & {
			suggestions: EspressoSuggestionsResponse | null;
			suggestionsError: string | null;
		};
	} = $props();

	const note = $derived(data.note);
	const suggestions = $derived(data.suggestions);
	const suggestionsError = $derived(data.suggestionsError);
	const ratio = $derived(note.yield && note.dosage ? (note.yield / note.dosage).toFixed(1) : null);
</script>

<svelte:head>
	<title>{note.title} · Coffee Notes</title>
</svelte:head>

<MNBBackLink href={resolve('/notes')}>All notes</MNBBackLink>

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

	<section class="suggestions">
		<h2>AI Suggestions</h2>
		{#if suggestions}
			<div class="suggestions-content">
				{#if suggestions.suggestions && suggestions.suggestions.length > 0}
					<div class="suggestion-item">
						<h3>Parameter Adjustments</h3>
						<ul class="parameters-list">
							{#each suggestions.suggestions as suggestion (suggestion.parameter)}
								<li class="parameter-suggestion">
									<div class="param-header">
										<strong>{suggestion.parameter.replaceAll('_', ' ').replaceAll(/\b\w/g, (l) => l.toUpperCase())}</strong>
										<span class="current-value">Current: {suggestion.current ?? 'N/A'}</span>
									</div>
									<div class="param-body">
										<p class="recommendation">💡 {suggestion.recommendation}</p>
										<p class="reason">{suggestion.reason}</p>
									</div>
								</li>
							{/each}
						</ul>
					</div>
				{/if}

				{#if suggestions.additional_tips && Object.keys(suggestions.additional_tips).length > 0}
					<div class="suggestion-item">
						<h3>Additional Tips</h3>
						<ul>
							{#each Object.entries(suggestions.additional_tips) as [key, value] (key)}
								<li>
									<strong>{key.replaceAll('_', ' ').replaceAll(/\b\w/g, (l) => l.toUpperCase())}:</strong> {value}
								</li>
							{/each}
						</ul>
					</div>
				{/if}

				{#if suggestions.expected_outcome}
					<div class="suggestion-item expected-outcome">
						<h3>Expected Outcome</h3>
						<p>{suggestions.expected_outcome}</p>
					</div>
				{/if}
			</div>
		{:else if suggestionsError}
			<MNBAlert>{suggestionsError}</MNBAlert>
		{:else}
			<p>No suggestions available.</p>
		{/if}
	</section>
</article>

<style>
	.note {
		background: var(--mnb-color-offwhite);
		border: 1.5px solid var(--mnb-color-black);
		border-radius: var(--mnb-radius);
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
		color: var(--mnb-color-rating);
		letter-spacing: 2px;
	}

	.date {
		color: var(--mnb-color-text-secondary);
		font-size: 0.9rem;
	}

	.params, .tasting {
		margin-bottom: 1.75rem;
        margin-top: 1.75rem;
        padding: 1.75rem;
        background-color: var( --mnb-color-primary-light);
        box-shadow: var(--mnb-shadow-xl);
	}

	.params h2,
	.tasting h2,
	.suggestions h2 {
		font-size: 1rem;
		text-transform: uppercase;
		letter-spacing: 0.07em;
		color: var(--mnb-color-text-secondary);
		margin-bottom: 1rem;
		border-bottom: 1px solid var(--mnb-color-black);
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
		color: var(--mnb-color-text-secondary);
	}

	.value {
		font-size: 1.05rem;
		font-weight: 600;
	}

	.tasting p {
		line-height: 1.6;
		white-space: pre-wrap;
	}

	.suggestions {
		margin-top: 1.75rem;
        padding: 1.75rem;
        background-color: var( --mnb-color-secondary-light);
        box-shadow: var(--mnb-shadow-xl);
        /* color: var(--mnb-color-offwhite);
        font-size: 1.125rem; */
	}

	.suggestions-content {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.suggestion-item h3 {
		font-size: 1.1rem;
		margin-bottom: 0.75rem;
		color: var(--mnb-color-ink);
	}

	.suggestion-item p {
		line-height: 1.6;
		color: var(--mnb-color-ink);
	}

	.suggestion-item ul {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.suggestion-item li {
		line-height: 1.6;
		padding-left: 1rem;
		position: relative;
	}

	.suggestion-item li::before {
		content: '•';
		position: absolute;
		left: 0;
		color: var(--mnb-color-text-secondary);
	}

	.suggestion-item strong {
		color: var(--mnb-color-ink);
		font-weight: 600;
	}

	.parameters-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.parameter-suggestion {
		margin-bottom: 1rem;
	}

	.parameter-suggestion::before {
		content: none;
	}

	.param-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.5rem;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.current-value {
		font-size: 0.85rem;
		color: var(--mnb-color-text-secondary);
		font-weight: normal;
	}

	.param-body {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		padding-left: 0;
	}

	.recommendation {
		font-weight: 500;
		color: var(--mnb-color-ink);
		margin: 0;
	}

	.reason {
		font-size: 0.9rem;
		color: var(--mnb-color-text-secondary);
		margin: 0;
		font-style: italic;
	}

</style>
