import type { PageServerLoad } from './$types';
import { getClient, GET_NOTE } from '$lib';
import type { EspressoNote } from '$lib';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const client = getClient();
	const data = await client.request<{ espressoNote: EspressoNote | null }>(GET_NOTE, {
		id: params.id
	});

	if (!data.espressoNote) {
		throw error(404, 'Note not found');
	}

	return { note: data.espressoNote };
};
