import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Axios from "axios";
import Toaster from "@meforma/vue-toaster";
import { createI18n } from "vue-i18n";

const i18nConfig = {
  locale: "ru",
  fallbackLocale: "ru",
  messages: {
    ru: require("@/i18n/ru.json"),
    en: require("@/i18n/en.json")
  }
};

const app = createApp(App);

app.config.globalProperties.$http = Axios;
const token = localStorage.getItem("token");
if (token) {
  app.config.globalProperties.$http.defaults.headers.common["Authorization"] =
    `Bearer ${token}` || " ";
}

app.use(store);
app.use(router);
app.use(Toaster);
app.use(createI18n(i18nConfig));
app.mount("#app");
