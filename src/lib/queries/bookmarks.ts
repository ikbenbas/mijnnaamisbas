import { gql } from 'graphql-request';

/**
 * GraphQL queries and mutations for the Hygraph bookmarks content model.
 */

export const GET_BOOKMARKS = gql`
	query GetBookmarks($first: Int = 10) {
		bookmarks(first: $first, orderBy: createdAt_DESC) {
			id
			title
			slug
			description
			link
			read
			private
			tags {
				id
				tag
			}
			type {
				id
				title
				slug
			}
		}
	}
`;

export const GET_BOOKMARK_BY_SLUG = gql`
	query GetBookmarkBySlug($slug: String!) {
		bookmark(where: { slug: $slug }) {
			id
			title
			slug
			description
			link
			read
			private
			tags {
				id
				tag
			}
			type {
				id
				title
				slug
			}
			createdAt
			updatedAt
		}
	}
`;

export const GET_BOOKMARKS_BY_READ_FLAG = gql`
	query GetBookmarksByReadFlag($read: Boolean!) {
		bookmarks(where: { read: $read }, orderBy: createdAt_DESC) {
			id
			title
			slug
			description
			link
			read
			tags {
				id
				tag
			}
		}
	}
`;

export const GET_BOOKMARK_GROUPS = gql`
	query GetBookmarkGroups {
		bookmarkGroups(orderBy: title_ASC) {
			id
			title
			slug
			description
		}
	}
`;

export const GET_TAGS = gql`
	query GetTags {
		tags(orderBy: tag_ASC) {
			id
			tag
		}
	}
`;

export const CREATE_BOOKMARK = gql`
	mutation CreateBookmark(
		$title: String!
		$slug: String!
		$description: String
		$link: String!
		$read: Boolean = false
		$private: Boolean = false
	) {
		createBookmark(
			data: {
				title: $title
				slug: $slug
				description: $description
				link: $link
				read: $read
				private: $private
			}
		) {
			id
			slug
		}
	}
`;

export const PUBLISH_BOOKMARK = gql`
	mutation PublishBookmark($id: ID!) {
		publishBookmark(where: { id: $id }, to: PUBLISHED) {
			id
		}
	}
`;
