<template>
    <AppForm>
        <div class="space-y-8 divide-y divide-gray-200">
            <div>
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                    Link: {{ link }}
                </h3>
                <p class="mt-1 text-sm text-gray-500">
                    This information will be displayed publicly so be careful what you share.
                </p>
            </div>
            <div>
                asd
            </div>
        </div>
    </AppForm>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    asyncData({ params }) {
        const { link } = params; // When calling /abc the slug will be "abc"

        return { link };
    },
});
</script>
