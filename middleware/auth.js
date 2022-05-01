import {useUsersStore} from "../stores";

const userStore = computed(() => {
    return useUsersStore()
})

export default defineNuxtRouteMiddleware((to, from) => {
    if (userStore.value.getUser) {
        return navigateTo()
    }
    return navigateTo('/login')
    // return abortNavigation()
    // abortNavigation (err?: string | Error) - Aborts the navigation, with an optional error message

})
