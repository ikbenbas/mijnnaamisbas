/**
 * Bookmark Service - Strategy Pattern Implementation
 * Handles all bookmark-related business logic and API calls
 * Allows for easy swapping of implementations (e.g., REST vs GraphQL)
 */

import { getHygraphClients, executeQuery, executeMutation, publishContent } from './hygraph';
import type { Bookmark } from '$lib/types/bookmark';
import { GET_BOOKMARKS, CREATE_BOOKMARK, PUBLISH_BOOKMARK } from '$lib/queries/bookmarks';
import { generateSlug } from '../utils/slug';
import { extractTitleFromUrl } from '../validation/url';
import { CONSTANTS } from '$lib/config/Constants';

/**
 * Input type for creating a bookmark
 */
export type CreateBookmarkInput = {
	link: string;
	title?: string;
	description?: string;
	read?: boolean;
	private?: boolean;
};

/**
 * Result type for bookmark operations
 */
export type BookmarkResult<T = Bookmark> = {
	success: boolean;
	data?: T;
	error?: string;
};

/**
 * Bookmark Service Strategy Interface
 * Defines the contract that all bookmark service implementations must follow
 */
export interface IBookmarkService {
	list(limit?: number): Promise<Bookmark[]>;
	getBySlug(slug: string): Promise<Bookmark | null>;
	create(input: CreateBookmarkInput): Promise<BookmarkResult>;
	update(id: string, updates: Partial<CreateBookmarkInput>): Promise<BookmarkResult>;
	delete(id: string): Promise<BookmarkResult<void>>;
	existsBySlug(slug: string): Promise<boolean>;
}

/**
 * Hygraph Bookmark Strategy
 * Concrete implementation using Hygraph GraphQL API
 */
export const createHygraphBookmarkStrategy = (): IBookmarkService => {
	const { client, mutationClient } = getHygraphClients();

	return {
		/**
		 * List bookmarks with optional pagination
		 * @param limit - Maximum number of bookmarks to return
		 * @returns Array of bookmarks (empty array on error)
		 */
		list: async (limit = CONSTANTS.PAGINATION.bookmarksPageSize): Promise<Bookmark[]> => {
			const data = await executeQuery<{ bookmarks: Bookmark[] }>(
				client,
				GET_BOOKMARKS,
				{ first: limit },
				'Fetch bookmarks'
			);

			return data?.bookmarks || [];
		},

		/**
		 * Get a single bookmark by slug
		 * @param slug - Bookmark slug
		 * @returns Bookmark or null if not found
		 */
		getBySlug: async (slug: string): Promise<Bookmark | null> => {
			// TODO: Implement GET_BOOKMARK_BY_SLUG query
			return null;
		},

		/**
		 * Create a new bookmark
		 * @param input - Bookmark creation data
		 * @returns Result with created bookmark or error
		 */
		create: async (input: CreateBookmarkInput): Promise<BookmarkResult> => {
			try {
				// Generate title from URL if not provided
				const title = input.title || extractTitleFromUrl(input.link);

				// Generate slug from title
				const slug = generateSlug(title);

				// Create bookmark
				const result = await executeMutation<{ createBookmark: { id: string; slug: string } }>(
					mutationClient,
					CREATE_BOOKMARK,
					{
						title,
						slug,
						description: input.description,
						link: input.link,
						read: input.read ?? false,
						private: input.private ?? false
					},
					'Create bookmark'
				);

				const bookmarkId = result.createBookmark.id;

				// Auto-publish
				await publishContent(mutationClient, PUBLISH_BOOKMARK, bookmarkId);

				return {
					success: true,
					data: {
						id: bookmarkId,
						slug: result.createBookmark.slug,
						title,
						link: input.link,
						description: input.description,
						read: input.read ?? false,
						private: input.private ?? false
					} as Bookmark
				};
			} catch (error) {
				// Check for duplicate slug error
				const errorMessage =
					error instanceof Error && error.message.includes('Unique constraint')
						? 'A bookmark with a similar title already exists'
						: 'Failed to save bookmark. Please try again.';

				return {
					success: false,
					error: errorMessage
				};
			}
		},

		/**
		 * Update an existing bookmark
		 * @param id - Bookmark ID
		 * @param updates - Fields to update
		 * @returns Result with updated bookmark or error
		 */
		update: async (id: string, updates: Partial<CreateBookmarkInput>): Promise<BookmarkResult> => {
			// TODO: Implement update functionality
			return {
				success: false,
				error: 'Update not implemented yet'
			};
		},

		/**
		 * Delete a bookmark
		 * @param id - Bookmark ID
		 * @returns Result indicating success or error
		 */
		delete: async (id: string): Promise<BookmarkResult<void>> => {
			// TODO: Implement delete functionality
			return {
				success: false,
				error: 'Delete not implemented yet'
			};
		},

		/**
		 * Check if a bookmark with the given slug exists
		 * @param slug - Slug to check
		 * @returns true if exists, false otherwise
		 */
		existsBySlug: async (slug: string): Promise<boolean> => {
			const bookmark = await executeQuery<{ bookmark: Bookmark | null }>(
				client,
				GET_BOOKMARKS,
				{ slug },
				'Check bookmark existence'
			);
			return bookmark?.bookmark !== null;
		}
	};
};

/**
 * Default bookmark service instance using Hygraph strategy
 * Can be swapped with other implementations (REST, Mock, etc.)
 */
export const bookmarkService: IBookmarkService = createHygraphBookmarkStrategy();
