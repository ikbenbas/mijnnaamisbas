import prettierConfig from '@mnb/eslint-config/prettier';
import storybookConfig from '@mnb/eslint-config/storybook';
import svelteConfig from '@mnb/eslint-config/svelte';

export default [
	...svelteConfig,
	...storybookConfig,
	prettierConfig,
	{
		ignores: [
			'**/.svelte-kit/**',
			'**/.turbo/**',
			'**/build/**',
			'**/dist/**',
			'**/node_modules/**',
			'**/storybook-static/**'
		]
	}
];
