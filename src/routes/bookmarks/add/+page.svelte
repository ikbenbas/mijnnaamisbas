<script lang="ts">
    import { goto } from '$app/navigation';
    import { resolve } from '$app/paths';
    import { page } from '$app/state';

    let link = $derived(page.url.searchParams.get('link') ?? '');

    function close() {
        goto(resolve('/bookmarks'));
    }

    function create() {
        // TODO: Implement bookmark creation
        goto(resolve('/bookmarks'));
    }
</script>

<svelte:head>
    <title>Add Bookmark – mijnnaamisbas</title>
</svelte:head>

<div class="modal-overlay">
    <div class="modal">
        <button class="modal__close" onclick={close} aria-label="Close">✕</button>
        <h2>Add Bookmark</h2>
        <form onsubmit={(e) => { e.preventDefault(); create(); }}>
            <div>
                <label for="link">Link</label>
                <input id="link" type="url" bind:value={link} placeholder="https://..." required />
            </div>
            <button type="submit">Add</button>
        </form>
    </div>
</div>

<style>
.modal-overlay {
    align-items: center;
    backdrop-filter: blur(3px);
    background-color: rgba(255, 255, 255, 0.7);
    display: flex;
    height: 100%;
    justify-content: center;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 999;
}

.modal {
    background-color: #fff;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    padding: 1.5em;
    position: fixed;
    width: 80vw;
    max-width: 600px;
}

.modal__close {
    background: none;
    border: none;
    cursor: pointer;
    position: absolute;
    right: 1.5em;
    top: 1.5em;
}
</style>
