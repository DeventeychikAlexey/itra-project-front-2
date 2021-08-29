import axios from "axios";
export default {
  UPDATE_IS_ADMIN({ commit }, isAdmin) {
    commit("UPDATE_IS_ADMIN", isAdmin);
  },

  // Users
  async UPGRADE_USER({}, { id, right }) {
    const resp = await axios.put(
      `http://localhost:3000/back/${right}/upgradeUser/${id}`
    );
    return resp.data.msg;
  },
  async DOWNGRADE_USER({}, { id, right }) {
    const resp = await axios.put(
      `http://localhost:3000/back/${right}/downgradeUser/${id}`
    );
    return resp.data.msg;
  },
  async TOGGLE_BLOCKED({}, { id, right }) {
    const resp = await axios.put(
      `http://localhost:3000/back/${right}/toggleBlocked/${id}`
    );
    return resp.data.msg;
  },
  async DELETE_USER({}, { id, right }) {
    const resp = await axios.delete(
      `http://localhost:3000/back/${right}/user/${id}`
    );
    return resp.data.msg;
  },
  // Collections
  async DELETE_COLLECTION({}, id) {
    const resp = await axios.delete(
      `http://localhost:3000/back/admin/collection/${id}`
    );
    return resp.data.msg;
  },
  async CREATE_COLLECTION({}, { id, name, description, id_topic, image }) {
    const resp = await axios.post(
      `http://localhost:3000/back/admin/collection/${id}`,
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
      `http://localhost:3000/back/admin/collection/${id}`,
      body
    );
    return resp.data.msg;
  },

  // Items
  async CREATE_ITEM({}, body) {
    const resp = await axios.post(
      `http://localhost:3000/back/admin/item`,
      body
    );
    return resp.data.msg;
  },
  async DELETE_ITEM({}, id) {
    const resp = await axios.delete(
      `http://localhost:3000/back/admin/item/${id}`
    );
    return resp.data.msg;
  },
  async EDIT_ITEM({}, body) {
    const id = body.itemId;
    delete body.itemId;
    const resp = await axios.put(
      `http://localhost:3000/back/admin/item/${id}`,
      body
    );
    return resp.data.msg;
  }
};
