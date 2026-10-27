<script lang="ts">
    import { goto } from '$app/navigation';
    import { resolve } from '$app/paths';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();

    function handleKeydown(event: KeyboardEvent) {
        if (event.code === 'KeyN' && event.metaKey && event.ctrlKey) {
            goto(resolve('/bookmarks/add'));
        }
    }
</script>

<svelte:window onkeydown={handleKeydown} />

<svelte:head>
	<title>Bookmarks – mijnnaamisbas</title>
</svelte:head>

<div class="page-container">
	<header class="page-header">
		<h1>Bookmarks</h1>
		<a href={resolve('/bookmarks/add')} class="btn-primary">+ Add bookmark</a>
	</header>

	<div class="keyboard-hint">
		<span>Tip: Press <kbd>Cmd + Ctrl + N</kbd> to quickly add a bookmark</span>
	</div>

	{#if data.bookmarks.length === 0}
		<div class="empty-state">
			<p>No bookmarks yet.</p>
			<a href={resolve('/bookmarks/add')} class="btn-primary">Add your first bookmark</a>
		</div>
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

	.page-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.page-header h1 {
		margin: 0;
		color: var(--color-text-primary);
		font-size: var(--font-size-4xl);
	}

	.btn-primary {
		background: var(--color-black);
		color: var(--color-offwhite);
		padding: 0.7rem 1.15rem;
		border: var(--border-width-thick) solid var(--color-black);
		border-radius: 0;
		text-decoration: none;
		font-family: var(--font-display);
		font-size: var(--font-size-sm);
		text-transform: uppercase;
		letter-spacing: 0.03em;
		box-shadow: var(--shadow-sm);
		transition: transform var(--transition-fast), box-shadow var(--transition-fast);
		display: inline-block;
		opacity: 1;
	}

	.btn-primary:hover {
		transform: translate(-1px, -1px);
		box-shadow: var(--shadow-md);
		opacity: 1;
	}

	.keyboard-hint {
		background: var(--color-offwhite);
		border: var(--border-width-thick) solid var(--color-black);
		padding: var(--space-md);
		margin-bottom: var(--space-xl);
		box-shadow: var(--shadow-sm);
	}

	.keyboard-hint span {
		color: var(--color-text-primary);
		font-size: var(--font-size-sm);
	}

	kbd {
		background: var(--color-bg-primary);
		border: var(--border-width) solid var(--color-border-primary);
		border-radius: var(--radius-xs);
		padding: 0.125rem 0.375rem;
		font-family: var(--font-mono);
		font-size: 0.85em;
	}

	.empty-state {
		text-align: center;
		padding: var(--space-3xl) var(--space-xl);
		background: var(--color-bg-primary);
		border: var(--border-width-thick) solid var(--color-black);
		box-shadow: var(--shadow-sm);
	}

	.empty-state p {
		color: var(--color-text-secondary);
		margin: 0 0 var(--space-lg) 0;
		font-size: var(--font-size-lg);
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
		background: var(--color-bg-primary);
		border: var(--border-width-thick) solid var(--color-border-primary);
		transition: transform var(--transition-fast), box-shadow var(--transition-fast);
		overflow: hidden;
		box-shadow: var(--shadow-sm);
	}

	.bookmark-card:hover {
		box-shadow: var(--shadow-md);
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
		margin: 0 0 var(--space-sm) 0;
		color: var(--color-text-primary);
		font-size: var(--font-size-lg);
	}

	.bookmark-card .description {
		margin: 0 0 var(--space-md) 0;
		color: var(--color-text-secondary);
		font-size: var(--font-size-sm);
		line-height: var(--line-height-normal);
	}

	.bookmark-card .link-url {
		display: block;
		color: var(--color-text-secondary);
		font-size: var(--font-size-xs);
		margin-top: var(--space-sm);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	@media (max-width: 768px) {
		.page-container {
			padding: 1rem;
		}

		.page-header h1 {
			font-size: 1.5rem;
		}

		.bookmark-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
