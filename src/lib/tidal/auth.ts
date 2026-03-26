/**
 * Tidal authentication utilities using @tidal-music/auth
 * Handles OAuth flow for user login
 */

import * as TidalAuth from '@tidal-music/auth';
import { env } from '$env/dynamic/private';
import { serverStorage } from './storage';

let initialized = false;

/**
 * Initialize the Tidal Auth SDK
 * Must be called before any other auth operations
 */
export async function initTidalAuth() {
	if (initialized) {
		return;
	}

	const clientId = env.TIDAL_CLIENT_ID;
	const clientSecret = env.TIDAL_CLIENT_SECRET;

	if (!clientId || !clientSecret) {
		throw new Error('Tidal credentials not configured');
	}

	console.log('Initializing Tidal Auth with:', {
		clientId,
		clientSecretLength: clientSecret.length,
		hasStorage: !!serverStorage
	});

	await TidalAuth.init({
		clientId,
		clientSecret,
		credentialsStorageKey: 'tidal_credentials',
		storage: serverStorage,
		scopes: [
			'collection.read', // Read user's favorites/collection
			'playlists.read', // Read user's playlists
			'user.read' // Read user profile (country, email, etc.)
		]
	});

	initialized = true;
	console.log('Tidal Auth initialized successfully');
}

/**
 * Start the OAuth login flow
 * Returns the URL to redirect the user to
 */
export async function startLogin(redirectUri: string): Promise<string> {
	await initTidalAuth();

	console.log('Initializing Tidal login with redirect URI:', redirectUri);

	const loginUrl = await TidalAuth.initializeLogin({
		redirectUri
	});

	console.log('Generated Tidal login URL:', loginUrl);

	return loginUrl;
}

/**
 * Complete the OAuth login flow after redirect
 * @param loginResponseQuery - Complete query string from callback URL
 */
export async function completeLogin(loginResponseQuery: string): Promise<void> {
	await initTidalAuth();

	await TidalAuth.finalizeLogin(loginResponseQuery);
}

/**
 * Get the current access token
 * Returns null if user is not authenticated
 */
export async function getAccessToken(): Promise<string | null> {
	try {
		await initTidalAuth();
		const credentials = await TidalAuth.credentialsProvider.getCredentials();
		return credentials?.token ?? null;
	} catch {
		return null;
	}
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
	const token = await getAccessToken();
	return token !== null;
}

/**
 * Logout the user
 */
export async function logout(): Promise<void> {
	await initTidalAuth();
	await TidalAuth.logout();
}

/**
 * Get the credentials provider for use with API client
 */
export function getCredentialsProvider() {
	return TidalAuth.credentialsProvider;
}
