import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { logout } from '$lib/tidal';

/**
 * Logout from Tidal
 */
export const actions: Actions = {
	default: async ({ cookies }) => {
		try {
			await logout();

			// Clear the session cookie
			cookies.delete('tidal_connected', { path: '/' });

			redirect(303, '/tidal');
		} catch (error) {
			// Don't catch Redirect objects - they're how SvelteKit redirects work
			if (error && typeof error === 'object' && 'status' in error && 'location' in error) {
				throw error; // Re-throw Redirect objects
			}
			console.error('Error logging out from Tidal:', error);
			redirect(303, '/tidal?error=logout_failed');
		}
	}
};
