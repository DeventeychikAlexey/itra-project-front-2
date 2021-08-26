<template>
  <nav :class="`navbar navbar-expand-lg navbar-${theme} bg-${theme} fixed-top`">
    <div class="container-fluid ">
      <div class="d-flex align-items-center">
        <router-link
          to="/"
          class="navbar-brand me-2 mb-1 d-flex align-items-center"
        >
          <img src="@/assets/logo.png" alt="logo" />
        </router-link>
      </div>
      <div class=" nav-select">
        <Multiselect
          v-model="value"
          :placeholder="$t('component.navbar.searchPlaceholder')"
          label="name"
          trackBy="name"
          :options="options"
          :searchable="true"
          :class="`text-black`"
        >
          <template v-slot:option="{ option }">
            {{ option.name }}
          </template>
        </Multiselect>
      </div>
      <button
        class="navbar-toggler align-self-end"
        type="button"
        data-mdb-toggle="collapse"
        data-mdb-target="#navbarToggleExternalContent"
        aria-controls="navbarToggleExternalContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="fas fa-bars"></i>
      </button>
      <div
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
  data() {
    return {
      value: null,
      options: [
        {
          value: "captainamerica",
          name: "Captain America",
          icon:
            "https://cdn2.iconfinder.com/data/icons/avengers-filled/48/03_-_Captain_America_-_infinity_war_-_end_game_-_marvel_-_avengers_-_super_hero-512.png"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn", "user", "theme", "themeText", "isAdmin"]),
    routes() {
      const routes = [];
      if (this.isLoggedIn) {
        if (this.isAdmin)
          routes.push({
            title: `${this.$t("component.navbar.routes.admin")}`,
            to: `/admin`
          });
        routes.push(
          {
            title: `${this.$t("component.navbar.routes.page")}`,
            to: `/user/${this.user.id}`
          },
          {
            title: `${this.$t("component.navbar.routes.logout")}`,
            to: "/login",
            handler: this.LOGOUT
          }
        );
      } else {
        routes.push(
          {
            title: `${this.$t("component.navbar.routes.register")}`,
            to: "/register"
          },
          {
            title: `${this.$t("component.navbar.routes.login")}`,
            to: "/login"
          }
        );
      }
      return routes;
    }
  },
  methods: {
    ...mapActions(["LOGOUT"])
  }
};
</script>
<style scoped>
.nav-link {
  text-align: center;
}
.nav-select {
  max-width: 200px;
  width: 100%;
}
img {
  max-width: 150px;
  object-fit: cover;
}
</style>
