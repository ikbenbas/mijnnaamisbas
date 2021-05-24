<template>
    <div class="container">
        <h1 class="title">
            Bookmarks
        </h1>

        <ul>
            <li>CMD-Ctrl-n: Open add page</li>
            <li>CMD-Ctrl-e: Toggle Edit mode (icon, click -> open edit page)</li>
        </ul>

        <BookmarksOverview :bookmarks="bookmarks" />

        <NuxtLink
            :to="{ name: 'bookmarks-add' }"
        >
            Add New Bookmark
        </NuxtLink>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
// import { LOGIN_USER } from '~/graphql/mutations/LoginUser';

export default Vue.extend({
    async asyncData(context) {
        console.log(context);
        // const response = await fetch($config.faunaGraphqlUrl, {
        //     headers: {
        //         authorization: `bearer ${$config.faunaServerKey}`,
        //     },
        //     method: 'POST',
        //     body: JSON.stringify({ query: `
        //         query getAllBookmarks {
        //             allBookmarks(_size: 10) {
        //                 data {
        //                     _id
        //                     title
        //                     description
        //                     link
        //                 }
        //             }
        //         }`,
        //     }),
        // });

        // const data = await response.json();

        // return {
        //     bookmarks: data,
        // };
    },
    data() {
        return {
            bookmarks: [],
        };
    },
    // async mounted() {
    //     // console.log(this.bookmarks);
    //     // this.addEventListeners();

    //     // const response = await this.$apollo.mutate({
    //     //     // Query
    //     //     mutation: LOGIN_USER('bvanwouwen@hotmail.com', 'abcdef'),
    //     //     // Parameters
    //     //     // variables:w {
    //     //     //     label: this.newTag,
    //     //     // },
    //     // });

    //     // const response = await fetch(this.$config.faunaGraphqlUrl, {
    //     //     headers: {
    //     //         authorization: `bearer ${this.$config.faunaServerKey}`,
    //     //     },
    //     //     method: 'POST',
    //     //     body: JSON.stringify(
    //     //         {
    //     //             query: `mutation LoginEmployeeUser {
    //     //                 loginUser(input: {
    //     //                     username: "peter.gibbons"
    //     //                     password: "${password}"
    //     //                 }
    //     //             }`
    //     //         }
    //     //     )
    //     // });

    //     // const data = await response;

    //     // console.log(response);
    // },
    // destroyed() {
    //     this.removeEventListeners();
    // },
    // methods: {
    //     addEventListeners() {
    //         window.addEventListener('keydown', this.addBookmarkListener);
    //         document.addEventListener('paste', this.pasteBookmarkListener);
    //     },
    //     removeEventListeners() {
    //         window.removeEventListener('keydown', this.addBookmarkListener);
    //         document.removeEventListener('paste', this.pasteBookmarkListener);
    //     },
    //     addBookmarkListener(event: KeyboardEvent) {
    //         // Add new bookmark short-cut
    //         if (event.code === 'KeyN' && event.metaKey && event.ctrlKey) {
    //             this.$router.push({ name: 'bookmarks-add' });
    //         }
    //     },
    //     pasteBookmarkListener(event: ClipboardEvent) {

    //         // Add new bookmark short cut
    //         const pastedText = (event.clipboardData || (<any>window).clipboardData).getData('text');
    //         console.log(pastedText);
    //         console.log(this);
    //         try {
    //             const link = new URL(pastedText);
    //             console.log(link);
    //             // this.$router.push({
    //             //     name: 'bookmarks-add',
    //             //     params: { link },
    //             // });

    //             fetch(this.$config.faunaGraphqlUrl, {
    //                 headers: {
    //                     authorization: `bearer ${this.$config.faunaServerKey}`,
    //                 },
    //                 method: 'POST',
    //                 body: JSON.stringify({ query: `
    //                         mutation createBookmark {
    //                             createBookmark(data: {link: ${link}, read: true}) {
    //                                 _id
    //                                 link
    //                             }
    //                         }
    //                     `,
    //                 }),
    //             });

    //         } catch (error) {
    //             console.error(error);

    //             return false;
    //         }

    //         event.preventDefault();

    //         return true;
    //     },
    // },
});
</script>

