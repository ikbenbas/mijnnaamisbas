import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { getHygraphMutationClient, CREATE_BOOKMARK, PUBLISH_BOOKMARK } from '$lib';

/**
 * Generate a URL-friendly slug from a title
 */
const generateSlug = (title: string): string => {
	return title
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '') // Remove special characters
		.replace(/\s+/g, '-') // Replace spaces with hyphens
		.replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
		.substring(0, 100); // Limit length
};

/**
 * Extract title from URL (basic implementation)
 * In a real app, you might want to fetch the page and parse the <title> tag
 */
const extractTitleFromUrl = (url: string): string => {
	try {
		const urlObj = new URL(url);
		// Use hostname as fallback title
		return urlObj.hostname.replace(/^www\./, '');
	} catch {
		return 'Untitled Bookmark';
	}
};

/**
 * Validate URL format
 */
const isValidUrl = (url: string): boolean => {
	try {
		const urlObj = new URL(url);
		return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
	} catch {
		return false;
	}
};

export const actions: Actions = {
	create: async ({ request }) => {
		const formData = await request.formData();

		// Extract and validate form data
		const link = formData.get('link')?.toString().trim();
		const title = formData.get('title')?.toString().trim();
		const description = formData.get('description')?.toString().trim() || undefined;

		// Validation: Required fields
		if (!link) {
			return fail(400, {
				error: 'Link is required',
				link,
				title,
				description
			});
		}

		// Validation: URL format
		if (!isValidUrl(link)) {
			return fail(400, {
				error: 'Invalid URL format. Please use http:// or https://',
				link,
				title,
				description
			});
		}

		// Generate title and slug
		const finalTitle = title || extractTitleFromUrl(link);
		const slug = generateSlug(finalTitle);

		try {
			const client = getHygraphMutationClient();

			// Create bookmark
			const result = await client.request<{ createBookmark: { id: string; slug: string } }>(
				CREATE_BOOKMARK,
				{
					title: finalTitle,
					slug,
					description,
					link,
					read: false,
					private: false
				}
			);

			const bookmarkId = result.createBookmark.id;

			// Auto-publish the bookmark
			await client.request(PUBLISH_BOOKMARK, { id: bookmarkId });

			// Success - redirect to bookmarks list
			redirect(303, '/bookmarks');
		} catch (error) {
			console.error('Failed to create bookmark:', error);

			// Check if it's a duplicate slug error
			const errorMessage =
				error instanceof Error && error.message.includes('Unique constraint')
					? 'A bookmark with a similar title already exists'
					: 'Failed to save bookmark. Please try again.';

			return fail(500, {
				error: errorMessage,
				link,
				title,
				description
			});
		}
	}
};
