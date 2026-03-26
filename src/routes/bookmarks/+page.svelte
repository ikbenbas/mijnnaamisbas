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
		<h1>📚 Bookmarks</h1>
		<a href={resolve('/bookmarks/add')} class="btn-primary">+ Add Bookmark</a>
	</header>

	<div class="keyboard-hint">
		<span>💡 Tip: Press <kbd>Cmd + Ctrl + N</kbd> to quickly add a bookmark</span>
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
		background: var(--gradient-primary);
		color: var(--color-text-inverse);
		padding: var(--space-sm) var(--space-lg);
		border-radius: var(--radius-md);
		text-decoration: none;
		font-weight: var(--font-weight-semibold);
		transition: all var(--transition-fast);
		display: inline-block;
	}

	.btn-primary:hover {
		background: var(--gradient-primary-hover);
		transform: translateY(-1px);
		box-shadow: var(--shadow-md);
	}

	.keyboard-hint {
		background: var(--color-primary-light);
		border-left: 3px solid var(--color-primary);
		padding: var(--space-md) var(--space-md);
		margin-bottom: var(--space-xl);
		border-radius: var(--radius-sm);
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
		border-radius: var(--radius-xl);
		border: var(--border-width-thick) dashed var(--color-border-secondary);
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
		border: var(--border-width) solid var(--color-border-primary);
		border-radius: var(--radius-lg);
		transition: all var(--transition-fast);
		overflow: hidden;
	}

	.bookmark-card:hover {
		border-color: var(--color-primary);
		box-shadow: var(--shadow-md);
		transform: translateY(-2px);
	}

	.bookmark-card a {
		display: block;
		padding: 1.5rem;
		text-decoration: none;
		color: inherit;
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
		color: var(--color-primary);
		font-size: var(--font-size-xs);
		margin-top: var(--space-sm);
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
