<script lang="ts">
    import { enhance } from '$app/forms';
    import { resolve } from '$app/paths';
    import { Button } from '$lib';
    import { CONSTANTS } from '$lib/config/Constants';
    import type { ActionData, PageData } from './$types';

    let { data, form }: { data: PageData; form: ActionData } = $props();
    let loading = $state(false);

    const tidalSearchUrl = (playlistName: string): string => `${CONSTANTS.APP_BASE.TIDAL}/search?q=${encodeURIComponent(playlistName)}`;
</script>

<svelte:head>
    <title>Tidal Playlist Suggestions – mijnnaamisbas</title>
</svelte:head>

<div class="page-container">
    <header class="page-header">
        <h1>Tidal playlist suggestions</h1>
        <p class="subtitle">Powered by Mistral AI — European AI</p>
    </header>

    <!-- Tidal Connection Status -->
    <section class="tidal-connection">
        {#if data.authenticated}
            <div class="connection-status connected">
                <div class="status-info">
                    <span class="status-icon">✓</span>
                    <div>
                        <strong>Connected to Tidal</strong>
                        {#if data.userTaste}
                            <p class="user-stats">
                                {data.userTaste.totalPlaylists} playlists · {data.userTaste.totalTracks} tracks
                                {#if data.userTaste.topGenres.length > 0}
                                    · {data.userTaste.topGenres.slice(0, 3).join(', ')}
                                {/if}
                            </p>
                        {/if}
                    </div>
                </div>
                <form method="POST" action={resolve('/tidal/logout')}>
                    <Button type="submit" variant="secondary" size="sm">Disconnect</Button>
                </form>
            </div>
            {#if data.justConnected}
                <div class="success-message">
                    🎉 Successfully connected! Your suggestions will now be personalized based on your Tidal library.
                </div>
            {/if}
        {:else}
            <div class="connection-status disconnected">
                <div class="connection-prompt">
                    <h3>Get Personalized Suggestions</h3>
                    <p>Connect your Tidal account to receive AI-powered playlist recommendations based on your actual music taste.</p>
                    <Button href={resolve('/tidal/login')} variant="primary">Connect Tidal Account</Button>
                </div>
            </div>
        {/if}

        {#if data.error}
            <div class="error-message" role="alert">
                {#if data.error === 'auth_failed'}
                    Failed to authorize with Tidal. Please try again.
                {:else if data.error === 'login_failed'}
                    Failed to complete login. Please try again.
                {:else}
                    An error occurred. Please try again.
                {/if}
            </div>
        {/if}
    </section>

    <section class="suggestion-form">
        <h2>What are you in the mood for?</h2>
        <form
            method="POST"
            action="?/suggest"
            use:enhance={() => {
                loading = true;
                return async ({ update }) => {
                    await update();
                    loading = false;
                };
            }}
        >
            <div class="form-group">
                <label for="mood">Mood / Feeling</label>
                <input
                    id="mood"
                    name="mood"
                    type="text"
                    placeholder="e.g. relaxed, energetic, melancholic..."
                    class="form-input"
                    value={form?.mood ?? ''}
                    required
                />
            </div>
            <div class="form-group">
                <label for="genre">Genre (optional)</label>
                <input
                    id="genre"
                    name="genre"
                    type="text"
                    placeholder="e.g. jazz, electronic, indie..."
                    class="form-input"
                    value={form?.genre ?? ''}
                />
            </div>
            <Button type="submit" variant="primary" disabled={loading} loading={loading}>
                {loading ? 'Generating...' : 'Get suggestions'}
            </Button>
        </form>
    </section>

    {#if form?.error}
        <div class="error-message" role="alert">{form.error}</div>
    {/if}

    {#if form?.suggestions && form.suggestions.length > 0}
        <section class="suggestions">
            <div class="suggestions-header">
                <h2>Your Playlist Suggestions</h2>
                {#if form.personalized}
                    <span class="personalized-badge">✨ Personalized for you</span>
                {/if}
            </div>
            <div class="playlist-grid">
                {#each form.suggestions as playlist (playlist.name)}
                    <div class="playlist-card">
                        <h3 class="playlist-name">{playlist.name}</h3>
                        <p class="playlist-description">{playlist.description}</p>
                        {#if playlist.artists && playlist.artists.length > 0}
                            <div class="artists">
                                <span class="artists-label">Featured artists:</span>
                                <ul class="artists-list">
                                    {#each playlist.artists as artist, index (index)}
                                        <li>{artist}</li>
                                    {/each}
                                </ul>
                            </div>
                        {/if}
                        <a
                            href={tidalSearchUrl(playlist.name)}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="tidal-link"
                            data-sveltekit-reload
                        >
                            Search on Tidal
                        </a>
                    </div>
                {/each}
            </div>
        </section>
    {/if}
</div>

<style>
.page-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;
}

.page-header {
    margin-bottom: 2rem;
}

.page-header h1 {
    font-size: var(--font-size-4xl);
    color: var(--color-text-primary);
    margin: 0 0 var(--space-sm) 0;
}

.subtitle {
    color: var(--color-text-secondary);
    font-size: var(--font-size-sm);
    margin: 0;
}

/* Tidal Connection Status */
.tidal-connection {
    margin-bottom: 2rem;
}

.connection-status {
    background: var(--color-bg-primary);
    border: var(--border-width-thick) solid var(--color-border-primary);
    box-shadow: var(--shadow-sm);
    padding: var(--space-lg);
}

.connection-status.connected {
    background: var(--color-offwhite);
}

.connection-status.connected .status-info {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    flex: 1;
}

.connection-status.connected .status-icon {
    background: var(--color-black);
    color: var(--color-offwhite);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: var(--font-weight-bold);
    height: 28px;
    width: 28px;
    flex-shrink: 0;
    border: var(--border-width) solid var(--color-black);
}

.connection-status.connected strong {
    color: var(--color-text-primary);
    display: block;
    margin-bottom: var(--space-xs);
}

.user-stats {
    color: var(--color-text-secondary);
    font-size: var(--font-size-sm);
    margin: 0;
}

.connection-status.connected form {
    margin-top: 1rem;
}

.connection-status.disconnected {
    border-color: var(--color-border-primary);
}

.connection-prompt {
    text-align: center;
}

.connection-prompt h3 {
    color: var(--color-text-primary);
    font-size: var(--font-size-xl);
    margin: 0 0 var(--space-sm);
}

.connection-prompt p {
    color: var(--color-text-secondary);
    margin: 0 0 var(--space-lg);
}

.success-message {
    background: var(--color-offwhite);
    border: var(--border-width-thick) solid var(--color-black);
    color: var(--color-text-primary);
    margin-top: var(--space-md);
    padding: var(--space-md);
    box-shadow: var(--shadow-sm);
}

.suggestion-form {
    background: var(--color-bg-primary);
    border: var(--border-width-thick) solid var(--color-border-primary);
    box-shadow: var(--shadow-sm);
    padding: var(--space-xl);
    margin-bottom: var(--space-xl);
}

.suggestion-form h2 {
    color: var(--color-text-primary);
    font-size: var(--font-size-xl);
    margin: 0 0 var(--space-lg);
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

.form-input {
    width: 100%;
    padding: var(--space-md) var(--space-md);
    border: var(--border-width-thick) solid var(--color-border-primary);
    border-radius: 0;
    font-family: var(--font-primary);
    font-size: var(--font-size-base);
    background: var(--color-offwhite);
    transition: border-color var(--transition-fast);
    box-sizing: border-box;
}

.form-input:focus {
    outline: none;
    border-color: var(--color-border-focus);
    box-shadow: var(--shadow-focus);
}

.error-message {
    background: var(--color-error-light);
    border: var(--border-width-thick) solid var(--color-black);
    color: var(--color-error);
    margin-bottom: 2rem;
    padding: 1rem;
}

.suggestions {
    margin-top: 2rem;
}

.suggestions-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.suggestions-header h2 {
    margin: 0;
}

.personalized-badge {
    background: var(--color-black);
    color: var(--color-offwhite);
    font-family: var(--font-handjet);
    font-size: 0.85rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 0.25rem 0.75rem;
    border: var(--border-width) solid var(--color-black);
}

.suggestions h2 {
    margin-bottom: 1.5rem;
}

.playlist-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}

.playlist-card {
    background: var(--color-surface);
    border: var(--border-width-thick) solid var(--color-border-primary);
    box-shadow: var(--shadow-sm);
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1.5rem;
    transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

.playlist-card:hover {
    transform: translate(-2px, -2px);
    box-shadow: var(--shadow-md);
}

.playlist-name {
    color: var(--color-text-primary);
    font-size: 1.1rem;
    margin: 0;
}

.playlist-description {
    color: var(--color-text-secondary);
    font-size: 0.9rem;
    margin: 0;
}

.artists {
    font-size: 0.875rem;
}

.artists-label {
    color: var(--color-text-secondary);
    font-weight: 600;
}

.artists-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    list-style: none;
    margin: 0.5rem 0 0;
    padding: 0;
}

.artists-list li {
    background: var(--color-background-secondary);
    border: var(--border-width) solid var(--color-black);
    padding: 0.2rem 0.5rem;
}

.tidal-link {
    background: var(--color-black);
    border: var(--border-width-thick) solid var(--color-black);
    color: var(--color-offwhite);
    display: inline-block;
    font-family: var(--font-display);
    font-size: var(--font-size-sm);
    text-transform: uppercase;
    letter-spacing: 0.03em;
    margin-top: auto;
    padding: 0.5rem 1rem;
    text-align: center;
    text-decoration: none;
    box-shadow: var(--shadow-sm);
    transition: transform var(--transition-fast), box-shadow var(--transition-fast);
    opacity: 1;
}

.tidal-link:hover {
    transform: translate(-1px, -1px);
    box-shadow: var(--shadow-md);
    opacity: 1;
}
</style>
