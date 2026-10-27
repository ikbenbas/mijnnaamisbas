import { fail, redirect } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';

import { resolve } from '$app/paths';
import { CONSTANTS } from '$lib/config/Constants';
import { espressoNoteService, validateRange, validateRequired } from '$lib/services';

type NoteFields = {
	title: string;
	date: string;
	bean: string;
	roaster: string;
	methodType: string;
	dosage: string;
	yield: string;
	brewTime: string;
	grindSize: string;
	temperature: string;
	pressure: string;
	notes: string;
	rating: string;
};

const readFields = (form: FormData): NoteFields => {
	const read = (name: string) => form.get(name)?.toString().trim() ?? '';

	return {
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
};

const missingField = (fields: NoteFields) =>
	[
		validateRequired(fields.title, 'Title'),
		validateRequired(fields.date, 'Date'),
		validateRequired(fields.bean, 'Coffee bean'),
		validateRequired(fields.methodType, 'Method type'),
		validateRequired(fields.dosage, 'Dosage'),
		validateRequired(fields.yield, 'Yield'),
		validateRequired(fields.brewTime, 'Brew time')
	].find((result) => !result.valid);

const ratingError = (rating: string) => {
	if (!rating) return;

	const ratingCheck = validateRange(Number(rating), {
		min: CONSTANTS.VALIDATION.rating.min,
		max: CONSTANTS.VALIDATION.rating.max,
		fieldName: 'Rating'
	});

	return ratingCheck.valid ? undefined : ratingCheck.error;
};

const optionalNumber = (value: string) => (value ? Number(value) : undefined);

const noteInput = (fields: NoteFields) => ({
	title: fields.title,
	date: fields.date,
	bean: fields.bean,
	roaster: fields.roaster || undefined,
	grindSize: optionalNumber(fields.grindSize),
	dosage: Number(fields.dosage),
	yield: Number(fields.yield),
	brewTime: Number(fields.brewTime),
	temperature: optionalNumber(fields.temperature),
	pressure: optionalNumber(fields.pressure),
	notes: fields.notes || undefined,
	rating: optionalNumber(fields.rating),
	methodType: fields.methodType
});

export const load: PageServerLoad = async () => {
	const methodTypes = await espressoNoteService.getMethodTypes();
	return { methodTypes };
};

export const actions: Actions = {
	create: async ({ request }) => {
		const fields = readFields(await request.formData());
		const missing = missingField(fields);

		if (missing) {
			return fail(400, { error: missing.error, ...fields });
		}

		const invalidRating = ratingError(fields.rating);
		if (invalidRating) {
			return fail(400, { error: invalidRating, ...fields });
		}

		const result = await espressoNoteService.create(noteInput(fields));

		if (!result.success || !result.data?.id) {
			return fail(500, { error: result.error ?? 'Failed to save espresso note.', ...fields });
		}

		redirect(303, resolve('/notes/[id]', { id: result.data.id }));
	}
};
