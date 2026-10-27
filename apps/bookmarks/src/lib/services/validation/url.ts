/**
 * URL validation utilities
 * Provides validation and parsing functions for URLs
 */

/**
 * Validate if a string is a valid HTTP/HTTPS URL
 * @param url - The URL string to validate
 * @returns true if valid HTTP/HTTPS URL, false otherwise
 *
 * @example
 * isValidUrl("https://example.com") // true
 * isValidUrl("ftp://example.com") // false
 * isValidUrl("not-a-url") // false
 */
export const isValidUrl = (url: string): boolean => {
	try {
		const urlObj = new URL(url);
		return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
	} catch {
		return false;
	}
};

/**
 * Extract hostname from a URL string
 * @param url - The URL string to parse
 * @returns Hostname without 'www.' prefix, or null if invalid
 *
 * @example
 * extractHostname("https://www.example.com/path") // "example.com"
 * extractHostname("invalid") // null
 */
export const extractHostname = (url: string): string | null => {
	try {
		const urlObj = new URL(url);
		return urlObj.hostname.replace(/^www\./, '');
	} catch {
		return null;
	}
};

/**
 * Extract title from URL (uses hostname as fallback)
 * In production, you might want to fetch the page and parse the <title> tag
 * @param url - The URL to extract title from
 * @returns Extracted title or 'Untitled Bookmark' as fallback
 *
 * @example
 * extractTitleFromUrl("https://github.com") // "github.com"
 */
export const extractTitleFromUrl = (url: string): string => {
	const hostname = extractHostname(url);
	return hostname || 'Untitled Bookmark';
};

/**
 * Validate and normalize URL
 * @param url - The URL to validate and normalize
 * @returns Normalized URL or null if invalid
 *
 * @example
 * normalizeUrl("example.com") // null (invalid - needs protocol)
 * normalizeUrl("https://example.com/path/") // "https://example.com/path"
 */
export const normalizeUrl = (url: string): string | null => {
	if (!isValidUrl(url)) {
		return null;
	}

	try {
		const urlObj = new URL(url);
		// Remove trailing slash from pathname unless it's the root
		if (urlObj.pathname.length > 1 && urlObj.pathname.endsWith('/')) {
			urlObj.pathname = urlObj.pathname.slice(0, -1);
		}
		return urlObj.toString();
	} catch {
		return null;
	}
};
