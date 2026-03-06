<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Espresso Notes</title>
</svelte:head>

<section class="hero">
	<h1>☕ Espresso Notes</h1>
	<p>Track your espresso experiments — dial in the perfect shot.</p>
	<a href="/notes/new" class="btn btn-primary">Start a new note</a>
</section>

<section class="recent">
	<h2>Recent experiments</h2>
	{#if data.notes.length === 0}
		<p class="empty">No notes yet. <a href="/notes/new">Add your first experiment!</a></p>
	{:else}
		<ul class="note-list">
			{#each data.notes as note}
				<li class="note-card">
					<a href="/notes/{note.id}">
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
		<a href="/notes" class="btn btn-secondary" style="margin-top:1.5rem">View all notes</a>
	{/if}
</section>

<style>
	.hero {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1rem;
		padding: 2.5rem 0 2rem;
	}

	.hero h1 {
		font-size: 2rem;
	}

	.hero p {
		color: var(--color-muted);
		font-size: 1.05rem;
	}

	.recent h2 {
		font-size: 1.3rem;
		margin-bottom: 1.25rem;
		border-bottom: 2px solid var(--color-border);
		padding-bottom: 0.5rem;
	}

	.note-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.note-card {
		background: var(--color-card);
		border: 1.5px solid var(--color-border);
		border-radius: var(--radius);
		transition: border-color 0.15s;
	}

	.note-card:hover {
		border-color: var(--color-accent);
	}

	.note-card a {
		display: block;
		padding: 1rem 1.25rem;
		text-decoration: none;
		color: inherit;
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
		color: #c0851a;
		letter-spacing: 1px;
	}

	.note-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1.25rem;
		font-size: 0.85rem;
		color: var(--color-muted);
	}

	.date {
		margin-left: auto;
	}

	.empty {
		color: var(--color-muted);
	}
</style>
