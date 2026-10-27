<script lang="ts">
	import type { MNBSiteFrameProps } from './MNBSiteFrame.type';

	let { active, links, children, class: classes = '' }: MNBSiteFrameProps = $props();

	const baseClasses = $derived(['mnb-site-frame', classes].filter(Boolean).join(' '));
</script>

<!-- Cross-app hrefs are absolute origins, so resolve() does not apply here. -->
<!-- eslint-disable svelte/no-navigation-without-resolve -->

<div class={baseClasses}>
	<header class="header">
		<a href={links.home} class="brand" aria-label="Mijnnaamisbas home">
			<span class="mark">MIJNNAAMISBAS</span>
		</a>

		<div class="marquee" aria-hidden="true">
			<div class="track">
				<span>More gratitude, less attitude · Built for Bas · More gratitude, less attitude · </span>
				<span>More gratitude, less attitude · Built for Bas · More gratitude, less attitude · </span>
			</div>
		</div>

		<nav class="links" aria-label="Primary">
			<a href={links.bookmarks} class:is-current={active === 'bookmarks'} aria-current={active === 'bookmarks' ? 'page' : undefined}>
				Bookmarks
			</a>
			<a href={links.tidal} class:is-current={active === 'tidal'} aria-current={active === 'tidal' ? 'page' : undefined}>
				Tidal
			</a>
			<a href={links.espresso} class:is-current={active === 'espresso'} aria-current={active === 'espresso' ? 'page' : undefined}>
				Coffee
			</a>
		</nav>
	</header>

	<main class="main">
		{@render children()}
	</main>

	<footer class="footer">
		<div class="bar">Info</div>
		<p>&copy; 2026 Bas van Wouwen · SvelteKit 2 &amp; Svelte 5</p>
	</footer>
</div>

<style lang="postcss">
	.mnb-site-frame {
		display: contents;
	}

	.header {
		position: sticky;
		top: 0;
		z-index: var(--mnb-z-sticky);
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: stretch;
		height: var(--mnb-nav-height);
		background: var(--mnb-color-black);
		border-bottom: var(--mnb-border-width-thick) solid var(--mnb-color-black);
		color: var(--mnb-color-offwhite);
	}

	.brand {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 var(--mnb-space-md);
		background: var(--mnb-color-offwhite);
		border-right: var(--mnb-border-width-thick) solid var(--mnb-color-black);
		text-decoration: none;
		opacity: 1;

		&:hover {
			opacity: 1;
			background: var(--mnb-color-white);
		}

		&:focus-visible {
			outline: var(--mnb-border-width-thick) solid var(--mnb-color-secondary);
			outline-offset: calc(var(--mnb-border-width-thick) * -1);
		}
	}

	.mark {
		font-family: var(--mnb-font-display);
		font-size: clamp(var(--mnb-font-size-xs), 1.6vw, var(--mnb-font-size-base));
		line-height: var(--mnb-line-height-tight);
		letter-spacing: var(--mnb-letter-spacing-wide);
		color: var(--mnb-color-ink);
		text-transform: uppercase;
		white-space: nowrap;
	}

	.marquee {
		display: flex;
		align-items: center;
		overflow: hidden;
		min-width: 0;
		border-right: var(--mnb-border-width-thick) solid var(--mnb-color-white);
	}

	.track {
		display: flex;
		width: max-content;
		animation: marquee 28s linear infinite;
		font-family: var(--mnb-font-handjet);
		font-size: clamp(var(--mnb-font-size-base), 2vw, var(--mnb-font-size-xl));
		letter-spacing: var(--mnb-letter-spacing-marquee);
		text-transform: uppercase;
		white-space: nowrap;
		color: var(--mnb-color-white);
	}

	.links {
		display: flex;
		align-items: stretch;

		a {
			display: flex;
			align-items: center;
			padding: 0 var(--mnb-space-md);
			border-left: var(--mnb-border-width-thick) solid var(--mnb-color-white);
			color: var(--mnb-color-white);
			text-decoration: none;
			font-family: var(--mnb-font-primary);
			font-size: var(--mnb-font-size-sm);
			font-weight: var(--mnb-font-weight-bold);
			text-transform: uppercase;
			letter-spacing: var(--mnb-letter-spacing-wide);
			opacity: 1;
			transition:
				background var(--mnb-transition-fast),
				color var(--mnb-transition-fast);

			&:first-child {
				border-left: none;
			}

			&:hover {
				background: var(--mnb-color-white);
				color: var(--mnb-color-ink);
				opacity: 1;
			}

			&.is-current {
				background: var(--mnb-color-offwhite);
				color: var(--mnb-color-ink);
			}

			&:focus-visible {
				outline: var(--mnb-border-width-thick) solid var(--mnb-color-secondary);
				outline-offset: calc(var(--mnb-border-width-thick) * -1);
			}
		}
	}

	.main {
		flex: 1;
		width: 100%;
		min-height: calc(100vh - var(--mnb-nav-height) - var(--mnb-space-3xl));
	}

	.footer {
		margin-top: var(--mnb-space-3xl);
		background: var(--mnb-color-black);
		color: var(--mnb-color-offwhite);
		border-top: var(--mnb-border-width-thick) solid var(--mnb-color-black);

		p {
			margin: 0;
			padding: var(--mnb-space-lg) var(--mnb-space-xl);
			font-size: var(--mnb-font-size-sm);
			opacity: 0.85;
		}
	}

	.bar {
		padding: var(--mnb-space-sm) var(--mnb-space-lg);
		font-family: var(--mnb-font-display);
		font-size: var(--mnb-font-size-sm);
		text-transform: uppercase;
		letter-spacing: var(--mnb-letter-spacing-marquee);
		border-bottom: var(--mnb-border-width) solid var(--mnb-color-primary-light);
	}

	@keyframes marquee {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}

	@media (max-width: 768px) {
		.header {
			grid-template-columns: auto 1fr;
			height: auto;
			min-height: var(--mnb-nav-height);
		}

		.marquee {
			display: none;
		}

		.links {
			grid-column: 1 / -1;
			border-top: var(--mnb-border-width-thick) solid var(--mnb-color-white);
			justify-content: stretch;

			a {
				flex: 1;
				justify-content: center;
				padding: var(--mnb-space-sm);
				font-size: var(--mnb-font-size-xs);
				border-left: var(--mnb-border-width) solid var(--mnb-color-white);
			}
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.track {
			animation: none;
		}
	}
</style>
