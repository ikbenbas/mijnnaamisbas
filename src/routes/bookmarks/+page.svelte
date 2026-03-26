<script lang="ts">
    import { goto } from '$app/navigation';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();

    function handleKeydown(event: KeyboardEvent) {
        if (event.code === 'KeyN' && event.metaKey && event.ctrlKey) {
            goto('/bookmarks/add');
        }
    }
</script>

<svelte:window onkeydown={handleKeydown} />

<svelte:head>
    <title>Bookmarks – mijnnaamisbas</title>
</svelte:head>

<div class="bookmarks">
    <div class="bookmarks__main">
        <h1 class="title">Bookmarks</h1>

        <ul>
            <li>CMD-Ctrl-n: Open add page</li>
        </ul>

        <ul>
            {#each data.bookmarks as bookmark}
                <li>
                    <a href={bookmark.link} target="_blank" rel="noopener noreferrer">
                        {bookmark.title}
                    </a>
                    {#if bookmark.description}
                        <p>{bookmark.description}</p>
                    {/if}
                </li>
            {/each}
        </ul>

        <a href="/bookmarks/add">Add New Bookmark</a>
    </div>
</div>
