<script lang="ts">
	import { LoginForm } from '@mnb/auth';

	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
	<title>Login – mijnnaamisbas</title>
</svelte:head>

<LoginForm {form} />
