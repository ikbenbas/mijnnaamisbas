<script lang="ts">
	import { MNBSiteFrame, appUrls } from '@mnb/ui';
	import { setContext } from 'svelte';

	import { resolve } from '$app/paths';
	import { env } from '$env/dynamic/public';


	let { children } = $props();

	const urls = appUrls(env);
	setContext('app-urls', urls);

	const links = {
		home: urls.bookmarks,
		bookmarks: `${urls.bookmarks}/list`,
		espresso: resolve('/'),
		tidal: urls.tidal
	};
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<MNBSiteFrame active="espresso" {links}>
	<div class="espresso-layout">
		<nav class="espresso-nav" aria-label="Coffee notes">
			<a href={resolve('/')}>Overview</a>
			<a href={resolve('/notes')}>All notes</a>
			<a href={resolve('/notes/new')}>+ New note</a>
		</nav>

		<div class="espresso-content">
			{@render children()}
		</div>
	</div>
</MNBSiteFrame>

<style>
	.espresso-layout {
		max-width: var(--mnb-max-width-lg);
		margin: 0 auto;
		padding: var(--mnb-space-xl);
	}

	.espresso-nav {
		display: flex;
		gap: 0;
		margin-bottom: var(--mnb-space-xl);
		border: var(--mnb-border-width-thick) solid var(--mnb-color-black);
		background: var(--mnb-color-black);
	}

	.espresso-nav a {
		flex: 1;
		text-align: center;
		color: var(--mnb-color-white);
		text-decoration: none;
		font-family: var(--mnb-font-primary);
		font-weight: var(--mnb-font-weight-bold);
		font-size: var(--mnb-font-size-sm);
		text-transform: uppercase;
		letter-spacing: 0.04em;
		padding: 0.7rem var(--mnb-space-md);
		border-right: var(--mnb-border-width) solid var(--mnb-color-white);
		opacity: 1;
		transition:
			background var(--mnb-transition-fast),
			color var(--mnb-transition-fast);
	}

	.espresso-nav a:last-child {
		border-right: none;
	}

	.espresso-nav a:hover {
		background: var(--mnb-color-offwhite);
		color: var(--mnb-color-ink);
		opacity: 1;
	}

	.espresso-nav a:focus-visible {
		outline: 2px solid var(--mnb-color-secondary);
		outline-offset: -2px;
	}

	@media (max-width: 768px) {
		.espresso-layout {
			padding: var(--mnb-space-md);
		}

		.espresso-nav {
			flex-wrap: wrap;
		}

		.espresso-nav a {
			flex: 1 1 33%;
			padding: var(--mnb-space-sm);
			font-size: var(--mnb-font-size-xs);
		}
	}
</style>
