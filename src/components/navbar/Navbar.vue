<template>
  <nav :class="`navbar navbar-expand-lg navbar-${theme} bg-${theme} fixed-top`">
    <div class="container-fluid  flex-nowrap">
      <div class="d-flex align-items-center">
        <router-link
          to="/"
          class="navbar-brand me-2 mb-1 d-flex align-items-center"
        >
          <img src="@/assets/logo.png" alt="logo" />
        </router-link>
      </div>
      <button
        class="navbar-toggler align-self-center"
        type="button"
        data-mdb-toggle="collapse"
        data-mdb-target="#navbarToggleExternalContent"
        aria-controls="navbarToggleExternalContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="fas fa-bars"></i>
      </button>
    </div>
    <div
      ref="menuBody"
      :class="`collapse navbar-collapse justify-content-end`"
      id="navbarToggleExternalContent"
    >
      <ul class="navbar-nav  mb-2 mb-lg-0">
        <router-link
          v-for="(route, index) in routes"
          :key="index"
          class="nav-item nav-link"
          tag="li"
          :to="route.to"
          @click="route.handler"
        >
          {{ route.title }}
        </router-link>
      </ul>
      <div class="d-flex px-1">
        <SelectTheme class="mx-1" style="min-width:150px" />
        <SelectLanguage class="mx-1" style="min-width:150px" />
      </div>
    </div>
  </nav>
</template>

<script>
import Multiselect from "@vueform/multiselect";
import SelectTheme from "@/components/navbar/select/SelectTheme.vue";
import SelectLanguage from "@/components/navbar/select/SelectLanguage.vue";

import { mapActions, mapGetters } from "vuex";

export default {
  components: { Multiselect, SelectTheme, SelectLanguage },
  computed: {
    ...mapGetters(["isLoggedIn", "user", "theme", "themeText", "isAdmin"]),
    routes() {
      const routes = [];
      if (this.isLoggedIn) {
        if (this.isAdmin)
          routes.push({
            title: `${this.$t("component.navbar.routes.admin")}`,
            to: `/admin`,
            handler: this.closeMenu
          });
        routes.push(
          {
            title: `${this.$t("component.navbar.routes.page")}`,
            to: `/user/${this.user.id}`,
            handler: this.closeMenu
          },
          {
            title: `${this.$t("component.navbar.routes.logout")}`,
            to: "/login",
            handler: this.logout
          }
        );
      } else {
        routes.push(
          {
            title: `${this.$t("component.navbar.routes.register")}`,
            to: "/register",
            handler: this.closeMenu
          },
          {
            title: `${this.$t("component.navbar.routes.login")}`,
            to: "/login",
            handler: this.closeMenu
          }
        );
      }
      return routes;
    }
  },
  methods: {
    ...mapActions(["LOGOUT"]),
    logout() {
      this.LOGOUT();
      this.closeMenu();
    },
    closeMenu() {
      this.$refs.menuBody.classList.remove("show");
    }
  }
};
</script>
<style scoped>
.nav-link {
  text-align: center;
  white-space: nowrap;
}
img {
  max-width: 150px;
  object-fit: cover;
}
</style>
