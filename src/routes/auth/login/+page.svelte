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
        background: white;
        border-radius: 8px;
        border: 1px solid #e0e0e0;
        padding: 2.5rem;
        max-width: 400px;
        width: 100%;
    }

    h1 {
        color: #35495e;
        font-size: 2rem;
        margin: 0 0 0.5rem;
        text-align: center;
    }

    .subtitle {
        color: #666;
        font-size: 0.95rem;
        margin: 0 0 2rem;
        text-align: center;
    }

    .form-group {
        margin-bottom: 1.5rem;
    }

    .form-group label {
        display: block;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: #35495e;
    }

    .form-group input {
        width: 100%;
        padding: 0.75rem 1rem;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        font-size: 1rem;
        transition: border-color 0.2s, box-shadow 0.2s;
        box-sizing: border-box;
    }

    .form-group input:focus {
        outline: none;
        border-color: #3b8070;
        box-shadow: 0 0 0 3px rgba(59, 128, 112, 0.1);
    }

    .error-message {
        background: #fde8e8;
        border: 1px solid #d24d4d;
        border-radius: 4px;
        color: #d24d4d;
        padding: 0.75rem;
        margin-bottom: 1.5rem;
        text-align: center;
    }

    .submit-btn {
        width: 100%;
        background-color: #3b8070;
        border: none;
        border-radius: 4px;
        color: white;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 600;
        padding: 0.875rem 1.5rem;
        transition: transform 0.2s, box-shadow 0.2s;
    }

    .submit-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(59, 128, 112, 0.2);
    }

    @media (max-width: 480px) {
        .login-card {
            padding: 2rem 1.5rem;
        }
    }
</style>
