import type { Actions, PageServerLoad } from './$types';
import { getClient, getMutationClient, CREATE_NOTE, PUBLISH_NOTE, GET_METHOD_TYPES } from '$lib';
import { redirect, fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const client = getClient();
	const result = await client.request<{ __type: { enumValues: { name: string }[] } }>(
		GET_METHOD_TYPES
	);
	const methodTypes = result.__type?.enumValues?.map((v) => v.name) ?? [];
	return { methodTypes };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await request.formData();

		const title = form.get('title')?.toString().trim();
		const date = form.get('date')?.toString();
		const bean = form.get('bean')?.toString().trim();
		const roaster = form.get('roaster')?.toString().trim() || undefined;
		const grindSize = form.get('grindSize') ? Number(form.get('grindSize')) : undefined;
		const dosage = Number(form.get('dosage'));
		const yieldVal = Number(form.get('yield'));
		const brewTime = Number(form.get('brewTime'));
		const temperature = form.get('temperature') ? Number(form.get('temperature')) : undefined;
		const pressure = form.get('pressure') ? Number(form.get('pressure')) : undefined;
		const notes = form.get('notes')?.toString().trim() || undefined;
		const rating = form.get('rating') ? Number(form.get('rating')) : undefined;
		const methodType = form.get('methodType')?.toString();

		if (!title || !date || !bean || !dosage || !yieldVal || !brewTime || !methodType) {
			return fail(422, { error: 'Please fill in all required fields.' });
		}

		if (rating !== undefined && (rating < 1 || rating > 10)) {
			return fail(422, { error: 'Rating must be between 1 and 10.' });
		}

		const client = getMutationClient();

		const created = await client.request<{ createEspressoNote: { id: string } }>(CREATE_NOTE, {
			title,
			date,
			bean,
			roaster,
			grindSize,
			dosage,
			yield: yieldVal,
			brewTime,
			temperature,
			pressure,
			notes,
			rating,
			methodType
		});

		const id = created.createEspressoNote.id;

		// Auto-publish the new note so it is visible in the Content API
		await client.request(PUBLISH_NOTE, { id });

		redirect(303, `/notes/${id}`);
	}
};
