export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    // ssr: false,

    // Target: https://go.nuxtjs.dev/config-target
    target: 'static',

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'mijnnaamisbas',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport',
                content: 'width=device-width, initial-scale=1' },
            { hid: 'description',
                name: 'description',
                content: '' },
        ],
        link: [
            { rel: 'icon',
                type: 'image/x-icon',
                href: '/favicon.ico' },
        ],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '~/assets/css/styles.css',
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
    // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
        // https://github.com/nuxt-community/apollo-module
        '@nuxtjs/apollo',
        // https://auth.nuxtjs.org/
        '@nuxtjs/auth-next',
    ],

    // PWA module configuration: https://go.nuxtjs.dev/pwa
    pwa: {
        manifest: {
            lang: 'en',
        },
    },

    auth: {
        strategies: {
            local: { /* ... */ },
        },
    },

    apollo: {
        clientConfigs: {
            default: '~/plugins/apollo-clients/public.js',
            private: '~/plugins/apollo-clients/private.js',
        },
    },

    publicRuntimeConfig: {
        faunaGraphqlUrl: process.env.FAUNA_GRAPHQL_URL,
        faunaGuestKey: process.env.FAUNA_GUEST_KEY,
    },

    privateRuntimeConfig: {
        faunaServerKey: process.env.FAUNA_SERVER_KEY,
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        postcss: {
            plugins: {
                'postcss-import': {},
                'postcss-preset-env': {
                    stage: 0,
                    importFrom: './assets/css/base/breakpoints.js',
                    features: {
                        'custom-media': true,
                    },
                },
                'postcss-nested-ancestors': {},
                'postcss-nested': {},
                'postcss-pxtorem': {
                    propList: [
                        '*',
                    ],
                },
            },
        },
    },
};
