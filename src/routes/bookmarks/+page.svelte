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
		color: #35495e;
		font-size: 2rem;
	}

	.btn-primary {
		background: #3b8070;
		color: white;
		padding: 0.625rem 1.25rem;
		border-radius: 6px;
		text-decoration: none;
		font-weight: 600;
		transition: all 0.2s;
		display: inline-block;
	}

	.btn-primary:hover {
		background: #2d6559;
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(59, 128, 112, 0.3);
	}

	.keyboard-hint {
		background: #f0f9f7;
		border-left: 3px solid #3b8070;
		padding: 0.75rem 1rem;
		margin-bottom: 2rem;
		border-radius: 4px;
	}

	.keyboard-hint span {
		color: #2d6559;
		font-size: 0.9rem;
	}

	kbd {
		background: white;
		border: 1px solid #ddd;
		border-radius: 3px;
		padding: 0.125rem 0.375rem;
		font-family: monospace;
		font-size: 0.85em;
	}

	.empty-state {
		text-align: center;
		padding: 4rem 2rem;
		background: white;
		border-radius: 12px;
		border: 2px dashed #e0e0e0;
	}

	.empty-state p {
		color: #666;
		margin: 0 0 1.5rem 0;
		font-size: 1.1rem;
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
		background: white;
		border: 1px solid #e0e0e0;
		border-radius: 8px;
		transition: all 0.2s;
		overflow: hidden;
	}

	.bookmark-card:hover {
		border-color: #3b8070;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
		transform: translateY(-2px);
	}

	.bookmark-card a {
		display: block;
		padding: 1.5rem;
		text-decoration: none;
		color: inherit;
	}

	.bookmark-card h3 {
		margin: 0 0 0.5rem 0;
		color: #35495e;
		font-size: 1.1rem;
	}

	.bookmark-card .description {
		margin: 0 0 0.75rem 0;
		color: #666;
		font-size: 0.9rem;
		line-height: 1.5;
	}

	.bookmark-card .link-url {
		display: block;
		color: #3b8070;
		font-size: 0.85rem;
		margin-top: 0.5rem;
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
