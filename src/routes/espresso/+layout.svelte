<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<div class="espresso-layout">
	<nav class="espresso-nav" aria-label="Coffee notes">
		<a href={resolve('/espresso')}>Overview</a>
		<a href={resolve('/espresso/notes')}>All notes</a>
		<a href={resolve('/espresso/notes/new')}>+ New note</a>
	</nav>

	<div class="espresso-content">
		<slot />
	</div>
</div>

<style>
	.espresso-layout {
		max-width: var(--max-width-lg);
		margin: 0 auto;
		padding: var(--space-xl);
	}

	.espresso-nav {
		display: flex;
		gap: 0;
		margin-bottom: var(--space-xl);
		border: var(--border-width-thick) solid var(--color-black);
		background: var(--color-black);
	}

	.espresso-nav a {
		flex: 1;
		text-align: center;
		color: var(--color-white);
		text-decoration: none;
		font-family: var(--font-primary);
		font-weight: var(--font-weight-bold);
		font-size: var(--font-size-sm);
		text-transform: uppercase;
		letter-spacing: 0.04em;
		padding: 0.7rem var(--space-md);
		border-right: var(--border-width) solid var(--color-white);
		opacity: 1;
		transition: background var(--transition-fast), color var(--transition-fast);
	}

	.espresso-nav a:last-child {
		border-right: none;
	}

	.espresso-nav a:hover {
		background: var(--color-offwhite);
		color: var(--color-ink);
		opacity: 1;
	}

	.espresso-nav a:focus-visible {
		outline: 2px solid var(--color-secondary);
		outline-offset: -2px;
	}

	@media (max-width: 768px) {
		.espresso-layout {
			padding: var(--space-md);
		}

		.espresso-nav {
			flex-wrap: wrap;
		}

		.espresso-nav a {
			flex: 1 1 33%;
			padding: var(--space-sm);
			font-size: var(--font-size-xs);
		}
	}
</style>
