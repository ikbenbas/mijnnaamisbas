<script lang="ts">
    let username = $state('');
    let password = $state('');
    let error = $state('');

    const login = async () => {
        try {
            // TODO: Implement authentication
            console.log('Login:', username);
        } catch (e) {
            error = 'Login failed';
            console.error(e);
        }
    };
</script>

<svelte:head>
    <title>Login – mijnnaamisbas</title>
</svelte:head>

<div class="page-container">
    <div class="login-wrapper">
        <div class="login-card">
            <h1>Login</h1>
            <p class="subtitle">Welkom terug! Log in om door te gaan.</p>

            <form action="#" method="POST" onsubmit={(e) => { e.preventDefault(); login(); }}>
                {#if error}
                    <p class="error-message">{error}</p>
                {/if}

                <div class="form-group">
                    <label for="username">Gebruikersnaam</label>
                    <input
                        id="username"
                        bind:value={username}
                        name="username"
                        type="email"
                        autocomplete="username"
                        placeholder="je@email.nl"
                        required
                    />
                </div>

                <div class="form-group">
                    <label for="password">Wachtwoord</label>
                    <input
                        id="password"
                        bind:value={password}
                        name="password"
                        type="password"
                        autocomplete="current-password"
                        placeholder="••••••••"
                        required
                    />
                </div>

                <button type="submit" class="submit-btn">Kom d'rin</button>
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

    .submit-btn {
        width: 100%;
        background: var(--gradient-primary);
        border: none;
        border-radius: 4px;
        color: var(--color-text-inverse);
        cursor: pointer;
        font-size: 1rem;
        font-weight: 600;
        padding: 0.875rem 1.5rem;
        transition: transform 0.2s, box-shadow 0.2s;
    }

    .submit-btn:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-focus);
    }

    @media (max-width: 480px) {
        .login-card {
            padding: 2rem 1.5rem;
        }
    }
</style>
