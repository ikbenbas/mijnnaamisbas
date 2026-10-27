import type { Snippet } from 'svelte';
import type { HTMLButtonAttributes } from 'svelte/elements';

import type { MNBButtonSizeEnum, MNBButtonVariantEnum } from './MNBButton.enum';

export type MNBButtonProps = {
	href?: string;
	variant?: `${MNBButtonVariantEnum}`;
	size?: `${MNBButtonSizeEnum}`;
	fullWidth?: boolean;
	disabled?: boolean;
	loading?: boolean;
	children: Snippet;
	class?: string;
	onclick?: (event: MouseEvent) => void;
	type?: 'button' | 'submit' | 'reset';
} & Omit<HTMLButtonAttributes, 'class' | 'disabled' | 'type' | 'onclick'>;
