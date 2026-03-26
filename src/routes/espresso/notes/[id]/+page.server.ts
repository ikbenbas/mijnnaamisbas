import type { PageServerLoad } from './$types';
import { espressoNoteService } from '$lib/services';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const note = await espressoNoteService.getById(params.id);

	if (!note) {
		throw error(404, 'Note not found');
	}

	return { note };
};
