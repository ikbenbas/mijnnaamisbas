import type { Handle } from '@sveltejs/kit';

/**
 * Shared security handle: origin check for state-changing requests, plus CSP.
 * Each app re-exports this from `src/hooks.server.ts`.
 */
export const handle: Handle = async ({ event, resolve }) => {
	if (
		event.request.method === 'POST' ||
		event.request.method === 'PUT' ||
		event.request.method === 'DELETE' ||
		event.request.method === 'PATCH'
	) {
		const origin = event.request.headers.get('origin');
		const host = event.request.headers.get('host');

		if (origin && host) {
			const originUrl = new URL(origin);
			const expectedHost = host.split(':', 1)[0];

			if (!originUrl.hostname.endsWith(expectedHost)) {
				console.warn(`CSRF attempt detected: origin ${origin} does not match host ${host}`);
				return new Response('Forbidden', { status: 403 });
			}
		}
	}

	const response = await resolve(event);

	response.headers.set('X-Frame-Options', 'SAMEORIGIN');
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');

	const csp = [
		"default-src 'self'",
		"script-src 'self' 'unsafe-inline'",
		"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
		"img-src 'self' data: https:",
		"font-src 'self' https://fonts.gstatic.com",
		"connect-src 'self' https://*.hygraph.com https://api.mistral.ai https://api.tidal.com https://auth.tidal.com",
		"frame-ancestors 'self'",
		"base-uri 'self'",
		"form-action 'self'"
	].join('; ');

	response.headers.set('Content-Security-Policy', csp);

	return response;
};
