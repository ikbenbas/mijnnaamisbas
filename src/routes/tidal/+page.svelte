<script lang="ts">
    import { enhance } from '$app/forms';
    import { resolve } from '$app/paths';
    import type { ActionData, PageData } from './$types';

    let { data, form }: { data: PageData; form: ActionData } = $props();
    let loading = $state(false);

    function tidalSearchUrl(playlistName: string): string {
        return `https://tidal.com/search?q=${encodeURIComponent(playlistName)}`;
    }
</script>

<svelte:head>
    <title>Tidal Playlist Suggestions – mijnnaamisbas</title>
</svelte:head>

<main class="tidal-page">
    <header class="tidal-header">
        <a href={resolve('/')} class="back-link">← Back</a>
        <h1>🎵 Tidal Playlist Suggestions</h1>
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
                <form method="POST" action="/tidal/logout">
                    <button type="submit" class="disconnect-btn">Disconnect</button>
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
                    <a href="/tidal/login" class="connect-btn">
                        <span>🎵</span> Connect Tidal Account
                    </a>
                </div>
            </div>
        {/if}

        {#if data.error}
            <div class="error-message">
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
                />
            </div>
            <button type="submit" class="submit-btn" disabled={loading}>
                {loading ? 'Generating...' : '✨ Get Suggestions'}
            </button>
        </form>
    </section>

    {#if form?.error}
        <div class="error-message">{form.error}</div>
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
                                    {#each playlist.artists as artist (artist)}
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
</main>

<style>
.tidal-page {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem;
}

.tidal-header {
    margin-bottom: 2rem;
}

.back-link {
    color: var(--primary, #069842);
    text-decoration: none;
    display: inline-block;
    margin-bottom: 1rem;
}

.back-link:hover {
    text-decoration: underline;
}

h1 {
    font-size: 2rem;
    color: var(--secondary, #292958);
}

.subtitle {
    color: var(--grey, #9a9ca6);
    font-size: 0.9rem;
    margin-top: 0.5rem;
}

/* Tidal Connection Status */
.tidal-connection {
    margin-bottom: 2rem;
}

.connection-status {
    background: #fff;
    border-radius: 8px;
    border: 2px solid;
    padding: 1.5rem;
}

.connection-status.connected {
    border-color: var(--primary, #069842);
    background: #f0fdf4;
}

.connection-status.connected .status-info {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    flex: 1;
}

.connection-status.connected .status-icon {
    background: var(--primary, #069842);
    border-radius: 50%;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    height: 28px;
    width: 28px;
    flex-shrink: 0;
}

.connection-status.connected strong {
    color: var(--secondary, #292958);
    display: block;
    margin-bottom: 0.25rem;
}

.user-stats {
    color: var(--grey, #9a9ca6);
    font-size: 0.875rem;
    margin: 0;
}

.connection-status.connected form {
    margin-top: 1rem;
}

.disconnect-btn {
    background: transparent;
    border: 1px solid var(--border, #e0e1e4);
    border-radius: 4px;
    color: var(--grey, #9a9ca6);
    cursor: pointer;
    font-size: 0.875rem;
    padding: 0.5rem 1rem;
    transition: all 250ms ease;
}

.disconnect-btn:hover {
    background: var(--grey-lightest, #f5f5f6);
    border-color: var(--grey, #9a9ca6);
}

.connection-status.disconnected {
    border-color: var(--border, #e0e1e4);
}

.connection-prompt {
    text-align: center;
}

.connection-prompt h3 {
    color: var(--secondary, #292958);
    font-size: 1.25rem;
    margin: 0 0 0.5rem;
}

.connection-prompt p {
    color: var(--grey, #9a9ca6);
    margin: 0 0 1.5rem;
}

.connect-btn {
    background: var(--primary, #069842);
    border-radius: 4px;
    color: #fff;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
    padding: 0.75rem 1.5rem;
    text-decoration: none;
    transition: opacity 250ms ease;
}

.connect-btn:hover {
    opacity: 0.85;
}

.connect-btn span {
    font-size: 1.25rem;
}

.success-message {
    background: #f0fdf4;
    border: 1px solid var(--primary, #069842);
    border-radius: 4px;
    color: var(--primary, #069842);
    margin-top: 1rem;
    padding: 1rem;
}

.suggestion-form {
    background: var(--grey-lightest, #f5f5f6);
    border-radius: 8px;
    padding: 2rem;
    margin-bottom: 2rem;
}

.suggestion-form h2 {
    color: var(--secondary, #292958);
    font-size: 1.25rem;
    margin: 0 0 1.5rem;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--secondary, #292958);
}

.form-input {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid var(--border, #e0e1e4);
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 250ms ease;
    box-sizing: border-box;
}

.form-input:focus {
    outline: none;
    border-color: var(--primary, #069842);
}

.submit-btn {
    background-color: var(--primary, #069842);
    border: none;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    padding: 0.75rem 2rem;
    transition: opacity 250ms ease;
}

.submit-btn:hover:not(:disabled) {
    opacity: 0.85;
}

.submit-btn:disabled {
    cursor: not-allowed;
    opacity: 0.6;
}

.error-message {
    background: #fde8e8;
    border: 1px solid var(--red, #d24d4d);
    border-radius: 4px;
    color: var(--red, #d24d4d);
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
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 16px;
    color: #fff;
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.25rem 0.75rem;
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
    background: #fff;
    border: 1px solid var(--border, #e0e1e4);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1.5rem;
    transition: box-shadow 250ms ease;
}

.playlist-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.playlist-name {
    color: var(--secondary, #292958);
    font-size: 1.1rem;
    margin: 0;
}

.playlist-description {
    color: var(--secondary-dark, #474b63);
    font-size: 0.9rem;
    margin: 0;
}

.artists {
    font-size: 0.875rem;
}

.artists-label {
    color: var(--grey, #9a9ca6);
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
    background: var(--grey-lightest, #f5f5f6);
    border-radius: 4px;
    padding: 0.2rem 0.5rem;
}

.tidal-link {
    background: #000;
    border-radius: 4px;
    color: #fff;
    display: inline-block;
    font-weight: 600;
    margin-top: auto;
    padding: 0.5rem 1rem;
    text-align: center;
    text-decoration: none;
    transition: opacity 250ms ease;
}

.tidal-link:hover {
    opacity: 0.8;
}
</style>
