import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { startLogin } from '$lib/tidal';

/**
 * Initiate Tidal OAuth login
 * Redirects user to Tidal login page
 */
export const load: PageServerLoad = async ({ url }) => {
	const redirectUri = `${url.origin}/tidal/callback`;

	try {
		const loginUrl = await startLogin(redirectUri);
		// Redirect to Tidal login page (this throws a Redirect object)
		redirect(303, loginUrl);
	} catch (error) {
		// Don't catch Redirect objects - they're how SvelteKit redirects work
		if (error && typeof error === 'object' && 'status' in error && 'location' in error) {
			throw error; // Re-throw Redirect objects
		}
		console.error('Error starting Tidal login:', error);
		redirect(303, '/tidal?error=login_init_failed');
	}
};
