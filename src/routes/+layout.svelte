<script lang="ts">
	import { page } from '$app/stores';
	import { resolve } from '$app/paths';
	import '../lib/styles/styles.css';

	let { children } = $props();
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<header class="site-header">
	<a href={resolve('/')} class="nav-brand" aria-label="Mijnnaamisbas home">
		<span class="nav-brand__mark">MIJNNAAMISBAS</span>
	</a>

	<div class="nav-marquee" aria-hidden="true">
		<div class="nav-marquee__track">
			<span>More gratitude, less attitude · Built for Bas · More gratitude, less attitude · </span>
			<span>More gratitude, less attitude · Built for Bas · More gratitude, less attitude · </span>
		</div>
	</div>

	<nav class="nav-links" aria-label="Primary">
		<a href={resolve('/bookmarks')} class:active={$page.url.pathname.startsWith('/bookmarks')}>
			Bookmarks
		</a>
		<a href={resolve('/tidal')} class:active={$page.url.pathname.startsWith('/tidal')}>
			Tidal
		</a>
		<a href={resolve('/espresso')} class:active={$page.url.pathname.startsWith('/espresso')}>
			Coffee
		</a>
	</nav>
</header>

<main class="main-content">
	{@render children()}
</main>

<footer class="main-footer">
	<div class="footer-bar">Info</div>
	<p>&copy; 2026 Bas van Wouwen · SvelteKit 2 &amp; Svelte 5</p>
</footer>

<style>
	.site-header {
		position: sticky;
		top: 0;
		z-index: var(--z-sticky);
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: stretch;
		height: var(--nav-height);
		background: var(--color-black);
		border-bottom: var(--border-width-thick) solid var(--color-black);
		color: var(--color-text-inverse);
	}

	.nav-brand {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 0.85rem;
		background: var(--color-offwhite);
		border-right: var(--border-width-thick) solid var(--color-black);
		text-decoration: none;
		opacity: 1;
	}

	.nav-brand:hover {
		opacity: 1;
		background: var(--color-white);
	}

	.nav-brand:focus-visible {
		outline: 2px solid var(--color-secondary);
		outline-offset: -2px;
	}

	.nav-brand__mark {
		font-family: var(--font-display);
		font-size: clamp(0.7rem, 1.6vw, 1rem);
		line-height: 1;
		letter-spacing: 0.02em;
		color: var(--color-ink);
		text-transform: uppercase;
		white-space: nowrap;
	}

	.nav-marquee {
		display: flex;
		align-items: center;
		overflow: hidden;
		min-width: 0;
		border-right: var(--border-width-thick) solid #fff;
	}

	.nav-marquee__track {
		display: flex;
		width: max-content;
		gap: 0;
		animation: marquee 28s linear infinite;
		font-family: var(--font-handjet);
		font-size: clamp(0.95rem, 2vw, 1.25rem);
		letter-spacing: var(--letter-spacing-marquee);
		text-transform: uppercase;
		white-space: nowrap;
		color: #fff;
	}

	@keyframes marquee {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}

	.nav-links {
		display: flex;
		align-items: stretch;
	}

	.nav-links a {
		display: flex;
		align-items: center;
		padding: 0 1rem;
		border-left: var(--border-width-thick) solid #fff;
		color: #fff;
		text-decoration: none;
		font-family: var(--font-primary);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-bold);
		text-transform: uppercase;
		letter-spacing: 0.04em;
		opacity: 1;
		transition: background var(--transition-fast), color var(--transition-fast);
	}

	.nav-links a:first-child {
		border-left: none;
	}

	.nav-links a:hover {
		background: #fff;
		color: var(--color-ink);
		opacity: 1;
	}

	.nav-links a.active {
		background: var(--color-offwhite);
		color: var(--color-ink);
	}

	.nav-links a:focus-visible {
		outline: 2px solid var(--color-secondary);
		outline-offset: -2px;
	}

	.main-content {
		flex: 1;
		width: 100%;
		min-height: calc(100vh - var(--nav-height) - 96px);
	}

	.main-footer {
		margin-top: var(--space-3xl);
		background: var(--color-black);
		color: var(--color-text-inverse);
		border-top: var(--border-width-thick) solid var(--color-black);
	}

	.footer-bar {
		padding: 0.45rem 1.25rem;
		font-family: var(--font-display);
		font-size: var(--font-size-sm);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		border-bottom: 1px solid #333;
	}

	.main-footer p {
		margin: 0;
		padding: var(--space-lg) var(--space-xl);
		font-size: var(--font-size-sm);
		opacity: 0.85;
	}

	@media (max-width: 768px) {
		.site-header {
			grid-template-columns: auto 1fr;
			height: auto;
			min-height: var(--nav-height);
		}

		.nav-marquee {
			display: none;
		}

		.nav-links {
			grid-column: 1 / -1;
			border-top: var(--border-width-thick) solid #fff;
			justify-content: stretch;
		}

		.nav-links a {
			flex: 1;
			justify-content: center;
			padding: 0.65rem 0.5rem;
			font-size: var(--font-size-xs);
			border-left: var(--border-width) solid #fff;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.nav-marquee__track {
			animation: none;
		}
	}
</style>
