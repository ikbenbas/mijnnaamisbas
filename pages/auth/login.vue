<template>
    <div>
        <form
            action="#"
            method="POST"
            @submit.prevent="login"
        >
            <div>
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
                >
            </div>

            <div>
                <label
                    for="password"
                >Wachtwoord</label>
                <input
                    id="password"
                    v-model="password"
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    placeholder="Wachtwoord"
                    required
                >
            </div>

            <div>
                <button
                    type="submit"
                >
                    Kom d'rin
                </button>
            </div>
        </form>
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

                // const response = await this.$apollo.mutate({
                //     // Query
                //     mutation: LOGIN_USER('bvanwouwen@hotmail.com', 'abcdef'),
                //     // Parameters
                //     // variables:w {
                //     //     label: this.newTag,
                //     // },
                // });

                // const response = await fetch(this.$config.faunaGraphqlUrl, {
                //     headers: {
                //         authorization: `bearer ${this.$config.faunaServerKey}`,
                //     },
                //     method: 'POST',
                //     body: JSON.stringify(
                //         {
                //             query: `mutation LoginEmployeeUser {
                //                 loginUser(input: {
                //                     username: "peter.gibbons"
                //                     password: "${password}"
                //                 }
                //             }`,
                //         },
                //     ),
                // });

            } catch (error) {
                console.error(error);
            }
        },
    },
});
</script>
