import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter()
		// Same-origin form checks stay on (trustedOrigins defaults to []).
		// hooks.server.ts adds a second origin check for state-changing requests.
	}
};

export default config;
