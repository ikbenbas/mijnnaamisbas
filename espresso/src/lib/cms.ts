import { GraphQLClient } from 'graphql-request';
import { env } from '$env/dynamic/private';

/**
 * Hygraph (formerly GraphCMS) client for the espresso notes app.
 *
 * Set the following environment variables:
 *   HYGRAPH_ENDPOINT        – your Hygraph project's Content API URL
 *   HYGRAPH_TOKEN           – a Permanent Auth Token with read permissions
 *   HYGRAPH_MUTATION_TOKEN  – a Permanent Auth Token with create/publish permissions
 *
 * Free tier: https://hygraph.com/pricing
 */
function buildClient(token: string | undefined) {
	const endpoint = env.HYGRAPH_ENDPOINT;

	if (!endpoint) {
		throw new Error('HYGRAPH_ENDPOINT environment variable is not set.');
	}

	return new GraphQLClient(endpoint, {
		headers: token ? { Authorization: `Bearer ${token}` } : {}
	});
}

export function getClient() {
	return buildClient(env.HYGRAPH_TOKEN);
}

/**
 * Returns a client authenticated with the mutation token, which must have
 * create/update/publish permissions in Hygraph (Settings → API Access →
 * Permanent Auth Tokens → add "Mutations" permission for EspressoNote).
 */
export function getMutationClient() {
	const token = env.HYGRAPH_MUTATION_TOKEN;

	if (!token) {
		throw new Error('HYGRAPH_MUTATION_TOKEN environment variable is not set.');
	}

	return buildClient(token);
}
