import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	login: async ({ request }) => {
		const username = (await request.formData()).get('username')?.toString().trim() ?? '';

		return fail(400, {
			username,
			error: 'Login is not set up yet.'
		});
	}
};
