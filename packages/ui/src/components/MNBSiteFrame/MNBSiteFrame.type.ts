import type { Snippet } from 'svelte';

import type { SiteApp, SiteLinks } from '../../urls';

export type MNBSiteFrameProps = {
	active: SiteApp;
	links: SiteLinks;
	children: Snippet;
	class?: string;
};
