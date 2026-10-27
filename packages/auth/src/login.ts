import { fail } from '@sveltejs/kit';

export type LoginFormData = {
	username?: string;
	error?: string;
};

/**
 * Stub login action. Wire a real session store here when auth exists.
 * Does not log the username or read the password into logs.
 */
export const login = async ({ request }: { request: Request }) => {
	const formData = await request.formData();
	const username = formData.get('username')?.toString() ?? '';

	return fail(400, {
		username,
		error: 'Login is not set up yet.'
	});
};
