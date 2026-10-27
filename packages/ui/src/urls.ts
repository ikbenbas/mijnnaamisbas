/** Which app is rendering the shared frame. */
export type SiteApp = 'bookmarks' | 'espresso' | 'tidal';

/** Absolute origins of the three apps. */
export type AppUrls = {
	bookmarks: string;
	espresso: string;
	tidal: string;
};

/** Public env the layout reads. Missing values fall back to local ports. */
export type PublicAppEnv = {
	PUBLIC_BOOKMARKS_URL?: string;
	PUBLIC_ESPRESSO_URL?: string;
	PUBLIC_TIDAL_URL?: string;
};

/** Nav targets. In-app links are `resolve()` results; cross-app links are absolute. */
export type SiteLinks = {
	home: string;
	bookmarks: string;
	espresso: string;
	tidal: string;
};

/**
 * Resolve the public origins for the three apps.
 * @param env - `$env/dynamic/public` from the calling app
 */
export function appUrls(env: PublicAppEnv = {}): AppUrls {
	return {
		bookmarks: env.PUBLIC_BOOKMARKS_URL || 'http://localhost:5173',
		espresso: env.PUBLIC_ESPRESSO_URL || 'http://localhost:5174',
		tidal: env.PUBLIC_TIDAL_URL || 'http://localhost:5175'
	};
}
