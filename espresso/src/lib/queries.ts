import { gql } from 'graphql-request';

/**
 * GraphQL queries and mutations for the Hygraph espresso notes content model.
 */

export const GET_NOTES = gql`
	query GetNotes {
		espressoNotes(orderBy: date_DESC) {
			id
			title
			date
			bean
			roaster
			dosage
			yield
			brewTime
			rating
		}
	}
`;

export const GET_NOTE = gql`
	query GetNote($id: ID!) {
		espressoNote(where: { id: $id }) {
			id
			title
			date
			bean
			roaster
			grindSize
			dosage
			yield
			brewTime
			temperature
			pressure
			notes
			rating
			createdAt
			updatedAt
		}
	}
`;

export const CREATE_NOTE = gql`
	mutation CreateNote(
		$title: String!
		$date: Date!
		$bean: String!
		$roaster: String
		$grindSize: Float
		$dosage: Float!
		$yield: Float!
		$brewTime: Int!
		$temperature: Float
		$pressure: Float
		$notes: String
		$rating: Int
	) {
		createEspressoNote(
			data: {
				title: $title
				date: $date
				bean: $bean
				roaster: $roaster
				grindSize: $grindSize
				dosage: $dosage
				yield: $yield
				brewTime: $brewTime
				temperature: $temperature
				pressure: $pressure
				notes: $notes
				rating: $rating
			}
		) {
			id
		}
	}
`;

export const PUBLISH_NOTE = gql`
	mutation PublishNote($id: ID!) {
		publishEspressoNote(where: { id: $id }, to: PUBLISHED) {
			id
		}
	}
`;
