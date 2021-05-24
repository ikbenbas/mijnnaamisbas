
/**
 * Public client for GraphQL that are protected with JWT.
 *
 * @param {object} context The Nuxt context object.
 * @param {object} context.app The Vue root instance.
 * @returns {object} The config object for the Apollo client.
 */
export default function({ app }) {

    return {
        httpEndpoint: `${app.$config.faunaGraphqlUrl}`,
        browserHttpEndpoint: `${app.$config.faunaGraphqlUrl}`,

        /*
         * For permanent authentication provide `getAuth` function.
         * The string returned will be used in all requests as authorization header
         */
        getAuth: () => (process.browser ? app.$auth.getToken('local') : ''),
    };
}
