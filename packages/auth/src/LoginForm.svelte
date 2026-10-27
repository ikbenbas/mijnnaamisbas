<script lang="ts">
	import { MNBButton } from '@mnb/ui';

	interface Props {
		form?: { error?: string; username?: string } | null;
	}

	let { form = null }: Props = $props();
</script>

<div class="login-wrapper">
	<div class="login-card">
		<h1>Login</h1>
		<p class="subtitle">Welkom terug! Log in om door te gaan.</p>

		<form method="POST" action="?/login">
			{#if form?.error}
				<p class="error-message" role="alert">{form.error}</p>
			{/if}

			<div class="form-group">
				<label for="username">Gebruikersnaam</label>
				<input
					id="username"
					name="username"
					type="email"
					autocomplete="username"
					placeholder="je@email.nl"
					value={form?.username ?? ''}
					required
				/>
			</div>

			<div class="form-group">
				<label for="password">Wachtwoord</label>
				<input
					id="password"
					name="password"
					type="password"
					autocomplete="current-password"
					placeholder="••••••••"
					required
				/>
			</div>

			<MNBButton type="submit" variant="primary" fullWidth>Kom d'rin</MNBButton>
		</form>
	</div>
</div>

<style>
	.login-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 60vh;
		padding: 2rem;
	}

	.login-card {
		background: var(--mnb-color-offwhite);
		border-radius: var(--mnb-radius);
		border: var(--mnb-border-width) solid var(--mnb-color-black);
		padding: var(--mnb-space-2xl);
		max-width: 400px;
		width: 100%;
	}

	h1 {
		color: var(--mnb-color-ink);
		font-size: var(--mnb-font-size-4xl);
		margin: 0 0 var(--mnb-space-sm);
		text-align: center;
	}

	.subtitle {
		color: var(--mnb-color-text-secondary);
		font-size: var(--mnb-font-size-base);
		margin: 0 0 var(--mnb-space-xl);
		text-align: center;
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	.form-group label {
		display: block;
		font-weight: var(--mnb-font-weight-bold);
		margin-bottom: var(--mnb-space-sm);
		color: var(--mnb-color-ink);
	}

	.form-group input {
		width: 100%;
		padding: var(--mnb-space-md) var(--mnb-space-md);
		border: var(--mnb-border-width) solid var(--mnb-color-black);
		border-radius: var(--mnb-radius);
		font-size: var(--mnb-font-size-base);
		transition:
			border-color var(--mnb-transition-fast),
			box-shadow var(--mnb-transition-fast);
		box-sizing: border-box;
	}

	.form-group input:focus {
		outline: none;
		border-color: var(--mnb-color-black);
		box-shadow: var(--mnb-shadow-focus);
	}

	.error-message {
		background: var(--mnb-color-error-light);
		border: 1px solid var(--mnb-color-error);
		border-radius: 4px;
		color: var(--mnb-color-error);
		padding: 0.75rem;
		margin-bottom: 1.5rem;
		text-align: center;
	}

	@media (max-width: 480px) {
		.login-card {
			padding: 2rem 1.5rem;
		}
	}
</style>
