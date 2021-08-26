<template>
  <div
    @click="toggleLike"
    :class="
      `bg-${theme} text-${themeText} border list-group-item list-group-item-action mb-4`
    "
  >
    <div class="d-flex w-100 justify-content-between">
      <h4 :class="`mb-1 text-${themeText}`">{{ getValidName }}</h4>
      <small> {{ date }}</small>
    </div>
    <div v-if="item.tags?.length > 0">
      <Tags :tags="tags" />
    </div>
    <div v-if="item.fieldsString?.length > 0">
      <hr :class="`mt-2 mb-2 bg-${themeText}`" />
      <ItemFields :fields="item.fieldsString" />
    </div>
    <div v-if="item.fieldsDate?.length > 0">
      <hr :class="`mt-2 mb-2 bg-${themeText}`" />
      <ItemFields :fields="item.fieldsDate" />
    </div>
    <div v-if="item.fieldsInteger?.length > 0">
      <hr :class="`mt-2 mb-2 bg-${themeText}`" />
      <ItemFields :fields="item.fieldsInteger" />
    </div>
    <div v-if="item.fieldsText?.length > 0">
      <hr :class="`mt-2 mb-2 bg-${themeText}`" />
      <ItemFields :fields="item.fieldsText" />
    </div>
    <div v-if="item.fieldsBoolean?.length > 0">
      <hr :class="`mt-2 mb-2 bg-${themeText}`" />
      <ItemFields :fields="item.fieldsBoolean" />
    </div>
    <div class="d-flex align-items-center justify-content-end">
      <span class="me-1">{{ countLikes }}</span>
      <i v-if="isLiked" class="fas fa-heart"></i>
      <i v-else class="far fa-heart"></i>
    </div>
    <Button v-if="!isInCollection" :id="item.id_collection" />
  </div>
</template>

<script>
import ItemFields from "@/components/collection/item/ItemFields.vue";
import Tags from "@/components/collection/item/tag/Tags.vue";
import Button from "@/components/collection/item/Button.vue";

import { mapGetters, mapActions } from "vuex";

export default {
  components: { ItemFields, Comment, Tags, Button },
  props: {
    item: {
      type: Object,
      required: true
    },
    isInCollection: {
      type: Object
    }
  },
  data() {
    return {
      isLiked: false,
      countLikes: 0
    };
  },
  computed: {
    ...mapGetters(["theme", "themeText", "lang"]),
    tags() {
      return this.item.tags.map(tag => tag.tag);
    },
    getValidName() {
      return this.item.name || "Без названия";
    },
    date() {
      return moment(this.item.createdAt)
        .locale(this.lang)
        .fromNow();
    }
  },
  methods: {
    ...mapActions(["IS_ITEM_LIKED", "LIKE_ITEM", "UNLIKE_ITEM", "COUNT_LIKES"]),
    async toggleLike() {
      try {
        if (this.isLiked) await this.UNLIKE_ITEM(this.item.id);
        else await this.LIKE_ITEM(this.item.id);
        await this.countItemLikes();
        await this.isItemLiked();
      } catch (error) {
        this.$toast.error("Нельзя лайкнуть!");
        setTimeout(this.$toast.clear, 3000);
      }
    },
    async countItemLikes() {
      this.countLikes = await this.COUNT_LIKES(this.item.id);
    },
    async isItemLiked() {
      this.isLiked = await this.IS_ITEM_LIKED(this.item.id);
    }
  },
  async created() {
    try {
      await this.countItemLikes();
      await this.isItemLiked();
    } catch (error) {}
  }
};
</script>

<style scoped>
.list-group-item {
  cursor: pointer;
}
</style>
