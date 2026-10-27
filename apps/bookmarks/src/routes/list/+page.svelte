<script lang="ts">
    import { MNBButton, MNBEmptyState, MNBPageHeader } from '@mnb/ui';

    import type { PageData } from './$types';

    import { goto } from '$app/navigation';
    import { resolve } from '$app/paths';

    let { data }: { data: PageData } = $props();

    function handleKeydown(event: KeyboardEvent) {
        if (event.code === 'KeyN' && event.metaKey && event.ctrlKey) {
            goto(resolve('/add'));
        }
    }
</script>

<svelte:window onkeydown={handleKeydown} />

<svelte:head>
	<title>Bookmarks – mijnnaamisbas</title>
</svelte:head>

<div class="page-container">
	<MNBPageHeader title="Bookmarks">
		{#snippet actions()}
			<MNBButton href={resolve('/add')} variant="primary">+ Add bookmark</MNBButton>
		{/snippet}
	</MNBPageHeader>

	<div class="keyboard-hint">
		<span>Tip: Press <kbd>Cmd + Ctrl + N</kbd> to quickly add a bookmark</span>
	</div>

	{#if data.bookmarks.length === 0}
		<MNBEmptyState message="No bookmarks yet.">
			{#snippet actions()}
				<MNBButton href={resolve('/add')} variant="primary">Add your first bookmark</MNBButton>
			{/snippet}
		</MNBEmptyState>
	{:else}
		<ul class="bookmark-grid">
			{#each data.bookmarks as bookmark (bookmark.id)}
				<li class="bookmark-card">
					<a href={bookmark.link} target="_blank" rel="noopener noreferrer" data-sveltekit-reload>
						<h3>{bookmark.title}</h3>
						{#if bookmark.description}
							<p class="description">{bookmark.description}</p>
						{/if}
						<span class="link-url">{new URL(bookmark.link).hostname}</span>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.page-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
	}

	.keyboard-hint {
		background: var(--mnb-color-offwhite);
		border: var(--mnb-border-width-thick) solid var(--mnb-color-black);
		padding: var(--mnb-space-md);
		margin-bottom: var(--mnb-space-xl);
		box-shadow: var(--mnb-shadow-sm);
	}

	.keyboard-hint span {
		color: var(--mnb-color-ink);
		font-size: var(--mnb-font-size-sm);
	}

	kbd {
		background: var(--mnb-color-offwhite);
		border: var(--mnb-border-width) solid var(--mnb-color-black);
		border-radius: var(--mnb-radius);
		padding: 0.125rem 0.375rem;
		font-family: var(--mnb-font-primary);
		font-size: 0.85em;
	}

	.bookmark-grid {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1.5rem;
	}

	.bookmark-card {
		background: var(--mnb-color-offwhite);
		border: var(--mnb-border-width-thick) solid var(--mnb-color-black);
		transition: transform var(--mnb-transition-fast), box-shadow var(--mnb-transition-fast);
		overflow: hidden;
		box-shadow: var(--mnb-shadow-sm);
	}

	.bookmark-card:hover {
		box-shadow: var(--mnb-shadow-md);
		transform: translate(-2px, -2px);
	}

	.bookmark-card a {
		display: block;
		padding: 1.5rem;
		text-decoration: none;
		color: inherit;
		opacity: 1;
	}

	.bookmark-card h3 {
		margin: 0 0 var(--mnb-space-sm) 0;
		color: var(--mnb-color-ink);
		font-size: var(--mnb-font-size-lg);
	}

	.bookmark-card .description {
		margin: 0 0 var(--mnb-space-md) 0;
		color: var(--mnb-color-text-secondary);
		font-size: var(--mnb-font-size-sm);
		line-height: var(--mnb-line-height-normal);
	}

	.bookmark-card .link-url {
		display: block;
		color: var(--mnb-color-text-secondary);
		font-size: var(--mnb-font-size-xs);
		margin-top: var(--mnb-space-sm);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	@media (max-width: 768px) {
		.page-container {
			padding: 1rem;
		}

		.bookmark-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
