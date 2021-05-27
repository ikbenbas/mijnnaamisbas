<template>
    <form
        class="form"
        @submit.prevent="$emit('submit')"
    >
        <slot />
    </form>
</template>

<style lang="postcss" scoped>
.form {
    display: grid;
    gap: 16px 0;
}
</style>
