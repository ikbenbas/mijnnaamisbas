<script lang="ts">
	import { page } from '$app/stores';
	import { resolve } from '$app/paths';
	import '../lib/styles/styles.css';

	let { children } = $props();

	// Check if we're in the espresso section
	const isEspressoRoute = $derived($page.url.pathname.startsWith('/espresso'));
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

{#if !isEspressoRoute}
	<nav class="main-nav">
		<div class="nav-container">
			<a href={resolve('/')} class="nav-brand">mijnnaamisbas</a>
			<div class="nav-links">
				<a
					href={resolve('/bookmarks')}
					class:active={$page.url.pathname.startsWith('/bookmarks')}
				>
					📚 Bookmarks
				</a>
				<a
					href={resolve('/tidal')}
					class:active={$page.url.pathname.startsWith('/tidal')}
				>
					🎵 Tidal
				</a>
				<a
					href={resolve('/espresso')}
					class:active={$page.url.pathname.startsWith('/espresso')}
				>
					☕ Coffee Notes
				</a>
			</div>
		</div>
	</nav>

	<main class="main-content">
		{@render children()}
	</main>

	<footer class="main-footer">
		<p>&copy; 2026 Bas van Wouwen · Built with SvelteKit 2 & Svelte 5</p>
	</footer>
{:else}
	<!-- Espresso section has its own layout -->
	{@render children()}
{/if}

<style>
	:global(*) {
		box-sizing: border-box;
	}

	:global(body) {
		margin: 0;
		padding: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
		background-color: #f9f9f9;
		color: #35495e;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.main-nav {
		background: linear-gradient(135deg, #3b8070 0%, #2d6559 100%);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		position: sticky;
		top: 0;
		z-index: 100;
	}

	.nav-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 2rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 60px;
	}

	.nav-brand {
		font-size: 1.25rem;
		font-weight: 700;
		color: white;
		text-decoration: none;
		transition: opacity 0.2s;
	}

	.nav-brand:hover {
		opacity: 0.85;
	}

	.nav-links {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}

	.nav-links a {
		padding: 0.5rem 1rem;
		color: rgba(255, 255, 255, 0.9);
		text-decoration: none;
		border-radius: 6px;
		transition: all 0.2s;
		font-weight: 500;
		font-size: 0.95rem;
	}

	.nav-links a:hover {
		background-color: rgba(255, 255, 255, 0.1);
		color: white;
	}

	.nav-links a.active {
		background-color: rgba(255, 255, 255, 0.2);
		color: white;
	}

	.nav-links a:focus {
		outline: 2px solid rgba(255, 255, 255, 0.5);
		outline-offset: 2px;
	}

	.main-content {
		flex: 1;
		width: 100%;
	}

	.main-footer {
		background-color: #35495e;
		color: rgba(255, 255, 255, 0.7);
		text-align: center;
		padding: 2rem;
		margin-top: 4rem;
	}

	.main-footer p {
		margin: 0;
		font-size: 0.9rem;
	}

	@media (max-width: 768px) {
		.nav-container {
			padding: 0 1rem;
		}

		.nav-brand {
			font-size: 1.1rem;
		}

		.nav-links {
			gap: 0.25rem;
		}

		.nav-links a {
			padding: 0.4rem 0.75rem;
			font-size: 0.85rem;
		}
	}
</style>

