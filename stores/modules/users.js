import {defineStore} from 'pinia';
import sessions from "~/composables/sessions";


// import ajax
const {isPending, error, loadData} = useAjax()

export const useUsersStore = defineStore({
    id: 'user',
    state: function () {
        console.log('see')
        return {
            // update tokens and expiry dates from cookies
            user: sessions.getTokens(),
        };
    },
    getters: {
        // check user from cookies
        getUser(state) {
            console.log('denne kørete. state er: ', state.user)
            return state.user;
        }
    },
    actions: {
        // log user in and provide access tokens and expiry dates
        async setLogin(user) {
            // try
            try {
                // try
                const data = await loadData(
                    `http://localhost/v1/sessions`,
                    {
                        method: 'POST', headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(user)
                    },
                    {additionalCallTime: 1000}
                )
                //
                console.log('data is: ', data)

                // handle error in returned data
                if (data.statusCode === 401) {
                    throw new Error(data.messages);
                }

                // set local storage for user login
                const auth = {
                    sessionID: data.data.session_id,
                    accessToken: data.data.access_token,
                    accessTokenExpiresIn: data.data.access_token_expires_in,
                    refreshToken: data.data.refresh_token,
                    refreshTokenExpiresIn: data.data.refresh_token_expires_in,
                }

                // update state with user login, tokens and session id
                this.user = auth;
                // set cookies for user login
                sessions.setTokens(auth)

                console.log('køre?: ', this.user)


            } catch (err) {
                console.log('login error: ', err)
            }
        }
    },
});
