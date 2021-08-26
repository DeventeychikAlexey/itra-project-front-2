<template>
  <table
    :class="`table table-hover table-borderless text-center table-${theme}`"
  >
    <thead>
      <tr>
        <th class="text-start" scope="col">Индекс</th>
        <th scope="col">Id</th>
        <th scope="col">Имя</th>
        <th scope="col">Статус</th>
        <th scope="col">Повысить</th>
        <th scope="col">Понизить</th>
        <th scope="col">Заблокировать</th>
        <th scope="col">Удалить</th>
      </tr>
    </thead>
    <tbody>
      <User
        @updateUsers="updateUsers"
        v-for="(user, index) in users"
        :key="index"
        :curUser="user"
        :index="index"
      />
    </tbody>
  </table>
</template>

<script>
import User from "@/components/admin/User.vue";
import { mapGetters } from "vuex";
export default {
  props: {
    users: {
      type: Array,
      required: true
    }
  },
  components: {
    User
  },
  computed: {
    ...mapGetters(["theme"])
  },
  methods: {
    updateUsers() {
      this.$emit("updateUsers");
    }
  }
};
</script>

<style lang="scss">
table {
  display: block;
  max-width: 100%;
  overflow: auto;
}
thead,
tbody {
  display: block;
  max-height: 40vh;
  max-width: 100vw;
  overflow: auto;
}
tr {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  width: 100%;
}
th,
td {
  flex: 12% 1 0;
}
</style>
