<script lang="ts">
	import { MNBButton, MNBEmptyState, MNBPageHeader } from '@mnb/ui';

	import type { PageData } from './$types';

	import { resolve } from '$app/paths';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>All notes · Coffee Notes</title>
</svelte:head>

<MNBPageHeader title="All experiments">
	{#snippet actions()}
		<MNBButton href={resolve('/notes/new')} variant="primary">+ New note</MNBButton>
	{/snippet}
</MNBPageHeader>

{#if data.notes.length === 0}
	<MNBEmptyState message="No notes yet.">
		{#snippet actions()}
			<MNBButton href={resolve('/notes/new')} variant="primary">Add your first experiment</MNBButton>
		{/snippet}
	</MNBEmptyState>
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
			{#each data.notes as note (note.id)}
				<tr>
					<td><a href={resolve('/notes/[id]', { id: note.id })}>{note.title}</a></td>
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
	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.9rem;
	}

	th,
	td {
		padding: 0.65rem 0.75rem;
		text-align: left;
		border-bottom: 1px solid var(--mnb-color-black);
	}

	th {
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--mnb-color-text-secondary);
		background: var(--mnb-color-bg-tertiary);
	}

	tbody tr:hover {
		background: var(--mnb-color-paper);
	}

</style>
