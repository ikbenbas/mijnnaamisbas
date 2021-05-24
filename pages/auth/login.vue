<template>
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10">
                <form
                    class="space-y-6"
                    action="#"
                    method="POST"
                    @submit.prevent="login"
                >
                    <div class="mt-1">
                        <label
                            for="username"
                            class="sr-only"
                        >Gebruikersnaam</label>
                        <input
                            id="username"
                            v-model="username"
                            name="username"
                            type="email"
                            autocomplete="username"
                            placeholder="Gebruikersnaam"
                            required
                            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-300 focus:border-teal-300 sm:text-sm"
                        >
                    </div>

                    <div>
                        <label
                            for="password"
                            class="sr-only"
                        >Wachtwoord</label>
                        <input
                            id="password"
                            v-model="password"
                            name="password"
                            type="password"
                            autocomplete="current-password"
                            placeholder="Wachtwoord"
                            required
                            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-300 focus:border-teal-300 sm:text-sm"
                        >
                    </div>

                    <div>
                        <button
                            type="submit"
                            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-400 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                        >
                            Kom d'rin
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { LOGIN_USER } from '~/graphql/mutations/LoginUser';

export default Vue.extend({
    layout: 'basic',
    data() {
        return {
            username: '',
            password: '',
            hasAuthError: false,
        };
    },
    methods: {
        async login() {
            console.log(this.username);

            try {
                const response = await this.$apolloProvider.defaultClient.mutate({
                    mutation: LOGIN_USER,
                    variables: {
                        username: this.username,
                        password: this.password,
                    },
                });

                const token = await response.data.loginUser;

                await this.$apolloHelpers.onLogin(token);

            } catch (error) {
                console.error(error);
            }
        },
    },
});
</script>
