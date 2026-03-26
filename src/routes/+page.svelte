<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>mijnnaamisbas</title>
</svelte:head>

<div class="home-container">
	<section class="hero">
		<h1 class="hero-title">Welcome</h1>
		<p class="hero-subtitle">Personal dashboard for Bas van Wouwen</p>
	</section>

	<section class="features">
		<a href={resolve('/bookmarks')} class="feature-card">
			<div class="feature-icon">📚</div>
			<h2>Bookmarks</h2>
			<p>Manage your saved links and resources</p>
		</a>

		<a href={resolve('/tidal')} class="feature-card">
			<div class="feature-icon">🎵</div>
			<h2>Tidal Playlists</h2>
			<p>AI-powered music suggestions using Mistral AI</p>
		</a>

		<a href={resolve('/espresso')} class="feature-card">
			<div class="feature-icon">☕</div>
			<h2>Coffee Notes</h2>
			<p>Track your espresso brewing experiments</p>
		</a>
	</section>

	{#if data.bookmarks && data.bookmarks.length > 0}
		<section class="recent-bookmarks">
			<h2>Recent Bookmarks</h2>
			<ul class="bookmark-list">
				{#each data.bookmarks.slice(0, 5) as bookmark (bookmark.id)}
					<li class="bookmark-item">
						<a href={bookmark.link} target="_blank" rel="noopener noreferrer">
							<span class="bookmark-title">{bookmark.title}</span>
							{#if bookmark.description}
								<span class="bookmark-description">{bookmark.description}</span>
							{/if}
						</a>
					</li>
				{/each}
			</ul>
			<a href={resolve('/bookmarks')} class="view-all">View all bookmarks →</a>
		</section>
	{/if}
</div>

<style>
	.home-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 3rem 2rem;
	}

	.hero {
		text-align: center;
		margin-bottom: 4rem;
		padding: 2rem 0;
	}

	.hero-title {
		font-size: 3rem;
		font-weight: 700;
		color: var(--color-text-primary);
		margin: 0 0 1rem 0;
		letter-spacing: -0.02em;
	}

	.hero-subtitle {
		font-size: 1.25rem;
		color: var(--color-text-secondary);
		margin: 0;
	}

	.features {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 2rem;
		margin-bottom: 4rem;
	}

	.feature-card {
		background: var(--color-surface);
		border: 2px solid var(--color-border-primary);
		border-radius: 12px;
		padding: 2rem;
		text-align: center;
		text-decoration: none;
		color: inherit;
		transition: all 0.3s;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.feature-card:hover {
		border-color: var(--color-primary);
		box-shadow: 0 8px 24px oklch(0.89 0.18 166 / 0.15);
		transform: translateY(-4px);
	}

	.feature-card:focus {
		outline: 2px solid var(--color-primary);
		outline-offset: 2px;
	}

	.feature-icon {
		font-size: 3rem;
		margin-bottom: 1rem;
	}

	.feature-card h2 {
		font-size: 1.5rem;
		margin: 0 0 0.5rem 0;
		color: var(--color-text-primary);
	}

	.feature-card p {
		margin: 0;
		color: var(--color-text-secondary);
		font-size: 0.95rem;
	}

	.recent-bookmarks {
		background: white;
		border-radius: 12px;
		padding: 2rem;
		border: 1px solid #e0e0e0;
	}

	.recent-bookmarks h2 {
		margin: 0 0 1.5rem 0;
		color: var(--color-text-primary);
		font-size: 1.5rem;
	}

	.bookmark-list {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.bookmark-item {
		border-bottom: 1px solid #f0f0f0;
	}

	.bookmark-item:last-child {
		border-bottom: none;
	}

	.bookmark-item a {
		display: flex;
		flex-direction: column;
		padding: 1rem 0;
		text-decoration: none;
		color: inherit;
		transition: background-color 0.2s;
	}

	.bookmark-item a:hover {
		background-color: var(--color-background-secondary);
	}

	.bookmark-title {
		font-weight: 600;
		color: var(--color-primary);
		margin-bottom: 0.25rem;
	}

	.bookmark-description {
		font-size: 0.9rem;
		color: var(--color-text-secondary);
	}

	.view-all {
		display: inline-block;
		margin-top: 1rem;
		color: var(--color-primary);
		text-decoration: none;
		font-weight: 600;
		transition: color 0.2s;
	}

	.view-all:hover {
		color: var(--color-primary-dark);
		text-decoration: underline;
	}

	@media (max-width: 768px) {
		.home-container {
			padding: 2rem 1rem;
		}

		.hero {
			margin-bottom: 2rem;
		}

		.hero-title {
			font-size: 2rem;
		}

		.hero-subtitle {
			font-size: 1rem;
		}

		.features {
			gap: 1rem;
		}
	}
</style>
