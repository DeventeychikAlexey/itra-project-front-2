import { createStore } from "vuex";
import { auth, data, admin } from "./modules";

export default createStore({
  modules: {
    auth,
    data,
    admin
  }
});
