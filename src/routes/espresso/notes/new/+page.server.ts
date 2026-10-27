import type { Actions, PageServerLoad } from './$types';
import { espressoNoteService, validateRequired, validateRange } from '$lib/services';
import { CONSTANTS } from '$lib/config/Constants';
import { redirect, fail } from '@sveltejs/kit';
import { resolve } from '$app/paths';

export const load: PageServerLoad = async () => {
	const methodTypes = await espressoNoteService.getMethodTypes();
	return { methodTypes };
};

export const actions: Actions = {
	create: async ({ request }) => {
		const form = await request.formData();
		const read = (name: string) => form.get(name)?.toString().trim() ?? '';

		const fields = {
			title: read('title'),
			date: read('date'),
			bean: read('bean'),
			roaster: read('roaster'),
			methodType: read('methodType'),
			dosage: read('dosage'),
			yield: read('yield'),
			brewTime: read('brewTime'),
			grindSize: read('grindSize'),
			temperature: read('temperature'),
			pressure: read('pressure'),
			notes: read('notes'),
			rating: read('rating')
		};

		const missing = [
			validateRequired(fields.title, 'Title'),
			validateRequired(fields.date, 'Date'),
			validateRequired(fields.bean, 'Coffee bean'),
			validateRequired(fields.methodType, 'Method type'),
			validateRequired(fields.dosage, 'Dosage'),
			validateRequired(fields.yield, 'Yield'),
			validateRequired(fields.brewTime, 'Brew time')
		].find((result) => !result.valid);

		if (missing) {
			return fail(400, { error: missing.error, ...fields });
		}

		const rating = fields.rating ? Number(fields.rating) : undefined;
		if (rating !== undefined) {
			const ratingCheck = validateRange(rating, {
				min: CONSTANTS.VALIDATION.rating.min,
				max: CONSTANTS.VALIDATION.rating.max,
				fieldName: 'Rating'
			});
			if (!ratingCheck.valid) {
				return fail(400, { error: ratingCheck.error, ...fields });
			}
		}

		const result = await espressoNoteService.create({
			title: fields.title,
			date: fields.date,
			bean: fields.bean,
			roaster: fields.roaster || undefined,
			grindSize: fields.grindSize ? Number(fields.grindSize) : undefined,
			dosage: Number(fields.dosage),
			yield: Number(fields.yield),
			brewTime: Number(fields.brewTime),
			temperature: fields.temperature ? Number(fields.temperature) : undefined,
			pressure: fields.pressure ? Number(fields.pressure) : undefined,
			notes: fields.notes || undefined,
			rating,
			methodType: fields.methodType
		});

		if (!result.success || !result.data?.id) {
			return fail(500, { error: result.error ?? 'Failed to save espresso note.', ...fields });
		}

		redirect(303, resolve('/espresso/notes/[id]', { id: result.data.id }));
	}
};
