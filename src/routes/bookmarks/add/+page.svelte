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
		background-color: #fee;
		border: 1px solid #fcc;
		border-radius: 4px;
		color: #c00;
		padding: 0.75rem;
		margin-bottom: 1rem;
	}

	.form-group {
		margin-bottom: 1.25rem;
	}

	.form-group:last-of-type {
		margin-bottom: 0;
	}

	label {
		display: block;
		font-weight: 600;
		font-size: 0.9rem;
		margin-bottom: 0.5rem;
		color: #35495e;
	}

	.required {
		color: #c00;
	}

	input,
	textarea {
		width: 100%;
		padding: 0.625rem 0.75rem;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-size: 1rem;
		font-family: inherit;
		transition: border-color 0.15s;
	}

	input:focus,
	textarea:focus {
		outline: none;
		border-color: #3b8070;
		box-shadow: 0 0 0 3px rgba(59, 128, 112, 0.1);
	}

	textarea {
		resize: vertical;
		min-height: 80px;
	}

	.hint {
		display: block;
		font-size: 0.8rem;
		color: #666;
		margin-top: 0.25rem;
	}

	.btn {
		padding: 0.625rem 1.25rem;
		border: none;
		border-radius: 4px;
		font-size: 0.95rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.15s;
	}

	.btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.btn-primary {
		background-color: #3b8070;
		color: white;
	}

	.btn-primary:hover:not(:disabled) {
		background-color: #2d6559;
	}

	.btn-primary:focus {
		outline: 2px solid #3b8070;
		outline-offset: 2px;
	}

	.btn-secondary {
		background-color: transparent;
		border: 1px solid #ddd;
		color: #35495e;
	}

	.btn-secondary:hover:not(:disabled) {
		background-color: #f5f5f5;
	}

	.btn-secondary:focus {
		outline: 2px solid #35495e;
		outline-offset: 2px;
	}
</style>
