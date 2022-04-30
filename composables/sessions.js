import { useUsersStore } from '../stores';

const userStore = computed(() => {
  return useUsersStore();
});

class Sessions {
  constructor() {
    this.user = null;
  }

  // set tokens and expiry dates in local storage
  setTokens(auth) {
    //
    // set cookies
    this.user = useCookie('userTokens');
    this.user.value = auth;
  }

  // get tokens from cookies
  getTokens() {
    this.user = useCookie('userTokens');
    return this.user.value;
  }

  // clear tokens and expiry dates from cookies and set user store to null
  clearTokensCookie() {
    this.user = useCookie('userTokens');
    userStore.value.user = null;
    this.user.value = null;
  }
}

export default new Sessions();
