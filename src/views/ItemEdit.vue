<template>
  <div>
    <div class="mb-2">
      <Item v-if="updatedItem" :item="updatedItem" :readOnly="readOnly" />
    </div>
    <div>
      <hr />
      <h3 class="text-center mb-5">
        <strong> {{ $t("view.item-edit.title-1") }}</strong>
        <div class="d-flex justify-content-center p-2">
          <Edit v-if="updatedItem" :item="updatedItem" />
        </div>
      </h3>
    </div>
  </div>
</template>

<script>
import Edit from "@/components/collection/item/change/Edit.vue";
import Item from "@/components/collection/item/Item.vue";

import { mapActions, mapGetters } from "vuex";
export default {
  components: { Edit, Item },
  data() {
    return {
      item: null,
      readOnly: true
    };
  },
  computed: {
    ...mapGetters(["user", "isAdmin"]),
    updatedItem() {
      return this.item;
    },
    async isMyPage() {
      const collections = await this.GET_USER_COLLECTIONS(this.user?.id);
      return collections.some(
        collection => collection.id === this.item.id_collection
      );
    },
    restricted() {
      return !(!!this.user.id && (this.isMyPage || this.isAdmin));
    }
  },
  methods: {
    ...mapActions(["GET_ITEM", "GET_USER_COLLECTIONS"])
  },
  async created() {
    this.item = await this.GET_ITEM(this.$route.params.id);
    if (!this.item || this.restricted) this.$router.push("/page404");
  }
};
</script>

<style scoped></style>
