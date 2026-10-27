<script lang="ts">
	import { MNBAlert, MNBButton, MNBInput, MNBModal, MNBTextarea } from '@mnb/ui';

	import type { ActionData } from './$types';

	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';


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
		if (!form) return;
		const { link: restoredLink, title: restoredTitle, description: restoredDescription } = form;
		if (restoredLink) link = restoredLink;
		if (restoredTitle) title = restoredTitle;
		if (restoredDescription) description = restoredDescription;
	});

	const handleClose = () => {
		isOpen = false;
		goto(resolve('/list'));
	};
</script>

<svelte:head>
	<title>Add Bookmark – mijnnaamisbas</title>
</svelte:head>

<MNBModal open={isOpen} onClose={handleClose} title="Add Bookmark" maxWidth={600}>
	{#if form?.error}
		<MNBAlert id="error-message">{form.error}</MNBAlert>
	{/if}

	<form
		id="add-bookmark"
		class="bookmark-form"
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
		<MNBInput
			id="link"
			name="link"
			type="url"
			label="Link"
			bind:value={link}
			placeholder="https://example.com"
			required
			aria-describedby={form?.error ? 'error-message' : undefined}
		/>

		<MNBInput
			id="title"
			name="title"
			type="text"
			label="Title (optional)"
			hint="If left empty, we'll use the website's domain name"
			bind:value={title}
			placeholder="Leave empty to auto-generate from URL"
			maxlength={200}
		/>

		<MNBTextarea
			id="description"
			name="description"
			label="Description (optional)"
			bind:value={description}
			placeholder="Add notes about this bookmark..."
			rows={3}
			maxlength={500}
		/>
	</form>

	{#snippet actions()}
		<MNBButton type="button" variant="secondary" onclick={handleClose} disabled={isSubmitting}>
			Cancel
		</MNBButton>
		<MNBButton type="submit" form="add-bookmark" variant="primary" disabled={isSubmitting} loading={isSubmitting}>
			{isSubmitting ? 'Saving...' : 'Add Bookmark'}
		</MNBButton>
	{/snippet}
</MNBModal>

<style>
	.bookmark-form {
		display: flex;
		flex-direction: column;
		gap: var(--mnb-space-lg);
	}
</style>
