/**
 * Slug generation utilities
 * Provides URL-friendly slug generation from text strings
 */

/**
 * Generate a URL-friendly slug from a title or text string
 * @param text - The text to convert to a slug
 * @param maxLength - Maximum length of the slug (default: 100)
 * @returns URL-friendly slug
 *
 * @example
 * generateSlug("Hello World!") // "hello-world"
 * generateSlug("TypeScript & JavaScript") // "typescript-javascript"
 */
export const generateSlug = (text: string, maxLength = 100): string => {
	return text
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '') // Remove special characters
		.replace(/\s+/g, '-') // Replace spaces with hyphens
		.replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
		.replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
		.substring(0, maxLength); // Limit length
};

/**
 * Generate a unique slug by appending a timestamp if needed
 * @param text - The text to convert to a slug
 * @param maxLength - Maximum length of the slug (default: 90 to leave room for timestamp)
 * @returns Unique URL-friendly slug
 */
export const generateUniqueSlug = (text: string, maxLength = 90): string => {
	const baseSlug = generateSlug(text, maxLength);
	const timestamp = Date.now().toString(36); // Convert timestamp to base36 for shorter string
	return `${baseSlug}-${timestamp}`;
};
