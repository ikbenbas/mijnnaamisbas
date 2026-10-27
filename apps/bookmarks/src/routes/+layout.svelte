<script lang="ts">
	import { MNBSiteFrame, appUrls } from '@mnb/ui';
	import { setContext } from 'svelte';

	import { resolve } from '$app/paths';
	import { env } from '$env/dynamic/public';


	let { children } = $props();

	const urls = appUrls(env);
	setContext('app-urls', urls);

	const links = {
		home: resolve('/'),
		bookmarks: resolve('/list'),
		espresso: urls.espresso,
		tidal: urls.tidal
	};
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<MNBSiteFrame active="bookmarks" {links}>
	{@render children()}
</MNBSiteFrame>
