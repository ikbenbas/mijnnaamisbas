<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * Modal component - A reusable modal dialog following WCAG 2.2 accessibility guidelines
	 *
	 * @param open - Controls modal visibility
	 * @param onClose - Callback when user requests to close modal
	 * @param title - Modal title (optional, can use title slot instead)
	 * @param maxWidth - Maximum width in pixels (default: 600)
	 * @param children - Modal content slot
	 * @param actions - Optional actions/buttons slot
	 *
	 * @example
	 * ```svelte
	 * <Modal open={showModal} onClose={handleClose} title="Add Item">
	 *   <form>...</form>
	 *   {#snippet actions()}
	 *     <button type="submit">Save</button>
	 *   {/snippet}
	 * </Modal>
	 * ```
	 */
	let {
		open = $bindable(false),
		onClose,
		title,
		maxWidth = 600,
		children,
		actions
	}: {
		open?: boolean;
		onClose?: () => void;
		title?: string;
		maxWidth?: number;
		children: Snippet;
		actions?: Snippet;
	} = $props();

	/**
	 * Handle Escape key to close modal
	 */
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && open) {
			handleClose();
		}
	}

	/**
	 * Handle overlay click to close modal
	 */
	function handleOverlayClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			handleClose();
		}
	}

	/**
	 * Close modal and call onClose callback
	 */
	function handleClose() {
		open = false;
		onClose?.();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<div
		class="modal-overlay"
		onclick={handleOverlayClick}
		onkeydown={handleKeydown}
		role="dialog"
		aria-modal="true"
		aria-labelledby={title ? 'modal-title' : undefined}
		tabindex="-1"
	>
		<div class="modal" style="max-width: {maxWidth}px;">
			<button
				class="modal__close"
				onclick={handleClose}
				aria-label="Close modal"
				type="button"
			>
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
				>
					<line x1="18" y1="6" x2="6" y2="18"></line>
					<line x1="6" y1="6" x2="18" y2="18"></line>
				</svg>
			</button>

			{#if title}
				<h2 id="modal-title" class="modal__title">{title}</h2>
			{/if}

			<div class="modal__content">
				{@render children()}
			</div>

			{#if actions}
				<div class="modal__actions">
					{@render actions()}
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: oklch(0 0 0 / 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-lg);
		z-index: var(--z-modal);
		animation: fadeIn var(--transition-fast);
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.modal {
		background: var(--color-bg-primary);
		border-radius: var(--radius-xl);
		box-shadow: var(--shadow-xl);
		width: 100%;
		max-height: 90vh;
		overflow-y: auto;
		position: relative;
		padding: var(--space-xl);
		animation: slideUp var(--transition-base);
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.modal__close {
		position: absolute;
		top: var(--space-lg);
		right: var(--space-lg);
		background: transparent;
		border: none;
		padding: var(--space-xs);
		cursor: pointer;
		color: var(--color-text-secondary);
		border-radius: var(--radius-sm);
		transition: all var(--transition-fast);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.modal__close:hover {
		background: var(--color-bg-secondary);
		color: var(--color-text-primary);
	}

	.modal__close:focus-visible {
		outline: 2px solid var(--color-border-focus);
		outline-offset: 2px;
	}

	.modal__title {
		font-size: var(--font-size-2xl);
		font-weight: var(--font-weight-bold);
		color: var(--color-text-primary);
		margin: 0 0 var(--space-lg) 0;
		padding-right: var(--space-2xl);
	}

	.modal__content {
		color: var(--color-text-primary);
	}

	.modal__actions {
		display: flex;
		gap: var(--space-md);
		justify-content: flex-end;
		margin-top: var(--space-xl);
		padding-top: var(--space-lg);
		border-top: var(--border-width) solid var(--color-border-secondary);
	}
</style>
