<script lang="ts">
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
</script>

<svelte:head>
    <title>mijnnaamisbas</title>
</svelte:head>

<div class="container">
    <div>
        <h1 class="title">mijnnaamisbas</h1>
        <ul>
            {#each data.bookmarks as bookmark}
                <li>{bookmark.title}</li>
            {/each}
        </ul>
        <div class="links">
            <a href="https://svelte.dev/docs/kit" target="_blank" rel="noopener noreferrer" class="button--green">
                SvelteKit Docs
            </a>
            <a href="https://github.com/sveltejs/kit" target="_blank" rel="noopener noreferrer" class="button--grey">
                GitHub
            </a>
            <a href="/tidal" class="button--green">
                🎵 Tidal Playlist Suggestions
            </a>
        </div>
    </div>
</div>

<style>
.container {
    align-items: center;
    display: flex;
    justify-content: center;
    margin: 0 auto;
    min-height: 100vh;
    text-align: center;
}

.title {
    color: #35495e;
    display: block;
    font-size: 100px;
    font-weight: 300;
    letter-spacing: 1px;
}

.links {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-top: 15px;
}

.button--green {
    border: 1px solid #3b8070;
    border-radius: 4px;
    color: #3b8070;
    display: inline-block;
    padding: 10px 30px;
    text-decoration: none;
}

.button--green:hover {
    background-color: #3b8070;
    color: #fff;
}

.button--grey {
    border: 1px solid #35495e;
    border-radius: 4px;
    color: #35495e;
    display: inline-block;
    padding: 10px 30px;
    text-decoration: none;
}

.button--grey:hover {
    background-color: #35495e;
    color: #fff;
}
</style>
