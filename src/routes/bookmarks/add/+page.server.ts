import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { bookmarkService, validateUrlField, validateRequired } from '$lib/services';

export const actions: Actions = {
	create: async ({ request }) => {
		const formData = await request.formData();

		// Extract and validate form data
		const link = formData.get('link')?.toString().trim();
		const title = formData.get('title')?.toString().trim();
		const description = formData.get('description')?.toString().trim() || undefined;

		// Validation: Required URL
		const urlValidation = validateUrlField(link, true);
		if (!urlValidation.valid) {
			return fail(400, {
				error: urlValidation.error,
				link,
				title,
				description
			});
		}

		// Create bookmark using service
		const result = await bookmarkService.create({
			link: link!,
			title,
			description,
			read: false,
			private: false
		});

		if (!result.success) {
			return fail(500, {
				error: result.error,
				link,
				title,
				description
			});
		}

		// Success - redirect to bookmarks list
		redirect(303, '/bookmarks');
	}
};
