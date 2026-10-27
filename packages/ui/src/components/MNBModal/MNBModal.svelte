<script lang="ts">
	import type { MNBModalProps } from './MNBModal.type';

	let {
		open = $bindable(false),
		onClose,
		title,
		maxWidth = 600,
		children,
		actions,
		class: classes = ''
	}: MNBModalProps = $props();

	const titleId = `mnb-modal-title-${Math.random().toString(36).slice(2, 9)}`;
	const baseClasses = $derived(['mnb-modal', classes].filter(Boolean).join(' '));

	const handleClose = () => {
		open = false;
		onClose?.();
	};

	const handleKeydown = (event: KeyboardEvent) => {
		if (event.key === 'Escape' && open) handleClose();
	};

	const handleOverlayClick = (event: MouseEvent) => {
		if (event.target === event.currentTarget) handleClose();
	};
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<div
		class="overlay"
		role="presentation"
		onclick={handleOverlayClick}
		onkeydown={handleKeydown}
	>
		<div
			class={baseClasses}
			style:max-width="{maxWidth}px"
			role="dialog"
			aria-modal="true"
			aria-labelledby={title ? titleId : undefined}
			tabindex="-1"
		>
			<button class="close" onclick={handleClose} aria-label="Close modal" type="button">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<line x1="18" y1="6" x2="6" y2="18"></line>
					<line x1="6" y1="6" x2="18" y2="18"></line>
				</svg>
			</button>

			{#if title}
				<h2 id={titleId} class="title">{title}</h2>
			{/if}

			<div class="content">
				{@render children()}
			</div>

			{#if actions}
				<div class="actions">
					{@render actions()}
				</div>
			{/if}
		</div>
	</div>
{/if}

<style lang="postcss">
	.overlay {
		position: fixed;
		inset: 0;
		background: color-mix(in srgb, var(--mnb-color-black) 50%, transparent);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--mnb-space-lg);
		z-index: var(--mnb-z-modal);
		animation: fadeIn var(--mnb-transition-fast);
	}

	.mnb-modal {
		background: var(--mnb-color-offwhite);
		border: var(--mnb-border-width-thick) solid var(--mnb-color-black);
		border-radius: var(--mnb-radius);
		box-shadow: var(--mnb-shadow-xl);
		width: 100%;
		max-height: 90vh;
		overflow-y: auto;
		position: relative;
		padding: var(--mnb-space-xl);
		animation: slideUp var(--mnb-transition-base);
	}

	.close {
		position: absolute;
		top: var(--mnb-space-lg);
		right: var(--mnb-space-lg);
		background: transparent;
		border: none;
		padding: var(--mnb-space-xs);
		cursor: pointer;
		color: var(--mnb-color-text-secondary);
		border-radius: var(--mnb-radius);
		display: flex;
		align-items: center;
		justify-content: center;

		&:hover {
			background: var(--mnb-color-paper);
			color: var(--mnb-color-ink);
		}

		&:focus-visible {
			outline: var(--mnb-border-width-thick) solid var(--mnb-color-black);
			outline-offset: var(--mnb-border-width-thick);
		}
	}

	.title {
		font-size: var(--mnb-font-size-2xl);
		font-weight: var(--mnb-font-weight-bold);
		color: var(--mnb-color-ink);
		margin: 0 0 var(--mnb-space-lg) 0;
		padding-right: var(--mnb-space-2xl);
	}

	.content {
		color: var(--mnb-color-ink);
	}

	.actions {
		display: flex;
		gap: var(--mnb-space-md);
		justify-content: flex-end;
		margin-top: var(--mnb-space-xl);
		padding-top: var(--mnb-space-lg);
		border-top: var(--mnb-border-width) solid var(--mnb-color-border-secondary);
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(var(--mnb-space-lg));
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.overlay,
		.mnb-modal {
			animation: none;
		}
	}
</style>
