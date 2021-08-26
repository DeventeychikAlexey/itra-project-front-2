<template>
  <tr
    @click="$router.push(`/user/${curUser.id}`)"
    :class="{
      'table-warning': curUser.blocked,
      'table-info': user.id == curUser.id
    }"
  >
    <th class="text-start">{{ index + 1 }}</th>
    <td>{{ curUser.id }}</td>
    <td>{{ curUser.name }}</td>
    <td>
      <span class="badge bg-info"> {{ curUser.right.name }}</span>
    </td>
    <td>
      <Button @click="upgradeUser" :color="'success'" :text="'Повысить'" />
    </td>
    <td>
      <Button @click="downgradeUser" :color="'secondary'" :text="'Понизить'" />
    </td>
    <td @click="toggleBlocked" v-if="!curUser.blocked">
      <Button :color="'warning'" :text="'Заблокировать'" />
    </td>
    <td v-else>
      <Button
        @click="toggleBlocked"
        :color="'success'"
        :text="'Разблокировать'"
      />
    </td>
    <td>
      <Button @click="deleteUser" :color="'danger'" :text="'Удалить'" />
    </td>
  </tr>
</template>

<script>
import Button from "@/components/admin/Button.vue";

import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    curUser: {
      type: Object,
      required: true
    },
    index: {
      type: Number
    }
  },
  components: {
    Button
  },
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    ...mapActions([
      "UPGRADE_USER",
      "DOWNGRADE_USER",
      "TOGGLE_BLOCKED",
      "DELETE_USER"
    ]),
    async upgradeUser(event) {
      event.stopPropagation();
      try {
        await this.UPGRADE_USER({
          id: this.curUser.id,
          right: this.user.right.name
        });
        this.$emit("updateUsers");
        this.$toast.success("Успешно повышен!");
      } catch (error) {
        this.$toast.error(error?.response?.data?.msg || "You can not!");
      } finally {
        setTimeout(this.$toast.clear, 3000);
      }
    },
    async downgradeUser(event) {
      try {
        event.stopPropagation();
        await this.DOWNGRADE_USER({
          id: this.curUser.id,
          right: this.user.right.name
        });
        this.$emit("updateUsers");
        this.$toast.success("Успешно понижен!");
      } catch (error) {
        this.$toast.error(error.response?.data?.msg || "You can not!");
      } finally {
        setTimeout(this.$toast.clear, 3000);
      }
    },
    async toggleBlocked(event) {
      try {
        event.stopPropagation();
        await this.TOGGLE_BLOCKED({
          id: this.curUser.id,
          right: this.user.right.name
        });
        this.$emit("updateUsers");
        this.$toast.success("Блокировка успешно изменена!");
      } catch (error) {
        this.$toast.error(error.response.data.msg);
      } finally {
        setTimeout(this.$toast.clear, 3000);
      }
    },
    async deleteUser(event) {
      try {
        event.stopPropagation();
        await this.DELETE_USER({
          id: this.curUser.id,
          right: this.user.right.name
        });
        this.$emit("updateUsers");
        this.$toast.success(
          `Пользователь ${this.curUser.name} успешно удален!`
        );
      } catch (error) {
        this.$toast.error(error.response.data.msg);
      } finally {
        setTimeout(this.$toast.clear, 3000);
      }
    }
  }
};
</script>

<style scoped></style>
