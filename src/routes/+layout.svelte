<script lang="ts">
	import { page } from '$app/stores';
	import { resolve } from '$app/paths';
	import '../lib/styles/styles.css';

	let { children } = $props();
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<nav class="main-nav">
	<div class="nav-container">
		<a href={resolve('/')} class="nav-brand">mijnnaamisbas</a>
		<div class="nav-links">
			<a href={resolve('/bookmarks')} class:active={$page.url.pathname.startsWith('/bookmarks')}>
				📚 Bookmarks
			</a>
			<a href={resolve('/tidal')} class:active={$page.url.pathname.startsWith('/tidal')}>
				🎵 Tidal
			</a>
			<a href={resolve('/espresso')} class:active={$page.url.pathname.startsWith('/espresso')}>
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

<style>
	.main-nav {
		background: var(--gradient-primary);
		box-shadow: var(--shadow-md);
		position: sticky;
		top: 0;
		z-index: var(--z-sticky);
	}

	.nav-container {
		max-width: var(--max-width-xl);
		margin: 0 auto;
		padding: 0 var(--space-xl);
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 60px;
	}

	.nav-brand {
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-bold);
		color: var(--color-text-inverse);
		text-decoration: none;
		transition: opacity var(--transition-fast);
	}

	.nav-brand:hover {
		opacity: 0.85;
	}

	.nav-brand:focus-visible {
		outline: 2px solid var(--color-text-inverse);
		outline-offset: 2px;
		border-radius: var(--radius-xs);
	}

	.nav-links {
		display: flex;
		gap: var(--space-sm);
		align-items: center;
	}

	.nav-links a {
		padding: var(--space-sm) var(--space-md);
		color: var(--color-text-inverse);
		opacity: 0.9;
		text-decoration: none;
		border-radius: var(--radius-md);
		transition: all var(--transition-fast);
		font-weight: var(--font-weight-medium);
		font-size: var(--font-size-sm);
	}

	.nav-links a:hover {
		background-color: oklch(1 0 0 / 0.1);
		opacity: 1;
	}

	.nav-links a.active {
		background-color: oklch(1 0 0 / 0.2);
		opacity: 1;
		font-weight: var(--font-weight-semibold);
	}

	.nav-links a:focus-visible {
		outline: 2px solid var(--color-text-inverse);
		outline-offset: 2px;
	}

	.main-content {
		flex: 1;
		width: 100%;
		min-height: calc(100vh - 60px - 80px); /* viewport - nav - footer */
	}

	.main-footer {
		background-color: var(--color-text-primary);
		color: var(--color-text-inverse);
		opacity: 0.7;
		text-align: center;
		padding: var(--space-xl);
		margin-top: var(--space-3xl);
	}

	.main-footer p {
		margin: 0;
		font-size: var(--font-size-sm);
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.nav-container {
			padding: 0 var(--space-md);
		}

		.nav-brand {
			font-size: var(--font-size-lg);
		}

		.nav-links {
			gap: var(--space-xs);
		}

		.nav-links a {
			padding: var(--space-xs) var(--space-sm);
			font-size: var(--font-size-xs);
		}
	}
</style>

