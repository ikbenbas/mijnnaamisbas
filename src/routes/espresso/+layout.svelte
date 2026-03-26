<script lang="ts">
	import '$lib/styles/espresso.css';
</script>

<!-- Espresso has its own complete layout with custom styling -->
<nav>
	<a href="/espresso" class="brand">☕ Coffee Notes</a>
	<a href="/espresso/notes">All notes</a>
	<a href="/espresso/notes/new">+ New note</a>
</nav>

<main>
	<slot />
</main>

<footer>
	<p>Coffee Notes · <a href="/">Back to main site</a></p>
</footer>

<style>
	:global(*) {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	:global(body) {
		font-family: 'Segoe UI', system-ui, sans-serif;
		background: var(--color-bg);
		color: var(--color-text);
		min-height: 100vh;
	}

	nav {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		padding: 1rem 2rem;
		background: var(--color-accent);
		color: var(--color-bg);
	}

	nav a {
		color: var(--color-bg);
		text-decoration: none;
		font-size: 0.95rem;
	}

	nav a:hover {
		text-decoration: underline;
	}

	.brand {
		font-size: 1.2rem;
		font-weight: 700;
		margin-right: auto;
	}

	main {
		max-width: 900px;
		margin: 0 auto;
		padding: 2rem 1.5rem;
	}

	footer {
		text-align: center;
		padding: 2rem;
		color: var(--color-muted);
		font-size: 0.85rem;
	}
</style>
