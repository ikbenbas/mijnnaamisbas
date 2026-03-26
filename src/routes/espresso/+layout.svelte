<script lang="ts">
	// Espresso section uses the main layout navigation
	// This layout just adds a sub-navigation for espresso pages
</script>

<div class="espresso-layout">
	<nav class="espresso-nav">
		<a href="/espresso">Overview</a>
		<a href="/espresso/notes">All notes</a>
		<a href="/espresso/notes/new">+ New note</a>
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
		gap: var(--space-md);
		padding: var(--space-md) 0;
		border-bottom: var(--border-width) solid var(--color-border-primary);
		margin-bottom: var(--space-xl);
	}

	.espresso-nav a {
		color: var(--color-text-primary);
		text-decoration: none;
		font-weight: var(--font-weight-medium);
		padding: var(--space-sm) var(--space-md);
		border-radius: var(--radius-md);
		transition: all var(--transition-fast);
	}

	.espresso-nav a:hover {
		background: var(--color-bg-secondary);
		color: var(--color-primary);
	}

	.espresso-nav a:focus-visible {
		outline: 2px solid var(--color-border-focus);
		outline-offset: 2px;
	}

	.espresso-content {
		/* Content container */
	}

	@media (max-width: 768px) {
		.espresso-layout {
			padding: var(--space-md);
		}

		.espresso-nav {
			flex-wrap: wrap;
			gap: var(--space-sm);
		}

		.espresso-nav a {
			padding: var(--space-xs) var(--space-sm);
			font-size: var(--font-size-sm);
		}
	}
</style>
