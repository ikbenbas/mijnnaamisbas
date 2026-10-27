import type { Snippet } from 'svelte';

import type { MNBCardPaddingEnum, MNBCardVariantEnum } from './MNBCard.enum';

export type MNBCardProps = {
	variant?: `${MNBCardVariantEnum}`;
	padding?: `${MNBCardPaddingEnum}`;
	hoverable?: boolean;
	clickable?: boolean;
	children: Snippet;
	header?: Snippet;
	footer?: Snippet;
	onclick?: () => void;
	class?: string;
};
