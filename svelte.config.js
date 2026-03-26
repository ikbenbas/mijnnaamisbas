import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		// CSRF protection is enabled by default in SvelteKit 2.x
		// It validates that form actions (POST requests) come from the same origin
		// Additional protection is implemented in hooks.server.ts
		csrf: {
			checkOrigin: true // Explicitly enable origin checking (default: true)
		}
	}
};

export default config;
