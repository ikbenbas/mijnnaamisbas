import { fileURLToPath } from 'node:url';

import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	envDir: fileURLToPath(new URL('../..', import.meta.url)),
	ssr: {
		noExternal: [/^@mnb\//]
	}
});
