import {defineStore} from 'pinia';
import sessions from '~/composables/sessions';
import {useAccessTokenVerifier} from '~/composables/use-access-token-verifier';

// import ajax
const {loadData} = useAjax();
// import token expiry checker
const {setTokenExpiresAt} = useAccessTokenVerifier();

export const useUsersStore = defineStore({
    id: 'user',
    state: function () {
        return {
            // update tokens and expiry dates from cookies
            user: sessions.getTokens(),
        };
    },
    getters: {
        // check user from cookies
        getUser(state) {
            return state.user;
        },
    },
    actions: {
        // register user
        async setRegister(user) {
            // try
            try {
                // try
                const data = await loadData(
                    `http://localhost/v1/users`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(user),
                    },
                );

                // clear cookies
                sessions.clearTokensCookie();

                // return data
                return data;
            } catch (err) {
                // clear cookies
                sessions.clearTokensCookie();
                // error
                throw err;
            }
        },

        // log user in and provide access tokens and expiry dates
        async setLogin(user) {
            // try
            try {
                // try
                const data = await loadData(`http://localhost/v1/sessions`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user),
                });

                // clear cookies
                sessions.clearTokensCookie();

                //
                // set when access token expires in UTC format
                const accessTokenExpiresAt = setTokenExpiresAt(
                    // set expiry 20 percent less than the one we receive from the api
                    data.data.access_token_expires_in * 0.8
                );
                // set when refresh token expires in UTC format
                const refreshTokenExpiresAt = setTokenExpiresAt(
                    // set expiry 20 percent less than the one we receive from the api
                    data.data.refresh_token_expires_in * 0.8
                );

                // set local storage for user login
                const auth = {
                    username: data.data.username,
                    fullname: data.data.fullname,
                    userID: data.data.user_id,
                    sessionID: data.data.session_id,

                    accessToken: data.data.access_token,
                    accessTokenExpiresAt: accessTokenExpiresAt,

                    refreshToken: data.data.refresh_token,
                    refreshTokenExpiresAt: refreshTokenExpiresAt,
                };

                // set cookies for new user login
                sessions.setTokens(auth);

                // update state with user login, tokens and session id
                this.user = auth;
            } catch (err) {
                // clear cookies
                sessions.clearTokensCookie();
                // error
                throw err;
            }
        },

        // if access token expired, request new access and refresh token
        async setRenewTokens() {
            // try
            try {
                // try
                const data = await loadData(
                    `http://localhost/v1/sessions/${this.user.sessionID}`,
                    {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: this.user.accessToken,
                        },
                        body: JSON.stringify({refresh_token: this.user.refreshToken}),
                    },
                );

                // clear cookies
                sessions.clearTokensCookie();

                //
                // set when access token expires in UTC format
                const accessTokenExpiresAt = setTokenExpiresAt(
                    data.data.access_token_expires_in
                );
                // set when refresh token expires in UTC format
                const refreshTokenExpiresAt = setTokenExpiresAt(
                    data.data.refresh_token_expires_in
                );

                // set local storage for user login
                const auth = {
                    username: data.data.username,
                    fullname: data.data.fullname,
                    userID: data.data.user_id,
                    sessionID: data.data.session_id,

                    accessToken: data.data.access_token,
                    accessTokenExpiresAt: accessTokenExpiresAt,

                    refreshToken: data.data.refresh_token,
                    refreshTokenExpiresAt: refreshTokenExpiresAt,
                };

                // set cookies for new user login
                sessions.setTokens(auth);

                // update state with user login, tokens and session id
                this.user = auth;
                //
                //
            } catch (err) {
                // error
                throw err;
            }
        },

        // log out and clear auth from client system
        async setLogout() {
            // try
            try {
                // verify if user is true
                if (!this.getUser) {
                    throw new Error('You are not logged in');
                }
                //
                await loadData(
                    `http://localhost/v1/sessions/${this.user.sessionID}`,
                    {
                        method: 'DELETE',
                        headers: {
                            Authorization: this.user.accessToken,
                        },
                    },
                );

                // clear cookies
                sessions.clearTokensCookie();
                // catch
            } catch (err) {
                // error
                throw err;
                // clear cookies
                sessions.clearTokensCookie();
            }
        },

    },
});
