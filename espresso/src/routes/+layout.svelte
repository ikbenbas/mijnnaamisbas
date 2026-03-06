<script lang="ts">
	import '../app.css';
</script>

<nav>
	<a href="/" class="brand">☕ Espresso Notes</a>
	<a href="/notes">All notes</a>
	<a href="/notes/new">+ New note</a>
</nav>

<main>
	<slot />
</main>

<footer>
	<p>Espresso Notes — powered by <a href="https://hygraph.com" target="_blank" rel="noopener">Hygraph</a></p>
</footer>

<style>
	:global(*) {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	:global(body) {
		font-family: 'Segoe UI', system-ui, sans-serif;
		background: #faf6f1;
		color: #2d1b0e;
		min-height: 100vh;
	}

	nav {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		padding: 1rem 2rem;
		background: #3b1f0a;
		color: #faf6f1;
	}

	nav a {
		color: #faf6f1;
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
		color: #7a5c3d;
		font-size: 0.85rem;
	}

	footer a {
		color: #7a5c3d;
	}
</style>
