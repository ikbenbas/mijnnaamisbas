import type { PageServerLoad } from './$types';
import { bookmarkService } from '$lib/services';

export const load: PageServerLoad = async () => {
	const bookmarks = await bookmarkService.list(10);
	return { bookmarks };
};
