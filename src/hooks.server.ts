import type { Handle } from '@sveltejs/kit';

/**
 * SvelteKit hooks for server-side request handling
 * 
 * Security Features:
 * - CSRF Protection: SvelteKit automatically protects against CSRF attacks for form actions
 *   by checking that POST requests originate from the same domain. This is built-in and
 *   requires no configuration.
 * - Security Headers: Added via CSP and other headers
 * - Origin Validation: Additional layer on top of SvelteKit's built-in CSRF protection
 */

export const handle: Handle = async ({ event, resolve }) => {
	// Additional CSRF protection: Verify origin for state-changing requests
	// This complements SvelteKit's built-in CSRF protection
	if (event.request.method === 'POST' || event.request.method === 'PUT' || event.request.method === 'DELETE' || event.request.method === 'PATCH') {
		const origin = event.request.headers.get('origin');
		const host = event.request.headers.get('host');
		
		// For form submissions, origin should match host
		if (origin && host) {
			const originUrl = new URL(origin);
			const expectedHost = host.split(':')[0]; // Remove port for comparison
			
			if (!originUrl.hostname.endsWith(expectedHost)) {
				console.warn(`CSRF attempt detected: origin ${origin} does not match host ${host}`);
				return new Response('Forbidden', { status: 403 });
			}
		}
	}

	const response = await resolve(event);

	// Add security headers
	response.headers.set('X-Frame-Options', 'SAMEORIGIN');
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
	
	// Content Security Policy (adjust as needed for your app)
	// Note: This is a basic CSP. You may need to adjust it based on your external resources
	const csp = [
		"default-src 'self'",
		"script-src 'self' 'unsafe-inline'", // unsafe-inline needed for SvelteKit
		"style-src 'self' 'unsafe-inline'", // unsafe-inline needed for Svelte scoped styles
		"img-src 'self' data: https:",
		"font-src 'self'",
		"connect-src 'self' https://*.hygraph.com https://api.mistral.ai https://api.tidal.com https://auth.tidal.com",
		"frame-ancestors 'self'",
		"base-uri 'self'",
		"form-action 'self'"
	].join('; ');
	
	response.headers.set('Content-Security-Policy', csp);

	return response;
};
