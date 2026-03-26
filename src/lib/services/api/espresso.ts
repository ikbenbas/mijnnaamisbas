/**
 * Espresso Note Service - Strategy Pattern Implementation
 * Handles all espresso note-related business logic and API calls
 * Allows for easy swapping of implementations (e.g., REST vs GraphQL)
 */

import { getHygraphClients, executeQuery, executeMutation, publishContent } from './hygraph';
import type { EspressoNote } from '$lib/types/espresso-note';
import { GET_NOTES, GET_NOTE, CREATE_NOTE, PUBLISH_NOTE, GET_METHOD_TYPES } from '$lib/queries/espresso';
import { CONSTANTS } from '$lib/config/Constants';

/**
 * Input type for creating an espresso note
 */
export type CreateEspressoNoteInput = {
	title: string;
	date: string;
	bean: string;
	roaster?: string;
	grindSize?: number;
	dosage: number;
	yield: number;
	brewTime: number;
	temperature?: number;
	pressure?: number;
	notes?: string;
	rating?: number;
	methodType: string;
};

/**
 * Result type for espresso note operations
 */
export type EspressoNoteResult<T = EspressoNote> = {
	success: boolean;
	data?: T;
	error?: string;
};

/**
 * Espresso Note Service Strategy Interface
 * Defines the contract that all espresso note service implementations must follow
 */
export interface IEspressoNoteService {
	list(limit?: number): Promise<EspressoNote[]>;
	getById(id: string): Promise<EspressoNote | null>;
	getMethodTypes(): Promise<string[]>;
	create(input: CreateEspressoNoteInput): Promise<EspressoNoteResult<{ id: string }>>;
	update(id: string, updates: Partial<CreateEspressoNoteInput>): Promise<EspressoNoteResult>;
	delete(id: string): Promise<EspressoNoteResult<void>>;
	getStatistics(): Promise<{ total: number; averageRating: number }>;
}

/**
 * Hygraph Espresso Note Strategy
 * Concrete implementation using Hygraph GraphQL API
 */
export const createHygraphEspressoNoteStrategy = (): IEspressoNoteService => {
	const { client, mutationClient } = getHygraphClients();

	return {
		/**
		 * List espresso notes with optional pagination
		 * @param limit - Maximum number of notes to return
		 * @returns Array of espresso notes (empty array on error)
		 */
		list: async (limit = CONSTANTS.PAGINATION.notesPageSize): Promise<EspressoNote[]> => {
			const data = await executeQuery<{ espressoNotes: EspressoNote[] }>(
				client,
				GET_NOTES,
				{},
				'Fetch espresso notes'
			);

			return data?.espressoNotes || [];
		},

		/**
		 * Get a single espresso note by ID
		 * @param id - Note ID
		 * @returns Espresso note or null if not found
		 */
		getById: async (id: string): Promise<EspressoNote | null> => {
			const data = await executeQuery<{ espressoNote: EspressoNote }>(
				client,
				GET_NOTE,
				{ id },
				'Fetch espresso note'
			);

			return data?.espressoNote || null;
		},

		/**
		 * Get available method types (brew methods)
		 * @returns Array of method type names
		 */
		getMethodTypes: async (): Promise<string[]> => {
			const data = await executeQuery<{ __type: { enumValues: { name: string }[] } }>(
				client,
				GET_METHOD_TYPES,
				{},
				'Fetch method types'
			);

			return data?.__type?.enumValues?.map((v) => v.name) || [];
		},

		/**
		 * Create a new espresso note
		 * @param input - Note creation data
		 * @returns Result with created note ID or error
		 */
		create: async (input: CreateEspressoNoteInput): Promise<EspressoNoteResult<{ id: string }>> => {
			try {
				// Validate rating if provided
				if (input.rating !== undefined) {
					const { min, max } = CONSTANTS.VALIDATION.rating;
					if (input.rating < min || input.rating > max) {
						return {
							success: false,
							error: `Rating must be between ${min} and ${max}`
						};
					}
				}

				// Create note
				const result = await executeMutation<{ createEspressoNote: { id: string } }>(
					mutationClient,
					CREATE_NOTE,
					{
						title: input.title,
						date: input.date,
						bean: input.bean,
						roaster: input.roaster,
						grindSize: input.grindSize,
						dosage: input.dosage,
						yield: input.yield,
						brewTime: input.brewTime,
						temperature: input.temperature,
						pressure: input.pressure,
						notes: input.notes,
						rating: input.rating,
						methodType: input.methodType
					},
					'Create espresso note'
				);

				const noteId = result.createEspressoNote.id;

				// Auto-publish
				await publishContent(mutationClient, PUBLISH_NOTE, noteId);

				return {
					success: true,
					data: { id: noteId }
				};
			} catch (error) {
				return {
					success: false,
					error: 'Failed to save espresso note. Please try again.'
				};
			}
		},

		/**
		 * Update an existing espresso note
		 * @param id - Note ID
		 * @param updates - Fields to update
		 * @returns Result with updated note or error
		 */
		update: async (id: string, updates: Partial<CreateEspressoNoteInput>): Promise<EspressoNoteResult> => {
			// TODO: Implement update functionality
			return {
				success: false,
				error: 'Update not implemented yet'
			};
		},

		/**
		 * Delete an espresso note
		 * @param id - Note ID
		 * @returns Result indicating success or error
		 */
		delete: async (id: string): Promise<EspressoNoteResult<void>> => {
			// TODO: Implement delete functionality
			return {
				success: false,
				error: 'Delete not implemented yet'
			};
		},

		/**
		 * Get statistics about espresso notes
		 * @returns Basic statistics
		 */
		getStatistics: async (): Promise<{ total: number; averageRating: number }> => {
			const notes = await executeQuery<{ espressoNotes: EspressoNote[] }>(
				client,
				GET_NOTES,
				{},
				'Fetch all espresso notes for statistics'
			);

			const allNotes = notes?.espressoNotes || [];
			const total = allNotes.length;
			const ratingsSum = allNotes.reduce((sum, note) => sum + (note.rating || 0), 0);
			const ratingsCount = allNotes.filter(note => note.rating !== null && note.rating !== undefined).length;
			const averageRating = ratingsCount > 0 ? ratingsSum / ratingsCount : 0;

			return { total, averageRating };
		}
	};
};

/**
 * Default espresso note service instance using Hygraph strategy
 * Can be swapped with other implementations (REST, Mock, etc.)
 */
export const espressoNoteService: IEspressoNoteService = createHygraphEspressoNoteStrategy();
