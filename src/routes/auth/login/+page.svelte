<script lang="ts">
	import { Button } from '$lib';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
    <title>Login – mijnnaamisbas</title>
</svelte:head>

<div class="page-container">
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

                <Button type="submit" variant="primary" fullWidth>Kom d'rin</Button>
            </form>
        </div>
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
        background: var(--color-bg-primary);
        border-radius: var(--radius-lg);
        border: var(--border-width) solid var(--color-border-primary);
        padding: var(--space-2xl);
        max-width: 400px;
        width: 100%;
    }

    h1 {
        color: var(--color-text-primary);
        font-size: var(--font-size-4xl);
        margin: 0 0 var(--space-sm);
        text-align: center;
    }

    .subtitle {
        color: var(--color-text-secondary);
        font-size: var(--font-size-base);
        margin: 0 0 var(--space-xl);
        text-align: center;
    }

    .form-group {
        margin-bottom: 1.5rem;
    }

    .form-group label {
        display: block;
        font-weight: var(--font-weight-semibold);
        margin-bottom: var(--space-sm);
        color: var(--color-text-primary);
    }

    .form-group input {
        width: 100%;
        padding: var(--space-md) var(--space-md);
        border: var(--border-width) solid var(--color-border-primary);
        border-radius: var(--radius-sm);
        font-size: var(--font-size-base);
        transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
        box-sizing: border-box;
    }

    .form-group input:focus {
        outline: none;
        border-color: var(--color-border-focus);
        box-shadow: var(--shadow-focus);
    }

    .error-message {
        background: var(--color-error-light);
        border: 1px solid var(--color-error);
        border-radius: 4px;
        color: var(--color-error);
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
