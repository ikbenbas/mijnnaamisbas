<script lang="ts">
	import { resolve } from '$app/paths';
	import { Button } from '$lib';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Coffee Notes</title>
</svelte:head>

<section class="hero">
	<h1>Coffee notes</h1>
	<p>Track your coffee experiments — dial in the perfect shot.</p>
	<Button href={resolve('/espresso/notes/new')} variant="primary">Start a new note</Button>
</section>

<div class="section-bar">Recent experiments</div>
<section class="recent">
	{#if data.notes.length === 0}
		<p class="empty">No notes yet. <a href={resolve('/espresso/notes/new')}>Add your first experiment!</a></p>
	{:else}
		<ul class="note-list">
			{#each data.notes as note (note.id)}
				<li class="note-card">
					<a href={resolve('/espresso/notes/[id]', { id: note.id })}>
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
			<Button href={resolve('/espresso/notes')} variant="secondary">View all notes</Button>
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
		color: var(--color-muted);
		font-size: 1.05rem;
		margin: 0;
	}

	.more {
		margin-top: var(--space-lg);
	}

	.recent {
		padding-top: 1.25rem;
	}

	.note-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0;
		border: var(--border-width-thick) solid var(--color-black);
		padding: 0;
		margin: 0;
		background: var(--color-offwhite);
	}

	.note-card {
		background: var(--color-card);
		border-bottom: var(--border-width) solid var(--color-border);
		transition: background var(--transition-fast);
	}

	.note-card:last-child {
		border-bottom: none;
	}

	.note-card:hover {
		background: var(--color-white);
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
		color: var(--color-rating);
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
