/**
 * Constants and configuration
 * Centralized application configuration following DRY principles
 */

import { env } from '$env/dynamic/public';

/**
 * Application-wide constants
 * All configuration values should be defined here for easy maintenance
 */
export const CONSTANTS = {
	/**
	 * API Endpoints configuration
	 */
	API_ENDPOINTS: {
		HYGRAPH: env.PUBLIC_HYGRAPH_ENDPOINT || '',
		TIDAL: 'https://api.tidal.com'
	},

	/**
	 * Responsive breakpoints (synced with TailwindCSS)
	 * Use these for consistent responsive behavior
	 */
	BREAKPOINTS: {
		mobile: 480,
		tablet: 768,
		desktop: 1024,
		wide: 1280
	},

	/**
	 * Pagination defaults
	 */
	PAGINATION: {
		defaultPageSize: 10,
		maxPageSize: 100,
		bookmarksPageSize: 10,
		notesPageSize: 20
	},

	/**
	 * Form validation constraints
	 */
	VALIDATION: {
		slug: {
			maxLength: 100,
			minLength: 1
		},
		title: {
			maxLength: 200,
			minLength: 1
		},
		description: {
			maxLength: 500
		},
		rating: {
			min: 1,
			max: 10
		}
	},

	/**
	 * Design tokens
	 * Reference: All design tokens are defined in src/lib/styles/base/variables.css using OKLCH color space
	 *
	 * Brand Colors:
	 * - Primary: #17ffbe (oklch(0.89 0.18 166)) - Mint
	 * - Secondary: #ef729e (oklch(0.70 0.16 350)) - Pink
	 */
	DESIGN: {
		/**
		 * Responsive breakpoints (synced with CSS variables)
		 * Use these for JavaScript-based responsive behavior
		 */
		breakpoints: {
			mobile: 480,
			tablet: 768,
			desktop: 1024,
			wide: 1280
		}
	},

	/**
	 * Cache durations (in seconds)
	 */
	CACHE: {
		bookmarks: 300, // 5 minutes
		notes: 300, // 5 minutes
		tidal: 3600 // 1 hour
	},

	/**
	 * Feature flags
	 */
	FEATURES: {
		enableTidal: true,
		enableEspresso: true,
		enableAnalytics: false
	}
} as const;

/**
 * Environment-specific configuration
 */
export const ENV = {
	isDevelopment: import.meta.env.DEV,
	isProduction: import.meta.env.PROD,
	isTest: import.meta.env.MODE === 'test'
} as const;
