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

    <section class="suggestion-form">
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
            <h2>Your Playlist Suggestions</h2>
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

.suggestion-form {
    background: var(--grey-lightest, #f5f5f6);
    border-radius: 8px;
    padding: 2rem;
    margin-bottom: 2rem;
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
