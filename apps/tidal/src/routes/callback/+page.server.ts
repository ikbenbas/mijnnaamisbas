import { redirect } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

import { completeLogin } from '$lib/tidal';

/**
 * OAuth callback handler
 * Tidal redirects here after user authorizes the app
 */
export const load: PageServerLoad = async ({ url, cookies }) => {
	const error = url.searchParams.get('error');

	// Handle authorization error
	if (error) {
		console.error('Tidal authorization error:', error);
		return redirect(303, '/?error=auth_failed');
	}

	// Get the full query string for finalizeLogin
	const loginResponseQuery = url.search;

	if (!loginResponseQuery) {
		return redirect(303, '/?error=no_code');
	}

	try {
		console.log('OAuth callback received:', {
			fullQuery: loginResponseQuery,
			code: url.searchParams.get('code'),
			state: url.searchParams.get('state')
		});

		// Complete the OAuth flow
		await completeLogin(loginResponseQuery);

		// Set a session cookie to indicate successful auth
		cookies.set('tidal_connected', 'true', {
			path: '/',
			httpOnly: true,
			secure: import.meta.env.PROD,
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 30 // 30 days
		});

		// Redirect back to tidal page
		redirect(303, '/?connected=true');
	} catch (error_) {
		// Don't catch Redirect objects - they're how SvelteKit redirects work
		if (error_ && typeof error_ === 'object' && 'status' in error_ && 'location' in error_) {
			throw error_; // Re-throw Redirect objects
		}

		// Log detailed error information
		console.error('Error completing Tidal login:', {
			error: error_,
			message: error_ instanceof Error ? error_.message : 'Unknown error',
			stack: error_ instanceof Error ? error_.stack : undefined,
			errorObject: JSON.stringify(error_, Object.getOwnPropertyNames(error_))
		});

		redirect(303, '/?error=login_failed');
	}
};
