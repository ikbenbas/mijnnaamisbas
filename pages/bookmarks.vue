<template>
    <div class="bookmarks">
        <div class="bookmarks__main">
            <h1 class="title">
                Bookmarks
            </h1>

            <ul>
                <li>CMD-Ctrl-n: Open add page</li>
                <li>CMD-Ctrl-e: Toggle Edit mode (icon, click -> open edit page)</li>
            </ul>
            {{ bookmarks }}
            <!-- <BookmarksOverview :bookmarks="bookmarks" /> -->

            <NuxtLink
                :to="{ name: 'bookmarks-add' }"
            >
                Add New Bookmark
            </NuxtLink>
        </div>

        <NuxtChild />
    </div>
</template>

<script>
import Vue from 'vue';
// import { LOGIN_USER } from '~/graphql/mutations/LoginUser';

export default Vue.extend({
    async asyncData({ $config }) {
        const response = await fetch($config.faunaGraphqlUrl, {
            headers: {
                authorization: `bearer ${$config.faunaServerKey}`,
            },
            method: 'POST',
            body: JSON.stringify({ query: `
                query getAllBookmarks {
                    allBookmarks(_size: 10) {
                        data {
                            _id
                            title
                            description
                            link
                        }
                    }
                }`,
            }),
        });

        const data = await response.json();

        return {
            bookmarks: data,
        };
    },
    data() {
        return {
            bookmarks: [],
        };
    },
    mounted() {
        this.addEventListeners();
    },
    destroyed() {
        this.removeEventListeners();
    },
    methods: {
        addEventListeners() {
            window.addEventListener('keydown', this.addBookmarkListener);
            document.addEventListener('paste', this.pasteBookmarkListener);
        },
        removeEventListeners() {
            window.removeEventListener('keydown', this.addBookmarkListener);
            document.removeEventListener('paste', this.pasteBookmarkListener);
        },
        addBookmarkListener(event) {
            // Add new bookmark short-cut
            if (event.code === 'KeyN' && event.metaKey && event.ctrlKey) {
                this.$router.push({ name: 'bookmarks-add' });
            }
        },
        pasteBookmarkListener(event) {
            event.preventDefault();

            const pastedText = (event.clipboardData || window.clipboardData).getData('text');
            const link = new URL(pastedText);

            this.$router.push({
                name: 'bookmarks-add',
                params: { link },
            });

            return true;
        },
    },
});
</script>
