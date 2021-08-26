export default {
  isLoggedIn: state => !!state.token,
  user: state => state.user,
  adminRights: state => state.adminRights
};
