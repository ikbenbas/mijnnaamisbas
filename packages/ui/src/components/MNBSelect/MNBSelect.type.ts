import type { Snippet } from 'svelte';
import type { HTMLSelectAttributes } from 'svelte/elements';

export type MNBSelectProps = {
	value?: string | number;
	label?: string;
	hint?: string;
	error?: string;
	required?: boolean;
	disabled?: boolean;
	children: Snippet;
	class?: string;
} & Omit<HTMLSelectAttributes, 'class' | 'value' | 'disabled' | 'required'>;
