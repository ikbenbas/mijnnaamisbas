import type { Snippet } from 'svelte';
import type { HTMLFormAttributes } from 'svelte/elements';

export type MNBFormProps = {
	children: Snippet;
	onsubmit?: (event: SubmitEvent) => void;
	class?: string;
} & Omit<HTMLFormAttributes, 'class' | 'onsubmit'>;
