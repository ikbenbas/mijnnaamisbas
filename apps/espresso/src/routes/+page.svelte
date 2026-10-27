<script lang="ts">
	import { MNBButton, MNBEmptyState } from '@mnb/ui';

	import type { PageData } from './$types';

	import { resolve } from '$app/paths';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Coffee Notes</title>
</svelte:head>

<section class="hero">
	<h1>Coffee notes</h1>
	<p>Track your coffee experiments — dial in the perfect shot.</p>
	<MNBButton href={resolve('/notes/new')} variant="primary">Start a new note</MNBButton>
</section>

<div class="section-bar">Recent experiments</div>
<section class="recent">
	{#if data.notes.length === 0}
		<MNBEmptyState message="No notes yet.">
			{#snippet actions()}
				<MNBButton href={resolve('/notes/new')} variant="primary">Add your first experiment</MNBButton>
			{/snippet}
		</MNBEmptyState>
	{:else}
		<ul class="note-list">
			{#each data.notes as note (note.id)}
				<li class="note-card">
					<a href={resolve('/notes/[id]', { id: note.id })}>
						<div class="note-header">
							<span class="note-title">{note.title}</span>
							{#if note.rating}
								<span class="rating">{'★'.repeat(note.rating)}{'☆'.repeat(5 - note.rating)}</span>
							{/if}
						</div>
						<div class="note-meta">
							<span>{note.bean}{note.roaster ? ` · ${note.roaster}` : ''}</span>
							<span>{note.dosage}g in → {note.yield}g out · {note.brewTime}s</span>
							<span class="date">{new Date(note.date).toLocaleDateString('nl-NL', { dateStyle: 'medium' })}</span>
						</div>
					</a>
				</li>
			{/each}
		</ul>
		<div class="more">
			<MNBButton href={resolve('/notes')} variant="secondary">View all notes</MNBButton>
		</div>
	{/if}
</section>

<style>
	.hero {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1rem;
		padding: 1.5rem 0 2rem;
	}

	.hero h1 {
		margin: 0;
	}

	.hero p {
		color: var(--mnb-color-text-secondary);
		font-size: 1.05rem;
		margin: 0;
	}

	.more {
		margin-top: var(--mnb-space-lg);
	}

	.recent {
		padding-top: 1.25rem;
	}

	.note-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0;
		border: var(--mnb-border-width-thick) solid var(--mnb-color-black);
		padding: 0;
		margin: 0;
		background: var(--mnb-color-offwhite);
	}

	.note-card {
		background: var(--mnb-color-offwhite);
		border-bottom: var(--mnb-border-width) solid var(--mnb-color-black);
		transition: background var(--mnb-transition-fast);
	}

	.note-card:last-child {
		border-bottom: none;
	}

	.note-card:hover {
		background: var(--mnb-color-white);
	}

	.note-card a {
		display: block;
		padding: 1rem 1.25rem;
		text-decoration: none;
		color: inherit;
		opacity: 1;
	}

	.note-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.4rem;
	}

	.note-title {
		font-weight: 700;
		font-size: 1rem;
	}

	.rating {
		color: var(--mnb-color-rating);
		letter-spacing: 1px;
	}

	.note-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1.25rem;
		font-size: 0.85rem;
		color: var(--mnb-color-text-secondary);
	}

	.date {
		margin-left: auto;
	}

</style>
