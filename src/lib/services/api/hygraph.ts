/**
 * Hygraph Utilities
 * Provides common functionality for all Hygraph-based service strategies
 * Implements error handling and logging following SOLID principles
 */

import { getHygraphClient, getHygraphMutationClient } from '$lib/hygraph';
import type { GraphQLClient } from 'graphql-request';

/**
 * Options for Hygraph queries
 */
export type QueryOptions = {
	first?: number;
	skip?: number;
	orderBy?: string;
};

/**
 * Get GraphQL clients for Hygraph operations
 * @returns Object containing query and mutation clients
 */
export const getHygraphClients = () => ({
	client: getHygraphClient(),
	mutationClient: getHygraphMutationClient()
});

/**
 * Execute a query with error handling
 * @param client - GraphQL client
 * @param query - GraphQL query string
 * @param variables - Query variables
 * @param errorContext - Context for error logging
 * @returns Query result or null on error
 */
export const executeQuery = async <T>(
	client: GraphQLClient,
	query: string,
	variables: Record<string, unknown> = {},
	errorContext = 'Query'
): Promise<T | null> => {
	try {
		return await client.request<T>(query, variables);
	} catch (error) {
		console.error(`${errorContext} failed:`, error);
		return null;
	}
};

/**
 * Execute a mutation with error handling
 * @param client - GraphQL mutation client
 * @param mutation - GraphQL mutation string
 * @param variables - Mutation variables
 * @param errorContext - Context for error logging
 * @returns Mutation result or throws error
 */
export const executeMutation = async <T>(
	client: GraphQLClient,
	mutation: string,
	variables: Record<string, unknown> = {},
	errorContext = 'Mutation'
): Promise<T> => {
	try {
		return await client.request<T>(mutation, variables);
	} catch (error) {
		console.error(`${errorContext} failed:`, error);
		throw error;
	}
};

/**
 * Execute publish mutation for content
 * @param client - GraphQL mutation client
 * @param publishMutation - GraphQL publish mutation
 * @param id - Content ID to publish
 */
export const publishContent = async (
	client: GraphQLClient,
	publishMutation: string,
	id: string
): Promise<void> => {
	await executeMutation(client, publishMutation, { id }, 'Publish');
};
