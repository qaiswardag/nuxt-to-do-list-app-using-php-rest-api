import { defineStore } from 'pinia';
import sessions from '~/composables/sessions';

// import ajax
const { loadData } = useAjax();

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
          { additionalCallTime: 500 }
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

        // set local storage for user login
        const auth = {
          username: data.data.username,
          fullname: data.data.fullname,
          userID: data.data.user_id,
          sessionID: data.data.session_id,
          accessToken: data.data.access_token,
          accessTokenExpiresIn: data.data.access_token_expires_in,
          refreshToken: data.data.refresh_token,
          refreshTokenExpiresIn: data.data.refresh_token_expires_in,
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

    // log user out and provide access tokens and expiry dates
    async setLogout() {
      // try
      try {
        if (!this.user) {
          throw new Error('You are not logged in');
        }
        // try
        const data = await loadData(
          `http://localhost/v1/sessions/${this.user.sessionID}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: this.user.accessToken,
            },
          },
          { pending: true, additionalCallTime: 500 }
        );

        // clear cookies
        sessions.clearTokensCookie();
      } catch (err) {
        // clear cookies
        sessions.clearTokensCookie();
        // error
        throw err;
      }
    },
  },
});
