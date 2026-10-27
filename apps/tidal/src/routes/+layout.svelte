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
		espresso: urls.espresso,
		tidal: resolve('/')
	};
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<MNBSiteFrame active="tidal" {links}>
	{@render children()}
</MNBSiteFrame>
