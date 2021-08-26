<template>
  <div
    id="app"
    :class="
      `bg-${theme} text-${themeText} d-flex flex-column justify-content-between `
    "
  >
    <Navbar :class="`bg-${theme} text-${themeText}`" />
    <div class="container">
      <router-view />
    </div>
    <component :is="footer"> </component>
  </div>
</template>

<script>
import Navbar from "@/components/navbar/Navbar.vue";
import Footer from "@/components/footer/Footer.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    Navbar,
    Footer
  },
  computed: {
    ...mapGetters([
      "isLoggedIn",
      "theme",
      "themeText",
      "lang",
      "adminRights",
      "user"
    ]),
    isAdmin() {
      return this.adminRights.some(right => right == this.user.right.id);
    },
    footer() {
      return this.$route.meta.noFooter ? "" : "Footer";
    }
  },
  methods: {
    ...mapActions([
      "UPDATE_IS_ADMIN",
      "LOGOUT",
      "AUTH",
      "SET_THEME",
      "SET_LANG",
      "UPDATE_TAGS",
      "UPDATE_TOPICS"
    ])
  },
  async created() {
    this.SET_THEME(localStorage.getItem("theme"));
    this.SET_LANG(localStorage.getItem("lang"));
    this.$root.$i18n.locale = this.lang;

    await this.UPDATE_TAGS();
    await this.UPDATE_TOPICS();

    this.$http.interceptors.response.use(undefined, function(err) {
      return new Promise(function(resolve, reject) {
        if (
          err.response.status === 401 &&
          err.config &&
          !err.config.__isRetryRequest
        ) {
          this.LOGOUT();
        }
        throw err;
      });
    });
  },
  async mounted() {
    try {
      if (this.isLoggedIn) {
        await this.AUTH();
        this.UPDATE_IS_ADMIN(this.isAdmin);
      }
    } catch (error) {
      this.LOGOUT();
      this.$router.push("/login");
    }
  }
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style lang="scss">
#app {
  min-height: 100vh;
}
.container {
  padding-top: 100px;
}
</style>
