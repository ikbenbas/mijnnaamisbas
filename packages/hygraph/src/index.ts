import { GraphQLClient } from 'graphql-request';

/**
 * Private env the app passes in. This package does not read `$env` itself,
 * so it stays usable from any SvelteKit app.
 */
export type HygraphEnv = {
	HYGRAPH_ENDPOINT?: string;
	HYGRAPH_TOKEN?: string;
	HYGRAPH_MUTATION_TOKEN?: string;
};

export type QueryOptions = {
	first?: number;
	skip?: number;
	orderBy?: string;
};

/**
 * Build the read and mutation clients plus the shared query helpers.
 * Call this from a service factory, not from a `.svelte` file.
 */
export function createHygraphClients(env: HygraphEnv) {
	function buildClient(token: string | undefined) {
		const endpoint = env.HYGRAPH_ENDPOINT;

		if (!endpoint) {
			throw new Error('HYGRAPH_ENDPOINT environment variable is not set.');
		}

		return new GraphQLClient(endpoint, {
			headers: token ? { Authorization: `Bearer ${token}` } : {}
		});
	}

	const client = buildClient(env.HYGRAPH_TOKEN);

	if (!env.HYGRAPH_MUTATION_TOKEN) {
		throw new Error('HYGRAPH_MUTATION_TOKEN environment variable is not set.');
	}

	const mutationClient = buildClient(env.HYGRAPH_MUTATION_TOKEN);

	const executeQuery = async <T>(
		queryClient: GraphQLClient,
		query: string,
		variables: Record<string, unknown> = {},
		errorContext = 'Query'
	): Promise<T | null> => {
		try {
			return await queryClient.request<T>(query, variables);
		} catch (error) {
			console.error(`${errorContext} failed:`, error);
			return null;
		}
	};

	const executeMutation = async <T>(
		queryClient: GraphQLClient,
		mutation: string,
		variables: Record<string, unknown> = {},
		errorContext = 'Mutation'
	): Promise<T> => {
		try {
			return await queryClient.request<T>(mutation, variables);
		} catch (error) {
			console.error(`${errorContext} failed:`, error);
			throw error;
		}
	};

	const publishContent = async (
		queryClient: GraphQLClient,
		publishMutation: string,
		id: string
	): Promise<void> => {
		await executeMutation(queryClient, publishMutation, { id }, 'Publish');
	};

	return { client, mutationClient, executeQuery, executeMutation, publishContent };
}
