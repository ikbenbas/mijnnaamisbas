import type { HTMLTextareaAttributes } from 'svelte/elements';

export type MNBTextareaProps = {
	value?: string;
	label?: string;
	hint?: string;
	error?: string;
	required?: boolean;
	disabled?: boolean;
	rows?: number;
	class?: string;
} & Omit<HTMLTextareaAttributes, 'class' | 'value' | 'disabled' | 'required' | 'rows'>;
