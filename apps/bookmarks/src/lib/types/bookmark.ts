/**
 * Domain types for bookmarks stored in Hygraph.
 */

export interface Tag {
	id: string;
	tag: string;
}

export interface BookmarkGroup {
	id: string;
	title: string;
	slug: string;
	description?: string;
}

export interface Bookmark {
	id: string;
	title: string;
	slug: string;
	description?: string;
	link: string;
	read: boolean;
	private: boolean;
	tags?: Tag[];
	type?: BookmarkGroup;
	createdAt?: string;
	updatedAt?: string;
}

export interface BookmarkInput {
	title: string;
	slug: string;
	description?: string;
	link: string;
	read?: boolean;
	private?: boolean;
}
