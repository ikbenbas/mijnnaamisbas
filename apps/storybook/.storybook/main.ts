import type { StorybookConfig } from '@storybook/svelte-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
	stories: ['../src/**/*.stories.svelte'],
	addons: ['@storybook/addon-svelte-csf'],
	framework: {
		name: '@storybook/svelte-vite',
		options: {
			// The docgen plugin parses Svelte source as JavaScript under Vite 8.
			docgen: false
		}
	},
	async viteFinal(config) {
		return mergeConfig(config, {
			optimizeDeps: {
				exclude: ['@mnb/ui', '@mnb/tokens']
			},
			server: {
				fs: {
					allow: ['../..']
				}
			}
		});
	}
};

export default config;
