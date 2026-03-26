import type { PageServerLoad } from './$types';
import { getHygraphClient, GET_BOOKMARKS } from '$lib';
import type { Bookmark } from '$lib';

export const load: PageServerLoad = async () => {
	try {
		const client = getHygraphClient();
		const data = await client.request<{ bookmarks: Bookmark[] }>(GET_BOOKMARKS, {
			first: 10
		});
		return { bookmarks: data.bookmarks };
	} catch {
		return { bookmarks: [] as Bookmark[] };
	}
};
