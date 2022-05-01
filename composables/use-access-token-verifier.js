import {useUsersStore} from '../stores';
import {computed} from 'vue';
//
const userStore = computed(() => {
    return useUsersStore();
});
// token expiry checker
export const useAccessTokenVerifier = function () {
    // set access token expiry in UTC format
    const setTokenExpiresAt = function (expiresIn) {
        // set expiry 20 percent less than the one we receive from the api
        expiresIn = expiresIn * 0.8
        // current date
        const currentDate = new Date();
        //
        // set UTC
        const date =
            Date.UTC(
                currentDate.getUTCFullYear(),
                currentDate.getUTCMonth(),
                currentDate.getUTCDate(),
                currentDate.getUTCHours(),
                currentDate.getUTCMinutes(),
                currentDate.getUTCSeconds()
            ) +
            expiresIn * 1000;

        // return date for token expiry
        return date;
    };
    // token expiry checker & new token returner
    const tokenVerifier = async function () {

        // try
        try {
            // verify if user is true
            if (!userStore.value.getUser) {
                throw new Error('You are not logged in. Please login');
            }
            // current date
            const currentDate = new Date();
            //
            // set UTC
            const date = Date.UTC(
                currentDate.getUTCFullYear(),
                currentDate.getUTCMonth(),
                currentDate.getUTCDate(),
                currentDate.getUTCHours(),
                currentDate.getUTCMinutes(),
                currentDate.getUTCSeconds()
            );
            // if refresh token has expired log user out and send to login page
            if (date > userStore.value.getUser.refreshTokenExpiresAt) {
                // delete all auth from client system
                console.log('refresh token has expired. you have been logged out due to inactivity');

                // log out
                await userStore.value.setLogout();
                return
            }
            // if access token has not expired return current access token
            if (date < userStore.value.getUser.accessTokenExpiresAt) {
                // return current access token
                return userStore.value.getUser.accessToken;
            }
            // if access token has expired, request new access & refresh token
            // update access and refresh token
            await userStore.value.setRenewTokens();
            // return new access
            return userStore.value.getUser.accessToken;

        } catch (err) {
            throw err;
        }

    };

    // return methods
    return {setTokenExpiresAt, tokenVerifier};
};
