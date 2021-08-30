<template>
  <table
    :class="`table table-hover table-borderless text-center table-${theme}`"
  >
    <thead>
      <tr>
        <th class="text-start" scope="col">
          {{ $t("component.admin.users.title-1") }}
        </th>
        <th scope="col">{{ $t("component.admin.users.title-2") }}</th>
        <th scope="col">{{ $t("component.admin.users.title-3") }}</th>
        <th scope="col">{{ $t("component.admin.users.title-4") }}</th>
        <th scope="col">{{ $t("component.admin.users.title-5") }}</th>
        <th scope="col">{{ $t("component.admin.users.title-6") }}</th>
        <th scope="col">{{ $t("component.admin.users.title-7") }}</th>
        <th scope="col">{{ $t("component.admin.users.title-8") }}</th>
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
