// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default ({
    buildModules: ['@pinia/nuxt'],
    head: {
        //
        script: [
            {
                src: 'https://cdn.tailwindcss.com',
            },
        ],
    },
    css: ['@/assets/tailwind.css'],
    build: {
        postcss: {
            postcssOptions: require('./postcss.config.js'),
        },
    },


});
