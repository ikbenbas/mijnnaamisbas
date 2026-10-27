<script lang="ts">
	import type { MNBBackLinkProps } from './MNBBackLink.type';

	let { href, children, class: classes = '' }: MNBBackLinkProps = $props();

	const baseClasses = $derived(['mnb-back', classes].filter(Boolean).join(' '));
</script>

<p class={baseClasses}>
	<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- caller passes resolve() -->
	<a {href} class="link">← {@render children()}</a>
</p>

<style lang="postcss">
	.mnb-back {
		margin: 0 0 var(--mnb-space-md);
	}

	.link {
		color: var(--mnb-color-text-secondary);
		font-size: var(--mnb-font-size-sm);
		text-decoration: none;

		&:hover {
			text-decoration: underline;
		}

		&:focus-visible {
			outline: var(--mnb-border-width-thick) solid var(--mnb-color-secondary);
			outline-offset: var(--mnb-border-width-thick);
		}
	}
</style>
