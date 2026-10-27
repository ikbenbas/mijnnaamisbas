import type { HTMLInputAttributes } from 'svelte/elements';

export type MNBInputProps = {
	value?: string | number;
	label?: string;
	hint?: string;
	error?: string;
	required?: boolean;
	disabled?: boolean;
	fullWidth?: boolean;
	class?: string;
} & Omit<HTMLInputAttributes, 'class' | 'value' | 'disabled' | 'required'>;
