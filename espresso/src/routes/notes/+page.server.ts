import type { PageServerLoad } from './$types';
import { getClient, GET_NOTES } from '$lib';
import type { EspressoNote } from '$lib';

export const load: PageServerLoad = async () => {
	try {
		const client = getClient();
		const data = await client.request<{ espressoNotes: EspressoNote[] }>(GET_NOTES);
		return { notes: data.espressoNotes };
	} catch {
		return { notes: [] as EspressoNote[] };
	}
};
