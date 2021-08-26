import axios from "axios";
export default {
  LOGIN({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios({ url: "http://localhost:3000/auth/login", data, method: "POST" })
        .then(async resp => {
          const token = resp.data.msg;
          localStorage.setItem("token", token);
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          commit("AUTH_TOKEN", token);
          const result = await this.dispatch("AUTH");
          resolve(result);
        })
        .catch(err => {
          localStorage.removeItem("token");
          reject(err);
        });
    });
  },
  REGISTER({}, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: "http://localhost:3000/auth/register",
        data,
        method: "POST"
      })
        .then(resp => {
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  AUTH({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .post("http://localhost:3000/auth/")
        .then(resp => {
          commit("AUTH_USER", resp.data.msg);
          resolve(resp.data.msg);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  LOGOUT({ commit }) {
    return new Promise(resolve => {
      commit("LOGOUT");
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      resolve();
    });
  }
};
