import type { PageServerLoad } from './$types';
import { espressoNoteService } from '$lib/services';

export const load: PageServerLoad = async () => {
	const notes = await espressoNoteService.list();
	return { notes };
};
