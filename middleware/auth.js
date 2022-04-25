import {useUsersStore} from "../stores";

const userStore = computed(() => {
    return useUsersStore()
})

export default defineNuxtRouteMiddleware((to, from) => {
    if (userStore) {
        return navigateTo()
    }
    return navigateTo('/login')
    // return abortNavigation()

})
