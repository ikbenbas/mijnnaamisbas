import { GraphQLClient } from 'graphql-request';
import { env } from '$env/dynamic/private';

/**
 * Hygraph (formerly GraphCMS) client for the espresso notes app.
 *
 * Set the following environment variables:
 *   HYGRAPH_ENDPOINT  – your Hygraph project's Content API URL
 *   HYGRAPH_TOKEN     – a Permanent Auth Token with read permissions
 *
 * Free tier: https://hygraph.com/pricing
 */
export function getClient() {
	const endpoint = env.HYGRAPH_ENDPOINT;
	const token = env.HYGRAPH_TOKEN;

	if (!endpoint) {
		throw new Error('HYGRAPH_ENDPOINT environment variable is not set.');
	}

	return new GraphQLClient(endpoint, {
		headers: token ? { Authorization: `Bearer ${token}` } : {}
	});
}
