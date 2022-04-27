import {useUsersStore} from "../stores";

const userStore = computed(() => {
    return useUsersStore()
})

class Sessions {

    constructor() {
        this.user = null;
    }

    // set tokens and expiry dates in local storage
    setTokens(tokens) {
        const userTokens = {
            accessToken: tokens.accessToken,
            accessTokenExpiresIn: tokens.accessTokenExpiresIn,
            refreshToken: tokens.refreshToken,
            refreshTokenExpiresIn: tokens.refreshTokenExpiresIn,
            sessionID: tokens.sessionID,
        }

        // set cookies
        this.user = useCookie('userTokens')
        this.user.value = tokens;
    }

    // get tokens from cookies
    getTokens() {
        this.user = useCookie('userTokens')
        return this.user.value
    }

    // clear tokens and expiry dates from cookies and set user store to null
    clearTokensCookie() {
        this.user = useCookie('userTokens')
        userStore.value.user = null;
        this.user.value = null;
    }
}

export default new Sessions();
