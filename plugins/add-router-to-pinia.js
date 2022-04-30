import { createPinia } from 'pinia';
import { markRaw } from 'vue';

//
//
const pinia = createPinia();

export default (context) => {
  // context.$router; // the router
  // context.pinia; // the pinia created with `createPinia()`
  // context.app; // the current app created with `createApp()` (Vue 3 only)
  // context.store; // the store the plugin is augmenting
  // context.options; // the options object defining the store passed to `defineStore()`
  //
  //
  //
  pinia.use(({ store }) => {
    // store.router = markRaw(context.$router);
  });
  //
  //
  //
  //
  //
  // This function is then passed to pinia with pinia.use():
  // pinia.use(myPiniaPlugin)
};
//
//
//
//
//
//
