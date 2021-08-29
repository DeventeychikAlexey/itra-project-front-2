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
      <Button
        @click="upgradeUser"
        :color="'success'"
        :text="$t('component.admin.user.buttons.title-1')"
      />
    </td>
    <td>
      <Button
        @click="downgradeUser"
        :color="'secondary'"
        :text="$t('component.admin.user.buttons.title-2')"
      />
    </td>
    <td @click="toggleBlocked" v-if="!curUser.blocked">
      <Button
        :color="'warning'"
        :text="$t('component.admin.user.buttons.title-3')"
      />
    </td>
    <td v-else>
      <Button
        @click="toggleBlocked"
        :color="'success'"
        :text="$t('component.admin.user.buttons.title-4')"
      />
    </td>
    <td>
      <Button
        @click="deleteUser"
        :color="'danger'"
        :text="$t('component.admin.user.buttons.title-5')"
      />
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
        this.$toast.success(this.$t("component.admin.user.buttons.success-1"));
      } catch (error) {
        this.$toast.error(
          error?.response?.data?.msg ||
            this.$t("component.admin.user.buttons.restricted-1")
        );
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
        this.$toast.success(this.$t("component.admin.user.buttons.success-2"));
      } catch (error) {
        this.$toast.error(
          error.response?.data?.msg ||
            this.$t("component.admin.user.buttons.restricted-1")
        );
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
        this.$toast.success(this.$t("component.admin.user.buttons.success-3"));
      } catch (error) {
        this.$toast.error(
          error?.response?.data?.msg ||
            this.$t("component.admin.user.buttons.restricted-1")
        );
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
          `${this.curUser.name} ${this.$t(
            "component.admin.user.buttons.success-4"
          )} `
        );
      } catch (error) {
        this.$toast.error(
          error?.response?.data?.msg ||
            this.$t("component.admin.user.buttons.restricted-1")
        );
      } finally {
        setTimeout(this.$toast.clear, 3000);
      }
    }
  }
};
</script>

<style scoped></style>
