<template>
    <AppModal
        :auto-open="true"
        @close="close()"
    >
        <template #body>
            asdad
            <AppForm @submit="create">
                Add: {{ link }}
            </AppForm>
        </template>
    </AppModal>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    asyncData({ params }) {
        // When calling /abc the slug will be "abc"
        const { link } = params;

        return { link };
    },
    methods: {
        close() {
            this.$router.push({ name: 'bookmarks' });
        },
        create() {
            // fetch(this.$config.faunaGraphqlUrl, {
            //     headers: {
            //         authorization: `bearer ${this.$config.faunaServerKey}`,
            //     },
            //     method: 'POST',
            //     body: JSON.stringify({ query: `
            //             mutation createBookmark {
            //                 createBookmark(data: {link: ${link}, read: true}) {
            //                     _id
            //                     link
            //                 }
            //             }
            //         `,
            //     }),
            // });
        },
    },
});
</script>
