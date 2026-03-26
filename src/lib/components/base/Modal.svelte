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
	>
		<div class="modal" style="max-width: {maxWidth}px;">
			<button
				class="modal__close"
				onclick={handleClose}
				aria-label="Close modal"
				type="button"
			>
				✕
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
		width: 100%;
		height: 100%;
		background-color: rgba(255, 255, 255, 0.7);
		backdrop-filter: blur(3px);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 999;
		animation: fadeIn 0.15s ease-out;
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
		background-color: #fff;
		box-shadow:
			0 4px 8px 0 rgba(0, 0, 0, 0.2),
			0 6px 20px 0 rgba(0, 0, 0, 0.2);
		box-sizing: border-box;
		padding: 1.5rem;
		width: 90vw;
		max-height: 90vh;
		overflow-y: auto;
		border-radius: 8px;
		animation: slideIn 0.2s ease-out;
		position: relative;
	}

	@keyframes slideIn {
		from {
			transform: translateY(-20px);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	.modal__close {
		background: none;
		border: none;
		cursor: pointer;
		position: absolute;
		right: 1.5rem;
		top: 1.5rem;
		font-size: 1.5rem;
		color: #666;
		width: 2rem;
		height: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 4px;
		transition: all 0.15s;
	}

	.modal__close:hover {
		background-color: rgba(0, 0, 0, 0.05);
		color: #000;
	}

	.modal__close:focus {
		outline: 2px solid #3b8070;
		outline-offset: 2px;
	}

	.modal__title {
		margin: 0 0 1.5rem 0;
		padding-right: 2rem;
		font-size: 1.5rem;
		color: #35495e;
	}

	.modal__content {
		margin-bottom: 1rem;
	}

	.modal__actions {
		display: flex;
		justify-content: flex-end;
		gap: 0.75rem;
		margin-top: 1.5rem;
		padding-top: 1rem;
		border-top: 1px solid #e0e0e0;
	}

	/* Ensure body doesn't scroll when modal is open */
	:global(body:has(.modal-overlay)) {
		overflow: hidden;
	}
</style>
