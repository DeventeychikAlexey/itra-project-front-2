export default {
  UPDATE_TOPICS(state, topics) {
    state.topics = topics;
  },
  UPDATE_TAGS(state, tags) {
    state.tags = tags;
  },
  SET_THEME(state, theme) {
    state.theme = theme;
  },
  SET_LANG(state, lang) {
    state.lang = lang;
  },
  SET_THEME_TEXT(state, themeText) {
    state.themeText = themeText;
  },
  SET_UPPY(state, uppy) {
    state.uppy = uppy;
  }
};
