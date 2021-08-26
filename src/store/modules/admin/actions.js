import axios from "axios";
export default {
  UPDATE_IS_ADMIN({ commit }, isAdmin) {
    commit("UPDATE_IS_ADMIN", isAdmin);
  },

  // Users
  async UPGRADE_USER({}, { id, right }) {
    const resp = await axios.put(
      `http://localhost:3000/${right}/upgradeUser/${id}`
    );
    return resp.data.msg;
  },
  async DOWNGRADE_USER({}, { id, right }) {
    const resp = await axios.put(
      `http://localhost:3000/${right}/downgradeUser/${id}`
    );
    return resp.data.msg;
  },
  async TOGGLE_BLOCKED({}, { id, right }) {
    const resp = await axios.put(
      `http://localhost:3000/${right}/toggleBlocked/${id}`
    );
    return resp.data.msg;
  },
  async DELETE_USER({}, { id, right }) {
    const resp = await axios.delete(
      `http://localhost:3000/${right}/user/${id}`
    );
    return resp.data.msg;
  },
  // Collections
  async DELETE_COLLECTION({}, { id }) {
    const resp = await axios.delete(
      `http://localhost:3000/admin/collection/${id}`
    );
    return resp.data.msg;
  },
  async CREATE_COLLECTION({}, { id, name, description, id_topic, image }) {
    const resp = await axios.post(
      `http://localhost:3000/admin/collection/${id}`,
      {
        name,
        description,
        id_topic,
        image
      }
    );
    return resp.data.msg;
  },
  async EDIT_COLLECTION({}, body) {
    const id = body.id;
    delete body.id;
    const resp = await axios.put(
      `http://localhost:3000/admin/collection/${id}`,
      body
    );
    return resp.data.msg;
  },
  async CREATE_ITEM({}, body) {
    const id = body.id;
    delete body.id;
    const resp = await axios.post(
      `http://localhost:3000/admin/item/${id}`,
      body
    );
    return resp.data.msg;
  }
};
