// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default {
  // add scripts to header
  head: {
    script: [
      {
        src: ['https://cdn.tailwindcss.com'],
      },
    ],
  },
  //
  //
  // add costum plugins
  Plugins: ['~/plugins/add-router-to-pinia.js', 'custom-plugin.js'],
  // add the @pinia/nuxt to the buildModules section of nuxt.config.ts
  buildModules: ['@pinia/nuxt'],
  //
  //
  //
  css: ['@/assets/tailwind.css'],
  //
  //
  //
  build: {
    postcss: {
      postcssOptions: require('./postcss.config.js'),
    },
  },
};
