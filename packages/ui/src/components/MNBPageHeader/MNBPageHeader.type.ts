import type { Snippet } from 'svelte';

export type MNBPageHeaderProps = {
	title: string;
	lede?: string;
	actions?: Snippet;
	class?: string;
};
