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

        this.user = useCookie('userTokens')
        this.user.value = tokens;
    }


    getTokens() {
        this.user = useCookie('userTokens')
        return this.user.value
    }

    // clear tokens and expiry dates from cookies
    clearTokensCookie() {

    }
}

export default new Sessions();
