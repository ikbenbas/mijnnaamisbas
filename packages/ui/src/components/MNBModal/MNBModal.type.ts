import type { Snippet } from 'svelte';

export type MNBModalProps = {
	open?: boolean;
	onClose?: () => void;
	title?: string;
	maxWidth?: number;
	children: Snippet;
	actions?: Snippet;
	class?: string;
};
