import type { Preview } from '@storybook/svelte-vite';
import '@mnb/tokens/styles.css';

const preview: Preview = {
	parameters: {
		layout: 'padded',
		controls: {
			expanded: true
		}
	}
};

export default preview;
