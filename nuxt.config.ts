import { defineNuxtConfig } from 'nuxt3';

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
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
  //   buildModules: ['@nuxt/postcss8'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  // components: true,
});
