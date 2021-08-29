import axios from "axios";
export default {
  SET_UPPY({ commit }, uppy) {
    commit("SET_UPPY", uppy);
  },
  SET_THEME({ commit }, theme) {
    theme = theme == "dark" ? "dark" : "light";
    const themeText = theme == "light" ? "black" : "white";
    localStorage.setItem("theme", theme);
    commit("SET_THEME", theme);
    commit("SET_THEME_TEXT", themeText);
  },
  SET_LANG({ commit }, lang) {
    lang = lang == "ru" ? "ru" : "en";
    localStorage.setItem("lang", lang);
    commit("SET_LANG", lang);
  },

  // Collections
  async GET_COLLECTION({}, id) {
    const resp = await axios.get(`http://localhost:3000/back/collection/${id}`);
    return resp.data.msg;
  },
  async GET_COLLECTIONS({}) {
    const resp = await axios.get(`http://localhost:3000/back/collections`);
    return resp.data.msg;
  },
  async GET_USER_COLLECTIONS({}, id) {
    const resp = await axios.get(
      `http://localhost:3000/back/collections/${id}`
    );
    return resp.data.msg;
  },
  async COUNT_COLLECTION_ITEMS({}, id) {
    const resp = await axios.get(
      `http://localhost:3000/back/collection/items/${id}`
    );
    return resp.data.msg;
  },
  async CREATE_MY_COLLECTION({}, body) {
    const resp = await axios.post(
      `http://localhost:3000/back/user/collections`,
      {
        name: body.name,
        description: body.description,
        id_topic: body.id_topic,
        image: body.image
      }
    );
    return resp.data.msg;
  },
  async EDIT_MY_COLLECTION({}, body) {
    const id = body.id;
    delete body.id;
    const resp = await axios.put(
      `http://localhost:3000/back/user/collection/${id}`,
      body
    );
    return resp.data.msg;
  },
  async DELETE_MY_COLLECTION({}, id) {
    const resp = await axios.delete(
      `http://localhost:3000/back/user/collection/${id}`
    );
    return resp.data.msg;
  },

  // Items
  async CREATE_MY_ITEM({}, body) {
    const resp = await axios.post(`http://localhost:3000/back/user/item`, body);
    return resp.data.msg;
  },

  async DELETE_MY_ITEM({}, id) {
    const resp = await axios.delete(
      `http://localhost:3000/back/user/item/${id}`
    );
    return resp.data.msg;
  },

  async EDIT_MY_ITEM({}, body) {
    const id = body.itemId;
    delete body.itemId;
    const resp = await axios.put(
      `http://localhost:3000/back/user/item/${id}`,
      body
    );
    return resp.data.msg;
  },

  async GET_COLLECTION_ITEMS({}, id) {
    const resp = await axios.get(`http://localhost:3000/back/items/${id}`);
    return resp.data.msg;
  },
  async GET_ITEMS({}) {
    const resp = await axios.get(`http://localhost:3000/back/items`);
    return resp.data.msg;
  },
  async GET_ITEM({}, id) {
    const resp = await axios.get(`http://localhost:3000/back/item/${id}`);
    return resp.data.msg;
  },

  // Topics
  async UPDATE_TOPICS({ commit }) {
    let resp = await axios.get(`http://localhost:3000/back/topics`);
    resp.data.msg.map(el => Object.assign(el, { value: el.name }));
    commit("UPDATE_TOPICS", resp.data.msg);
  },

  //Tags
  async UPDATE_TAGS({ commit }) {
    let resp = await axios.get(`http://localhost:3000/back/tags`);
    resp.data.msg.map(el => Object.assign(el, { value: el.tag }));
    commit("UPDATE_TAGS", resp.data.msg);
  },

  // Users
  async GET_USERS({}) {
    const resp = await axios.get(`http://localhost:3000/back/users`);
    return resp.data.msg;
  },
  async GET_USER({}, id) {
    const resp = await axios.get(`http://localhost:3000/back/user/${id}`);
    return resp.data.msg;
  },

  // Likes
  async COUNT_LIKES({}, id) {
    const resp = await axios.get(`http://localhost:3000/back/item/likes/${id}`);
    return resp.data.msg;
  },
  async IS_ITEM_LIKED({}, id) {
    const resp = await axios.get(`http://localhost:3000/back/user/liked/${id}`);
    return resp.data.msg;
  },
  async LIKE_ITEM({}, id) {
    const resp = await axios.put(`http://localhost:3000/back/user/like/${id}`);
    return resp.data.msg;
  },
  async UNLIKE_ITEM({}, id) {
    const resp = await axios.put(
      `http://localhost:3000/back/user/unlike/${id}`
    );
    return resp.data.msg;
  },

  // Images
  async GET_IMAGE({}, id) {
    const resp = await axios.get(`http://localhost:3000/back/image/${id}`);
    return resp.data.msg;
  },
  async DELETE_IMAGE({}, id) {
    const resp = await axios.delete(
      `http://localhost:3000/back/user/image/${id}`
    );
    return resp.data.msg;
  },

  // Comments
  async CREATE_COMMENT({}, body) {
    console.log(body);
    const id = body.id;
    delete body.id;
    const resp = await axios.post(
      `http://localhost:3000/back/user/comment/item/${id}`,
      body
    );
    return resp.data.msg;
  },
  async GET_ITEM_COMMENTS({}, id) {
    const resp = await axios.get(
      `http://localhost:3000/back/comment/item/${id}`
    );
    return resp.data.msg;
  },

  async SUBSCRIBE_COMMENTS({}, id) {
    const resp = await axios.get(
      `http://localhost:3000/back/comment/update/item/${id}`
    );
    return resp.data.msg;
  }
};
