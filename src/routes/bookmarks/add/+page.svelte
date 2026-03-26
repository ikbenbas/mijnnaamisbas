<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { enhance } from '$app/forms';
	import { Modal } from '$lib';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();

	let isOpen = $state(true);
	let isSubmitting = $state(false);

	// Pre-fill link from URL parameter if provided
	const initialLink = page.url.searchParams.get('link') ?? '';
	let link = $state(initialLink);
	let title = $state('');
	let description = $state('');

	// Restore form values from server validation errors
	$effect(() => {
		if (form?.link) link = form.link;
		if (form?.title) title = form.title;
		if (form?.description) description = form.description;
	});

	const handleClose = () => {
		isOpen = false;
		goto(resolve('/bookmarks'));
	};
</script>

<svelte:head>
	<title>Add Bookmark – mijnnaamisbas</title>
</svelte:head>

<Modal open={isOpen} onClose={handleClose} title="Add Bookmark" maxWidth={600}>
	{#if form?.error}
		<div class="error-message" role="alert">
			{form.error}
		</div>
	{/if}

	<form
		method="POST"
		action="?/create"
		use:enhance={() => {
			isSubmitting = true;
			return async ({ update }) => {
				await update();
				isSubmitting = false;
			};
		}}
	>
		<div class="form-group">
			<label for="link">
				Link <span class="required">*</span>
			</label>
			<input
				id="link"
				name="link"
				type="url"
				bind:value={link}
				placeholder="https://example.com"
				required
				aria-required="true"
				aria-describedby={form?.error ? 'error-message' : undefined}
			/>
		</div>

		<div class="form-group">
			<label for="title">Title (optional)</label>
			<input
				id="title"
				name="title"
				type="text"
				bind:value={title}
				placeholder="Leave empty to auto-generate from URL"
				maxlength="200"
			/>
			<span class="hint">If left empty, we'll use the website's domain name</span>
		</div>

		<div class="form-group">
			<label for="description">Description (optional)</label>
			<textarea
				id="description"
				name="description"
				bind:value={description}
				placeholder="Add notes about this bookmark..."
				rows="3"
				maxlength="500"
			></textarea>
		</div>

		{#snippet actions()}
			<button type="button" onclick={handleClose} class="btn btn-secondary" disabled={isSubmitting}>
				Cancel
			</button>
			<button type="submit" class="btn btn-primary" disabled={isSubmitting}>
				{isSubmitting ? 'Saving...' : 'Add Bookmark'}
			</button>
		{/snippet}
	</form>
</Modal>

<style>
	.error-message {
		background-color: oklch(0.95 0.05 25);
		border: var(--border-width) solid oklch(0.85 0.10 25);
		border-radius: var(--radius-sm);
		color: var(--color-error);
		padding: var(--space-md);
		margin-bottom: var(--space-md);
	}

	.form-group {
		margin-bottom: 1.25rem;
	}

	.form-group:last-of-type {
		margin-bottom: 0;
	}

	label {
		display: block;
		font-weight: var(--font-weight-semibold);
		font-size: var(--font-size-sm);
		margin-bottom: var(--space-sm);
		color: var(--color-text-primary);
	}

	.required {
		color: var(--color-error);
	}

	input,
	textarea {
		width: 100%;
		padding: var(--space-sm) var(--space-md);
		border: var(--border-width) solid var(--color-border-primary);
		border-radius: var(--radius-sm);
		font-size: var(--font-size-base);
		font-family: inherit;
		transition: border-color var(--transition-fast);
	}

	input:focus,
	textarea:focus {
		outline: none;
		border-color: var(--color-border-focus);
		box-shadow: var(--shadow-focus);
	}

	textarea {
		resize: vertical;
		min-height: 80px;
	}

	.hint {
		display: block;
		font-size: var(--font-size-xs);
		color: var(--color-text-secondary);
		margin-top: var(--space-xs);
	}

	.btn {
		padding: var(--space-sm) var(--space-lg);
		border: none;
		border-radius: var(--radius-md);
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-semibold);
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.btn-primary {
		background: var(--gradient-primary);
		color: var(--color-text-inverse);
	}

	.btn-primary:hover:not(:disabled) {
		background: var(--gradient-primary-hover);
	}

	.btn-primary:focus {
		outline: 2px solid var(--color-border-focus);
		outline-offset: 2px;
	}

	.btn-secondary {
		background-color: transparent;
		border: var(--border-width) solid var(--color-border-primary);
		color: var(--color-text-primary);
	}

	.btn-secondary:hover:not(:disabled) {
		background-color: var(--color-bg-secondary);
	}

	.btn-secondary:focus {
		outline: 2px solid var(--color-text-primary);
		outline-offset: 2px;
	}
</style>
