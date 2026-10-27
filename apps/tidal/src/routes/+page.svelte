<script lang="ts">
    import { MNBAlert, MNBButton, MNBInput, MNBPageHeader } from '@mnb/ui';

    import type { ActionData, PageData } from './$types';

    import { enhance } from '$app/forms';
    import { resolve } from '$app/paths';
    import { CONSTANTS } from '$lib/config/Constants';


    let { data, form }: { data: PageData; form: ActionData } = $props();
    let loading = $state(false);

    const tidalSearchUrl = (playlistName: string): string => `${CONSTANTS.APP_BASE.TIDAL}/search?q=${encodeURIComponent(playlistName)}`;
</script>

<svelte:head>
    <title>Tidal Playlist Suggestions – mijnnaamisbas</title>
</svelte:head>

<div class="page-container">
    <MNBPageHeader title="Tidal playlist suggestions" lede="Powered by Mistral AI — European AI" />

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
                <form method="POST" action={resolve('/logout')}>
                    <MNBButton type="submit" variant="secondary" size="sm">Disconnect</MNBButton>
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
                    <MNBButton href={resolve('/login')} variant="primary">Connect Tidal Account</MNBButton>
                </div>
            </div>
        {/if}

        {#if data.error}
            <MNBAlert>
                {#if data.error === 'auth_failed'}
                    Failed to authorize with Tidal. Please try again.
                {:else if data.error === 'login_failed'}
                    Failed to complete login. Please try again.
                {:else}
                    An error occurred. Please try again.
                {/if}
            </MNBAlert>
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
            <div class="fields">
                <MNBInput
                    id="mood"
                    name="mood"
                    label="Mood / Feeling"
                    placeholder="e.g. relaxed, energetic, melancholic..."
                    value={form?.mood ?? ''}
                    required
                />
                <MNBInput
                    id="genre"
                    name="genre"
                    label="Genre (optional)"
                    placeholder="e.g. jazz, electronic, indie..."
                    value={form?.genre ?? ''}
                />
            </div>
            <MNBButton type="submit" variant="primary" disabled={loading} loading={loading}>
                {loading ? 'Generating...' : 'Get suggestions'}
            </MNBButton>
        </form>
    </section>

    {#if form?.error}
        <MNBAlert>{form.error}</MNBAlert>
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

/* Tidal Connection Status */
.tidal-connection {
    margin-bottom: 2rem;
}

.connection-status {
    background: var(--mnb-color-offwhite);
    border: var(--mnb-border-width-thick) solid var(--mnb-color-black);
    box-shadow: var(--mnb-shadow-sm);
    padding: var(--mnb-space-lg);
}

.connection-status.connected {
    background: var(--mnb-color-offwhite);
}

.connection-status.connected .status-info {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    flex: 1;
}

.connection-status.connected .status-icon {
    background: var(--mnb-color-black);
    color: var(--mnb-color-offwhite);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: var(--mnb-font-weight-bold);
    height: 28px;
    width: 28px;
    flex-shrink: 0;
    border: var(--mnb-border-width) solid var(--mnb-color-black);
}

.connection-status.connected strong {
    color: var(--mnb-color-ink);
    display: block;
    margin-bottom: var(--mnb-space-xs);
}

.user-stats {
    color: var(--mnb-color-text-secondary);
    font-size: var(--mnb-font-size-sm);
    margin: 0;
}

.connection-status.connected form {
    margin-top: 1rem;
}

.connection-status.disconnected {
    border-color: var(--mnb-color-black);
}

.connection-prompt {
    text-align: center;
}

.connection-prompt h3 {
    color: var(--mnb-color-ink);
    font-size: var(--mnb-font-size-xl);
    margin: 0 0 var(--mnb-space-sm);
}

.connection-prompt p {
    color: var(--mnb-color-text-secondary);
    margin: 0 0 var(--mnb-space-lg);
}

.success-message {
    background: var(--mnb-color-offwhite);
    border: var(--mnb-border-width-thick) solid var(--mnb-color-black);
    color: var(--mnb-color-ink);
    margin-top: var(--mnb-space-md);
    padding: var(--mnb-space-md);
    box-shadow: var(--mnb-shadow-sm);
}

.suggestion-form {
    background: var(--mnb-color-offwhite);
    border: var(--mnb-border-width-thick) solid var(--mnb-color-black);
    box-shadow: var(--mnb-shadow-sm);
    padding: var(--mnb-space-xl);
    margin-bottom: var(--mnb-space-xl);
}

.suggestion-form h2 {
    color: var(--mnb-color-ink);
    font-size: var(--mnb-font-size-xl);
    margin: 0 0 var(--mnb-space-lg);
}

.fields {
    display: flex;
    flex-direction: column;
    gap: var(--mnb-space-lg);
    margin-bottom: var(--mnb-space-lg);
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
    background: var(--mnb-color-black);
    color: var(--mnb-color-offwhite);
    font-family: var(--mnb-font-handjet);
    font-size: 0.85rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 0.25rem 0.75rem;
    border: var(--mnb-border-width) solid var(--mnb-color-black);
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
    background: var(--mnb-color-offwhite);
    border: var(--mnb-border-width-thick) solid var(--mnb-color-black);
    box-shadow: var(--mnb-shadow-sm);
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1.5rem;
    transition: transform var(--mnb-transition-fast), box-shadow var(--mnb-transition-fast);
}

.playlist-card:hover {
    transform: translate(-2px, -2px);
    box-shadow: var(--mnb-shadow-md);
}

.playlist-name {
    color: var(--mnb-color-ink);
    font-size: 1.1rem;
    margin: 0;
}

.playlist-description {
    color: var(--mnb-color-text-secondary);
    font-size: 0.9rem;
    margin: 0;
}

.artists {
    font-size: 0.875rem;
}

.artists-label {
    color: var(--mnb-color-text-secondary);
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
    background: var(--mnb-color-paper);
    border: var(--mnb-border-width) solid var(--mnb-color-black);
    padding: 0.2rem 0.5rem;
}

.tidal-link {
    background: var(--mnb-color-black);
    border: var(--mnb-border-width-thick) solid var(--mnb-color-black);
    color: var(--mnb-color-offwhite);
    display: inline-block;
    font-family: var(--mnb-font-display);
    font-size: var(--mnb-font-size-sm);
    text-transform: uppercase;
    letter-spacing: 0.03em;
    margin-top: auto;
    padding: 0.5rem 1rem;
    text-align: center;
    text-decoration: none;
    box-shadow: var(--mnb-shadow-sm);
    transition: transform var(--mnb-transition-fast), box-shadow var(--mnb-transition-fast);
    opacity: 1;
}

.tidal-link:hover {
    transform: translate(-1px, -1px);
    box-shadow: var(--mnb-shadow-md);
    opacity: 1;
}
</style>
