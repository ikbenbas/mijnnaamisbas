<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>All notes · Coffee Notes</title>
</svelte:head>

<div class="header-row">
	<h1>All experiments</h1>
	<a href="/notes/new" class="btn btn-primary">+ New note</a>
</div>

{#if data.notes.length === 0}
	<p class="empty">No notes yet. <a href="/notes/new">Add your first experiment!</a></p>
{:else}
	<table>
		<thead>
			<tr>
				<th>Title</th>
				<th>Bean</th>
				<th>Dose</th>
				<th>Yield</th>
				<th>Time</th>
				<th>Rating</th>
				<th>Date</th>
			</tr>
		</thead>
		<tbody>
			{#each data.notes as note}
				<tr>
					<td><a href="/notes/{note.id}">{note.title}</a></td>
					<td>{note.bean}{note.roaster ? ` / ${note.roaster}` : ''}</td>
					<td>{note.dosage}g</td>
					<td>{note.yield}g</td>
					<td>{note.brewTime}s</td>
					<td>{note.rating ? '★'.repeat(note.rating) : '—'}</td>
					<td>{new Date(note.date).toLocaleDateString('nl-NL', { dateStyle: 'short' })}</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}

<style>
	.header-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1.5rem;
	}

	h1 {
		font-size: 1.6rem;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.9rem;
	}

	th,
	td {
		padding: 0.65rem 0.75rem;
		text-align: left;
		border-bottom: 1px solid var(--color-border);
	}

	th {
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-muted);
		background: var(--color-table-header);
	}

	tbody tr:hover {
		background: var(--color-table-row-hover);
	}

	.empty {
		color: var(--color-muted);
	}
</style>
