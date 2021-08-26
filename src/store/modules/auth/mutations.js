export default {
  AUTH_TOKEN(state, token) {
    state.token = token;
  },
  AUTH_USER(state, user) {
    state.user = user;
  },
  LOGOUT(state) {
    state.token = "";
    state.user = {};
  }
};
