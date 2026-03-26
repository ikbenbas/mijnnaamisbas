<script lang="ts">
    let username = $state('');
    let password = $state('');
    let error = $state('');

    async function login() {
        try {
            // TODO: Implement authentication
            console.log('Login:', username);
        } catch (e) {
            error = 'Login failed';
            console.error(e);
        }
    }
</script>

<svelte:head>
    <title>Login – mijnnaamisbas</title>
</svelte:head>

<div>
    <form action="#" method="POST" onsubmit={(e) => { e.preventDefault(); login(); }}>
        {#if error}
            <p class="error">{error}</p>
        {/if}
        <div>
            <label for="username" class="sr-only">Gebruikersnaam</label>
            <input
                id="username"
                bind:value={username}
                name="username"
                type="email"
                autocomplete="username"
                placeholder="Gebruikersnaam"
                required
            />
        </div>
        <div>
            <label for="password">Wachtwoord</label>
            <input
                id="password"
                bind:value={password}
                name="password"
                type="password"
                autocomplete="current-password"
                placeholder="Wachtwoord"
                required
            />
        </div>
        <div>
            <button type="submit">Kom d'rin</button>
        </div>
    </form>
</div>
