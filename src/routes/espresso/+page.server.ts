import type { PageServerLoad } from './$types';
import { getHygraphClient, GET_NOTES } from '$lib';
import type { EspressoNote } from '$lib';

export const load: PageServerLoad = async () => {
	try {
		const client = getHygraphClient();
		const data = await client.request<{ espressoNotes: EspressoNote[] }>(GET_NOTES);
		return { notes: data.espressoNotes };
	} catch {
		// Return empty list if CMS is not yet configured
		return { notes: [] as EspressoNote[] };
	}
};
