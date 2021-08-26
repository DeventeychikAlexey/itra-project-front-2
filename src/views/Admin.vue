<template>
  <div>
    <h3 class="text mb-5">
      Админка с правами
      <span class="badge bg-info text-dark ms-1"> {{ right }}</span>
    </h3>

    <h3 class="text text-center mb-3">
      Пользователи сайта
    </h3>
    <input class="form-control p-1 rounded" type="text" v-model="searchValue" />
    <Users
      @updateUsers="updateUsers"
      v-if="curUsers.length > 0"
      :users="curUsers"
    />
    <p v-else class="text-center fs-5 mt-5">
      Никого не найдено :(
    </p>
  </div>
</template>

<script>
import Users from "@/components/admin/Users.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: { Users },
  data() {
    return {
      searchValue: "",
      users: []
    };
  },
  computed: {
    ...mapGetters(["user"]),
    right() {
      return this.user?.right?.name;
    },
    curUsers() {
      return this.users.filter(user =>
        user.name
          .trim()
          .toLowerCase()
          .includes(this.searchValue.toLowerCase())
      );
    }
  },
  methods: {
    ...mapActions(["GET_USERS"]),
    async updateUsers() {
      this.users = await this.GET_USERS();
    }
  },
  async created() {
    await this.updateUsers();
  }
};
</script>

<style scoped></style>
