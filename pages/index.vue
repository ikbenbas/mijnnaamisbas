<template>
    <div class="container">
        <div>
            <!-- <Logo><h1><span class="color main">Hoi,</span><br>mijn naam is Bas</h1></Logo> -->
            <h1 class="title">
                mijnnaamisbas
            </h1>
            <ul>
                <li
                    v-for="bookmark in bookmarks"
                    :key="bookmark._id"
                >
                    {{ bookmark.title }}
                </li>
            </ul>
            <div class="links">
                <a
                    href="https://nuxtjs.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="button--green"
                >
                    Documentation
                </a>
                <a
                    href="https://github.com/nuxt/nuxt.js"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="button--grey"
                >
                    GitHub
                </a>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    async asyncData({ $config: { faunaGraphqlUrl, faunaServerKey } }) {
        await fetch(faunaGraphqlUrl, {
            headers: {
                authorization: `bearer ${faunaServerKey}`,
            },
            method: 'POST',
            body: JSON.stringify({ query: `
                    mutation createBookmark {
                        createBookmark(data: {title: "Bas test", slug: "bas-test", read: true}) {
                            _id
                            title
                            slug
                        }
                    }
                `,
            }),
        });

        const response = await fetch(faunaGraphqlUrl, {
            headers: {
                authorization: `bearer ${faunaServerKey}`,
            },
            method: 'POST',
            body: JSON.stringify({ query: `
                query getAllBookmarks {
                    allBookmarks(_size: 10) {
                        data {
                            _id
                            title
                        }
                    }
                }
                `,
            }),
        });

        const data = await response.json();

        return {
            bookmarks: data.data.allBookmarks.data,
        };
    },
    data() {
        return {
            bookmarks: [],
        };
    },
    async mounted() {
        console.log(this.bookmarks);
    },
});
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
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
    font-family:
        'Quicksand',
        'Source Sans Pro',
        -apple-system,
        BlinkMacSystemFont,
        'Segoe UI',
        Roboto,
        'Helvetica Neue',
        Arial,
        sans-serif;
    font-size: 100px;
    font-weight: 300;
    letter-spacing: 1px;
}

.subtitle {
    color: #526488;
    font-size: 42px;
    font-weight: 300;
    padding-bottom: 15px;
    word-spacing: 5px;
}

.links {
    padding-top: 15px;
}
</style>
