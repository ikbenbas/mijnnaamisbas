<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>mijnnaamisbas</title>
</svelte:head>

<div class="home">
	<section class="hero" aria-label="Intro">
		<div class="hero__plane">
			<div class="hero__grain" aria-hidden="true"></div>
			<div class="hero__copy">
				<p class="hero__eyebrow">Personal dashboard</p>
				<h1 class="hero__brand">Mijnnaamisbas</h1>
				<p class="hero__lede">Bookmarks, playlists, and coffee notes — dialed in.</p>
			</div>
			<a href={resolve('/espresso')} class="hero__cta">View coffee notes</a>
		</div>
	</section>

	<div class="section-bar">Featured</div>

	<section class="features" aria-label="Sections">
		<a href={resolve('/bookmarks')} class="feature">
			<span class="feature__label">01</span>
			<h2>Bookmarks</h2>
			<p>Saved links and resources</p>
		</a>
		<a href={resolve('/tidal')} class="feature">
			<span class="feature__label">02</span>
			<h2>Tidal</h2>
			<p>AI playlist suggestions</p>
		</a>
		<a href={resolve('/espresso')} class="feature">
			<span class="feature__label">03</span>
			<h2>Coffee notes</h2>
			<p>Espresso dial-in log</p>
		</a>
	</section>

	{#if data.bookmarks && data.bookmarks.length > 0}
		<div class="section-bar">Recent bookmarks</div>
		<section class="recent">
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
	.home {
		width: 100%;
	}

	.hero {
		border-bottom: var(--border-width-thick) solid var(--color-black);
	}

	.hero__plane {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		gap: var(--space-xl);
		min-height: min(72vh, 640px);
		padding: clamp(2rem, 6vw, 4rem);
		background:
			linear-gradient(180deg, transparent 35%, color-mix(in srgb, var(--color-black) 72%, transparent) 100%),
			linear-gradient(125deg, var(--color-primary-hover) 0%, var(--color-hero-mid) 40%, var(--color-hero-end) 100%);
		color: var(--color-offwhite);
		overflow: hidden;
	}

	.hero__grain {
		position: absolute;
		inset: 0;
		opacity: 0.18;
		background-image: var(--pattern-dots);
		background-size: 4px 4px;
		pointer-events: none;
		mix-blend-mode: soft-light;
		animation: grain-shift 8s steps(4) infinite;
	}

	@keyframes grain-shift {
		0%,
		100% {
			transform: translate(0, 0);
		}
		25% {
			transform: translate(-2px, 1px);
		}
		50% {
			transform: translate(1px, -2px);
		}
		75% {
			transform: translate(-1px, -1px);
		}
	}

	.hero__copy {
		position: relative;
		z-index: 1;
		max-width: 36rem;
	}

	.hero__eyebrow {
		margin: 0 0 0.75rem;
		font-family: var(--font-handjet);
		font-size: var(--font-size-lg);
		letter-spacing: var(--letter-spacing-marquee);
		text-transform: uppercase;
		opacity: 0.85;
	}

	.hero__brand {
		margin: 0 0 0.75rem;
		font-family: var(--font-display);
		font-size: clamp(2.75rem, 10vw, 5.5rem);
		line-height: 0.95;
		letter-spacing: -0.03em;
		text-transform: uppercase;
		color: var(--color-offwhite);
	}

	.hero__lede {
		margin: 0;
		font-size: var(--font-size-lg);
		max-width: 28rem;
		opacity: 0.9;
	}

	.hero__cta {
		position: relative;
		z-index: 1;
		align-self: flex-start;
		display: inline-flex;
		align-items: center;
		padding: 0.85rem 1.5rem;
		background: var(--color-offwhite);
		color: var(--color-ink);
		font-family: var(--font-display);
		font-size: clamp(0.95rem, 2vw, 1.15rem);
		text-transform: uppercase;
		text-decoration: none;
		letter-spacing: 0.03em;
		border: var(--border-width-thick) solid var(--color-black);
		box-shadow: var(--shadow-md);
		transition: transform var(--transition-fast), box-shadow var(--transition-fast);
		opacity: 1;
	}

	.hero__cta:hover {
		transform: translate(-2px, -2px);
		box-shadow: 5px 5px 0 var(--color-black);
		opacity: 1;
	}

	.features {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		border-bottom: var(--border-width-thick) solid var(--color-black);
	}

	.feature {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: clamp(1.25rem, 3vw, 2rem);
		background: var(--color-offwhite);
		border-right: var(--border-width-thick) solid var(--color-black);
		text-decoration: none;
		color: inherit;
		opacity: 1;
		transition: background var(--transition-fast);
	}

	.feature:last-child {
		border-right: none;
	}

	.feature:hover {
		background: var(--color-white);
		opacity: 1;
	}

	.feature:focus-visible {
		outline: 2px solid var(--color-secondary);
		outline-offset: -2px;
	}

	.feature__label {
		font-family: var(--font-handjet);
		font-size: var(--font-size-lg);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-text-tertiary);
	}

	.feature h2 {
		margin: 0;
		font-size: clamp(1.25rem, 2.5vw, 1.75rem);
	}

	.feature p {
		margin: 0;
		color: var(--color-text-secondary);
		font-size: var(--font-size-sm);
	}

	.recent {
		padding: clamp(1.5rem, 4vw, 2.5rem);
		background: var(--color-offwhite);
		border-bottom: var(--border-width-thick) solid var(--color-black);
	}

	.bookmark-list {
		list-style: none;
		margin: 0;
		padding: 0;
		border: var(--border-width-thick) solid var(--color-black);
		background: var(--color-white);
	}

	.bookmark-item {
		border-bottom: var(--border-width) solid var(--color-black);
	}

	.bookmark-item:last-child {
		border-bottom: none;
	}

	.bookmark-item a {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		padding: 1rem 1.15rem;
		text-decoration: none;
		color: inherit;
		opacity: 1;
		transition: background var(--transition-fast);
	}

	.bookmark-item a:hover {
		background: var(--color-paper);
		opacity: 1;
	}

	.bookmark-title {
		font-family: var(--font-display);
		font-size: var(--font-size-base);
		text-transform: uppercase;
	}

	.bookmark-description {
		font-size: var(--font-size-sm);
		color: var(--color-text-secondary);
	}

	.view-all {
		display: inline-block;
		margin-top: 1.25rem;
		font-family: var(--font-display);
		font-size: var(--font-size-sm);
		text-transform: uppercase;
		text-decoration: none;
		letter-spacing: 0.04em;
		border-bottom: var(--border-width-thick) solid var(--color-black);
		opacity: 1;
	}

	.view-all:hover {
		opacity: 0.65;
	}

	@media (max-width: 768px) {
		.hero__plane {
			min-height: 58vh;
		}

		.features {
			grid-template-columns: 1fr;
		}

		.feature {
			border-right: none;
			border-bottom: var(--border-width-thick) solid var(--color-black);
		}

		.feature:last-child {
			border-bottom: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hero__grain {
			animation: none;
		}
	}
</style>
