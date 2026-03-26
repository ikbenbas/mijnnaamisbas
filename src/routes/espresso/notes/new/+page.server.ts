import type { Actions, PageServerLoad } from './$types';
import { espressoNoteService, validateRequired, validateRange } from '$lib/services';
import { redirect, fail } from '@sveltejs/kit';
import { CONSTANTS } from '$lib/config/Constants';

export const load: PageServerLoad = async () => {
	const methodTypes = await espressoNoteService.getMethodTypes();
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

		// Validation: Required fields
		if (!title || !date || !bean || !dosage || !yieldVal || !brewTime || !methodType) {
			return fail(422, { error: 'Please fill in all required fields.' });
		}

		// Create note using service
		const result = await espressoNoteService.create({
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

		if (!result.success) {
			return fail(422, { error: result.error });
		}

		redirect(303, `/espresso/notes/${result.data?.id}`);
	}
};
